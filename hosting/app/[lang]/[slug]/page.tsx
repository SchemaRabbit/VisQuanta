import Link from 'next/link';
import { notFound } from 'next/navigation';
import glossaryData from '../../../data/glossary.json';

const languageConfig: Record<string, { backText: string; nextText: string; visitText: string }> = {
  fr: { backText: '← Retour au Glossaire', nextText: 'Suivant', visitText: 'Visiter' },
  zh: { backText: '← 返回词汇表', nextText: '下一个', visitText: '访问' },
  es: { backText: '← Volver al Glosario', nextText: 'Siguiente', visitText: 'Visitar' },
  de: { backText: '← Zurück zum Glossar', nextText: 'Weiter', visitText: 'Besuchen' },
  ar: { backText: '← العودة إلى المسرد', nextText: 'التالي', visitText: 'زيارة' },
  hi: { backText: '← शब्दावली पर वापस जाएं', nextText: 'अगला', visitText: 'यात्रा' },
  pt: { backText: '← Voltar ao Glossário', nextText: 'Próximo', visitText: 'Visitar' },
  ru: { backText: '← Назад к Глоссарию', nextText: 'Следующий', visitText: 'Посетить' },
};

const defaultLangConfig = { backText: '← Back to Glossary', nextText: 'Next', visitText: 'Visit' };

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];

  glossaryData.terms.forEach((term) => {
    Object.entries(term.translations).forEach(([lang, translation]) => {
      params.push({ lang, slug: translation.slug });
    });
  });

  return params;
}

export const dynamicParams = false;

export default async function TranslatedGlossaryTermPage({
  params
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params;
  const currentIndex = glossaryData.terms.findIndex(
    (item) => item.translations[lang]?.slug === slug
  );

  if (currentIndex === -1 || !glossaryData.terms[currentIndex].translations[lang]) {
    notFound();
  }

  const term = glossaryData.terms[currentIndex];
  const translation = term.translations[lang];
  const nextTerm = glossaryData.terms[(currentIndex + 1) % glossaryData.terms.length];
  const langConfig = languageConfig[lang] || defaultLangConfig;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-end gap-4 mb-4">
          <Link
            href={`/en/${term.id}`}
            className="text-orange-500 hover:text-orange-400 transition-colors"
          >
            English
          </Link>
          {Object.entries(term.translations)
            .filter(([code]) => code !== lang)
            .map(([code, translation]) => (
              <Link
                key={code}
                href={`/${code}/${translation.slug}`}
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

        <div className="flex items-center gap-4 mb-8">
          <Link
            href={`/${lang}`}
            className="text-orange-500 hover:text-orange-400 transition-colors"
          >
            {langConfig.backText}
          </Link>
        </div>

        <article className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-8 text-orange-500">
            {translation.term}
          </h1>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-8">
            <p className="text-xl text-gray-300 leading-relaxed">
              {translation.definition}
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href={glossaryData.site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
            >
              {langConfig.visitText} {glossaryData.site.name}
            </a>
            <Link
              href={`/${lang}/${nextTerm.translations[lang].slug}`}
              className="inline-block px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors border border-gray-700"
            >
              {langConfig.nextText}: {nextTerm.translations[lang].term} →
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
