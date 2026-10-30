// Page shell: <head>/SEO, header, footer. Every page is rendered through renderPage().

import { site } from "../site.config.mjs";
import { ventures } from "../data/ventures.mjs";
import { icon } from "./icons.mjs";
import { esc, socialLinks } from "./components.mjs";

export const domain = (process.env.SITE_DOMAIN || site.domain || "").replace(/\/+$/, "");

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Ventures", href: "/ventures", dropdown: true },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

function header(path) {
  const items = nav
    .map((n) => {
      const exact = path === n.href;
      const section = n.href !== "/" && path.startsWith(n.href + "/");
      const cls = exact || section ? ' class="is-active"' : "";
      const cur = exact ? ' aria-current="page"' : "";
      if (!n.dropdown) return `<li><a href="${n.href}"${cls}${cur}>${n.label}</a></li>`;
      const dd = ventures
        .map((v) => `<li><a href="${v.path}"${path === v.path ? ' aria-current="page"' : ""}><span class="dd-name">${esc(v.name)}</span><span class="dd-cat">${esc(v.category)}</span></a></li>`)
        .join("");
      return `<li class="has-dd">
        <div class="dd-row"><a href="${n.href}"${cls}${cur}>${n.label}</a><button type="button" class="dd-toggle" aria-expanded="false" aria-controls="dd-ventures" aria-label="Show ventures menu">${icon("chevron", { size: 16 })}</button></div>
        <ul class="dd" id="dd-ventures">${dd}</ul></li>`;
    })
    .join("");

  return `<a class="skip-link" href="#main">Skip to main content</a>
<header class="site-header" data-header>
  <div class="container header-inner">
    <a class="logo" href="/" aria-label="${esc(site.displayName)} – home"><span class="logo-mark" aria-hidden="true">S</span><span class="logo-text">${esc(site.displayName)}<span class="logo-dot">.</span></span></a>
    <nav class="primary-nav" id="primary-nav" aria-label="Primary">
      <ul>${items}</ul>
      <a class="btn btn-primary nav-cta" href="/contact">Let’s Work Together</a>
    </nav>
    <button type="button" class="menu-btn" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu">
      <span class="i-open">${icon("menu", { size: 24 })}</span><span class="i-close">${icon("x", { size: 24 })}</span>
    </button>
  </div>
</header>`;
}

function footer() {
  const year = new Date().getFullYear();
  const v = site.ventures;
  const socials = socialLinks([
    { label: "RJ Creativity on Instagram", url: v.rjCreativity.instagramUrl, icon: "instagram" },
    { label: "Kannada Business Adda on Instagram", url: v.kannadaBusinessAdda.instagramUrl, icon: "instagram" },
    { label: "Shree Matha Enterprises on Instagram", url: v.shreeMatha.instagramUrl, icon: "instagram" },
    { label: "Personal Instagram", url: site.social.instagram, icon: "instagram" },
    { label: "YouTube", url: site.social.youtube || v.kannadaBusinessAdda.youtubeUrl, icon: "youtube" },
    { label: "GitHub", url: site.social.github, icon: "github" },
    { label: "LinkedIn", url: site.social.linkedin, icon: "linkedin" },
  ]);
  const contactLines = [
    site.contact.email ? `<li>${icon("mail", { size: 16 })}<a href="mailto:${esc(site.contact.email)}">${esc(site.contact.email)}</a></li>` : "",
    site.contact.phone ? `<li>${icon("phone", { size: 16 })}<a href="tel:${esc(site.contact.phone.replace(/[^+\d]/g, ""))}">${esc(site.contact.phone)}</a></li>` : "",
    `<li>${icon("pin", { size: 16 })}<span>${esc(site.location)}</span></li>`,
  ].join("");

  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div class="f-brand">
      <a class="logo logo-light" href="/" aria-label="${esc(site.displayName)} – home"><span class="logo-mark" aria-hidden="true">S</span><span class="logo-text">${esc(site.displayName)}<span class="logo-dot">.</span></span></a>
      <p>${esc(site.introduction)}</p>
      <ul class="f-contact">${contactLines}</ul>
    </div>
    <nav aria-label="Footer quick links">
      <h2 class="f-title">Explore</h2>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/work">Work</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
    <nav aria-label="Footer ventures">
      <h2 class="f-title">Ventures</h2>
      <ul>
        <li><a href="/ventures">All ventures</a></li>
        ${ventures.map((x) => `<li><a href="${x.path}">${esc(x.name)}</a></li>`).join("")}
      </ul>
    </nav>
    <div>
      <h2 class="f-title">Follow</h2>
      ${socials || '<p class="f-muted">Social links will appear here once added.</p>'}
    </div>
  </div>
  <div class="container f-legal">
    <p><strong>Insurance:</strong> Insurance information on this website is general and is not a substitute for official policy documents. Benefits, exclusions, charges and conditions are governed by the official policy terms of ${esc(v.insurance.company)}. ${v.insurance.advisorRegistration ? esc(v.insurance.advisorRegistration) : ""}</p>
    <p><strong>Business guidance:</strong> Business ideas and plans are recommendations only. They are not guarantees of profit or success.</p>
    <p><strong>Ventures:</strong> Each venture on this site is separate. Services are provided by the venture named on the relevant page.</p>
    <p class="f-copy">&copy; <span data-year>${year}</span> ${esc(site.displayName)}. All rights reserved.</p>
  </div>
</footer>`;
}

export function renderPage(page) {
  const path = page.path;
  const fullTitle = page.rawTitle ? page.title : `${page.title} | ${site.displayName}`;
  const canonical = domain && !page.noindex ? `${domain}${path === "/" ? "/" : path}` : "";
  const accent = page.accent ? ` data-accent="${page.accent}"` : "";
  const ogImage = domain ? `${domain}/assets/img/og-image.png` : "";
  const publicCfg = {
    endpoint: site.form.endpoint,
    method: site.form.method,
    minFillSeconds: site.form.minFillSeconds,
    whatsapp: site.contact.whatsapp,
    whatsappByCategory: {
      water: site.ventures.shreeMatha.whatsapp || site.contact.whatsapp,
      rj: site.ventures.rjCreativity.whatsapp || site.contact.whatsapp,
    },
  };
  const ld = (page.jsonLd || []).map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n");

  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(page.description)}">
${page.noindex ? '<meta name="robots" content="noindex, follow">' : ""}
${canonical ? `<link rel="canonical" href="${esc(canonical)}">` : ""}
<meta name="theme-color" content="#1F4D3A">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.displayName)}">
<meta property="og:locale" content="en_IN">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(page.description)}">
${canonical ? `<meta property="og:url" content="${esc(canonical)}">` : ""}
${ogImage ? `<meta property="og:image" content="${esc(ogImage)}">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n<meta property="og:image:alt" content="${esc(site.displayName)}: entrepreneur, web developer and business creator">` : ""}
<meta name="twitter:card" content="${ogImage ? "summary_large_image" : "summary"}">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(page.description)}">
${ogImage ? `<meta name="twitter:image" content="${esc(ogImage)}">` : ""}
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/css/styles.css">
<script>document.documentElement.classList.add("js")</script>
${ld}
</head>
<body${accent}>
${header(path)}
<main id="main" tabindex="-1">
${page.render()}
</main>
${footer()}
<script type="application/json" id="site-public">${JSON.stringify(publicCfg)}</script>
<script type="module" src="/assets/js/main.js"></script>
</body>
</html>
`;
}
