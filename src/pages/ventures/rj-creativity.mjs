import { site } from "../../site.config.mjs";
import { icon } from "../../lib/icons.mjs";
import { button, sectionHead, faqList, disclaimer, whatsappButton, esc } from "../../lib/components.mjs";
import { ventureHero, enquirySection, otherVentures } from "../../lib/venture.mjs";

const cfg = site.ventures.rjCreativity;

// Decorative flower illustration used for image placeholders (clearly labelled as samples).
function flowerArt(hue, variant) {
  const petals = Array.from({ length: variant === "rose" ? 8 : 6 }, (_, i) => {
    const a = (360 / (variant === "rose" ? 8 : 6)) * i;
    return `<ellipse cx="60" cy="36" rx="${variant === "rose" ? 13 : 11}" ry="${variant === "rose" ? 19 : 24}" transform="rotate(${a} 60 60)" fill="${hue}" fill-opacity="${variant === "rose" ? 0.78 : 0.88}"/>`;
  }).join("");
  const center = variant === "rose" ? `<circle cx="60" cy="60" r="14" fill="#9D2D60" fill-opacity=".55"/><circle cx="60" cy="60" r="7" fill="#7A1F4A" fill-opacity=".6"/>` : `<circle cx="60" cy="60" r="9" fill="#E9D9B4"/>`;
  return `<svg viewBox="0 0 120 150" role="img" aria-hidden="true" focusable="false"><path d="M60 80 C58 105 62 125 60 148" stroke="#4E7A57" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M60 118 C44 112 36 118 32 126 C46 128 56 126 60 118z" fill="#6A9A6F"/>${petals}${center}</svg>`;
}

const categories = [
  { t: "Artificial flower bouquets", d: "Long-lasting bouquets in a range of styles.", hue: "#E26A9A", v: "rose" },
  { t: "Pink rose bouquets", d: "Soft pink rose arrangements.", hue: "#F08DB4", v: "rose" },
  { t: "Pipe-cleaner flowers", d: "Handcrafted pipe-cleaner flower arrangements.", hue: "#C96BD1", v: "daisy" },
  { t: "Handmade gifts", d: "Handmade and decorative gifting products.", hue: "#F2A65A", v: "daisy" },
  { t: "Gift-wrapped products", d: "Wrapped and ready to give.", hue: "#7FB7A4", v: "daisy" },
  { t: "Event and celebration gifting", d: "Gifting for birthdays, events and celebrations.", hue: "#E26A9A", v: "rose" },
];

const samples = [
  { t: "Pink rose bouquet", d: "A soft pink rose arrangement.", hue: "#F08DB4", v: "rose" },
  { t: "Mixed artificial flower bouquet", d: "A colourful mix of artificial blooms.", hue: "#E26A9A", v: "rose" },
  { t: "Pipe-cleaner flower arrangement", d: "A handcrafted pipe-cleaner arrangement.", hue: "#C96BD1", v: "daisy" },
  { t: "Handmade gift set", d: "A small handmade decorative gift.", hue: "#F2A65A", v: "daisy" },
  { t: "Gift-wrapped bouquet", d: "A bouquet wrapped for gifting.", hue: "#F08DB4", v: "rose" },
  { t: "Custom bouquet", d: "Designed around your colours and occasion.", hue: "#E26A9A", v: "rose" },
];

const policy = (label, value) =>
  `<div class="policy"><h3>${esc(label)}</h3><p>${value ? esc(value) : "To be confirmed. Please ask when you enquire about your order."}</p></div>`;

const faqs = [
  { q: "How do I order?", a: "Use the order enquiry form on this page, or follow RJ Creativity on Instagram. Tell us the product, quantity, occasion and delivery location and we’ll confirm the details with you." },
  { q: "Can you make a custom bouquet?", a: "Yes. Custom bouquet enquiries are welcome. Share the occasion, colours you like and any ideas, and we’ll discuss what’s possible." },
  { q: "What are the prices?", a: "Prices aren’t listed here. Use the enquiry form and the price for your requirement will be confirmed with you." },
  { q: "Are the products shown on this page real photos?", a: "No. The pictures in the sample gallery are illustrations used as placeholders and are labelled as sample content. They aren’t photographs of actual products." },
  { q: "What about shipping, returns and cancellations?", a: "These policies are still to be confirmed and are shown as pending below. Please ask when you place an enquiry." },
  { q: "Is there an online store?", a: "RJ Creativity has an existing website, linked on this page. You can also enquire here or on Instagram." },
];

export const page = {
  path: "/ventures/rj-creativity",
  title: "RJ Creativity: Handmade Gifts, Artificial Flower Bouquets and Pipe-Cleaner Flowers",
  description:
    "RJ Creativity creates handmade gifts, artificial flower bouquets, pink rose bouquets and pipe-cleaner flower arrangements. Send a custom order enquiry or follow on Instagram.",
  accent: "rj",
  render() {
    const wa = whatsappButton(cfg.whatsapp || site.contact.whatsapp, "Order on WhatsApp", "Hello, I would like to enquire about an RJ Creativity order.", { variant: "whatsapp" });
    return `
${ventureHero({
  slug: "rj-creativity",
  h1: "Handmade gifts and flowers that last",
  lead: "RJ Creativity makes artificial flower bouquets, pink rose bouquets, pipe-cleaner flower arrangements and handmade gifts for birthdays, events and celebrations.",
  actions: `${button("Explore Our Creations", "#creations", { variant: "primary", ic: "arrow", size: "lg" })}${button("Order Enquiry", "#enquiry", { variant: "ghost", size: "lg" })}${button("Follow on Instagram", cfg.instagramUrl, { variant: "ghost", ic: "instagram", size: "lg" })}`,
  aside: `<div class="aside-card bloom" aria-hidden="true"><div class="bloom-flower b1">${flowerArt("#F08DB4", "rose")}</div><div class="bloom-flower b2">${flowerArt("#C96BD1", "daisy")}</div><div class="bloom-flower b3">${flowerArt("#E26A9A", "rose")}</div></div>`,
})}

<section class="section" id="creations" aria-labelledby="cats-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Categories", title: '<span id="cats-title">What we make</span>' })}
    <div class="grid grid-3">${categories
      .map(
        (c) => `<article class="card cat-card reveal"><div class="cat-art">${flowerArt(c.hue, c.v)}</div><h3>${esc(c.t)}</h3><p>${esc(c.d)}</p></article>`
      )
      .join("")}</div>
  </div>
</section>

<section class="section section-sand" aria-labelledby="gallery-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Product gallery", title: '<span id="gallery-title">Sample gallery</span>', lead: "These are <strong>demonstration listings</strong> with illustrated placeholders. They are not photographs of actual products, and prices and availability are confirmed when you enquire." })}
    <div class="grid grid-3">${samples
      .map(
        (s) => `<article class="card product-card reveal">
      <div class="product-media">${flowerArt(s.hue, s.v)}<span class="badge badge-demo">Sample · demonstration content</span></div>
      <div class="product-body"><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p>
        <dl class="product-meta"><div><dt>Price</dt><dd>On enquiry</dd></div><div><dt>Availability</dt><dd>Confirm on enquiry</dd></div></dl>
        <a class="btn btn-ghost btn-sm" href="#enquiry"><span>Enquire about this</span>${icon("arrow", { size: 16 })}</a></div>
    </article>`
      )
      .join("")}</div>
    <p class="center-link reveal">To replace these with real photos, see the README section “Replace images”.</p>
  </div>
</section>

<section class="section" aria-labelledby="details-title">
  <div class="container two-col">
    <div class="prose reveal">
      <p class="eyebrow">Product details</p>
      <h2 id="details-title">Tell us what you have in mind</h2>
      <p>Every piece is handmade, so details vary. When you enquire, it helps to mention:</p>
      <ul class="checklist">
        <li>${icon("check", { size: 18 })} The occasion and date</li>
        <li>${icon("check", { size: 18 })} Colours or flowers you like</li>
        <li>${icon("check", { size: 18 })} Approximate size and quantity</li>
        <li>${icon("check", { size: 18 })} Whether you’d like it gift-wrapped</li>
        <li>${icon("check", { size: 18 })} Where it should be delivered</li>
      </ul>
    </div>
    <div class="reveal">
      <div class="info-card">
        ${icon("gift", { size: 28 })}
        <h3>Gift wrapping</h3>
        <p>Gift-wrapped products are part of the range. Wrapping styles and any extra charges are confirmed when you enquire, so you know exactly what to expect.</p>
      </div>
      <div class="info-card">
        ${icon("flower", { size: 28 })}
        <h3>Custom orders</h3>
        <p>Want a bouquet in particular colours or for an event? Send a custom order enquiry and we’ll discuss what’s possible.</p>
      </div>
    </div>
  </div>
</section>

${enquirySection({
  formId: "form-rj",
  category: "rj",
  eyebrow: "Order enquiry",
  title: "Custom order enquiry",
  lead: "Share the product, quantity, occasion and delivery location. We’ll confirm price, availability and timing with you.",
  submitLabel: "Send order enquiry",
  side: `<div class="btn-stack">${wa}${button("Follow on Instagram", cfg.instagramUrl, { variant: "ghost", ic: "instagram" })}${button("Visit our website", cfg.website, { variant: "ghost", ic: "external" })}</div>`,
})}

<section class="section" aria-labelledby="policies-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Policies", title: '<span id="policies-title">Shipping, delivery, returns and cancellation</span>', lead: "These policies are still being finalised and will be shown here once confirmed." })}
    <div class="grid grid-3 policies reveal">
      ${policy("Shipping and delivery", cfg.policies.shipping)}
      ${policy("Returns and exchanges", cfg.policies.returns)}
      ${policy("Cancellations", cfg.policies.cancellation)}
    </div>
  </div>
</section>

${faqList(faqs)}
${otherVentures("rj-creativity")}`;
  },
};
