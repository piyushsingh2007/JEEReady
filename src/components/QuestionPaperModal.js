import { renderMathInText } from '../utils/mathRenderer.js';

/**
 * QuestionPaperModal component
 * Shows the full paper in one scrollable view with KaTeX equations.
 */
export function renderQuestionPaperModal(container, { questions, onClose }) {
  const modalHtml = `
    <div class="modal-overlay" id="paper-modal-overlay">
      <div class="modal-card modal-lg">
        <div class="modal-header">
          <div class="modal-title">Complete Question Paper Preview</div>
          <button class="modal-close-btn" id="paper-modal-close-btn">&times;</button>
        </div>
        <div class="modal-body" style="max-height: 80vh;">
          <div style="font-size: 0.85rem; color: #64748b; margin-bottom: 1.5rem; background: #f8fafc; padding: 0.75rem 1rem; border-radius: 6px; border: 1px solid #e2e8f0;">
            Use this view to quickly scan question wording across the entire test paper. Responses can be selected directly on the active question screen.
          </div>

          <div class="paper-questions-flow">
            ${questions.map((q, idx) => {
              const num = idx + 1;
              const isMcq = q.type === 'mcq';
              return `
                <div style="padding: 1.25rem 0; border-bottom: 1px solid #e2e8f0;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <strong style="color: #0284c7;">Q.${num} (${q.subject.toUpperCase()} - Section ${q.section})</strong>
                    <span style="font-size: 0.75rem; color: #64748b;">${q.topic || ''}</span>
                  </div>
                  <div style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 0.75rem;">
                    ${renderMathInText(q.questionText)}
                  </div>
                  ${isMcq ? `
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.5rem; font-size: 0.875rem;">
                      ${q.options.map((opt, oIdx) => `
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 0.4rem 0.75rem;">
                          <strong>(${String.fromCharCode(65 + oIdx)})</strong> ${renderMathInText(opt)}
                        </div>
                      `).join('')}
                    </div>
                  ` : `
                    <div style="font-size: 0.825rem; color: #64748b; font-style: italic;">
                      [Numerical Value Question: Integer / Decimal response required]
                    </div>
                  `}
                </div>
              `;
            }).join('')}
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" id="paper-modal-ok-btn">Close Preview</button>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = modalHtml;

  const close = () => {
    container.innerHTML = '';
    if (onClose) onClose();
  };

  container.querySelector('#paper-modal-close-btn')?.addEventListener('click', close);
  container.querySelector('#paper-modal-ok-btn')?.addEventListener('click', close);
  container.querySelector('#paper-modal-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'paper-modal-overlay') close();
  });
}
