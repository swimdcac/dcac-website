import { Callout } from '../components/Callout.tsx'

export function DonatePage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <h1>Donate</h1>
          </div>
        </div>
      </section>

      <div className="wrap page-main" style={{ paddingTop: '48px', paddingBottom: '10px' }}>

        <section className="meets-section">
          <p className="section-body">
            We are seeking financial support from our friends in the community to further our mission. Money raised from our sponsors goes towards scholarships to allow swimmers in financial need to train and compete with the team.
          </p>
        </section>

        <div style={{ marginBottom: '36px' }}>
          <Callout>
            <p>
              DCAC is a registered 501(c)(3) charitable organization. Your contribution to DCAC is tax deductible.
            </p>
          </Callout>
        </div>

        <p className="reach">
          For more information, please contact <a href="mailto:development@swimdcac.org">development@swimdcac.org</a>.
        </p>
      </div>
    </>
  )
}
