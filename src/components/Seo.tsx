import { useEffect } from 'react'
import { OG_IMAGE, SITE_NAME, SITE_URL } from '../lib/seo'

/**
 * Per-route document metadata for the SPA: title, description, canonical,
 * robots directive, Open Graph / Twitter tags, and optional JSON-LD
 * (pass only schema that matches visible page content). Tags are applied
 * on mount and updated on route change; JSON-LD scripts are removed on
 * unmount. Static defaults for crawlers that don't run JS live in
 * index.html.
 */
export function Seo({
  title,
  description,
  path,
  noindex = false,
  jsonLd,
}: {
  title: string
  description: string
  path: string
  noindex?: boolean
  jsonLd?: object | object[]
}) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`
    document.title = title
    const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }
    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website')
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME)
    setMeta('meta[property="og:image"]', 'property', 'og:image', OG_IMAGE)
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', OG_IMAGE)
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    const scripts: HTMLScriptElement[] = []
    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
      for (const item of items) {
        const s = document.createElement('script')
        s.type = 'application/ld+json'
        s.dataset.seoLd = 'true'
        s.textContent = JSON.stringify(item)
        document.head.appendChild(s)
        scripts.push(s)
      }
    }
    return () => scripts.forEach((s) => s.remove())
  }, [title, description, path, noindex, jsonLd])
  return null
}

/** BreadcrumbList JSON-LD matching the visible Breadcrumbs component. */
export function breadcrumbLd(crumbs: { label: string; to?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.to ? { item: `${SITE_URL}${c.to}` } : {}),
    })),
  }
}
