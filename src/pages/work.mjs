import { projects, categoryLabels } from "../data/projects.mjs";
import { projectCard, ctaBand, button, breadcrumb, disclaimer } from "../lib/components.mjs";
import { icon } from "../lib/icons.mjs";

export const page = {
  path: "/work",
  title: "Work: RO Plant Projects, Websites and Creative Projects",
  description:
    "Selected work across Sid’s ventures: RO plant projects at HESCOM Hubballi and Kinnal (Koppal), website work and creative projects. Only confirmed work is listed, and demos are labelled.",
  render() {
    const cats = Object.entries(categoryLabels);
    return `
<section class="page-hero">
  <div class="container">
    ${breadcrumb([{ label: "Home", href: "/" }, { label: "Work" }])}
    <p class="eyebrow">Portfolio</p>
    <h1>Work and projects</h1>
    <p class="lead">Only real, confirmed projects are listed here. Where a project is a demo or concept it’s labelled, and where there’s nothing to show yet, it says so.</p>
  </div>
</section>

<section class="section" aria-label="Project portfolio">
  <div class="container">
    <div class="filter-bar reveal" role="group" aria-label="Filter projects by category" data-filter-bar>
      <button type="button" class="chip-btn" data-filter="all" aria-pressed="true">All</button>
      ${cats.map(([id, label]) => `<button type="button" class="chip-btn" data-filter="${id}" aria-pressed="false">${label}</button>`).join("")}
    </div>
    <p class="filter-count" role="status" aria-live="polite" data-filter-count>Showing all ${projects.length} projects</p>
    <div class="grid grid-3 portfolio-grid" data-portfolio>
      ${projects.map(projectCard).join("")}
    </div>
    <p class="empty-state" data-empty hidden>${icon("info", { size: 18 })} No projects in this category yet.</p>
    <div class="reveal portfolio-note">${disclaimer("Photos, dates and links for each project appear here as soon as they are confirmed. No customer reviews, client logos or project statistics are shown unless they are real and supplied.")}</div>
  </div>
</section>

${ctaBand({
  title: "Have a project in mind?",
  text: "Tell me what you need and I’ll get back to you.",
  actions: button("Start an enquiry", "/contact#enquiry", { variant: "light", ic: "arrow", size: "lg" }) + button("View services", "/services", { variant: "outline-light", size: "lg" }),
})}`;
  },
};
