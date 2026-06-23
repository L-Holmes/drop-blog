Storage policy

- This site uses no cookies and no browser storage of any kind.
- That means no cookies, no localStorage, no sessionStorage, no IndexedDB, no cache for state.
- The only persistent setting is text size, and it lives only in the page URL as ?text=N.
- When text size is on, internal links carry that ?text=N so the choice follows the reader between pages.
- The one-time home animation decides whether to play from document.referrer only, never from stored state.
- Please keep it this way. If a future feature seems to need storage, find a URL-based or stateless approach instead.
