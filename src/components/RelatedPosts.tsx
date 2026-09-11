import { Link } from 'react-router-dom';
import { Insight } from '../data';
import { IcArrowRight } from '../lib';

interface RelatedPostsProps {
  currentPost: Insight;
  allPosts: Insight[];
  maxPosts?: number;
}

export function RelatedPosts({ currentPost, allPosts, maxPosts = 3 }: RelatedPostsProps) {
  // Find related posts based on tags
  const relatedPosts = allPosts
    .filter(post => post.id !== currentPost.id)
    .map(post => {
      // Calculate relevance score based on tag matches
      const score = post.tag === currentPost.tag ? 1 : 0;
      
      return {
        post,
        score,
      };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxPosts)
    .map(item => item.post);

  // If not enough related posts by tags, add recent posts
  if (relatedPosts.length < maxPosts) {
    const recentPosts = allPosts
      .filter(post => post.id !== currentPost.id && !relatedPosts.includes(post))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, maxPosts - relatedPosts.length);
    
    relatedPosts.push(...recentPosts);
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 pt-16 border-t border-line">
      <h3 className="font-display text-2xl font-bold text-ink mb-8">
        Related Articles
      </h3>
      
      <div className="grid gap-6 md:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="group card overflow-hidden hover:shadow-lift transition-all duration-300"
          >
            {/* Cover Image */}
            <div className="aspect-video overflow-hidden">
              <img
                src={post.cover}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-semibold text-gold uppercase tracking-wider">
                  {post.tag}
                </span>
              </div>

              {/* Title */}
              <h4 className="font-display text-lg font-bold text-ink mb-2 line-clamp-2 group-hover:text-pine transition-colors">
                {post.title}
              </h4>

              {/* Excerpt */}
              <p className="text-sm text-slate line-clamp-2 mb-4">
                {post.excerpt}
              </p>

              {/* Read More */}
              <div className="flex items-center gap-2 text-pine font-semibold text-sm">
                <span>Read More</span>
                <IcArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
