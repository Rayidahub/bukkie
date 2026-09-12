import { useState, useMemo } from 'react';
import { useContent } from '../store';
import { Link } from 'react-router-dom';
import { IcSearch, IcClose } from '../lib';

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const { projects, articles, services } = useContent();

  const results = useMemo(() => {
    if (!query.trim()) return { projects: [], articles: [], services: [] };

    const q = query.toLowerCase();
    
    const projectResults = projects.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.org.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q) ||
      p.study.objective.toLowerCase().includes(q)
    ).slice(0, 5);

    const articleResults = articles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.tag.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.body.some(p => p.toLowerCase().includes(q))
    ).slice(0, 5);

    const serviceResults = services.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q))
    ).slice(0, 5);

    return { projects: projectResults, articles: articleResults, services: serviceResults };
  }, [query, projects, articles, services]);

  const hasResults = results.projects.length > 0 || results.articles.length > 0 || results.services.length > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="container-x pt-20" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto max-w-3xl rounded-2xl bg-white shadow-2xl">
          {/* Search Input */}
          <div className="flex items-center gap-4 border-b border-line p-6">
            <IcSearch className="h-6 w-6 text-slate" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, blog posts, services..."
              className="flex-1 text-lg outline-none placeholder:text-slate/50"
              autoFocus
            />
            <button onClick={onClose} className="text-slate hover:text-ink transition-colors">
              <IcClose className="h-6 w-6" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto p-6">
            {!query.trim() && (
              <div className="text-center py-12 text-slate">
                <IcSearch className="mx-auto h-12 w-12 mb-4 opacity-30" />
                <p>Start typing to search...</p>
              </div>
            )}

            {query.trim() && !hasResults && (
              <div className="text-center py-12 text-slate">
                <p className="text-lg">No results found for "{query}"</p>
                <p className="text-sm mt-2">Try different keywords</p>
              </div>
            )}

            {hasResults && (
              <div className="space-y-6">
                {/* Projects */}
                {results.projects.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate mb-3">
                      Projects ({results.projects.length})
                    </h3>
                    <div className="space-y-2">
                      {results.projects.map(p => (
                        <Link
                          key={p.id}
                          to="/projects"
                          onClick={onClose}
                          className="block rounded-lg p-4 hover:bg-mist transition-colors"
                        >
                          <div className="font-bold text-ink">{p.title}</div>
                          <div className="text-sm text-slate">{p.org} • {p.cat}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Articles */}
                {results.articles.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate mb-3">
                      Blog Posts ({results.articles.length})
                    </h3>
                    <div className="space-y-2">
                      {results.articles.map(a => (
                        <Link
                          key={a.id}
                          to={`/blog/${a.id}`}
                          onClick={onClose}
                          className="block rounded-lg p-4 hover:bg-mist transition-colors"
                        >
                          <div className="font-bold text-ink">{a.title}</div>
                          <div className="text-sm text-slate">{a.tag} • {a.date}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Services */}
                {results.services.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate mb-3">
                      Services ({results.services.length})
                    </h3>
                    <div className="space-y-2">
                      {results.services.map(s => (
                        <Link
                          key={s.no}
                          to="/services"
                          onClick={onClose}
                          className="block rounded-lg p-4 hover:bg-mist transition-colors"
                        >
                          <div className="font-bold text-ink">{s.title}</div>
                          <div className="text-sm text-slate">{s.kicker}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-slate hover:border-pine hover:text-pine transition-colors"
      aria-label="Search"
    >
      <IcSearch className="h-4 w-4" />
      <span className="hidden sm:inline">Search</span>
      <kbd className="hidden md:inline rounded bg-mist px-2 py-0.5 text-xs">/</kbd>
    </button>
  );
}
