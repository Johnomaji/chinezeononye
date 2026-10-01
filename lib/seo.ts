import type { Metadata } from 'next'

/**
 * Canonical origin, no trailing slash. www is the canonical host — the apex
 * domain 308-redirects to it. The fallback matters: .env.local is gitignored,
 * so a deploy without NEXT_PUBLIC_SITE_URL set falls back to this value, and a
 * localhost default here would ship a sitemap full of unreachable URLs.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.chinezeononye.com'
export const SITE_NAME = 'Chineze Eden'
export const SITE_LOCALE = 'en_NG'

/**
 * The generated card from app/opengraph-image.tsx. A page that declares its own
 * `openGraph` block replaces the root's rather than merging with it, so every page
 * has to carry the image explicitly or it ends up with no preview image at all.
 */
const DEFAULT_OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Chineze Eden — Teacher · Mentor · Writer',
}

type PageSeo = {
  /** Full <title> text for the page. */
  title: string
  description: string
  /** Route path, e.g. '/speaking'. Resolved against metadataBase for canonical + og:url. */
  path: string
  /** Absolute or root-relative image path. Falls back to the generated opengraph-image. */
  image?: string
}

/** Metadata for a standard content page: canonical URL, Open Graph, and Twitter card. */
export function pageMetadata({ title, description, path, image }: PageSeo): Metadata {
  const images = image ? [image] : [DEFAULT_OG_IMAGE]

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: 'website',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  }
}

type ArticleSeo = PageSeo & {
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
}

/** Metadata for a blog post: as above, but typed as an og:article with dates and tags. */
export function articleMetadata({
  title,
  description,
  path,
  image,
  publishedTime,
  modifiedTime,
  tags,
}: ArticleSeo): Metadata {
  const images = image ? [image] : [DEFAULT_OG_IMAGE]

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: [SITE_NAME],
      tags,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  }
}
