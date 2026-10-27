import { useEffect, useRef } from 'preact/hooks'
import { Link } from 'wouter'
import { InstagramFeed } from '../components/InstagramFeed.tsx'
import { SchedulePreview } from '../components/SchedulePreview.tsx'
import { Tile } from '../components/Tile.tsx'
import intrasquadPhoto from '../assets/pictures/dcac_intrasquad_meet_2026.webp'
import { Icon } from '../components/Icon.tsx'
import calendarSvg from '../assets/icons/calendar.svg?raw'
import clockSvg from '../assets/icons/clock.svg?raw'
import peopleSvg from '../assets/icons/people.svg?raw'
import personSvg from '../assets/icons/person.svg?raw'
import starSolidSvg from '../assets/icons/star-solid.svg?raw'
import starsRowSvg from '../assets/icons/stars-row.svg?raw'

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
          <Icon svg={starSolidSvg} className="star-bob" style={{ top: '42px', right: '9%' }} width="64" height="64" fill="#0C447C" />
          <Icon svg={starSolidSvg} className="star-bob b" style={{ top: '128px', right: '22%' }} width="40" height="40" fill="#0C447C" />
          <Icon svg={starSolidSvg} className="star-bob c" style={{ top: '34px', right: '30%' }} width="30" height="30" fill="#0C447C" />
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
            <Icon svg={starsRowSvg} className="fstars" />
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
              <Icon svg={clockSvg} />
            }
          />
          <Tile
            color="red"
            href="/competition"
            title="Competition"
            description="Race days & socials"
            icon={
              <Icon svg={calendarSvg} />
            }
          />
          <Tile
            color="purple"
            id="about"
            href="/about"
            title="Who we are"
            description="Our story & community"
            icon={
              <Icon svg={peopleSvg} />
            }
          />
          <Tile
            color="deep"
            href="https://www.clubassistant.com/club/login_form.cfm?c=1344"
            title="Member login"
            description="Dues & member info"
            icon={
              <Icon svg={personSvg} />
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
