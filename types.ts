export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, unknown>
  type: string
  created_at: string
  modified_at: string
}

export interface CosmicImage {
  url: string
  imgix_url: string
}

export interface SiteSettings extends CosmicObject {
  type: 'site-settings'
  metadata: {
    site_name?: string
    hero_headline?: string
    hero_subheadline?: string
    hero_image?: CosmicImage
    cta_label?: string
    cta_url?: string
    signup_note?: string
    use_cases?: string[] | string
    footer_note?: string
  }
}

export interface Feature extends CosmicObject {
  type: 'features'
  metadata: {
    description?: string
    icon?: string
    display_order?: number | string
  }
}

// Normalized content used by the UI
export interface SiteContent {
  id: string
  siteName: string
  heroHeadline: string
  heroSubheadline: string
  heroImageUrl: string
  ogImageUrl: string
  ctaLabel: string
  ctaUrl: string
  signupNote: string
  useCases: string[]
  footerNote: string
}