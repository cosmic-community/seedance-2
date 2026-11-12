import type { Metadata, Viewport } from 'next'
import './globals.css'
import CosmicBadge from '@/components/CosmicBadge'
import { getSiteContent } from '@/lib/cosmic'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent()
  const title = `${content.siteName}: ${content.heroHeadline}`
  const description =
    content.heroSubheadline.length > 160
      ? `${content.heroSubheadline.slice(0, 157)}...`
      : content.heroSubheadline

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: content.siteName,
      images: content.ogImageUrl
        ? [{ url: content.ogImageUrl, width: 1200, height: 630, alt: content.siteName }]
        : undefined,
    },
    twitter: {
      card: content.ogImageUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      images: content.ogImageUrl ? [content.ogImageUrl] : undefined,
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#07070b',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎬</text></svg>"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
              <script defer src="https://insights.cosmicinsights.dev/script.js" data-project="6af592e33575e770c8a68562"></script>
      </head>
      <body className="bg-ink-950 font-sans text-white antialiased">
        {children}
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}