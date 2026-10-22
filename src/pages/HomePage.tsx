import { Hero } from '../components/Hero'
import { Services } from '../components/Services'
import { About } from '../components/About'
import { Stats } from '../components/Stats'
import { Partners } from '../components/Partners'
import { Testimonials } from '../components/Testimonials'
import { Results } from '../components/Results'
import { Process } from '../components/Process'
import { Contact } from '../components/Contact'
import { Newsletter } from '../components/Newsletter'
import { Seo } from '../components/Seo'
import { PAGE_SEO } from '../lib/seo'

/** The original single-page composition, unchanged and in its original order. */
export function HomePage() {
  return (
    <>
      <Seo {...PAGE_SEO.home} />
      <Hero />
      <Services />
      <About />
      <Stats />
      <Partners />
      <Testimonials />
      <Results />
      <Process />
      <Contact />
      <Newsletter />
    </>
  )
}
