import { useState, useRef } from 'react';
import { useContent } from '../store';
import { IcUpload, IcClose, IcSpark, IcTrash } from '../lib';

export function GalleryManager() {
  const { projects, setProjects, uploadImage } = useContent();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [skippedFiles, setSkippedFiles] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [showDuplicatesOnly, setShowDuplicatesOnly] = useState(false);
  const [selectedDuplicates, setSelectedDuplicates] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Detect duplicates (images with the same title)
  const galleryImages = projects.filter(p => p.org === 'Gallery');
  const duplicateGroups = galleryImages.reduce((acc, img) => {
    if (!acc[img.title]) {
      acc[img.title] = [];
    }
    acc[img.title].push(img);
    return acc;
  }, {} as Record<string, typeof galleryImages>);

  const duplicates = Object.values(duplicateGroups).filter(group => group.length > 1).flat();
  const hasDuplicates = duplicates.length > 0;

  // Filter to show only duplicates if toggle is on
  const displayImages = showDuplicatesOnly ? duplicates : galleryImages;

  // Toggle duplicate selection
  const toggleDuplicateSelection = (id: string) => {
    const newSelected = new Set(selectedDuplicates);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedDuplicates(newSelected);
  };

  // Select all duplicates
  const selectAllDuplicates = () => {
    if (selectedDuplicates.size === duplicates.length) {
      setSelectedDuplicates(new Set());
    } else {
      setSelectedDuplicates(new Set(duplicates.map(d => d.id)));
    }
  };

  // Delete selected duplicates
  const deleteSelectedDuplicates = async () => {
    if (selectedDuplicates.size === 0) return;

    const confirmed = confirm(
      `Are you sure you want to delete ${selectedDuplicates.size} duplicate image(s)?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    const updatedProjects = projects.filter(p => !selectedDuplicates.has(p.id));
    await setProjects(updatedProjects);
    setSelectedDuplicates(new Set());
    setShowDuplicatesOnly(false);
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setError(null);
    setSkippedFiles([]);
    setUploading(true);
    setUploadProgress(0);

    const newProjects = [...projects];
    const totalFiles = files.length;
    let uploadedCount = 0;
    const skipped: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
      
      // Check for duplicate by name
      const isDuplicate = newProjects.some(
        project => project.org === 'Gallery' && project.title === fileName
      );

      if (isDuplicate) {
        console.log(`Skipping duplicate: ${file.name}`);
        skipped.push(file.name);
        setUploadProgress(((uploadedCount + skipped.length) / totalFiles) * 100);
        continue;
      }
      
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
          title: fileName,
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
        setUploadProgress(((uploadedCount + skipped.length) / totalFiles) * 100);
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

    // Show message if files were skipped
    if (skipped.length > 0) {
      setSkippedFiles(skipped);
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

      {skippedFiles.length > 0 && (
        <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4">
          <p className="text-sm font-semibold text-yellow-800 mb-2">
            {skippedFiles.length} duplicate file(s) skipped:
          </p>
          <ul className="list-disc list-inside text-sm text-yellow-700">
            {skippedFiles.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Gallery Images */}
      {galleryImages.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-ink">
              {showDuplicatesOnly ? 'Duplicate Images' : 'Gallery Images'} ({displayImages.length})
              {hasDuplicates && !showDuplicatesOnly && (
                <span className="ml-2 text-sm font-normal text-orange-600">
                  ({duplicates.length} duplicates found)
                </span>
              )}
            </h3>
            
            <div className="flex items-center gap-3">
              {hasDuplicates && (
                <>
                  <button
                    onClick={() => setShowDuplicatesOnly(!showDuplicatesOnly)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      showDuplicatesOnly
                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                    }`}
                  >
                    {showDuplicatesOnly ? 'Show All' : 'Show Duplicates Only'}
                  </button>
                  
                  {showDuplicatesOnly && (
                    <>
                      <button
                        onClick={selectAllDuplicates}
                        className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                      >
                        {selectedDuplicates.size === duplicates.length ? 'Deselect All' : 'Select All'}
                      </button>
                      
                      {selectedDuplicates.size > 0 && (
                        <button
                          onClick={deleteSelectedDuplicates}
                          className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors"
                        >
                          Delete Selected ({selectedDuplicates.size})
                        </button>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayImages.map((project) => {
              const isDuplicate = duplicates.some(d => d.id === project.id);
              const isSelected = selectedDuplicates.has(project.id);
              
              return (
                <div 
                  key={project.id} 
                  className={`relative group ${
                    isDuplicate && showDuplicatesOnly ? 'ring-2 ring-orange-500' : ''
                  }`}
                >
                  {isDuplicate && showDuplicatesOnly && (
                    <div className="absolute top-2 left-2 z-10">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleDuplicateSelection(project.id)}
                        className="w-5 h-5 rounded border-2 border-white bg-white/90 cursor-pointer"
                      />
                    </div>
                  )}
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
                      {isDuplicate && !showDuplicatesOnly && (
                        <span className="ml-1 text-xs text-orange-600">(duplicate)</span>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
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

      {showDuplicatesOnly && duplicates.length === 0 && galleryImages.length > 0 && (
        <div className="text-center py-12">
          <IcSpark className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <p className="text-lg font-bold text-ink mb-2">No duplicates found!</p>
          <p className="text-sm text-slate">
            All images in your gallery are unique
          </p>
        </div>
      )}
    </div>
  );
}
