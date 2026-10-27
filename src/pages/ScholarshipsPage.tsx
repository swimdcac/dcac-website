import { Callout } from '../components/Callout.tsx'
import teamFlagPhoto from '../assets/pictures/gg_dc_flag.webp'
import piggybackPhoto from '../assets/pictures/outdoor_pool_piggyback.webp'
import './ScholarshipsPage.css'

const TREASURER = 'treasurer@swimdcac.org'
const Treasurer = () => <a href={`mailto:${TREASURER}`}>{TREASURER}</a>

interface Program {
  id: string
  title: string
  /** who it's for, in a few words — shown as the card's tag */
  audience: string
  body: string
  requirements: string[]
  /** fees the award doesn't cover */
  note?: string
  /** the Under 30 Award is requested, not applied for */
  cta?: string
}

const programs: Program[] = [
  {
    id: 'igla',
    title: 'IGLA Scholarships',
    audience: 'Swimmers competing at IGLA',
    body: 'DCAC will award an undetermined number of scholarships to DCAC swimmers to aid in offsetting expenses for swimmers competing in the yearly IGLA World Championships.',
    requirements: [
      'Compete in the maximum allowable number of individual and relay events',
      'Take part in the Pink Flamingo performance at the meet',
      'Actively participate in DCAC volunteering and fundraising events',
    ],
  },
  {
    id: 'dues',
    title: 'Membership Dues Scholarships',
    audience: 'Swimmers facing financial challenges',
    body: 'DCAC will award an undetermined number of scholarships to DCAC swimmers to aid in the cost of membership dues for those who are financially challenged. Apply at any time during the year.',
    requirements: ['Actively participate in DCAC volunteering and fundraising events'],
    note: 'USMS and DPR RecTrac fees still apply.',
  },
  {
    id: 'under-30',
    title: 'Under 30 Award',
    audience: 'Swimmers under 30',
    body: 'DCAC will provide an undetermined number of awards to DCAC swimmers under 30 years of age, to retain and encourage young swimmers to stay engaged with the team. The award is spread out over the course of the calendar year and is available to swimmers on quarterly memberships. Request it at any time during the year.',
    requirements: [],
    note: 'USMS and DPR RecTrac fees still apply.',
    cta: 'Request the award',
  },
]

/** How to give to either memorial fund — only the fund's name changes. */
function DonateToFund({ fund, stock }: { fund: string; stock?: boolean }) {
  return (
    <div className="sch-donate">
      <Callout tone="purple">
        <p className="sch-donate-lead">Make a tax-deductible donation to the {fund}:</p>
        <ul className="dot-list compact sch-donate-ways">
          <li><strong>Venmo</strong> @swimdcac</li>
          <li><strong>PayPal</strong> to <Treasurer /></li>
          <li><strong>Check</strong> made out to DCAC, given to any board member</li>
          {stock && <li><strong>Stock</strong> — contact our treasurer</li>}
        </ul>
        <p>Make sure to note that your donation is for the {fund}.</p>
      </Callout>
    </div>
  )
}

export function ScholarshipsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <h1>Scholarships</h1>
            <p className="sub">Help with dues and with getting to IGLA, so cost is never the reason someone can't swim with us.</p>
          </div>
        </div>
      </section>

      <div className="wrap page-main" style={{ paddingTop: '48px', paddingBottom: '10px' }}>

        <section className="meets-section">
          <h2 className="section-title">DCAC scholarships</h2>
          <div className="sch-programs">
            {programs.map(p => (
              <article className="sch-program" id={p.id} key={p.id}>
                <span className="sch-audience">{p.audience}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                {p.requirements.length > 0 && (
                  <>
                    <p className="sch-req-lead">Award recipients are required to:</p>
                    <ul className="dot-list compact sch-reqs">
                      {p.requirements.map(r => <li key={r}>{r}</li>)}
                    </ul>
                  </>
                )}
                {p.note && <p className="sch-note">{p.note}</p>}
                <a className="sch-apply" href={`mailto:${TREASURER}`}>{p.cta ?? 'Request an application'} →</a>
              </article>
            ))}
          </div>
        </section>

        {/* two portrait shots side by side; stacks on narrow screens */}
        <figure className="sch-photos">
          <img
            src={teamFlagPhoto}
            alt="About twenty DCAC swimmers in suits and costume wigs pose on the grass beside an outdoor pool under palm trees, holding up a DC flag."
            width={900}
            height={1200}
            loading="lazy"
          />
          <img
            src={piggybackPhoto}
            alt="Four smiling DCAC swimmers in pairs, two riding piggyback on the other two, on the grass beside an outdoor pool."
            width={900}
            height={1200}
            loading="lazy"
          />
        </figure>

        <section className="meets-section sch-fund" id="yolanda-markey">
          <h2 className="section-title">Yolanda Markey Scholarship Fund</h2>
          <p className="section-body">
            To honor the memory of a former teammate and the mother of team founder Jack Markey, the Yolanda Markey
            Scholarship Fund provides financial support to DCAC swimmers of all ages, especially swimmers under age 30,
            to compete in the annual IGLA competition and to offset costs associated with participation.
          </p>
          <p className="section-body sch-apply-line">
            To request an application, email our treasurer at <Treasurer />.
          </p>

          <DonateToFund fund="Yolanda Markey Scholarship Fund" stock />

          <div className="sch-tributes">
            <article className="sch-tribute">
              <h3>Yolanda Markey</h3>
              <p className="sch-tribute-role">DCAC swimmer and mother of DCAC founder, swimmer, and long-time board member Jack Markey</p>
              <p>
                In 2000, Yolanda (Yo to her teammates) competed with DCAC at the USMS Long Course National Championships.
                The large crowd chanted “Go Mom, Go” as she swam her way to a fourth place finish in the 50 free in the
                women’s 80–84 age group. Yo died January 5, 2021 at the age of 101.
              </p>
              <p>
                In the mid-1930s, Yo learned to swim at the Greensburg, Pennsylvania YMCA during the one afternoon a week
                that the facility opened its doors to women. She loved tennis, golf, and swimming, and saw to it that her
                four children became competitive swimmers. Whether carpooling to and from early morning practices, feeding
                dozens of hungry neighborhood swimmers, or roaming the pool deck as a timer, score keeper, or clerk of
                course, Yo was the quintessential swim mom.
              </p>
            </article>
          </div>
        </section>

        <section className="meets-section sch-fund" id="dickens-dever">
          <h2 className="section-title">Marcay Dickens and Joan Dever Scholarship Fund</h2>
          <p className="section-body">
            To honor the memory of the mothers of two long-time DCAC members, the Marcay Dickens and Joan Dever
            Scholarship Fund encourages DCAC swimmers over age 65 to compete in the annual IGLA competition and to
            offset costs associated with participation.
          </p>
          <p className="section-body sch-apply-line">
            To request an application, email our treasurer at <Treasurer />.
          </p>

          <DonateToFund fund="Marcay Dickens and Joan Dever Scholarship Fund" />

          <div className="sch-tributes">
            <article className="sch-tribute">
              <h3>Marcay Dickens</h3>
              <p className="sch-tribute-role">Mother of DCAC swimmer and coach Steve Dickens</p>
              <p>
                Marcay was a DCAC member from 2002–2007 and a longtime USMS member. She passed away November 3, 2017 at
                the age of 83. Marcay swam at the very first USMS Long Course Nationals, held in 1972 in Bloomington,
                Indiana. She also competed for DCAC at several swim meets including IGLA 2003 San Francisco, IGLA 2004
                Ft. Lauderdale, and IGLA 2005 Atlanta, scoring boatloads of points for DCAC in the 50 free, 50 back,
                100 back, and 100 free.
              </p>
              <p>
                In San Francisco, she was part of the first Mixed 240+ Medley Relay that had ever been fielded by an IGLA
                team. She holds several DCAC 70–74 team records as well. She was an example of a strategy employed
                particularly well for a period of time whereby senior members were specifically recruited to compete for
                the team at IGLA (see: Jack Markey).
              </p>
            </article>

            <article className="sch-tribute">
              <h3>Joan Dever</h3>
              <p className="sch-tribute-role">Mother of DCAC swimmer and long-time board member Fred Dever</p>
              <p>
                Joan had a passion for health and physical fitness throughout her life. She was an avid competitor in
                swimming, synchronized swimming, golf, and tennis. In the 1950s, Joan was a synchronized swimmer for the
                Elliott Murphy Aqua Show at Flushing Meadows Amphitheater.
              </p>
              <p>
                She was the first head swim coach of the Fayetteville-Manlius High School women’s swim team, and taught
                and coached several sports teams full-time throughout Long Island. Furthering her drive and dedication to
                sports and physical fitness, Joan earned a bachelor’s degree in Health and Physical Education from
                Brockport State University and a master’s degree from Syracuse University.
              </p>
            </article>
          </div>
        </section>

        <p className="reach">
          Questions about any scholarship? Email our treasurer at <Treasurer />.
        </p>
      </div>
    </>
  )
}
