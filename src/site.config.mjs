// ============================================================================
// SITE CONFIGURATION: the one file you edit to add your real details.
// ----------------------------------------------------------------------------
// - Leave a value as "" until you have the real one. Anything empty is simply
//   not shown on the website (no fake numbers, no guessed links).
// - Lines marked TODO are waiting for you.
// - NEVER put secrets (API keys, passwords) in this file. It is public.
// ============================================================================

export const site = {
  // ---- Identity ------------------------------------------------------------
  displayName: "Sid",
  introduction:
    "Entrepreneur, web developer and business content creator from Huvinahadagali, Karnataka. I build practical businesses and digital experiences.",
  location: "Huvinahadagali, Karnataka, India",
  locality: "Huvinahadagali",
  region: "Karnataka",
  country: "IN",

  // ---- Domain (used for canonical URLs, Open Graph, sitemap) ---------------
  // TODO: add your real domain, e.g. "https://www.yourdomain.in" (no trailing slash).
  // You can also set it at build time:  SITE_DOMAIN=https://yourdomain.in npm run build
  domain: "",

  // ---- Personal contact details (TODO: fill in) ----------------------------
  contact: {
    email: "", // TODO e.g. "name@example.com"
    phone: "", // TODO e.g. "+91 9XXXXXXXXX" (shown on the Contact page)
    whatsapp: "", // TODO digits only with country code, e.g. "919XXXXXXXXX"
  },

  // ---- Personal / professional profiles (TODO: fill in) --------------------
  social: {
    instagram: "", // TODO personal Instagram URL
    youtube: "", // TODO YouTube channel URL (Kannada Business Adda)
    github: "", // TODO GitHub profile URL
    linkedin: "", // TODO LinkedIn profile URL
  },

  // ---- Per-venture details -------------------------------------------------
  ventures: {
    shreeMatha: {
      instagramHandle: "@shree_matha_enterprises", // known
      instagramUrl: "", // TODO exact profile URL (not guessed)
      phone: "", // TODO business phone
      whatsapp: "", // TODO business WhatsApp, digits only with country code
      email: "", // TODO business email
      address: "", // TODO full address (only shown when you add it)
    },
    pixelvows: {
      github: "", // TODO falls back to personal GitHub if empty
      linkedin: "", // TODO falls back to personal LinkedIn if empty
      other: [], // TODO e.g. [{ label: "Behance", url: "https://..." }]
    },
    kannadaBusinessAdda: {
      instagramUrl: "", // TODO Instagram profile URL
      youtubeUrl: "", // TODO YouTube channel URL
    },
    rjCreativity: {
      website: "https://rj-creativity-bloom.lovable.app/", // known
      instagramUrl: "https://www.instagram.com/rj_creativity__/", // known
      whatsapp: "", // TODO RJ Creativity WhatsApp, digits only
      // Policies are placeholders until you decide them.
      policies: {
        shipping: "", // TODO write your shipping / delivery policy
        returns: "", // TODO write your return / exchange policy
        cancellation: "", // TODO write your cancellation policy
      },
    },
    insurance: {
      company: "Bajaj Life Insurance",
      // TODO optional: your advisor registration / licence details exactly as issued.
      // Shown in the page footer note only if you fill it in.
      advisorRegistration: "",
    },
  },

  // ---- Enquiry form backend ------------------------------------------------
  // The form is NOT connected to any backend until you set `endpoint`.
  // See README.md > "Connect the enquiry form" for step by step options.
  // Only put a PUBLIC endpoint URL here. Never an API key or secret.
  form: {
    endpoint: "", // TODO e.g. a Formspree / Web3Forms / your own serverless URL
    method: "POST",
    minFillSeconds: 4, // spam check: submissions faster than this are ignored
  },
};
