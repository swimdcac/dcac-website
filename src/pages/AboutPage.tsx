import { Link } from 'wouter'
import { Callout } from '../components/Callout.tsx'
import { PagePhoto } from '../components/PagePhoto.tsx'
import pridePhoto from '../assets/pictures/pride_parade_2025.webp'
import pabloPridePhoto from '../assets/pictures/pablo_pride.webp'
import './AboutPage.css'
import { Icon } from '../components/Icon.tsx'
import dumbbellSvg from '../assets/icons/dumbbell.svg?raw'
import peopleSvg from '../assets/icons/people.svg?raw'
import starSvg from '../assets/icons/star.svg?raw'

const reasons = [
  {
    color: 'purple',
    title: 'Social',
    icon: (
      <Icon svg={peopleSvg} />
    ),
    body: (
      <>
        <p>
          The team is comprised of a broad spectrum of people living in the greater Washington, DC metropolitan area. DCAC's membership is evolving to reflect the changing demographics of the community we live in, where people from different backgrounds and sexual orientations come together to share their love of swimming.
        </p>
        <p>
          Some of our social activities include: camaraderie in and around the pool, going out for meals after practice, attending team parties and socials, and participating in community outreach events and team fundraisers. Come on out, and bring a friend — you'll likely meet many more!
        </p>
      </>
    ),
  },
  {
    color: 'blue',
    title: 'Fitness, Health and Wellness',
    icon: (
      <Icon svg={dumbbellSvg} />
    ),
    body: (
      <>
        <p>
          With a great mix of coaches, DCAC's practices promise to challenge your physical prowess. The team trains for 1.5 hours, nine times per week (see <Link href="/schedule">practice schedule</Link>). You can swim as many or as few practices as you would like and swim in a lane that best matches your speed and ability.
        </p>
        <p>
          Each practice will focus on improving stroke technique and building strength, endurance, and aerobic conditioning.
        </p>
      </>
    ),
  },
  {
    color: 'red',
    title: 'Competition',
    icon: (
      <Icon svg={starSvg} />
    ),
    body: (
      <>
        <p>
          Fitness and socializing aside, <Link href="/competition">DCAC takes competition seriously!</Link> We have coached practices seven times per week to provide our swimmers with the ability to optimize their skill, strength, endurance, and speed. Generally, the team trains for about 4 to 5 "focus" swim meets each year.
        </p>
        <p>
          Some swimmers swim in more meets, and others less or not at all. The choice is yours. However, we do encourage all swimmers to swim in at least one meet, as they are fun, provide team-building experiences, travel opportunities, and help you realize the payoff for all the training you've done.
        </p>
      </>
    ),
  },
]

export function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <h1>About DCAC</h1>
          </div>
        </div>
      </section>

      <div className="wrap page-main" style={{ paddingTop: '48px', paddingBottom: '10px' }}>

        <section className="meets-section">
          <h2 className="section-title">Mission</h2>
          <p className="about-lede">
            DCAC's mission is to promote swimming for fitness, health and wellness and competition for the LGBTQ community and their allies in a team-oriented, coached setting.
          </p>
          <p className="section-body">
            Whether you are looking to make friends, get in a great workout, or compete against top swimmers from throughout the region, the nation or the world, DCAC is the team for you. All ages and ability levels welcome.
          </p>
        </section>

        <PagePhoto
          src={pridePhoto}
          alt="DCAC swimmers marching together behind the team float at the 2025 Pride parade in Washington, DC."
          width={1110}
          height={740}
          caption="DCAC with other IGLA+ teams on Pennsylvania Avenue at the 2025 WorldPride parade."
        />

        <section className="meets-section">
          <h2 className="section-title">The numbers</h2>
          <div className="accolades-grid about-numbers">
            <div className="accolade t-blue">
              <span className="accolade-num">200+</span>
              <span className="accolade-label">Swimmers</span>
              <span className="accolade-detail">One of the largest USMS teams in the Potomac Valley region</span>
            </div>
            <div className="accolade t-red">
              <span className="accolade-num">Top 50</span>
              <span className="accolade-label">Largest teams in the U.S.</span>
              <span className="accolade-detail">Among all United States Masters Swimming clubs</span>
            </div>
          </div>
          <p className="section-note">
            Our membership includes first time swimmers who have never competed in swim meets or swam on a team to experienced competitive swimmers, including Olympians, FINA Masters World Record holders, individual and relay All-Americans, and USMS individual and relay Top Ten swimmers.
          </p>
        </section>

        <section className="meets-section">
          <h2 className="section-title">Why join DCAC?</h2>
          <div className="about-reasons">
            {reasons.map(r => (
              <article className="about-reason" key={r.title}>
                <span className={`about-reason-icon t-${r.color}`}>{r.icon}</span>
                <div className="about-reason-text">
                  <h3>{r.title}</h3>
                  {r.body}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="meets-section" id="inclusion">
          <h2 className="section-title">Our commitment to LGBTQ+ inclusion</h2>
          <div className="about-prose">
            <p>
              DCAC is an LGBTQ+ inclusive masters swim team. We remain committed to welcoming, celebrating, and protecting swimmers of all sexual orientations, gender identities, and gender expressions on our team and across the globe.
            </p>
            <p className="about-affirm-lead">We affirm that:</p>
            <ul className="about-affirm">
              <li>Transgender, non-binary, and gender-nonconforming swimmers are always full and valued members of our team.</li>
              <li>Members may present themselves, dress, and express their gender in ways that feel authentic to them.</li>
              <li>We do not tolerate harassment or discrimination based on gender identity or gender expression.</li>
            </ul>
          </div>

          <PagePhoto
            src={pabloPridePhoto}
            alt="A swimmer wearing a floral swimsuit, pearls, and a sparkly cowboy hat inside a unicorn pool float, marches with DCAC teammates at Pride."
            width={1500}
            height={2000}
            caption="IGLA+ members walking at the 2025 WorldPride parade."
            narrow
          />

          <div style={{ margin: '24px 0' }}>
            <Callout tone="purple">
              <p>
                If you ever have concerns about safety, inclusion, or respect at practice or events, we encourage you to <Link href="/contact">contact a member of the Board</Link>. Your well-being matters to us.
              </p>
            </Callout>
          </div>

          <div className="about-prose">
            <p>
              We know that prospective and current members sometimes have questions about gender identity, gender expression, competition eligibility, and facility use. The information below is intended to be transparent, affirming, and supportive.
            </p>
          </div>

          <h3 className="about-sub">Bathrooms and locker rooms</h3>
          <div className="about-prose">
            <p>
              The majority of our practices take place at DC Department of Parks and Recreation (DPR) facilities, which have a gender-inclusive bathroom and locker room policy. We host some practices at private facilities, and we take inclusivity into account when selecting locations for those practices.
            </p>
            <p>
              DC law requires that all DC government buildings must allow individuals to use gender-specific restrooms and other gender-specific facilities that are consistent with their gender identity and/or expression. Additionally, all single occupancy restrooms in DC government buildings are required to be gender-neutral.
            </p>
            <p>
              We have provided more details about available locker rooms and changing facilities — for example, family changing room options — on our Pool Directions page, including information about pools we swim at that are not DPR pools.
            </p>
          </div>

          <h3 className="about-sub">USMS eligibility policy and support for individual swimmers</h3>
          <div className="about-prose">
            <p>
              U.S. Masters Swimming (USMS) has recently updated its Interim Eligibility Policy for competitive swimming events.
            </p>
            <p>
              Most USMS swimmers join teams to improve their general fitness, meet new friends, or to just have fun in the pool. For them, this new policy allows them to participate in USMS practices as they identify.
            </p>
            <p>
              Swimmers who wish to compete in meets have two opportunities for recognition — at the local and national level. This new policy is most relevant to them.
            </p>
            <p className="about-affirm-lead">A few key points about the new policy:</p>
            <ul className="dot-list">
              <li>The men's competition category is now renamed to the men's/open competition category.</li>
              <li>Eligibility for local recognition programs (such as awards and points during a meet) is determined based on whether the state or jurisdiction where a meet is located has nondiscrimination laws that include gender identity protections.</li>
              <li>In jurisdictions with nondiscrimination laws that include gender identity protections (such as DC), any swimmer is welcome to win awards and score points in any gender category.</li>
              <li>Eligibility for national recognition programs in the women's category — Top 10, records, and All-American and All-Star honors — continues to be determined by sex assigned at birth.</li>
            </ul>
            <p>
              This policy is not perfect, nor does it ensure USMS competitions are completely inclusive. However, it is an important, significant, and demonstrative improvement on USMS's previous eligibility policy. We will continue to speak up for our community and advise USMS to continue to improve their policies to make them as inclusive as possible.
            </p>
            <p>
              We know that policies can be confusing and stressful, especially when they affect personal identity and safety. Any swimmer with questions or concerns about how USMS's Interim Eligibility Policy may apply to them is encouraged to reach out to us.
            </p>
          </div>

          <div style={{ marginTop: '24px' }}>
            <Callout>
              <p>
                You may reach out to <Link href="/contact">any member of the Board</Link> via email or speak to us at practice. We will work with you one-on-one to determine the best course of action to support both your participation in competition and your well-being.
              </p>
            </Callout>
          </div>
        </section>

        <p className="reach">
          Questions about the team? Email <a href="mailto:membership@swimdcac.org">membership@swimdcac.org</a>.
        </p>
      </div>
    </>
  )
}
