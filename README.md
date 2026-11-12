# Seedance 2 Landing Site
![App Preview](https://imgix.cosmicjs.com/c0481420-de82-11f1-9283-01aa56c6a663-autopilot-photo-1485846234645-a62644f84728-1794478857817.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A dark, cinematic, single-page marketing site for **Seedance 2**, an independent web app for making AI videos. Every piece of content is managed in [Cosmic](https://www.cosmicjs.com).

## Features
- 🎬 Cinematic hero with CMS-driven headline, subheadline, background image and CTA
- ✨ Features grid sorted by `display_order`
- 🏷️ Use cases rendered as visual tag cards
- 📣 Closing CTA band with sign-up note
- 🔗 Every CTA is a normal external link to the URL stored in Cosmic
- 🔍 SEO and Open Graph metadata derived from site settings
- 📱 Responsive, accessible and fast, with server-rendered content

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6af592e33575e770c8a68564&clone_repository=6af593973575e770c8a68595)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: A simple one-page site called "Seedance 2" that introduces the web app at https://www.seedance2.net/ . Use ONLY these facts: Seedance 2 is an independent web app for making Seedance 2.5 videos: one continuous take of 4 to 30 seconds at up to 1080p, with dialogue, music and sound effects generated together with the picture. Use up to 50 references (30 images, 10 videos, 10 audio clips) to keep characters consistent, and edit or extend an existing clip. Seedance 2.0, 2.0 Fast and 2 Mini plus Veo 3.1 and Kling 4.0 are on the same credit balance. Use cases: product ads and marketing, social media videos, short films, music and dance videos. New accounts get starter credits; sign-up is free with no card. Every call-to-action button must be a normal link to https://www.seedance2.net/ . Footer note: "Seedance 2 is not affiliated with ByteDance." Do NOT invent testimonials, reviews, ratings, customer logos, statistics, prices, team members or any other facts."

### Code Generation Prompt

> Build a Next.js application for a company website called "Seedance 2". The content is managed in Cosmic CMS with the following object types: site-settings, features. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A single-page marketing landing site for "Seedance 2", an independent web app for making AI videos. All content comes from the existing Cosmic CMS: the "site-settings" singleton object (site_name, hero_headline, hero_subheadline, hero_image, cta_label, cta_url, signup_note, use_cases JSON array of strings, footer_note) and the "features" object type (title, description, icon emoji, display_order number; sort by display_order ascending). Sections: 1) Hero with headline, subheadline, hero image as a cinematic background or side visual, primary CTA button linking to cta_url (external, opens https://www.seedance2.net/), and the signup_note shown beneath the button. 2) Features grid showing each feature card with its emoji icon, title and description. 3) Use cases section rendering the use_cases list as visually appealing tags/cards. 4) Closing CTA band repeating the CTA button and signup note. 5) Footer with site name and footer_note (disclaimer). Design: modern, dark cinematic theme suited to AI video creation, bold typography, subtle gradients, fully responsive, accessible, fast. Include proper SEO metadata (title, description, Open Graph) derived from site settings.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies
- [Next.js 16](https://nextjs.org) (App Router, Server Components)
- React 19 and TypeScript (strict)
- Tailwind CSS 3
- [Cosmic](https://www.cosmicjs.com/docs) headless CMS via `@cosmicjs/sdk`

## Getting Started

### Prerequisites
- [Bun](https://bun.sh) installed
- A Cosmic bucket with the `site-settings` and `features` object types

### Installation
```bash
bun install
bun run dev
```

Set these environment variables in your environment or hosting dashboard:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

## Cosmic SDK Examples
```typescript
// Fetch features sorted by display_order (server-side only)
const { cosmic, previewToken } = await getCosmic()
const query = cosmic.objects
  .find({ type: 'features' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
const { objects } = previewToken ? await query.status('any') : await query
```

## Cosmic CMS Integration
- `site-settings` supplies site name, hero copy and image, CTA label and URL, sign-up note, use cases and footer note.
- `features` supplies the cards in the features grid. Edit `display_order` to reorder them.
- All Cosmic calls run on the server. No keys are exposed to the browser.
- See the [Cosmic docs](https://www.cosmicjs.com/docs) for more.

## Deployment Options
- **Vercel**: import the repository, add the three Cosmic environment variables and deploy.
- **Netlify**: use the Next.js runtime and add the same environment variables.
- Run `bun run type-check` before deploying. It also runs automatically as a `prebuild` step.

<!-- README_END -->