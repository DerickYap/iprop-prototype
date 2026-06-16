import type { Project, Section, UnitType, LocationSection } from "./types";

const u = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const img = {
  marinaBay: u("photo-1525625293386-3f8f99389edd"),
  skylineNight: u("photo-1477959858617-67f85cf4f1df"),
  cityAerial: u("photo-1449824913935-59a10b8d2000"),
  towerLowAngle: u("photo-1545324418-cc1a3fa10c00"),
  modernFacade: u("photo-1486406146926-c627a92ad1ab"),
  condoExterior: u("photo-1567496898669-ee935f5f647a"),
  luxuryExterior: u("photo-1512917774080-9991f1c4c750"),
  houseDusk: u("photo-1564013799919-ab600027ffc6"),
  villaNight: u("photo-1613490493576-7fde63acd811"),
  housePool: u("photo-1600596542815-ffad4c1539a9"),
  darkInterior: u("photo-1600210492486-724fe5c67fb0"),
  warmInterior: u("photo-1600607687939-ce8a6c25118c"),
  loftInterior: u("photo-1493809842364-78817add7ffb"),
  livingRoom: u("photo-1522708323590-d24dbb6b0267"),
  aptInterior: u("photo-1502672260266-1c1ef2d93688"),
  cozyInterior: u("photo-1560448204-e02f11c3d0e2"),
  kitchen: u("photo-1556912167-f556f1f39fdf"),
  kitchenWarm: u("photo-1484154218962-a197022b5858"),
  hotelPool: u("photo-1571896349842-33c89424de2d"),
  resortPool: u("photo-1540541338287-41700207dee6"),
  lagoonPool: u("photo-1582268611958-ebfd161ef9cf"),
  lake: u("photo-1506744038136-46273834b3fb"),
  forestRoad: u("photo-1441974231531-c6227db76b6e"),
  forestLight: u("photo-1518495973542-4542c06a5843"),
};

/** Standard showcase for projects without a fully art-directed page. */
function defaultSections(opts: {
  name: string;
  tagline: string;
  hero: string;
  statement: string;
  gallery: { src: string; caption?: string }[];
  units: UnitType[];
  pois: LocationSection["pois"];
  facts: { label: string; value: string }[];
}): Section[] {
  return [
    {
      type: "hero",
      eyebrow: "New Launch",
      title: opts.name,
      subtitle: opts.tagline,
      image: opts.hero,
    },
    { type: "statement", text: opts.statement },
    {
      type: "gallery",
      heading: "A closer look",
      images: opts.gallery.map((g, i) => ({
        ...g,
        span: i === 0 ? "wide" : "normal",
      })),
    },
    {
      type: "residences",
      heading: "The residences",
      intro: "A curated mix of layouts, each planned for light, air and view.",
      units: opts.units,
    },
    {
      type: "location",
      heading: "In the neighbourhood",
      pois: opts.pois,
    },
    {
      type: "factsCta",
      heading: "At a glance",
      facts: opts.facts,
      ctaLabel: "Register interest",
    },
  ];
}

export const projects: Project[] = [
  // ───────────────────────── Art-directed: Noir Luxe ─────────────────────────
  {
    slug: "marina-view-residences",
    name: "Marina View Residences",
    developer: "IOI Properties Group",
    tagline: "Fifty-one storeys above the bay",
    lat: 1.2766,
    lng: 103.8513,
    district: "D01 · Marina View",
    region: "CCR",
    priceFrom: 1_880_000,
    tenure: "99-year leasehold",
    top: "2028",
    units: 683,
    heroImage: img.marinaBay,
    themeId: "noir",
    sections: [
      {
        type: "zoomHero",
        eyebrow: "IOI Properties · District 1",
        title: "Marina View Residences",
        subtitle: "Above it all.",
        image: img.marinaBay,
      },
      {
        type: "statement",
        eyebrow: "The vision",
        text: "There are views of the city. And there is the view the city looks up to. Marina View Residences places you inside the skyline itself — where the bay becomes your front garden and the financial district your doorstep.",
      },
      {
        type: "pinnedScenes",
        scenes: [
          {
            image: img.skylineNight,
            heading: "The view writes the brief.",
            body: "Fifty-one storeys over Marina Bay. Every principal room faces the water; every evening, the skyline performs.",
          },
          {
            image: img.darkInterior,
            heading: "Crafted in shadow and light.",
            body: "Smoked oak, honed marble and champagne metalwork — interiors composed like the city at blue hour.",
          },
          {
            image: img.hotelPool,
            heading: "The club on the 38th.",
            body: "A 25-metre infinity pool suspended over the financial district, with a residents-only lounge behind the glass.",
          },
        ],
      },
      {
        type: "zoomThrough",
        image: img.cityAerial,
        caption: "Built to numbers no one else has.",
      },
      {
        type: "stats",
        stats: [
          { value: 51, label: "Storeys above the bay" },
          { value: 683, label: "Private residences" },
          { value: 38, suffix: "F", label: "Residents' club level" },
          { value: 25, suffix: "m", label: "Skyline infinity pool" },
        ],
      },
      {
        type: "horizontal",
        heading: "Run like a private hotel.",
        panels: [
          {
            image: img.warmInterior,
            title: "Concierge, around the clock",
            caption:
              "Hotel-trained staff handle everything from dinner reservations to dry cleaning — at any hour.",
          },
          {
            image: img.kitchen,
            title: "Private dining",
            caption:
              "A chef's kitchen and dining room for twelve, bookable for the evenings worth keeping private.",
          },
          {
            image: img.loftInterior,
            title: "The penthouse collection",
            caption:
              "Twelve double-volume penthouses with private lift lobbies and terraces above the lights.",
          },
          {
            image: img.resortPool,
            title: "Wellness over the water",
            caption:
              "Spa, sauna and a gym with the bay for a backdrop — sunrise laps before the market opens.",
          },
        ],
      },
      {
        type: "residences",
        heading: "The residences",
        intro:
          "From efficient one-bedroom pied-à-terre to penthouses that occupy half a floorplate.",
        units: [
          { type: "1 Bedroom", size: "495 – 570 sqft", priceFrom: "$1.88M" },
          { type: "2 Bedroom", size: "700 – 829 sqft", priceFrom: "$2.65M" },
          { type: "3 Bedroom", size: "1,055 – 1,259 sqft", priceFrom: "$3.95M" },
          { type: "4 Bedroom", size: "1,475 – 1,690 sqft", priceFrom: "$5.60M" },
          { type: "Penthouse", size: "2,788 – 4,069 sqft", priceFrom: "Price on ask" },
        ],
      },
      {
        type: "location",
        heading: "The centre of the centre",
        intro: "Walk to two MRT lines, the waterfront promenade and the CBD.",
        pois: [
          { name: "Shenton Way MRT (TEL)", distance: "3 min walk", kind: "mrt" },
          { name: "Marina Bay MRT (NSL · CCL · TEL)", distance: "6 min walk", kind: "mrt" },
          { name: "Marina Bay Sands & Gardens", distance: "10 min walk", kind: "park" },
          { name: "Lau Pa Sat", distance: "5 min walk", kind: "other" },
          { name: "Raffles Place", distance: "8 min walk", kind: "other" },
        ],
      },
      {
        type: "factsCta",
        heading: "At a glance",
        facts: [
          { label: "Developer", value: "IOI Properties Group" },
          { label: "District", value: "D01 · Marina View" },
          { label: "Tenure", value: "99-year leasehold" },
          { label: "No. of units", value: "683" },
          { label: "Expected TOP", value: "2028" },
          { label: "Storeys", value: "51" },
        ],
        ctaLabel: "Arrange a private preview",
      },
    ],
  },

  // ───────────────────────── Art-directed: Botanic ─────────────────────────
  {
    slug: "lentor-mansion",
    name: "Lentor Mansion",
    developer: "GuocoLand",
    tagline: "An estate within the forest",
    lat: 1.3838,
    lng: 103.8366,
    district: "D26 · Lentor Gardens",
    region: "OCR",
    priceFrom: 1_148_000,
    tenure: "99-year leasehold",
    top: "2028",
    units: 533,
    heroImage: img.forestLight,
    themeId: "botanic",
    sections: [
      {
        type: "hero",
        eyebrow: "GuocoLand · Lentor Hills Estate",
        title: "Lentor Mansion",
        subtitle:
          "Where the garden city keeps its promise — homes set in landscaped grounds bordering Hillock and Linear parks.",
        image: img.forestLight,
      },
      {
        type: "statement",
        eyebrow: "The idea",
        text: "Some homes are built on land. Lentor Mansion is grown into it. Over 75% of the estate is given to gardens, lawns and a conserved grove — so every window opens to green.",
      },
      {
        type: "stickyMedia",
        image: img.forestRoad,
        blocks: [
          {
            heading: "The arrival garden",
            body: "A tree-lined drive ends at a clubhouse modelled on the black-and-white bungalows of old Singapore — verandahs, deep eaves and shade.",
          },
          {
            heading: "Five gardens, one estate",
            body: "An orchard garden, a wetland walk, lawns for picnics and play — each garden planted with native species to bring the forest's birdlife in.",
          },
          {
            heading: "Homes that breathe",
            body: "North-south orientation, generous balconies and cross-ventilated layouts mean the breeze does the work of air-conditioning most evenings.",
          },
        ],
      },
      {
        type: "gallery",
        heading: "Garden living",
        images: [
          { src: img.housePool, caption: "The 50m garden pool", span: "wide" },
          { src: img.livingRoom, caption: "Light-filled living" },
          { src: img.kitchenWarm, caption: "Kitchens made for family" },
          { src: img.forestRoad, caption: "The conserved grove", span: "wide" },
          { src: img.cozyInterior, caption: "Rooms that rest" },
          { src: img.houseDusk, caption: "The clubhouse at dusk" },
        ],
      },
      {
        type: "residences",
        heading: "The residences",
        intro: "Family-first layouts from two to five bedrooms across five towers.",
        units: [
          { type: "2 Bedroom", size: "657 – 829 sqft", priceFrom: "$1.148M" },
          { type: "3 Bedroom", size: "969 – 1,130 sqft", priceFrom: "$1.97M" },
          { type: "4 Bedroom", size: "1,346 – 1,496 sqft", priceFrom: "$2.69M" },
          { type: "5 Bedroom", size: "1,668 sqft", priceFrom: "$3.38M" },
        ],
      },
      {
        type: "amenities",
        heading: "Around the estate",
        intro: "Designed for unhurried weekends.",
        items: [
          { name: "50m garden pool", description: "Shaded by mature rain trees" },
          { name: "The Mansion clubhouse", description: "Colonial verandah lounges" },
          { name: "Orchard & farm plots", description: "Grow-your-own allotments" },
          { name: "Forest fitness trail", description: "1.2km loop through the grove" },
          { name: "Children's discovery lawn", description: "Nature play, no screens" },
          { name: "Wellness pavilion", description: "Yoga deck and onsen-style baths" },
        ],
      },
      {
        type: "location",
        heading: "Rooted, yet connected",
        pois: [
          { name: "Lentor MRT (TEL)", distance: "5 min walk", kind: "mrt" },
          { name: "Hillock Park", distance: "At your doorstep", kind: "park" },
          { name: "CHIJ St. Nicholas Girls'", distance: "Within 1km", kind: "school" },
          { name: "Anderson Primary", distance: "Within 1km", kind: "school" },
          { name: "Lentor Modern Mall", distance: "5 min walk", kind: "mall" },
        ],
      },
      {
        type: "factsCta",
        heading: "At a glance",
        facts: [
          { label: "Developer", value: "GuocoLand" },
          { label: "District", value: "D26 · Lentor Gardens" },
          { label: "Tenure", value: "99-year leasehold" },
          { label: "No. of units", value: "533" },
          { label: "Expected TOP", value: "2028" },
          { label: "Site area", value: "235,371 sqft" },
        ],
        ctaLabel: "Book a garden tour",
      },
    ],
  },

  // ───────────────────────── Art-directed: Azure ─────────────────────────
  {
    slug: "the-sora",
    name: "The Sora",
    developer: "CEL Development",
    tagline: "Lakeside living, reimagined",
    lat: 1.3338,
    lng: 103.7245,
    district: "D22 · Jurong Lake District",
    region: "OCR",
    priceFrom: 1_030_000,
    tenure: "99-year leasehold",
    top: "2028",
    units: 440,
    heroImage: img.lake,
    themeId: "azure",
    sections: [
      {
        type: "hero",
        eyebrow: "CEL Development · Jurong Lake District",
        title: "The Sora",
        subtitle:
          "Front-row residences on Jurong Lake — at the heart of Singapore's next CBD.",
        image: img.lake,
      },
      {
        type: "statement",
        eyebrow: "Why here, why now",
        text: "Jurong Lake District is the largest business district outside the city centre — 100 hectares of lake, gardens and a new commercial core. The Sora sits on its waterline, before the rest of Singapore catches up.",
      },
      {
        type: "videoScrub",
        frames: { dir: "/video/sora-frames", count: 125, ext: "webp" },
        src: "/video/sora-district.mp4",
        poster: img.skylineNight,
        chapters: [
          {
            heading: "Arrive as the lights come on.",
            body: "Scroll to fly through the district at dusk — Singapore's next CBD, rising on the edge of Jurong Lake.",
          },
          {
            heading: "Glide past the towers.",
            body: "Two slender 21-storey towers, every stack angled to the water. Smart-home control in every residence as standard.",
          },
          {
            heading: "Land in the heart of it.",
            body: "JEM, Westgate and the future Jurong East integrated transport hub sit minutes below — with 90 hectares of gardens between you and the office.",
          },
        ],
      },
      {
        type: "gallery",
        heading: "The lake life",
        images: [
          { src: img.lake, caption: "Jurong Lake, your front yard", span: "wide" },
          { src: img.aptInterior, caption: "Smart, bright interiors" },
          { src: img.resortPool, caption: "The lagoon deck" },
          { src: img.condoExterior, caption: "Architecture in white and glass", span: "wide" },
          { src: img.livingRoom, caption: "Space to think" },
          { src: img.lagoonPool, caption: "Poolside, all day" },
        ],
      },
      {
        type: "residences",
        heading: "The residences",
        intro: "One- to five-bedroom homes, every stack angled to the water.",
        units: [
          { type: "1 Bedroom", size: "538 sqft", priceFrom: "$1.03M" },
          { type: "2 Bedroom", size: "624 – 786 sqft", priceFrom: "$1.32M" },
          { type: "3 Bedroom", size: "980 – 1,141 sqft", priceFrom: "$1.98M" },
          { type: "4 Bedroom", size: "1,313 sqft", priceFrom: "$2.62M" },
          { type: "5 Bedroom", size: "1,615 sqft", priceFrom: "$3.10M" },
        ],
      },
      {
        type: "amenities",
        heading: "On the deck",
        items: [
          { name: "Lakefront lagoon pool", description: "Sunrise laps over the water" },
          { name: "Kayak & paddle club", description: "Direct lake access" },
          { name: "Co-working lounge", description: "Bookable pods and call rooms" },
          { name: "Sky gym", description: "Strength and cardio, lake view" },
          { name: "Maker studio", description: "For kids who build things" },
          { name: "EV-ready garage", description: "Charging at every other lot" },
        ],
      },
      {
        type: "location",
        heading: "The next CBD, outside your door",
        pois: [
          { name: "Lakeside MRT (EWL)", distance: "7 min walk", kind: "mrt" },
          { name: "Jurong Lake Gardens", distance: "2 min walk", kind: "park" },
          { name: "Jurong East hub (JEM · Westgate · IMM)", distance: "1 MRT stop", kind: "mall" },
          { name: "Rulang Primary", distance: "Within 1km", kind: "school" },
          { name: "Science Centre (new)", distance: "10 min walk", kind: "other" },
        ],
      },
      {
        type: "factsCta",
        heading: "At a glance",
        facts: [
          { label: "Developer", value: "CEL Development" },
          { label: "District", value: "D22 · Jurong Lake District" },
          { label: "Tenure", value: "99-year leasehold" },
          { label: "No. of units", value: "440" },
          { label: "Expected TOP", value: "2028" },
          { label: "Towers", value: "2 × 21 storeys" },
        ],
        ctaLabel: "Get the e-brochure",
      },
    ],
  },

  // ───────────────────────── Standard showcases ─────────────────────────
  {
    slug: "watten-house",
    name: "Watten House",
    developer: "UOL Group & Singapore Land",
    tagline: "Freehold calm in District 11",
    lat: 1.3284,
    lng: 103.8123,
    district: "D11 · Shelford Road",
    region: "CCR",
    priceFrom: 3_100_000,
    tenure: "Freehold",
    top: "2027",
    units: 180,
    heroImage: img.luxuryExterior,
    themeId: "graphite",
    sections: defaultSections({
      name: "Watten House",
      tagline:
        "One hundred and eighty freehold residences in the low-rise hush of Watten Estate.",
      hero: img.luxuryExterior,
      statement:
        "Five storeys, mature trees and good-class-bungalow neighbours. Watten House trades spectacle for permanence — a freehold estate built for the long run.",
      gallery: [
        { src: img.luxuryExterior, caption: "Low-rise, landed surrounds" },
        { src: img.warmInterior, caption: "Quietly generous interiors" },
        { src: img.housePool, caption: "The garden pool" },
      ],
      units: [
        { type: "2 Bedroom", size: "775 – 893 sqft", priceFrom: "$3.10M" },
        { type: "3 Bedroom", size: "1,098 – 1,250 sqft", priceFrom: "$3.65M" },
        { type: "4 Bedroom", size: "1,485 – 1,733 sqft", priceFrom: "$4.98M" },
        { type: "5 Bedroom", size: "2,045 sqft", priceFrom: "$6.80M" },
      ],
      pois: [
        { name: "Tan Kah Kee MRT (DTL)", distance: "8 min walk", kind: "mrt" },
        { name: "Hwa Chong Institution", distance: "Within 1km", kind: "school" },
        { name: "Botanic Gardens", distance: "5 min drive", kind: "park" },
      ],
      facts: [
        { label: "Developer", value: "UOL & SingLand" },
        { label: "Tenure", value: "Freehold" },
        { label: "No. of units", value: "180" },
        { label: "Expected TOP", value: "2027" },
      ],
    }),
  },
  {
    slug: "parktown-residence",
    name: "Parktown Residence",
    developer: "UOL · CapitaLand · SingLand",
    tagline: "Tampines' new integrated heart",
    lat: 1.3623,
    lng: 103.9303,
    district: "D18 · Tampines Avenue 11",
    region: "OCR",
    priceFrom: 1_040_000,
    tenure: "99-year leasehold",
    top: "2029",
    units: 1193,
    heroImage: img.condoExterior,
    themeId: "graphite",
    sections: defaultSections({
      name: "Parktown Residence",
      tagline:
        "1,193 homes above a mall, hawker centre, bus interchange and community club — all under one roof.",
      hero: img.condoExterior,
      statement:
        "The everything-downstairs development: groceries, food, buses and the future Tampines North MRT, stacked beneath your living room.",
      gallery: [
        { src: img.condoExterior, caption: "The towers over the park" },
        { src: img.livingRoom, caption: "Family-sized living" },
        { src: img.resortPool, caption: "The 50m pool deck" },
      ],
      units: [
        { type: "1 Bedroom", size: "463 – 527 sqft", priceFrom: "$1.04M" },
        { type: "2 Bedroom", size: "624 – 753 sqft", priceFrom: "$1.32M" },
        { type: "3 Bedroom", size: "904 – 1,066 sqft", priceFrom: "$1.79M" },
        { type: "4 Bedroom", size: "1,238 – 1,432 sqft", priceFrom: "$2.41M" },
        { type: "5 Bedroom", size: "1,539 sqft", priceFrom: "$2.99M" },
      ],
      pois: [
        { name: "Tampines North MRT (CRL, U/C)", distance: "Linked basement", kind: "mrt" },
        { name: "Integrated mall & hawker", distance: "Downstairs", kind: "mall" },
        { name: "Boulevard Park", distance: "Next door", kind: "park" },
      ],
      facts: [
        { label: "Developer", value: "UOL · CapitaLand · SingLand" },
        { label: "Tenure", value: "99-year leasehold" },
        { label: "No. of units", value: "1,193" },
        { label: "Expected TOP", value: "2029" },
      ],
    }),
  },
  {
    slug: "the-continuum",
    name: "The Continuum",
    developer: "Hoi Hup & Sunway",
    tagline: "Freehold on the East Coast",
    lat: 1.3082,
    lng: 103.8939,
    district: "D15 · Thiam Siew Avenue",
    region: "RCR",
    priceFrom: 1_460_000,
    tenure: "Freehold",
    top: "2027",
    units: 816,
    heroImage: img.towerLowAngle,
    themeId: "graphite",
    sections: defaultSections({
      name: "The Continuum",
      tagline:
        "816 freehold homes across two sites joined by a private link bridge, minutes from Katong.",
      hero: img.towerLowAngle,
      statement:
        "Freehold land of this size no longer comes up in District 15. The Continuum pairs East Coast ease — hawkers, the beach, old shophouses — with a title that outlasts every lease around it.",
      gallery: [
        { src: img.towerLowAngle, caption: "Twin sites, one estate" },
        { src: img.loftInterior, caption: "Tall ceilings, long views" },
        { src: img.hotelPool, caption: "The lap pool at dusk" },
      ],
      units: [
        { type: "1 Bedroom", size: "560 sqft", priceFrom: "$1.46M" },
        { type: "2 Bedroom", size: "700 – 850 sqft", priceFrom: "$1.86M" },
        { type: "3 Bedroom", size: "1,012 – 1,195 sqft", priceFrom: "$2.65M" },
        { type: "4 Bedroom", size: "1,302 – 1,679 sqft", priceFrom: "$3.45M" },
        { type: "5 Bedroom", size: "1,873 sqft", priceFrom: "$4.78M" },
      ],
      pois: [
        { name: "Paya Lebar MRT (EWL · CCL)", distance: "10 min walk", kind: "mrt" },
        { name: "Katong / Joo Chiat", distance: "5 min drive", kind: "other" },
        { name: "East Coast Park", distance: "6 min drive", kind: "park" },
      ],
      facts: [
        { label: "Developer", value: "Hoi Hup & Sunway" },
        { label: "Tenure", value: "Freehold" },
        { label: "No. of units", value: "816" },
        { label: "Expected TOP", value: "2027" },
      ],
    }),
  },
  {
    slug: "pinetree-hill",
    name: "Pinetree Hill",
    developer: "UOL Group & Singapore Land",
    tagline: "Above the treeline at Pine Grove",
    lat: 1.3219,
    lng: 103.7846,
    district: "D21 · Pine Grove",
    region: "RCR",
    priceFrom: 1_230_000,
    tenure: "99-year leasehold",
    top: "2027",
    units: 520,
    heroImage: img.houseDusk,
    themeId: "graphite",
    sections: defaultSections({
      name: "Pinetree Hill",
      tagline:
        "Elevated on the Ulu Pandan ridge, with unblocked views over landed estates and Clementi Forest.",
      hero: img.houseDusk,
      statement:
        "Built on one of the highest residential plots in the west, most stacks at Pinetree Hill look over two-storey rooftops to forest — a skyline of trees, not towers.",
      gallery: [
        { src: img.houseDusk, caption: "The ridge at dusk" },
        { src: img.cozyInterior, caption: "Calm, crafted interiors" },
        { src: img.lagoonPool, caption: "The forest-edge pool" },
      ],
      units: [
        { type: "1 Bedroom", size: "538 sqft", priceFrom: "$1.23M" },
        { type: "2 Bedroom", size: "700 – 797 sqft", priceFrom: "$1.59M" },
        { type: "3 Bedroom", size: "1,033 – 1,184 sqft", priceFrom: "$2.21M" },
        { type: "4 Bedroom", size: "1,432 – 1,690 sqft", priceFrom: "$3.04M" },
        { type: "5 Bedroom", size: "2,066 sqft", priceFrom: "$4.20M" },
      ],
      pois: [
        { name: "Dover MRT (EWL)", distance: "15 min walk", kind: "mrt" },
        { name: "Henry Park Primary", distance: "Within 1km", kind: "school" },
        { name: "Clementi Forest", distance: "Across the road", kind: "park" },
      ],
      facts: [
        { label: "Developer", value: "UOL & SingLand" },
        { label: "Tenure", value: "99-year leasehold" },
        { label: "No. of units", value: "520" },
        { label: "Expected TOP", value: "2027" },
      ],
    }),
  },
  {
    slug: "the-chuan-park",
    name: "The Chuan Park",
    developer: "Kingsford & MCC Land",
    tagline: "Serangoon's garden address",
    lat: 1.3528,
    lng: 103.8649,
    district: "D19 · Lorong Chuan",
    region: "OCR",
    priceFrom: 1_190_000,
    tenure: "99-year leasehold",
    top: "2028",
    units: 916,
    heroImage: img.modernFacade,
    themeId: "graphite",
    sections: defaultSections({
      name: "The Chuan Park",
      tagline:
        "916 homes two minutes from Lorong Chuan MRT, wrapped around a heritage garden core.",
      hero: img.modernFacade,
      statement:
        "A rare large-format site in mature Serangoon: schools, the Circle Line and NEX all within easy reach, with a parkland spine running through the estate.",
      gallery: [
        { src: img.modernFacade, caption: "The garden towers" },
        { src: img.aptInterior, caption: "Bright, efficient homes" },
        { src: img.housePool, caption: "Poolside pavilions" },
      ],
      units: [
        { type: "1 Bedroom", size: "495 sqft", priceFrom: "$1.19M" },
        { type: "2 Bedroom", size: "657 – 743 sqft", priceFrom: "$1.45M" },
        { type: "3 Bedroom", size: "936 – 1,098 sqft", priceFrom: "$1.99M" },
        { type: "4 Bedroom", size: "1,259 – 1,410 sqft", priceFrom: "$2.68M" },
        { type: "5 Bedroom", size: "1,572 sqft", priceFrom: "$3.30M" },
      ],
      pois: [
        { name: "Lorong Chuan MRT (CCL)", distance: "2 min walk", kind: "mrt" },
        { name: "St. Gabriel's Primary", distance: "Within 1km", kind: "school" },
        { name: "NEX Megamall", distance: "1 MRT stop", kind: "mall" },
      ],
      facts: [
        { label: "Developer", value: "Kingsford & MCC Land" },
        { label: "Tenure", value: "99-year leasehold" },
        { label: "No. of units", value: "916" },
        { label: "Expected TOP", value: "2028" },
      ],
    }),
  },

  // ──────────── Bespoke flythrough (custom showcase, not sections) ────────────
  // River Modern gets a map pin from this entry, but its showcase route renders
  // the dedicated cinematic flythrough experience instead of ShowcaseRenderer —
  // see src/app/projects/[slug]/page.tsx and src/components/showcase/river-modern/.
  // `sections` is intentionally empty; it is unused for this slug.
  {
    slug: "river-modern",
    name: "River Modern",
    developer: "Meridian Group",
    tagline: "A life that moves with the water",
    lat: 1.3078,
    lng: 103.872,
    district: "D12 · Kallang Riverside",
    region: "RCR",
    priceFrom: 1_900_000,
    tenure: "99-year leasehold",
    top: "2030",
    units: 320,
    heroImage: "https://picsum.photos/seed/river-modern-cover/1400/1750",
    themeId: "noir",
    sections: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const formatPrice = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(2).replace(/0$/, "")}M`
    : `$${Math.round(n / 1000)}K`;

// ============================================================================
// RIVER MODERN — bespoke flagship experience content.
//
// River Modern's showcase is NOT built from the `sections[]` model above — it's a
// CINEMATIC FILM the user scrubs by scrolling (a flythrough video that plays
// forward/back with scroll, with copy layered over it). This is its own data
// shape, consumed by src/components/showcase/river-modern/*. It lives here so all
// project data sits in one file. Everything editable lives below:
//   • video   — the scrubbed clip + poster fallback
//   • beats[] — the 6 story beats; each has an `at` (0–1) marking where in the
//               scroll/film its copy peaks, and an `align` for placement.
// Tune `at` to line each beat up with a moment in the film; reorder/edit freely.
// ============================================================================

export interface RiverBeat {
  id: string;
  eyebrow: string;
  /** Oversized display headline shown over the film. \n allowed. */
  headline: string;
  body: string;
  /** Where in the scroll (0=top, 1=bottom) this beat's copy peaks. */
  at: number;
  /** Horizontal placement of the copy over the film. */
  align?: "left" | "center" | "right";
  stats?: { label: string; value: string }[];
  amenities?: string[];
}

export interface RiverVideo {
  /** Primary mp4, served from /public. */
  src: string;
  /** Optional webm alternative. */
  webm?: string;
  /** Poster shown before load / if the video fails. */
  poster: string;
}

export interface RiverModern {
  slug: string;
  name: string;
  developer: string;
  location: string;
  tenure: string;
  units: string;
  priceFrom: string;
  status: string;
  editionNo: string;
  tagline: string;
  summary: string;
  cover: string;
  /** How many viewport-heights of scroll the film is stretched across. */
  scrollLength: number;
  palette: {
    bg: string;
    text: string;
    muted: string;
    accent: string;
    water: string;
  };
  video: RiverVideo;
  beats: RiverBeat[];
}

export const riverModern: RiverModern = {
  slug: "river-modern",
  name: "River Modern",
  developer: "Meridian Group",
  location: "Kallang Riverside · District 12",
  tenure: "99-year leasehold",
  units: "320 residences",
  priceFrom: "S$1.9M",
  status: "Now Previewing",
  editionNo: "Flagship",
  tagline: "A life that moves with the water.",
  summary:
    "Set along the Kallang River, River Modern is a journey before it is an address — drifting over the water, through the grounds, and up into the residences.",
  cover: "https://picsum.photos/seed/river-modern-cover/1400/1750",

  // Stretch the ~10s film across 6 viewport-heights of scroll for a slow,
  // luxurious scrub. Increase for an even slower reveal.
  scrollLength: 6,

  palette: {
    bg: "#070b12",
    text: "#f3f1ea",
    muted: "#9fb0bd",
    accent: "#e6b873",
    water: "#16323a",
  },

  video: {
    src: "/river-modern/flythrough.mp4",
    // poster falls back to the cover until a real still is added
    poster: "https://picsum.photos/seed/river-modern-cover/1400/1750",
  },

  // --- The six beats (copy peaks at `at`, spread across the film) -----------
  beats: [
    {
      id: "arrival",
      eyebrow: "Kallang Riverside",
      headline: "River\nModern",
      body: "A life that moves with the water. The journey home begins on the river.",
      at: 0.04,
      align: "center",
    },
    {
      id: "promenade",
      eyebrow: "The approach",
      headline: "Arrive\nslowly",
      body: "A tree-lined promenade traces the river's edge — a long, unhurried approach where the city softens into rustle and reflection.",
      at: 0.24,
      align: "left",
    },
    {
      id: "waterway",
      eyebrow: "Life by the water",
      headline: "On the\nwater",
      body: "Reflecting pools and a 70-metre lap stretch run the length of the grounds, so light and water are never far from the door.",
      at: 0.42,
      align: "right",
      amenities: [
        "70m river-edge pool",
        "Floating pavilions",
        "Hydrotherapy garden",
        "Kayak landing",
      ],
    },
    {
      id: "gardens",
      eyebrow: "The grounds",
      headline: "Into the\ngreen",
      body: "Three hectares of layered planting — rain gardens, fig groves, a quiet boardwalk — designed to be walked through on the way to everywhere.",
      at: 0.6,
      align: "left",
    },
    {
      id: "residences",
      eyebrow: "The residences",
      headline: "Rise",
      body: "Two slender towers lift the homes into the light, terraces deep enough to live on, the river always somewhere below.",
      at: 0.78,
      align: "right",
      stats: [
        { label: "Residences", value: "320" },
        { label: "Tenure", value: "99-year" },
        { label: "From", value: "S$1.9M" },
        { label: "Completion", value: "2030" },
      ],
    },
    {
      id: "skyline",
      eyebrow: "Now previewing",
      headline: "Stay",
      body: "River Modern is now previewing — come and find where you fit in it.",
      at: 0.96,
      align: "center",
    },
  ],
};
