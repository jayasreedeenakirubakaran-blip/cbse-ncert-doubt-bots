const SUBJECTS = {
  maths: {
    label: "Maths Bot",
    color: "#0b7a75",
    quickPrompts: [
      "Explain integers with examples",
      "How to solve linear equations?",
      "Difference between perimeter and area",
    ],
    topics: {
      6: [
        { chapter: "Knowing Our Numbers", keywords: ["place value", "number line", "roman"] },
        { chapter: "Whole Numbers", keywords: ["whole numbers", "successor", "predecessor"] },
        { chapter: "Integers", keywords: ["integer", "negative", "positive"] },
        { chapter: "Fractions", keywords: ["fraction", "numerator", "denominator"] },
        { chapter: "Mensuration", keywords: ["perimeter", "area"] },
      ],
      7: [
        { chapter: "Integers", keywords: ["integer", "subtraction", "multiplication"] },
        { chapter: "Fractions and Decimals", keywords: ["decimal", "fraction", "convert"] },
        { chapter: "Simple Equations", keywords: ["equation", "x", "solve"] },
        { chapter: "Lines and Angles", keywords: ["angle", "parallel", "transversal"] },
      ],
      8: [
        { chapter: "Rational Numbers", keywords: ["rational", "p/q"] },
        { chapter: "Linear Equations", keywords: ["linear equation", "solve x"] },
        { chapter: "Comparing Quantities", keywords: ["profit", "loss", "discount", "percentage"] },
        { chapter: "Algebraic Expressions", keywords: ["algebra", "identity"] },
      ],
      9: [
        { chapter: "Number Systems", keywords: ["irrational", "rational", "real number"] },
        { chapter: "Polynomials", keywords: ["polynomial", "zeroes"] },
        { chapter: "Coordinate Geometry", keywords: ["coordinate", "origin", "graph"] },
        { chapter: "Heron's Formula", keywords: ["heron", "triangle area"] },
      ],
      10: [
        { chapter: "Real Numbers", keywords: ["euclid", "hcf", "lcm"] },
        { chapter: "Pair of Linear Equations", keywords: ["linear equations", "substitution", "elimination"] },
        { chapter: "Quadratic Equations", keywords: ["quadratic", "discriminant"] },
        { chapter: "Trigonometry", keywords: ["sin", "cos", "tan", "trigonometry"] },
      ],
    },
  },
  science: {
    label: "Science Bot",
    color: "#0466c8",
    quickPrompts: [
      "Difference between physical and chemical change",
      "Explain photosynthesis simply",
      "What is electric current?",
    ],
    topics: {
      6: [
        { chapter: "Components of Food", keywords: ["nutrients", "balanced diet"] },
        { chapter: "Separation of Substances", keywords: ["filtration", "sedimentation"] },
        { chapter: "Light, Shadows and Reflections", keywords: ["shadow", "reflection"] },
      ],
      7: [
        { chapter: "Nutrition in Plants", keywords: ["photosynthesis", "chlorophyll"] },
        { chapter: "Heat", keywords: ["conduction", "convection", "radiation"] },
        { chapter: "Acids, Bases and Salts", keywords: ["acid", "base", "indicator"] },
      ],
      8: [
        { chapter: "Crop Production", keywords: ["manure", "fertilizer", "irrigation"] },
        { chapter: "Microorganisms", keywords: ["bacteria", "virus", "fermentation"] },
        { chapter: "Force and Pressure", keywords: ["force", "pressure", "pascal"] },
      ],
      9: [
        { chapter: "Matter in Our Surroundings", keywords: ["diffusion", "evaporation", "states of matter"] },
        { chapter: "Cell", keywords: ["cell", "nucleus", "organelle"] },
        { chapter: "Motion", keywords: ["velocity", "acceleration", "distance"] },
      ],
      10: [
        { chapter: "Chemical Reactions and Equations", keywords: ["oxidation", "reduction", "balancing"] },
        { chapter: "Life Processes", keywords: ["respiration", "digestion", "circulation"] },
        { chapter: "Electricity", keywords: ["ohm", "resistance", "current", "voltage"] },
      ],
    },
  },
  social: {
    label: "Social Science Bot",
    color: "#a35d00",
    quickPrompts: [
      "Explain democracy in simple words",
      "Why do monsoons happen in India?",
      "Main causes of the French Revolution",
    ],
    topics: {
      6: [
        { chapter: "The Earth in the Solar System", keywords: ["solar system", "planet"] },
        { chapter: "From Gathering to Growing Food", keywords: ["hunter", "farmer"] },
        { chapter: "Panchayati Raj", keywords: ["panchayat", "local government"] },
      ],
      7: [
        { chapter: "Delhi Sultans", keywords: ["sultan", "delhi"] },
        { chapter: "State Government", keywords: ["mla", "state government"] },
        { chapter: "Air", keywords: ["air pressure", "wind", "atmosphere"] },
      ],
      8: [
        { chapter: "How, When and Where", keywords: ["colonial", "history writing"] },
        { chapter: "Judiciary", keywords: ["judiciary", "court", "justice"] },
        { chapter: "Resources", keywords: ["resource", "human resource"] },
      ],
      9: [
        { chapter: "French Revolution", keywords: ["french revolution", "bastille"] },
        { chapter: "What is Democracy?", keywords: ["democracy", "constitution"] },
        { chapter: "India - Size and Location", keywords: ["latitudes", "longitudes"] },
      ],
      10: [
        { chapter: "Nationalism in Europe", keywords: ["nationalism", "unification"] },
        { chapter: "Power Sharing", keywords: ["power sharing", "federal", "belgium", "sri lanka"] },
        { chapter: "Resources and Development", keywords: ["soil", "resource planning"] },
      ],
    },
  },
  english: {
    label: "English Bot",
    color: "#7a1e74",
    quickPrompts: [
      "Difference between simple and compound sentence",
      "How to improve answers in literature?",
      "Explain active and passive voice",
    ],
    topics: {
      6: [
        { chapter: "Grammar Basics", keywords: ["noun", "verb", "adjective"] },
        { chapter: "Sentence Formation", keywords: ["sentence", "subject", "predicate"] },
      ],
      7: [
        { chapter: "Tenses", keywords: ["tense", "past", "present", "future"] },
        { chapter: "Direct and Indirect Speech", keywords: ["direct", "indirect speech"] },
      ],
      8: [
        { chapter: "Voice", keywords: ["active voice", "passive voice"] },
        { chapter: "Writing Skills", keywords: ["letter", "notice", "paragraph"] },
      ],
      9: [
        { chapter: "Modals and Determiners", keywords: ["modal", "determiner"] },
        { chapter: "Literature Analysis", keywords: ["theme", "character", "poem"] },
      ],
      10: [
        { chapter: "Reported Speech", keywords: ["reported speech", "narration"] },
        { chapter: "First Flight and Footprints", keywords: ["summary", "character sketch"] },
      ],
    },
  },
};

const chatWindow = document.getElementById("chatWindow");
const classSelect = document.getElementById("classSelect");
const chapterSelect = document.getElementById("chapterSelect");
const botLabel = document.getElementById("botLabel");
const botTitle = document.getElementById("botTitle");
const apiStatus = document.getElementById("apiStatus");
const quickPrompts = document.getElementById("quickPrompts");
const form = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const askButton = document.getElementById("askButton");
const exportPdfButton = document.getElementById("exportPdf");
const subjectButtons = [...document.querySelectorAll(".subject-btn")];

let currentSubject = "maths";
const chatState = {};

function stateKey(subject, classNo, chapter) {
  return `${subject}-${classNo}-${chapter}`;
}

function getSelectedChapter() {
  return chapterSelect.value || "all";
}

function ensureHistory(subject, classNo, chapter) {
  const key = stateKey(subject, classNo, chapter);
  if (!chatState[key]) {
    const chapterText = chapter === "all" ? "all chapters" : chapter;
    chatState[key] = [
      {
        role: "bot",
        text: `Hi! I am your ${SUBJECTS[subject].label} for Class ${classNo} (${chapterText}). Ask any NCERT doubt and I will explain clearly.`,
      },
    ];
  }
  return chatState[key];
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderMessages() {
  const classNo = Number(classSelect.value);
  const chapter = getSelectedChapter();
  const history = ensureHistory(currentSubject, classNo, chapter);
  chatWindow.innerHTML = history
    .map(
      (msg) =>
        `<article class="message ${msg.role}">${escapeHtml(msg.text)}</article>`
    )
    .join("");
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getTopics(subject, classNo) {
  return SUBJECTS[subject].topics[classNo] || [];
}

function populateChapterOptions() {
  const classNo = Number(classSelect.value);
  const topics = getTopics(currentSubject, classNo);
  chapterSelect.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All chapters";
  chapterSelect.appendChild(allOption);

  topics.forEach((topic) => {
    const opt = document.createElement("option");
    opt.value = topic.chapter;
    opt.textContent = topic.chapter;
    chapterSelect.appendChild(opt);
  });
}

function findTopic(subject, classNo, question, chapter) {
  const lower = question.toLowerCase();
  const list = getTopics(subject, classNo);
  const filtered = chapter === "all" ? list : list.filter((t) => t.chapter === chapter);
  return filtered.find((topic) => topic.keywords.some((key) => lower.includes(key))) || (filtered[0] ?? null);
}

function mathsReply(question, topic, classNo) {
  const lower = question.toLowerCase();
  let formulaTip = "Use NCERT solved examples first, then attempt exercise questions in order.";

  if (lower.includes("perimeter")) formulaTip = "Perimeter = sum of all sides. Rectangle: 2 x (l + b).";
  if (lower.includes("area")) formulaTip = "Area is covered surface. Rectangle: l x b; triangle: 1/2 x b x h.";
  if (lower.includes("linear equation")) formulaTip = "Move variable terms to one side and constants to the other.";
  if (lower.includes("quadratic")) formulaTip = "Use ax^2 + bx + c = 0 form, then factorization or formula.";

  return [
    topic ? `Likely NCERT chapter: ${topic.chapter} (Class ${classNo}).` : `This is from Class ${classNo} NCERT Maths.`,
    "Method:",
    "1. Write given values and what to find.",
    "2. Choose the right property/formula.",
    "3. Substitute carefully and simplify.",
    "4. Verify sign, unit, and reasonableness.",
    `Key tip: ${formulaTip}`,
  ].join("\n");
}

function scienceReply(topic, classNo) {
  return [
    topic ? `Likely NCERT chapter: ${topic.chapter} (Class ${classNo}).` : `This matches Class ${classNo} Science NCERT concepts.`,
    "Answer frame:",
    "1. Definition in simple words.",
    "2. Why it happens.",
    "3. One textbook/day-to-day example.",
    "4. Key terms to memorize for exams.",
  ].join("\n");
}

function socialReply(topic, classNo) {
  return [
    topic ? `Likely NCERT chapter: ${topic.chapter} (Class ${classNo}).` : `This links to Class ${classNo} Social Science NCERT chapters.`,
    "Answer frame:",
    "1. Intro line.",
    "2. 3 to 5 clear points (cause/effect/features).",
    "3. One NCERT example (event/place/case).",
    "4. One-line conclusion.",
  ].join("\n");
}

function englishReply(topic, classNo) {
  return [
    topic ? `Likely NCERT chapter area: ${topic.chapter} (Class ${classNo}).` : `This falls under Class ${classNo} English NCERT prep.`,
    "Answer frame:",
    "1. Rule or idea in simple language.",
    "2. Correct example sentence.",
    "3. Common mistake to avoid.",
    "4. Short practice task.",
  ].join("\n");
}

function buildLocalReply(question, subject, classNo, chapter) {
  const topic = findTopic(subject, classNo, question, chapter);
  switch (subject) {
    case "maths":
      return mathsReply(question, topic, classNo);
    case "science":
      return scienceReply(topic, classNo);
    case "social":
      return socialReply(topic, classNo);
    case "english":
      return englishReply(topic, classNo);
    default:
      return "Please choose a subject bot and ask your question again.";
  }
}

function setApiStatus() {
  apiStatus.textContent = "Mode: Offline NCERT tutor (free)";
}

function setLoading(loading) {
  askButton.disabled = loading;
  askButton.textContent = loading ? "Thinking..." : "Ask";
}

function setActiveTheme() {
  const subject = SUBJECTS[currentSubject];
  document.documentElement.style.setProperty("--active-color", subject.color);
  botLabel.textContent = subject.label;
  botTitle.textContent = `Class ${classSelect.value} NCERT Helper`;

  subjectButtons.forEach((btn) => {
    const isActive = btn.dataset.subject === currentSubject;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-selected", String(isActive));
  });

  quickPrompts.innerHTML = "";
  subject.quickPrompts.forEach((prompt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = prompt;
    btn.addEventListener("click", () => {
      userInput.value = prompt;
      form.requestSubmit();
    });
    quickPrompts.appendChild(btn);
  });
}

function pushMessage(role, text) {
  const classNo = Number(classSelect.value);
  const chapter = getSelectedChapter();
  const history = ensureHistory(currentSubject, classNo, chapter);
  history.push({ role, text });
  renderMessages();
}

function exportCurrentChatToPdf() {
  const classNo = Number(classSelect.value);
  const chapter = getSelectedChapter();
  const history = ensureHistory(currentSubject, classNo, chapter);
  const subject = SUBJECTS[currentSubject].label;
  const chapterText = chapter === "all" ? "All chapters" : chapter;

  const printable = history
    .map((msg) => `${msg.role === "user" ? "Student" : "Tutor"}:\n${msg.text}`)
    .join("\n\n");

  const popup = window.open("", "_blank");
  if (!popup) return;

  popup.document.write(`
    <html>
      <head>
        <title>CBSE Doubt Chat Export</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.5; padding: 24px; color: #222; }
          h1 { margin-bottom: 4px; }
          .meta { color: #555; margin-bottom: 16px; }
          pre { white-space: pre-wrap; font: 14px/1.5 Arial, sans-serif; }
        </style>
      </head>
      <body>
        <h1>CBSE NCERT Doubt Chat</h1>
        <div class="meta">${subject} | Class ${classNo} | ${chapterText}</div>
        <pre>${escapeHtml(printable)}</pre>
      </body>
    </html>
  `);
  popup.document.close();
  popup.focus();
  popup.print();
}

subjectButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentSubject = btn.dataset.subject;
    setActiveTheme();
    populateChapterOptions();
    renderMessages();
  });
});

classSelect.addEventListener("change", () => {
  setActiveTheme();
  populateChapterOptions();
  renderMessages();
});

chapterSelect.addEventListener("change", () => {
  renderMessages();
});

exportPdfButton.addEventListener("click", exportCurrentChatToPdf);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const question = userInput.value.trim();
  if (!question) return;

  pushMessage("user", question);
  userInput.value = "";

  const classNo = Number(classSelect.value);
  const chapter = getSelectedChapter();

  setLoading(true);
  const answer = buildLocalReply(question, currentSubject, classNo, chapter);
  pushMessage("bot", answer);
  setLoading(false);
});

setApiStatus();
setActiveTheme();
populateChapterOptions();
renderMessages();
