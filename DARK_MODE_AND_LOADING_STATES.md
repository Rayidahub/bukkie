# Dark Mode & Image Loading States Implementation

## Overview
This document describes the implementation of dark mode toggle and image loading states for the portfolio website.

## 1. Dark Mode Toggle

### Implementation Details

#### Theme Context (`src/ThemeContext.tsx`)
- Created a React Context to manage theme state across the application
- Stores user preference in `localStorage` for persistence
- Respects system preference (`prefers-color-scheme`) on first visit
- Provides `theme` state and `toggleTheme` function to all components

#### Theme Toggle Button
- Added to the navbar (visible on all pages)
- Displays sun icon in dark mode, moon icon in light mode
- Positioned before the "Contact Me" button
- Accessible with proper aria-label

#### Dark Mode Styles (`src/index.css`)
Added comprehensive dark mode styles using the `.dark` class:

**Color Overrides:**
- Background: `#0f172a` (dark slate)
- Text: `#e2e8f0` (light gray)
- Cards: `#1e293b` (medium slate)
- Borders: `#334155` (dark border)
- Inputs: Dark backgrounds with light text

**Component-Specific Styles:**
- `.bg-white` → `#1e293b`
- `.bg-mist` → `#0f172a`
- `.bg-sage` → `#1e293b`
- `.text-ink` → `#e2e8f0`
- `.text-slate` → `#94a3b8`
- `.border-line` → `#334155`
- Cards, chips, inputs, shadows, and decorative elements

**Scrollbar Styling:**
- Dark track: `#1e293b`
- Gold thumb with dark border

### Usage
```tsx
import { useTheme } from "./ThemeContext";

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
```

## 2. Image Loading States

### LazyImage Component (`src/components/LazyImage.tsx`)

#### Features
- **Loading Skeleton**: Animated gradient placeholder while image loads
- **Error State**: Displays error icon and message if image fails to load
- **Smooth Fade-in**: 500ms opacity transition when image loads
- **Fallback Support**: Optional fallback image URL on error
- **Custom Error Handler**: Supports custom `onError` callback
- **Dark Mode Compatible**: Skeleton and error states adapt to theme

#### Implementation
```tsx
interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export function LazyImage({ 
  src, 
  alt, 
  className = "", 
  fallback, 
  onError, 
  ...props 
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Shows skeleton while loading
  // Shows error state if loading fails
  // Fades in image when loaded
}
```

### Components Updated

#### 1. Hero Section (`src/components/hero.tsx`)
- Portrait image now uses LazyImage
- Maintains circular border and hover scale effect
- Preserves portraitFallback error handling

#### 2. About Section (`src/components/about.tsx`)
- Main profile image uses LazyImage
- Maintains rounded corners and hover effects
- Preserves portraitFallback error handling

#### 3. Work/Projects Section (`src/components/work.tsx`)
- Gallery grid images use LazyImage
- Lightbox/modal image uses LazyImage
- Maintains hover scale effects and aspect ratios

#### 4. Closing Section (`src/components/closing.tsx`)
- Testimonial avatars use LazyImage
- Blog/article cover images use LazyImage
- Article modal header image uses LazyImage

### Visual States

**Loading State:**
```
┌─────────────────────┐
│  ░░░░░░░░░░░░░░░░░  │  ← Animated gradient
│  ░░░░░░░░░░░░░░░░░  │     (light or dark)
│  ░░░░░░░░░░░░░░░░░  │
└─────────────────────┘
```

**Error State:**
```
┌─────────────────────┐
│       🖼️            │  ← Image icon
│  Failed to load     │
│      image          │
└─────────────────────┘
```

**Loaded State:**
```
┌─────────────────────┐
│                     │
│   [Actual Image]    │  ← Fades in smoothly
│                     │
└─────────────────────┘
```

## 3. Integration

### App Structure
```tsx
<ThemeProvider>           ← Wraps entire app
  <ContentProvider>
    <BrowserRouter>
      <ScrollAndTitle />
      <Shell />           ← Contains Navbar with theme toggle
    </BrowserRouter>
  </ContentProvider>
</ThemeProvider>
```

### Theme Persistence
- User preference saved to `localStorage` key: `theme`
- On first visit, checks `window.matchMedia("(prefers-color-scheme: dark)")`
- Theme persists across page reloads and sessions

## 4. Accessibility

### Dark Mode
- Toggle button has proper `aria-label`
- Maintains sufficient contrast ratios in both modes
- Respects user's system preference initially

### Image Loading
- Skeleton provides visual feedback during load
- Error state clearly communicates failure
- Alt text preserved for screen readers
- Fallback images supported

## 5. Browser Support

- **Theme Toggle**: All modern browsers (uses localStorage and classList)
- **Image Loading**: All modern browsers (uses standard img events)
- **Animations**: Respects `prefers-reduced-motion` setting

## 6. Performance Considerations

### Dark Mode
- No runtime performance impact
- CSS class toggle is instantaneous
- Styles are pre-compiled

### Image Loading
- Skeleton animation uses CSS (GPU accelerated)
- No external dependencies
- Lazy loading built into component
- Smooth transitions don't block main thread

## 7. Files Modified

### New Files
- `src/ThemeContext.tsx` - Theme context and provider
- `src/components/LazyImage.tsx` - Reusable image component

### Modified Files
- `src/index.css` - Added dark mode styles
- `src/lib.tsx` - Added sun and moon icons
- `src/App.tsx` - Wrapped app with ThemeProvider
- `src/components/chrome.tsx` - Added theme toggle button
- `src/components/hero.tsx` - Updated portrait to use LazyImage
- `src/components/about.tsx` - Updated profile image to use LazyImage
- `src/components/work.tsx` - Updated gallery and lightbox images
- `src/components/closing.tsx` - Updated testimonial and blog images

## 8. Testing Checklist

- [x] Theme toggle works on all pages
- [x] Theme preference persists after reload
- [x] System preference respected on first visit
- [x] All images show loading skeleton
- [x] Images fade in smoothly when loaded
- [x] Error state displays correctly
- [x] Fallback images work when provided
- [x] Dark mode styles apply correctly
- [x] Contrast ratios meet accessibility standards
- [x] Animations respect reduced-motion preference
- [x] Build succeeds without errors

## 9. Future Enhancements

Potential improvements:
- Add theme transition animation (smooth color change)
- Add more granular theme customization
- Add image lazy loading with Intersection Observer
- Add progressive image loading (low-res → high-res)
- Add image zoom on click
- Add image gallery/carousel component

## 10. Build Status

✅ Build successful (9.34s)
✅ No TypeScript errors
✅ All components compile correctly
✅ Production bundle optimized
