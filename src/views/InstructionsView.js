import { TEST_PRESETS } from '../data/questionBank.js';
import { Storage } from '../utils/storage.js';

/**
 * InstructionsView
 * Pre-exam instructions screen mirroring the official JEE Main CBT candidate instructions,
 * with mandatory declaration checkbox before starting the test.
 */
export function renderInstructionsView(container, { testId, onProceedToExam, onBackToDashboard }) {
  const preset = TEST_PRESETS.find(p => p.id === testId) || TEST_PRESETS[0];
  const profile = Storage.getProfile();

  const html = `
    <!-- Top Bar -->
    <header class="dashboard-nav">
      <div class="container nav-content">
        <a href="#dashboard" class="brand-wrapper">
          <img src="/icons/icon-192.png" alt="JEEReady" class="brand-logo-img" />
          <div class="brand-text-group">
            <span class="brand-title">JEEReady</span>
            <span class="brand-subtitle">Exam Instructions</span>
          </div>
        </a>
        <button id="instr-back-btn" class="btn btn-sm btn-outline" style="color: #cbd5e1; border-color: #334155;">
          &laquo; Back to Dashboard
        </button>
      </div>
    </header>

    <main class="container">
      <div class="instructions-container">
        <div class="instructions-header">
          <div>
            <span class="badge badge-info" style="margin-bottom: 0.5rem;">CBT PRE-EXAM GUIDELINES</span>
            <h1 class="instructions-title">${preset.title}</h1>
            <div style="font-size: 0.85rem; color: #64748b; margin-top: 0.25rem;">
              Duration: <strong>${preset.durationMinutes} Minutes</strong> &bull; Total Questions: <strong>${preset.totalQuestions}</strong> &bull; Max Marks: <strong>${preset.maxMarks}</strong>
            </div>
          </div>
          <div style="text-align: right; font-size: 0.8rem; color: #64748b;">
            <div>Language: <strong>English</strong></div>
            <div>Candidate: <strong>${profile.name.replace('Candidate: ', '')}</strong></div>
          </div>
        </div>

        <div class="instructions-content">
          <h3>1. General Instructions</h3>
          <ol>
            <li>The clock will be set at the server. The countdown timer in the top right corner of the screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end automatically.</li>
            <li>The Question Palette displayed on the right side of the screen will show the status of each question using one of the following symbols:</li>
          </ol>

          <!-- Palette Symbols Reference Table -->
          <table class="legend-table">
            <thead>
              <tr style="background: #f8fafc;">
                <th style="padding: 0.5rem; text-align: center; border: 1px solid var(--border-color);">Symbol</th>
                <th style="padding: 0.5rem; text-align: left; border: 1px solid var(--border-color);">Status Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span class="q-symbol state-not-visited">1</span></td>
                <td><strong>Not Visited:</strong> You have not visited the question yet.</td>
              </tr>
              <tr>
                <td><span class="q-symbol state-unanswered">2</span></td>
                <td><strong>Not Answered:</strong> You have visited the question but have not answered it yet.</td>
              </tr>
              <tr>
                <td><span class="q-symbol state-answered">3</span></td>
                <td><strong>Answered:</strong> You have answered the question. (Will be evaluated)</td>
              </tr>
              <tr>
                <td><span class="q-symbol state-marked">4</span></td>
                <td><strong>Marked for Review:</strong> You have NOT answered the question, but have marked it for review. (Will NOT be evaluated)</td>
              </tr>
              <tr>
                <td><span class="q-symbol state-ans-marked">5</span></td>
                <td><strong>Answered & Marked for Review:</strong> You have answered the question and marked it for review. <strong style="color: #16a34a;">(THIS WILL BE EVALUATED FOR SCORING!)</strong></td>
              </tr>
            </tbody>
          </table>

          <h3>2. Navigating to a Question</h3>
          <ol>
            <li>Click on the question number in the Question Palette to jump directly to that question. Note that using this option alone does NOT save your answer to the current question.</li>
            <li>Click on <strong>Save & Next</strong> to save your answer for the current question and then go to the next question.</li>
            <li>Click on <strong>Mark for Review & Next</strong> to save your mark for review and go to the next question without answering.</li>
          </ol>

          <h3>3. Answering Questions</h3>
          <ol>
            <li><strong>Procedure for answering Multiple Choice Questions (Section A):</strong>
              <ul>
                <li>To select your answer, click on the button of one of the options (A, B, C, D). You can also press keys <code>1</code>, <code>2</code>, <code>3</code>, or <code>4</code> on your keyboard.</li>
                <li>To deselect your chosen answer, click on the <strong>Clear Response</strong> button.</li>
                <li>To change your chosen answer, simply click on another option button.</li>
                <li>To save your answer, you MUST click on the <strong>Save & Next</strong> button.</li>
              </ul>
            </li>
            <li><strong>Procedure for answering Numerical Value Questions (Section B):</strong>
              <ul>
                <li>Enter the numerical answer into the text field using either your physical keyboard or the on-screen virtual keypad.</li>
                <li>Use the backspace / Del button on the keypad or keyboard to correct mistakes.</li>
                <li>To save your numerical answer, click on the <strong>Save & Next</strong> button.</li>
              </ul>
            </li>
          </ol>

          <h3>4. Navigating through Sections</h3>
          <ol>
            <li>Sections in this question paper are displayed as tabs on top: <strong>Physics</strong>, <strong>Chemistry</strong>, and <strong>Mathematics</strong>.</li>
            <li>You can view questions in each section by clicking on the section name. The section you are currently viewing is highlighted.</li>
            <li>You can shuffle between sections and questions anytime during the examination as per your convenience.</li>
          </ol>

          <h3>5. Marking Scheme</h3>
          <ul>
            <li><strong>Correct Answer:</strong> +4 marks</li>
            <li><strong>Incorrect Answer:</strong> -1 mark (negative marking applies to both Section A and Section B)</li>
            <li><strong>Unanswered / Marked for Review without answer:</strong> 0 marks</li>
          </ul>

          <!-- Candidate Declaration Box -->
          <div class="declaration-box">
            <input type="checkbox" id="declaration-checkbox" />
            <label for="declaration-checkbox" style="font-size: 0.875rem; cursor: pointer; color: #1e293b;">
              <strong>Declaration:</strong> I have read and understood all the instructions given above. I declare that I am undertaking this simulation for practice purposes in a focused exam environment. I am aware that this is an unofficial practice tool developed by JEEReady and not affiliated with NTA.
            </label>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem;">
            <button id="cancel-to-dash-btn" class="btn btn-secondary btn-lg">
              Cancel
            </button>
            <button id="ready-to-begin-btn" class="btn btn-primary btn-lg" disabled style="opacity: 0.5; cursor: not-allowed; font-weight: 800;">
              I am ready to begin &raquo;
            </button>
          </div>
        </div>
      </div>
    </main>
  `;

  container.innerHTML = html;

  const checkbox = container.querySelector('#declaration-checkbox');
  const readyBtn = container.querySelector('#ready-to-begin-btn');

  checkbox?.addEventListener('change', () => {
    if (checkbox.checked) {
      readyBtn.removeAttribute('disabled');
      readyBtn.style.opacity = '1';
      readyBtn.style.cursor = 'pointer';
    } else {
      readyBtn.setAttribute('disabled', 'true');
      readyBtn.style.opacity = '0.5';
      readyBtn.style.cursor = 'not-allowed';
    }
  });

  readyBtn?.addEventListener('click', () => {
    if (checkbox.checked && onProceedToExam) {
      onProceedToExam(preset.id);
    }
  });

  container.querySelector('#instr-back-btn')?.addEventListener('click', onBackToDashboard);
  container.querySelector('#cancel-to-dash-btn')?.addEventListener('click', onBackToDashboard);
}
