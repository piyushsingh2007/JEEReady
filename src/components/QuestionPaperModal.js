import { renderMathInText } from '../utils/mathRenderer.js';

/**
 * QuestionPaperModal component
 * Shows the full question paper in a clean preview modal
 */
export function renderQuestionPaperModal(container, { questions, onClose }) {
  const modalHtml = `
    <div class="cbt-modal-backdrop" id="paper-modal-overlay">
      <div class="cbt-modal-panel modal-wide">
        <div class="cbt-modal-header">
          <span>Question Paper Preview</span>
          <button class="cbt-modal-close-btn" id="paper-modal-close-btn">&times;</button>
        </div>
        <div class="cbt-modal-body" style="max-height: 80vh;">
          <div style="font-size: 12px; color: #6c757d; margin-bottom: 14px; background: #f8fafc; padding: 8px 12px; border: 1px solid var(--cbt-border);">
            Overview of questions across the paper. Responses are selected directly on the active test screen.
          </div>

          <div>
            ${questions.map((q, idx) => {
              const num = idx + 1;
              const isMcq = q.type === 'mcq';
              return `
                <div style="padding: 10px 0; border-bottom: 1px solid var(--cbt-border-light);">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <strong style="color: var(--cbt-blue-primary);">Q.${num} (${q.subject.toUpperCase()} - Section ${q.section})</strong>
                    <span style="font-size: 11px; color: #6c757d;">${q.topic || ''}</span>
                  </div>
                  <div style="font-size: 13px; line-height: 1.5; margin-bottom: 8px;">
                    ${renderMathInText(q.questionText)}
                  </div>
                  ${isMcq ? `
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 6px; font-size: 12px;">
                      ${q.options.map((opt, oIdx) => `
                        <div style="background: #f8fafc; border: 1px solid var(--cbt-border-light); border-radius: 2px; padding: 4px 8px;">
                          <strong>(${String.fromCharCode(65 + oIdx)})</strong> ${renderMathInText(opt)}
                        </div>
                      `).join('')}
                    </div>
                  ` : `
                    <div style="font-size: 11px; color: #6c757d; font-style: italic;">
                      [Numerical Value Question]
                    </div>
                  `}
                </div>
              `;
            }).join('')}
          </div>
        </div>
        <div class="cbt-modal-footer">
          <button class="btn-cbt-primary" id="paper-modal-ok-btn">Close Preview</button>
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
