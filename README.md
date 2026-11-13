# Exam Edge

A minimal, distraction-free Computer-Based Test (CBT) practice platform and installable Progressive Web App (PWA) for JEE Main aspirants.

Exam Edge replicates the core computer-based testing mechanics of JEE Main—including the 5-state question palette, live countdown timer, Section A (MCQ Single) and Section B (Numerical) navigation, and comprehensive solution analysis—in an authentic, distraction-free interface.

---

## Features

### 1. Candidate Dashboard & Performance
- **Practice Tests:** Choose from Full Mock Tests (75 Qs / 180 min), Physics Sectional (25 Qs / 60 min), Chemistry Sectional (25 Qs / 60 min), Mathematics Sectional (25 Qs / 60 min), and Sprint Tests (15 Qs / 30 min).
- **Progress Tracking:** Tracks total tests attempted, average score out of 300, top score, and overall accuracy percentage.
- **Attempt History:** Revisit past test attempts, review scores per subject, and inspect detailed solutions anytime.
- **Session Auto-Resume:** If the browser tab is accidentally closed or refreshed during an active exam, Exam Edge detects the in-progress attempt and offers an instant "Resume Test" option.

### 2. Pre-Exam Instructions & Guidelines
- Follows the official candidate instructions format.
- Explains the **5-state Question Palette Legend** with exact visual symbols.
- Outlines question navigation, Section A (MCQs) and Section B (Numerical) answering procedures.
- Mandatory candidate declaration checkbox enables the "I am ready to begin" action.

### 3. Authentic CBT Exam Environment
- **Header:** Live countdown timer, candidate profile badge, test name, and quick-access buttons for Instructions and Question Paper.
- **Subject Navigation:** Switch freely between **Physics**, **Chemistry**, and **Mathematics** tabs.
- **KaTeX Formula Rendering:** Equations, chemical formulas, and mathematical notation are rendered locally with KaTeX.
- **Answer Inputs:**
  - **Section A (MCQs):** 4 radio options with keyboard shortcuts `1`, `2`, `3`, `4`.
  - **Section B (Numerical):** On-screen virtual numeric keypad (0–9, decimal point, negative sign, backspace, clear) along with physical keyboard typing support.
- **5-State Question Palette:**
  1. **Not Visited** (Gray square)
  2. **Not Answered** (Red downward pentagon)
  3. **Answered** (Green upward pentagon)
  4. **Marked for Review** (Purple circle)
  5. **Answered & Marked for Review** (Purple circle with green square — evaluated for scoring)
- **CBT Action Toolbar:**
  - `Save & Next` (Alt + S)
  - `Clear Response` (Alt + C)
  - `Mark for Review & Next` (Alt + M)
- **Modals:**
  - **Question Paper View:** Displays all questions in the test in a single scrollable view for rapid scanning.
  - **Submit Confirmation:** Shows a complete section-by-section breakdown (Answered, Not Answered, Marked for Review, Answered & Marked, Not Visited) before final submission.

### 4. Instant Results & Question-by-Question Review
- **Scorecard:** Total score out of 300, accuracy rate %, estimated percentile, and total time taken.
- **Subject-wise Breakdown:** Physics, Chemistry, and Mathematics scores, correct/incorrect/unanswered counts, and accuracy rate.
- **Comprehensive Solutions:** Question-by-question review with filters (`All`, `Correct`, `Incorrect`, `Unanswered`, `Physics`, `Chemistry`, `Mathematics`) and step-by-step mathematical/chemical explanations.

---

## JEE Main 2026 Paper 1 Structure

Exam Edge is configured with the official 2026 Paper 1 pattern:
- **Total Questions:** 75 (25 Physics, 25 Chemistry, 25 Mathematics)
- **Per Subject:**
  - **Section A:** 20 Multiple Choice Questions (MCQs) — all compulsory
  - **Section B:** 5 Numerical-Answer Questions — all compulsory
- **Total Duration:** 180 Minutes (3 Hours)
- **Marking Scheme:**
  - **Correct Answer:** `+4` Marks
  - **Incorrect Answer:** `-1` Mark (applies to both Section A and Section B)
  - **Unanswered / Marked without Answer:** `0` Marks

---

## Progressive Web App (PWA) & Offline Mode

Exam Edge includes full PWA support:
- `public/manifest.webmanifest` with icons, shortcuts, and standalone display mode.
- `public/sw.js` (Service Worker) caching application assets, stylesheets, scripts, and KaTeX fonts for 100% offline access.
- Works offline once loaded.

---

## Tech Stack

- **Core:** HTML5, Modern ES6+ JavaScript (Vanilla JS Modules)
- **Styling:** Custom Vanilla CSS with responsive design and minimal design tokens
- **Formula Engine:** [KaTeX](https://katex.org/) (bundled locally for offline mathematical typesetting)
- **Build Tool:** [Vite](https://vite.dev/)
- **Icons & Assets:** Vector SVGs & PNGs generated via [Sharp](https://sharp.pixelplumbing.com/)

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation
```bash
# Clone repository
git clone https://github.com/piyushsingh2007/ExamEdge.git
cd ExamEdge

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build
```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Disclaimer

Exam Edge is an independent educational tool developed to help students practice computer-based testing mechanics. It is **NOT** affiliated with, endorsed by, or associated with the National Testing Agency (NTA), the Ministry of Education, or the Joint Entrance Examination (JEE) Apex Board.
