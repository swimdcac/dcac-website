import { useState, useEffect } from 'preact/hooks'

export const CALENDAR_ID = 'q4p026gk42gbn5d4f6qfl9fpfo@group.calendar.google.com'
/** The club swims on DC time; everyone sees ET regardless of where they're browsing from. */
export const CLUB_TZ = 'America/New_York'

const API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTH_FULL = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

/** Weekday headings for a Sunday-first grid. */
export const WEEKDAYS = DAY_NAMES

/**
 * Practice focus for the day, published on the source calendar as an all-day
 * event. Anything that doesn't match a known focus still shows, as 'other'.
 */
export type ThemeId = 'distance' | 'race' | 'sprint' | 'rainbow' | 'other'

export interface Theme {
  id: ThemeId
  /** The summary exactly as written on the calendar. */
  label: string
  /** Trimmed for the narrow month cells. */
  short: string
}

const THEME_PATTERNS: [ThemeId, RegExp][] = [
  ['rainbow', /rainbow/i],
  ['sprint', /sprint/i],
  ['race', /race\s*pace|vo\s*2/i],
  ['distance', /distance/i],
]

const THEME_SHORT: Record<ThemeId, string | null> = {
  distance: 'Distance',
  race: 'Race pace',
  sprint: 'Sprint',
  rainbow: 'Rainbow',
  other: null,
}

function matchTheme(summary: string): Theme {
  const label = summary.trim()
  const id = THEME_PATTERNS.find(([, re]) => re.test(label))?.[0] ?? 'other'
  return { id, label, short: THEME_SHORT[id] ?? label }
}

export interface Practice {
  id: string
  title: string
  time: string
  location: string
  /** Full location string as entered in Google Calendar — used for calendar exports. */
  fullLocation: string
  start: Date
  end: Date
  /** The day's focus, copied down so calendar exports can carry it. */
  theme: Theme | null
}

export interface ScheduleDay {
  /** Club-time YYYY-MM-DD, also used as the render key */
  key: string
  name: string
  month: string
  date: number
  isToday: boolean
  /** False for the leading/trailing days a month grid borrows from its neighbours. */
  inMonth: boolean
  theme: Theme | null
  practices: Practice[]
}

interface GCalEvent {
  id: string
  summary?: string
  location?: string
  start: { dateTime?: string; date?: string }
  end: { dateTime?: string; date?: string }
}

export type Range = 'week' | 'month'

interface Bounds {
  start: Date
  end: Date
  /** Month the grid is "about"; -1 for week ranges, where every day counts. */
  monthIndex: number
  label: string
}

/*
 * Grid days are "civil" dates: UTC midnight standing in for a calendar day in
 * club time, read back with getUTC*. That keeps the grid, "today" and which day
 * a practice lands on in ET no matter what timezone the browser is in.
 */
const DAY_MS = 86_400_000

function civil(y: number, m: number, d: number) {
  return new Date(Date.UTC(y, m, d))
}

function addDays(d: Date, n: number) {
  return new Date(d.getTime() + n * DAY_MS)
}

const clubDayFmt = new Intl.DateTimeFormat('en-US', {
  timeZone: CLUB_TZ, year: 'numeric', month: 'numeric', day: 'numeric',
})

/** The club-time calendar day an instant falls on. */
function clubDay(instant: Date) {
  const parts = clubDayFmt.formatToParts(instant)
  const get = (t: string) => Number(parts.find(p => p.type === t)?.value)
  return civil(get('year'), get('month') - 1, get('day'))
}

/** Days since the most recent Sunday — weeks run Sunday to Saturday. */
function sinceSunday(d: Date) {
  return d.getUTCDay()
}

/** Sunday through Saturday of the current week. */
function weekBounds(): Bounds {
  const today = clubDay(new Date())
  const start = addDays(today, -sinceSunday(today))
  return { start, end: addDays(start, 6), monthIndex: -1, label: '' }
}

/**
 * A whole month padded out to complete Sunday–Saturday weeks, so the grid is
 * rectangular and the borrowed neighbour days still show their practices.
 * That's 4–6 weeks depending on the month; the grid sizes itself to match.
 */
function monthBounds(offset: number): Bounds {
  const today = clubDay(new Date())
  const first = civil(today.getUTCFullYear(), today.getUTCMonth() + offset, 1)
  const last = civil(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)

  return {
    start: addDays(first, -sinceSunday(first)),
    end: addDays(last, 6 - sinceSunday(last)),
    monthIndex: first.getUTCMonth(),
    label: `${MONTH_FULL[first.getUTCMonth()]} ${first.getUTCFullYear()}`,
  }
}

function bounds(range: Range, offset: number) {
  return range === 'week' ? weekBounds() : monthBounds(offset)
}

/** All-day events carry a bare "YYYY-MM-DD", which is already a civil date. */
function parseDateOnly(s: string) {
  const [y, m, d] = s.split('-').map(Number)
  return civil(y, m - 1, d)
}

function dayKey(d: Date) {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`
}

const timeFmt = new Intl.DateTimeFormat('en-US', {
  timeZone: CLUB_TZ, hour: 'numeric', minute: '2-digit', hour12: true,
})

/** "6:30am" / "7pm" in club time, whatever timezone the browser is in. */
function formatTime(dt: Date) {
  const parts = timeFmt.formatToParts(dt)
  const get = (t: string) => parts.find(p => p.type === t)?.value ?? ''
  const minute = get('minute')
  const ampm = get('dayPeriod').toLowerCase()
  return minute === '00' ? `${get('hour')}${ampm}` : `${get('hour')}:${minute}${ampm}`
}

function shortLocation(loc: string) {
  return loc
    .split(',')[0]
    .replace(/\s*(aquatics?\s*center|recreation\s*center|rec\s*center|pool|swim\s*center)/i, '')
    .trim()
}

/**
 * Blank stand-ins for the first render. The page is prerendered at build time,
 * so anything drawn before mount has to be the same on the server and in the
 * browser — real dates (and the "today" highlight) wait for the effect below.
 */
function placeholderDays(range: Range): ScheduleDay[] {
  // five weeks is the most common month, so the skeleton usually matches the real grid's height
  return Array.from({ length: range === 'week' ? 7 : 35 }, (_, i) => ({
    key: `placeholder-${i}`,
    name: '',
    month: '',
    date: 0,
    isToday: false,
    inMonth: true,
    theme: null,
    practices: [],
  }))
}

/** Every day in the range, pre-seeded with no practices, so gaps still render. */
function emptyDays({ start, end, monthIndex }: Bounds): ScheduleDay[] {
  const today = dayKey(clubDay(new Date()))
  const days: ScheduleDay[] = []
  for (let d = start; d <= end; d = addDays(d, 1)) {
    const key = dayKey(d)
    days.push({
      key,
      name: DAY_NAMES[d.getUTCDay()],
      month: MONTH_NAMES[d.getUTCMonth()],
      date: d.getUTCDate(),
      isToday: key === today,
      inMonth: monthIndex < 0 || d.getUTCMonth() === monthIndex,
      theme: null,
      practices: [],
    })
  }
  return days
}

export function useSchedule(range: Range = 'week', monthOffset = 0) {
  const [days, setDays] = useState<ScheduleDay[]>(() => placeholderDays(range))
  const [label, setLabel] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const b = bounds(range, monthOffset)
    setLabel(b.label)
    // Re-seed immediately so a month change repaints the new grid while we fetch.
    setDays(emptyDays(b))
    setLoading(true)
    setError(false)

    if (!API_KEY) {
      console.warn('VITE_GOOGLE_CALENDAR_API_KEY is not set — schedule will be empty')
      setLoading(false)
      setError(true)
      return
    }

    const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`)
    url.searchParams.set('key', API_KEY)
    // Civil dates are UTC midnights, a few hours off the real ET day edges, so
    // pad a day each side; anything outside the grid is dropped below.
    url.searchParams.set('timeMin', addDays(b.start, -1).toISOString())
    url.searchParams.set('timeMax', addDays(b.end, 2).toISOString())
    url.searchParams.set('singleEvents', 'true')
    url.searchParams.set('orderBy', 'startTime')
    url.searchParams.set('maxResults', '250')

    let cancelled = false

    fetch(url)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then((data: { items?: GCalEvent[] }) => {
        if (cancelled) return
        const list = emptyDays(b)
        const byDay = new Map(list.map(d => [d.key, d]))

        const items = data.items ?? []

        // Pass 1: all-day events set the day's focus. end.date is exclusive,
        // so a single-day event runs from its date to the next one.
        for (const e of items) {
          if (e.start.dateTime || !e.start.date || !e.summary?.trim()) continue
          const theme = matchTheme(e.summary)
          const from = parseDateOnly(e.start.date)
          const to = e.end?.date ? parseDateOnly(e.end.date) : addDays(from, 1)
          for (let d = from; d < to; d = addDays(d, 1)) {
            const day = byDay.get(dayKey(d))
            if (day) day.theme = theme
          }
        }

        // Pass 2: timed events are the practices themselves.
        for (const e of items) {
          if (!e.start.dateTime) continue
          const startAt = new Date(e.start.dateTime)
          // Google omits end only for malformed events; fall back to a one-hour block.
          const endAt = e.end?.dateTime ? new Date(e.end.dateTime) : new Date(startAt.getTime() + 3600_000)
          const day = byDay.get(dayKey(clubDay(startAt)))
          day?.practices.push({
            id: e.id,
            title: e.summary?.trim() || 'DCAC practice',
            time: formatTime(startAt),
            location: e.location ? shortLocation(e.location) : '',
            fullLocation: e.location ?? '',
            start: startAt,
            end: endAt,
            theme: day.theme,
          })
        }

        setDays(list)
        setLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setError(true)
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [range, monthOffset])

  return { days, loading, error, label }
}