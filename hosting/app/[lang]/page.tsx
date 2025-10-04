import Link from 'next/link';
import { notFound } from 'next/navigation';
import glossaryData from '../../data/glossary.json';

const languageConfig: Record<string, { title: string; visitText: string }> = {
  fr: { title: 'Glossaire', visitText: 'Visiter' },
  zh: { title: '词汇表', visitText: '访问' },
  es: { title: 'Glosario', visitText: 'Visitar' },
  de: { title: 'Glossar', visitText: 'Besuchen' },
  ar: { title: 'المسرد', visitText: 'زيارة' },
  hi: { title: 'शब्दावली', visitText: 'यात्रा' },
  pt: { title: 'Glossário', visitText: 'Visitar' },
  ru: { title: 'Глоссарий', visitText: 'Посетить' },
};

export async function generateStaticParams() {
  const languages = Object.keys(glossaryData.site.translations);
  return languages.map((lang) => ({ lang }));
}

export default function TranslatedHomePage({ params }: { params: { lang: string } }) {
  const siteTranslation = glossaryData.site.translations[params.lang];

  if (!siteTranslation) {
    notFound();
  }

  const langConfig = languageConfig[params.lang] || { title: 'Glossary', visitText: 'Visit' };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-end gap-4 mb-4">
          <Link
            href="/en"
            className="text-orange-500 hover:text-orange-400 transition-colors"
          >
            English
          </Link>
          {Object.keys(glossaryData.site.translations)
            .filter((lang) => lang !== params.lang)
            .map((lang) => (
              <Link
                key={lang}
                href={`/${lang}`}
                className="text-orange-500 hover:text-orange-400 transition-colors"
              >
                {lang === 'fr' ? 'Français' :
                 lang === 'zh' ? '中文' :
                 lang === 'es' ? 'Español' :
                 lang === 'de' ? 'Deutsch' :
                 lang === 'ar' ? 'العربية' :
                 lang === 'hi' ? 'हिन्दी' :
                 lang === 'pt' ? 'Português' :
                 lang === 'ru' ? 'Русский' :
                 lang.toUpperCase()}
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
          <a
            href={glossaryData.site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
          >
            {langConfig.visitText} {glossaryData.site.name}
          </a>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {glossaryData.terms.map((item) => {
            const termTranslation = item.translations[params.lang];
            return (
              <Link
                key={item.id}
                href={`/${params.lang}/${termTranslation.slug}`}
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
      </div>
    </div>
  );
}
