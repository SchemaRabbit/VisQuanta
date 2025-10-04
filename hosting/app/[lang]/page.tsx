import Link from 'next/link';
import { notFound } from 'next/navigation';
import glossaryData from '../../data/glossary.json';
import { GITHUB_REPO_URL } from '../../lib/constants';

const languageConfig: Record<string, { title: string; visitText: string; githubText: string }> = {
  fr: { title: 'Glossaire', visitText: 'Visiter', githubText: 'Voir GitHub' },
  zh: { title: '词汇表', visitText: '访问', githubText: '查看 GitHub' },
  es: { title: 'Glosario', visitText: 'Visitar', githubText: 'Ver GitHub' },
  de: { title: 'Glossar', visitText: 'Besuchen', githubText: 'GitHub anzeigen' },
  ar: { title: 'المسرد', visitText: 'زيارة', githubText: 'عرض GitHub' },
  hi: { title: 'शब्दावली', visitText: 'यात्रा', githubText: 'GitHub देखें' },
  pt: { title: 'Glossário', visitText: 'Visitar', githubText: 'Ver GitHub' },
  ru: { title: 'Глоссарий', visitText: 'Посетить', githubText: 'Посмотреть GitHub' },
};

export async function generateStaticParams() {
  const languages = Object.keys(glossaryData.site.translations);
  return languages.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export default async function TranslatedHomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const siteTranslation = glossaryData.site.translations[lang];

  if (!siteTranslation) {
    notFound();
  }

  const langConfig = languageConfig[lang] || { title: 'Glossary', visitText: 'Visit', githubText: 'View GitHub' };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center md:justify-end gap-3 md:gap-4 mb-6 text-sm md:text-base">
          <Link
            href="/en"
            className="text-orange-500 hover:text-orange-400 transition-colors"
          >
            English
          </Link>
          {Object.keys(glossaryData.site.translations)
            .filter((code) => code !== lang)
            .map((code) => (
              <Link
                key={code}
                href={`/${code}`}
                className="text-orange-500 hover:text-orange-400 transition-colors"
              >
                {code === 'fr' ? 'Français' :
                 code === 'zh' ? '中文' :
                 code === 'es' ? 'Español' :
                 code === 'de' ? 'Deutsch' :
                 code === 'ar' ? 'العربية' :
                 code === 'hi' ? 'हिन्दी' :
                 code === 'pt' ? 'Português' :
                 code === 'ru' ? 'Русский' :
                 code.toUpperCase()}
              </Link>
            ))}
        </div>

        <header className="mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-orange-500">{glossaryData.site.name}</span> {langConfig.title}
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            {siteTranslation.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={glossaryData.site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
            >
              {langConfig.visitText} {glossaryData.site.name}
            </a>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors border border-gray-700"
            >
              {langConfig.githubText}
            </a>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {glossaryData.terms.map((item) => {
            const termTranslation = item.translations[lang];
            return (
              <Link
                key={item.id}
                href={`/${lang}/${termTranslation.slug}`}
                className="block p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-orange-500 transition-colors"
              >
                <h2 className="text-2xl font-semibold text-orange-500 mb-3">
                  {termTranslation.term}
                </h2>
                <p className="text-gray-400 line-clamp-3">{termTranslation.definition}</p>
              </Link>
            );
          })}
        </div>

        <footer className="mt-16 flex justify-center text-gray-500 text-sm">
          <span>
            Powered by{' '}
            <a
              href="https://schemarabbit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-400"
            >
              SchemaRabbit
            </a>
          </span>
        </footer>
      </div>
    </div>
  );
}
