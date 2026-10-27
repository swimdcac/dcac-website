import { useEffect, useRef } from 'preact/hooks'
import { Link } from 'wouter'
import { InstagramFeed } from '../components/InstagramFeed.tsx'
import { SchedulePreview } from '../components/SchedulePreview.tsx'
import { Tile } from '../components/Tile.tsx'
import intrasquadPhoto from '../assets/pictures/dcac_intrasquad_meet_2026.webp'

export function HomePage() {
  const heroInnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroInnerRef.current
    // scroll-linked motion is a vestibular trigger; the CSS animations honor this too
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const hero = el.closest('section') as HTMLElement | null
    function onScroll() {
      if (!el || !hero) return
      const y = Math.min(window.scrollY, hero.offsetHeight)
      el.style.transform = `translateY(${y * 0.22}px)`
    }
    window.addEventListener('scroll', onScroll, {
      passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <section className="hero">
        <div className="stars" aria-hidden="true">
          <svg className="star-bob" style={{ top: '42px', right: '9%' }} width="64" height="64" viewBox="0 0 24 24">
            <path d="M12 2 L14.9 8.6 L22 9.2 L16.5 13.9 L18.3 21 L12 17.3 L5.7 21 L7.5 13.9 L2 9.2 L9.1 8.6 Z" fill="#0C447C" />
          </svg>
          <svg className="star-bob b" style={{ top: '128px', right: '22%' }} width="40" height="40" viewBox="0 0 24 24">
            <path d="M12 2 L14.9 8.6 L22 9.2 L16.5 13.9 L18.3 21 L12 17.3 L5.7 21 L7.5 13.9 L2 9.2 L9.1 8.6 Z" fill="#0C447C" />
          </svg>
          <svg className="star-bob c" style={{ top: '34px', right: '30%' }} width="30" height="30" viewBox="0 0 24 24">
            <path d="M12 2 L14.9 8.6 L22 9.2 L16.5 13.9 L18.3 21 L12 17.3 L5.7 21 L7.5 13.9 L2 9.2 L9.1 8.6 Z" fill="#0C447C" />
          </svg>
        </div>
        <div className="wrap">
          <div ref={heroInnerRef} className="hero-inner">
            {/*<span className="eyebrow">DC's LGBTQ+ swim team</span>*/}
            <h1>District of Columbia Aquatics Club</h1>
            <p className="sub">Every body, every stroke, every pace. There's no waitlist - join today!</p>
            <div className="cta">
              <Link className="btn btn-red" href="/schedule" style={{ color: '#fff' }}>Come to a practice</Link>
              <Link className="btn btn-ghost" href="/join">How to join</Link>
            </div>
          </div>
        </div>
        <svg className="waves" viewBox="0 0 680 96" preserveAspectRatio="none" aria-hidden="true">
          <path className="w1" d="M0,30 c56.7,-14 113.3,-14 170,0 c56.7,14 113.3,14 170,0 c56.7,-14 113.3,-14 170,0 c56.7,14 113.3,14 170,0 c56.7,-14 113.3,-14 170,0 c56.7,14 113.3,14 170,0 c56.7,-14 113.3,-14 170,0 c56.7,14 113.3,14 170,0 L1360,96 L0,96 Z" fill="#0C447C" />
          <path className="w2" d="M0,48 c56.7,-13 113.3,-13 170,0 c56.7,13 113.3,13 170,0 c56.7,-13 113.3,-13 170,0 c56.7,13 113.3,13 170,0 c56.7,-13 113.3,-13 170,0 c56.7,13 113.3,13 170,0 c56.7,-13 113.3,-13 170,0 c56.7,13 113.3,13 170,0 L1360,96 L0,96 Z" fill="#185FA5" />
          <path className="w3" d="M0,64 c56.7,-12 113.3,-12 170,0 c56.7,12 113.3,12 170,0 c56.7,-12 113.3,-12 170,0 c56.7,12 113.3,12 170,0 c56.7,-12 113.3,-12 170,0 c56.7,12 113.3,12 170,0 c56.7,-12 113.3,-12 170,0 c56.7,12 113.3,12 170,0 L1360,96 L0,96 Z" fill="#378ADD" />
          <path d="M0,80 c56.7,-10 113.3,-10 170,0 c56.7,10 113.3,10 170,0 c56.7,-10 113.3,-10 170,0 c56.7,10 113.3,10 170,0 L680,96 L0,96 Z" className="shore" fill="#fff" />
        </svg>
      </section>

      <div className="wrap page-main">
        <Link className="feature" href="/trial">
          <div className="ftext">
            <svg className="fstars" width="78" height="34" viewBox="0 0 80 34" aria-hidden="true">
              <path d="M12 2 L14.9 8.6 L22 9.2 L16.5 13.9 L18.3 21 L12 17.3 L5.7 21 L7.5 13.9 L2 9.2 L9.1 8.6 Z" transform="translate(2,4) scale(.8)" fill="#C8102E" />
              <path d="M12 2 L14.9 8.6 L22 9.2 L16.5 13.9 L18.3 21 L12 17.3 L5.7 21 L7.5 13.9 L2 9.2 L9.1 8.6 Z" transform="translate(28,4) scale(.8)" fill="#C8102E" />
              <path d="M12 2 L14.9 8.6 L22 9.2 L16.5 13.9 L18.3 21 L12 17.3 L5.7 21 L7.5 13.9 L2 9.2 L9.1 8.6 Z" transform="translate(54,4) scale(.8)" fill="#C8102E" />
            </svg>
            <p className="tag">New to the team?</p>
            <h2>Your first two swims are free!</h2>
            <p>Just bring a suit, goggles, and yourself. See you in the pool!</p>
            <span className="btn btn-red" style={{ color: '#fff', display: 'inline-block' }}>Plan your first visit</span>
          </div>
          {/* alt="" — the card's own copy already names the destination, so the
              photo would only pad the link's accessible name */}
          <div className="fphoto">
            <img src={intrasquadPhoto} alt="" width="1110" height="740" />
          </div>
        </Link>

        <div className="tiles">
          <Tile
            color="blue"
            id="schedule"
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
            href="/competition"
            title="Competition"
            description="Race days & socials"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path d="M3 9h18M8 2v4M16 2v4" />
              </svg>
            }
          />
          <Tile
            color="purple"
            id="about"
            href="/about"
            title="Who we are"
            description="Our story & community"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="9" cy="8" r="3" />
                <circle cx="17" cy="9" r="2.5" />
                <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5M16 14c2.5 0 5 1.5 5 5" />
              </svg>
            }
          />
          <Tile
            color="deep"
            href="https://www.clubassistant.com/club/login_form.cfm?c=1344"
            title="Member login"
            description="Dues & member info"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
              </svg>
            }
          />
        </div>

        <SchedulePreview />

        <InstagramFeed />

        <p className="reach">Not sure where to start? Email <a href="mailto:membership@swimdcac.org">membership@swimdcac.org</a>.</p>
      </div>
    </>
  )
}
