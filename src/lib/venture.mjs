// Shared pieces for the five venture pages.
import { icon } from "./icons.mjs";
import { esc, breadcrumb, sectionHead } from "./components.mjs";
import { ventureBySlug, ventures } from "../data/ventures.mjs";
import { enquiryForm } from "./components.mjs";

export function ventureHero({ slug, h1, lead, actions, aside = "" }) {
  const v = ventureBySlug[slug];
  return `<section class="page-hero venture-hero" data-accent="${v.accent}">
  <div class="container vh-grid">
    <div>
      ${breadcrumb([{ label: "Home", href: "/" }, { label: "Ventures", href: "/ventures" }, { label: v.name }])}
      <p class="chip chip-accent">${icon(v.icon, { size: 16 })} ${esc(v.category)}</p>
      <h1>${h1}</h1>
      <p class="lead">${lead}</p>
      <div class="btn-row">${actions}</div>
    </div>
    ${aside ? `<div class="vh-aside">${aside}</div>` : ""}
  </div>
</section>`;
}

export function enquirySection({ id = "enquiry", eyebrow = "Enquiry", title, lead, formId, category, submitLabel, side = "" }) {
  return `<section class="section section-sand" id="${id}" aria-labelledby="${id}-title">
  <div class="container enquiry-wrap">
    <div class="enquiry-side reveal">
      ${sectionHead({ eyebrow, title: `<span id="${id}-title">${title}</span>`, lead })}
      ${side}
    </div>
    <div class="form-card reveal">${enquiryForm({ id: formId, category, submitLabel })}</div>
  </div>
</section>`;
}

export function otherVentures(currentSlug) {
  const others = ventures.filter((v) => v.slug !== currentSlug);
  return `<section class="section" aria-labelledby="other-ventures">
  <div class="container">
    ${sectionHead({ eyebrow: "More from Sid", title: '<span id="other-ventures">Other ventures</span>' })}
    <div class="venture-rows venture-rows-4">
      ${others
        .map(
          (v) => `<a class="venture-row reveal" data-accent="${v.accent}" href="${v.path}">
        <span class="vc-icon">${icon(v.icon, { size: 22 })}</span>
        <span class="vr-text"><strong>${esc(v.name)}</strong><span>${esc(v.category)}</span></span>
        <span class="vr-go">${icon("arrow", { size: 18 })}<span class="sr-only">Open ${esc(v.name)}</span></span>
      </a>`
        )
        .join("")}
    </div>
  </div>
</section>`;
}
