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

// ===== NCERT chapter banks for classes 6-9 =====
const NCERT_BOARDS_69: Record<string, Record<string, string[]>> = {
  Science: {
    "Class 6": ["Food: Where Does It Come From?", "Components of Food", "Fibre to Fabric", "Sorting Materials into Groups", "Separation of Substances", "Changes Around Us", "Getting to Know Plants", "Body Movements", "The Living Organisms and Their Surroundings", "Motion and Measurement of Distances", "Light, Shadows and Reflections", "Electricity and Circuits", "Fun with Magnets", "Water", "Air Around Us", "Garbage In, Garbage Out"],
    "Class 7": ["Nutrition in Plants", "Nutrition in Animals", "Fibre to Fabric", "Heat", "Acids, Bases and Salts", "Physical and Chemical Changes", "Weather, Climate and Adaptations", "Winds, Storms and Cyclones", "Soil", "Respiration in Organisms", "Transportation in Animals and Plants", "Reproduction in Plants", "Motion and Time", "Electric Current and its Effects", "Light", "Water: A Precious Resource", "Forests: Our Lifeline", "Wastewater Story"],
    "Class 8": ["Crop Production and Management", "Microorganisms: Friend and Foe", "Synthetic Fibres and Plastics", "Materials: Metals and Non-Metals", "Coal and Petroleum", "Combustion and Flame", "Conservation of Plants and Animals", "Cell — Structure and Functions", "Reproduction in Animals", "Reaching the Age of Adolescence", "Force and Pressure", "Friction", "Sound", "Chemical Effects of Electric Current", "Some Natural Phenomena", "Light", "Stars and the Solar System", "Pollution of Air and Water"],
    "Class 9": ["Matter in Our Surroundings", "Is Matter Around Us Pure?", "Atoms and Molecules", "Structure of the Atom", "The Fundamental Unit of Life", "Tissues", "Diversity in Living Organisms", "Motion", "Force and Laws of Motion", "Gravitation", "Work and Energy", "Sound", "Why Do We Fall Ill?", "Natural Resources", "Improvement in Food Resources"],
  },
  Mathematics: {
    "Class 6": ["Knowing Our Numbers", "Whole Numbers", "Playing with Numbers", "Basic Geometrical Ideas", "Understanding Elementary Shapes", "Integers", "Fractions", "Decimals", "Data Handling", "Mensuration", "Algebra", "Ratio and Proportion", "Symmetry", "Practical Geometry"],
    "Class 7": ["Integers", "Fractions and Decimals", "Data Handling", "Simple Equations", "Lines and Angles", "The Triangle and its Properties", "Congruence of Triangles", "Comparing Quantities", "Rational Numbers", "Practical Geometry", "Perimeter and Area", "Algebraic Expressions", "Exponents and Powers", "Symmetry", "Visualising Solid Shapes"],
    "Class 8": ["Rational Numbers", "Linear Equations in One Variable", "Understanding Quadrilaterals", "Practical Geometry", "Data Handling", "Squares and Square Roots", "Cubes and Cube Roots", "Comparing Quantities", "Algebraic Expressions and Identities", "Visualising Solid Shapes", "Mensuration", "Exponents and Powers", "Direct and Inverse Proportions", "Factorisation", "Introduction to Graphs", "Playing with Numbers"],
    "Class 9": ["Number Systems", "Polynomials", "Coordinate Geometry", "Linear Equations in Two Variables", "Introduction to Euclid's Geometry", "Lines and Angles", "Triangles", "Quadrilaterals", "Areas of Parallelograms and Triangles", "Circles", "Constructions", "Heron's Formula", "Surface Areas and Volumes", "Statistics", "Probability"],
  },
  English: {
    "Class 6": ["Honeysuckle: Who Did Patrick's Homework?", "How the Dog Found Himself a Master", "Taro's Reward", "An Indian-American Woman in Space: Kalpana Chawla", "A Different Kind of School", "Who I Am", "Fair Play", "A Game of Chance", "Desert Animals", "The Banyan Tree", "Grammar: Nouns & Pronouns", "Grammar: Verbs & Tenses", "Writing: Letters & Paragraphs"],
    "Class 7": ["Honeycomb: Three Questions", "A Gift of Chappals", "Gopal and the Hilsa Fish", "The Ashes That Made Trees Bloom", "Quality", "Expert Detectives", "The Invention of Vita-Wonk", "Fire: Friend and Foe", "A Bicycle in Good Repair", "The Story of Cricket", "Grammar: Tenses", "Writing: Notice & Diary"],
    "Class 8": ["Honeydew: The Best Christmas Present in the World", "The Tsunami", "Glimpses of the Past", "Bepin Choudhury's Lapse of Memory", "The Summit Within", "This is Jody's Fawn", "A Visit to Cambridge", "A Short Monsoon Diary", "The Great Stone Face", "Grammar: Voice & Reported Speech", "Writing: Essay & Story"],
    "Class 9": ["Beehive: The Fun They Had", "The Sound of Music", "The Little Girl", "A Truly Beautiful Mind", "The Snake and the Mirror", "My Childhood", "Packing", "Reach for the Top", "The Bond of Love", "Kathmandu", "If I Were You", "Grammar: Tenses & Modals", "Writing: Diary, Letter, Story"],
  },
  History: {
    "Class 6": ["What, Where, How and When?", "On the Trail of the Earliest People", "From Gathering to Growing Food", "In the Earliest Cities", "What Books and Burials Tell Us", "Kingdoms, Kings and an Early Republic", "New Questions and Ideas", "Ashoka, the Emperor Who Gave Up War", "Vital Villages, Thriving Towns", "Traders, Kings and Pilgrims", "New Empires and Kingdoms", "Buildings, Paintings and Books"],
    "Class 7": ["Tracing Changes Through a Thousand Years", "New Kings and Kingdoms", "The Delhi Sultans", "The Mughal Empire", "Rulers and Buildings", "Towns, Traders and Craftspersons", "Tribes, Nomads and Settled Communities", "Devotional Paths to the Divine", "The Making of Regional Cultures", "Eighteenth-Century Political Formations"],
    "Class 8": ["How, When and Where", "From Trade to Territory", "Ruling the Countryside", "Tribals, Dikus and the Vision of a Golden Age", "When People Rebel — 1857 and After", "Colonialism and the City", "Weavers, Iron Smelters and Factory Owners", "Civilising the 'Native', Educating the Nation", "Women, Caste and Reform", "The Making of the National Movement"],
    "Class 9": ["The French Revolution", "Socialism in Europe and the Russian Revolution", "Nazism and the Rise of Hitler", "Forest Society and Colonialism", "Pastoralists in the Modern World"],
  },
  "Political Science": {
    "Class 6": ["Understanding Diversity", "Diversity and Discrimination", "What is Government?", "Key Elements of a Democratic Government", "Panchayati Raj", "Rural Administration", "Urban Administration", "Rural Livelihoods", "Urban Livelihoods"],
    "Class 7": ["On Equality", "Role of the Government in Health", "How the State Government Works", "Growing up as Boys and Girls", "Women Change the World", "Understanding Media", "Understanding Advertising", "Markets Around Us", "A Shirt in the Market", "Struggles for Equality"],
    "Class 8": ["The Indian Constitution", "Understanding Secularism", "Why do we need a Parliament?", "Understanding Laws", "Judiciary", "Understanding Our Criminal Justice System", "Understanding Marginalisation", "Confronting Marginalisation", "Public Facilities", "Law and Social Justice"],
    "Class 9": ["What is Democracy? Why Democracy?", "Constitutional Design", "Electoral Politics", "Working of Institutions", "Democratic Rights"],
    "Class 10": ["Power Sharing", "Federalism", "Democracy and Diversity", "Gender, Religion and Caste", "Popular Struggles and Movements", "Political Parties", "Outcomes of Democracy", "Challenges to Democracy"],
    "Class 11": ["Constitution: Why and How?", "Rights in the Indian Constitution", "Election and Representation", "Executive", "Legislature", "Judiciary", "Federalism", "Local Governments", "Constitution as a Living Document", "Philosophy of the Constitution"],
    "Class 12": ["The Cold War Era", "The End of Bipolarity", "US Hegemony in World Politics", "Alternative Centres of Power", "Contemporary South Asia", "International Organisations", "Security in the Contemporary World", "Environment and Natural Resources", "Globalisation", "Challenges of Nation Building", "Era of One-Party Dominance", "Politics of Planned Development"],
  },
  Geography: {
    "Class 6": ["The Earth in the Solar System", "Globe: Latitudes and Longitudes", "Motions of the Earth", "Maps", "Major Domains of the Earth", "Major Landforms of the Earth", "Our Country — India", "India: Climate, Vegetation and Wildlife"],
    "Class 7": ["Environment", "Inside Our Earth", "Our Changing Earth", "Air", "Water", "Natural Vegetation and Wildlife", "Human Environment — Settlement, Transport and Communication", "Human-Environment Interactions: The Tropical and Subtropical Region", "Life in the Temperate Grasslands", "Life in the Deserts"],
    "Class 8": ["Resources", "Land, Soil, Water, Natural Vegetation and Wildlife Resources", "Mineral and Power Resources", "Agriculture", "Industries", "Human Resources"],
    "Class 9": ["India: Size and Location", "Physical Features of India", "Drainage", "Climate", "Natural Vegetation and Wildlife", "Population"],
    "Class 10": ["Resources and Development", "Forest and Wildlife Resources", "Water Resources", "Agriculture", "Minerals and Energy Resources", "Manufacturing Industries", "Lifelines of National Economy"],
    "Class 11": ["Geography as a Discipline", "The Origin and Evolution of the Earth", "Interior of the Earth", "Distribution of Oceans and Continents", "Minerals and Rocks", "Geomorphic Processes", "Landforms and their Evolution", "Composition and Structure of Atmosphere", "Solar Radiation, Heat Balance and Temperature", "Atmospheric Circulation and Weather Systems", "Water in the Atmosphere", "World Climate and Climate Change", "Water (Oceans)", "Movements of Ocean Water"],
    "Class 12": ["Human Geography Nature and Scope", "The World Population", "Human Development", "Primary Activities", "Secondary Activities", "Tertiary and Quaternary Activities", "Transport and Communication", "International Trade", "Human Settlements", "Population: Distribution, Density, Growth and Composition (India)", "Migration", "Human Settlements (India)", "Land Resources and Agriculture", "Water Resources", "Mineral and Energy Resources", "Manufacturing Industries", "Planning and Sustainable Development"],
  },
  Hindi: {
    "Class 6": ["वसंत: वह चिड़िया जो", "बचपन", "नादान दोस्त", "चाँद से थोड़ी सी गप्पें", "अक्षरों का महत्व", "पार नज़र के", "साथी हाथ बढ़ाना", "ऐसे-ऐसे", "टिकट अलबम", "झाँसी की रानी", "व्याकरण: संज्ञा, सर्वनाम, क्रिया", "रचनात्मक लेखन: पत्र व अनुच्छेद"],
    "Class 7": ["वसंत भाग 2: हम पंछी उन्मुक्त गगन के", "दादी माँ", "हिमालय की बेटियाँ", "कठपुतली", "मिठाईवाला", "रक्त और हमारा शरीर", "पापा खो गए", "शाम-एक किसान", "चिड़िया की बच्ची", "अपूर्व अनुभव", "व्याकरण: काल, विशेषण", "लेखन: कहानी व निबंध"],
    "Class 8": ["वसंत भाग 3: ध्वनि", "लाख की चूड़ियाँ", "बस की यात्रा", "दीवानों की हस्ती", "चिट्ठियों की अनूठी दुनिया", "भगवान के डाकिए", "क्या निराश हुआ जाए", "यह सबसे कठिन समय नहीं", "कबीर की साखियाँ", "सुदामा चरित", "व्याकरण: समास, अलंकार", "लेखन: संवाद व विज्ञापन"],
    "Class 9": ["क्षितिज: दो बैलों की कथा", "ल्हासा की ओर", "उपभोक्तावाद की संस्कृति", "साँवले सपनों की याद", "नाना साहब की पुत्री देवी मैना को भस्म कर दिया गया", "प्रेमचंद के फटे जूते", "मेरे बचपन के दिन", "एक कुत्ता और एक मैना", "साखियाँ एवं सबद", "वाख", "व्याकरण: रस, छंद", "लेखन: निबंध, पत्र"],
    "Class 10": ["क्षितिज भाग 2: सूरदास के पद", "राम-लक्ष्मण-परशुराम संवाद", "सवैये और कवित्त", "आत्मकथ्य", "उत्साह एवं अट नहीं रही है", "यह दंतुरित मुसकान", "छाया मत छूना", "कन्यादान", "संगतकार", "नेताजी का चश्मा", "बालगोबिन भगत", "लखनवी अंदाज़", "व्याकरण व लेखन"],
    "Class 11": ["आरोह: कबीर", "मीरा", "पथिक", "वे आँखें", "घर की याद", "चंपा काले काले अच्छर नहीं चीन्हती", "गणतंत्र दिवस", "नमक का दारोगा", "मियाँ नसीरुद्दीन", "अपू के साथ ढाई साल", "व्याकरण व रचनात्मक लेखन"],
    "Class 12": ["आरोह भाग 2: आत्मपरिचय", "पतंग", "कविता के बहाने", "कैमरे में बंद अपाहिज", "उषा", "बादल राग", "कवितावली", "रुबाइयाँ", "छोटा मेरा खेत", "भक्तिन", "बाज़ार दर्शन", "काले मेघा पानी दे", "व्याकरण व रचनात्मक लेखन"],
  },
};

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
