import { Link } from 'wouter'
import pools from '../content/pools.json'
import './DirectionsPage.css'
import { Icon } from '../components/Icon.tsx'
import idCardSvg from '../assets/icons/id-card.svg?raw'
import mapPinSvg from '../assets/icons/map-pin.svg?raw'
import arrowUpRightSvg from '../assets/icons/arrow-up-right.svg?raw'

type Pool = (typeof pools)[number]

const indoor = pools.filter(p => p.type === 'indoor')
const outdoor = pools.filter(p => p.type === 'outdoor')

/** Google Maps search for the pool itself — the name finds the right entrance better than the bare address. */
const mapsUrl = (p: Pool) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${p.name}, ${p.address.join(', ')}`)}`

/**
 * Opens Apple's own listing for the pool by its place ID (Share → Copy Link in
 * Apple Maps). Versions of Maps that predate place IDs ignore it and look up the
 * address instead — street and city only, since a middle line (Gallaudet's) is a
 * description it can't geocode.
 */
const appleMapsUrl = (p: Pool) => {
  const address = `${p.address[0]}, ${p.address[p.address.length - 1]}`
  return `https://maps.apple.com/place?place-id=${p.applePlaceId}&address=${encodeURIComponent(address)}&name=${encodeURIComponent(p.name)}`
}

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
      <div className="pool-maps">
        {[{ app: 'Google Maps', href: mapsUrl(pool) }, { app: 'Apple Maps', href: appleMapsUrl(pool) }].map(({ app, href }) => (
          <a key={app} className="pool-map" href={href} target="_blank" rel="noopener noreferrer"
            aria-label={`Open ${pool.name} in ${app} (opens in a new tab)`}>
            <Icon svg={mapPinSvg} />
            {app}
            <Icon svg={arrowUpRightSvg} className="pool-map-out" />
          </a>
        ))}
      </div>

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

      {'photoId' in pool && pool.photoId && (
        <div className="pool-section">
          <span className="pool-tag">
            <Icon svg={idCardSvg} />
            Photo ID required
          </span>
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
            {pool.metro.lines.map(line => (
              <span key={line} className={`metro-line metro-${line}`}>
                {line[0].toUpperCase() + line.slice(1)} Line
              </span>
            ))}
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
