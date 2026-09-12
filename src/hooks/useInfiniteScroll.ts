import { useEffect, useRef, useState } from 'react';

export function useInfiniteScroll<T>(
  items: T[],
  itemsPerPage: number = 10
) {
  const [displayedItems, setDisplayedItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Reset when items change
  useEffect(() => {
    setDisplayedItems(items.slice(0, itemsPerPage));
    setPage(1);
    setHasMore(items.length > itemsPerPage);
  }, [items, itemsPerPage]);

  // Load more items
  const loadMore = () => {
    const nextPage = page + 1;
    const endIndex = nextPage * itemsPerPage;
    const newItems = items.slice(0, endIndex);
    
    setDisplayedItems(newItems);
    setPage(nextPage);
    setHasMore(endIndex < items.length);
  };

  // Setup intersection observer
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, page]);

  return {
    displayedItems,
    hasMore,
    loadMoreRef,
    loadMore,
  };
}
