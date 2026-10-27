import { useEffect, useRef } from 'preact/hooks'
import { Router, Route, Switch, useLocation } from 'wouter'
import { Header } from './components/Header.tsx'
import { Footer } from './components/Footer.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { CompetitionPage } from './pages/CompetitionPage.tsx'
import { SchedulePage } from './pages/SchedulePage.tsx'
import { JoinPage } from './pages/JoinPage.tsx'
import { TrialPage } from './pages/TrialPage.tsx'
import { AboutPage } from './pages/AboutPage.tsx'
import { ContactPage } from './pages/ContactPage.tsx'
import { DonatePage } from './pages/DonatePage.tsx'
import { FaqPage } from './pages/FaqPage.tsx'
import { CoachesPage } from './pages/CoachesPage.tsx'
import { RecordsPage } from './pages/RecordsPage.tsx'
import { ScholarshipsPage } from './pages/ScholarshipsPage.tsx'
import { DirectionsPage } from './pages/DirectionsPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { metaFor, notFoundMeta, documentTitle } from './pageMeta.ts'
import './app.css'

// Vite injects the deploy base; wouter wants it without the trailing slash,
// and an empty string when the site is served from the domain root.
const routerBase = import.meta.env.BASE_URL.replace(/\/$/, '')

/** The prerendered <title> covers the first page; this keeps it right as you navigate. */
function TitleSync() {
  const [path] = useLocation()
  useEffect(() => {
    document.title = documentTitle(metaFor(path) ?? notFoundMeta)
  }, [path])
  return null
}

/** Moves focus onto the new page (its #anchor, else its <h1>) so screen
 *  readers announce it — otherwise focus stays on the link that was clicked
 *  and nothing says the page changed. preventScroll leaves positioning to
 *  ScrollReset and the browser. */
function focusPage(target: HTMLElement | null) {
  const el = target ?? document.querySelector<HTMLElement>('main h1')
  if (!el) return
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

/** Client-side navigation keeps the old scroll position, so start each new
 *  page at the top (or at its #anchor). Back/forward is left alone so the
 *  browser can restore where you were. Either way, focus moves to the new page. */
function ScrollReset() {
  const [path] = useLocation()
  const firstRender = useRef(true)
  const fromHistory = useRef(false)

  useEffect(() => {
    const onPop = () => { fromHistory.current = true }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    // the browser already handled the initial load, including any #anchor
    if (firstRender.current) { firstRender.current = false; return }
    const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null
    if (fromHistory.current) fromHistory.current = false
    // 'instant' overrides the smooth scroll-behavior set on <html>
    else if (target) target.scrollIntoView({ behavior: 'instant' })
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    focusPage(target)
  }, [path])
  return null
}

/** ssrPath is only set when prerendering; in the browser the router reads the real URL. */
export function App({ ssrPath }: { ssrPath?: string }) {
  return (
    <Router base={routerBase} ssrPath={ssrPath}>
      <TitleSync />
      <ScrollReset />
      <Header />
      {/* wraps each page's hero too, so the skip link and landmark
          navigation land on the page's <h1> rather than past it */}
      <main id="main">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/competition" component={CompetitionPage} />
          <Route path="/schedule" component={SchedulePage} />
          <Route path="/join" component={JoinPage} />
          <Route path="/trial" component={TrialPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/donate" component={DonatePage} />
          <Route path="/faq" component={FaqPage} />
          <Route path="/coaches" component={CoachesPage} />
          <Route path="/records" component={RecordsPage} />
          <Route path="/scholarships" component={ScholarshipsPage} />
          <Route path="/directions" component={DirectionsPage} />
          {/* no path — matches anything the routes above didn't */}
          <Route component={NotFoundPage} />
        </Switch>
      </main>
      <Footer />
    </Router>
  )
}
