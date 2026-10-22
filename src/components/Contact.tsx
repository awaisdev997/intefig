import { Mail, Phone, Globe, MapPin } from 'lucide-react'
import { CONTACT } from '../data/content'
import { LottieIllustration } from './LottieIllustration'
import { ContactForm } from './ContactForm'
export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink-deep py-24 text-white md:py-32" aria-label="Contact INTEFIG">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-4 text-sage-300">08 / CONTACT</p>
          <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">Need help with<br />your <span className="text-accent">projects?</span></h2>
          <div className="relative mt-4 h-[260px] md:h-[320px]">
            {/* Light panel: the ink line-draw animation needs a light ground to stay legible on this dark section. */}
            <div className="flex h-full items-center justify-center rounded-[2rem] bg-sage-50 shadow-card">
              <LottieIllustration
                label="Animated chat message bubbles"
                loadData={() => import('../assets/lottie/contact-message.json')}
                className="h-[200px] w-[200px] md:h-[248px] md:w-[248px]"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/75">
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-white"><Mail size={16} className="text-accent" />{CONTACT.email}</a>
            <a href={CONTACT.phoneHref} className="flex items-center gap-2 hover:text-white"><Phone size={16} className="text-accent" />{CONTACT.phoneDisplay}</a>
            <span className="flex items-center gap-2"><Globe size={16} className="text-accent" />{CONTACT.site}</span>
            <span className="flex items-center gap-2"><MapPin size={16} className="text-accent" />{CONTACT.location}</span>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
