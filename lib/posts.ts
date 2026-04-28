import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'content/posts')

export type PostMeta = {
  title: string
  date: string
  slug: string
  description: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return []
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(postsDir, f), 'utf-8')
      const { data } = matter(raw)
      return data as PostMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): { meta: PostMeta; content: string } {
  const raw = fs.readFileSync(path.join(postsDir, `${slug}.mdx`), 'utf-8')
  const { data, content } = matter(raw)
  return { meta: data as PostMeta, content }
}
