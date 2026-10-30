import { site } from "../../site.config.mjs";
import { icon } from "../../lib/icons.mjs";
import { button, sectionHead, faqList, disclaimer, esc } from "../../lib/components.mjs";
import { ventureHero, enquirySection, otherVentures } from "../../lib/venture.mjs";

const cfg = site.ventures.kannadaBusinessAdda;
const youtube = cfg.youtubeUrl || site.social.youtube;

const audience = [
  "First-time entrepreneurs",
  "People who want to start a small business",
  "Individuals with limited investment",
  "Small business owners looking for practical ideas",
  "Kannada-speaking audiences interested in entrepreneurship",
];

const topics = [
  { t: "Business ideas for beginners", ic: "target" },
  { t: "Small-investment business ideas", ic: "briefcase" },
  { t: "Business planning", ic: "book" },
  { t: "Customer acquisition", ic: "rocket" },
  { t: "Sales and marketing", ic: "layout" },
  { t: "Pricing and profit fundamentals", ic: "check" },
  { t: "Customer retention", ic: "heart" },
  { t: "Common business mistakes", ic: "alert" },
  { t: "Entrepreneurship case studies", ic: "eye" },
  { t: "Business lessons in Kannada", ic: "book" },
];

const faqs = [
  { q: "Is this a guaranteed way to make money?", a: "No. Business ideas and plans are recommendations based on the information you share. They are not guarantees of profit or success, and results depend on your effort, market and circumstances." },
  { q: "What does the personalised business idea service involve?", a: "You tell us your investment budget, skills, interests, location, available time and preferred business type. Based on that, you receive business idea recommendations and plan guidance." },
  { q: "How much does it cost?", a: "Pricing isn’t finalised yet. Use “Enquire About a Business Plan” and you’ll be told the details when they are confirmed." },
  { q: "What budgets do you consider?", a: "The service is being designed for people with small budgets, with an indicative investment range of ₹5,000 to ₹25,000. This is a starting range, not a limit or a promise." },
  { q: "Do I need business experience?", a: "No. The content and guidance are made for beginners." },
  { q: "Is the content in Kannada?", a: "Yes. Kannada Business Adda is built for Kannada-speaking audiences, and you can write to us in Kannada or English." },
];

export const page = {
  path: "/ventures/kannada-business-adda",
  title: "Kannada Business Adda: Business Education and Business Idea Guidance in Kannada",
  description:
    "Kannada Business Adda shares practical business education in Kannada for beginners, with a personalised business idea and plan enquiry for small budgets. Recommendations, not guarantees.",
  accent: "kba",
  render() {
    const channels = [
      cfg.instagramUrl ? button("Instagram", cfg.instagramUrl, { variant: "ghost", ic: "instagram" }) : "",
      youtube ? button("YouTube", youtube, { variant: "ghost", ic: "youtube" }) : "",
    ].join("");

    return `
${ventureHero({
  slug: "kannada-business-adda",
  h1: "Business, explained simply, in Kannada",
  lead: "Kannada Business Adda helps beginners understand business opportunities and practical business fundamentals, and offers a personalised business idea and plan enquiry for people starting with small budgets.",
  actions: `${button("Find a Business Idea That Fits You", "#enquiry", { variant: "primary", ic: "arrow", size: "lg" })}${button("See what we cover", "#topics", { variant: "ghost", size: "lg" })}`,
  aside: `<div class="aside-card kn-card"><p class="kn" lang="kn">ಕನ್ನಡ ಬಿಸಿನೆಸ್ ಅಡ್ಡಾ</p><p>Practical business learning for first-time entrepreneurs.</p></div>`,
})}

<section class="section" aria-labelledby="mission-title">
  <div class="container two-col">
    <div class="prose reveal">
      <p class="eyebrow">Mission and audience</p>
      <h2 id="mission-title">Making business understandable for beginners</h2>
      <p>Many people want to start a business but don’t know where to begin, or assume they need a lot of money. Kannada Business Adda explains business opportunities and fundamentals in plain Kannada, with a focus on practical steps and small-investment options.</p>
      <p>The goal is simple: help you think clearly about a business, understand the basics and avoid common mistakes.</p>
    </div>
    <div class="reveal">
      <h3 class="mini-title">Who it’s for</h3>
      <ul class="checklist">${audience.map((a) => `<li>${icon("check", { size: 18 })} ${esc(a)}</li>`).join("")}</ul>
    </div>
  </div>
</section>

<section class="section section-sand" id="topics" aria-labelledby="topics-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Content categories", title: '<span id="topics-title">What we talk about</span>', lead: "Business education topics in Kannada." })}
    <div class="grid grid-5">${topics.map((t) => `<article class="card topic-card reveal"><div class="vc-icon">${icon(t.ic, { size: 22 })}</div><h3>${esc(t.t)}</h3></article>`).join("")}</div>
  </div>
</section>

<section class="section" aria-labelledby="social-title">
  <div class="container two-col">
    <div class="reveal">
      ${sectionHead({ eyebrow: "Video and social content", title: '<span id="social-title">Learn on Instagram and YouTube</span>', lead: "Business lessons, ideas and case studies are shared as short videos and posts." })}
      ${channels ? `<div class="btn-row">${channels}</div>` : ""}
    </div>
    <div class="reveal">
      <ul class="content-formats">
        <li>${icon("camera", { size: 22 })}<div><strong>Short videos</strong><span>Quick, practical lessons.</span></div></li>
        <li>${icon("youtube", { size: 22 })}<div><strong>Longer explainers</strong><span>Deeper dives on YouTube.</span></div></li>
        <li>${icon("instagram", { size: 22 })}<div><strong>Posts and reels</strong><span>Ideas and tips on Instagram.</span></div></li>
      </ul>
    </div>
  </div>
</section>

<section class="section section-sand" aria-labelledby="consult-title">
  <div class="container two-col">
    <div class="prose reveal">
      <p class="eyebrow">Business idea consultation</p>
      <h2 id="consult-title">A personalised business idea and plan</h2>
      <p>For people with small budgets, I’m developing a service that recommends business ideas to fit <em>your</em> situation: your investment budget (indicatively ₹5,000 to ₹25,000), your skills and interests, where you live and how much time you can give.</p>
      <p>Pricing hasn’t been finalised yet, so the form below is an enquiry, not a booking or a payment.</p>
    </div>
    <div class="reveal">
      ${disclaimer("<strong>Important:</strong> Business ideas and plans are recommendations, not guarantees of profit or success. Results depend on your effort, market conditions and circumstances.", { tone: "warn" })}
    </div>
  </div>
</section>

${enquirySection({
  formId: "form-biz",
  category: "business",
  eyebrow: "Business plan enquiry",
  title: "Enquire About a Business Plan",
  lead: "Share your budget, skills, interests, location and available time. We’ll get back to you about how the service works.",
  submitLabel: "Enquire About a Business Plan",
})}

${faqList(faqs)}
${otherVentures("kannada-business-adda")}`;
  },
};
