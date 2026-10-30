import { submitEnquiry } from "./enquiry-api.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
let cfg = {};
try { cfg = JSON.parse($("#site-public")?.textContent || "{}"); } catch { cfg = {}; }

/* ---------- Footer year ---------- */
$$("[data-year]").forEach((el) => (el.textContent = String(new Date().getFullYear())));

/* ---------- Mobile menu ---------- */
const header = $("[data-header]");
const menuBtn = $(".menu-btn");
const mq = window.matchMedia("(min-width: 961px)");
function setMenu(open, { focus = false } = {}) {
  if (!header || !menuBtn) return;
  header.classList.toggle("nav-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  if (!open && focus) menuBtn.focus();
}
menuBtn?.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
$$("#primary-nav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuBtn?.getAttribute("aria-expanded") === "true") setMenu(false, { focus: true });
});
mq.addEventListener("change", (e) => { if (e.matches) setMenu(false); });

/* ---------- Ventures dropdown (desktop) ---------- */
const dd = $(".has-dd");
if (dd) {
  const toggle = $(".dd-toggle", dd);
  const set = (open) => { dd.classList.toggle("open", open); toggle.setAttribute("aria-expanded", String(open)); };
  toggle.addEventListener("click", () => set(!dd.classList.contains("open")));
  dd.addEventListener("mouseenter", () => mq.matches && set(true));
  dd.addEventListener("mouseleave", () => mq.matches && set(false));
  dd.addEventListener("focusout", (e) => { if (!dd.contains(e.relatedTarget)) set(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && dd.classList.contains("open")) { set(false); toggle.focus(); } });
  document.addEventListener("click", (e) => { if (!dd.contains(e.target)) set(false); });
}

/* ---------- Reveal on scroll ---------- */
const reveals = $$(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }),
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-in"));
}

/* ---------- Portfolio filter ---------- */
const bar = $("[data-filter-bar]");
if (bar) {
  const items = $$("[data-portfolio] .project-card");
  const count = $("[data-filter-count]");
  const empty = $("[data-empty]");
  const apply = (f) => {
    let shown = 0;
    items.forEach((it) => {
      const ok = f === "all" || it.dataset.cats.split(" ").includes(f);
      it.hidden = !ok;
      if (ok) shown++;
    });
    $$("button", bar).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === f)));
    const label = f === "all" ? "" : ` in “${$(`[data-filter="${f}"]`, bar).textContent}”`;
    count.textContent = shown ? `Showing ${shown} project${shown === 1 ? "" : "s"}${label}` : "No projects found";
    empty.hidden = shown !== 0;
  };
  bar.addEventListener("click", (e) => { const b = e.target.closest("button[data-filter]"); if (b) apply(b.dataset.filter); });
  const initial = new URLSearchParams(location.search).get("filter");
  if (initial && $(`[data-filter="${initial}"]`, bar)) apply(initial);
}

/* ---------- Enquiry forms ---------- */
const CATEGORY_LABELS = {
  web: "Website Development",
  water: "Water Purifier or RO Plant",
  business: "Business Idea or Business Plan",
  rj: "RJ Creativity Product",
  insurance: "Insurance Consultation",
  general: "General Enquiry",
};
const GROUPS = ["water", "web", "business", "rj", "insurance"];
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function initForm(form) {
  const catField = form.elements.category; // <select> or hidden input
  const status = $("[data-status]", form);
  const submit = $("[data-submit]", form);
  const label = $(".btn-label", submit);
  const openedAt = Date.now();
  form.elements._opened.value = String(openedAt);

  const visibleFields = () => $$(".field", form).filter((f) => !f.closest(".group-fields[hidden]"));

  function showGroup(cat) {
    $$(".group-fields", form).forEach((g) => (g.hidden = g.dataset.group !== cat));
  }
  function setCategory(cat, { quiet = false } = {}) {
    const valid = cat && CATEGORY_LABELS[cat] ? cat : "";
    if (catField.tagName === "SELECT") catField.value = valid;
    showGroup(valid);
    $$(".route-card").forEach((c) => c.classList.toggle("is-selected", c.dataset.route === valid));
    if (!quiet) clearStatus();
  }

  function setError(field, msg) {
    const input = $("input,select,textarea", field);
    const err = $(".err", field);
    field.classList.toggle("invalid", !!msg);
    if (err) err.textContent = msg || "";
    if (input) input.setAttribute("aria-invalid", msg ? "true" : "false");
  }

  function validateField(field) {
    const input = $("input,select,textarea", field);
    if (!input) return "";
    const name = input.name;
    const val = (input.value || "").trim();
    const required = input.dataset.required === "true";
    let msg = "";
    if (required && !val) {
      msg = input.tagName === "SELECT" ? "Please choose an option." : "This field is required.";
      if (name === "name") msg = "Please enter your name.";
      if (name === "email") msg = "Please enter your email address.";
      if (name === "message") msg = "Please tell us a little about what you need.";
    } else if (val) {
      if (name === "name" && val.length < 2) msg = "Please enter your full name.";
      if (name === "email" && !emailRe.test(val)) msg = "Enter a valid email address, like name@example.com.";
      if (name === "phone") {
        const digits = val.replace(/\D/g, "");
        if (!/^[+\d\s()-]+$/.test(val) || digits.length < 8 || digits.length > 15) msg = "Enter a valid phone number (8 to 15 digits).";
      }
      if (name === "message" && val.length < 10) msg = "Please write at least a short sentence (10 characters).";
      if (name === "quantity" && (!/^\d+$/.test(val) || Number(val) < 1)) msg = "Enter a whole number of 1 or more.";
    }
    if (!msg && name === "phone" && !val) {
      const m = form.elements.contactMethod?.value;
      if (m === "Phone call" || m === "WhatsApp") msg = `Add a phone number so we can contact you by ${m === "WhatsApp" ? "WhatsApp" : "phone"}.`;
    }
    setError(field, msg);
    return msg;
  }

  function validateAll() {
    const invalid = [];
    if (catField.tagName === "SELECT" && !catField.value) {
      setError(catField.closest(".field"), "Please choose what your enquiry is about.");
      invalid.push(catField.closest(".field"));
    }
    visibleFields().forEach((f) => {
      if (f === catField.closest?.(".field")) return;
      if (validateField(f)) invalid.push(f);
    });
    return invalid;
  }

  function clearStatus() { status.innerHTML = ""; }
  function say(kind, html) {
    status.innerHTML = `<div class="is-${kind}">${html}</div>`;
    status.focus({ preventScroll: false });
  }

  function collect() {
    const data = { category: CATEGORY_LABELS[catField.value] || catField.value };
    visibleFields().forEach((f) => {
      const el = $("input,select,textarea", f);
      if (el && el.name !== "category" && (el.value || "").trim()) data[el.name] = el.value.trim();
    });
    data.page = location.pathname;
    return data;
  }

  function waText(d) {
    return Object.entries(d).filter(([k]) => k !== "page").map(([k, v]) => `${k}: ${v}`).join("\n");
  }
  function alternatives(d) {
    const cat = catField.value;
    const num = (cfg.whatsappByCategory && cfg.whatsappByCategory[cat]) || cfg.whatsapp;
    const digits = String(num || "").replace(/\D/g, "");
    if (!digits) return "Please use another contact method listed on this website.";
    const href = `https://wa.me/${digits}?text=${encodeURIComponent("Hello, I have an enquiry.\n\n" + waText(d))}`;
    return `You can send the same details by <a href="${href}" target="_blank" rel="noopener noreferrer">WhatsApp (opens in a new tab)</a>.`;
  }

  // field events
  form.addEventListener("focusout", (e) => {
    const f = e.target.closest?.(".field");
    if (f && !f.closest(".group-fields[hidden]") && f.dataset.touched) validateField(f);
    if (f) f.dataset.touched = "1";
  });
  form.addEventListener("input", (e) => {
    const f = e.target.closest?.(".field");
    if (f && f.classList.contains("invalid")) validateField(f);
  });
  form.addEventListener("change", (e) => {
    if (e.target === catField && catField.tagName === "SELECT") {
      setCategory(catField.value);
      const url = new URL(location.href);
      if (catField.value) url.searchParams.set("category", catField.value); else url.searchParams.delete("category");
      history.replaceState(null, "", url);
    }
    if (e.target.name === "contactMethod") { const p = $('[data-field="phone"]', form); if (p && p.classList.contains("invalid")) validateField(p); }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (submit.disabled) return;
    clearStatus();

    // Spam protection: honeypot + minimum fill time (server-side checks are still recommended).
    if (form.elements.company_website.value) return;
    const min = (cfg.minFillSeconds || 0) * 1000;
    if (Date.now() - openedAt < min) {
      say("info", "<p>That was quick! Please review your details and press send again.</p>");
      return;
    }

    const invalid = validateAll();
    if (invalid.length) {
      const n = invalid.length;
      status.innerHTML = `<div class="is-error"><p>Please fix ${n} field${n === 1 ? "" : "s"} below and try again.</p></div>`;
      $("input,select,textarea", invalid[0])?.focus();
      return;
    }

    const data = collect();
    submit.disabled = true;
    submit.classList.add("is-loading");
    submit.setAttribute("aria-busy", "true");
    label.textContent = cfg.endpoint ? "Sending…" : "Checking…";
    const result = await submitEnquiry(data, cfg);
    submit.disabled = false;
    submit.classList.remove("is-loading");
    submit.removeAttribute("aria-busy");
    label.textContent = submit.dataset.label;

    if (result.status === "sent") {
      say("success", "<p><strong>Thank you. Your enquiry has been sent.</strong></p><p>You’ll hear back using your preferred contact method.</p>");
      const keep = catField.value;
      form.reset();
      form.elements._opened.value = String(Date.now());
      setCategory(form.dataset.fixed === "1" ? form.dataset.initial : keep, { quiet: true });
      $$(".field", form).forEach((f) => { setError(f, ""); delete f.dataset.touched; });
    } else if (result.status === "not-configured") {
      say("info", `<p><strong>Your message has not been sent.</strong></p><p>This enquiry form isn’t connected to an email or messaging service yet, so nothing was delivered. Your details are still in the form. ${alternatives(data)}</p>`);
    } else {
      say("error", `<p><strong>Sorry, we couldn’t send your enquiry.</strong></p><p>Please try again in a moment. Your details are still in the form. ${alternatives(data)}</p>`);
    }
  });

  submit.dataset.label = label.textContent;
  const fromUrl = new URLSearchParams(location.search).get("category");
  if (form.dataset.fixed === "1") setCategory(form.dataset.initial, { quiet: true });
  else setCategory(fromUrl, { quiet: true });
  return { setCategory };
}

const forms = $$("form[data-enquiry]").map((f) => ({ f, api: initForm(f) }));

// Contact page: route cards select the category without a page reload.
$$(".route-card").forEach((card) =>
  card.addEventListener("click", (e) => {
    const target = forms.find((x) => x.f.dataset.fixed !== "1");
    if (!target) return;
    e.preventDefault();
    target.api.setCategory(card.dataset.route);
    const url = new URL(location.href);
    url.searchParams.set("category", card.dataset.route);
    url.hash = "enquiry";
    history.replaceState(null, "", url);
    $("#enquiry")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    setTimeout(() => $("select[name=category]", target.f)?.focus({ preventScroll: true }), 350);
  })
);
