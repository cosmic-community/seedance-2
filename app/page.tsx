import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeaturesGrid from '@/components/FeaturesGrid'
import UseCases from '@/components/UseCases'
import CtaBand from '@/components/CtaBand'
import Footer from '@/components/Footer'
import { getFeatures, getSiteContent } from '@/lib/cosmic'

export default async function HomePage() {
  const [content, features] = await Promise.all([getSiteContent(), getFeatures()])

  return (
    <>
      {content.id && (
        <meta
          name="cosmic-context"
          content={JSON.stringify({ object_id: content.id, object_type: 'site-settings' })}
        />
      )}
      <Header siteName={content.siteName} ctaLabel={content.ctaLabel} ctaUrl={content.ctaUrl} />
      <main id="main">
        <Hero
          headline={content.heroHeadline}
          subheadline={content.heroSubheadline}
          imageUrl={content.heroImageUrl}
          ctaLabel={content.ctaLabel}
          ctaUrl={content.ctaUrl}
          signupNote={content.signupNote}
        />
        <FeaturesGrid features={features} />
        <UseCases useCases={content.useCases} />
        <CtaBand
          headline={content.heroHeadline}
          ctaLabel={content.ctaLabel}
          ctaUrl={content.ctaUrl}
          signupNote={content.signupNote}
        />
      </main>
      <Footer siteName={content.siteName} footerNote={content.footerNote} />
    </>
  )
}