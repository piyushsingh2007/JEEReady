# JEEReady 🎯

> **A polished, responsive Computer-Based Test (CBT) practice arena and installable Progressive Web App (PWA) for JEE Main aspirants.**

JEEReady helps students get thoroughly comfortable with the computer-based testing flow of JEE Main before exam day. It replicates the core test-taking mechanics—such as the 5-state question palette, live countdown timer, Section A (MCQ) / Section B (Numerical) navigation, and detailed submission review—while maintaining an original, clean, and distraction-free design.

---

## ⚡ Core Features

### 1. Student Dashboard & Study Progress
- **Instant Practice Tests:** Choose from **JEE Main 2026 Full Mock (75 Qs)**, **Physics Sectional (25 Qs)**, **Chemistry Sectional (25 Qs)**, **Mathematics Sectional (25 Qs)**, and **Quick 30-Min Sprint (15 Qs)**.
- **Progress Tracking:** Tracks total tests attempted, average score out of 300, top score, and overall accuracy percentage.
- **Attempt History:** Revisit past test attempts, review scores per subject, and inspect detailed solutions anytime.
- **Session Auto-Resume:** If the browser tab is accidentally closed or refreshed during an active exam, JEEReady seamlessly detects the in-progress attempt and offers an instant "Resume Test" option.

### 2. Pre-Exam Instructions & Guidelines
- Replicates the official candidate instructions screen.
- Explains the **5-state Question Palette Legend** with exact visual symbols.
- Outlines question navigation, Section A (MCQs) and Section B (Numerical) answering procedures.
- Mandatory candidate declaration checkbox enables the "I am ready to begin" action.

### 3. Authentic CBT Exam Environment
- **Header:** Live countdown timer with warning alert when under 10 minutes, candidate profile badge, test name, and quick-access buttons for Instructions and Question Paper.
- **Subject Navigation:** Switch freely between **Physics**, **Chemistry**, and **Mathematics** tabs with real-time answered/total counters.
- **KaTeX Formula Rendering:** Equations, chemical formulas, and mathematical notation are rendered locally with KaTeX.
- **Answer Inputs:**
  - **Section A (MCQs):** 4 radio options with keyboard shortcuts `1`, `2`, `3`, `4`.
  - **Section B (Numerical):** On-screen virtual numeric keypad (0–9, decimal point, negative sign, backspace, clear) along with physical keyboard typing support.
- **5-State Question Palette:**
  1. ⚪ **Not Visited** (Gray)
  2. 🔴 **Not Answered** (Red)
  3. 🟢 **Answered** (Green)
  4. 🟣 **Marked for Review** (Purple Circle)
  5. 🟣🟩 **Answered & Marked for Review** (Purple with Green indicator — *evaluated for scoring!*)
- **CBT Action Toolbar:**
  - `Save & Next` (Alt + S)
  - `Save & Mark for Review`
  - `Clear Response` (Alt + C)
  - `Mark for Review & Next` (Alt + M)
  - `« Previous` (Alt + P) / `Next »` (Alt + N)
- **Modals:**
  - **Question Paper View:** Displays all questions in the test in a single scrollable view for rapid scanning.
  - **Submit Confirmation:** Shows a complete section-by-section breakdown (Answered, Not Answered, Marked for Review, Answered & Marked, Not Visited) before final submission.

### 4. Instant Results & Question-by-Question Review
- **Scorecard:** Total score out of 300, accuracy rate %, estimated percentile, and total time taken.
- **Subject-wise Breakdown:** Physics, Chemistry, and Mathematics scores, correct/incorrect/unanswered counts, and accuracy bars.
- **Response Matrix:** Interactive grid of question numbers color-coded by performance (Green = Correct, Red = Incorrect, Gray = Unanswered).
- **Comprehensive Solutions:** Question-by-question review with filters (`All`, `Correct`, `Incorrect`, `Unanswered`, `Physics`, `Chemistry`, `Mathematics`) and step-by-step mathematical/chemical explanations.

---

## 📐 JEE Main 2026 Paper 1 Reference Structure

JEEReady is configured with the official 2026 Paper 1 structure:
- **Total Questions:** 75 (25 Physics, 25 Chemistry, 25 Mathematics)
- **Per Subject:**
  - **Section A:** 20 Multiple Choice Questions (MCQs) — all compulsory
  - **Section B:** 5 Numerical-Answer Questions — all compulsory
- **Total Duration:** 180 Minutes (3 Hours)
- **Marking Scheme:**
  - **Correct Answer:** `+4` Marks
  - **Incorrect Answer:** `-1` Mark (applies to both Section A and Section B)
  - **Unanswered / Marked without Answer:** `0` Marks

*Note: All questions in the demo bank are realistic sample questions labeled for interface demonstration.*

---

## 📱 Progressive Web App (PWA) & Offline Mode

JEEReady includes full PWA support:
- `public/manifest.webmanifest` with icons, shortcuts, and standalone display mode.
- `public/sw.js` (Service Worker) caching application assets, stylesheets, scripts, and KaTeX fonts for 100% offline access.
- Works offline once loaded.

### Installation Instructions:
- **Chrome / Edge (Desktop):** Click the install icon in the URL address bar or click "Install PWA" on the dashboard.
- **Android (Chrome):** Tap the browser menu (`⋮`) and select **"Install app"** or **"Add to Home screen"**.
- **iOS (Safari):** Tap the **Share** button (`⎋`) and choose **"Add to Home Screen"**.

> *Note: PWA installation requires HTTPS when deployed to a public domain.*

---

## 🛠️ Tech Stack

- **Core:** HTML5, Modern ES6+ JavaScript (Vanilla JS Modules)
- **Styling:** Custom Vanilla CSS (Design system with CSS variables, responsive grid, and dark mode support)
- **Formula Engine:** [KaTeX](https://katex.org/) (bundled locally for offline mathematical typesetting)
- **Build Tool:** [Vite](https://vite.dev/)
- **Icons & Assets:** Vector SVGs & PNGs generated via [Sharp](https://sharp.pixelplumbing.com/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation
```bash
# Clone repository
git clone https://github.com/piyushsingh2007/JEEReady.git
cd JEEReady

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

## 🌐 Deployment Guidelines

JEEReady is a static Single Page Application (SPA) with PWA support. It can be deployed to any modern static hosting service with HTTPS:

### Vercel
```bash
npx vercel
```

### Netlify
```bash
npx netlify deploy --prod --dir=dist
```

### Cloudflare Pages
1. Connect repository or upload `dist/` directory.
2. Build command: `npm run build`
3. Output directory: `dist`

### GitHub Pages
Configure GitHub Actions to run `npm run build` and deploy the contents of `dist/` to GitHub Pages.

---

## 🗃️ Adding / Replacing Question Banks

The question bank is structured in `src/data/questionBank.js`. To connect a remote API or custom database:
1. Replace or supplement `RAW_QUESTION_BANK` with questions conforming to the schema:
   ```typescript
   interface Question {
     id: string;               // e.g. 'phy-a-01'
     subject: 'physics' | 'chemistry' | 'mathematics';
     section: 'A' | 'B';       // 'A' for MCQ, 'B' for Numerical
     type: 'mcq' | 'numerical';
     topic: string;
     questionText: string;     // supports $inline$ and $$display$$ LaTeX
     options?: string[];       // 4 options for MCQs
     correctAnswer: number;    // option index (0-3) or numeric value
     acceptableRange?: [number, number]; // for numerical rounding tolerance
     explanation: string;      // step-by-step solution
     isSample: boolean;
   }
   ```
2. Modify `getTestQuestions()` in `src/data/questionBank.js` to fetch from an API endpoint or dynamic JSON file.

---

## ⚖️ Disclaimer

JEEReady is an independent educational tool developed to help students practice computer-based testing mechanics. It is **NOT** affiliated with, endorsed by, or associated with the National Testing Agency (NTA), the Ministry of Education, or the Joint Entrance Examination (JEE) Apex Board.
