import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/fonctionnalites', '/tarifs', '/avis', '/faq', '/discord', '/mentions-legales'];
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    changeFrequency: r === '' ? 'weekly' : 'monthly',
    priority: r === '' ? 1 : r === '/mentions-legales' ? 0.2 : 0.7,
  }));
}
