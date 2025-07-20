import { MetadataRoute } from 'next'
import { generateSitemap } from './generateMetadata'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return generateSitemap()
} 