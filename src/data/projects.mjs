// Portfolio data. To add a project, add one object here. No component changes needed.
//
// Fields:
//   id, title, categories[] (water | web | creative | education), description
//   status: "verified" | "online" | "own" | "demo" | "concept" | "pending"
//   image:  path under /assets/img/ (e.g. "/assets/img/projects/hescom.jpg"). Leave "" for a placeholder.
//   imageAlt: describe the real photo when you add one
//   date:   optional, e.g. "March 2025". Leave "" if unknown (never guess).
//   link:   optional URL. details: optional extra text
//   featured: show on the home page
//
// RULE: only list work that is real and confirmed. Mark anything else "demo" or "concept".

export const categoryLabels = {
  water: "Water Treatment Projects",
  web: "Websites and Digital Work",
  creative: "Creative Projects",
  education: "Business Education",
};

export const statusLabels = {
  verified: "Verified project",
  online: "Live online presence",
  own: "Own project",
  demo: "Demo",
  concept: "Concept Project",
  pending: "To be added",
};

export const projects = [
  {
    id: "hescom-500-lph",
    title: "500 LPH Aquaguard RO plant, HESCOM, Hubballi",
    categories: ["water"],
    description: "A 500 LPH Aquaguard RO plant supplied for HESCOM in Hubballi.",
    status: "verified",
    image: "",
    imageAlt: "",
    date: "",
    link: "",
    details: "Photos, date and scope details can be added here once confirmed.",
    featured: true,
    venture: "Shree Matha Enterprises",
  },
  {
    id: "kinnal-2000-lph",
    title: "2,000 LPH RO plant installation, Kinnal, Koppal district",
    categories: ["water"],
    description: "Installation of a 2,000 LPH RO plant at Kinnal in Koppal district.",
    status: "verified",
    image: "",
    imageAlt: "",
    date: "",
    link: "",
    details: "Photos, date and scope details can be added here once confirmed.",
    featured: true,
    venture: "Shree Matha Enterprises",
  },
  {
    id: "rj-creativity-site",
    title: "RJ Creativity website",
    categories: ["creative", "web"],
    description: "The existing online storefront presence for RJ Creativity's handmade gifts and bouquets.",
    status: "online",
    image: "",
    imageAlt: "",
    date: "",
    link: "https://rj-creativity-bloom.lovable.app/",
    details: "",
    featured: true,
    venture: "RJ Creativity",
  },
  {
    id: "brand-site",
    title: "Personal brand and ventures website (this site)",
    categories: ["web"],
    description: "A multi-page website bringing five ventures together, with a separate enquiry path for each.",
    status: "own",
    image: "",
    imageAlt: "",
    date: "",
    link: "",
    details: "Built as a static, dependency-free site with centralised content and configuration.",
    featured: false,
    venture: "Sid’s PixelVows",
  },
  {
    id: "client-site-slot",
    title: "Client website: add your first confirmed project",
    categories: ["web"],
    description:
      "No client website is listed yet. Add confirmed projects in src/data/projects.mjs and they appear here automatically.",
    status: "pending",
    image: "",
    imageAlt: "",
    date: "",
    link: "",
    details: "",
    featured: true,
    venture: "Sid’s PixelVows",
  },
  {
    id: "kba-content",
    title: "Kannada Business Adda content",
    categories: ["education"],
    description: "Business education and entrepreneurship content in Kannada, shared on Instagram and YouTube.",
    status: "online",
    image: "",
    imageAlt: "",
    date: "",
    link: "",
    details: "Channel links appear on the Kannada Business Adda page once added in the site configuration.",
    featured: false,
    venture: "Kannada Business Adda",
  },
];
