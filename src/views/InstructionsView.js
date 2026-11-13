import { TEST_PRESETS } from '../data/questionBank.js';
import { Storage } from '../utils/storage.js';

/**
 * Minimal InstructionsView for Exam Edge
 * Clear typography, clean layout, authentic NTA instructions.
 */
export function renderInstructionsView(container, { testId, onProceedToExam, onBackToDashboard }) {
  const preset = TEST_PRESETS.find(p => p.id === testId) || TEST_PRESETS[0];
  const profile = Storage.getProfile();

  const html = `
    <!-- Top Bar -->
    <header class="cbt-top-header">
      <div class="cbt-top-title">
        <span class="brand-edge-mark">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
          </svg>
        </span>
        <span class="brand-name-text">Exam Edge</span>
        <span class="cbt-top-sep">/</span>
        <span class="cbt-test-name">Instructions</span>
      </div>
      <div>
        <button id="instr-back-btn" class="cbt-top-link-btn">
          Back to Dashboard
        </button>
      </div>
    </header>

    <main class="instructions-container">
      <div class="instructions-panel">
        <div class="instructions-header">
          <div>
            <h1 class="instructions-test-title">${preset.title}</h1>
            <div class="instructions-meta">
              <span>Duration: <strong>${preset.durationMinutes} Minutes</strong></span>
              <span>&bull;</span>
              <span>Questions: <strong>${preset.totalQuestions}</strong></span>
              <span>&bull;</span>
              <span>Max Marks: <strong>${preset.maxMarks}</strong></span>
            </div>
          </div>
          <div class="instructions-candidate-box">
            <div>Candidate: <strong>${profile.name.replace('Candidate: ', '')}</strong></div>
            <div>Medium: <strong>English</strong></div>
          </div>
        </div>

        <h2>1. General Instructions</h2>
        <ol>
          <li>The countdown timer in the top header will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end automatically.</li>
          <li>The Question Palette displayed on the right side of the screen will show the status of each question using the official CBT symbols:</li>
        </ol>

        <!-- Symbols Legend Table -->
        <table class="cbt-summary-table" style="max-width: 650px; margin: 14px 0;">
          <thead>
            <tr>
              <th style="width: 70px;">Symbol</th>
              <th style="text-align: left;">Meaning / Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="cbt-symbol state-not-visited">1</span></td>
              <td style="text-align: left;">You have not visited the question yet.</td>
            </tr>
            <tr>
              <td><span class="cbt-symbol state-unanswered">2</span></td>
              <td style="text-align: left;">You have not answered the question.</td>
            </tr>
            <tr>
              <td><span class="cbt-symbol state-answered">3</span></td>
              <td style="text-align: left;">You have answered the question.</td>
            </tr>
            <tr>
              <td><span class="cbt-symbol state-marked">4</span></td>
              <td style="text-align: left;">You have NOT answered the question, but have marked the question for review.</td>
            </tr>
            <tr>
              <td><span class="cbt-symbol state-ans-marked">5</span></td>
              <td style="text-align: left;">The question is answered and marked for review. <strong>(Will be considered for evaluation)</strong></td>
            </tr>
          </tbody>
        </table>

        <h2>2. Navigating to Questions</h2>
        <ol>
          <li>Click on a question number in the Question Palette to jump directly to that question.</li>
          <li>Click on <strong>Save & Next</strong> to save your answer for the current question and proceed to the next.</li>
          <li>Click on <strong>Mark for Review & Next</strong> to flag for review and proceed to the next question.</li>
        </ol>

        <h2>3. Answering Questions</h2>
        <ol>
          <li><strong>Multiple Choice (MCQ Single):</strong> Select one option (A, B, C, D). Click <strong>Clear Response</strong> to deselect. Click <strong>Save & Next</strong> to save.</li>
          <li><strong>Numerical (Numeric):</strong> Enter numerical value using the on-screen numeric keypad or physical keyboard. Click <strong>Save & Next</strong> to save.</li>
        </ol>

        <h2>4. Marking Scheme</h2>
        <ul>
          <li><strong>Correct:</strong> +4 marks</li>
          <li><strong>Incorrect:</strong> -1 mark</li>
          <li><strong>Unanswered:</strong> 0 marks</li>
        </ul>

        <!-- Declaration Checkbox -->
        <div class="declaration-box">
          <input type="checkbox" id="declaration-checkbox" />
          <label for="declaration-checkbox">
            I have read and understood all the instructions given above. I undertake to take this mock exam in an authentic practice environment.
          </label>
        </div>

        <div class="instructions-actions">
          <button id="cancel-to-dash-btn" class="btn-cbt-default">
            Cancel
          </button>
          <button id="ready-to-begin-btn" class="btn-cbt-primary" disabled>
            I am ready to begin
          </button>
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
    } else {
      readyBtn.setAttribute('disabled', 'true');
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
