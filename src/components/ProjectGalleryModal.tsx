import { useState } from 'react';
import { useContent } from '../store';
import { IcClose, IcSpark } from '../lib';

interface ProjectGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectGalleryModal({ isOpen, onClose }: ProjectGalleryModalProps) {
  const { projects } = useContent();
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  if (!isOpen) return null;

  // Collect all images from all projects
  const allImages = projects
    .filter(project => project.img)
    .map(project => ({
      src: project.img,
      alt: `${project.title} - ${project.org}`,
      category: project.cat,
      title: project.title,
    }));

  return (
    <>
      <div
        className="fixed inset-0 z-[9998] bg-black/90 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      >
        <div className="container-x h-full overflow-y-auto py-12" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="sticky top-0 z-10 mb-8 flex items-center justify-between bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-2">
                Project Gallery
              </h2>
              <p className="text-white/60 text-sm">
                {allImages.length} {allImages.length === 1 ? 'image' : 'images'} from {projects.length} projects
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close gallery"
            >
              <IcClose className="h-6 w-6" />
            </button>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {allImages.map((image, index) => (
              <div
                key={index}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => setSelectedImage({ src: image.src, alt: image.alt })}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:border-gold/50 hover:shadow-2xl hover:shadow-gold/20">
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
                        {image.alt.split(' - ')[1]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {allImages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
                <IcSpark className="h-10 w-10 text-white/40" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No images yet</h3>
              <p className="text-white/60">
                Add some projects with images to see them here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox for selected image */}
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
    </>
  );
}
