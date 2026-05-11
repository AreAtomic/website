import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'content/posts')

export type PostMeta = {
  title: string
  date: string
  slug: string
  description: string
  /** Chemin public, ex. /images/blog/ma-couverture.png */
  cover?: string
  coverAlt?: string
  /** Si true : jamais listé ni accessible (prioritaire sur la date). */
  draft?: boolean
}

/** Jour calendaire Europe/Paris, format YYYY-MM-DD */
function calendarDayParis(value: string | Date): string {
  if (typeof value === 'string') {
    const m = /^(\d{4}-\d{2}-\d{2})/.exec(value.trim())
    if (m) return m[1]
  }
  const d = value instanceof Date ? value : new Date(String(value))
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-CA', { timeZone: 'Europe/Paris' })
}

function calendarDayTodayParis(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Paris' })
}

/**
 * Article visible (liste blog, sitemap, URL) : pas brouillon,
 * et date du frontmatter (jour à Paris) ≤ aujourd’hui.
 */
export function isPostPublished(meta: PostMeta): boolean {
  if (meta.draft === true) return false
  const pub = calendarDayParis(meta.date as string | Date)
  if (!pub) return true
  return pub <= calendarDayTodayParis()
}

function readAllPostMetaFromDisk(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return []
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(postsDir, f), 'utf-8')
      const { data } = matter(raw)
      return data as PostMeta
    })
}

export function getAllPosts(): PostMeta[] {
  return readAllPostMetaFromDisk()
    .filter(isPostPublished)
    .sort((a, b) => new Date(b.date as string).getTime() - new Date(a.date as string).getTime())
}

/** Tous les fichiers posts (y compris brouillons / date future) — utile pour outillage local. */
export function getAllPostsIncludingUnpublished(): PostMeta[] {
  return readAllPostMetaFromDisk().sort(
    (a, b) => new Date(b.date as string).getTime() - new Date(a.date as string).getTime(),
  )
}

export function getPost(slug: string): { meta: PostMeta; content: string } {
  const raw = fs.readFileSync(path.join(postsDir, `${slug}.mdx`), 'utf-8')
  const { data, content } = matter(raw)
  return { meta: data as PostMeta, content }
}
