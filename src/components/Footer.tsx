import { Link } from 'wouter'
import logoWhite from '../assets/logos/dcac_logo_white.svg'
import { Icon } from './Icon.tsx'
import facebookSvg from '../assets/icons/facebook.svg?raw'
import instagramSvg from '../assets/icons/instagram.svg?raw'
import mailSvg from '../assets/icons/mail.svg?raw'

const Logo = () => (
  <img className="logo" src={logoWhite} alt="" width="57" height="28" />
)

export function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <div>
          <p className="lede">DC's premier Master's swim team since 1988.</p>
          <div className="social">
            <a href="https://instagram.com/swimdcac/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Icon svg={instagramSvg} />
            </a>
            <a href="https://facebook.com/DCAquaticsClub/" aria-label="Facebook">
              <Icon svg={facebookSvg} />
            </a>
            <a href="mailto:membership@swimdcac.org" aria-label="Email">
              <Icon svg={mailSvg} />
            </a>
          </div>
        </div>
        <div>
          <h4>Get going</h4>
          <Link href="/join">New swimmers</Link>
          <Link href="/trial">Trial swims</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/schedule">Practice times</Link>
          <Link href="/directions">Pool directions</Link>
          <Link href="/competition">Competition</Link>
          <Link href="/records">Team records</Link>
        </div>
        <div>
          <h4>The club</h4>
          <Link href="/about">About us</Link>
          <Link href="/coaches">Coaches</Link>
          <a href="https://www.bonfire.com/store/dc-aquatics-club/">Merch</a>
          <a href="https://www.clubassistant.com/club/login_form.cfm?c=1344">Member login</a>
          <Link href="/scholarships">Scholarships</Link>
          <Link href="/donate">Donate</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h4>Meet our friends</h4>
          <a href="https://dpr.dc.gov">District of Columbia Parks &amp; Recreation</a>
          <a href="https://pvmasters.org/newsite">Potomac Valley Masters Swimming</a>
          <a href="https://www.gaygames.org">Federation of Gay Games</a>
          <a href="https://www.igla.org">IGLA Aquatics</a>
          <a href="https://teamdc.org">Team DC</a>
        </div>
      </div>
      <div className="wrap foot-bot">
        <span className="left">
          <Logo />
          © 2026 District Of Columbia Aquatics Club
        </span>
        {/*<span className="right">Proudly part of DC's LGBTQ+ community.</span>*/}
      </div>
    </footer>
  )
}
