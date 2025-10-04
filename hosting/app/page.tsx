import Link from 'next/link';
import glossaryData from '../data/glossary.json';

export default function Page() {
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
          {Object.keys(glossaryData.site.translations).map((lang) => {
            const langNames: Record<string, string> = {
              fr: 'Français',
              zh: '中文',
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
          <a
            href={glossaryData.site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
          >
            Visit {glossaryData.site.name}
          </a>
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
      </div>
    </div>
  );
}
