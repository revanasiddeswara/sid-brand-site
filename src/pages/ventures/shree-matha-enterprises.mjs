import { site } from "../../site.config.mjs";
import { icon } from "../../lib/icons.mjs";
import { button, sectionHead, projectCard, faqList, disclaimer, whatsappButton, esc } from "../../lib/components.mjs";
import { ventureHero, enquirySection, otherVentures } from "../../lib/venture.mjs";
import { projects } from "../../data/projects.mjs";
import { domain } from "../../lib/layout.mjs";

const cfg = site.ventures.shreeMatha;

const products = [
  { icon: "droplet", title: "Domestic RO water purifiers", desc: "Purifiers for homes. Tell us your water source and we’ll help you choose." },
  { icon: "droplet", title: "Commercial RO plants", desc: "Plants from 25 LPH to 5,000 LPH for shops, institutions and industry." },
  { icon: "wrench", title: "Industrial and commercial water treatment", desc: "Treatment solutions discussed case by case." },
  { icon: "droplet", title: "Water softeners", desc: "For hard water in homes and commercial setups." },
  { icon: "wrench", title: "RO plant installation and maintenance", desc: "Enquire about installation, servicing and upkeep." },
  { icon: "shield", title: "Fogging machines", desc: "Equipment for fogging and sanitation needs." },
  { icon: "shield", title: "Hygiene and sanitation chemicals", desc: "Including bleaching powder and related products." },
  { icon: "sun", title: "Solar street lights and high-mast lighting", desc: "Lighting solutions for roads, campuses and public spaces." },
  { icon: "sun", title: "Solar panels and solar water heaters", desc: "Solar-related solutions for homes and businesses." },
  { icon: "camera", title: "CCTV cameras and related solutions", desc: "Surveillance equipment. Enquire with your requirement." },
];

const capacities = ["25 LPH", "50 LPH", "100 LPH", "250 LPH", "500 LPH", "1,000 LPH", "2,000 LPH", "5,000 LPH"];

const faqs = [
  { q: "Do you publish prices?", a: "No. Pricing depends on capacity, water quality, site conditions and the product, so we give a quote after understanding your requirement. Use “Request a Quote” or send an enquiry." },
  { q: "Which commercial RO capacities are available?", a: "We handle commercial RO plants in these capacity categories: 25, 50, 100, 250, 500, 1,000, 2,000 and 5,000 LPH. If you are not sure which suits you, choose “Not sure, please advise” in the enquiry form." },
  { q: "What information should I share for an RO plant enquiry?", a: "Your location, where the water comes from (borewell, tap, tanker or other), roughly how much water you need per day, and what it will be used for. A water test report helps if you have one." },
  { q: "What is the difference between domestic and commercial RO?", a: "Domestic purifiers are made for household drinking water. Commercial RO plants are built for larger daily volumes, such as shops, institutions, communities and industry." },
  { q: "Can I enquire about installation or maintenance?", a: "Yes. Send an enquiry with your location and plant or product details and we’ll respond with the next steps." },
  { q: "Do you supply anything besides water equipment?", a: "Yes. Shree Matha Enterprises also handles fogging machines, hygiene and sanitation chemicals, bleaching powder, solar street lights, high-mast lighting, solar panels, solar water heaters and CCTV solutions." },
];

export const page = {
  path: "/ventures/shree-matha-enterprises",
  title: "Shree Matha Enterprises: RO Plants, Water Purifiers and Solar Solutions in Huvinahadagali",
  description:
    "Shree Matha Enterprises in Huvinahadagali, Karnataka: domestic RO water purifiers, commercial RO plants (25 to 5,000 LPH), water treatment, softeners, solar lighting, CCTV and more. Request a quote.",
  accent: "shree",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Shree Matha Enterprises",
      description: "Water purification, water treatment, solar and lighting solutions and related equipment.",
      address: { "@type": "PostalAddress", addressLocality: site.locality, addressRegion: site.region, addressCountry: site.country, ...(cfg.address ? { streetAddress: cfg.address } : {}) },
      ...(domain ? { url: domain + "/ventures/shree-matha-enterprises" } : {}),
      ...(cfg.phone ? { telephone: cfg.phone } : {}),
      ...(cfg.instagramUrl ? { sameAs: [cfg.instagramUrl] } : {}),
    },
  ],
  render() {
    const proj = projects.filter((p) => p.categories.includes("water"));
    const wa = whatsappButton(cfg.whatsapp || site.contact.whatsapp, "WhatsApp Enquiry", "Hello, I would like to enquire about RO / water treatment products from Shree Matha Enterprises.");
    const igLine = cfg.instagramUrl
      ? button("Follow on Instagram", cfg.instagramUrl, { variant: "ghost", ic: "instagram" })
      : `<span class="handle">${icon("instagram", { size: 18 })} Instagram: <strong>${esc(cfg.instagramHandle)}</strong></span>`;

    return `
${ventureHero({
  slug: "shree-matha-enterprises",
  h1: "Clean water and dependable equipment, from Huvinahadagali",
  lead: "Shree Matha Enterprises supplies domestic RO water purifiers, commercial RO plants and water treatment solutions, along with solar lighting and related equipment. Tell us what you need and we’ll quote on request.",
  actions: `${button("Enquire About an RO Plant", "#enquiry", { variant: "primary", ic: "arrow", size: "lg" })}${button("Browse product categories", "#products", { variant: "ghost", size: "lg" })}${wa}`,
  aside: `<div class="aside-card"><h2>Based in</h2><p>${icon("pin", { size: 16 })} ${esc(site.location)}</p>${cfg.address ? `<p>${esc(cfg.address)}</p>` : ""}${cfg.phone ? `<p>${icon("phone", { size: 16 })} <a href="tel:${esc(cfg.phone.replace(/[^+\d]/g, ""))}">${esc(cfg.phone)}</a></p>` : ""}<p class="aside-ig">${igLine}</p></div>`,
})}

<section class="section" aria-labelledby="overview-title">
  <div class="container two-col">
    <div class="prose reveal">
      <p class="eyebrow">Overview</p>
      <h2 id="overview-title">Water treatment and utility equipment under one roof</h2>
      <p>Shree Matha Enterprises focuses on water purification and treatment, from household RO purifiers to commercial RO plants, along with solar and lighting solutions and related equipment such as fogging machines, sanitation chemicals and CCTV.</p>
      <p>We serve homes, shops, institutions and industries in and around ${esc(site.locality)}. Prices are never one-size-fits-all, so every product is quoted on request, based on your actual requirement.</p>
    </div>
    <div class="reveal">${disclaimer("We don’t publish fixed prices. Choose <strong>Request a Quote</strong> and share your requirement for a quote.")}</div>
  </div>
</section>

<section class="section section-sand" id="products" aria-labelledby="products-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Product categories", title: '<span id="products-title">What we offer</span>', lead: "Request details for any of these through the enquiry form below." })}
    <div class="grid grid-3">
      ${products.map((p) => `<article class="card mini-card reveal"><div class="vc-icon">${icon(p.icon, { size: 22 })}</div><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p></article>`).join("")}
    </div>
    <p class="center-link reveal">${button("Request Product Details", "#enquiry", { variant: "primary", ic: "arrow" })}</p>
  </div>
</section>

<section class="section" aria-labelledby="dom-com">
  <div class="container">
    ${sectionHead({ eyebrow: "Domestic and commercial", title: '<span id="dom-com">Two kinds of RO solutions</span>' })}
    <div class="grid grid-2">
      <article class="card reveal"><div class="vc-icon">${icon("droplet", { size: 24 })}</div><h3>Domestic RO purifiers</h3><p>For household drinking water. Share your water source and family size and we’ll help you choose a suitable purifier.</p><p>${button("Enquire about a domestic purifier", "/contact?category=water#enquiry", { variant: "ghost" })}</p></article>
      <article class="card reveal"><div class="vc-icon">${icon("droplet", { size: 24 })}</div><h3>Commercial RO plants</h3><p>For larger daily volumes at shops, institutions, communities and industry, in capacities from 25 LPH to 5,000 LPH.</p><p>${button("Enquire About an RO Plant", "#enquiry", { variant: "ghost" })}</p></article>
    </div>
  </div>
</section>

<section class="section section-sand" aria-labelledby="cap-title">
  <div class="container">
    ${sectionHead({ eyebrow: "RO capacity guide", title: '<span id="cap-title">Commercial RO capacity categories</span>', lead: "LPH means litres per hour. The right size depends on how much water you need, your water source and quality, and how the plant will be used, so we recommend after understanding your requirement." })}
    <ul class="cap-grid reveal" aria-label="Available commercial RO capacities">
      ${capacities.map((c) => `<li><span class="cap-num">${esc(c.replace(" LPH", ""))}</span><span class="cap-unit">LPH</span></li>`).join("")}
    </ul>
    ${disclaimer("Not sure which capacity? Select <strong>Not sure, please advise</strong> in the enquiry form and describe your daily water need and location.")}
  </div>
</section>

<section class="section" aria-labelledby="service-title">
  <div class="container two-col">
    <div class="reveal">
      ${sectionHead({ eyebrow: "Installation and service", title: '<span id="service-title">Installation and maintenance enquiries</span>' })}
      <p>If you need an RO plant installed, or an existing plant looked at, send us the details. The more we know, the faster we can respond sensibly.</p>
    </div>
    <ul class="checklist reveal" aria-label="Useful details to share">
      <li>${icon("check", { size: 18 })} Your town or village and district</li>
      <li>${icon("check", { size: 18 })} Water source: borewell, tap, tanker or other</li>
      <li>${icon("check", { size: 18 })} Rough daily water requirement</li>
      <li>${icon("check", { size: 18 })} What the water will be used for</li>
      <li>${icon("check", { size: 18 })} Plant make and capacity, if it’s an existing one</li>
    </ul>
  </div>
</section>

<section class="section section-sand" aria-labelledby="proj-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Project showcase", title: '<span id="proj-title">Projects</span>', lead: "Examples of RO plant work. See the full portfolio on the Work page." })}
    <div class="grid grid-2">${proj.map(projectCard).join("")}</div>
    <p class="center-link reveal">${button("See all work", "/work", { variant: "ghost", ic: "arrow" })}</p>
  </div>
</section>

${enquirySection({
  formId: "form-water",
  category: "water",
  eyebrow: "Enquiry",
  title: "Enquire About an RO Plant",
  lead: "Select your product and capacity and tell us where it’s needed. We’ll reply with a quote or next steps.",
  submitLabel: "Request a Quote",
  side: `<div class="btn-stack">${wa}${cfg.instagramUrl ? button("Follow on Instagram", cfg.instagramUrl, { variant: "ghost", ic: "instagram" }) : `<p class="handle">${icon("instagram", { size: 18 })} Instagram: <strong>${esc(cfg.instagramHandle)}</strong></p>`}</div>`,
})}

${faqList(faqs)}
${otherVentures("shree-matha-enterprises")}`;
  },
};
