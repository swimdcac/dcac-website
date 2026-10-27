import { Link } from 'wouter'
import { useSchedule } from '../useSchedule.ts'
import { ThemeTag } from './ThemeTag.tsx'
import './SchedulePreview.css'
import { Icon } from './Icon.tsx'
import flameSvg from '../assets/icons/flame.svg?raw'

export function SchedulePreview() {
  const { days, loading, error } = useSchedule()

  return (
    <div className="sched">
      <div className="sched-head">
        <span className="lbl">
          <Icon svg={flameSvg} />
          This week in the pool
        </span>
        <Link href="/schedule">Full schedule →</Link>
      </div>
      {error ? (
        <p className="sched-msg">Schedule unavailable right now — email us and we'll tell you when we're swimming.</p>
      ) : (
        <ol className={`week${loading ? ' loading' : ''}`}>
          {days.map(d => (
            <li key={d.key} className={`day${d.isToday ? ' today' : ''}${d.practices.length ? '' : ' rest'}`}>
              <div className="day-head">
                <span className="day-name">{d.isToday ? 'Today' : d.name}</span>
                <span className="day-num">{d.date || ''}</span>
              </div>
              {!loading && <ThemeTag theme={d.theme} />}
              {loading ? (
                <span className="day-skel" aria-hidden="true" />
              ) : d.practices.length ? (
                d.practices.map(p => (
                  <div key={p.id} className="practice">
                    <span className="p-time">{p.time}</span>
                    {p.location && <span className="p-loc">{p.location}</span>}
                  </div>
                ))
              ) : (
                <span className="day-off">Rest</span>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}