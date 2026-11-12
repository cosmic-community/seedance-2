import { createBucketClient } from '@cosmicjs/sdk'
import { cache } from 'react'
import { getCosmic } from '@/lib/cosmic-preview'
import type { CosmicImage, Feature, SiteContent, SiteSettings } from '@/types'

// Write-capable client for server-side mutations (none are used by this site).
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

const DEFAULT_CTA_URL = 'https://www.seedance2.net/'

const DEFAULT_CONTENT: SiteContent = {
  id: '',
  siteName: 'Seedance 2',
  heroHeadline: 'Make Seedance 2.5 videos in one continuous take',
  heroSubheadline:
    'An independent web app for making AI videos with dialogue, music and sound effects generated together with the picture.',
  heroImageUrl: '',
  ogImageUrl: '',
  ctaLabel: 'Start creating',
  ctaUrl: DEFAULT_CTA_URL,
  signupNote: 'Sign-up is free with no card. New accounts get starter credits.',
  useCases: [
    'Product ads and marketing',
    'Social media videos',
    'Short films',
    'Music and dance videos',
  ],
  footerNote: 'Seedance 2 is not affiliated with ByteDance.',
}

function parseUseCases(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => getMetafieldValue(item).trim())
      .filter((item) => item.length > 0)
  }
  if (typeof value === 'string' && value.trim().length > 0) {
    const trimmed = value.trim()
    try {
      const parsed: unknown = JSON.parse(trimmed)
      if (Array.isArray(parsed)) return parseUseCases(parsed)
    } catch {
      // not JSON, fall through to newline split
    }
    return trimmed
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
  }
  return []
}

function getImgixUrl(image: CosmicImage | string | undefined): string {
  if (!image || typeof image === 'string') return ''
  return image.imgix_url || ''
}

async function fetchSettingsObject(): Promise<SiteSettings | null> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects
      .find({ type: 'site-settings' })
      .props(['id', 'title', 'slug', 'type', 'metadata'])
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    const objects = (response.objects ?? []) as SiteSettings[]
    const first = objects[0]
    return first ?? null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error('Failed to fetch site settings:', error)
    return null
  }
}

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const settings = await fetchSettingsObject()
  if (!settings) return DEFAULT_CONTENT

  const m = settings.metadata ?? {}
  const imgix = getImgixUrl(m.hero_image)
  const useCases = parseUseCases(m.use_cases)

  return {
    id: settings.id,
    siteName: getMetafieldValue(m.site_name).trim() || DEFAULT_CONTENT.siteName,
    heroHeadline: getMetafieldValue(m.hero_headline).trim() || DEFAULT_CONTENT.heroHeadline,
    heroSubheadline:
      getMetafieldValue(m.hero_subheadline).trim() || DEFAULT_CONTENT.heroSubheadline,
    heroImageUrl: imgix ? `${imgix}?w=2400&h=1350&fit=crop&auto=format,compress` : '',
    ogImageUrl: imgix ? `${imgix}?w=1200&h=630&fit=crop&auto=format,compress` : '',
    ctaLabel: getMetafieldValue(m.cta_label).trim() || DEFAULT_CONTENT.ctaLabel,
    ctaUrl: getMetafieldValue(m.cta_url).trim() || DEFAULT_CTA_URL,
    signupNote: getMetafieldValue(m.signup_note).trim() || DEFAULT_CONTENT.signupNote,
    useCases: useCases.length > 0 ? useCases : DEFAULT_CONTENT.useCases,
    footerNote: getMetafieldValue(m.footer_note).trim() || DEFAULT_CONTENT.footerNote,
  }
})

function getOrder(feature: Feature): number {
  const raw = Number(getMetafieldValue(feature.metadata?.display_order))
  return Number.isNaN(raw) ? Number.MAX_SAFE_INTEGER : raw
}

export const getFeatures = cache(async (): Promise<Feature[]> => {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects
      .find({ type: 'features' })
      .props(['id', 'title', 'slug', 'type', 'metadata'])
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    const features = (response.objects ?? []) as Feature[]
    // Manual sort by display_order ascending
    return [...features].sort((a, b) => getOrder(a) - getOrder(b))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Failed to fetch features:', error)
    return []
  }
})