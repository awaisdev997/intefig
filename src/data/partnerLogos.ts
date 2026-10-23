/**
 * Official partner logos, taken from each partner's own website / brand
 * asset library (Oct 23, 2026):
 * - Mailchimp: Intuit brand asset library (cornerstone brand lockup)
 * - Omnisend: omnisend.com theme asset (omnisend_logo_dark.svg)
 * - Klaviyo: klaviyo.com header wordmark (black)
 * - MailerLite: mailerlite.com header logo
 * - Shopify: Shopify brand assets CDN (primary logo)
 * - HubSpot: hubspot.com HubSpot_Logos/HSLogo_color.svg
 * Keyed by the partner name used in PARTNERS (src/data/content.ts).
 */
import mailchimp from '../assets/partners/mailchimp.svg'
import omnisend from '../assets/partners/omnisend.svg'
import klaviyo from '../assets/partners/klaviyo.svg'
import mailerlite from '../assets/partners/mailerlite.svg'
import shopify from '../assets/partners/shopify.svg'
import hubspot from '../assets/partners/hubspot.svg'

export const PARTNER_LOGOS: Record<string, string> = {
  Mailchimp: mailchimp,
  Omnisend: omnisend,
  Klaviyo: klaviyo,
  MailerLite: mailerlite,
  Shopify: shopify,
  HubSpot: hubspot,
}
