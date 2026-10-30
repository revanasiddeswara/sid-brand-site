import { site } from "../site.config.mjs";
import { enquiryCategories, ventureBySlug } from "../data/ventures.mjs";
import { icon } from "../lib/icons.mjs";
import { button, breadcrumb, enquiryForm, whatsappButton, socialLinks, esc, disclaimer } from "../lib/components.mjs";

export const page = {
  path: "/contact",
  title: "Contact: Send an Enquiry for Websites, RO Plants, Business Plans, Gifts or Insurance",
  description:
    "Contact Sid in Huvinahadagali, Karnataka. Choose your enquiry type (website, RO plant, business plan, RJ Creativity product, insurance consultation or general) and the form adapts to it.",
  render() {
    const c = site.contact;
    const wa = whatsappButton(c.whatsapp, "Chat on WhatsApp", "Hello Sid, I have an enquiry.");
    const details = [
      c.email ? `<li>${icon("mail", { size: 18 })}<a href="mailto:${esc(c.email)}">${esc(c.email)}</a></li>` : "",
      c.phone ? `<li>${icon("phone", { size: 18 })}<a href="tel:${esc(c.phone.replace(/[^+\d]/g, ""))}">${esc(c.phone)}</a></li>` : "",
      `<li>${icon("pin", { size: 18 })}<span>${esc(site.location)}</span></li>`,
    ].join("");
    const socials = socialLinks([
      { label: "RJ Creativity on Instagram", url: site.ventures.rjCreativity.instagramUrl, icon: "instagram" },
      { label: "Kannada Business Adda on Instagram", url: site.ventures.kannadaBusinessAdda.instagramUrl, icon: "instagram" },
      { label: "Shree Matha Enterprises on Instagram", url: site.ventures.shreeMatha.instagramUrl, icon: "instagram" },
      { label: "YouTube", url: site.social.youtube || site.ventures.kannadaBusinessAdda.youtubeUrl, icon: "youtube" },
      { label: "GitHub", url: site.social.github, icon: "github" },
      { label: "LinkedIn", url: site.social.linkedin, icon: "linkedin" },
    ]);

    return `
<section class="page-hero">
  <div class="container">
    ${breadcrumb([{ label: "Home", href: "/" }, { label: "Contact" }])}
    <p class="eyebrow">Contact</p>
    <h1>Let’s talk about what you need</h1>
    <p class="lead">Choose the kind of enquiry and the form will ask only what’s relevant. Each type is handled by the venture that serves it.</p>
  </div>
</section>

<section class="section tight" aria-labelledby="routes-title">
  <div class="container">
    <h2 id="routes-title" class="mini-title">What is your enquiry about?</h2>
    <div class="grid grid-6">
      ${enquiryCategories
        .map((e) => {
          const v = e.venture ? ventureBySlug[e.venture] : null;
          return `<a class="card route-card reveal" href="/contact?category=${e.id}#enquiry" data-route="${e.id}"${v ? ` data-accent="${v.accent}"` : ""}>
        <span class="vc-icon">${icon(e.icon, { size: 22 })}</span>
        <strong>${esc(e.label)}</strong>
        <span>${esc(e.blurb)}</span>
        <span class="chip">${v ? esc(v.name) : "Sid"}</span>
      </a>`;
        })
        .join("")}
    </div>
  </div>
</section>

<section class="section section-sand" id="enquiry" aria-labelledby="enquiry-title">
  <div class="container enquiry-wrap">
    <div class="enquiry-side reveal">
      <p class="eyebrow">Enquiry form</p>
      <h2 id="enquiry-title">Send an enquiry</h2>
      <p class="lead">Fields change depending on the type of enquiry you choose.</p>
      <ul class="contact-list">${details}</ul>
      ${wa ? `<div class="btn-stack">${wa}</div>` : ""}
      ${socials}
      ${disclaimer("For insurance enquiries, please don’t share sensitive personal or financial details such as Aadhaar, PAN, bank or card numbers.")}
    </div>
    <div class="form-card reveal">${enquiryForm({ id: "form-contact", category: "", submitLabel: "Send enquiry" })}</div>
  </div>
</section>`;
  },
};
