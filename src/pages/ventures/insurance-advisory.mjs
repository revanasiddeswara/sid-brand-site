import { site } from "../../site.config.mjs";
import { icon } from "../../lib/icons.mjs";
import { button, sectionHead, faqList, disclaimer, esc } from "../../lib/components.mjs";
import { ventureHero, enquirySection, otherVentures } from "../../lib/venture.mjs";

const cfg = site.ventures.insurance;

const faqs = [
  { q: "What is life insurance?", a: "In general terms, life insurance is a contract in which an insurer agrees to pay a defined amount to a nominated person or persons under the conditions set out in the policy. What a specific policy offers depends entirely on its official terms." },
  { q: "Are returns guaranteed?", a: "Nothing is promised here. Whether a particular product has guaranteed benefits depends on that product’s official terms, which should be read in full before you decide." },
  { q: "Can you tell me which policy is best for me?", a: "Suitability depends on your individual needs and the applicable policy terms. An advisor can help you understand relevant products and the questions to ask, but the official policy documents are what govern the policy." },
  { q: "What will you ask me for in the enquiry form?", a: "Only basic contact details, your preferred contact method and a suitable time. Please don’t share sensitive financial or personal details through this form, such as Aadhaar, PAN, bank or card numbers or health records." },
  { q: "Are the benefits, premiums and eligibility listed here?", a: "No. This page is general information and deliberately does not list benefits, premiums or eligibility rules. Those are set out in the official documents for each product." },
  { q: "Does this page replace the policy document?", a: "No. Actual benefits, exclusions, charges and conditions are governed by the official policy documents." },
];

export const page = {
  path: "/ventures/insurance-advisory",
  title: "Insurance Advisory: Understand Life Insurance Options with a Bajaj Life Insurance Advisor",
  description:
    "Sid is a Bajaj Life Insurance advisor helping interested customers understand life insurance products and enquire about policy options. General information only. Request a consultation.",
  accent: "insurance",
  render() {
    return `
${ventureHero({
  slug: "insurance-advisory",
  h1: "Understand your life insurance options before you decide",
  lead: `I’m a ${esc(cfg.company)} advisor. I help interested customers understand relevant life insurance products and enquire about policy options. Request a conversation and ask your questions.`,
  actions: `${button("Request an Insurance Consultation", "#enquiry", { variant: "primary", ic: "arrow", size: "lg" })}${button("Read the basics", "#why", { variant: "ghost", size: "lg" })}`,
  aside: `<div class="aside-card"><h2>Please note</h2><p>This page offers general information only. Official policy documents govern benefits, exclusions, charges and conditions.</p></div>`,
})}

<section class="section" aria-labelledby="intro-title">
  <div class="container two-col">
    <div class="prose reveal">
      <p class="eyebrow">Introduction</p>
      <h2 id="intro-title">Insurance advisory, in plain language</h2>
      <p>Insurance can feel complicated. As an advisor for ${esc(cfg.company)}, my role is to help you understand the products that may be relevant to you, answer your questions and explain how to enquire about policy options.</p>
      <p>I won’t pressure you or promise returns. The goal is that you understand what you’re looking at before making a decision.</p>
    </div>
    <div class="reveal">${disclaimer("Policy suitability depends on individual needs and the applicable policy terms. Actual benefits, exclusions, charges and conditions are governed by the official policy documents.", { tone: "warn" })}</div>
  </div>
</section>

<section class="section section-sand" id="why" aria-labelledby="why-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Why it matters", title: '<span id="why-title">Why life insurance planning matters</span>', lead: "A general explanation of protection and financial planning." })}
    <div class="grid grid-3">
      <article class="card mini-card reveal"><div class="vc-icon">${icon("shield", { size: 22 })}</div><h3>Protection for people who depend on you</h3><p>Life insurance is generally about financial protection for the people who rely on your income, according to the terms of the policy you choose.</p></article>
      <article class="card mini-card reveal"><div class="vc-icon">${icon("target", { size: 22 })}</div><h3>Part of wider financial planning</h3><p>It’s one piece of planning alongside savings, expenses and goals. What suits one person may not suit another.</p></article>
      <article class="card mini-card reveal"><div class="vc-icon">${icon("book", { size: 22 })}</div><h3>Understanding before deciding</h3><p>Reading the official terms, and asking questions about anything unclear, helps you make a decision that fits your needs.</p></article>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="help-title">
  <div class="container two-col">
    <div class="reveal">${sectionHead({ eyebrow: "How I can help", title: '<span id="help-title">What an advisory conversation covers</span>' })}</div>
    <ul class="checklist reveal">
      <li>${icon("check", { size: 18 })} Explaining relevant life insurance products in simple terms</li>
      <li>${icon("check", { size: 18 })} Answering your questions about policy options</li>
      <li>${icon("check", { size: 18 })} Pointing you to the official policy documents to read</li>
      <li>${icon("check", { size: 18 })} Helping you enquire about the next steps</li>
    </ul>
  </div>
</section>

${enquirySection({
  formId: "form-insurance",
  category: "insurance",
  eyebrow: "Consultation",
  title: "Request an Insurance Consultation",
  lead: "Share your contact details, how you’d like to be contacted and a suitable time. Please do not include sensitive personal or financial information.",
  submitLabel: "Request a consultation",
})}

${faqList(faqs)}

<section class="section" aria-label="Important information">
  <div class="container narrow">
    ${disclaimer(`<strong>Disclaimer:</strong> The information on this page is general and does not replace official policy documents. Actual benefits, exclusions, charges and conditions are governed by the official policy documents of ${esc(cfg.company)}. Policy suitability depends on individual needs and the applicable policy terms.${cfg.advisorRegistration ? " " + esc(cfg.advisorRegistration) : ""}`)}
  </div>
</section>
${otherVentures("insurance-advisory")}`;
  },
};
