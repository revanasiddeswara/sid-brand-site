import { button } from "../lib/components.mjs";
import { ventures } from "../data/ventures.mjs";
import { esc } from "../lib/components.mjs";

export const page = {
  path: "/404",
  file: "404.html",
  title: "Page not found",
  description: "The page you were looking for could not be found.",
  noindex: true,
  render() {
    return `
<section class="page-hero not-found">
  <div class="container center">
    <p class="eyebrow">Error 404</p>
    <h1>This page can’t be found</h1>
    <p class="lead">The link may be wrong or the page may have moved. Let’s get you back on track.</p>
    <div class="btn-row center-row">
      ${button("Back to home", "/", { variant: "primary", ic: "arrow", size: "lg" })}
      ${button("Browse ventures", "/ventures", { variant: "ghost", size: "lg" })}
      ${button("Contact", "/contact", { variant: "ghost", size: "lg" })}
    </div>
    <ul class="nf-links" aria-label="Popular pages">
      ${ventures.map((v) => `<li><a href="${v.path}">${esc(v.name)}</a></li>`).join("")}
    </ul>
  </div>
</section>`;
  },
};
