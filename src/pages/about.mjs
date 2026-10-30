import { site } from "../site.config.mjs";
import { ventures } from "../data/ventures.mjs";
import { icon } from "../lib/icons.mjs";
import { button, sectionHead, ctaBand, esc, breadcrumb } from "../lib/components.mjs";

export const page = {
  path: "/about",
  title: "About Sid: Web Developer, Entrepreneur and Business Creator",
  description:
    "About Sid: a BE Computer Science graduate from Huvinahadagali, Karnataka, building websites and running small ventures in water treatment, creative gifting, business education and insurance advisory.",
  render() {
    return `
<section class="page-hero">
  <div class="container">
    ${breadcrumb([{ label: "Home", href: "/" }, { label: "About" }])}
    <p class="eyebrow">About me</p>
    <h1>Hi, I’m Sid.</h1>
    <p class="lead">An entrepreneur, web developer and business content creator from ${esc(site.location)}. I build websites, run a few small ventures and help beginners understand business.</p>
  </div>
</section>

<section class="section">
  <div class="container two-col">
    <div class="prose reveal">
      <h2>Professional background</h2>
      <p>I hold a Bachelor of Engineering in Computer Science (BE CSE). That training gave me a solid base in how software works, and I’ve applied it to practical, real-world work rather than only theory.</p>
      <p>Today I work across technology and small business. I build websites for people and businesses, and I also run ventures in water purification and equipment, handmade gifting, and business education, alongside an advisory role in life insurance.</p>

      <h2>Web development</h2>
      <p>My technical interests centre on WordPress development, React and frontend development, business websites and landing pages, and the digital marketing side of online businesses. I like sites that load fast, read clearly on a phone and make it easy for a visitor to take the next step.</p>
      <p>This is the work I offer through <a href="/ventures/pixelvows">Sid’s PixelVows</a>.</p>

      <h2>Entrepreneurial activities</h2>
      <p>I enjoy building small businesses from the ground up: understanding the customer, keeping costs realistic and being honest about what works. Each venture below serves a different audience with its own services.</p>
    </div>
    <aside class="side-card reveal" aria-label="At a glance">
      <h2>At a glance</h2>
      <dl class="facts">
        <div><dt>Based in</dt><dd>${esc(site.location)}</dd></div>
        <div><dt>Education</dt><dd>BE Computer Science</dd></div>
        <div><dt>Web skills</dt><dd>WordPress, React, landing pages, business websites</dd></div>
        <div><dt>Ventures</dt><dd>Five, each with its own page</dd></div>
        <div><dt>Content</dt><dd>Business education in Kannada</dd></div>
      </dl>
    </aside>
  </div>
</section>

<section class="section section-sand" aria-labelledby="my-ventures">
  <div class="container">
    ${sectionHead({ eyebrow: "My ventures", title: '<span id="my-ventures">What I’m building</span>', lead: "A short look at each, with a link to the full page." })}
    <div class="venture-rows">
      ${ventures
        .map(
          (v) => `<a class="venture-row reveal" data-accent="${v.accent}" href="${v.path}">
        <span class="vc-icon">${icon(v.icon, { size: 24 })}</span>
        <span class="vr-text"><strong>${esc(v.name)}</strong><span>${esc(v.category)}</span></span>
        <span class="vr-go">${icon("arrow", { size: 18 })}<span class="sr-only">Open ${esc(v.name)}</span></span>
      </a>`
        )
        .join("")}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="approach">
  <div class="container two-col">
    <div class="reveal">
      ${sectionHead({ eyebrow: "Approach", title: '<span id="approach">Solving practical problems</span>' })}
      <ol class="steps">
        <li><strong>Listen first.</strong> I start with what you actually need, not what is easiest to sell.</li>
        <li><strong>Keep it simple.</strong> The simplest solution that does the job well usually wins.</li>
        <li><strong>Be upfront.</strong> Clear scope, honest timelines, and a straight answer when something isn’t a fit.</li>
        <li><strong>Follow through.</strong> Ship, test, and improve based on how it really performs.</li>
      </ol>
    </div>
    <div class="reveal">
      ${sectionHead({ eyebrow: "Values", title: "What guides the work", level: 2 })}
      <ul class="values">
        <li>${icon("eye", { size: 22 })}<div><strong>Transparency</strong><span>No inflated claims or hidden steps.</span></div></li>
        <li>${icon("wrench", { size: 22 })}<div><strong>Practical execution</strong><span>Focus on results that work in the real world.</span></div></li>
        <li>${icon("rocket", { size: 22 })}<div><strong>Continuous learning</strong><span>Always improving skills and methods.</span></div></li>
        <li>${icon("heart", { size: 22 })}<div><strong>Customer focus</strong><span>Decisions made around the people served.</span></div></li>
      </ul>
    </div>
  </div>
</section>

${ctaBand({
  title: "Let’s talk about what you’re building",
  text: "Whether it’s a website, equipment, a business idea or a gift, send an enquiry and I’ll get back to you.",
  actions: button("Contact me", "/contact#enquiry", { variant: "light", ic: "arrow", size: "lg" }) + button("Explore ventures", "/ventures", { variant: "outline-light", size: "lg" }),
})}`;
  },
};
