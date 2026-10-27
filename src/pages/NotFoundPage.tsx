import { useLocation } from 'wouter'
import { Tile } from '../components/Tile.tsx'
import './NotFoundPage.css'
import { Icon } from '../components/Icon.tsx'
import clockSvg from '../assets/icons/clock.svg?raw'
import helpCircleSvg from '../assets/icons/help-circle.svg?raw'
import homeSvg from '../assets/icons/home.svg?raw'
import swimmerSvg from '../assets/icons/swimmer.svg?raw'

/* Anything the router doesn't recognize lands here. On GitHub Pages the
   request itself is served by 404.html (a copy of the app), so the browser
   still gets a real 404 status. */
export function NotFoundPage() {
  const [path] = useLocation()

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <p className="nf-code">404</p>
            <h1>Wrong lane!</h1>
            <p className="sub">
              We couldn't find <code className="nf-path">{path}</code>. It may have moved, or the link might have a typo.
            </p>
          </div>
        </div>
      </section>

      <div className="wrap page-main" style={{ paddingTop: '48px', paddingBottom: '10px' }}>
        <h2 className="section-title">Try one of these instead</h2>
        <div className="tiles">
          <Tile
            color="deep"
            href="/"
            title="Home"
            description="Start from the top"
            icon={
              <Icon svg={homeSvg} />
            }
          />
          <Tile
            color="blue"
            href="/schedule"
            title="Practice times"
            description="When & where we swim"
            icon={
              <Icon svg={clockSvg} />
            }
          />
          <Tile
            color="red"
            href="/trial"
            title="Try a practice"
            description="Your first two swims are free"
            icon={
              <Icon svg={swimmerSvg} />
            }
          />
          <Tile
            color="purple"
            href="/faq"
            title="FAQ"
            description="Answers for new swimmers"
            icon={
              <Icon svg={helpCircleSvg} />
            }
          />
        </div>

        <p className="reach">
          Followed a link from our site and ended up here? Let us know at{' '}
          <a href="mailto:publicity@swimdcac.org">publicity@swimdcac.org</a>.
        </p>
      </div>
    </>
  )
}
