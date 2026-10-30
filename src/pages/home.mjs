import { site } from "../site.config.mjs";
import { ventures } from "../data/ventures.mjs";
import { servicePreview } from "../data/services.mjs";
import { projects } from "../data/projects.mjs";
import { icon } from "../lib/icons.mjs";
import { button, sectionHead, ventureCard, projectCard, ctaBand, esc } from "../lib/components.mjs";
import { domain } from "../lib/layout.mjs";

function heroVisual() {
  const tile = (v, cls) =>
    `<a class="hv-tile ${cls}" data-accent="${v.accent}" href="${v.path}" tabindex="-1" aria-hidden="true">${icon(v.icon, { size: 28 })}<span>${esc(v.name)}</span></a>`;
  return `<div class="hero-visual" aria-hidden="true">
    <div class="hv-grid"></div>
    <div class="hv-orb hv-orb-1"></div>
    <div class="hv-orb hv-orb-2"></div>
    ${tile(ventures[0], "t1")}${tile(ventures[1], "t2")}${tile(ventures[2], "t3")}${tile(ventures[3], "t4")}${tile(ventures[4], "t5")}
  </div>`;
}

export const page = {
  path: "/",
  rawTitle: true,
  title: "Sid | Entrepreneur, Web Developer and Business Content Creator in Karnataka",
  description:
    "Sid brings together five ventures: water purification (Shree Matha Enterprises), web development (Sid’s PixelVows), Kannada business education, creative gifting and insurance advisory.",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: site.displayName,
      description: site.introduction,
      jobTitle: "Entrepreneur and web developer",
      address: { "@type": "PostalAddress", addressLocality: site.locality, addressRegion: site.region, addressCountry: site.country },
      ...(domain ? { url: domain + "/" } : {}),
      ...(Object.values(site.social).filter(Boolean).length ? { sameAs: Object.values(site.social).filter(Boolean) } : {}),
    },
  ],
  render() {
    const featured = projects.filter((p) => p.featured);
    return `
<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow reveal">Entrepreneur · Web developer · Business creator</p>
      <h1 class="reveal">Building Businesses, Digital Experiences, and Ideas That Move Forward.</h1>
      <p class="lead reveal">I’m Sid, from ${esc(site.locality)}, Karnataka. I work across entrepreneurship, web development, business education, creative gifting and insurance advisory, and each venture has its own page and enquiry path.</p>
      <div class="btn-row reveal">
        ${button("Explore My Ventures", "/ventures", { variant: "primary", ic: "arrow", size: "lg" })}
        ${button("Discuss a Project", "/contact?category=web#enquiry", { variant: "ghost", size: "lg" })}
      </div>
      <ul class="hero-facts reveal" aria-label="Quick facts">
        <li>${icon("pin", { size: 16 })} ${esc(site.location)}</li>
        <li>${icon("code", { size: 16 })} BE Computer Science</li>
        <li>${icon("briefcase", { size: 16 })} Five ventures</li>
      </ul>
    </div>
    ${heroVisual()}
  </div>
</section>

<section class="section" id="ventures" aria-labelledby="ventures-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Ventures", title: '<span id="ventures-title">Five ventures, one person behind them</span>', lead: "Each one serves a different audience. Pick the one that matches what you need." })}
    <div class="grid grid-venture">${ventures.map((v) => ventureCard(v)).join("")}</div>
    <p class="center-link reveal">${button("See all ventures", "/ventures", { variant: "ghost", ic: "arrow" })}</p>
  </div>
</section>

<section class="section section-sand" aria-labelledby="services-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Services", title: '<span id="services-title">What I can help with</span>', lead: "Web development and business-related services, each delivered by the relevant venture." })}
    <div class="grid grid-4">
      ${servicePreview
        .map(
          (s) => `<article class="card service-card reveal">
        <div class="vc-icon">${icon(s.icon, { size: 24 })}</div>
        <h3><a class="stretched" href="${s.href}">${esc(s.title)}</a></h3>
        <p>${esc(s.desc)}</p>
        <p class="chip">${esc(s.venture)}</p>
      </article>`
        )
        .join("")}
    </div>
    <p class="center-link reveal">${button("View all services", "/services", { variant: "primary", ic: "arrow" })}</p>
  </div>
</section>

<section class="section" aria-labelledby="work-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Featured work", title: '<span id="work-title">Real projects, clearly labelled</span>', lead: "Only confirmed work is listed. Anything still to be added is marked as such." })}
    <div class="grid grid-2">${featured.map(projectCard).join("")}</div>
    <p class="center-link reveal">${button("See all work", "/work", { variant: "ghost", ic: "arrow" })}</p>
  </div>
</section>

<section class="section section-sand" aria-labelledby="about-title">
  <div class="container about-preview">
    <div class="reveal">
      <p class="eyebrow">About</p>
      <h2 id="about-title">An engineering background, applied to practical business</h2>
      <p>I studied Computer Science (BE CSE) and build websites with WordPress and React. Alongside that, I run and support several small ventures, from water treatment equipment to handmade gifts. I like solving practical problems and being transparent about what I can and can’t do.</p>
      <p>${button("Read my story", "/about", { variant: "primary", ic: "arrow" })}</p>
    </div>
    <ul class="values reveal" aria-label="Working values">
      <li>${icon("eye", { size: 22 })}<div><strong>Transparency</strong><span>Clear scope, no inflated claims.</span></div></li>
      <li>${icon("wrench", { size: 22 })}<div><strong>Practical execution</strong><span>Work that ships and works.</span></div></li>
      <li>${icon("rocket", { size: 22 })}<div><strong>Continuous learning</strong><span>New tools and ideas, applied carefully.</span></div></li>
      <li>${icon("heart", { size: 22 })}<div><strong>Customer focus</strong><span>Built around what people need.</span></div></li>
    </ul>
  </div>
</section>

${ctaBand({
  title: "Tell me what you need",
  text: "A website, a water treatment solution, a business idea, a creative order or an insurance consultation. Choose the topic and I’ll point your enquiry to the right place.",
  actions: `${button("Start an enquiry", "/contact#enquiry", { variant: "light", ic: "arrow", size: "lg" })}`,
})}`;
  },
};
