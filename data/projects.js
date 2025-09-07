// data/projects.js
const projects = [
  {
    slug: "manitoba-curling",
    title: "Manitoba Curling Centre",
    year: 2023,
    category: "Sports and Recreation",
    location: "Winnipeg, Canada",
    hero: "/manitoba-hero.jpg", // swap to /projects/courtyard-house/hero.jpg later
    summary:
      "A quiet inner-world organized around light, proportion, and a central void.",
    gallery: [
      "/manitoba-hero.jpg", // placeholder; replace with real images when ready
    ],
    credits: ["Lead: Thiago Rocha Silvino", "Structural: ABC Engineering"],
    downloads: [
      { label: "Project PDF", href: "/projects/courtyard-house/project.pdf" },
    ],
  },
  {
    slug: "atrium-pavilion",
    title: "Atrium Pavilion",
    year: 2022,
    category: "Public",
    location: "Lisbon, Portugal",
    hero: "/Thiago_Silvino_SML_ABOUT.JPG", // placeholder
    summary:
      "A light timber structure animating a civic courtyard.",
    gallery: [
      "/Thiago_Silvino_SML_ABOUT.JPG",
    ],
    credits: ["Lead: Thiago Rocha Silvino"],
    downloads: [],
  },
];

export default projects;
