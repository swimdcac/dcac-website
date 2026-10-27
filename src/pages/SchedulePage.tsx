import { Link } from 'wouter'
import { useState, useMemo, useRef, useEffect } from 'preact/hooks'
import { useSchedule, WEEKDAYS, type ScheduleDay } from '../useSchedule.ts'
import { ThemeTag } from '../components/ThemeTag.tsx'
import {
  downloadPractice, googlePracticeUrl, embedUrl,
  subscribeApple, subscribeGoogle, subscribeIcs,
} from '../calendarLinks.ts'
import './SchedulePage.css'

export function SchedulePage() {
  const [offset, setOffset] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const { days, loading, error, label } = useSchedule('month', offset)

  const selected = useMemo(
    () => (picked ? days.find(d => d.key === picked) ?? null : null),
    [days, picked],
  )

  const total = days.reduce((n, d) => n + (d.inMonth ? d.practices.length : 0), 0)

  function go(delta: number) {
    setOffset(o => o + delta)
    setPicked(null)
  }

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <h1>Schedule</h1>
            <p className="sub">Every practice on the calendar. All times Eastern.</p>
          </div>
        </div>
      </section>

      <div className="wrap page-main" style={{ paddingTop: '48px', paddingBottom: '10px' }}>
        <SubscribeBar />

        {error ? (
          <section className="meets-section">
            <p className="sched-msg">
              Our calendar view is having trouble loading, so here's the schedule straight from
              Google. Still stuck? Email{' '}
              <a href="mailto:cocaptain@swimdcac.org">cocaptain@swimdcac.org</a>.
            </p>
            <iframe
              className="embed-frame"
              src={embedUrl}
              title="DCAC practice calendar"
              loading="lazy"
            />
          </section>
        ) : (
          <section className="meets-section">
            <div className="cal-bar">
              <button
                className="cal-nav"
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous month"
              >
                ‹
              </button>
              <h2 className="cal-title">{label}</h2>
              <button
                className="cal-nav"
                type="button"
                onClick={() => go(1)}
                aria-label="Next month"
              >
                ›
              </button>
              <span className="cal-count">
                {loading ? 'Loading…' : `${total} practice${total === 1 ? '' : 's'}`}
              </span>
              {offset !== 0 && (
                <button className="cal-today" type="button" onClick={() => { setOffset(0); setPicked(null) }}>
                  Today
                </button>
              )}
            </div>

            <div className={`cal${loading ? ' loading' : ''}`}>
              <div className="cal-dow" aria-hidden="true">
                {WEEKDAYS.map(d => <span key={d}>{d}</span>)}
              </div>
              <div className="cal-grid" style={{ gridTemplateRows: `repeat(${days.length / 7}, minmax(88px, auto))` }}>
                {days.map(d => (
                  <DayCell
                    key={d.key}
                    day={d}
                    loading={loading}
                    selected={selected?.key === d.key}
                    onPick={() => setPicked(d.key)}
                  />
                ))}
              </div>
            </div>

            <p className="cal-hint">Pick a day to add its practices to your calendar.</p>
          </section>
        )}

        <DayModal day={selected} onClose={() => setPicked(null)} />

        <p className="reach">
          Not sure how to get there? See <Link href="/directions">pool directions</Link>.{' '}
          Times or pools look wrong? Email{' '}
          <a href="mailto:cocaptain@swimdcac.org">cocaptain@swimdcac.org</a>.
        </p>
      </div>

    </>
  )
}

function SubscribeBar() {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(subscribeIcs)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // No clipboard access (insecure context, or the user denied it) — hand
      // them the file instead so the action still does something useful.
      window.open(subscribeIcs, '_blank', 'noopener')
    }
  }

  return (
    <div className="subscribe">
      <span className="subscribe-lbl">Subscribe to calendar</span>
      <a className="mini" href={subscribeGoogle} target="_blank" rel="noopener noreferrer">Google</a>
      <a className="mini" href={subscribeApple}>Apple</a>
      <button className="mini" type="button" onClick={copy}>
        {copied ? 'Copied ✓' : 'Copy iCal link'}
      </button>
    </div>
  )
}

function DayModal({ day, onClose }: { day: ScheduleDay | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (day && !el.open) el.showModal()
    else if (!day && el.open) el.close()
    // showModal() blocks interaction but not scrolling, so pin the page ourselves.
    document.body.classList.toggle('modal-open', !!day)
    return () => document.body.classList.remove('modal-open')
  }, [day])

  return (
    <dialog
      className="day-modal"
      ref={ref}
      onClose={onClose}
      // The dialog box is the backdrop; the padded inner div swallows content clicks.
      onClick={e => { if (e.target === ref.current) ref.current?.close() }}
      aria-labelledby="day-modal-title"
    >
      {day && (
        <div className="modal-inner">
          <div className="modal-head">
            <div>
              <p className="modal-dow">{day.isToday ? 'Today' : day.name}</p>
              <h3 className="modal-date" id="day-modal-title">{day.month} {day.date}</h3>
              {day.theme && (
                <span className="modal-theme">
                  <ThemeTag theme={day.theme} variant="pill" />
                </span>
              )}
            </div>
            <button className="modal-x" type="button" onClick={() => ref.current?.close()} aria-label="Close">
              ✕
            </button>
          </div>
          <ul className="detail-list">
            {day.practices.map(p => (
              <li key={p.id} className="ev">
                <div className="ev-main">
                  <span className="ev-time">{p.time}</span>
                  <span className="ev-title">{p.title}</span>
                  {p.fullLocation && <span className="ev-loc">{p.fullLocation}</span>}
                </div>
                <div className="ev-add">
                  <span className="ev-add-lbl">Add to</span>
                  <a
                    className="mini"
                    href={googlePracticeUrl(p)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google
                  </a>
                  <button className="mini" type="button" onClick={() => downloadPractice(p)}>
                    Apple
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </dialog>
  )
}

interface DayCellProps {
  day: ScheduleDay
  loading: boolean
  selected: boolean
  onPick: () => void
}

/** The cell's aria-label replaces everything drawn inside it, so it has to
 *  carry what a sighted visitor reads off the cell: today, theme, and times. */
function cellLabel(day: ScheduleDay) {
  // placeholder cells before the schedule arrives have no date yet
  if (!day.date) return 'Loading'
  const date = `${day.isToday ? 'Today, ' : ''}${day.name} ${day.month} ${day.date}`
  const n = day.practices.length
  if (!n) return `${date}, no practices`
  const times = day.practices.map(p => (p.location ? `${p.time} at ${p.location}` : p.time)).join('; ')
  return `${date}, ${n} practice${n === 1 ? '' : 's'}${day.theme ? `, ${day.theme.label}` : ''}: ${times}`
}

function DayCell({ day, loading, selected, onPick }: DayCellProps) {
  const has = day.practices.length > 0
  const cls = [
    'cal-cell',
    day.inMonth ? '' : 'out',
    day.isToday ? 'today' : '',
    selected ? 'sel' : '',
    has ? 'has' : '',
  ].filter(Boolean).join(' ')

  return (
    <button
      className={cls}
      type="button"
      onClick={onPick}
      disabled={!has}
      aria-label={loading ? 'Loading' : cellLabel(day)}
      aria-haspopup="dialog"
    >
      <span className="cell-top">
        <span className="cell-num">{day.date || ''}</span>
        <ThemeTag theme={day.theme} variant="dot" />
      </span>
      {loading ? (
        <span className="cell-skel" aria-hidden="true" />
      ) : (
        <>
          <ThemeTag theme={day.theme} />
          <span className="cell-events">
            {day.practices.map(p => (
              <span key={p.id} className="cell-ev">
                <span className="cell-ev-time">{p.time}</span>
                {p.location && <span className="cell-ev-loc">{p.location}</span>}
              </span>
            ))}
          </span>
          {/* compact stand-in on phones, where the cells are too narrow for text */}
          <span className="cell-dots" aria-hidden="true">
            {day.practices.map(p => <span key={p.id} className="dot" />)}
          </span>
        </>
      )}
    </button>
  )
}