// Reusable HTML building blocks (rendered at build time to static HTML).

import { icon } from "./icons.mjs";
import { site } from "../site.config.mjs";
import { ventures, enquiryCategories } from "../data/ventures.mjs";
import { categoryLabels, statusLabels } from "../data/projects.mjs";

export const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const isExternal = (href) => /^https?:\/\//.test(href);

export function button(label, href, { variant = "primary", ic = "", size = "", external } = {}) {
  const ext = external ?? isExternal(href);
  const attrs = ext ? ' target="_blank" rel="noopener noreferrer"' : "";
  const lead = ic && ic !== "arrow" ? icon(ic, { size: 18 }) : "";
  const trail = ic === "arrow" ? icon("arrow", { size: 18 }) : ext ? icon("external", { size: 16 }) : "";
  const extNote = ext ? '<span class="sr-only"> (opens in a new tab)</span>' : "";
  return `<a class="btn btn-${variant}${size ? " btn-" + size : ""}" href="${esc(href)}"${attrs}>${lead}<span>${esc(label)}</span>${extNote}${trail}</a>`;
}

export function sectionHead({ eyebrow = "", title, lead = "", level = 2, center = false }) {
  return `<header class="section-head${center ? " center" : ""} reveal">
  ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ""}
  <h${level}>${title}</h${level}>
  ${lead ? `<p class="lead">${lead}</p>` : ""}
</header>`;
}

export function breadcrumb(items) {
  const lis = items
    .map((it, i) =>
      i === items.length - 1
        ? `<li aria-current="page">${esc(it.label)}</li>`
        : `<li><a href="${esc(it.href)}">${esc(it.label)}</a></li>`
    )
    .join("");
  return `<nav class="breadcrumb" aria-label="Breadcrumb"><ol>${lis}</ol></nav>`;
}

export function ventureCard(v, { showAudience = false } = {}) {
  return `<article class="card venture-card reveal" data-accent="${v.accent}">
  <div class="vc-icon">${icon(v.icon, { size: 26 })}</div>
  <p class="chip">${esc(v.category)}</p>
  <h3><a class="stretched" href="${v.path}">${esc(v.name)}</a></h3>
  <p>${esc(v.short)}</p>
  ${showAudience ? `<p class="vc-audience"><strong>Who it is for:</strong> ${esc(v.audience)}</p>` : ""}
  <span class="card-link" aria-hidden="true">Visit page ${icon("arrow", { size: 16 })}</span>
</article>`;
}

export function serviceGroup(g) {
  const items = g.items
    .map((it) => `<li><h4>${esc(it.title)}</h4><p>${esc(it.desc)}</p></li>`)
    .join("");
  return `<section class="service-group reveal" id="${g.id}" aria-labelledby="${g.id}-title">
  <div class="sg-side">
    <div class="vc-icon">${icon(g.icon, { size: 26 })}</div>
    <h2 id="${g.id}-title">${esc(g.title)}</h2>
    <p class="chip">Delivered by ${esc(g.ventureName)}</p>
    <p>${esc(g.intro)}</p>
    <div class="sg-actions">
      ${button(g.cta, g.href, { variant: "primary", ic: "arrow" })}
      ${button("About " + g.ventureName, g.pageHref, { variant: "ghost" })}
    </div>
  </div>
  <ul class="sg-items">${items}</ul>
</section>`;
}

export function placeholderArt(label, cat) {
  const ic = { water: "droplet", web: "layout", creative: "flower", education: "book" }[cat] || "camera";
  return `<div class="img-placeholder" role="img" aria-label="${esc(label)}: image placeholder">
  ${icon(ic, { size: 34 })}
  <span>Photo to be added</span>
</div>`;
}

export function projectCard(p) {
  const cat = p.categories[0];
  const media = p.image
    ? `<img src="${esc(p.image)}" alt="${esc(p.imageAlt || p.title)}" loading="lazy" decoding="async" width="640" height="400">`
    : placeholderArt(p.title, cat);
  const link = p.link
    ? `<a class="card-link" href="${esc(p.link)}" target="_blank" rel="noopener noreferrer">Visit project<span class="sr-only"> (opens in a new tab)</span> ${icon("external", { size: 15 })}</a>`
    : "";
  return `<article class="card project-card" data-cats="${p.categories.join(" ")}" data-status="${p.status}">
  <div class="pc-media">${media}</div>
  <div class="pc-body">
    <div class="pc-meta">
      <span class="badge badge-${p.status}">${esc(statusLabels[p.status])}</span>
      <span class="pc-cat">${p.categories.map((c) => esc(categoryLabels[c])).join(" · ")}</span>
    </div>
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.description)}</p>
    ${p.venture ? `<p class="pc-venture">${esc(p.venture)}${p.date ? " · " + esc(p.date) : ""}</p>` : p.date ? `<p class="pc-venture">${esc(p.date)}</p>` : ""}
    ${p.details ? `<p class="pc-details">${esc(p.details)}</p>` : ""}
    ${link}
  </div>
</article>`;
}

export function faqList(items, { title = "Frequently asked questions", id = "faq" } = {}) {
  const rows = items
    .map(
      (f) => `<details class="faq-item"><summary><span>${esc(f.q)}</span>${icon("chevron", { size: 20 })}</summary><div class="faq-a"><p>${f.a}</p></div></details>`
    )
    .join("");
  return `<section class="section" id="${id}" aria-labelledby="${id}-title">
  <div class="container narrow">
    ${sectionHead({ eyebrow: "FAQ", title: `<span id="${id}-title">${esc(title)}</span>`, center: true })}
    <div class="faq reveal">${rows}</div>
  </div>
</section>`;
}

export function ctaBand({ title, text, actions }) {
  return `<section class="cta-band" aria-label="Get in touch">
  <div class="container cta-inner reveal">
    <div>
      <h2>${esc(title)}</h2>
      <p>${esc(text)}</p>
    </div>
    <div class="cta-actions">${actions}</div>
  </div>
</section>`;
}

export function disclaimer(text, { tone = "info" } = {}) {
  return `<aside class="note note-${tone}" role="note">${icon(tone === "warn" ? "alert" : "info", { size: 20 })}<p>${text}</p></aside>`;
}

// ---- Links that only appear when configured ------------------------------------------------

export function waHref(number, text = "") {
  const n = String(number || "").replace(/\D/g, "");
  if (!n) return "";
  return `https://wa.me/${n}${text ? "?text=" + encodeURIComponent(text) : ""}`;
}

export function whatsappButton(number, label, text, opts = {}) {
  const href = waHref(number, text);
  return href ? button(label, href, { variant: opts.variant || "whatsapp", ic: "whatsapp" }) : "";
}

export function socialLinks(list) {
  const items = list.filter((s) => s.url);
  if (!items.length) return "";
  return `<ul class="social-list">${items
    .map(
      (s) =>
        `<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${icon(s.icon, { size: 18 })}<span>${esc(s.label)}</span><span class="sr-only"> (opens in a new tab)</span></a></li>`
    )
    .join("")}</ul>`;
}

// ---- Enquiry form --------------------------------------------------------------------------------

function field({ id, name, label, type = "text", required = false, options, hint = "", rows = 4, autocomplete = "", placeholder = "", min, full = false, inputmode = "" }) {
  const rid = `${id}`;
  const req = required ? ' data-required="true" aria-required="true"' : "";
  const hintId = hint ? ` aria-describedby="${rid}-hint ${rid}-err"` : ` aria-describedby="${rid}-err"`;
  const common = `id="${rid}" name="${name}"${req}${hintId}${autocomplete ? ` autocomplete="${autocomplete}"` : ""}`;
  let control;
  if (options) {
    control = `<select ${common}><option value="">Select…</option>${options
      .map((o) => `<option value="${esc(o)}">${esc(o)}</option>`)
      .join("")}</select>`;
  } else if (type === "textarea") {
    control = `<textarea ${common} rows="${rows}"${placeholder ? ` placeholder="${esc(placeholder)}"` : ""}></textarea>`;
  } else {
    control = `<input ${common} type="${type}"${placeholder ? ` placeholder="${esc(placeholder)}"` : ""}${min !== undefined ? ` min="${min}"` : ""}${inputmode ? ` inputmode="${inputmode}"` : ""}>`;
  }
  return `<div class="field${full ? " full" : ""}" data-field="${name}">
  <label for="${rid}">${esc(label)}${required ? ' <span class="req" aria-hidden="true">*</span><span class="sr-only"> (required)</span>' : ' <span class="opt">(optional)</span>'}</label>
  ${control}
  ${hint ? `<p class="hint" id="${rid}-hint">${esc(hint)}</p>` : ""}
  <p class="err" id="${rid}-err" role="alert"></p>
</div>`;
}

export const LPH = ["25 LPH", "50 LPH", "100 LPH", "250 LPH", "500 LPH", "1,000 LPH", "2,000 LPH", "5,000 LPH", "Domestic purifier (not LPH)", "Not sure, please advise"];

/**
 * @param {object} o
 * @param {string} o.id unique id prefix
 * @param {string} [o.category] fixed category id, or omit to show a selector
 * @param {string} [o.submitLabel]
 */
export function enquiryForm({ id, category = "", submitLabel = "Send enquiry", intro = "" }) {
  const fixed = category && enquiryCategories.find((c) => c.id === category);
  const f = (name, opts) => field({ id: `${id}-${name}`, name, ...opts });
  const categoryBlock = fixed
    ? `<input type="hidden" name="category" value="${fixed.id}">
       <p class="fixed-cat">${icon(fixed.icon, { size: 18 })}<span>Enquiry type: <strong>${esc(fixed.label)}</strong></span></p>`
    : field({
        id: `${id}-category`,
        name: "category",
        label: "What is your enquiry about?",
        required: true,
        options: enquiryCategories.map((c) => c.label),
        full: true,
      }).replace(/<option value="([^"]*)">([^<]*)<\/option>/g, (m, v, t) => {
        const c = enquiryCategories.find((x) => x.label === t);
        return c ? `<option value="${c.id}">${t}</option>` : m;
      });

  return `<form class="enquiry-form" id="${id}" novalidate data-enquiry data-fixed="${fixed ? "1" : "0"}" data-initial="${fixed ? fixed.id : ""}" aria-label="Enquiry form">
  ${intro ? `<p class="form-intro">${intro}</p>` : ""}
  <div class="form-grid">
    ${categoryBlock}

    <div class="group-fields" data-group="water" hidden>
      ${f("product", { label: "Product interest", options: ["Domestic RO water purifier", "Commercial RO plant", "Water softener", "Industrial or commercial water treatment", "RO plant installation or maintenance", "Fogging machine", "Hygiene and sanitation chemicals", "Bleaching powder", "Solar street light or high-mast light", "Solar panel or solar water heater", "CCTV camera", "Other"], required: true })}
      ${f("capacity", { label: "Required capacity", options: LPH, required: true })}
      ${f("applicationType", { label: "Application type", options: ["Home", "Shop or office", "School or college", "Hospital or clinic", "Industry or factory", "Village, panchayat or community", "Other"] })}
      ${f("waterLocation", { label: "Installation location", required: true, placeholder: "Town / village, district", autocomplete: "address-level2" })}
    </div>

    <div class="group-fields" data-group="web" hidden>
      ${f("websiteType", { label: "Type of website", options: ["Business website", "Landing page", "WordPress website", "React / custom frontend", "Portfolio website", "E-commerce website", "School or institution website", "Website redesign", "Maintenance or improvements", "Not sure yet"], required: true })}
      ${f("budget", { label: "Approximate budget", options: ["Under ₹10,000", "₹10,000 to ₹25,000", "₹25,000 to ₹50,000", "Above ₹50,000", "Not sure yet"], hint: "Only an indication so the project can be scoped. Nothing is committed." })}
      ${f("features", { label: "Expected features", type: "textarea", rows: 3, full: true, placeholder: "e.g. contact form, product catalogue, WhatsApp button, Kannada and English" })}
    </div>

    <div class="group-fields" data-group="business" hidden>
      ${f("investment", { label: "Investment budget", options: ["₹5,000 to ₹10,000", "₹10,000 to ₹15,000", "₹15,000 to ₹25,000", "Not sure yet"], required: true })}
      ${f("businessType", { label: "Preferred business type", options: ["Service business", "Trading or retail", "Food and beverages", "Handmade or small production", "Online or digital", "No preference"] })}
      ${f("skills", { label: "Your skills", type: "textarea", rows: 2, full: true, placeholder: "What are you good at or experienced in?" })}
      ${f("interests", { label: "Your interests", type: "textarea", rows: 2, full: true, placeholder: "What kind of work do you enjoy?" })}
      ${f("bizLocation", { label: "Your location", required: true, placeholder: "Town / village, district", autocomplete: "address-level2" })}
      ${f("timeAvailable", { label: "Time you can give", options: ["A few hours on weekends", "1 to 2 hours on weekdays", "3 to 5 hours a day", "Full time"], required: true })}
    </div>

    <div class="group-fields" data-group="rj" hidden>
      ${f("productType", { label: "Product type", options: ["Artificial flower bouquet", "Pink rose bouquet", "Pipe-cleaner flower arrangement", "Handmade gift", "Gift-wrapped product", "Decorative gifting product", "Custom bouquet", "Event or celebration gifting"], required: true })}
      ${f("quantity", { label: "Quantity", type: "number", min: 1, inputmode: "numeric", placeholder: "e.g. 1" })}
      ${f("occasion", { label: "Occasion", options: ["Birthday", "Anniversary", "Wedding or engagement", "Festival", "Corporate or event", "Just because", "Other"] })}
      ${f("deliveryLocation", { label: "Delivery location", placeholder: "Town / city", autocomplete: "address-level2" })}
    </div>

    <div class="group-fields" data-group="insurance" hidden>
      ${f("suitableTime", { label: "Suitable time to contact you", options: ["Morning", "Afternoon", "Evening", "Any time"], required: true })}
      <p class="field full privacy-note">${icon("shield", { size: 18 })}<span>Please do not share Aadhaar, PAN, bank, card, health or other sensitive details through this form. An advisor will ask only for what is needed, through a proper channel.</span></p>
    </div>

    ${f("name", { label: "Your name", required: true, autocomplete: "name" })}
    ${f("email", { label: "Email", type: "email", required: true, autocomplete: "email" })}
    ${f("phone", { label: "Phone number", type: "tel", autocomplete: "tel", inputmode: "tel", hint: "Needed if you prefer a call or WhatsApp." })}
    ${f("contactMethod", { label: "Preferred contact method", options: ["Email", "Phone call", "WhatsApp"], required: true })}
    ${f("message", { label: "Your message", type: "textarea", rows: 5, full: true, required: true, placeholder: "Tell us a little about what you need." })}

    <div class="hp" aria-hidden="true"><label>Leave this field empty<input type="text" name="company_website" tabindex="-1" autocomplete="off"></label></div>
    <input type="hidden" name="_opened" value="">
  </div>

  <div class="form-status" role="status" aria-live="polite" tabindex="-1" data-status></div>
  <div class="form-actions">
    <button type="submit" class="btn btn-primary" data-submit><span class="btn-label">${esc(submitLabel)}</span><span class="spinner" aria-hidden="true"></span></button>
    <span data-extra-actions></span>
  </div>
  <p class="form-fine">Your details are used only to reply to this enquiry.</p>
</form>`;
}
