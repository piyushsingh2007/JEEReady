import { renderMathInText } from '../utils/mathRenderer.js';
import { Feedback } from '../utils/feedback.js';

/**
 * QuestionView component
 * Renders the question body, options/keypad, and action toolbar.
 */
export function renderQuestionView(container, {
  question,
  questionNumber,
  totalQuestions,
  currentResponse,
  onSaveAndNext,
  onSaveAndMark,
  onClearResponse,
  onMarkForReviewAndNext,
  onPrevious,
  onNext,
  onSelectOption,
  onChangeNumerical
}) {
  const isMcq = question.type === 'mcq';
  const selectedOption = currentResponse ? currentResponse.selectedOption : null;
  const numericalAnswer = (currentResponse && currentResponse.numericalAnswer) || '';

  const html = `
    <div class="question-header-bar">
      <div>
        <div class="question-title-text">
          Question ${questionNumber} <span style="font-size: 0.85rem; color: #64748b; font-weight: normal;">of ${totalQuestions}</span>
        </div>
        <div style="font-size: 0.75rem; color: #64748b; margin-top: 0.15rem;">
          ${question.subject.toUpperCase()} &bull; Section ${question.section} (${isMcq ? 'Multiple Choice' : 'Numerical Answer'}) &bull; ${question.topic || ''}
        </div>
      </div>
      <div class="question-marking-info">
        <span class="mark-plus">+4 Marks</span>
        <span class="mark-minus">-1 Mark</span>
      </div>
    </div>

    <!-- Question Body -->
    <div class="question-body">
      <div class="sample-q-tag">DEMO SAMPLE QUESTION</div>
      <div id="q-text-content">${renderMathInText(question.questionText)}</div>
    </div>

    <!-- Answer Input Area -->
    <div class="question-answer-area">
      ${isMcq ? `
        <div class="mcq-options-list">
          ${question.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const letter = String.fromCharCode(65 + idx); // A, B, C, D
            return `
              <div class="mcq-option-item ${isSelected ? 'selected' : ''}" data-opt-idx="${idx}">
                <div class="mcq-radio-btn">
                  <div class="mcq-radio-dot"></div>
                </div>
                <div class="mcq-option-label">(${letter})</div>
                <div class="mcq-option-text">${renderMathInText(opt)}</div>
                <span style="font-size: 0.7rem; color: #94a3b8; margin-left: auto;">[${idx + 1}]</span>
              </div>
            `;
          }).join('')}
        </div>
      ` : `
        <div class="numerical-input-wrapper">
          <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #334155; margin-bottom: 0.5rem;">
            Enter Numerical Value (Use on-screen keypad or physical keyboard):
          </label>
          <input type="text" 
                 id="numerical-input-box" 
                 class="numerical-display-field" 
                 value="${numericalAnswer}" 
                 placeholder="0.00" 
                 autocomplete="off" />
          
          <div class="virtual-keypad-grid">
            <button class="keypad-btn" data-key="7">7</button>
            <button class="keypad-btn" data-key="8">8</button>
            <button class="keypad-btn" data-key="9">9</button>
            <button class="keypad-btn danger-btn" data-key="clear">Clear</button>

            <button class="keypad-btn" data-key="4">4</button>
            <button class="keypad-btn" data-key="5">5</button>
            <button class="keypad-btn" data-key="6">6</button>
            <button class="keypad-btn action-btn" data-key="backspace">⌫ Del</button>

            <button class="keypad-btn" data-key="1">1</button>
            <button class="keypad-btn" data-key="2">2</button>
            <button class="keypad-btn" data-key="3">3</button>
            <button class="keypad-btn" data-key="-">± (-)</button>

            <button class="keypad-btn" data-key="0" style="grid-column: span 2;">0</button>
            <button class="keypad-btn" data-key=".">.</button>
            <button class="keypad-btn action-btn" id="keypad-enter-btn">Done</button>
          </div>
        </div>
      `}
    </div>

    <!-- Bottom CBT Navigation & Action Controls -->
    <div class="cbt-bottom-bar">
      <div class="bottom-left-actions">
        <button id="btn-save-next" class="btn btn-primary" title="Save Answer and proceed to Next [Alt+S]">
          Save & Next
        </button>
        <button id="btn-save-mark" class="btn btn-purple" title="Save Answer & Mark for Review">
          Save & Mark for Review
        </button>
        <button id="btn-clear" class="btn btn-outline" title="Clear Response [Alt+C]">
          Clear Response
        </button>
        <button id="btn-mark-next" class="btn btn-purple-outline" title="Mark for Review & Next without answering [Alt+M]">
          Mark for Review & Next
        </button>
      </div>

      <div class="bottom-right-actions">
        <button id="btn-prev" class="btn btn-secondary" title="Previous Question [Alt+P]">
          &laquo; Previous
        </button>
        <button id="btn-next" class="btn btn-secondary" title="Next Question [Alt+N]">
          Next &raquo;
        </button>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // MCQ Selection Event Handlers
  if (isMcq) {
    container.querySelectorAll('.mcq-option-item').forEach(el => {
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
      inputEl.addEventListener('focus', () => {
        // bring into view smoothly if on mobile
        inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }

    // Virtual Keypad Handlers
    container.querySelectorAll('.keypad-btn').forEach(btn => {
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
          // Numbers 0-9
          current += key;
        }

        inputEl.value = current;
        if (onChangeNumerical) onChangeNumerical(current);
      });
    });
  }

  // Action Buttons
  container.querySelector('#btn-save-next')?.addEventListener('click', () => {
    Feedback.playAction();
    if (onSaveAndNext) onSaveAndNext();
  });

  container.querySelector('#btn-save-mark')?.addEventListener('click', () => {
    Feedback.playAction();
    if (onSaveAndMark) onSaveAndMark();
  });

  container.querySelector('#btn-clear')?.addEventListener('click', () => {
    Feedback.playClick();
    if (onClearResponse) onClearResponse();
  });

  container.querySelector('#btn-mark-next')?.addEventListener('click', () => {
    Feedback.playAction();
    if (onMarkForReviewAndNext) onMarkForReviewAndNext();
  });

  container.querySelector('#btn-prev')?.addEventListener('click', () => {
    if (onPrevious) onPrevious();
  });

  container.querySelector('#btn-next')?.addEventListener('click', () => {
    if (onNext) onNext();
  });
}
