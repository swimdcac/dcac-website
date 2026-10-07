import { Link } from 'wouter'
import { Callout } from '../components/Callout.tsx'
import { Step, Steps } from '../components/Step.tsx'
import { PagePhoto } from '../components/PagePhoto.tsx'
import practicePhoto from '../assets/pictures/oxon_run_practice.webp'
import './JoinPage.css'

const duesOptions = [
  { amt: '$330.00/Year', body: 'Annual Pool Dues — your credit card is auto-charged every 12 months.' },
  { amt: '$100.00/Quarter', body: 'Quarterly Pool Dues — your credit card is auto-charged every 3 months.' },
  { amt: '$40.00/Monthly', body: 'Monthly Pool Dues — your credit card is auto-charged every month.' },
  { amt: '$125 / 10 swims', body: "10 Pak — charged at registration, prepaid for 10 practices. Once used up, email membership@swimdcac.org and treasurer@swimdcac.org for another. Valid only for the calendar year purchased; unused swims expire. USMS and DPR fees still apply." },
]

export function JoinPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <h1>How to Join</h1>
          </div>
        </div>
      </section>

      <main id="main" className="wrap" style={{ paddingTop: '48px', paddingBottom: '10px' }}>

        <div style={{ marginBottom: '36px' }}>
          <Callout>
            <p>
              Want to try it out first? We offer two free trial swims to all prospective new members!{' '}
              <Link href="/trial">Learn more here.</Link>
            </p>
          </Callout>
        </div>

        <PagePhoto
          src={practicePhoto}
          alt="About thirty DCAC swimmers in caps and goggles gathered in the shallow end of an outdoor pool."
          width={1110}
          height={740}
          caption="Practice at Oxon Run Pool."
        />

        <section className="meets-section">
          <h2 className="section-title">When you're ready to become a member</h2>
          <p className="section-body">You need to do three things, in the following order:</p>

          <div style={{ marginTop: '20px' }}>
            <Steps>
              <Step number={1} title="Join U.S. Masters Swimming (USMS)" price="$75.00 per Calendar Year">
                <p className="step-body">
                  USMS is the national organizing body for all Masters swimmers in the United States. Registration with USMS is <strong>mandatory</strong> for every calendar year and serves as your liability insurance. It's required in order for you to practice with DCAC and to be eligible to compete in meets. Choose Potomac Valley as your LMSC and then DCAC as your club team. Included in your USMS membership is a calendar-year subscription to USMS's SWIMMER Magazine and The Swimmer's Ear newsletter published by our regional USMS Committee, Potomac Valley LMSC. USMS provides accident insurance to its members at team practices and at USMS-sanctioned events. <a href="https://www.usms.org/join-usms/join-or-renew">Register online.</a>
                </p>
                <div style={{ marginTop: '16px' }}>
                  <Callout tone="blue" compact>
                    <p>
                      If you are new to DCAC and already USMS registered, please contact the Potomac Valley registrar to change your USMS team affiliation using <a href="https://www.pvmasters.org/pvxfer.pdf">this form</a> if you intend to compete as a member of DCAC.
                    </p>
                  </Callout>
                </div>
              </Step>

              <Step number={2} title="Register with DCAC and Choose a Club Dues Structure">
                <p className="step-body">
                  Register in our Club Assistant platform: <a href="https://www.clubassistant.com/club/form/usms_verify.cfm?c=1344&form_type=Online%20Registration&CFID=3090822&CFTOKEN=96390680">DCAC registration form here</a>. Note: do not use this link if you have registered for DCAC in the past; instead, email <a href="mailto:membership@swimdcac.org">membership@swimdcac.org</a> to request a link to reactivate your existing account.
                </p>
                <p className="step-body">
                  Once you complete the membership process, you'll be asked to choose a club dues structure. Dues are paid up front and are non-refundable. If you have questions or wish to cancel your membership, please email <a href="mailto:membership@swimdcac.org">membership@swimdcac.org</a>.
                </p>

                <div className="join-dues-grid">
                  {duesOptions.map(o => (
                    <div className="join-dues-option" key={o.amt}>
                      <span className="amt">{o.amt}</span>
                      <p>{o.body}</p>
                    </div>
                  ))}
                </div>
              </Step>

              <Step
                number={3}
                title="Register in DPR RecTrac and purchase a DPR Masters Swim Membership"
                price="$50.00 D.C. residents · $62.50 non-residents, per calendar year"
              >
                <p className="step-body">
                  Cost is prorated and visible during checkout. <a href="https://dcwashingtonweb.myvscloud.com/webtrac/web/search.html?module=PM&type=Aquatics&keyword=masters">Registration and purchase location here.</a> All of our practice locations use a scanning system called RecTrac — if you aren't registered in the system and haven't purchased the DPR Masters Swim Membership, DPR will not let you in. Once registered with DPR, select Memberships (Aquatics &amp; Fitness), then DPR Masters Swim Membership.
                </p>
              </Step>
            </Steps>
          </div>
        </section>

        <div style={{ marginBottom: '40px' }}>
          <Callout tone="neutral">
            <p>
              Failure to register for USMS, DCAC, and DPR prior to practice will result in you not being permitted to swim. If you wish to change your Pool Dues structure during the year, you must contact the Membership Chair and Treasurer in advance. The unlimited swim options (year/quarterly/monthly) all auto-renew — email the Treasurer and Membership Chair if you wish to cancel. Please contact the Membership Chair (<a href="mailto:membership@swimdcac.org">membership@swimdcac.org</a>), the Treasurer (<a href="mailto:treasurer@swimdcac.org">treasurer@swimdcac.org</a>), or any Board Member for more information.
            </p>
          </Callout>
        </div>

        <section className="meets-section">
          <h2 className="section-title">Scholarships</h2>
          <Callout tone="purple">
            <p>
              DCAC is committed to helping swimmers who face financial challenges. If you have a financial hardship and would be unable to participate at the regular dues rates above, please contact the Treasurer (<a href="mailto:treasurer@swimdcac.org">treasurer@swimdcac.org</a>) about reductions in dues based on financial hardship, or if you're interested in the Under 30 Award. Pool dues may be reduced on an individual basis at the discretion of the Board. See <Link href="/scholarships">all of our scholarships</Link>.
            </p>
          </Callout>
        </section>

        <section className="meets-section">
          <h2 className="section-title">USMS Visitors</h2>

          <Steps>
            <Step number={1} title="Show up and introduce yourself">
              <p className="step-body">
                DCAC welcomes visitors from other USMS teams. Just show up at any workout and introduce yourself to the coach. Visitors must show their USMS card — no exceptions. <a href="https://www.usms.org/reg/getcard.php">Retrieve your USMS card here.</a> Visitors are welcome for one free swim per quarter. If you wish to swim multiple times, the fee is $15 per workout, payable by Venmo at @swimdcac.
              </p>
            </Step>

            <Step number={2} title="Register with DPR RecTrac">
              <p className="step-body">
                It's <strong>mandatory</strong> that you register with the Department of Parks and Recreation RecTrac system. D.C. residents are permitted into the pools at no charge once registered. Swimmers who live outside the District may be charged a visitor's fee.
              </p>
            </Step>
          </Steps>
        </section>

        <p className="reach">
          Questions about joining? Email <a href="mailto:membership@swimdcac.org">membership@swimdcac.org</a>.
        </p>
      </main>
    </>
  )
}
