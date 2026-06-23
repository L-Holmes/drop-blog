// ── Site-wide settings ────────────────────────────────────────────────
// This is the only file you normally touch to change the site's shape.

export const SITE = { name: 'Margin Notes' };

// Languages. The first one is the default and shows at the root URL.
// To add a language: add its code here, add the same code to astro.config.mjs,
// and create src/i18n/<code>.json.
export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

// How each language shows in the picker: a flag and its name in its own
// language. Designed to scale to 20+ entries — the picker shows the current
// one and opens to the full list. Repeats are fine (e.g. en-US, en-IE both
// "English" with different flags). To add one: add the code to LOCALES above
// and to astro.config.mjs, create src/i18n/<code>.json, then add a row here.
export const LOCALE_META: Record<string, { label: string; flag: string }> = {
  en: { label: 'English', flag: '🇬🇧' },
  es: { label: 'Español', flag: '🇪🇸' },
  // fr: { label: 'Français', flag: '🇫🇷' },
  // de: { label: 'Deutsch',  flag: '🇩🇪' },
};

// The category tiles on the home page, in display order.
// `id` is the URL segment and the content folder name.
// `icon` picks a drawing from src/components/CategoryIcon.astro.
// Names + descriptions are translated in src/i18n/<code>.json.
export const CATEGORIES = [
  { id: 'recipes', icon: 'cup' },
  { id: 'living', icon: 'house' },
  { id: 'wellbeing', icon: 'leaf' },
  { id: 'money', icon: 'coin' },
] as const;
