import { renderMathInText } from '../utils/mathRenderer.js';
import { Feedback } from '../utils/feedback.js';

/**
 * QuestionView component matching the attached JEE CBT screenshot
 * Features MCQ Single / Numeric tabs, font size adjuster (A+ / A-),
 * clean radio options, and bottom actions in exact order:
 * [ Mark for Review & Next ] [ Clear Response ] ... [ Save & Next ]
 */

export function renderQuestionView(container, {
  question,
  questionNumber,
  currentResponse,
  fontSizeMultiplier = 1.0,
  onSelectSection,
  onSaveAndNext,
  onClearResponse,
  onMarkForReviewAndNext,
  onSelectOption,
  onChangeNumerical,
  onChangeFontSize
}) {
  const isMcq = question.type === 'mcq';
  const selectedOption = currentResponse ? currentResponse.selectedOption : null;
  const numericalAnswer = (currentResponse && currentResponse.numericalAnswer) || '';

  const html = `
    <!-- Section Tabs (MCQ Single vs Numeric) -->
    <div class="cbt-section-tabs-bar">
      <button class="cbt-sec-tab ${isMcq ? 'active' : ''}" data-section="A">
        MCQ Single
      </button>
      <button class="cbt-sec-tab ${!isMcq ? 'active' : ''}" data-section="B">
        Numeric
      </button>
    </div>

    <!-- Question Meta Line (Q.No, Text Size, Q.Type, Marks) -->
    <div class="cbt-q-meta-bar">
      <div class="q-meta-left">
        <span class="q-number-title">Q.No: ${questionNumber}</span>

        <div class="q-text-size-controls">
          <span>Text Size</span>
          <button class="size-btn" id="btn-size-plus" title="Increase text size">A+</button>
          <button class="size-btn" id="btn-size-minus" title="Decrease text size">A-</button>
        </div>

        <div class="q-type-indicator">
          <span>Q.Type : </span>
          <span class="q-type-val">${isMcq ? 'MCQ Single' : 'Numeric'}</span>
        </div>
      </div>

      <div class="q-marks-indicator">
        <span>Marks</span>
        <span class="mark-box plus">4</span>
        <span style="color: #94a3b8;">|</span>
        <span class="mark-box minus">1</span>
      </div>
    </div>

    <!-- Scrollable Question Content -->
    <div class="cbt-question-content" style="font-size: ${fontSizeMultiplier * 14}px;">
      <div class="question-text-wrapper">
        ${renderMathInText(question.questionText)}
      </div>

      <!-- Question Answer Area -->
      ${isMcq ? `
        <div class="cbt-options-group">
          ${question.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const letter = String.fromCharCode(65 + idx); // A, B, C, D
            return `
              <div class="cbt-option-row ${isSelected ? 'selected' : ''}" data-opt-idx="${idx}">
                <div class="cbt-radio-circle">
                  <div class="cbt-radio-fill"></div>
                </div>
                <span class="cbt-option-letter">${letter}</span>
                <div class="cbt-option-body">${renderMathInText(opt)}</div>
              </div>
            `;
          }).join('')}
        </div>
      ` : `
        <div class="cbt-numeric-input-block">
          <label style="display: block; font-size: 12px; font-weight: 600; color: #4b5563; margin-bottom: 6px;">
            Enter Numerical Answer:
          </label>
          <input type="text" 
                 id="numerical-input-box" 
                 class="cbt-numeric-input-field" 
                 value="${numericalAnswer}" 
                 placeholder="0.00" 
                 autocomplete="off" />

          <div class="cbt-keypad-grid">
            <button class="cbt-keypad-btn" data-key="7">7</button>
            <button class="cbt-keypad-btn" data-key="8">8</button>
            <button class="cbt-keypad-btn" data-key="9">9</button>
            <button class="cbt-keypad-btn" data-key="clear" style="color: #c62828;">Clear</button>

            <button class="cbt-keypad-btn" data-key="4">4</button>
            <button class="cbt-keypad-btn" data-key="5">5</button>
            <button class="cbt-keypad-btn" data-key="6">6</button>
            <button class="cbt-keypad-btn" data-key="backspace">Del</button>

            <button class="cbt-keypad-btn" data-key="1">1</button>
            <button class="cbt-keypad-btn" data-key="2">2</button>
            <button class="cbt-keypad-btn" data-key="3">3</button>
            <button class="cbt-keypad-btn" data-key="-">-</button>

            <button class="cbt-keypad-btn" data-key="0" style="grid-column: span 2;">0</button>
            <button class="cbt-keypad-btn" data-key=".">.</button>
            <button class="cbt-keypad-btn btn-cbt-primary" id="keypad-done-btn">Done</button>
          </div>
        </div>
      `}
    </div>

    <!-- Bottom Actions Bar (Exact order: Mark for Review & Next, Clear Response, Save & Next) -->
    <div class="cbt-bottom-bar">
      <div class="cbt-actions-left">
        <button id="btn-mark-next" class="btn-cbt-default" title="Mark for Review and proceed to next question">
          Mark for Review & Next
        </button>
        <button id="btn-clear" class="btn-cbt-default" title="Clear current response">
          Clear Response
        </button>
      </div>

      <div class="cbt-actions-right">
        <button id="btn-save-next" class="btn-cbt-primary" title="Save response and proceed to next question">
          Save & Next
        </button>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Section Tab Navigation (MCQ Single vs Numeric)
  container.querySelectorAll('.cbt-sec-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const sec = tab.getAttribute('data-section');
      if (sec && onSelectSection) {
        onSelectSection(sec);
      }
    });
  });

  // Font Size Adjusters
  container.querySelector('#btn-size-plus')?.addEventListener('click', () => {
    if (onChangeFontSize) onChangeFontSize(Math.min(1.3, fontSizeMultiplier + 0.1));
  });

  container.querySelector('#btn-size-minus')?.addEventListener('click', () => {
    if (onChangeFontSize) onChangeFontSize(Math.max(0.9, fontSizeMultiplier - 0.1));
  });

  // MCQ Selection Event Handlers
  if (isMcq) {
    container.querySelectorAll('.cbt-option-row').forEach(el => {
      el.addEventListener('click', () => {
        const optIdx = parseInt(el.getAttribute('data-opt-idx'), 10);
        Feedback.playClick();
        if (onSelectOption) onSelectOption(optIdx);
      });
    });
  } else {
    // Numerical Input Handlers
    const inputEl = container.querySelector('#numerical-input-box');
    if (inputEl) {
      inputEl.addEventListener('input', (e) => {
        if (onChangeNumerical) onChangeNumerical(e.target.value);
      });
    }

    // Keypad Handlers
    container.querySelectorAll('.cbt-keypad-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        Feedback.playClick();
        const key = btn.getAttribute('data-key');
        if (!inputEl) return;
        let current = inputEl.value;

        if (key === 'clear') {
          current = '';
        } else if (key === 'backspace') {
          current = current.slice(0, -1);
        } else if (key === '-') {
          if (current.startsWith('-')) {
            current = current.substring(1);
          } else {
            current = '-' + current;
          }
        } else if (key === '.') {
          if (!current.includes('.')) {
            current = (current === '' ? '0.' : current + '.');
          }
        } else if (key !== null) {
          current += key;
        }

        inputEl.value = current;
        if (onChangeNumerical) onChangeNumerical(current);
      });
    });

    container.querySelector('#keypad-done-btn')?.addEventListener('click', () => {
      if (onSaveAndNext) onSaveAndNext();
    });
  }

  // Action Buttons in requested order
  container.querySelector('#btn-mark-next')?.addEventListener('click', () => {
    Feedback.playAction();
    if (onMarkForReviewAndNext) onMarkForReviewAndNext();
  });

  container.querySelector('#btn-clear')?.addEventListener('click', () => {
    Feedback.playClick();
    if (onClearResponse) onClearResponse();
  });

  container.querySelector('#btn-save-next')?.addEventListener('click', () => {
    Feedback.playAction();
    if (onSaveAndNext) onSaveAndNext();
  });
}
