Margin Notes

- install: npm install
- run locally: npm run dev
- build the static site: npm run build (output goes to dist/)

Add a blog post
- create src/content/blog/<category>/<post>/en.md
- give it a title, description and date at the top, then write in markdown
- add an emoji (or image) line at the top so the post has a picture
- add es.md (or any language) in the same folder for a translation

Reviews (the honest template)
- add type: review to a post to turn on the verdict card
- a review must include: updated, tested, rating, pros, cons (at least two), weakerThan, missed
- the build fails if any are missing, so you can't skip the honest bits
- optional scores: a small grid of testers and options; winners show gold, runners-up silver
- optional sources: real links to articles, papers or official guidance, shown as references
- run npm run check to list reviews and flag any that are going stale

Categories
- edit the list in src/consts.ts
- set each name and description in src/i18n/en.json and es.json
- the "what makes us different" teaser and its full page come from pitchTitle, pitch and pitchMore in the same category entries
- tile pictures are simple drawings in src/components/CategoryIcon.astro

Logo
- the header logo is an image at public/images/logo.svg

About and legal pages
- live in src/content/info/<page>/en.md (and es.md), shown as tiles at /info/
- the footer links to them; edit the placeholder legal text before going live

Languages
- add the code to LOCALES in src/consts.ts and to locales in astro.config.mjs
- copy src/i18n/en.json to src/i18n/<code>.json and translate it
- set its flag and name in LOCALE_META in src/consts.ts

Text size
- readers can step text size up with the A button; the choice is remembered in their browser

Theme
- three are included: rubberhose, linen, bloom
- switch by changing the one theme import line in src/layouts/Base.astro
