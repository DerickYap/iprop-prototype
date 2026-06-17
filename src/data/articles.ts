import { getProject } from "./projects";

// Shared Unsplash helper, mirroring the `u()` used in projects.ts so article
// imagery matches the rest of the prototype's placeholder sourcing.
const u = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/**
 * A small content-block union for the editorial reading page — same data-driven
 * spirit as the showcase `Section` union in types.ts, scoped to prose.
 */
export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "subhead"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "image"; src: string; caption?: string };

export type ArticleSize = "lead" | "wide" | "tall" | "normal";

/** Editorial sections the Journal is organised into. */
export type Category =
  | "Homeowner Stories"
  | "New Launch Reviews"
  | "Property Trends";

/** Ordered category list + blurb — drives the Journal section headers. */
export const CATEGORIES: { id: Category; blurb: string }[] = [
  {
    id: "Homeowner Stories",
    blurb: "Life inside Singapore’s newest addresses.",
  },
  {
    id: "New Launch Reviews",
    blurb: "Our verdict on the projects just hitting the market.",
  },
  {
    id: "Property Trends",
    blurb: "The forces shaping where and how the island buys.",
  },
];

export type Article = {
  /** URL segment + key: /articles/[slug] */
  slug: string;
  category: Category;
  headline: string; // editorial title, not just the project name
  dek: string; // 1–2 sentence excerpt for cards + reading-page standfirst
  cover: string;
  author: string;
  readMins: number;
  date: string; // display string, e.g. "June 2026"
  publishedAt: string; // sortable ISO date, e.g. "2026-06-10"
  body: ArticleBlock[];
  /** The project this story is about — drives the "View the project" CTA. */
  projectSlug: string;
  /** Mosaic placement hint within its section. */
  size?: ArticleSize;
};

export const articles: Article[] = [
  {
    slug: "marina-view-the-skyline-itself",
    category: "New Launch Reviews",
    headline: "Inside the skyline itself",
    dek: "At Marina View Residences, the bay stops being a view and becomes an address — fifty-one storeys over the financial district.",
    cover: u("photo-1525625293386-3f8f99389edd"),
    author: "Clarissa Tan",
    readMins: 6,
    date: "June 2026",
    publishedAt: "2026-06-10",
    projectSlug: "marina-view-residences",
    size: "lead",
    body: [
      {
        type: "paragraph",
        text: "There are buildings with a view of the city, and then there are the few that the city looks up to. Marina View Residences belongs firmly to the second category. Rising fifty-one storeys above the bay in District 1, IOI Properties' tower places its residents inside the skyline rather than beside it.",
      },
      {
        type: "subhead",
        text: "A brief written by the water",
      },
      {
        type: "paragraph",
        text: "Every principal room faces the bay. It is a simple decision with expensive consequences — orientation here is not an upgrade but the entire premise. At blue hour the financial district performs below, and the interiors, composed in smoked oak and honed marble, are tuned to receive that light rather than compete with it.",
      },
      {
        type: "quote",
        text: "Orientation is the luxury. Everything else is detail.",
        attribution: "Project design lead",
      },
      {
        type: "image",
        src: u("photo-1477959858617-67f85cf4f1df"),
        caption: "Every principal room is turned toward Marina Bay.",
      },
      {
        type: "paragraph",
        text: "A residents' club occupies the 38th floor — a 25-metre infinity pool suspended over the CBD, a lounge behind the glass, and the kind of quiet that only altitude buys. Below, two MRT lines and the waterfront promenade are within a short walk. It is the centre of the centre, sold by the storey.",
      },
    ],
  },
  {
    slug: "the-sora-lakeside-reimagined",
    category: "New Launch Reviews",
    headline: "Lakeside living, reimagined",
    dek: "In the Jurong Lake District, The Sora bets on water, decentralisation and a second CBD in the making.",
    cover: u("photo-1506744038136-46273834b3fb"),
    author: "Priya Nair",
    readMins: 5,
    date: "May 2026",
    publishedAt: "2026-05-08",
    projectSlug: "the-sora",
    size: "tall",
    body: [
      {
        type: "paragraph",
        text: "The Jurong Lake District has been described as Singapore's second CBD for long enough that the phrase risks losing meaning. The Sora is among the projects asking buyers to treat it as fact rather than forecast — and to price the lake accordingly.",
      },
      {
        type: "paragraph",
        text: "CEL Development's tower leans into its setting: water on the doorstep, greenery threaded through the grounds, and layouts planned for light and cross-ventilation. For buyers priced out of the central regions, the proposition is straightforward — a waterfront life at an outside-the-core entry point.",
      },
    ],
  },
  {
    slug: "watten-house-freehold-calm",
    category: "New Launch Reviews",
    headline: "Freehold calm in District 11",
    dek: "Watten House makes the quiet case for permanence in one of Singapore's most established residential pockets.",
    cover: u("photo-1512917774080-9991f1c4c750"),
    author: "Clarissa Tan",
    readMins: 4,
    date: "April 2026",
    publishedAt: "2026-04-22",
    projectSlug: "watten-house",
    size: "normal",
    body: [
      {
        type: "paragraph",
        text: "Freehold land in the prime districts rarely comes to market, and when it does the pitch writes itself. Watten House, a UOL and Singapore Land collaboration off Shelford Road, trades on exactly that scarcity — permanence in a part of town where almost everything is already spoken for.",
      },
      {
        type: "paragraph",
        text: "The architecture is deliberately unshowy: low-rise, generously spaced, and oriented for privacy. This is a project for buyers who measure value in decades rather than launch-day discounts.",
      },
    ],
  },
  {
    slug: "the-continuum-freehold-east-coast",
    category: "New Launch Reviews",
    headline: "Freehold on the East Coast",
    dek: "Two freehold plots, one large-format vision — The Continuum is a rare swing of scale in District 15.",
    cover: u("photo-1545324418-cc1a3fa10c00"),
    author: "Priya Nair",
    readMins: 5,
    date: "March 2026",
    publishedAt: "2026-03-18",
    projectSlug: "the-continuum",
    size: "wide",
    body: [
      {
        type: "paragraph",
        text: "District 15 is beloved and built-out, which makes a freehold site of any real size a genuine event. The Continuum, assembled across two plots on Thiam Siew Avenue, is Hoi Hup and Sunway's bet that East Coast buyers will pay for both tenure and scale in the same address.",
      },
      {
        type: "paragraph",
        text: "The size of the land allows for resort-grade landscaping and facilities that smaller infill plots simply cannot offer — a rare combination of freehold permanence and large-development amenity this close to the city fringe.",
      },
    ],
  },
  {
    slug: "river-modern-life-on-the-water",
    category: "New Launch Reviews",
    headline: "A life that moves with the water",
    dek: "Meridian's River Modern reframes Kallang Riverside as a waterfront neighbourhood, not just a riverbank.",
    cover: u("photo-1582268611958-ebfd161ef9cf"),
    author: "Priya Nair",
    readMins: 6,
    date: "June 2026",
    publishedAt: "2026-06-14",
    projectSlug: "river-modern",
    size: "normal",
    body: [
      {
        type: "paragraph",
        text: "Kallang Riverside has spent years on masterplans as the next great waterfront quarter. River Modern, Meridian Group's flagship, is built as if that future has already arrived — a project that treats the river as its organising idea rather than a backdrop.",
      },
      {
        type: "paragraph",
        text: "Its showcase is a cinematic flythrough rather than a conventional gallery, which suits a development whose pitch is movement: along the water, into the city, between a working day and the life beside it.",
      },
    ],
  },
  {
    slug: "lentor-mansion-estate-in-the-forest",
    category: "Homeowner Stories",
    headline: "An estate that kept the forest",
    dek: "GuocoLand's Lentor Mansion folds a new neighbourhood into existing tree cover instead of clearing it.",
    cover: u("photo-1518495973542-4542c06a5843"),
    author: "Marcus Lim",
    readMins: 5,
    date: "May 2026",
    publishedAt: "2026-05-20",
    projectSlug: "lentor-mansion",
    size: "wide",
    body: [
      {
        type: "paragraph",
        text: "Lentor has spent the last few years turning from a quiet landed enclave into one of the island's most closely watched growth corridors. Lentor Mansion is GuocoLand's answer to the obvious risk of that transformation: how to add density without erasing what made the address desirable in the first place.",
      },
      {
        type: "paragraph",
        text: "The masterplan threads blocks through existing tree cover rather than levelling it, and a central green spine carries through the estate. The result reads less like a development dropped onto a site and more like a neighbourhood that grew around the canopy already there.",
      },
      {
        type: "quote",
        text: "We designed around the trees, not the other way around.",
      },
    ],
  },
  {
    slug: "parktown-residence-tampines-heart",
    category: "Homeowner Stories",
    headline: "Tampines builds a new heart",
    dek: "An integrated development at Tampines Avenue 11 stitches homes, retail and transit into a single address.",
    cover: u("photo-1567496898669-ee935f5f647a"),
    author: "Marcus Lim",
    readMins: 5,
    date: "April 2026",
    publishedAt: "2026-04-09",
    projectSlug: "parktown-residence",
    size: "normal",
    body: [
      {
        type: "paragraph",
        text: "Integrated developments — homes stacked above a mall, a bus interchange and an MRT station — have become the template for the suburbs, and Parktown Residence is the East's most ambitious recent example. The promise is convenience compressed: step out of the lift and into the rest of your day.",
      },
      {
        type: "paragraph",
        text: "Backed by UOL, CapitaLand and Singapore Land, the project anchors a new civic heart for Tampines Avenue 11, where retail, dining and transit are folded into the same footprint as the residences above.",
      },
    ],
  },
  {
    slug: "pinetree-hill-above-the-treeline",
    category: "Homeowner Stories",
    headline: "Above the treeline at Pine Grove",
    dek: "Pinetree Hill trades on elevation and greenery in one of the city fringe's leafiest enclaves.",
    cover: u("photo-1564013799919-ab600027ffc6"),
    author: "Clarissa Tan",
    readMins: 4,
    date: "March 2026",
    publishedAt: "2026-03-05",
    projectSlug: "pinetree-hill",
    size: "tall",
    body: [
      {
        type: "paragraph",
        text: "Pine Grove is one of those addresses that long-time residents guard quietly — green, elevated, and a short hop from both the city and the nature reserves. Pinetree Hill, by UOL and Singapore Land, is the rare new launch to land in it.",
      },
      {
        type: "paragraph",
        text: "Higher floors clear the surrounding canopy for long views toward the centre, and the landscaping leans into the established greenery rather than starting from scratch. It is a city-fringe project that feels further from the city than it is.",
      },
    ],
  },
  {
    slug: "the-chuan-park-serangoon-garden-address",
    category: "Homeowner Stories",
    headline: "Serangoon's garden address, renewed",
    dek: "A landmark collective sale becomes a new generation of homes at Lorong Chuan.",
    cover: u("photo-1486406146926-c627a92ad1ab"),
    author: "Marcus Lim",
    readMins: 4,
    date: "February 2026",
    publishedAt: "2026-02-14",
    projectSlug: "the-chuan-park",
    size: "normal",
    body: [
      {
        type: "paragraph",
        text: "The original Chuan Park was a fixture of the Lorong Chuan landscape for decades before its collective sale. Its successor, by Kingsford and MCC Land, inherits both the address and the mature surroundings — a rare head start for a new launch.",
      },
      {
        type: "paragraph",
        text: "With Lorong Chuan MRT at the doorstep and Serangoon's amenities a short ride away, the project is pitched at families who want a garden setting without giving up connectivity.",
      },
    ],
  },
  {
    slug: "where-singapore-is-launching-2026",
    category: "Property Trends",
    headline: "Where Singapore is launching in 2026",
    dek: "From the bay to the lake district, a field guide to the regions shaping this year's new-launch market.",
    cover: u("photo-1449824913935-59a10b8d2000"),
    author: "The iProp Edit",
    readMins: 7,
    date: "June 2026",
    publishedAt: "2026-06-01",
    projectSlug: "marina-view-residences",
    size: "wide",
    body: [
      {
        type: "paragraph",
        text: "This year's launch map tells a clear story: the core still commands a premium, but the energy is in the regions reinventing themselves — Jurong's lake district, Tampines' new integrated heart, the leafy city-fringe pockets around Pine Grove and Lentor.",
      },
      {
        type: "subhead",
        text: "Core, fringe and the case for both",
      },
      {
        type: "paragraph",
        text: "Buyers in the Core Central Region are paying for scarcity and permanence; those further out are buying into transformation while it is still priced as potential. The interactive map is the fastest way to read the spread for yourself — every project is a pin you can fly into.",
      },
    ],
  },
  {
    slug: "freehold-or-leasehold-2026",
    category: "Property Trends",
    headline: "Freehold or leasehold? What 2026’s launches reveal",
    dek: "A wave of freehold sites is testing how much Singapore buyers will still pay for permanence.",
    cover: u("photo-1486406146926-c627a92ad1ab"),
    author: "Priya Nair",
    readMins: 6,
    date: "June 2026",
    publishedAt: "2026-06-12",
    projectSlug: "watten-house",
    size: "tall",
    body: [
      {
        type: "paragraph",
        text: "For most of the last decade the freehold-versus-leasehold debate was largely academic: the overwhelming majority of new launches sat on 99-year land, so buyers simply took what the market offered. The 2026 cohort is different — a clutch of freehold sites has come to market at once, and the premium they command is suddenly a live question again.",
      },
      {
        type: "subhead",
        text: "What the premium is really buying",
      },
      {
        type: "paragraph",
        text: "Projects like Watten House and The Continuum are pricing permanence explicitly. The data is mixed — leasehold has closed much of the historical resale gap in prime districts — but for a certain buyer, the freehold line on the title deed is worth paying for regardless of the spreadsheet.",
      },
      {
        type: "quote",
        text: "Tenure is no longer a footnote on the factsheet. In 2026 it's the headline.",
      },
    ],
  },
  {
    slug: "the-mall-shaped-suburb",
    category: "Property Trends",
    headline: "Why every new suburb is built around a mall",
    dek: "The integrated development has quietly become the default template for life outside the core.",
    cover: u("photo-1567496898669-ee935f5f647a"),
    author: "Marcus Lim",
    readMins: 5,
    date: "May 2026",
    publishedAt: "2026-05-28",
    projectSlug: "parktown-residence",
    size: "normal",
    body: [
      {
        type: "paragraph",
        text: "A decade ago, an integrated development — homes above a mall, an MRT station and a bus interchange — was a marquee proposition reserved for a handful of regional centres. Today it is close to the default for any large suburban plot, and Parktown Residence in Tampines is the latest, largest example.",
      },
      {
        type: "paragraph",
        text: "The appeal is structural. Land is scarce, commutes are sacred, and a development that compresses the daily routine into a single tower has an obvious edge. The question for buyers is no longer whether to live above the shops, but which transport node to plant themselves on.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Subset surfaced on the Home page (the lead plus a couple of others). */
export function featuredArticles(): Article[] {
  const lead = articles.find((a) => a.size === "lead");
  const rest = articles.filter((a) => a !== lead).slice(0, 3);
  return lead ? [lead, ...rest] : articles.slice(0, 4);
}

/** Most recently published first — for the Home "Latest" row. */
export function latestArticles(n = 3): Article[] {
  return [...articles]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, n);
}

/** Articles in a given Journal category, in data order. */
export function categoryArticles(cat: Category): Article[] {
  return articles.filter((a) => a.category === cat);
}

/** Guard so every article points at a real project (used by the CTA). */
export function articleProject(article: Article) {
  return getProject(article.projectSlug);
}

/**
 * Articles relevant to a project for the showcase "Related reading" row:
 * direct matches first, then same-region projects, then most recent — deduped
 * and capped at `n` so the row is always filled.
 */
export function relatedArticles(projectSlug: string, n = 3): Article[] {
  const self = getProject(projectSlug);
  const direct = articles.filter((a) => a.projectSlug === projectSlug);
  const sameRegion = self
    ? articles.filter(
        (a) =>
          a.projectSlug !== projectSlug &&
          getProject(a.projectSlug)?.region === self.region
      )
    : [];
  const recent = [...articles].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );

  const seen = new Set<string>();
  const out: Article[] = [];
  for (const a of [...direct, ...sameRegion, ...recent]) {
    if (seen.has(a.slug)) continue;
    seen.add(a.slug);
    out.push(a);
    if (out.length >= n) break;
  }
  return out;
}
