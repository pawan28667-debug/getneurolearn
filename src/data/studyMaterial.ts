export const examCategories = [
  { name: "JEE Main", value: "jee_main", emoji: "⚡", color: "from-blue-500 to-cyan-500" },
  { name: "JEE Advanced", value: "jee_advanced", emoji: "🔥", color: "from-orange-500 to-red-500" },
  { name: "NEET", value: "neet", emoji: "🧬", color: "from-green-500 to-emerald-500" },
  { name: "UPSC", value: "upsc", emoji: "🏛️", color: "from-purple-500 to-violet-500" },
  { name: "SSC", value: "ssc", emoji: "📊", color: "from-amber-500 to-yellow-500" },
  { name: "Boards", value: "boards", emoji: "📚", color: "from-pink-500 to-rose-500" },
];

export const examSubjects: Record<string, string[]> = {
  jee_main: ["Physics", "Chemistry", "Mathematics"],
  jee_advanced: ["Physics", "Chemistry", "Mathematics"],
  neet: ["Physics", "Chemistry", "Biology"],
  upsc: ["Polity", "History", "Geography", "Economics", "Science", "Environment"],
  ssc: ["Quantitative Aptitude", "English", "Reasoning", "General Awareness"],
  boards: ["Physics", "Chemistry", "Mathematics", "Biology", "English", "History", "Political Science", "Geography", "Hindi"],
};

export const subjectClasses: Record<string, string[]> = {
  jee_main: ["Class 11", "Class 12"],
  jee_advanced: ["Class 11", "Class 12"],
  neet: ["Class 11", "Class 12"],
  upsc: ["Foundation", "Prelims", "Mains"],
  ssc: ["Tier 1", "Tier 2"],
  boards: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"],
};

export interface Chapter {
  id: string;
  name: string;
  book?: string;
}

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const toChapters = (names: string[], book?: string): Chapter[] =>
  names.map((n) => ({ id: slug(n), name: n, book }));

// ===== NCERT-aligned chapter banks =====

const PHYSICS_11_B1 = [
  "Units and Measurements", "Motion in a Straight Line", "Motion in a Plane",
  "Laws of Motion", "Work, Energy and Power", "System of Particles and Rotational Motion",
  "Gravitation", "Mechanical Properties of Solids",
];
const PHYSICS_11_B2 = [
  "Mechanical Properties of Fluids", "Thermal Properties of Matter", "Thermodynamics",
  "Kinetic Theory", "Oscillations", "Waves",
];
const PHYSICS_12_B1 = [
  "Electric Charges and Fields", "Electrostatic Potential and Capacitance",
  "Current Electricity", "Moving Charges and Magnetism", "Magnetism and Matter",
  "Electromagnetic Induction", "Alternating Current", "Electromagnetic Waves",
];
const PHYSICS_12_B2 = [
  "Ray Optics and Optical Instruments", "Wave Optics", "Dual Nature of Radiation and Matter",
  "Atoms", "Nuclei", "Semiconductor Electronics", "Communication Systems",
];

const CHEM_11_B1 = [
  "Some Basic Concepts of Chemistry", "Structure of Atom", "Classification of Elements and Periodicity",
  "Chemical Bonding and Molecular Structure", "States of Matter", "Thermodynamics", "Equilibrium",
];
const CHEM_11_B2 = [
  "Redox Reactions", "Hydrogen", "The s-Block Elements", "The p-Block Elements",
  "Organic Chemistry: Basic Principles and Techniques", "Hydrocarbons", "Environmental Chemistry",
];
const CHEM_12_B1 = [
  "The Solid State", "Solutions", "Electrochemistry", "Chemical Kinetics",
  "Surface Chemistry", "Isolation of Elements", "The p-Block Elements (Groups 15-18)",
  "The d and f Block Elements", "Coordination Compounds",
];
const CHEM_12_B2 = [
  "Haloalkanes and Haloarenes", "Alcohols, Phenols and Ethers",
  "Aldehydes, Ketones and Carboxylic Acids", "Amines", "Biomolecules", "Polymers",
  "Chemistry in Everyday Life",
];

const MATH_11 = [
  "Sets", "Relations and Functions", "Trigonometric Functions", "Principle of Mathematical Induction",
  "Complex Numbers and Quadratic Equations", "Linear Inequalities", "Permutations and Combinations",
  "Binomial Theorem", "Sequences and Series", "Straight Lines", "Conic Sections",
  "Introduction to Three Dimensional Geometry", "Limits and Derivatives", "Mathematical Reasoning",
  "Statistics", "Probability",
];
const MATH_12 = [
  "Relations and Functions", "Inverse Trigonometric Functions", "Matrices", "Determinants",
  "Continuity and Differentiability", "Application of Derivatives", "Integrals",
  "Application of Integrals", "Differential Equations", "Vector Algebra",
  "Three Dimensional Geometry", "Linear Programming", "Probability",
];

const BIO_11 = [
  "The Living World", "Biological Classification", "Plant Kingdom", "Animal Kingdom",
  "Morphology of Flowering Plants", "Anatomy of Flowering Plants", "Structural Organisation in Animals",
  "Cell: The Unit of Life", "Biomolecules", "Cell Cycle and Cell Division",
  "Photosynthesis in Higher Plants", "Respiration in Plants", "Plant Growth and Development",
  "Breathing and Exchange of Gases", "Body Fluids and Circulation", "Excretory Products and their Elimination",
  "Locomotion and Movement", "Neural Control and Coordination", "Chemical Coordination and Integration",
];
const BIO_12 = [
  "Reproduction in Organisms", "Sexual Reproduction in Flowering Plants", "Human Reproduction",
  "Reproductive Health", "Principles of Inheritance and Variation", "Molecular Basis of Inheritance",
  "Evolution", "Human Health and Disease", "Strategies for Enhancement in Food Production",
  "Microbes in Human Welfare", "Biotechnology: Principles and Processes",
  "Biotechnology and its Applications", "Organisms and Populations", "Ecosystem",
  "Biodiversity and Conservation", "Environmental Issues",
];

const ENGLISH_BOARDS = [
  "Reading Comprehension", "Note Making and Summarising", "Writing: Notice & Advertisement",
  "Writing: Letters & Applications", "Writing: Article & Report", "Grammar: Tenses",
  "Grammar: Modals", "Grammar: Voice & Speech", "Literature: Prose", "Literature: Poetry",
];
const HISTORY_BOARDS = [
  "The Rise of Nationalism", "Nationalism in India", "The Making of a Global World",
  "The Age of Industrialisation", "Print Culture and the Modern World", "Resources and Development",
  "Forest and Wildlife Resources", "Water Resources", "Agriculture", "Manufacturing Industries",
];

// UPSC chapter banks
const UPSC_POLITY = [
  "Indian Constitution: Making & Salient Features", "Preamble", "Citizenship", "Fundamental Rights",
  "Directive Principles of State Policy", "Fundamental Duties", "Amendment of the Constitution",
  "Parliament", "President & Vice-President", "Prime Minister & Council of Ministers",
  "Supreme Court & Judiciary", "State Government", "Local Self Government", "Election Commission",
  "Constitutional & Statutory Bodies",
];
const UPSC_HISTORY = [
  "Indus Valley Civilization", "Vedic Age", "Mauryan Empire", "Gupta Empire", "Post-Gupta Period",
  "Delhi Sultanate", "Mughal Empire", "Maratha Empire", "Advent of Europeans", "British Expansion",
  "Revolt of 1857", "Socio-Religious Reform Movements", "Indian National Movement",
  "Gandhian Era", "Partition & Independence", "Post-Independence Consolidation",
];
const UPSC_GEOGRAPHY = [
  "The Universe and Solar System", "Interior of the Earth", "Landforms",
  "Atmosphere and Climate", "Oceans", "Indian Physiography", "Indian Climate & Monsoon",
  "Drainage System of India", "Soils & Natural Vegetation", "Indian Agriculture",
  "Mineral & Energy Resources", "Industries", "Population & Settlement",
  "Transport & Communication", "Natural Disasters & Management",
];
const UPSC_ECONOMICS = [
  "Basics of Economy", "National Income Accounting", "Money & Banking",
  "Fiscal Policy & Budget", "Monetary Policy & RBI", "Inflation & Unemployment",
  "International Trade & BOP", "Indian Economy Overview", "Agriculture in India",
  "Industry & Services Sector", "Planning & NITI Aayog", "Poverty, Inequality & Government Schemes",
];
const UPSC_SCIENCE = [
  "Physics Fundamentals for UPSC", "Chemistry Fundamentals", "Biology Fundamentals",
  "Space & Defence Technology", "Biotechnology", "Information & Communication Tech",
  "Nuclear & Energy Science", "Health, Diseases & Nutrition", "Recent Scientific Developments",
  "Environment & Climate Science",
];
const UPSC_ENVIRONMENT = [
  "Ecology Basics", "Ecosystem & Functions", "Biodiversity", "Climate Change",
  "Conservation Acts & Laws", "Pollution: Air, Water, Soil", "Sustainable Development",
  "International Environmental Organisations", "Protected Areas of India", "Current Environmental Issues",
];

// SSC chapter banks
const SSC_QUANT = [
  "Number System", "HCF & LCM", "Percentage", "Profit, Loss & Discount",
  "Simple Interest", "Compound Interest", "Ratio & Proportion", "Average",
  "Time & Work", "Pipes & Cisterns", "Time, Speed & Distance", "Boats & Streams",
  "Mensuration", "Geometry", "Trigonometry", "Algebra", "Data Interpretation",
];
const SSC_ENGLISH = [
  "Grammar: Parts of Speech", "Tenses", "Vocabulary Building", "Synonyms & Antonyms",
  "Idioms & Phrases", "One Word Substitution", "Active & Passive Voice",
  "Direct & Indirect Speech", "Reading Comprehension", "Cloze Test", "Sentence Improvement",
  "Error Spotting",
];
const SSC_REASONING = [
  "Analogy", "Classification", "Series", "Coding-Decoding", "Blood Relations",
  "Direction Sense", "Ranking & Order", "Sitting Arrangement", "Syllogism",
  "Statement & Conclusion", "Non-Verbal Reasoning", "Puzzles", "Clock & Calendar",
];
const SSC_GA = [
  "Indian History", "Indian Geography", "Indian Polity", "Indian Economy",
  "General Science", "Current Affairs", "Sports & Games", "Awards & Honours",
  "Books & Authors", "Important Days & Dates", "Static GK", "Government Schemes",
];

// Lower classes (6-10) — concise NCERT-style chapter lists
const SCIENCE_10 = [
  "Chemical Reactions and Equations", "Acids, Bases and Salts", "Metals and Non-metals",
  "Carbon and its Compounds", "Periodic Classification of Elements",
  "Life Processes", "Control and Coordination", "How do Organisms Reproduce?",
  "Heredity and Evolution", "Light - Reflection and Refraction",
  "Human Eye and Colourful World", "Electricity", "Magnetic Effects of Current",
  "Sources of Energy", "Our Environment", "Management of Natural Resources",
];
const MATH_10 = [
  "Real Numbers", "Polynomials", "Pair of Linear Equations in Two Variables",
  "Quadratic Equations", "Arithmetic Progressions", "Triangles", "Coordinate Geometry",
  "Introduction to Trigonometry", "Applications of Trigonometry", "Circles",
  "Constructions", "Areas Related to Circles", "Surface Areas and Volumes",
  "Statistics", "Probability",
];

function genericChaptersForClass(subject: string, klass: string): Chapter[] {
  const base = [
    `Foundations of ${subject}`,
    `Core Concepts in ${subject}`,
    `${subject}: Key Topics — Part 1`,
    `${subject}: Key Topics — Part 2`,
    `${subject}: Applications`,
    `${subject}: Problem Solving`,
    `${subject}: Important Theorems & Facts`,
    `${subject}: Revision & Practice`,
  ];
  return toChapters(base, `${klass} ${subject}`);
}

// Map (exam, subject, class) -> Chapter[]
export function getChapters(examType: string, subject: string, classLevel: string): Chapter[] {
  const key = `${examType}|${subject}|${classLevel}`;

  // JEE / NEET / Boards — Class 11 / 12 specifics
  if (subject === "Physics") {
    if (classLevel === "Class 11") {
      return [
        ...toChapters(PHYSICS_11_B1, "NCERT Physics Class 11 — Book 1"),
        ...toChapters(PHYSICS_11_B2, "NCERT Physics Class 11 — Book 2"),
      ];
    }
    if (classLevel === "Class 12") {
      return [
        ...toChapters(PHYSICS_12_B1, "NCERT Physics Class 12 — Book 1"),
        ...toChapters(PHYSICS_12_B2, "NCERT Physics Class 12 — Book 2"),
      ];
    }
  }
  if (subject === "Chemistry") {
    if (classLevel === "Class 11") {
      return [
        ...toChapters(CHEM_11_B1, "NCERT Chemistry Class 11 — Book 1"),
        ...toChapters(CHEM_11_B2, "NCERT Chemistry Class 11 — Book 2"),
      ];
    }
    if (classLevel === "Class 12") {
      return [
        ...toChapters(CHEM_12_B1, "NCERT Chemistry Class 12 — Book 1"),
        ...toChapters(CHEM_12_B2, "NCERT Chemistry Class 12 — Book 2"),
      ];
    }
  }
  if (subject === "Mathematics" || subject === "Math") {
    if (classLevel === "Class 11") return toChapters(MATH_11, "NCERT Mathematics Class 11");
    if (classLevel === "Class 12") return toChapters(MATH_12, "NCERT Mathematics Class 12");
    if (classLevel === "Class 10") return toChapters(MATH_10, "NCERT Mathematics Class 10");
  }
  if (subject === "Biology") {
    if (classLevel === "Class 11") return toChapters(BIO_11, "NCERT Biology Class 11");
    if (classLevel === "Class 12") return toChapters(BIO_12, "NCERT Biology Class 12");
  }
  if (subject === "English" && examType === "boards") {
    return toChapters(ENGLISH_BOARDS, `${classLevel} English`);
  }
  if (subject === "History" && examType === "boards") {
    return toChapters(HISTORY_BOARDS, `${classLevel} History`);
  }

  // Science for boards class 10
  if (classLevel === "Class 10" && (subject === "Physics" || subject === "Chemistry" || subject === "Biology")) {
    return toChapters(SCIENCE_10, "NCERT Science Class 10");
  }

  // UPSC
  if (examType === "upsc") {
    const banks: Record<string, string[]> = {
      "Polity": UPSC_POLITY, "History": UPSC_HISTORY, "Geography": UPSC_GEOGRAPHY,
      "Economics": UPSC_ECONOMICS, "Science": UPSC_SCIENCE, "Environment": UPSC_ENVIRONMENT,
    };
    if (banks[subject]) return toChapters(banks[subject], `UPSC ${subject} — ${classLevel}`);
  }

  // SSC
  if (examType === "ssc") {
    const banks: Record<string, string[]> = {
      "Quantitative Aptitude": SSC_QUANT, "English": SSC_ENGLISH,
      "Reasoning": SSC_REASONING, "General Awareness": SSC_GA,
    };
    if (banks[subject]) return toChapters(banks[subject], `SSC ${subject} — ${classLevel}`);
  }

  return genericChaptersForClass(subject, classLevel);
}

// Back-compat helper (used by StudyChapters w/o class)
export function getChaptersForSubject(subject: string, classLevel = "Class 11", examType = "boards"): Chapter[] {
  return getChapters(examType, subject, classLevel);
}
