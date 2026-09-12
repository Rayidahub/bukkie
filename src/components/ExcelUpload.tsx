import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { IcUpload, IcDownload, IcClose, IcCheck, IcAlertCircle } from '../lib';
import { uid } from '../store';
import type { GalleryItem, GalleryCat } from '../data';

interface ExcelUploadProps {
  onImport: (projects: GalleryItem[]) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface ExcelRow {
  title: string;
  org: string;
  category: string;
  year: string;
  image?: string;
  type?: string;
  objective?: string;
  deliverables?: string;
  tools?: string;
  impact?: string;
}

interface ValidationError {
  row: number;
  field: string;
  message: string;
}

export function ExcelUpload({ onImport, isOpen, onClose }: ExcelUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<GalleryItem[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const CATEGORIES = ['Social Media', 'Print Design', 'Branding', 'Video & Motion', 'Church Design'];

  const handleFile = (file: File) => {
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      setErrors([{ row: 0, field: 'file', message: 'Please upload an Excel file (.xlsx or .xls)' }]);
      return;
    }

    setFileName(file.name);
    setErrors([]);
    setPreview([]);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet) as ExcelRow[];

        if (jsonData.length === 0) {
          setErrors([{ row: 0, field: 'file', message: 'The Excel file is empty' }]);
          return;
        }

        // Validate and convert data
        const validationErrors: ValidationError[] = [];
        const projects: GalleryItem[] = [];

        jsonData.forEach((row, index) => {
          const rowNum = index + 2; // +2 because Excel row 1 is header

          // Validate required fields
          if (!row.title || row.title.trim() === '') {
            validationErrors.push({ row: rowNum, field: 'title', message: 'Title is required' });
          }
          if (!row.org || row.org.trim() === '') {
            validationErrors.push({ row: rowNum, field: 'org', message: 'Organization is required' });
          }
          if (!row.category || row.category.trim() === '') {
            validationErrors.push({ row: rowNum, field: 'category', message: 'Category is required' });
          } else if (!CATEGORIES.includes(row.category)) {
            validationErrors.push({ 
              row: rowNum, 
              field: 'category', 
              message: `Invalid category. Must be one of: ${CATEGORIES.join(', ')}` 
            });
          }
          if (!row.year || row.year.toString().trim() === '') {
            validationErrors.push({ row: rowNum, field: 'year', message: 'Year is required' });
          }

          // Convert to GalleryItem if no errors for this row
          if (row.title && row.org && row.category && row.year) {
            const project: GalleryItem = {
              id: uid(),
              title: row.title.trim(),
              org: row.org.trim(),
              cat: row.category as GalleryCat,
              year: row.year.toString().trim(),
              img: row.image || '',
              ratio: 'aspect-[4/3]',
              study: {
                type: row.type || row.category,
                objective: row.objective || '',
                deliverables: row.deliverables 
                  ? row.deliverables.split('\n').map(d => d.trim()).filter(d => d)
                  : [],
                tools: row.tools 
                  ? row.tools.split(',').map(t => t.trim()).filter(t => t)
                  : [],
                impact: row.impact || '',
              },
            };
            projects.push(project);
          }
        });

        setErrors(validationErrors);
        setPreview(projects);
      } catch (error) {
        setErrors([{ row: 0, field: 'file', message: 'Failed to parse Excel file. Please check the format.' }]);
      }
    };

    reader.onerror = () => {
      setErrors([{ row: 0, field: 'file', message: 'Failed to read file' }]);
    };

    reader.readAsArrayBuffer(file);
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

  const handleImport = () => {
    if (preview.length > 0) {
      onImport(preview);
      onClose();
    }
  };

  const downloadTemplate = () => {
    const template = [
      {
        title: 'Project Title',
        org: 'Organization Name',
        category: 'Social Media',
        year: '2024',
        image: 'https://example.com/image.jpg (optional)',
        type: 'Campaign',
        objective: 'Project objective or description',
        deliverables: 'Deliverable 1\nDeliverable 2\nDeliverable 3',
        tools: 'Photoshop, Canva, Illustrator',
        impact: 'Project impact or results',
      },
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Projects');
    XLSX.writeFile(wb, 'project-import-template.xlsx');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="relative mx-4 max-w-4xl w-full bg-white rounded-2xl shadow-2xl animate-pop-in max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-line p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-ink">Import Projects from Excel</h2>
              <p className="text-sm text-slate mt-1">Upload an Excel file with multiple projects</p>
            </div>
            <button onClick={onClose} className="text-slate hover:text-ink transition-colors" aria-label="Close">
              <IcClose className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Format Instructions */}
          <div className="bg-mist rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-3 flex items-center gap-2">
              <IcAlertCircle className="h-5 w-5 text-pine" />
              Excel File Format
            </h3>
            <p className="text-sm text-slate mb-4">
              Your Excel file must have the following columns (first row should be headers):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-semibold text-ink mb-2">Required Columns:</p>
                <ul className="space-y-1 text-slate">
                  <li><code className="bg-white px-2 py-0.5 rounded text-xs">title</code> - Project title</li>
                  <li><code className="bg-white px-2 py-0.5 rounded text-xs">org</code> - Organization name</li>
                  <li><code className="bg-white px-2 py-0.5 rounded text-xs">category</code> - Must be one of: {CATEGORIES.join(', ')}</li>
                  <li><code className="bg-white px-2 py-0.5 rounded text-xs">year</code> - Project year</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-ink mb-2">Optional Columns:</p>
                <ul className="space-y-1 text-slate">
                  <li><code className="bg-white px-2 py-0.5 rounded text-xs">image</code> - Image URL</li>
                  <li><code className="bg-white px-2 py-0.5 rounded text-xs">type</code> - Project type</li>
                  <li><code className="bg-white px-2 py-0.5 rounded text-xs">objective</code> - Project objective</li>
                  <li><code className="bg-white px-2 py-0.5 rounded text-xs">deliverables</code> - One per line</li>
                  <li><code className="bg-white px-2 py-0.5 rounded text-xs">tools</code> - Comma-separated</li>
                  <li><code className="bg-white px-2 py-0.5 rounded text-xs">impact</code> - Project impact</li>
                </ul>
              </div>
            </div>
            <button
              onClick={downloadTemplate}
              className="mt-4 btn btn-outline !py-2 !px-4 text-sm"
            >
              <IcDownload className="h-4 w-4" />
              Download Template
            </button>
          </div>

          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all ${
              isDragging
                ? 'border-pine bg-pine/5'
                : 'border-line bg-mist hover:border-pine hover:bg-pine/5'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileInput}
              className="hidden"
            />
            
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pine/10">
              <IcUpload className="h-8 w-8 text-pine" />
            </div>
            
            <p className="mb-2 text-lg font-bold text-ink">
              {fileName || 'Click to upload or drag and drop'}
            </p>
            <p className="text-sm text-slate">
              Excel files only (.xlsx, .xls)
            </p>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                <IcAlertCircle className="h-5 w-5" />
                Validation Errors
              </h3>
              <ul className="space-y-1 text-sm text-red-800">
                {errors.map((error, index) => (
                  <li key={index}>
                    {error.row > 0 && <span className="font-semibold">Row {error.row}: </span>}
                    {error.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Preview */}
          {preview.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                <IcCheck className="h-5 w-5" />
                Preview: {preview.length} {preview.length === 1 ? 'project' : 'projects'} ready to import
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {preview.map((project, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 border border-green-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-ink">{project.title}</p>
                        <p className="text-sm text-slate">{project.org} • {project.cat} • {project.year}</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Ready
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-line p-6 rounded-b-2xl flex items-center justify-end gap-3">
          <button onClick={onClose} className="btn btn-outline !py-2.5">
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={preview.length === 0}
            className="btn btn-pine !py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IcCheck className="h-4 w-4" />
            Import {preview.length} {preview.length === 1 ? 'Project' : 'Projects'}
          </button>
        </div>
      </div>
    </div>
  );
}
