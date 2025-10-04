import Link from 'next/link';
import { notFound } from 'next/navigation';
import glossaryData from '../../../data/glossary.json';

export async function generateStaticParams() {
  return glossaryData.terms.map((item) => ({
    id: item.id,
  }));
}

export default function GlossaryTermPage({ params }: { params: { id: string } }) {
  const currentIndex = glossaryData.terms.findIndex((item) => item.id === params.id);

  if (currentIndex === -1) {
    notFound();
  }

  const term = glossaryData.terms[currentIndex];
  const nextTerm = glossaryData.terms[(currentIndex + 1) % glossaryData.terms.length];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="text-orange-500 hover:text-orange-400 transition-colors"
          >
            ← Back to Glossary
          </Link>
        </div>

        <article className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-8 text-orange-500">
            {term.term}
          </h1>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-8">
            <p className="text-xl text-gray-300 leading-relaxed">
              {term.definition}
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href={glossaryData.site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
            >
              Visit {glossaryData.site.name}
            </a>
            <Link
              href={`/glossary/${nextTerm.id}`}
              className="inline-block px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors border border-gray-700"
            >
              Next: {nextTerm.term} →
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
