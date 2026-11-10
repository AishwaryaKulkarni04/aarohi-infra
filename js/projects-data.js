/**
 * Single source for projects table, slider, and galleries.
 * Add new projects at the end of AAROHI_PROJECTS — do not edit existing rows unless records change.
 */
const AAROHI_SITE = {
  foundedYear: 2021,
  /** Hero sq.ft (thousands) — manual only, not summed from the table */
  deliveredSqftK: 75,
};

/** @typedef {"completed"|"progress"|"upcoming"} ProjectStatus */

/**
 * @typedef {Object} ProjectRecord
 * @property {string} [id] Anchor id for slider/gallery (omit if table-only row)
 * @property {string} tableName Name in list-of-projects table
 * @property {string} displayName Slider card & showcase title
 * @property {string} sectionTitle ALL CAPS gallery section heading
 * @property {number} year
 * @property {string} type Table “type of work”
 * @property {string} typeShort Shorter label for slider / showcase eyebrow
 * @property {number} sqft
 * @property {string} location Showcase location
 * @property {ProjectStatus} status
 * @property {boolean} [slider=true]
 * @property {boolean} [gallery=true]
 * @property {{ src: string, alt: string, modifier?: string }} [image]
 */

/** @type {ProjectRecord[]} */
const AAROHI_PROJECTS = [
  {
    id: "proj-hospital",
    tableName: "Extension of Sub Divisional Hospital, Trimbak",
    displayName: "Sub Divisional Hospital, Trimbak",
    sectionTitle: "SUB DIVISIONAL HOSPITAL, TRIMBAK",
    year: 2021,
    type: "Govt Contract",
    typeShort: "Govt Contract",
    sqft: 3000,
    location: "Trimbak",
    status: "completed",
  },
  {
    id: "proj-bliss",
    tableName: "Samarth Bliss",
    displayName: "Samarth Bliss",
    sectionTitle: "SAMARTH BLISS",
    year: 2022,
    type: "Residential Building",
    typeShort: "Residential",
    sqft: 9800,
    location: "Nashik",
    status: "completed",
    image: {
      src: "assets/projects/samarth-bliss.png?v=61",
      alt: "Samarth Bliss residential building by Aarohi Infra",
      modifier: "bliss",
    },
  },
  {
    id: "proj-crown",
    tableName: "Samarth Crown",
    displayName: "Samarth Crown",
    sectionTitle: "SAMARTH CROWN",
    year: 2023,
    type: "Residential Building",
    typeShort: "Residential",
    sqft: 13200,
    location: "Nashik",
    status: "completed",
    image: {
      src: "assets/projects/samarth-crown.png?v=61",
      alt: "Samarth Crown residential building by Aarohi Infra",
      modifier: "crown",
    },
  },
  {
    id: "proj-raj",
    tableName: "Interior work at Raj Tower, Serene Medows",
    displayName: "Raj Tower, Serene Medows",
    sectionTitle: "RAJ TOWER, SERENE MEDOWS",
    year: 2022,
    type: "Interior Work",
    typeShort: "Interior Work",
    sqft: 1600,
    location: "Nashik",
    status: "completed",
    image: {
      src: "assets/projects/interior.png?v=62",
      alt: "Interior work at Raj Tower, Serene Medows by Aarohi Infra",
      modifier: "interior",
    },
  },
  {
    id: "proj-ssn",
    tableName: "SSN Engineering",
    displayName: "SSN Engineering, Ambad",
    sectionTitle: "SSN ENGINEERING, AMBAD",
    year: 2024,
    type: "Industrial Work",
    typeShort: "Industrial",
    sqft: 10050,
    location: "Ambad",
    status: "completed",
  },
  {
    id: "proj-sushobh",
    tableName: "Sushobh Enterprises",
    displayName: "Sushobh Enterprises, Ambad",
    sectionTitle: "SUSHOBH ENTERPRISES, AMBAD",
    year: 2024,
    type: "Industrial Work",
    typeShort: "Industrial",
    sqft: 10200,
    location: "Ambad",
    status: "completed",
  },
  {
    tableName: "Jadhav Electricals",
    displayName: "Jadhav Electricals",
    sectionTitle: "JADHAV ELECTRICALS",
    year: 2025,
    type: "Industrial Work",
    typeShort: "Industrial",
    sqft: 2515,
    location: "Nashik",
    status: "progress",
    slider: false,
    gallery: false,
  },
  {
    tableName: "Jadhav Electricals",
    displayName: "Jadhav Electricals",
    sectionTitle: "JADHAV ELECTRICALS",
    year: 2025,
    type: "Industrial Work",
    typeShort: "Industrial",
    sqft: 10450,
    location: "Nashik",
    status: "progress",
    slider: false,
    gallery: false,
  },
  {
    id: "proj-lambodar",
    tableName: "Lambodar Heights",
    displayName: "Lambodar Heights",
    sectionTitle: "LAMBODAR HEIGHTS",
    year: 2026,
    type: "Residential Building",
    typeShort: "Residential",
    sqft: 24000,
    location: "Nashik",
    status: "upcoming",
  },
];

window.AAROHI = window.AAROHI || {};
window.AAROHI.SITE = AAROHI_SITE;
window.AAROHI.PROJECTS = AAROHI_PROJECTS;
