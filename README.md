# Eatery Royale

A static showcase redesign using the restaurant’s original photographs and published restaurant details. No dependencies, build step, API, database, analytics, cookies or form submissions. All images, styles and scripts are served locally.

## Preview

From this directory, run `python -m http.server 4173 --directory dist --bind 127.0.0.1`, then open http://127.0.0.1:4173.

## Interactions

- Keyboard-accessible cuisine tabs with original menu prices.
- Expanded menu dialog with focus trapping, Escape support and a link to the complete original menu.
- Photo viewer with previous/next controls and arrow-key navigation.
- Mobile navigation; phone, email and directions links.
- Reduced-motion support, descriptive photo alternatives and visible keyboard focus.

The site is a presentation concept. Phone and email links open the visitor’s own apps; the site does not make reservations. Restaurant information and menu prices come from https://www.eateryroyale.com/ and should be confirmed with the restaurant before use. Photography provenance is recorded in ASSETS.md.

## Hosting

Deploy the `dist` directory on any static HTTPS host. `_headers` supplies security headers on hosts that support that format; the HTML also contains a Content Security Policy. Host-level framing headers should be verified when changing providers.
