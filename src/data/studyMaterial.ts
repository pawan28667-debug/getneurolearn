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
  boards: ["Physics", "Chemistry", "Mathematics", "Biology", "English", "History"],
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
  notesContent: string;
  revisionPoints: string[];
  mcqs: MCQ[];
}

export interface MCQ {
  question: string;
  options: string[];
  answer: number;
  difficulty: "Easy" | "Medium" | "Hard";
  explanation: string;
}

const physicsCh: Chapter[] = [
  {
    id: "units-measurements",
    name: "Units & Measurements",
    notesContent: "Physics begins with measurement. Every measurement requires a unit — a standard of comparison.\n\n**SI Units** form the international standard:\n- Length → metre (m)\n- Mass → kilogram (kg)\n- Time → second (s)\n- Temperature → kelvin (K)\n- Current → ampere (A)\n\n**Dimensional Analysis** lets us check equations, convert units, and derive relationships between physical quantities.\n\nSignificant figures indicate precision: 3.140 has 4 significant figures. Errors propagate through calculations — absolute, relative, and percentage errors matter in experiments.",
    revisionPoints: [
      "7 fundamental SI units: m, kg, s, A, K, mol, cd",
      "Dimensional formula: [M^a L^b T^c]",
      "Significant figures = all certain digits + 1 uncertain",
      "Relative error = Δa / a",
      "Dimensional analysis cannot find dimensionless constants",
    ],
    mcqs: [
      { question: "Which is NOT a fundamental SI unit?", options: ["Kilogram", "Newton", "Ampere", "Kelvin"], answer: 1, difficulty: "Easy", explanation: "Newton is a derived unit (kg·m/s²). Kilogram, Ampere, and Kelvin are fundamental." },
      { question: "The dimensional formula of force is:", options: ["[MLT⁻²]", "[ML²T⁻²]", "[MLT⁻¹]", "[M²LT⁻²]"], answer: 0, difficulty: "Medium", explanation: "Force = mass × acceleration = kg × m/s² = [MLT⁻²]" },
      { question: "Number of significant figures in 0.00340 is:", options: ["5", "3", "2", "6"], answer: 1, difficulty: "Medium", explanation: "Leading zeros don't count. 3, 4, 0 are significant = 3 sig figs." },
      { question: "Dimensional analysis can determine:", options: ["Dimensionless constants", "Relationship between quantities", "Exact numerical values", "All of the above"], answer: 1, difficulty: "Hard", explanation: "Dimensional analysis derives relationships but cannot find pure numbers." },
    ],
  },
  {
    id: "motion-straight-line",
    name: "Motion in a Straight Line",
    notesContent: "**Kinematics** describes motion without worrying about causes.\n\n**Key concepts:**\n- Distance (scalar) vs Displacement (vector)\n- Speed (scalar) vs Velocity (vector)\n- Acceleration = rate of change of velocity\n\n**Equations of motion** (constant acceleration):\n1. v = u + at\n2. s = ut + ½at²\n3. v² = u² + 2as\n\n**Free fall**: acceleration due to gravity g ≈ 9.8 m/s². Air resistance is neglected in ideal cases.\n\n**Graphs**: Slope of x-t graph = velocity; slope of v-t graph = acceleration; area under v-t graph = displacement.",
    revisionPoints: [
      "v = u + at, s = ut + ½at², v² = u² + 2as",
      "Free fall: g ≈ 9.8 m/s² downward",
      "Slope of position-time graph = velocity",
      "Area under velocity-time graph = displacement",
      "Average velocity = total displacement / total time",
    ],
    mcqs: [
      { question: "A ball is thrown vertically up with 20 m/s. Max height is:", options: ["20 m", "40 m", "10 m", "30 m"], answer: 0, difficulty: "Medium", explanation: "v²=u²-2gh → 0=400-2(10)h → h=20m" },
      { question: "The slope of a velocity-time graph gives:", options: ["Velocity", "Displacement", "Acceleration", "Distance"], answer: 2, difficulty: "Easy", explanation: "Slope of v-t graph = Δv/Δt = acceleration." },
      { question: "If a car goes 60 km in 1 hr, then 40 km in 1 hr, average speed is:", options: ["50 km/h", "48 km/h", "45 km/h", "55 km/h"], answer: 0, difficulty: "Easy", explanation: "Total distance = 100 km, total time = 2 hr, avg speed = 50 km/h." },
    ],
  },
  {
    id: "laws-of-motion",
    name: "Laws of Motion",
    notesContent: "**Newton's Three Laws:**\n\n**First Law (Inertia):** A body remains at rest or in uniform motion unless acted upon by an external force.\n\n**Second Law:** F = ma — force equals mass times acceleration.\n\n**Third Law:** Every action has an equal and opposite reaction.\n\n**Key Applications:**\n- Free body diagrams (FBD) — isolate the object, draw all forces\n- Friction: f = μN (static ≤ μₛN, kinetic = μₖN)\n- Tension in strings, normal reaction from surfaces\n- Circular motion: centripetal force = mv²/r\n\n**Momentum:** p = mv. Impulse = FΔt = Δp. Conservation of momentum holds in isolated systems.",
    revisionPoints: [
      "F = ma (Second Law is the workhorse equation)",
      "Friction: f_s ≤ μ_s N, f_k = μ_k N",
      "Draw FBD before solving any force problem",
      "Momentum conservation: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂",
      "Centripetal force = mv²/r (always toward center)",
    ],
    mcqs: [
      { question: "A 5 kg block accelerates at 3 m/s². The net force is:", options: ["15 N", "8 N", "1.67 N", "25 N"], answer: 0, difficulty: "Easy", explanation: "F = ma = 5 × 3 = 15 N" },
      { question: "Which Newton's law explains rocket propulsion?", options: ["First", "Second", "Third", "None"], answer: 2, difficulty: "Medium", explanation: "Rocket pushes gas backward (action), gas pushes rocket forward (reaction)." },
      { question: "A block on a rough surface (μ=0.4, N=50N). Max static friction is:", options: ["20 N", "12.5 N", "200 N", "125 N"], answer: 0, difficulty: "Medium", explanation: "f_s = μN = 0.4 × 50 = 20 N" },
    ],
  },
];

const chemistryCh: Chapter[] = [
  {
    id: "some-basic-concepts",
    name: "Some Basic Concepts of Chemistry",
    notesContent: "Chemistry deals with composition, structure, and properties of matter.\n\n**Classifications of matter:**\n- Elements, Compounds, Mixtures\n- Solid, Liquid, Gas\n\n**Mole Concept:** 1 mole = 6.022 × 10²³ particles (Avogadro's number).\n\nMolar mass = mass of 1 mole of substance in grams.\n\n**Molarity (M)** = moles of solute / litres of solution.\n\n**Stoichiometry:** Balanced equations give mole ratios. Limiting reagent determines the max product.\n\n**Empirical vs Molecular formula:** Empirical = simplest ratio; Molecular = actual number of atoms.",
    revisionPoints: [
      "1 mole = 6.022 × 10²³ particles",
      "Molarity = moles / volume (L)",
      "Limiting reagent = fully consumed first",
      "Empirical formula → simplest whole number ratio",
      "Law of conservation of mass: mass is neither created nor destroyed",
    ],
    mcqs: [
      { question: "Number of molecules in 18g of water:", options: ["6.022 × 10²³", "3.011 × 10²³", "12.044 × 10²³", "1.204 × 10²⁴"], answer: 0, difficulty: "Easy", explanation: "18g H₂O = 1 mole = 6.022 × 10²³ molecules" },
      { question: "Molarity of 4g NaOH in 500 mL solution:", options: ["0.1 M", "0.2 M", "0.5 M", "1.0 M"], answer: 1, difficulty: "Medium", explanation: "Moles = 4/40 = 0.1. Molarity = 0.1/0.5 = 0.2 M" },
    ],
  },
  {
    id: "atomic-structure",
    name: "Atomic Structure",
    notesContent: "**Atomic models evolution:** Dalton → Thomson (plum pudding) → Rutherford (nuclear) → Bohr → Quantum mechanical.\n\n**Bohr Model:** Electrons orbit in fixed energy levels. Energy = -13.6/n² eV for hydrogen.\n\n**Quantum Numbers:**\n- n (principal) → shell/energy level\n- l (azimuthal) → subshell shape (s, p, d, f)\n- m (magnetic) → orbital orientation\n- s (spin) → +½ or -½\n\n**Key Principles:**\n- Aufbau: fill lowest energy first\n- Pauli Exclusion: max 2 electrons per orbital\n- Hund's Rule: fill orbitals singly before pairing",
    revisionPoints: [
      "Quantum numbers: n, l, m, s define electron state",
      "Aufbau order: 1s 2s 2p 3s 3p 4s 3d...",
      "Hund's rule: maximize unpaired electrons",
      "Pauli: no two electrons share all 4 quantum numbers",
      "Bohr energy: E = -13.6 Z²/n² eV",
    ],
    mcqs: [
      { question: "Maximum electrons in n=3 shell:", options: ["8", "18", "32", "2"], answer: 1, difficulty: "Medium", explanation: "Max electrons = 2n² = 2(9) = 18" },
      { question: "Which quantum number determines orbital shape?", options: ["n", "l", "m", "s"], answer: 1, difficulty: "Easy", explanation: "l (azimuthal) determines subshell shape: 0=s, 1=p, 2=d, 3=f" },
    ],
  },
];

const mathsCh: Chapter[] = [
  {
    id: "sets",
    name: "Sets",
    notesContent: "A **set** is a well-defined collection of distinct objects.\n\n**Representations:** Roster {1,2,3} or Set-builder {x : x ∈ ℕ, x < 4}\n\n**Types:** Empty (∅), Finite, Infinite, Equal, Subset, Universal.\n\n**Operations:**\n- Union: A ∪ B = elements in A or B\n- Intersection: A ∩ B = elements in both\n- Complement: A' = U - A\n- Difference: A - B = in A but not in B\n\n**De Morgan's Laws:**\n- (A ∪ B)' = A' ∩ B'\n- (A ∩ B)' = A' ∪ B'\n\n**Cardinality:** n(A ∪ B) = n(A) + n(B) - n(A ∩ B)",
    revisionPoints: [
      "Union, Intersection, Complement, Difference",
      "De Morgan's: (A∪B)' = A'∩B'",
      "n(A∪B) = n(A) + n(B) - n(A∩B)",
      "Empty set is subset of every set",
      "Power set of A has 2^n elements",
    ],
    mcqs: [
      { question: "If A={1,2,3}, B={2,3,4}, then A∩B is:", options: ["{1,2,3,4}", "{2,3}", "{1,4}", "{}"], answer: 1, difficulty: "Easy", explanation: "Common elements are 2 and 3." },
      { question: "Power set of {a,b,c} has how many elements?", options: ["3", "6", "8", "9"], answer: 2, difficulty: "Medium", explanation: "2³ = 8 subsets." },
    ],
  },
  {
    id: "trigonometric-functions",
    name: "Trigonometric Functions",
    notesContent: "**Trigonometric ratios** for a right triangle:\n- sin θ = opposite/hypotenuse\n- cos θ = adjacent/hypotenuse\n- tan θ = opposite/adjacent\n\n**Important identities:**\n- sin²θ + cos²θ = 1\n- 1 + tan²θ = sec²θ\n- 1 + cot²θ = csc²θ\n\n**Compound angles:**\n- sin(A+B) = sinA cosB + cosA sinB\n- cos(A+B) = cosA cosB - sinA sinB\n\n**Domain and range:** sin, cos ∈ [-1, 1]; tan ∈ (-∞, ∞)",
    revisionPoints: [
      "sin²θ + cos²θ = 1 (fundamental identity)",
      "sin(A+B) = sinA cosB + cosA sinB",
      "Period of sin/cos = 2π, tan = π",
      "sin 30° = ½, cos 60° = ½, tan 45° = 1",
      "Radians: π rad = 180°",
    ],
    mcqs: [
      { question: "sin²45° + cos²45° equals:", options: ["0", "1", "½", "2"], answer: 1, difficulty: "Easy", explanation: "Fundamental identity: sin²θ + cos²θ = 1 for all θ." },
      { question: "sin(90° - θ) equals:", options: ["sin θ", "cos θ", "-sin θ", "tan θ"], answer: 1, difficulty: "Easy", explanation: "Co-function identity: sin(90°-θ) = cos θ" },
    ],
  },
];

const biologyCh: Chapter[] = [
  {
    id: "cell-structure",
    name: "Cell: The Unit of Life",
    notesContent: "**Cell Theory:** All living organisms are made of cells; cell is the basic unit of life; cells arise from pre-existing cells.\n\n**Prokaryotic vs Eukaryotic:**\n- Prokaryotic: no membrane-bound nucleus (bacteria)\n- Eukaryotic: membrane-bound nucleus (plants, animals)\n\n**Key Organelles:**\n- Nucleus: DNA storage, controls cell\n- Mitochondria: powerhouse (ATP production)\n- Ribosomes: protein synthesis\n- ER: rough (ribosomes) and smooth\n- Golgi: packaging and transport\n- Lysosomes: digestion (suicidal bags)\n- Chloroplast: photosynthesis (plant cells)",
    revisionPoints: [
      "Cell theory: Schleiden, Schwann, Virchow",
      "Mitochondria = powerhouse of the cell (ATP)",
      "Ribosomes: 70S (prokaryotic), 80S (eukaryotic)",
      "Lysosomes = suicidal bags (contain hydrolytic enzymes)",
      "Plant cells have cell wall, chloroplast, large vacuole",
    ],
    mcqs: [
      { question: "Which organelle is called 'powerhouse of cell'?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi body"], answer: 2, difficulty: "Easy", explanation: "Mitochondria produce ATP via cellular respiration." },
      { question: "Prokaryotic ribosomes are:", options: ["80S", "70S", "60S", "50S"], answer: 1, difficulty: "Medium", explanation: "Prokaryotes have 70S ribosomes (50S + 30S subunits)." },
    ],
  },
];

const polityCh: Chapter[] = [
  {
    id: "indian-constitution",
    name: "Indian Constitution",
    notesContent: "**Making of the Constitution:**\n- Constituent Assembly formed in 1946, chaired by Dr. Rajendra Prasad\n- Dr. B.R. Ambedkar: Chairman of Drafting Committee\n- Adopted on 26 Nov 1949, enforced on 26 Jan 1950\n\n**Key Features:**\n- Lengthiest written constitution in the world\n- Federal structure with unitary bias\n- Parliamentary form of government\n- Fundamental Rights (Part III) — justiciable\n- Directive Principles (Part IV) — non-justiciable\n- Fundamental Duties (Part IVA) — added by 42nd Amendment\n\n**Preamble:** We, the people of India — sovereign, socialist, secular, democratic republic.",
    revisionPoints: [
      "Adopted: 26 Nov 1949, Enforced: 26 Jan 1950",
      "Ambedkar = Chairman of Drafting Committee",
      "Fundamental Rights are justiciable (Part III)",
      "DPSPs are non-justiciable (Part IV)",
      "42nd Amendment added Fundamental Duties",
    ],
    mcqs: [
      { question: "Who is known as Father of Indian Constitution?", options: ["Nehru", "Gandhi", "Ambedkar", "Patel"], answer: 2, difficulty: "Easy", explanation: "Dr. B.R. Ambedkar chaired the Drafting Committee." },
    ],
  },
];

// Map exam+subject to chapters
const chapterMap: Record<string, Chapter[]> = {
  "Physics": physicsCh,
  "Chemistry": chemistryCh,
  "Mathematics": mathsCh,
  "Biology": biologyCh,
  "Polity": polityCh,
  "Math": mathsCh,
};

export function getChaptersForSubject(subject: string): Chapter[] {
  return chapterMap[subject] || generateGenericChapters(subject);
}

function generateGenericChapters(subject: string): Chapter[] {
  return [
    {
      id: `${subject.toLowerCase().replace(/\s/g, "-")}-intro`,
      name: `Introduction to ${subject}`,
      notesContent: `This chapter covers the foundational concepts of ${subject}. Understanding these basics is crucial for building advanced knowledge.\n\n**Key Areas:**\n- Core definitions and terminology\n- Historical context and evolution\n- Basic principles and frameworks\n- Real-world applications`,
      revisionPoints: [
        `${subject} is a core area for exam preparation`,
        "Master fundamentals before moving to advanced topics",
        "Practice with previous year questions",
        "Revise regularly using spaced repetition",
      ],
      mcqs: [
        { question: `Which is the best approach to study ${subject}?`, options: ["Rote memorization", "Conceptual understanding", "Skipping basics", "Random topics"], answer: 1, difficulty: "Easy", explanation: "Conceptual understanding builds a strong foundation." },
      ],
    },
    {
      id: `${subject.toLowerCase().replace(/\s/g, "-")}-advanced`,
      name: `Advanced ${subject}`,
      notesContent: `Building on the fundamentals, this chapter explores advanced concepts in ${subject}.\n\n**Topics covered:**\n- Complex problem-solving strategies\n- Inter-topic connections\n- Application-based thinking\n- Exam-specific tips and tricks`,
      revisionPoints: [
        "Link concepts across chapters for deeper understanding",
        "Solve previous year questions",
        "Time yourself during practice",
        "Focus on high-weightage topics",
      ],
      mcqs: [
        { question: `What helps most in mastering advanced ${subject}?`, options: ["Solving problems daily", "Reading once", "Ignoring basics", "Memorizing formulas only"], answer: 0, difficulty: "Medium", explanation: "Regular problem-solving builds mastery." },
      ],
    },
  ];
}
