import './CoachesPage.css'
import coaches from '../content/coaches.json'
import { photo } from '../content/photos.ts'

export function CoachesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <h1>Coaches</h1>
          </div>
        </div>
      </section>

      <div className="wrap page-main" style={{ paddingTop: '48px', paddingBottom: '10px' }}>

        <section className="meets-section">
          <div className="coach-list">
            {coaches.map(c => (
              <article className="coach-card" key={c.name}>
                {/* alt="" — the coach's name is right beside the photo, so
                    describing it again would only double up in a screen reader */}
                <img className="coach-photo" src={photo(c.photo)} alt="" width="480" height="600" loading="lazy" />
                <div>
                  <h2 className="coach-name">
                    Coach {c.name} <span className="coach-pronouns">({c.pronouns})</span>
                  </h2>
                  {c.bio && <p className="coach-bio">{c.bio}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <p className="reach">
          Questions for the coaching staff? Email <a href="mailto:cocaptain@swimdcac.org">cocaptain@swimdcac.org</a>.
        </p>
      </div>
    </>
  )
}
