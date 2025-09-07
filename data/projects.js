// data/projects.js
const projects = [
  {
    slug: "courtyard-house",
    title: "Courtyard House",
    year: 2023,
    category: "Residential",
    location: "São Paulo, Brazil",
    hero: "/poster.jpg", // swap to /projects/courtyard-house/hero.jpg later
    summary:
      "A quiet inner-world organized around light, proportion, and a central void.",
    gallery: [
      "/poster.jpg", // placeholder; replace with real images when ready
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
