import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/lib/types'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className={`group block ${featured ? 'md:col-span-2' : ''}`}>
      <article className="bg-white rounded-2xl overflow-hidden card-hover gold-border h-full">
        <div className={`relative overflow-hidden ${featured ? 'h-72' : 'h-52'}`}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <span className="absolute top-4 left-4 px-3 py-1 bg-gold-500 text-charcoal text-xs font-semibold rounded-full">
            {post.category}
          </span>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-charcoal/50 mb-3">
            <time dateTime={post.createdAt}>
              {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span>·</span>
            <span>{post.readTime} min read</span>
          </div>
          <h3 className={`font-playfair font-bold text-charcoal group-hover:text-gold-600 transition-colors leading-snug mb-3 ${featured ? 'text-2xl' : 'text-lg'}`}>
            {post.title}
          </h3>
          <p className="text-charcoal/60 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
          <div className="mt-4 flex items-center gap-2 text-gold-600 text-sm font-medium">
            Read more
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}
