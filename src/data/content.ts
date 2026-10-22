export const CALENDLY = 'https://calendly.com/intefig/15min'
export const FORMSPREE = 'https://formspree.io/f/mljeollb'

/** Route-aware nav: plain paths render as NavLink (active state), '/#…' entries
 *  link back to a section on the home page. */
export const NAV: { label: string; to: string }[] = [
  { label: 'Services', to: '/services' },
  { label: 'Team', to: '/team' },
  { label: 'About', to: '/#about' },
  { label: 'Work / Results', to: '/#work' },
  { label: 'Testimonials', to: '/#testimonials' },
  { label: 'Contact', to: '/contact' },
]

export const SERVICES = [
  { title: 'Email Campaigns', desc: 'Campaigns, newsletters and behaviour-based sends your subscribers actually open. Built on Klaviyo, Mailchimp, Omnisend, ActiveCampaign, Brevo and MailerLite.', color: '#C8401B' },
  { title: 'eCommerce Automation', desc: 'Welcome flows, abandoned cart, post-purchase and win-back sequences that turn one-time buyers into repeat customers — while you sleep.', color: '#7A957E' },
  { title: 'SMS Automation', desc: "Promotional blasts, transactional SMS and behaviour-triggered messages that reach customers where email can't.", color: '#9AB395' },
  { title: 'Tools Integration', desc: 'Klaviyo, Mailchimp, Omnisend, Shopify, HubSpot and the rest of your stack, connected and talking to each other — plus deliverability: DMARC / SPF / DKIM, inbox placement and list hygiene.', color: '#3B3F42' },
  { title: 'Landing Pages', desc: 'Conversion-focused pages, A/B-tested layouts and lead-capture pages designed to turn traffic into subscribers and sales.', color: '#C8401B' },
  { title: 'Lead Generation / Surveys', desc: 'List growth, surveys and lead capture that feed your flows with the right people — and the data to personalise every send.', color: '#88A286' },
]

export const ORBIT_WORDS = ['EMAIL', 'CREATIVE', 'DATA', 'AUTOMATION', 'STRATEGY', 'RESULTS']

/** photoKey maps to src/data/teamPhotos.ts (TEAM_PHOTOS). null = no verified photo — UI uses a monogram. */
export const TEAM: { name: string; role: string; photoKey: string | null }[] = [
  { name: 'Hafiz Hamza', role: 'Email Strategist', photoKey: 'hafizHamza' },
  { name: 'Muhammad Numan', role: 'Web Developer', photoKey: 'muhammadNuman' },
  { name: 'Abdur Rafy', role: 'UX Designer', photoKey: null },
  { name: 'Muhammad Sufiyan', role: 'Landing Page Builder', photoKey: 'muhammadSufiyan' },
  { name: 'Husnain Abbas', role: 'Email Developer', photoKey: 'husnainAbbas' },
  { name: 'Shahzaib', role: 'Graphic Designer', photoKey: 'shahzaib' },
  { name: 'Muhammad Awais', role: 'Software Developer', photoKey: 'muhammadAwais' },
]

/** One-line, role-derived bios shown on the Team page (keyed by TEAM name). */
export const TEAM_BIOS: Record<string, string> = {
  'Hafiz Hamza': 'Founder of INTEFIG — leads strategy across every client account.',
  'Muhammad Numan': 'Builds and maintains the websites and stores behind client campaigns.',
  'Abdur Rafy': 'Designs user experiences for pages, flows and signup journeys.',
  'Muhammad Sufiyan': 'Builds high-converting landing pages for campaigns and lead capture.',
  'Husnain Abbas': 'Develops the emails themselves — coded, tested and inbox-ready.',
  'Shahzaib': 'Creates the graphics and visuals that give campaigns their look.',
  'Muhammad Awais': 'Develops the software and integrations that connect the stack.',
}

export const WHY = [
  'Full-service Email, SMS & Web team in-house',
  'Retention-first strategy for sustainable growth',
  'Automation, design & dev all under one roof',
  'Transparent pricing & performance reporting',
]

export const STATS = [
  { value: 490, suffix: '+', label: 'Five-Star Reviews', decimals: 0 },
  { value: 200, suffix: '+', label: 'Brands Served', decimals: 0 },
  { value: 8, suffix: '+', label: 'Years in Business', decimals: 0 },
  { value: 4.9, suffix: '', label: 'Average Rating', decimals: 1 },
]

export const PARTNERS = [
  { name: 'Mailchimp', sub: 'Pro Partner · 2019' },
  { name: 'Omnisend', sub: 'Pro Partner · 1 of 32 worldwide' },
  { name: 'Klaviyo', sub: 'K:Partners Bronze' },
  { name: 'MailerLite', sub: 'Academy Certified' },
  { name: 'Shopify', sub: 'Partners' },
  { name: 'HubSpot', sub: 'Certified' },
]

export const CLIENTS = ['1stCulture', 'Ultimax', 'Zaphire', 'Untourage', 'Bloom & Co', 'Verve Digital', 'Patchlab', 'Real Peptides', 'Peptilab', 'FitScript', 'JSTewwartHair', 'Chelsea Paris', 'Aora', 'Testie', 'Good Conscious']

export const TESTIMONIALS = [
  { name: 'Avi Ghakar', quote: 'Awesome experience working with INTEFIG. Excellent communication, outstanding skills.' },
  { name: 'Niecy', quote: 'Can I just hire INTEFIG full-time?!' },
  { name: 'Sara Malik', quote: 'INTEFIG rebuilt our whole email program in three weeks — open rates doubled.' },
  { name: 'Jordan Blake', quote: 'Finally an agency that treats retention like a science, not guesswork.' },
  { name: 'Meera Kapoor', quote: 'Our abandoned cart flow alone paid for the whole retainer in the first month.' },
  { name: 'Tom Reyes', quote: 'Responsive, sharp, and they actually understand retention — not just email blasts.' },
  { name: 'Alina Rahman', quote: 'The team rebuilt our Shopify store and email flows together — everything finally feels connected.' },
  { name: 'Chris Dubois', quote: 'Best agency we have worked with. Clear reporting, no fluff, real results.' },
]

export const PROCESS = [
  { title: 'DISCOVER', desc: 'Free strategy call' },
  { title: 'PLAN', desc: 'Custom roadmap' },
  { title: 'CREATE', desc: 'Design & build' },
  { title: 'AUTOMATE', desc: 'Go live' },
  { title: 'OPTIMIZE', desc: 'Grow & optimise' },
]

export const SOCIALS = [
  { label: 'Facebook', href: 'https://www.facebook.com/intefig' },
  { label: 'Instagram', href: 'https://www.instagram.com/intefigofficial/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/intefig/' },
  { label: 'X', href: 'https://x.com/Intefig_' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@intefig' },
  { label: 'Behance', href: 'https://www.behance.net/intefig' },
  { label: 'Pinterest', href: 'https://www.pinterest.com/intefig/' },
]

export const CONTACT = {
  email: 'hello@intefig.com',
  phoneDisplay: '+92 335 99 40 100',
  phoneHref: 'tel:+923359940100',
  site: 'intefig.com',
  location: 'Gujranwala, Pakistan',
}
