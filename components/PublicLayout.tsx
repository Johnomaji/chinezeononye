import Navigation from './Navigation'
import Footer from './Footer'
import UnstoppableYouPopup from './UnstoppableYouPopup'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
      <UnstoppableYouPopup />
    </>
  )
}
