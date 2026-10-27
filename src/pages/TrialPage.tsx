import { Link } from 'wouter'
import { Callout } from '../components/Callout.tsx'
import { Step, Steps } from '../components/Step.tsx'
import { PagePhoto } from '../components/PagePhoto.tsx'
import trialPhoto from '../assets/pictures/jacob_noura_eric.webp'

export function TrialPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <h1>New Trial Swimmers</h1>
          </div>
        </div>
      </section>

      <div className="wrap page-main" style={{ paddingTop: '48px', paddingBottom: '10px' }}>

        <section className="meets-section">
          <p className="section-body">
            We encourage prospective new members to try practices prior to becoming a member. We would like to provide the opportunity for you to jump into the pool and get a feel for our workouts and team atmosphere, without the barrier of the membership process. You are also welcome to come by and observe a practice before taking the plunge!
          </p>
        </section>

        <PagePhoto
          src={trialPhoto}
          alt="Three smiling DCAC swimmers in team caps, arms around each other's shoulders in a pool lane."
          width={1200}
          height={800}
        />

        <div style={{ marginBottom: '36px' }}>
          <Callout tone="neutral">
            <p>
              <strong>Please note:</strong> DCAC does not provide adult swim lessons. You should be comfortable swimming in a coached practice with other swimmers in the lane, and be able to complete sets like 4x100 yard freestyle on a 2:00 interval.
            </p>
          </Callout>
        </div>

        <div style={{ marginBottom: '36px' }}>
          <Callout>
            <p>
              Ready to join? <Link href="/join">Learn more about the membership process here.</Link>
            </p>
          </Callout>
        </div>

        <section className="meets-section">
          <h2 className="section-title">Path to Trial Swimming</h2>

          <div style={{ marginTop: '20px' }}>
            <Steps>
              <Step number={1} title="Join us for 2 free practices">
                <p className="step-body">
                  Try a couple of practices to determine if DCAC meets your needs and expectations. It is <strong>mandatory</strong> that you fill out the <a href="https://www.usms.org/admin/lmschb/gto_reg_30daytryout_regform.pdf">30-day Try Out form</a> for insurance purposes. The Try Out form is a one-time release that gives you 30 days to complete your 2 free swims. You will not be permitted to swim without insurance coverage.
                </p>
                <p className="step-body">
                  Please email the form and/or questions to <a href="mailto:treasurer@swimdcac.org">treasurer@swimdcac.org</a> and <a href="mailto:membership@swimdcac.org">membership@swimdcac.org</a> before you come to your first practice.
                </p>
                <p className="step-body">
                  Just tell the coach on deck that you have submitted your form and have been cleared to swim. They will get you up to speed for the workout.
                </p>
              </Step>

              <Step number={2} title="Register with DPR RecTrac">
                <p className="step-body">
                  It's <strong>mandatory</strong> that you register with the Department of Parks and Recreation RecTrac system. D.C. residents will be permitted into the pools at no charge once they are registered. Swimmers who live outside the District may be charged a visitors fee. Do not register for a program - you are just looking to put your name in their database to access facilities.
                </p>
              </Step>
            </Steps>
          </div>
        </section>

        <p className="reach">
          Questions about trial swims? Email <a href="mailto:membership@swimdcac.org">membership@swimdcac.org</a>.
        </p>
      </div>
    </>
  )
}
