import { Link } from 'wouter'
import './ContactPage.css'
import { Callout } from '../components/Callout.tsx'
import { photo } from '../content/photos.ts'
import board from '../content/board.json'

const initials = (name: string) =>
  name.split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('')

export function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <h1>Contact us</h1>
          </div>
        </div>
      </section>

      <div className="wrap page-main" style={{ paddingTop: '48px', paddingBottom: '10px' }}>

        <section className="meets-section">
          <div className="contact-details">
            <div className="contact-detail">
              <span className="contact-detail-label">Mail</span>
              <address>
                DC Aquatics Club<br />
                P.O. Box 77125<br />
                Washington, DC 20013<br />
                USA
              </address>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-label">Phone</span>
              <p><a href="tel:+12026153931">202-615-3931</a></p>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-label">Instagram</span>
              <p>
                <a href="https://instagram.com/swimdcac/" target="_blank" rel="noopener noreferrer">@swimdcac</a>
              </p>
            </div>
          </div>
        </section>

        <section className="meets-section">
          <Callout>
            <p>
              Prospective new members can also check out our <Link href="/faq">list of frequently asked questions</Link>. If you still have more questions, please email{' '}
              <a href="mailto:captain@swimdcac.org">captain@swimdcac.org</a> and{' '}
              <a href="mailto:membership@swimdcac.org">membership@swimdcac.org</a>.
            </p>
          </Callout>
        </section>

        <section className="meets-section">
          <h2 className="section-title">2026 Board contacts</h2>
          <ul className="contact-board">
            {board.map(m => (
              <li className="contact-card" key={m.email}>
                {/* alt="" — the name sits right beside the photo, so describing
                    it again would only double up in a screen reader */}
                {m.photo
                  ? <img className="contact-avatar" src={photo(m.photo)} alt="" width="600" height="600" loading="lazy" />
                  : <span className="contact-avatar contact-avatar-blank" aria-hidden="true">{initials(m.name)}</span>}
                <div className="contact-card-text">
                  <span className="contact-role">{m.role}</span>
                  <span className="contact-name">
                    {m.name} <span className="contact-pronouns">({m.pronouns})</span>
                  </span>
                  <a className="contact-email" href={`mailto:${m.email}`}>{m.email}</a>
                </div>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </>
  )
}
