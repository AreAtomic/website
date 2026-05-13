/** URL canonique du site, sans slash final (OG, sitemap, JSON-LD). */
export function getSiteUrl(): string {
  const raw =
    process.env.SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    'https://aureliensebe.com'
  return raw.replace(/\/+$/, '')
}
