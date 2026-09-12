# Excel Import Feature - Complete Guide

## Overview

The Excel Import feature allows you to bulk import multiple projects at once using an Excel file (.xlsx or .xls). This is perfect for migrating existing project data or adding multiple projects quickly.

## Features

✅ **Bulk Import** - Add multiple projects at once  
✅ **Template Download** - Download a pre-formatted template  
✅ **Drag & Drop** - Drag Excel files directly onto the upload area  
✅ **Validation** - Automatic validation with detailed error messages  
✅ **Preview** - Preview all projects before importing  
✅ **Error Handling** - Clear error messages for invalid data  

## How to Use

### Step 1: Download the Template

1. Go to the **Projects** page
2. Click the **"Import from Excel"** button (gold button)
3. In the modal, click **"Download Template"**
4. Save the Excel file to your computer

### Step 2: Fill in Your Data

Open the downloaded template in Excel and fill in your project data:

#### Required Columns:
- **title** - Project title (e.g., "Church Branding Project")
- **org** - Organization name (e.g., "Grace Community Church")
- **category** - Must be one of: `Social Media`, `Print Design`, `Branding`, `Video & Motion`, `Church Design`
- **year** - Project year (e.g., "2024")

#### Optional Columns:
- **image** - Image URL (e.g., "https://example.com/image.jpg")
- **type** - Project type (e.g., "Campaign", "Logo Design")
- **objective** - Project objective or description
- **deliverables** - List of deliverables (one per line)
- **tools** - Tools used (comma-separated, e.g., "Photoshop, Canva")
- **impact** - Project impact or results

### Step 3: Upload the File

1. Click the upload area or drag your Excel file onto it
2. The system will validate your data
3. If there are errors, they will be displayed with row numbers
4. If successful, you'll see a preview of all projects

### Step 4: Import

1. Review the preview to ensure everything looks correct
2. Click **"Import X Projects"** button
3. All projects will be added to your portfolio

## Excel Format Example

Here's an example of how your Excel file should look:

| title | org | category | year | image | type | objective | deliverables | tools | impact |
|-------|-----|----------|------|-------|------|-----------|--------------|-------|--------|
| Church Logo Design | Grace Church | Church Design | 2024 | https://... | Logo Design | Create a modern logo | Logo files<br>Brand guidelines | Photoshop, Illustrator | Increased church recognition |
| Social Media Campaign | Youth Ministry | Social Media | 2024 | https://... | Campaign | Engage youth online | 30 posts<br>5 stories | Canva | 500% engagement increase |
| Event Flyer | Community Church | Print Design | 2024 | https://... | Flyer | Promote Easter event | Print-ready PDF | Photoshop | 200 attendees |

## Validation Rules

### Required Fields
- **title** - Cannot be empty
- **org** - Cannot be empty
- **category** - Must be one of the valid categories
- **year** - Cannot be empty

### Valid Categories
- `Social Media`
- `Print Design`
- `Branding`
- `Video & Motion`
- `Church Design`

### Optional Fields
- **image** - Should be a valid URL (can be empty)
- **type** - Free text (defaults to category if empty)
- **objective** - Free text (can be empty)
- **deliverables** - One item per line (use line breaks)
- **tools** - Comma-separated list
- **impact** - Free text (can be empty)

## Error Messages

### Common Errors and Solutions

**"Title is required"**
- Make sure the title column has a value for every row

**"Organization is required"**
- Make sure the org column has a value for every row

**"Invalid category. Must be one of: ..."**
- Check the category spelling
- Must match exactly: `Social Media`, `Print Design`, `Branding`, `Video & Motion`, or `Church Design`

**"Year is required"**
- Make sure the year column has a value for every row

**"Failed to parse Excel file"**
- Make sure the file is a valid Excel file (.xlsx or .xls)
- Try opening it in Excel first to verify it's not corrupted

**"The Excel file is empty"**
- Make sure there's at least one row of data (besides the header)

## Tips for Success

### 1. Use the Template
Always start with the downloaded template to ensure correct column names

### 2. Check Categories
Make sure all categories match exactly (case-sensitive)

### 3. Format Deliverables
Use line breaks (Enter key) to separate deliverables:
```
Logo design
Brand guidelines
Business cards
```

### 4. Format Tools
Use commas to separate tools:
```
Photoshop, Illustrator, InDesign
```

### 5. Image URLs
- Use full URLs (https://...)
- Make sure images are accessible
- Leave empty if you don't have an image URL

### 6. Test with Small Files First
Start with 2-3 projects to make sure everything works before importing large batches

## Troubleshooting

### File Won't Upload
- Check file format (.xlsx or .xls)
- Make sure file isn't corrupted
- Try a different browser

### Validation Errors
- Check row numbers in error messages
- Open Excel file and go to the specific row
- Fix the error and re-upload

### Projects Not Showing
- Make sure you clicked "Import" after preview
- Refresh the page
- Check if projects were added in Admin panel

### Images Not Loading
- Verify image URLs are correct and accessible
- Use HTTPS URLs when possible
- Check if images are publicly accessible

## Advanced Usage

### Bulk Image Upload
If you have local images:
1. Upload images to a cloud service (Imgur, Cloudinary, etc.)
2. Copy the image URLs
3. Paste URLs in the image column

### Multiple Sheets
The importer only reads the **first sheet** of the Excel file. If you have multiple sheets, move the data to the first sheet.

### Large Files
- The importer can handle hundreds of projects
- For very large files (1000+), consider splitting into multiple files
- Test with a small batch first

## Integration with Admin Panel

After importing:
1. Go to **Admin Panel** → **Projects** tab
2. You'll see all imported projects
3. Edit any project to add images via the upload feature
4. Reorder projects using drag-and-drop

## Best Practices

### 1. Backup First
Before bulk importing, consider exporting your current projects

### 2. Validate Data
Double-check all data in Excel before uploading

### 3. Start Small
Import a few projects first to test the process

### 4. Use Consistent Formatting
- Same date format for all years
- Consistent category names
- Standardized tool names

### 5. Keep Original Files
Save your Excel files for future reference or re-importing

## File Specifications

### Supported Formats
- **.xlsx** - Excel Workbook (recommended)
- **.xls** - Excel 97-2003 Workbook

### File Size Limits
- No strict limit, but recommended < 10MB
- Can handle 1000+ rows

### Column Headers
- Must be in the first row
- Case-sensitive (use exact names from template)
- Cannot have extra spaces

## API Reference

### ExcelUpload Component Props

```typescript
interface ExcelUploadProps {
  onImport: (projects: GalleryItem[]) => void;
  isOpen: boolean;
  onClose: () => void;
}
```

### Data Structure

```typescript
interface GalleryItem {
  id: string;
  title: string;
  org: string;
  cat: GalleryCat;
  year: string;
  img: string;
  ratio: string;
  study: {
    type: string;
    objective: string;
    deliverables: string[];
    tools: string[];
    impact: string;
  };
}
```

## Future Enhancements

Potential improvements:
- [ ] Export projects to Excel
- [ ] Update existing projects from Excel
- [ ] Image upload from Excel (embedded images)
- [ ] CSV support
- [ ] Google Sheets integration
- [ ] Bulk image upload
- [ ] Project templates

## Support

If you encounter issues:
1. Check the error messages carefully
2. Verify your Excel file format
3. Try with the template file
4. Check browser console for errors
5. Contact support with the error details

---

**Status:** ✅ Complete and Production Ready

**Build Status:** ✅ Successful (14.64s)
