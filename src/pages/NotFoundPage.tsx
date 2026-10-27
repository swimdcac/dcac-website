import { useLocation } from 'wouter'
import { Tile } from '../components/Tile.tsx'
import './NotFoundPage.css'

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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11l9-7 9 7" />
                <path d="M5 10v10h14V10" />
              </svg>
            }
          />
          <Tile
            color="blue"
            href="/schedule"
            title="Practice times"
            description="When & where we swim"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            }
          />
          <Tile
            color="red"
            href="/trial"
            title="Try a practice"
            description="Your first two swims are free"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M2 16c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" />
                <path d="M2 20c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" />
                <circle cx="15" cy="7" r="2" />
                <path d="M4 12l5-4 3 3" />
              </svg>
            }
          />
          <Tile
            color="purple"
            href="/faq"
            title="FAQ"
            description="Answers for new swimmers"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M9.5 9.5a2.5 2.5 0 0 1 4.8 1c0 1.7-2.3 2-2.3 3.5" />
                <path d="M12 17.5h.01" />
              </svg>
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
