import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPost, isPostPublished, type PostMeta } from '@/lib/posts'
import { getSiteUrl } from '@/lib/site'

const siteOrigin = getSiteUrl()

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  try {
    const { meta } = getPost(params.slug)
    if (!isPostPublished(meta)) notFound()
    const m = meta as PostMeta
    const canonicalPath = `/blog/${params.slug}`
    const coverIsLocal = m.cover && m.cover.startsWith('/')
    const ogImage = coverIsLocal
      ? [{ url: m.cover as string, alt: m.coverAlt ?? meta.title }]
      : [{ url: '/og-image.png', alt: meta.title }]

    return {
      title: `${meta.title} — Aurélien Sèbe`,
      description: meta.description,
      alternates: {
        canonical: canonicalPath,
      },
      openGraph: {
        title: meta.title,
        description: meta.description,
        type: 'article',
        publishedTime: String(meta.date),
        authors: ['Aurélien Sèbe'],
        url: canonicalPath,
        locale: 'fr_FR',
        images: ogImage,
      },
      twitter: {
        card: 'summary_large_image',
        title: meta.title,
        description: meta.description,
        images: ogImage.map((i) => i.url),
      },
    }
  } catch {
    return {}
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  let post
  try {
    post = getPost(params.slug)
  } catch {
    notFound()
  }

  const { meta, content } = post
  if (!isPostPublished(meta)) notFound()
  const m = meta as PostMeta

  const articleUrl = `${siteOrigin}/blog/${m.slug}`
  const imageUrls =
    m.cover && m.cover.startsWith('/')
      ? [new URL(m.cover, siteOrigin).href]
      : [`${siteOrigin}/og-image.png`]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: m.title,
    description: m.description,
    datePublished: String(m.date),
    author: {
      '@type': 'Person',
      name: 'Aurélien Sèbe',
      url: siteOrigin,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Aurélien Sèbe',
      url: siteOrigin,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    url: articleUrl,
    image: imageUrls,
    inLanguage: 'fr-FR',
  }

  return (
    <main className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="py-20 px-6 md:px-10">
        <div className="max-w-[720px] mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-muted hover:text-brand-blue transition-colors mb-10"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M13 8H3M7 4l-4 4 4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Retour au blog
          </Link>

          {m.cover ? (
            <div className="mb-10 rounded-2xl overflow-hidden border border-[#E8E8E8] shadow-[0_8px_40px_rgba(0,0,0,0.06)] bg-[#f4f5f7]">
              <Image
                src={m.cover}
                alt={m.coverAlt ?? m.title}
                width={1600}
                height={900}
                sizes="(max-width: 768px) 100vw, 720px"
                className="w-full h-auto object-cover object-top"
                priority
              />
            </div>
          ) : null}

          {/* Header */}
          <div className="mb-12">
            <div className="text-[13px] text-brand-muted font-medium mb-4">
              <time dateTime={String(m.date)}>
                {new Date(meta.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <h1 className="text-[clamp(28px,4vw,48px)] font-extrabold tracking-[-0.03em] text-brand-ink leading-[1.1] mb-4">
              {meta.title}
            </h1>
            <p className="text-[17px] text-brand-muted leading-[1.6]">{meta.description}</p>
          </div>

          <div className="border-t border-[#E8E8E8] pt-10">
            <div className="prose prose-lg prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-brand-ink prose-a:text-brand-blue prose-strong:text-brand-ink max-w-none">
              <MDXRemote source={content} />
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-16 pt-10 border-t border-[#E8E8E8]">
            <div className="bg-brand-blue-light rounded-2xl p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="font-bold text-brand-ink mb-1">Un projet en tête ?</div>
                <p className="text-[15px] text-brand-muted">
                  Parlons de votre situation — sans engagement.
                </p>
              </div>
              <Link
                href="/contact"
                className="flex-shrink-0 bg-brand-orange hover:bg-brand-orange-dark text-white px-6 py-3 rounded-[10px] font-bold text-sm transition-all hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(255,107,53,0.3)]"
              >
                Me contacter →
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
