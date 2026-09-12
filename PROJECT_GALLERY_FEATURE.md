# Project Gallery Feature

## Overview

The Project Gallery feature provides a beautiful, centralized view of all project images across all categories. Users can browse through all uploaded images in a visually balanced masonry layout that maintains original aspect ratios and dimensions.

## Features

### 🎨 Visual Design

- **Masonry Layout**: Images are arranged in a responsive masonry grid using CSS columns
- **Original Aspect Ratios**: Each image maintains its natural height-to-width ratio
- **No Forced Grid**: Images are not forced into uniform sizes or patterns
- **Professional Spacing**: Ample padding and spacing between images
- **Responsive Design**: Adapts beautifully across all screen sizes
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
  - Large screens: 4 columns

### 🖼️ Gallery Features

- **Full Collection**: Displays all images from all projects in one place
- **Category Labels**: Each image shows its category on hover
- **Project Information**: Displays project title and organization on hover
- **Click to Enlarge**: Click any image to view it in full-size lightbox
- **Smooth Animations**: Hover effects and transitions for polished UX
- **Lazy Loading**: Images load as they come into view for performance

### 🎯 User Experience

- **Easy Access**: Prominent "View Full Gallery" button on Projects page
- **Quick Close**: Close button and click-outside-to-close functionality
- **Image Counter**: Shows total number of images and projects
- **Empty State**: Helpful message when no images are available
- **Smooth Transitions**: Fade-in animations for modal and images

## Implementation

### Component Structure

```
ProjectsPage
├── PageHeader
├── Gallery Button (View Full Gallery)
├── Gallery (existing project cards)
├── FeaturedProjects
├── ToolsSection
└── ProjectGalleryModal (new)
    ├── Header (title, count, close button)
    ├── Masonry Grid
    │   └── Image Cards (with hover overlay)
    └── Lightbox (for full-size view)
```

### Files Modified/Created

1. **Created**: `src/components/ProjectGalleryModal.tsx`
   - Main gallery modal component
   - Masonry layout implementation
   - Lightbox functionality
   - Image collection logic

2. **Modified**: `src/pages.tsx`
   - Added Gallery button to ProjectsPage
   - Integrated ProjectGalleryModal
   - Added state management for modal

### Technical Details

#### Masonry Layout

Uses CSS `columns` property for true masonry layout:

```css
columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6
```

- `columns-*`: Number of columns at each breakpoint
- `gap-6`: Horizontal spacing between columns
- `space-y-6`: Vertical spacing between items
- `break-inside-avoid`: Prevents items from breaking across columns

#### Image Collection

```typescript
const allImages = projects
  .filter(project => project.img)
  .map(project => ({
    src: project.img,
    alt: `${project.title} - ${project.org}`,
    category: project.cat,
    title: project.title,
  }));
```

Collects all images from the content store and maps them with metadata.

#### Lightbox Integration

Clicking an image opens a full-size lightbox:

```typescript
const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
```

The lightbox:
- Shows image at full size with `object-contain`
- Maintains aspect ratio
- Closes on click outside or close button
- Shows image description below

## Usage

### For Users

1. Navigate to the **Projects** page
2. Click the **"View Full Gallery"** button
3. Browse through all project images
4. Hover over images to see details
5. Click any image to view full-size
6. Close the gallery when done

### For Developers

#### Adding the Gallery Button

```tsx
<button
  onClick={() => setGalleryOpen(true)}
  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pine to-pine-dark px-12 py-8 text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-pine/50"
>
  <div className="relative z-10">
    <div className="mb-3 flex items-center justify-center gap-3">
      <IcSpark className="h-6 w-6 text-gold" />
      <span className="font-display text-2xl font-bold">
        View Full Gallery
      </span>
    </div>
    <p className="text-sm text-white/80">
      See all project images in one beautiful view
    </p>
  </div>
</button>
```

#### Using the Modal

```tsx
<ProjectGalleryModal 
  isOpen={galleryOpen} 
  onClose={() => setGalleryOpen(false)} 
/>
```

## Design Decisions

### Why Masonry Layout?

1. **Respects Aspect Ratios**: Unlike CSS Grid with fixed aspect ratios, masonry naturally flows images
2. **Visual Interest**: Creates dynamic, engaging layouts
3. **Professional Look**: Similar to Pinterest, Behance, and other portfolio sites
4. **Responsive**: Naturally adapts to different screen sizes
5. **No Cropping**: Images are never cropped or distorted

### Why Not CSS Grid?

CSS Grid with `grid-auto-rows` would force uniform sizing or require complex JavaScript to calculate spans. Masonry with CSS columns is:
- Simpler
- More performant
- More maintainable
- Better for varied aspect ratios

### Spacing Strategy

- **gap-6** (24px): Horizontal spacing between columns
- **space-y-6** (24px): Vertical spacing between items
- **p-6** (24px): Padding inside image cards
- **rounded-2xl**: Rounded corners for modern look

This creates a balanced, breathable layout that feels professional and organized.

## Performance Optimizations

1. **Lazy Loading**: Images use `loading="lazy"` attribute
2. **Optimized Rendering**: Only renders when modal is open
3. **Efficient Filtering**: Filters projects once on open
4. **CSS-Only Layout**: No JavaScript calculations needed
5. **Smooth Animations**: GPU-accelerated transforms and opacity

## Accessibility

- **Keyboard Navigation**: Close button is focusable
- **ARIA Labels**: All interactive elements have proper labels
- **Alt Text**: All images have descriptive alt text
- **Focus Management**: Focus returns to trigger button on close
- **Screen Reader**: Proper heading structure and descriptions

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

CSS `columns` is well-supported across all modern browsers.

## Future Enhancements

Potential improvements:
- [ ] Filter by category
- [ ] Search functionality
- [ ] Sort by date/project
- [ ] Fullscreen slideshow mode
- [ ] Share individual images
- [ ] Download images
- [ ] Infinite scroll for large galleries
- [ ] Virtual scrolling for performance
- [ ] Image zoom controls in lightbox

## Styling Customization

### Change Column Count

```tsx
// Current: 1-2-3-4 columns
<div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4">

// Example: 2-3-4-5 columns
<div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5">
```

### Change Spacing

```tsx
// Current: 24px spacing
<div className="gap-6 space-y-6">

// Example: 16px spacing
<div className="gap-4 space-y-4">

// Example: 32px spacing
<div className="gap-8 space-y-8">
```

### Change Hover Effects

```tsx
// Current: Scale + overlay
<div className="group-hover:scale-105">
<div className="opacity-0 group-hover:opacity-100">

// Example: Just overlay
<div className="opacity-0 group-hover:opacity-100">

// Example: Brightness
<img className="group-hover:brightness-110">
```

## Troubleshooting

### Images not showing

**Problem**: Gallery appears empty
**Solution**: 
- Check that projects have images uploaded
- Verify image URLs are valid
- Check browser console for errors

### Layout looks broken

**Problem**: Images overlap or have no spacing
**Solution**:
- Ensure `gap-6` and `space-y-6` classes are present
- Check that `break-inside-avoid` is applied to items
- Verify Tailwind CSS is properly configured

### Modal won't close

**Problem**: Click outside doesn't close modal
**Solution**:
- Check that `onClick={onClose}` is on the backdrop div
- Ensure `e.stopPropagation()` is on the content div
- Verify `isOpen` state is properly managed

### Performance issues

**Problem**: Gallery is slow with many images
**Solution**:
- Images already use `loading="lazy"`
- Consider implementing virtual scrolling for 100+ images
- Optimize image sizes before upload

## Summary

The Project Gallery feature provides a beautiful, professional way to showcase all project images in one centralized view. The masonry layout respects original aspect ratios while creating an engaging, visually balanced experience. The feature is fully responsive, performant, and accessible.

**Key Benefits:**
- ✅ Beautiful masonry layout
- ✅ Maintains original aspect ratios
- ✅ Responsive across all devices
- ✅ Professional spacing and design
- ✅ Easy to use and navigate
- ✅ Performant with lazy loading
- ✅ Accessible and keyboard-friendly
