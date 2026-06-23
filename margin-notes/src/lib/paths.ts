import { DEFAULT_LOCALE, type Locale } from '../consts';

// Build a clean URL. The default language has no prefix.
//   href('en', 'recipes')        -> '/recipes/'
//   href('es', 'recipes', 'car') -> '/es/recipes/car/'
export function href(locale: Locale, ...segments: string[]): string {
  const parts = [locale === DEFAULT_LOCALE ? '' : locale, ...segments].filter(Boolean);
  return '/' + parts.join('/') + (parts.length ? '/' : '');
}

// The `slug` param Astro expects for the [...slug] route (no leading slash).
// Returns undefined for the home page so it maps to '/'.
export function slugParam(locale: Locale, ...segments: string[]): string | undefined {
  const parts = [locale === DEFAULT_LOCALE ? '' : locale, ...segments].filter(Boolean);
  return parts.length ? parts.join('/') : undefined;
}
