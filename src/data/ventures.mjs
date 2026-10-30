// Central venture data. Edit copy here; pages read from this file.

export const ventures = [
  {
    slug: "shree-matha-enterprises",
    name: "Shree Matha Enterprises",
    category: "Water Purification and Business Solutions",
    short:
      "Domestic RO purifiers, commercial RO plants, water treatment, solar lighting and related equipment, based in Huvinahadagali.",
    icon: "droplet",
    accent: "shree",
    path: "/ventures/shree-matha-enterprises",
    cta: "Enquire About an RO Plant",
    enquiryCategory: "water",
    audience: "Homes, shops, institutions and industries needing safe water and utility equipment",
  },
  {
    slug: "pixelvows",
    name: "Sid’s PixelVows",
    category: "Web Development",
    short:
      "Freelance web development: business websites, landing pages, WordPress and React builds, redesigns and maintenance.",
    icon: "code",
    accent: "pixel",
    path: "/ventures/pixelvows",
    cta: "Discuss Your Website Project",
    enquiryCategory: "web",
    audience: "Small businesses, professionals, schools and individuals who need a website",
  },
  {
    slug: "kannada-business-adda",
    name: "Kannada Business Adda",
    category: "Business Education",
    short:
      "Business education in Kannada for beginners, plus a personalised business idea and plan enquiry service for small budgets.",
    icon: "book",
    accent: "kba",
    path: "/ventures/kannada-business-adda",
    cta: "Find a Business Idea That Fits You",
    enquiryCategory: "business",
    audience: "First-time entrepreneurs and small business owners, especially Kannada speakers",
  },
  {
    slug: "rj-creativity",
    name: "RJ Creativity",
    category: "Creative Gifting",
    short:
      "Handmade gifts, artificial flower bouquets and pipe-cleaner flower arrangements, with custom bouquet enquiries.",
    icon: "flower",
    accent: "rj",
    path: "/ventures/rj-creativity",
    cta: "Explore Our Creations",
    enquiryCategory: "rj",
    audience: "People looking for handmade gifts and bouquets for birthdays, events and celebrations",
  },
  {
    slug: "insurance-advisory",
    name: "Insurance Advisory",
    category: "Insurance Advisory",
    short:
      "Helping interested customers understand life insurance products and enquire about policy options as a Bajaj Life Insurance advisor.",
    icon: "shield",
    accent: "insurance",
    path: "/ventures/insurance-advisory",
    cta: "Request an Insurance Consultation",
    enquiryCategory: "insurance",
    audience: "Individuals and families who want to understand life insurance options",
  },
];

export const ventureBySlug = Object.fromEntries(ventures.map((v) => [v.slug, v]));

// Enquiry categories used by the Contact page and every enquiry form.
export const enquiryCategories = [
  { id: "web", label: "Website Development", venture: "pixelvows", icon: "code", blurb: "A new website, landing page or redesign." },
  { id: "water", label: "Water Purifier or RO Plant", venture: "shree-matha-enterprises", icon: "droplet", blurb: "Domestic RO, commercial RO plants, treatment or solar products." },
  { id: "business", label: "Business Idea or Business Plan", venture: "kannada-business-adda", icon: "book", blurb: "A business idea that fits your budget and skills." },
  { id: "rj", label: "RJ Creativity Product", venture: "rj-creativity", icon: "flower", blurb: "Bouquets, handmade gifts and custom orders." },
  { id: "insurance", label: "Insurance Consultation", venture: "insurance-advisory", icon: "shield", blurb: "Understand life insurance options with an advisor." },
  { id: "general", label: "General Enquiry", venture: null, icon: "mail", blurb: "Anything else, or not sure where to start." },
];
