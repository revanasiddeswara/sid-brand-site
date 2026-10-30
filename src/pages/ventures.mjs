import { ventures } from "../data/ventures.mjs";
import { ventureCard, ctaBand, button, breadcrumb } from "../lib/components.mjs";

export const page = {
  path: "/ventures",
  title: "Ventures: Water Treatment, Web Development, Business Education, Gifting and Insurance",
  description:
    "Explore Sid’s five ventures: Shree Matha Enterprises, Sid’s PixelVows, Kannada Business Adda, RJ Creativity and Insurance Advisory. Each has its own page and enquiry path.",
  render() {
    return `
<section class="page-hero">
  <div class="container">
    ${breadcrumb([{ label: "Home", href: "/" }, { label: "Ventures" }])}
    <p class="eyebrow">Ventures</p>
    <h1>Five ventures, each with its own purpose</h1>
    <p class="lead">Every venture serves a different audience and has its own services and enquiry path. Choose the one that fits what you need and you’ll land on a page written for that audience.</p>
  </div>
</section>

<section class="section" aria-label="All ventures">
  <div class="container">
    <div class="grid grid-venture grid-venture-lg">${ventures.map((v) => ventureCard(v, { showAudience: true })).join("")}</div>
  </div>
</section>

${ctaBand({
  title: "Not sure which one you need?",
  text: "Send a general enquiry and I’ll point you to the right venture.",
  actions: button("Send an enquiry", "/contact#enquiry", { variant: "light", ic: "arrow", size: "lg" }) + button("See all services", "/services", { variant: "outline-light", size: "lg" }),
})}`;
  },
};
