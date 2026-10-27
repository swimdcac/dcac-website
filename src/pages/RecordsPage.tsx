import { useState, useMemo, useEffect } from 'preact/hooks'
import { Link } from 'wouter'
import { Callout } from '../components/Callout.tsx'
import {
  useRecords, COURSES, SHEET_URL,
  type Course, type RecordKind, type AgeGroup, type RecordLine, type Swim,
} from '../useRecords.ts'
import './RecordsPage.css'

const KINDS: { id: RecordKind; label: string }[] = [
  { id: 'individual', label: 'Individual' },
  { id: 'relay', label: 'Relays' },
]

/**
 * Every record carries its stroke's color — the spine of the table reads as
 * the team's stripe, and the eye can find "all the fly records" without
 * reading a word. Relays follow their leg: free relays are free, medley red.
 */
function strokeClass(event: string) {
  if (/medley/i.test(event)) return 'ev-medley'
  if (/back/i.test(event)) return 'ev-back'
  if (/breast/i.test(event)) return 'ev-breast'
  if (/fly/i.test(event)) return 'ev-fly'
  if (/\bIM\b/i.test(event)) return 'ev-im'
  return 'ev-free'
}

/** Ordered for the legend; ids double as the row's color class. */
const STROKES = [
  { id: 'ev-free', label: 'Free' },
  { id: 'ev-back', label: 'Back' },
  { id: 'ev-breast', label: 'Breast' },
  { id: 'ev-fly', label: 'Fly' },
  { id: 'ev-im', label: 'IM' },
  { id: 'ev-medley', label: 'Medley' },
]

/** Age groups cycle the pride hues, so a chip and its section rail match. */
const HUES = 6

/** Records from the current calendar year get a highlight; it rolls over on its own each January. */
const THIS_YEAR = String(new Date().getFullYear())

const hit = (swim: Swim | null, q: string) =>
  !!swim && swim.names.some(n => n.toLowerCase().includes(q))

function filterGroups(groups: AgeGroup[], age: string, query: string): AgeGroup[] {
  const q = query.trim().toLowerCase()
  return groups
    .filter(g => age === 'all' || g.label === age)
    .map(g => (q
      ? { ...g, lines: g.lines.filter(l => hit(l.men, q) || hit(l.women, q) || hit(l.mixed, q)) }
      : g))
    .filter(g => g.lines.length)
}

export function RecordsPage() {
  const [course, setCourse] = useState<Course>('SCY')
  const [kind, setKind] = useState<RecordKind>('individual')
  const [age, setAge] = useState('all')
  const [query, setQuery] = useState('')
  const { groups, loading, error } = useRecords(course, kind)

  // Mixed and gendered blocks share a label, so the chips key off the label
  // and a pick shows both blocks for that age.
  const ages = useMemo(() => {
    const seen: string[] = []
    for (const g of groups) if (!seen.includes(g.label)) seen.push(g.label)
    return seen
  }, [groups])

  // Relay ages ("18+") and individual ages ("18–24") don't overlap, so a pick
  // that survives a tab change would leave nothing selected.
  useEffect(() => {
    if (age !== 'all' && groups.length && !ages.includes(age)) setAge('all')
  }, [ages, age, groups.length])

  const shown = useMemo(() => filterGroups(groups, age, query), [groups, age, query])

  // Only the strokes actually on screen — relays are free and medley only.
  const legend = useMemo(() => {
    const present = new Set<string>(shown.flatMap(g => g.lines.map(l => strokeClass(l.event))))
    return STROKES.filter(s => present.has(s.id))
  }, [shown])
  const total = shown.reduce((n, g) => n + g.lines.length, 0)
  const searching = query.trim().length > 0
  const courseInfo = COURSES.find(c => c.id === course)!

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <h1>Team records</h1>
            <p className="sub">Every DCAC individual and relay record, straight from the team's record book.</p>
          </div>
        </div>
      </section>

      <div className="wrap page-main" style={{ paddingTop: '48px', paddingBottom: '10px' }}>

        <div className="rec-controls">
          <div className="rec-seg" role="group" aria-label="Course">
            {COURSES.map(c => (
              <button
                key={c.id}
                type="button"
                className={`rec-seg-btn${course === c.id ? ' on' : ''}`}
                aria-pressed={course === c.id}
                title={c.full}
                onClick={() => setCourse(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="rec-seg" role="group" aria-label="Record type">
            {KINDS.map(k => (
              <button
                key={k.id}
                type="button"
                className={`rec-seg-btn${kind === k.id ? ' on' : ''}`}
                aria-pressed={kind === k.id}
                onClick={() => setKind(k.id)}
              >
                {k.label}
              </button>
            ))}
          </div>

          <div className="rec-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m16.5 16.5 4 4" />
            </svg>
            <input
              type="search"
              value={query}
              placeholder="Find a swimmer"
              aria-label="Find a swimmer"
              onInput={e => setQuery((e.target as HTMLInputElement).value)}
            />
          </div>
        </div>

        <p className="rec-course-note">{courseInfo.full}</p>

        {ages.length > 0 && (
          <div className="chips rec-ages">
            <button
              type="button"
              className={`chip ${age === 'all' ? 'd' : 'b'}`}
              aria-pressed={age === 'all'}
              onClick={() => setAge('all')}
            >
              <span className="rec-dot rec-dot-all" aria-hidden="true" />
              All ages
            </button>
            {ages.map((a, i) => (
              <button
                key={a}
                type="button"
                className={`chip ${age === a ? 'd' : 'b'} hue-${i % HUES}`}
                aria-pressed={age === a}
                onClick={() => setAge(a)}
              >
                <span className="rec-dot" aria-hidden="true" />
                {a}
              </button>
            ))}
          </div>
        )}

        {error ? (
          <div className="rec-msg">
            <p>
              We couldn't load the record book just now. You can always read it straight from{' '}
              <a href={SHEET_URL} target="_blank" rel="noopener noreferrer">the team's spreadsheet</a>,
              or email <a href="mailto:competition@swimdcac.org">competition@swimdcac.org</a>.
            </p>
          </div>
        ) : loading ? (
          <RecordsSkeleton />
        ) : total === 0 ? (
          <div className="rec-msg">
            <p>
              {searching
                ? <>No records here for “{query.trim()}”. Try another spelling, or a different course or age group.</>
                : <>No records posted for this group yet.</>}
            </p>
          </div>
        ) : (
          <>
            <div className="rec-bar">
              <p className="rec-count">
                {total} record{total === 1 ? '' : 's'}
                {searching && <> matching “{query.trim()}”</>}
              </p>
              <div className="rec-legend">
                {legend.map(s => <span key={s.id} className={`rec-key ${s.id}`}>{s.label}</span>)}
              </div>
            </div>
            {shown.map(group => (
              <GroupBlock key={group.id} group={group} hue={ages.indexOf(group.label) % HUES} />
            ))}
          </>
        )}

        <div className="rec-igla">
          <Callout>
            <p>
              Several DCAC swimmers also hold IGLA+ world records.{' '}
              <a href="https://www.igla.org/swimmingrecords" target="_blank" rel="noopener noreferrer">
                See the IGLA+ swimming records
              </a>.
            </p>
          </Callout>
        </div>

        <div className="rec-disclaimer">
          <Callout tone="purple">
            <p>
              The men's and women's columns here are an outdated standard
              and are not a statement about who exists or belongs on this team. DCAC welcomes and
              values swimmers of every gender identity. Transgender, non-binary, and
              gender-nonconforming swimmers are full and valued members of the club. DCAC members
              self-identify for record categories and are welcome wherever they feel comfortable.{' '}
              Our commitment to inclusion can be found <Link href="/about#inclusion">here</Link>.
            </p>
          </Callout>
        </div>

        <p className="reach">
          Records are kept in{' '}
          <a href={SHEET_URL} target="_blank" rel="noopener noreferrer">the team's record book</a>{' '}
          and this page reads from it directly. Email{' '}
          <a href="mailto:competition@swimdcac.org">competition@swimdcac.org</a> for any fixes.
        </p>
      </div>
    </>
  )
}

function GroupBlock({ group, hue }: { group: AgeGroup; hue: number }) {
  return (
    <section className={`rec-group hue-${hue}`}>
      <h2 className="rec-group-title">
        {group.label}
        {group.mixed && <span className="rec-group-tag">Mixed</span>}
      </h2>

      <table className={`rec-table${group.mixed ? ' solo' : ''}`}>
        <thead>
          <tr>
            {group.mixed ? (
              <>
                <th scope="col" className="rec-event-col">Event</th>
                <th scope="col">Mixed</th>
              </>
            ) : (
              <>
                <th scope="col" className="rec-men-col">Men</th>
                <th scope="col" className="rec-event-col">Event</th>
                <th scope="col">Women</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {group.lines.map(line => <Row key={line.event} line={line} mixed={group.mixed} />)}
        </tbody>
      </table>
    </section>
  )
}

function Row({ line, mixed }: { line: RecordLine; mixed: boolean }) {
  if (mixed) {
    return (
      <tr className={strokeClass(line.event)}>
        <th scope="row" className="rec-event">{line.event}</th>
        <SwimCell swim={line.mixed} side="left" label="Mixed" />
      </tr>
    )
  }
  return (
    <tr className={strokeClass(line.event)}>
      <SwimCell swim={line.men} side="right" label="Men" />
      <th scope="row" className="rec-event">{line.event}</th>
      <SwimCell swim={line.women} side="left" label="Women" />
    </tr>
  )
}

function SwimCell({ swim, side, label }: { swim: Swim | null; side: 'left' | 'right'; label: string }) {
  const fresh = swim?.year === THIS_YEAR
  return (
    <td className={`rec-side rec-${side}${swim ? '' : ' rec-open'}${fresh ? ' rec-fresh' : ''}`}>
      {/* the side is obvious from the column on a wide screen; once the rows
          stack on a phone, each entry has to say which side it is */}
      <span className="rec-tag">{label}</span>
      {swim ? (
        <>
          <span className="rec-time">{swim.time}</span>
          <span className="rec-who">
            {swim.names.join(' · ')}
            {swim.year && (fresh
              ? <> <span className="rec-year rec-year-new">{swim.year}<span className="rec-sr"> — set this year</span></span></>
              : <span className="rec-year"> · {swim.year}</span>)}
          </span>
        </>
      ) : (
        <span className="rec-time rec-dash" title="No record yet">—</span>
      )}
    </td>
  )
}

function RecordsSkeleton() {
  return (
    <section className="rec-group" aria-hidden="true">
      <span className="rec-skel rec-skel-title" />
      {Array.from({ length: 8 }, (_, i) => <span key={i} className="rec-skel rec-skel-row" />)}
    </section>
  )
}
