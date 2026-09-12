import { useState, useMemo } from 'react';

interface BlogTagFilterProps {
  tags: string[];
  selectedTag: string;
  onTagChange: (tag: string) => void;
}

export function BlogTagFilter({ tags, selectedTag, onTagChange }: BlogTagFilterProps) {
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    tags.forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
    return counts;
  }, [tags]);

  const uniqueTags = useMemo(() => {
    return Object.keys(tagCounts).sort();
  }, [tagCounts]);

  return (
    <div className="mb-8">
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate mb-4">
        Filter by Category
      </h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTagChange('all')}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            selectedTag === 'all'
              ? 'bg-pine text-white'
              : 'bg-mist text-slate hover:bg-line'
          }`}
        >
          All ({tags.length})
        </button>
        {uniqueTags.map(tag => (
          <button
            key={tag}
            onClick={() => onTagChange(tag)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              selectedTag === tag
                ? 'bg-pine text-white'
                : 'bg-mist text-slate hover:bg-line'
            }`}
          >
            {tag} ({tagCounts[tag]})
          </button>
        ))}
      </div>
    </div>
  );
}
