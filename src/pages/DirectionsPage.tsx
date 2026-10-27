import { Link } from 'wouter'
import pools from '../content/pools.json'
import './DirectionsPage.css'

type Pool = (typeof pools)[number]

const indoor = pools.filter(p => p.type === 'indoor')
const outdoor = pools.filter(p => p.type === 'outdoor')

/** Google Maps search for the pool itself — the name finds the right entrance better than the bare address. */
const mapsUrl = (p: Pool) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${p.name}, ${p.address.join(', ')}`)}`

const LOCKER_ROOMS = [
  { key: 'mens', label: "Men's" },
  { key: 'womens', label: "Women's" },
  { key: 'family', label: 'Family' },
] as const

function PoolCard({ pool }: { pool: Pool }) {
  return (
    <article className="pool" id={pool.id}>
      <h3 className="pool-name">{pool.name}</h3>
      <address className="pool-address">
        {pool.address.map(line => <span key={line}>{line}</span>)}
      </address>
      <a className="pool-map" href={mapsUrl(pool)} target="_blank" rel="noopener noreferrer">
        Open in Google Maps →
      </a>

      {'lockerRooms' in pool && pool.lockerRooms && (
        <div className="pool-section">
          <span className="pool-label">Locker rooms</span>
          <ul className="pool-lockers">
            {LOCKER_ROOMS.map(({ key, label }) => {
              const has = pool.lockerRooms[key]
              return (
                <li key={key} className={has ? 'yes' : 'no'}>
                  <span aria-hidden="true">{has ? '✓' : '✕'}</span>
                  {has ? label : `No ${label.toLowerCase()}`}
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {'directions' in pool && pool.directions && (
        <div className="pool-section">
          <span className="pool-label">Getting in &amp; parking</span>
          <p>{pool.directions}</p>
        </div>
      )}

      {'metro' in pool && pool.metro && (
        <div className="pool-section">
          <span className="pool-label">Metro</span>
          <p className="pool-metro">
            <span className={`metro-line metro-${pool.metro.line}`}>
              {pool.metro.line[0].toUpperCase() + pool.metro.line.slice(1)} Line
            </span>
            {pool.metro.distance} {pool.metro.station} station
          </p>
        </div>
      )}
    </article>
  )
}

export function DirectionsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <h1>Pool directions</h1>
            <p className="sub">We practice at a variety of pools throughout the year.</p>
          </div>
        </div>
      </section>

      <div className="wrap page-main" style={{ paddingTop: '48px', paddingBottom: '10px' }}>
        <p className="section-body pools-intro">
          Check the <Link href="/schedule">practice calendar</Link> to see which pool we're at each day.
        </p>

        <nav className="pools-jump" aria-label="Jump to a pool">
          {[{ label: 'Indoor', list: indoor }, { label: 'Outdoor', list: outdoor }].map(({ label, list }) => (
            <div className="pools-jump-group" key={label}>
              <span className="pool-label">{label}</span>
              <div className="chips">
                {list.map(p => <a key={p.id} className="chip b" href={`#${p.id}`}>{p.name}</a>)}
              </div>
            </div>
          ))}
        </nav>

        <section className="meets-section">
          <h2 className="section-title">Indoor pools</h2>
          <div className="pools">
            {indoor.map(p => <PoolCard key={p.id} pool={p} />)}
          </div>
        </section>

        <section className="meets-section">
          <h2 className="section-title">Outdoor pools</h2>
          <div className="pools">
            {outdoor.map(p => <PoolCard key={p.id} pool={p} />)}
          </div>
        </section>

        <p className="reach">
          Directions out of date? Email <a href="mailto:cocaptain@swimdcac.org">cocaptain@swimdcac.org</a>.
        </p>
      </div>
    </>
  )
}
