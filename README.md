# Sid: Personal Brand and Ventures Website

A real multi-page website (11 routes plus a custom 404) for Sid and five ventures:
Shree Matha Enterprises, Sid’s PixelVows, Kannada Business Adda, RJ Creativity and Insurance Advisory.

It is a **static site with zero runtime dependencies**. A small Node script renders every page to plain HTML, CSS and JavaScript in `dist/`, which you can host anywhere. Requires Node 18 or newer; there is no `npm install` step.

> **Why not React/Vite?** The workspace this was built in blocked the npm registry, so React, Vite and React Router could not be installed or tested. A static build was chosen so that everything could be built and verified. Content lives in data files, so a later migration to React is straightforward.

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/ventures` | All ventures |
| `/ventures/shree-matha-enterprises` | Shree Matha Enterprises |
| `/ventures/pixelvows` | Sid’s PixelVows |
| `/ventures/kannada-business-adda` | Kannada Business Adda |
| `/ventures/rj-creativity` | RJ Creativity |
| `/ventures/insurance-advisory` | Insurance Advisory |
| `/services` | Services overview |
| `/work` | Portfolio (filterable) |
| `/contact` | Contact and enquiry hub |
| (any other URL) | `404.html` |

## Quick start

```bash
npm run build     # generates ./dist
npm run serve     # preview at http://localhost:4173
npm run check     # link, anchor, heading and alt-text checks on ./dist
npm start         # build, then serve
```

(`npm run` is optional; `node build.mjs`, `node serve.mjs` and `node check.mjs` do the same.)

## Project structure

```
build.mjs                 static generator -> dist/
serve.mjs                 local preview server (serves 404.html for unknown URLs)
check.mjs                 post-build checks (links, anchors, h1, alt, ids)
src/
  site.config.mjs         <-- YOUR details: contact, socials, domain, form endpoint
  data/
    ventures.mjs          venture names, categories, enquiry categories
    services.mjs          services page content
    projects.mjs          portfolio entries (add projects here)
  lib/
    layout.mjs            <head>/SEO, header, footer, page shell
    components.mjs        cards, buttons, FAQ, enquiry form
    venture.mjs           shared venture-page pieces
    icons.mjs             inline SVG icons (no external requests)
  pages/                  one module per route (pages/ventures/ for the five ventures)
  assets/
    css/styles.css        design tokens + all styles
    js/main.js            menu, dropdown, filter, form validation
    js/enquiry-api.js     the only file that talks to a form backend
    img/                  favicon.svg, og-image.png, your photos
public/                   copied as-is to the site root (e.g. add files here)
```

## Configure your details

Edit **`src/site.config.mjs`** only. Anything left as `""` is simply not shown; nothing is invented.

Still needed from you (all currently empty):

- Email, phone and WhatsApp number (personal and per venture)
- Instagram URLs for Shree Matha Enterprises and Kannada Business Adda (the handle `@shree_matha_enterprises` is shown until you add the URL)
- YouTube channel URL, GitHub URL, LinkedIn URL
- Shree Matha address (optional)
- RJ Creativity shipping, returns and cancellation policies (shown as “to be confirmed”)
- Your insurance advisor registration text, if you want it shown
- Your real domain

Known links already set: RJ Creativity website `https://rj-creativity-bloom.lovable.app/` and Instagram `https://www.instagram.com/rj_creativity__/`.

WhatsApp buttons appear **only** when a number is configured.

## Connect the enquiry form

**Current status: the form is NOT connected to anything.** It validates input, then tells the visitor plainly: “Your message has not been sent.” It never claims success without a real backend response. Their details stay in the form, and a WhatsApp fallback link is offered if a number is configured.

To go live:

1. Pick a service that gives you a **public** form URL that accepts a JSON POST, for example Formspree, Web3Forms, Getform, or your own serverless function (Netlify Functions, Cloudflare Workers, etc.) that sends you an email.
2. Put that URL in `form.endpoint` in `src/site.config.mjs`.
3. Rebuild and deploy.
4. Submit a real test enquiry and confirm it reaches your inbox.

Notes:

- The payload is flat JSON: `category`, `name`, `email`, `phone`, `contactMethod`, `message`, the category-specific fields, and `page`. If your provider needs a different format, change `buildRequest()` in `src/assets/js/enquiry-api.js`.
- **Never put API keys or secrets in this site.** Everything in it is public. Use a provider whose endpoint URL is safe to expose, or keep the secret inside your own serverless function.
- Spam protection in the browser is a hidden honeypot field plus a minimum fill time (`form.minFillSeconds`). These stop simple bots only. Also enable your provider’s spam filtering or CAPTCHA, and validate on the server.
- Insurance forms deliberately ask for no sensitive financial or personal data.

## Add and replace content

**Add a portfolio project:** add an object to `src/data/projects.mjs`. It appears on `/work` (and the home page if `featured: true`) with no other changes. Use `status: "demo"` or `"concept"` for anything that is not real client work.

**Replace images:**
1. Put the file in `src/assets/img/projects/` (create the folder).
2. In `projects.mjs` set `image: "/assets/img/projects/your-file.jpg"` and a descriptive `imageAlt`.
3. Rebuild. Compress photos first (about 1600 px wide, under 300 KB each is plenty).

**RJ Creativity sample gallery:** the flower pictures are illustrations labelled “Sample · demonstration content”. To show real products, edit the `samples` array in `src/pages/ventures/rj-creativity.mjs` and use `<img>` with real photos and prices only when they are confirmed.

**Edit text:** page copy is in `src/pages/*.mjs`; shared service and venture data is in `src/data/`.

## Domain, SEO and deployment

1. Set `domain` in `src/site.config.mjs` (for example `https://www.yourdomain.in`, no trailing slash), or build with `SITE_DOMAIN=https://www.yourdomain.in node build.mjs`.
2. Rebuild. This turns on canonical URLs, Open Graph/Twitter URLs and image, and generates `sitemap.xml` (it is skipped until a domain is set, because a wrong domain is worse than none). `robots.txt` is always generated.
3. Upload the contents of `dist/` to any static host.

Clean URLs rely on each route being its own folder with an `index.html`, so no SPA rewrite rules are needed. Hosting notes:

- **Netlify / Cloudflare Pages / Vercel:** build command `node build.mjs`, publish directory `dist`. `404.html` is used automatically.
- **GitHub Pages:** publish `dist`. `404.html` is used automatically. (Project pages under a sub-path need the site to be served from the domain root, so use a custom domain.)
- **Apache / cPanel:** upload `dist/` to `public_html/`. Add `ErrorDocument 404 /404.html` in `.htaccess`.
- **Nginx:** `try_files $uri $uri/ =404; error_page 404 /404.html;`

Structured data currently included: `Person` (home), `LocalBusiness` (Shree Matha, with only the details you have configured) and `ProfessionalService` (PixelVows). No ratings, hours, phone numbers or addresses are invented.

## Verification status

See the final report in the chat for exactly what was and was not tested. In short: the build, a static link and anchor checker, and 32 automated browser checks were run in headless Chromium at desktop (1366 px) and mobile (390 px) widths. Real-device testing, Lighthouse, screen readers, a live form backend and a deployed domain were not tested.
