import { pageMetadata } from '@/lib/seo'

// The contact page itself is a client component and cannot export metadata,
// so it lives here on the segment layout instead.
export const metadata = pageMetadata({
  title: 'Contact | Chineze Eden',
  description:
    'Get in touch with Chineze Eden — speaking requests, workshops, mentorship, Boyspiration group calls, and partnership enquiries.',
  path: '/contact',
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
