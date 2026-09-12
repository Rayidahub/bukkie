import { useState, useRef } from 'react';
import { IcUpload, IcClose } from '../lib';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  accept?: string;
  maxSize?: number; // in MB
}

export function ImageUpload({ 
  label, 
  value, 
  onChange, 
  accept = "image/jpeg,image/png,image/webp,image/gif",
  maxSize = 5 // 5MB default
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError(null);

    // Validate file type
    if (!file.type.match(/^image\/(jpeg|png|webp|gif)$/)) {
      setError('Please upload a valid image file (JPEG, PNG, WebP, or GIF)');
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Convert to data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
    };
    reader.onerror = () => {
      setError('Failed to read file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = () => {
    onChange('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate">
        {label}
      </label>
      
      {!value ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all ${
            isDragging
              ? 'border-pine bg-pine/5'
              : 'border-line bg-mist hover:border-pine hover:bg-pine/5'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileInput}
            className="hidden"
          />
          
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-pine/10">
            <IcUpload className="h-6 w-6 text-pine" />
          </div>
          
          <p className="mb-1 text-sm font-bold text-ink">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-slate">
            PNG, JPG, WebP, or GIF (max {maxSize}MB)
          </p>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-xl border border-line">
          <img
            src={value}
            alt="Preview"
            className="h-[200px] w-full object-cover"
          />
          <button
            onClick={handleRemove}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
            aria-label="Remove image"
          >
            <IcClose className="h-4 w-4" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <p className="text-xs font-medium text-white">
              Image uploaded successfully
            </p>
          </div>
        </div>
      )}
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
