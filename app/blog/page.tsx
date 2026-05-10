import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts, type PostMeta } from '@/lib/posts'

export const metadata = {
  title: 'Blog — Aurélien Sèbe',
  description: 'Réflexions sur le développement web, SaaS, et intégration IA.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="pt-16">
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-[760px] mx-auto">
          <div className="text-[12px] font-bold tracking-[0.1em] uppercase text-brand-blue mb-3">
            Blog
          </div>
          <h1 className="text-[clamp(32px,4vw,52px)] font-extrabold tracking-[-0.03em] text-brand-ink leading-[1.1] mb-4">
            Notes & réflexions
          </h1>
          <p className="text-[17px] text-brand-muted leading-[1.6] mb-16">
            Développement web, produit, IA
          </p>

          {posts.length === 0 ? (
            <p className="text-brand-muted">Aucun article pour le moment. Revenez bientôt.</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => {
                const p = post as PostMeta
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden hover:border-brand-blue hover:shadow-[0_8px_32px_rgba(0,82,204,0.08)] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-stretch">
                      {p.cover ? (
                        <div className="relative w-full sm:w-[220px] min-h-[160px] sm:min-h-0 flex-shrink-0 border-b sm:border-b-0 sm:border-r border-[#E8E8E8] bg-[#f4f5f7]">
                          <Image
                            src={p.cover}
                            alt={p.coverAlt ?? p.title}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 640px) 100vw, 220px"
                          />
                        </div>
                      ) : null}
                      <div className="p-8 flex-1 min-w-0">
                        <div className="text-[13px] text-brand-muted font-medium mb-2">
                          {new Date(post.date).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>
                        <h2 className="text-xl font-bold text-brand-ink mb-2 group-hover:text-brand-blue transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-[15px] text-brand-muted leading-[1.6]">{post.description}</p>
                        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue group-hover:gap-2.5 transition-all">
                          Lire l&apos;article
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M3 8h10M9 4l4 4-4 4"
                              stroke="#0052CC"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
