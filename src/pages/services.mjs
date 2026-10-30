import { serviceGroups } from "../data/services.mjs";
import { serviceGroup, ctaBand, button, breadcrumb, disclaimer } from "../lib/components.mjs";
import { icon } from "../lib/icons.mjs";

export const page = {
  path: "/services",
  title: "Services: Web Development, RO Plants, Business Guidance, Gifting and Insurance Enquiries",
  description:
    "All services across Sid’s ventures: website development, RO plants and water treatment, solar and CCTV equipment, business idea guidance, handmade gifts and life insurance enquiries. Request a quote.",
  render() {
    return `
<section class="page-hero">
  <div class="container">
    ${breadcrumb([{ label: "Home", href: "/" }, { label: "Services" }])}
    <p class="eyebrow">Services</p>
    <h1>Services across five ventures</h1>
    <p class="lead">Each service is delivered by a specific venture, named on every card below. No prices are listed. Use “Request a Quote”, “Discuss Your Requirements” or “Enquire Now” to get started.</p>
    <ul class="jump-links" aria-label="Jump to a service category">
      ${serviceGroups.map((g) => `<li><a href="#${g.id}">${icon(g.icon, { size: 16 })} ${g.title}</a></li>`).join("")}
    </ul>
  </div>
</section>

<div class="container services-stack">
  ${serviceGroups.map(serviceGroup).join("")}
  <div class="reveal">${disclaimer("These ventures are separate. Services are provided by the venture named on each card, not by a single company. Insurance information is general; official policy documents govern all policy terms. Business ideas are recommendations, not guarantees.")}</div>
</div>

${ctaBand({
  title: "Not sure which service you need?",
  text: "Describe what you’re trying to do and I’ll point you to the right venture.",
  actions: button("Send a general enquiry", "/contact?category=general#enquiry", { variant: "light", ic: "arrow", size: "lg" }) + button("Browse ventures", "/ventures", { variant: "outline-light", size: "lg" }),
})}`;
  },
};
