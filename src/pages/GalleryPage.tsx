import { useState } from 'react';
import { useContent } from '../store';
import { IcClose, IcSpark, IcArrowLeft } from '../lib';
import { Link } from 'react-router-dom';

export default function GalleryPage() {
  const { projects } = useContent();
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [filter, setFilter] = useState<string>('all');

  // Collect all images from all projects
  const allImages = projects
    .filter(project => project.img)
    .map(project => ({
      src: project.img,
      alt: `${project.title} - ${project.org}`,
      category: project.cat,
      title: project.title,
      org: project.org,
    }));

  // Filter images by category
  const filteredImages = filter === 'all' 
    ? allImages 
    : allImages.filter(img => img.category === filter);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(allImages.map(img => img.category)))];

  return (
    <div className="min-h-screen bg-mist">
      {/* Header */}
      <div className="bg-pine text-white py-12 md:py-16">
        <div className="container-x">
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4"
          >
            <IcArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Project Gallery
          </h1>
          <p className="text-white/70 text-lg">
            {allImages.length} {allImages.length === 1 ? 'image' : 'images'} from {projects.length} projects
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b border-line sticky top-0 z-10">
        <div className="container-x py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === cat
                    ? 'bg-pine text-white'
                    : 'bg-mist text-slate hover:bg-line'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
                <span className="ml-2 text-xs opacity-70">
                  ({cat === 'all' ? allImages.length : allImages.filter(img => img.category === cat).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container-x py-8">
        {filteredImages.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white mx-auto">
              <IcSpark className="h-10 w-10 text-slate/40" />
            </div>
            <h3 className="text-xl font-bold text-ink mb-2">No images found</h3>
            <p className="text-slate">
              {filter === 'all' 
                ? 'Add some projects with images to see them here'
                : `No images in the "${filter}" category`}
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => setSelectedImage({ src: image.src, alt: image.alt })}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white border border-line transition-all duration-300 hover:border-gold/50 hover:shadow-2xl hover:shadow-gold/20">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <IcSpark className="h-4 w-4 text-gold" />
                        <span className="text-xs font-bold uppercase tracking-wider text-gold">
                          {image.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        {image.title}
                      </h3>
                      <p className="text-sm text-white/70">
                        {image.org}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close image"
          >
            <IcClose className="h-6 w-6" />
          </button>
          
          <div className="max-w-7xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[90vh] object-contain rounded-2xl"
            />
            <div className="mt-4 text-center">
              <p className="text-white/80 text-sm">{selectedImage.alt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
