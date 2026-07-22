import { ChevronRight } from 'lucide-react';
import { Footer } from '../components/Footer';

export interface ContentBlock {
  type: 'h2' | 'h3' | 'p' | 'ul' | 'ol' | 'highlight' | 'table';
  text?: string;
  items?: string[];
  rows?: string[][];
  headers?: string[];
}

export interface StaticPageData {
  slug: string;
  title: string;
  subtitle: string;
  accentColor?: string;
  blocks: ContentBlock[];
}

interface Props {
  page: StaticPageData;
  onGoHome: () => void;
  onNavigate?: (slug: string) => void;
}

export function StaticPage({ page, onGoHome, onNavigate }: Props) {
  const accent = page.accentColor ?? '#D4AF37';

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Hero */}
        <div className="bg-gradient-to-b from-[#1a1147] to-[#16103D] border-b border-white/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
              <button onClick={onGoHome} className="hover:text-white transition-colors">Início</button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-300">{page.title}</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl font-bold mb-3">{page.title}</h1>
            <p className="text-gray-400 text-base">{page.subtitle}</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="prose-custom space-y-5">
            {page.blocks.map((block, i) => {
              if (block.type === 'h2') {
                return (
                  <h2 key={i} className="text-xl sm:text-2xl font-bold mt-8 mb-2 first:mt-0" style={{ color: accent }}>
                    {block.text}
                  </h2>
                );
              }
              if (block.type === 'h3') {
                return (
                  <h3 key={i} className="text-base sm:text-lg font-semibold text-white mt-6 mb-2">
                    {block.text}
                  </h3>
                );
              }
              if (block.type === 'p') {
                return (
                  <p key={i} className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {block.text}
                  </p>
                );
              }
              if (block.type === 'ul') {
                return (
                  <ul key={i} className="space-y-2 pl-1">
                    {block.items?.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm sm:text-base text-gray-400">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === 'ol') {
                return (
                  <ol key={i} className="space-y-2 pl-1">
                    {block.items?.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm sm:text-base text-gray-400">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white mt-0.5" style={{ backgroundColor: accent }}>
                          {j + 1}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                );
              }
              if (block.type === 'highlight') {
                return (
                  <div key={i} className="rounded-xl p-4 sm:p-5 border-l-4 bg-white/5" style={{ borderColor: accent }}>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{block.text}</p>
                  </div>
                );
              }
              if (block.type === 'table' && block.headers && block.rows) {
                return (
                  <div key={i} className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-white/10">
                          {block.headers.map((h, j) => (
                            <th key={j} className="text-left px-4 py-3 text-white font-semibold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows.map((row, j) => (
                          <tr key={j} className={j % 2 === 0 ? 'bg-white/3' : 'bg-white/5'}>
                            {row.map((cell, k) => (
                              <td key={k} className="px-4 py-3 text-gray-400">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
