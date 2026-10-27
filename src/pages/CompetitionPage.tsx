import { Link } from 'wouter'
import { Callout } from '../components/Callout.tsx'
import { Tile } from '../components/Tile.tsx'
import { PagePhoto } from '../components/PagePhoto.tsx'
import meetPhoto from '../assets/pictures/craig_mallory_pablo_lauren.webp'
import './CompetitionPage.css'

const records = [
  {
    color: 'blue' as const,
    title: '11× IGLA+ World Champions',
    description: 'Including 2001, 2003–2005, 2008, 2011, 2013, and 2025',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
        <path d="M7 6H4v1.5A3.5 3.5 0 0 0 7.5 11M17 6h3v1.5a3.5 3.5 0 0 1-3.5 3.5" />
        <path d="M12 14v4M9.5 21h5M10.5 18h3" />
      </svg>
    ),
  },
  {
    color: 'red' as const,
    title: '2000 USMS National Championships',
    description: "Men's Champions & Combined Runner Up",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21v-6h5v6M9.5 21V9h5v12M15 21v-8h5v8M2.5 21h19" />
      </svg>
    ),
  },
  {
    color: 'purple' as const,
    title: 'USMS All Americans & record holders',
    description: 'Multiple DCAC swimmers',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8.5" r="5.5" />
        <path d="M8.5 13.2 7 21l5-2.6 5 2.6-1.5-7.8" />
      </svg>
    ),
  },
  {
    color: 'deep' as const,
    title: 'IGLA World record holders',
    description: 'Multiple DCAC swimmers',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="13.5" r="7.5" />
        <path d="M12 10v3.5l2.5 1.5M9.5 2h5M19 5.5 20.5 7" />
      </svg>
    ),
  },
]

export function CompetitionPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            {/*<span className="eyebrow">Competition</span>*/}
            <h1>Competition</h1>
            {/*<p className="sub">From local Masters meets to world championships — DCAC competes everywhere and wins.</p>*/}
          </div>
        </div>
      </section>

      <div className="wrap page-main" style={{ paddingTop: '48px', paddingBottom: '10px' }}>

        <section className="meets-section">
          <h2 className="section-title">Upcoming meets</h2>
          <div className="meets-cta-card">
            <p className="meets-cta-label">No schedule posted yet</p>
            <p className="meets-cta-body">DCAC participates in 4–5 focus meets each year — some local, others hosted by teams around the country and world. For the latest upcoming competition opportunities, reach out to the competition committee.</p>
            <a className="btn btn-red" href="mailto:competition@swimdcac.org" style={{ color: '#fff', display: 'inline-block', marginTop: '18px' }}>
              Email the competition chair
            </a>
          </div>
        </section>

        <PagePhoto
          src={meetPhoto}
          alt="Four DCAC swimmers on a pool deck at a meet, arm in arm and smiling, three in team caps and suits and one in a DCAC T-shirt."
          width={1200}
          height={800}
        />

        <section className="meets-section">
          <h2 className="section-title">IGLA+</h2>
          <p className="section-body">
            DCAC's marquee event each year is either the <strong>IGLA+ World Championships</strong> or the <strong>Gay Games</strong>. We've been travelling to them for three decades, and we proudly hosted the championships in <strong>1996</strong>, <strong>2008</strong>, and again in <strong>2025</strong> here in Washington, DC.
          </p>

          <div className="meets-cta-card igla-panel">
            <h3>What is IGLA+?</h3>
            <p>
              IGLA+ is the <strong>International Group of LGBTQIA+ Aquatics</strong>, previously known as International Gay &amp; Lesbian Aquatics. It is the world's foremost organization devoted to swimming, water polo, diving, and artistic swimming within the LGBTQIA+ community and amongst its allies, with more than 100 member clubs across six continents. DCAC is one of them.
            </p>
            <p>
              IGLA+'s annual championship competition draw athletes from more than 30 countries. The meet closes with the <strong>Pink Flamingo</strong>, which you'll just have to see to understand.
            </p>
            <p style={{ marginTop: '18px' }}>
              <a href="https://www.igla.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue-600)', fontWeight: 600 }}>
                More at igla.org →
              </a>
            </p>
          </div>
        </section>

        <section className="meets-section">
          <h2 className="section-title">IGLA scholarships</h2>
          <p className="section-body">
            DCAC will award an undetermined number of scholarships to DCAC swimmers to aid in offsetting expenses for swimmers competing in the annual IGLA+ Championship.
          </p>
          <p className="section-body scholarship-lead">Award recipients are required to:</p>
          <ul className="dot-list">
            <li>Compete in the maximum allowable number of individual and relay events</li>
            <li>Take part in the Pink Flamingo performance at the meet</li>
            <li>Actively participate in DCAC fundraising and volunteer events</li>
          </ul>
          <div style={{ marginTop: '18px' }}>
            <Callout>
              <p>
                If interested, please request an application from <a href="mailto:treasurer@swimdcac.org">treasurer@swimdcac.org</a>.
                The Yolanda Markey and Marcay Dickens &amp; Joan Dever funds also help swimmers get to IGLA —{' '}
                <Link href="/scholarships">see all scholarships</Link>.
              </p>
            </Callout>
          </div>
        </section>

        <section className="meets-section">
          <h2 className="section-title">Our record</h2>
          <div className="tiles record-tiles">
            {records.map(r => (
              <Tile
                key={r.title}
                color={r.color}
                title={r.title}
                description={r.description}
                icon={r.icon}
              />
            ))}
          </div>
        </section>

        <section className="meets-section">
          <h2 className="section-title">Beyond the pool</h2>
          <p className="section-body" style={{ marginBottom: '14px' }}>
            Many DCAC swimmers also compete in open water swims, triathlons, and running races. Our members are active across DC-area LGBTQ+ sports leagues:
          </p>
          <div className="tiles">
            <Tile
              color="blue"
              href="https://www.dcfrontrunners.org"
              external
              title="DC Front Runners"
              description="Running & walking club"
            />
            <Tile
              color="purple"
              href="https://www.dctriclub.org/series/triout-events/"
              external
              title="TriOut Multisport"
              description="LGBTQ+ triathlon club"
            />
            <Tile
              color="red"
              href="https://dseahorses.org/"
              external
              title="DSeahorses"
              description="Water polo club"
            />
          </div>
        </section>

        <div className="sched" style={{ marginBottom: '30px' }}>
          <div className="sched-head">
            <span className="lbl">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
              </svg>
              Team records
            </span>
            <Link href="/records">View all records →</Link>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
            DCAC records individual and relay records in SCY, SCM, and LCM for every USMS age group.
          </p>
        </div>

        <p className="reach">
          Questions about competition? Email <a href="mailto:competition@swimdcac.org">competition@swimdcac.org</a>.
        </p>
      </div>
    </>
  )
}
