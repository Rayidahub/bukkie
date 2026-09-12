import { useState, useMemo } from 'react';
import { IcFilter, IcSortAsc, IcSortDesc } from '../lib';

type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc';

interface ProjectFilterProps<T extends { id: string; title: string; year?: string; cat?: string }> {
  items: T[];
  onFilter: (filtered: T[]) => void;
}

export function ProjectFilter<T extends { id: string; title: string; year?: string; cat?: string }>({ 
  items, 
  onFilter 
}: ProjectFilterProps<T>) {
  const [category, setCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const categories = useMemo(() => {
    const cats = new Set(items.map(item => item.cat).filter(Boolean));
    return ['all', ...Array.from(cats)];
  }, [items]);

  const filteredAndSorted = useMemo(() => {
    let result = [...items];

    // Filter by category
    if (category !== 'all') {
      result = result.filter(item => item.cat === category);
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => (b.year || '').localeCompare(a.year || ''));
        break;
      case 'oldest':
        result.sort((a, b) => (a.year || '').localeCompare(b.year || ''));
        break;
      case 'title-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return result;
  }, [items, category, sortBy]);

  // Update parent component
  useMemo(() => {
    onFilter(filteredAndSorted);
  }, [filteredAndSorted, onFilter]);

  return (
    <div className="flex flex-wrap items-center gap-4 mb-8">
      {/* Category Filter */}
      <div className="flex items-center gap-2">
        <IcFilter className="h-5 w-5 text-slate" />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-line px-4 py-2 text-sm outline-none focus:border-pine transition-colors"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate">Sort by:</span>
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('newest')}
            className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition-colors ${
              sortBy === 'newest' ? 'bg-pine text-white' : 'bg-mist text-slate hover:bg-line'
            }`}
          >
            <IcSortDesc className="h-4 w-4" />
            Newest
          </button>
          <button
            onClick={() => setSortBy('oldest')}
            className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition-colors ${
              sortBy === 'oldest' ? 'bg-pine text-white' : 'bg-mist text-slate hover:bg-line'
            }`}
          >
            <IcSortAsc className="h-4 w-4" />
            Oldest
          </button>
          <button
            onClick={() => setSortBy(sortBy === 'title-asc' ? 'title-desc' : 'title-asc')}
            className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition-colors ${
              sortBy.startsWith('title') ? 'bg-pine text-white' : 'bg-mist text-slate hover:bg-line'
            }`}
          >
            {sortBy === 'title-asc' ? <IcSortAsc className="h-4 w-4" /> : <IcSortDesc className="h-4 w-4" />}
            Title
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="ml-auto text-sm text-slate">
        Showing {filteredAndSorted.length} of {items.length} projects
      </div>
    </div>
  );
}
