/**
 * Long-form copy for the dedicated Services page, keyed by slug.
 * Slugs line up 1:1 (in order) with SERVICES in ./content — SERVICE_SLUGS[i]
 * is the slug for SERVICES[i]. Copy is derived from the existing site content;
 * no claims, metrics or platforms beyond what the site already names.
 */

export interface ServiceDetail {
  includes: string[]
  benefit: string
  paragraphs: [string, string]
}

export const SERVICE_SLUGS = [
  'email-campaigns',
  'ecommerce-automation',
  'sms-automation',
  'tools-integration',
  'landing-pages',
  'lead-generation',
] as const

export type ServiceSlug = (typeof SERVICE_SLUGS)[number]

/** One Lottie illustration per service slug — the same assets (and lazy-chunk
 *  behaviour) as the home Services panel. */
export const SERVICE_LOTTIE: Record<ServiceSlug, () => Promise<{ default: object }>> = {
  'email-campaigns': () => import('../assets/lottie/email-campaigns.json'),
  'ecommerce-automation': () => import('../assets/lottie/ecommerce-automation.json'),
  'sms-automation': () => import('../assets/lottie/sms-automation.json'),
  'tools-integration': () => import('../assets/lottie/tools-integration.json'),
  'landing-pages': () => import('../assets/lottie/landing-pages.json'),
  'lead-generation': () => import('../assets/lottie/lead-generation.json'),
}

export const SERVICE_DETAILS: Record<ServiceSlug, ServiceDetail> = {
  'email-campaigns': {
    paragraphs: [
      'Your subscribers should hear from you consistently — and look forward to it. We plan, write, design and send campaigns and newsletters that give people a reason to open, click and buy.',
      'Behaviour-based sends layer on top of your calendar, so the right message also goes out when a subscriber acts — not only when you schedule it. Everything is built inside the platforms you already use.',
    ],
    includes: ['Campaign planning & sends', 'Newsletters', 'Behaviour-based sends', 'Klaviyo, Mailchimp, Omnisend, ActiveCampaign, Brevo & MailerLite'],
    benefit: 'Consistent, on-brand emails your subscribers actually open.',
  },
  'ecommerce-automation': {
    paragraphs: [
      'Automated flows do the selling between campaigns. We build the core revenue sequences for your store — welcome, abandoned cart, post-purchase and win-back — designed, written and set live inside your email platform.',
      'Once live, the flows keep working while you sleep: new subscribers are welcomed, abandoned carts are recovered, and past buyers are brought back for their next order.',
    ],
    includes: ['Welcome flows', 'Abandoned cart recovery', 'Post-purchase sequences', 'Win-back sequences'],
    benefit: 'One-time buyers become repeat customers — automatically.',
  },
  'sms-automation': {
    paragraphs: [
      "Some messages can't wait for an inbox. We set up SMS that complements your email program: promotional blasts for key moments, transactional messages customers expect, and behaviour-triggered texts based on what people do.",
      'SMS reaches customers where email can\'t, and we keep frequency and timing sensible so the channel stays welcome — and effective.',
    ],
    includes: ['Promotional SMS blasts', 'Transactional messages', 'Behaviour-triggered SMS', 'SMS alongside your email program'],
    benefit: 'Reach customers in the moment, on the channel they read first.',
  },
  'tools-integration': {
    paragraphs: [
      'Your tools only work when they talk to each other. We connect your email platform, store and CRM — Klaviyo, Mailchimp, Omnisend, Shopify, HubSpot and the rest of your stack — so data flows where it should.',
      'We also handle the unglamorous part that decides whether any of it lands: deliverability. DMARC, SPF and DKIM setup, inbox placement checks and list hygiene keep your sends out of spam.',
    ],
    includes: ['ESP, store & CRM connections', 'DMARC / SPF / DKIM setup', 'Inbox placement checks', 'List hygiene'],
    benefit: 'A connected stack — and emails that actually reach the inbox.',
  },
  'landing-pages': {
    paragraphs: [
      "Traffic is wasted if the page doesn't convert. We design and build conversion-focused landing pages and lead-capture pages that match your campaign, your offer and your brand.",
      'Layouts are A/B tested, so decisions about headlines, structure and calls to action come from what visitors do — not from opinions.',
    ],
    includes: ['Conversion-focused page design', 'Lead-capture pages', 'A/B-tested layouts', 'Campaign & offer pages'],
    benefit: 'More of your traffic turns into subscribers and sales.',
  },
  'lead-generation': {
    paragraphs: [
      'Flows are only as good as the list behind them. We build list growth and lead capture that bring the right people in — and surveys that tell you who they are and what they want.',
      'That data feeds straight back into your program, so every send can be personalised instead of broadcast.',
    ],
    includes: ['List-growth campaigns', 'Lead capture', 'Surveys', 'Personalisation data for your flows'],
    benefit: 'The right people on your list — and the data to personalise every send.',
  },
}
