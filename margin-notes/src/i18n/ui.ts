import en from './en.json';
import es from './es.json';
import { DEFAULT_LOCALE, type Locale } from '../consts';

// The shape every translation file follows.
export interface UI {
  site: { tagline: string };
  ui: {
    home: string;
    readMore: string;
    noPosts: string;
    footer: string;
    footerLegal: string;
    learnMore: string;
    why: string;
    infoTitle: string;
    legal: { about: string; privacy: string; terms: string; disclaimer: string };
    updated: string;
    review: {
      verdict: string;
      tested: string;
      cons: string;
      weaker: string;
      missed: string;
      pros: string;
      scoresTitle: string;
      average: string;
      references: string;
    };
  };
  categories: Record<
    string,
    { name: string; description: string; pitchTitle?: string; pitch?: string[]; pitchMore?: string }
  >;
}

const dict: Record<string, UI> = { en, es };

export function getUI(locale: Locale): UI {
  return dict[locale] ?? dict[DEFAULT_LOCALE];
}
