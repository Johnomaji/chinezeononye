import Link from 'next/link'
import Image from 'next/image'
import PublicLayout from '@/components/PublicLayout'
import ScrollAnimator from '@/components/ScrollAnimator'
import BlogCard from '@/components/BlogCard'
import { getBlogs } from '@/lib/data'

export const metadata = {
  title: 'Blog | Chineze Ononye',
  description: 'Insights on teaching, mentorship, personal development, and living with purpose.',
}

export const revalidate = 60

export default function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const allPosts = getBlogs().filter(b => b.published)
  const categories = ['All', ...Array.from(new Set(allPosts.map(p => p.category)))]
  const activeCategory = searchParams.category || 'All'
  const posts = activeCategory === 'All'
    ? allPosts
    : allPosts.filter(p => p.category === activeCategory)

  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  return (
    <PublicLayout>
      <ScrollAnimator />

      {/* HERO */}
      <section className="relative pt-32 pb-16 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,162,39,0.1),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-6">
            <span className="text-gold-400 text-xs font-medium tracking-widest uppercase">Insights & Ideas</span>
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6">
            The <span className="gold-text">Blog</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">
            Thoughts on teaching, mentorship, personal growth, and the courage it takes to live a purposeful life.
          </p>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="bg-charcoal border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gold-gradient text-charcoal'
                  : 'border border-white/20 text-white/70 hover:border-gold-400 hover:text-gold-400'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* BLOG CONTENT */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-charcoal/50 text-lg">No posts found in this category.</p>
              <Link href="/blog" className="mt-4 inline-block text-gold-600 hover:text-gold-700 font-medium">
                View all posts →
              </Link>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div className="animate-on-scroll mb-12">
                  <Link href={`/blog/${featuredPost.slug}`} className="group block">
                    <article className="bg-white rounded-3xl overflow-hidden gold-border card-hover">
                      <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="relative h-72 lg:h-auto">
                          <Image
                            src={featuredPost.coverImage}
                            alt={featuredPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                          <span className="absolute top-6 left-6 px-3 py-1 bg-gold-500 text-charcoal text-xs font-semibold rounded-full">
                            Featured · {featuredPost.category}
                          </span>
                        </div>
                        <div className="p-10 flex flex-col justify-center">
                          <div className="flex items-center gap-3 text-xs text-charcoal/50 mb-4">
                            <time dateTime={featuredPost.createdAt}>
                              {new Date(featuredPost.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </time>
                            <span>·</span>
                            <span>{featuredPost.readTime} min read</span>
                          </div>
                          <h2 className="font-playfair text-3xl font-bold text-charcoal group-hover:text-gold-600 transition-colors mb-4 leading-tight">
                            {featuredPost.title}
                          </h2>
                          <p className="text-charcoal/60 leading-relaxed mb-6">{featuredPost.excerpt}</p>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {featuredPost.tags.map(tag => (
                              <span key={tag} className="px-3 py-1 bg-gold-50 text-gold-700 text-xs rounded-full">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 text-gold-600 font-medium">
                            Read Article
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>
              )}

              {/* Grid of remaining posts */}
              {remainingPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {remainingPosts.map((post, i) => (
                    <div key={post.id} className="animate-on-scroll" style={{ transitionDelay: `${i * 80}ms` }}>
                      <BlogCard post={post} />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </PublicLayout>
  )
}
