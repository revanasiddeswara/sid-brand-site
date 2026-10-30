import { site } from "../../site.config.mjs";
import { icon } from "../../lib/icons.mjs";
import { button, sectionHead, projectCard, faqList, disclaimer, socialLinks, esc } from "../../lib/components.mjs";
import { ventureHero, enquirySection, otherVentures } from "../../lib/venture.mjs";
import { projects } from "../../data/projects.mjs";

const cfg = site.ventures.pixelvows;

const services = [
  { icon: "layout", t: "Business website development", d: "A clear, professional site that explains what you do, builds trust and makes it easy to enquire." },
  { icon: "rocket", t: "Landing page development", d: "A focused page for one product, service or campaign, with a single clear action." },
  { icon: "code", t: "WordPress website development", d: "WordPress sites you can edit yourself, set up with a tidy structure and sensible plugins." },
  { icon: "code", t: "React frontend development", d: "Custom, fast frontends for sites and interfaces that need more flexibility than a template." },
  { icon: "briefcase", t: "Portfolio websites", d: "Show your work and background clearly, whether you’re a freelancer, creator or professional." },
  { icon: "gift", t: "E-commerce website development", d: "Online catalogues and shops, with the ordering and payment approach agreed up front." },
  { icon: "book", t: "School and educational institution websites", d: "Information-rich sites for schools and institutions: admissions, programmes, notices and contact." },
  { icon: "wrench", t: "Website redesign", d: "Refresh an outdated website with better structure, clarity and mobile experience." },
  { icon: "layout", t: "Responsive website development", d: "Layouts that work properly on phones, tablets and desktops." },
  { icon: "wrench", t: "Maintenance and improvement", d: "Ongoing updates, fixes and improvements as agreed with you." },
  { icon: "target", t: "Basic on-page SEO setup", d: "Page titles, descriptions, headings and structure so search engines can understand your site." },
  { icon: "eye", t: "Content and structure planning", d: "A sitemap and content plan before design starts, so the site is built around real needs." },
];

const clients = ["Small and medium-sized businesses", "Shops and local service providers", "Freelancers and professionals", "Schools and educational institutions", "Individuals who need a personal or portfolio site", "Business owners moving online"];

const steps = [
  { t: "Understand your requirements", d: "We talk through your business, audience and goals." },
  { t: "Plan the sitemap and content", d: "Decide the pages, what each one says and what visitors should do." },
  { t: "Design the interface", d: "Layout, colours and typography that suit your brand." },
  { t: "Develop the website", d: "Build the pages with clean, maintainable code." },
  { t: "Test responsiveness and functionality", d: "Check phones, tablets and desktops, plus forms and links." },
  { t: "Deploy once hosting and domain are confirmed", d: "Go live after the hosting and domain details are sorted out." },
  { t: "Maintenance or handover", d: "Ongoing support or a clean handover, as agreed." },
];

const faqs = [
  { q: "Do you publish prices?", a: "No fixed prices are listed because every project differs in pages, features and content. Share your requirements and you’ll get a quote or a way forward. The budget field in the form is only an indication so the project can be scoped." },
  { q: "WordPress or React: which should I choose?", a: "WordPress suits sites you want to edit yourself, like business sites, blogs and catalogues. A custom React build suits more specific interfaces and performance needs. If you’re unsure, describe your goals and we’ll recommend one." },
  { q: "Do you handle hosting and domain?", a: "Deployment happens after the required hosting and domain details are confirmed. We’ll explain the options and what you need to arrange." },
  { q: "Will my site work on mobile?", a: "Yes. Responsive design and mobile testing are part of the workflow." },
  { q: "Can you redesign my existing website?", a: "Yes. Website redesign is one of the services. Share the current site and what you’d like to improve." },
  { q: "Can I see your previous work?", a: "Confirmed projects appear on the <a href=\"/work\">Work page</a> with clear labels. Anything that is a demo or concept is marked as such, and no client work is listed that hasn’t been confirmed." },
  { q: "Do you offer maintenance after launch?", a: "Yes, as agreed with you: ongoing updates and improvements, or a clean handover so you can manage it yourself." },
];

export const page = {
  path: "/ventures/pixelvows",
  title: "Sid’s PixelVows: Website Development, WordPress and React in Karnataka",
  description:
    "Sid’s PixelVows is a freelance web development brand: business websites, landing pages, WordPress, React, e-commerce, school websites, redesigns and maintenance. Discuss your website project.",
  accent: "pixel",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Sid’s PixelVows",
      description: "Freelance website development and digital solutions.",
      areaServed: "IN",
      serviceType: ["Website development", "WordPress development", "React development", "Landing pages"],
    },
  ],
  render() {
    const web = projects.filter((p) => p.categories.includes("web"));
    const profiles = socialLinks([
      { label: "GitHub", url: cfg.github || site.social.github, icon: "github" },
      { label: "LinkedIn", url: cfg.linkedin || site.social.linkedin, icon: "linkedin" },
      ...cfg.other.map((o) => ({ label: o.label, url: o.url, icon: "external" })),
    ]);
    return `
${ventureHero({
  slug: "pixelvows",
  h1: "Websites built around your business, not a template",
  lead: "Sid’s PixelVows is my freelance web development brand. I design and build business websites, landing pages, WordPress and React projects, and help improve existing sites.",
  actions: `${button("Discuss Your Website Project", "#enquiry", { variant: "primary", ic: "arrow", size: "lg" })}${button("See the workflow", "#workflow", { variant: "ghost", size: "lg" })}`,
  aside: `<div class="aside-card code-card" aria-hidden="true"><span class="dot"></span><span class="dot"></span><span class="dot"></span><pre>&lt;site&gt;
  plan → design
  build → test
  launch → support
&lt;/site&gt;</pre></div>`,
})}

<section class="section" aria-labelledby="what-title">
  <div class="container two-col">
    <div class="prose reveal">
      <p class="eyebrow">What PixelVows does</p>
      <h2 id="what-title">Practical web development for real businesses</h2>
      <p>I build websites that are clear, fast and easy to use on a phone. Each project starts with understanding what your business needs and who your visitors are, then moves through planning, design, development and testing.</p>
      <p>My technical background is a BE in Computer Science, with hands-on work in WordPress and React, and an interest in the digital marketing side of online businesses.</p>
    </div>
    <div class="reveal">${disclaimer("No client portfolio is claimed on this page. Confirmed work is shown on the <a href=\"/work\">Work page</a>, and demos or concepts are clearly labelled.")}${profiles ? `<div class="profile-links"><h3>Professional profiles</h3>${profiles}</div>` : ""}</div>
  </div>
</section>

<section class="section section-sand" aria-labelledby="svc-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Services", title: '<span id="svc-title">What I can build for you</span>' })}
    <div class="grid grid-3">${services.map((s) => `<article class="card mini-card reveal"><div class="vc-icon">${icon(s.icon, { size: 22 })}</div><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></article>`).join("")}</div>
  </div>
</section>

<section class="section" aria-labelledby="clients-title">
  <div class="container two-col">
    <div class="reveal">${sectionHead({ eyebrow: "Who I work with", title: '<span id="clients-title">Clients served</span>', lead: "If you need a website and want a straightforward process, you’re in the right place." })}</div>
    <ul class="checklist reveal">${clients.map((c) => `<li>${icon("check", { size: 18 })} ${esc(c)}</li>`).join("")}</ul>
  </div>
</section>

<section class="section section-sand" id="workflow" aria-labelledby="flow-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Development workflow", title: '<span id="flow-title">From first call to launch</span>', lead: "A simple seven-step process." })}
    <ol class="timeline reveal">${steps.map((s, i) => `<li><span class="tl-num">${i + 1}</span><div><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></div></li>`).join("")}</ol>
  </div>
</section>

<section class="section" aria-labelledby="pf-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Portfolio", title: '<span id="pf-title">Website work</span>', lead: "Verified work and demos are labelled separately. Nothing here is invented." })}
    <div class="grid grid-3">${web.map(projectCard).join("")}</div>
    <p class="center-link reveal">${button("See the full portfolio", "/work", { variant: "ghost", ic: "arrow" })}</p>
  </div>
</section>

${enquirySection({
  formId: "form-web",
  category: "web",
  title: "Discuss Your Website Project",
  lead: "Tell me what you’re planning. Share the type of site, the features you expect and an approximate budget, and I’ll respond with questions or a way forward.",
  submitLabel: "Send project enquiry",
})}

${faqList(faqs)}
${otherVentures("pixelvows")}`;
  },
};
