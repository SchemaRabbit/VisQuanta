import { MetadataRoute } from 'next';
import glossaryData from '../data/glossary.json';
import { SITEMAP_BASE_URL } from '../lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = ['en', ...Object.keys(glossaryData.site.translations)];
  const urls: MetadataRoute.Sitemap = [];

  languages.forEach((lang) => {
    urls.push({
      url: `${SITEMAP_BASE_URL}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });
  });

  glossaryData.terms.forEach((term) => {
    urls.push({
      url: `${SITEMAP_BASE_URL}/en/${term.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    Object.keys(glossaryData.site.translations).forEach((lang) => {
      if (term.translations[lang]) {
        urls.push({
          url: `${SITEMAP_BASE_URL}/${lang}/${term.translations[lang].slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    });
  });

  return urls;
}
