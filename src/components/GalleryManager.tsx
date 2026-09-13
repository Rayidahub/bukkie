import { useState, useRef } from 'react';
import { useContent } from '../store';
import { IcUpload, IcClose, IcSpark, IcTrash } from '../lib';

export function GalleryManager() {
  const { projects, setProjects, uploadImage } = useContent();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setError(null);
    setUploading(true);
    setUploadProgress(0);

    const newProjects = [...projects];
    const totalFiles = files.length;
    let uploadedCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError(`File ${file.name} is not an image`);
        continue;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError(`File ${file.name} is too large (max 5MB)`);
        continue;
      }

      try {
        // Upload to Supabase Storage
        const imageUrl = await uploadImage(file, 'gallery');
        
        // Create a new project entry for the image
        newProjects.push({
          id: `gallery-${Date.now()}-${i}`,
          title: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
          org: 'Gallery',
          cat: 'Social Media', // Default category
          year: new Date().getFullYear().toString(),
          img: imageUrl,
          ratio: 'aspect-[4/3]',
          study: {
            type: 'Gallery Image',
            objective: '',
            deliverables: [],
            tools: [],
            impact: '',
          },
        });

        uploadedCount++;
        setUploadProgress((uploadedCount / totalFiles) * 100);
      } catch (error) {
        console.error('Upload error:', error);
        setError(`Failed to upload ${file.name}`);
      }
    }

    // Update projects
    if (uploadedCount > 0) {
      await setProjects(newProjects);
    }

    setUploading(false);
    setUploadProgress(0);
    
    if (uploadedCount > 0) {
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = async (projectId: string) => {
    if (!confirm('Are you sure you want to remove this image from the gallery?')) {
      return;
    }

    const updatedProjects = projects.filter(p => p.id !== projectId);
    await setProjects(updatedProjects);
  };

  const galleryImages = projects.filter(p => p.org === 'Gallery');

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all ${
          dragOver
            ? 'border-pine bg-pine/5'
            : 'border-line bg-mist hover:border-pine hover:bg-pine/5'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInput}
          className="hidden"
        />

        {uploading ? (
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-pine border-t-transparent mx-auto"></div>
            <p className="text-lg font-bold text-ink mb-2">
              Uploading images...
            </p>
            <p className="text-sm text-slate mb-4">
              {Math.round(uploadProgress)}% complete
            </p>
            <div className="w-full max-w-md mx-auto bg-white rounded-full h-2 overflow-hidden">
              <div 
                className="bg-pine h-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <>
            <IcUpload className="mb-4 h-12 w-12 text-pine" />
            <p className="text-lg font-bold text-ink mb-2">
              Drag & drop images here or click to browse
            </p>
            <p className="text-sm text-slate">
              Upload multiple images at once • Max 5MB per file • JPG, PNG, WebP, GIF
            </p>
          </>
        )}
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Gallery Images */}
      {galleryImages.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-ink mb-4">
            Gallery Images ({galleryImages.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((project) => (
              <div key={project.id} className="relative group">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <button
                    onClick={() => removeImage(project.id)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                    aria-label="Remove image"
                  >
                    <IcTrash className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-semibold text-ink truncate">
                    {project.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {galleryImages.length === 0 && !uploading && (
        <div className="text-center py-12">
          <IcSpark className="h-12 w-12 text-slate/40 mx-auto mb-4" />
          <p className="text-lg font-bold text-ink mb-2">No gallery images yet</p>
          <p className="text-sm text-slate">
            Upload images above to add them to the gallery
          </p>
        </div>
      )}
    </div>
  );
}
