import Link from 'next/link';
import glossaryData from '../data/glossary.json';

export default function Page() {
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
          {Object.keys(glossaryData.site.translations).map((lang) => {
            const langNames: Record<string, string> = {
              fr: 'Français',
              zh: '中文',
              es: 'Español',
              de: 'Deutsch',
              ar: 'العربية',
              hi: 'हिन्दी',
              pt: 'Português',
              ru: 'Русский',
            };
            return (
              <Link
                key={lang}
                href={`/${lang}`}
                className="text-orange-500 hover:text-orange-400 transition-colors"
              >
                {langNames[lang] || lang.toUpperCase()}
              </Link>
            );
          })}
        </div>

        <header className="mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-orange-500">{glossaryData.site.name}</span> Glossary
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            {glossaryData.site.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={glossaryData.site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
            >
              Visit {glossaryData.site.name}
            </a>
            <a
              href="https://github.com/SchemaRabbit/VisQuanta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors border border-gray-700"
            >
              View GitHub
            </a>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {glossaryData.terms.map((item) => (
            <Link
              key={item.id}
              href={`/en/${item.id}`}
              className="block p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-orange-500 transition-colors"
            >
              <h2 className="text-2xl font-semibold text-orange-500 mb-3">
                {item.term}
              </h2>
              <p className="text-gray-400 line-clamp-3">{item.definition}</p>
            </Link>
          ))}
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
