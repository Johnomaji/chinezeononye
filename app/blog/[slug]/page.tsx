import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { marked } from 'marked'
import PublicLayout from '@/components/PublicLayout'
import NewsletterSection from '@/components/NewsletterSection'
import BlogCard from '@/components/BlogCard'
import { getBlogBySlug, getBlogs } from '@/lib/data'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const blogs = getBlogs().filter(b => b.published)
  return blogs.map(b => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: Props) {
  const post = getBlogBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Chineze Ononye Blog`,
    description: post.excerpt,
  }
}

export const revalidate = 60

export default function BlogPostPage({ params }: Props) {
  const post = getBlogBySlug(params.slug)
  if (!post || !post.published) notFound()

  const allPosts = getBlogs().filter(b => b.published && b.id !== post.id)
  const related = allPosts.filter(b => b.category === post.category).slice(0, 3)
  const others = allPosts.filter(b => b.category !== post.category).slice(0, 3 - related.length)
  const relatedPosts = [...related, ...others]

  const htmlContent = marked(post.content) as string

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="relative pt-32 pb-0 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.08),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-6 pb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Link href="/blog" className="text-gold-400 text-sm hover:text-gold-300 transition-colors">
              ← Blog
            </Link>
            <span className="text-white/30">·</span>
            <span className="px-3 py-1 bg-gold-500 text-charcoal text-xs font-semibold rounded-full">
              {post.category}
            </span>
          </div>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-white/60 text-lg mb-8 leading-relaxed">{post.excerpt}</p>
          <div className="flex items-center justify-center gap-6 text-sm text-white/40">
            <time dateTime={post.createdAt}>
              {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span>·</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </section>

      {/* COVER IMAGE */}
      <div className="relative h-[400px] md:h-[500px] bg-charcoal">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent" />
      </div>

      {/* ARTICLE CONTENT */}
      <article className="bg-cream py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="prose prose-lg prose-headings:font-playfair prose-headings:text-charcoal prose-h1:text-4xl prose-h2:text-3xl prose-h2:border-b prose-h2:border-gold-200 prose-h2:pb-3 prose-p:text-charcoal/70 prose-p:leading-relaxed prose-strong:text-charcoal prose-a:text-gold-600 prose-a:no-underline hover:prose-a:underline prose-li:text-charcoal/70 prose-blockquote:border-l-gold-400 prose-blockquote:text-charcoal/60 max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gold-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="px-4 py-2 bg-gold-50 text-gold-700 text-sm rounded-full border border-gold-200">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mt-8 p-6 bg-white rounded-2xl gold-border">
            <p className="text-charcoal font-semibold mb-4">Share this article</p>
            <div className="flex gap-3">
              {[
                { label: 'Twitter', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://chinezeonye.com/blog/${post.slug}`)}` },
                { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://chinezeonye.com/blog/${post.slug}`)}` },
                { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://chinezeonye.com/blog/${post.slug}`)}` },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-charcoal text-white text-sm font-medium rounded-lg hover:bg-gold-600 transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Author bio */}
          <div className="mt-8 p-8 bg-charcoal rounded-2xl flex gap-6 items-center">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold-400 shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80"
                alt="Chineze Ononye"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-playfair text-white font-bold text-lg">Chineze Ononye</p>
              <p className="text-white/50 text-sm mb-3">Teacher · Mentor · Motivational Speaker</p>
              <Link href="/about" className="text-gold-400 text-sm hover:text-gold-300 transition-colors">
                Learn more about Chineze →
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* RELATED POSTS */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-cream border-t border-gold-100">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-playfair text-3xl font-bold text-charcoal mb-8">
              Continue Reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterSection />
    </PublicLayout>
  )
}
