import { useEffect, useState } from 'react';
import { IcClose, IcZoomIn, IcZoomOut } from '../lib';

interface ImageLightboxProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageLightbox({ src, alt, isOpen, onClose }: ImageLightboxProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      } else if (e.key === '0') {
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleZoomOut();
          }}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          aria-label="Zoom out"
        >
          <IcZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleZoomIn();
          }}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          aria-label="Zoom in"
        >
          <IcZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleReset();
          }}
          className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm transition-colors"
          aria-label="Reset zoom"
        >
          Reset
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          aria-label="Close"
        >
          <IcClose className="w-5 h-5" />
        </button>
      </div>

      {/* Image */}
      <div
        className="max-w-[90vw] max-h-[90vh] cursor-move"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          transition: isDragging ? 'none' : 'transform 0.2s ease-out',
        }}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain"
          draggable={false}
        />
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {scale > 1 ? 'Drag to pan • Scroll to zoom • Press 0 to reset' : 'Click and drag to pan • Use controls to zoom'}
      </div>
    </div>
  );
}
