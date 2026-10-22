/**
 * Central SEO configuration. SITE_URL is the production origin — the ONLY
 * place it is defined. If the site is deployed to a different domain,
 * change it here (and in public/robots.txt, public/sitemap.xml and the
 * static tags in index.html, which cannot import this constant).
 */
export const SITE_URL = 'https://intefig.com'
export const SITE_NAME = 'INTEFIG'
export const OG_IMAGE = `${SITE_URL}/og-image.png`

export interface PageSeo {
  title: string
  description: string
  path: string
}

export const PAGE_SEO: Record<'home' | 'services' | 'team' | 'contact', PageSeo> = {
  home: {
    title: 'INTEFIG — Email & SMS Retention Marketing for eCommerce Brands',
    description:
      'INTEFIG helps eCommerce brands turn subscribers into repeat buyers with email campaigns, eCommerce automation, SMS, landing pages and lead generation. Retention. Automated. Delivered.',
    path: '/',
  },
  services: {
    title: 'Services — Email Campaigns, Automation, SMS & Landing Pages | INTEFIG',
    description:
      'Six services, one goal: turning subscribers into repeat buyers. Email campaigns, eCommerce automation, SMS automation, tools integration, landing pages and lead generation — in detail.',
    path: '/services',
  },
  team: {
    title: 'Meet the Team | INTEFIG',
    description:
      'A full-service email, SMS & web team in-house — strategy, design, development and automation under one roof in Gujranwala, Pakistan.',
    path: '/team',
  },
  contact: {
    title: 'Contact INTEFIG — Let’s Build Your Retention Engine',
    description:
      'Tell us where your email program is today and where you want it to go — we’ll reply with honest next steps, no obligation. Or book a free 15-minute call.',
    path: '/contact',
  },
}
