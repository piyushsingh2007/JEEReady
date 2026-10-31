import { TEST_PRESETS } from '../data/questionBank.js';
import { Storage } from '../utils/storage.js';

/**
 * Clean, minimal InstructionsView matching official NTA CBT instructions format
 */
export function renderInstructionsView(container, { testId, onProceedToExam, onBackToDashboard }) {
  const preset = TEST_PRESETS.find(p => p.id === testId) || TEST_PRESETS[0];
  const profile = Storage.getProfile();

  const html = `
    <!-- Top Bar -->
    <header class="cbt-top-header">
      <div class="cbt-top-title">
        <span>JEEReady - Candidate Instructions</span>
      </div>
      <div>
        <button id="instr-back-btn" class="cbt-top-link-btn">
          Back to Dashboard
        </button>
      </div>
    </header>

    <main style="padding: 16px;">
      <div class="instructions-panel">
        <div style="border-bottom: 2px solid var(--cbt-border); padding-bottom: 10px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <h1 style="font-size: 18px; font-weight: 700; color: #111827;">${preset.title}</h1>
            <div style="font-size: 13px; color: #4b5563; margin-top: 4px;">
              Duration: <strong>${preset.durationMinutes} Minutes</strong> | Total Questions: <strong>${preset.totalQuestions}</strong> | Maximum Marks: <strong>${preset.maxMarks}</strong>
            </div>
          </div>
          <div style="font-size: 12px; color: #4b5563; text-align: right;">
            <div>Candidate: <strong>${profile.name.replace('Candidate: ', '')}</strong></div>
            <div>Medium: <strong>English</strong></div>
          </div>
        </div>

        <h2>1. General Instructions</h2>
        <ol>
          <li>The clock will be set at the server. The countdown timer in the top header will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end automatically.</li>
          <li>The Question Palette displayed on the right side of the screen will show the status of each question using one of the following symbols:</li>
        </ol>

        <!-- Symbols Legend Table -->
        <table class="cbt-summary-table" style="max-width: 650px; margin: 12px 0;">
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
          <li>Click on a question number in the Question Palette to jump directly to that question. (This alone does not save your answer).</li>
          <li>Click on <strong>Save & Next</strong> to save your answer for the current question and proceed to the next.</li>
          <li>Click on <strong>Mark for Review & Next</strong> to flag for review and proceed to the next question.</li>
        </ol>

        <h2>3. Answering Questions</h2>
        <ol>
          <li><strong>Multiple Choice (MCQ Single):</strong> Select one option circle (A, B, C, D). Click <strong>Clear Response</strong> to deselect. Click <strong>Save & Next</strong> to save.</li>
          <li><strong>Numerical (Numeric):</strong> Enter numerical value using the on-screen numeric keypad or physical keyboard. Click <strong>Save & Next</strong> to save.</li>
        </ol>

        <h2>4. Marking Scheme</h2>
        <ul>
          <li><strong>Correct:</strong> +4 marks</li>
          <li><strong>Incorrect:</strong> -1 mark</li>
          <li><strong>Unanswered:</strong> 0 marks</li>
        </ul>

        <!-- Declaration Checkbox -->
        <div style="background: #f8fafc; border: 1px solid var(--cbt-border); padding: 12px; margin: 18px 0; display: flex; align-items: flex-start; gap: 8px;">
          <input type="checkbox" id="declaration-checkbox" style="margin-top: 2px; cursor: pointer;" />
          <label for="declaration-checkbox" style="font-size: 13px; cursor: pointer; color: #1f2937;">
            I have read and understood all the instructions given above. I undertake to take this mock exam in an authentic practice environment.
          </label>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 14px;">
          <button id="cancel-to-dash-btn" class="btn-cbt-default" style="padding: 6px 14px;">
            Cancel
          </button>
          <button id="ready-to-begin-btn" class="btn-cbt-primary" disabled style="opacity: 0.5; cursor: not-allowed; padding: 6px 16px;">
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
