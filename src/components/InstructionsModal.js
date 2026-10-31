/**
 * InstructionsModal component
 * Mid-exam instructions reference modal
 */

export function renderInstructionsModal(container, { onClose }) {
  const modalHtml = `
    <div class="cbt-modal-backdrop" id="instr-modal-overlay">
      <div class="cbt-modal-panel">
        <div class="cbt-modal-header">
          <span>Examination Instructions &amp; Question Palette Legend</span>
          <button class="cbt-modal-close-btn" id="instr-modal-close-btn">&times;</button>
        </div>
        <div class="cbt-modal-body" style="font-size: 13px; line-height: 1.5;">
          <h4 style="font-size: 13px; font-weight: 700; margin-bottom: 6px;">Question Palette Symbols:</h4>
          
          <table class="cbt-summary-table" style="margin-bottom: 14px;">
            <tbody>
              <tr>
                <td style="width: 60px;"><span class="cbt-symbol state-not-visited">1</span></td>
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
                <td style="text-align: left;">You have NOT answered the question, but have marked it for review.</td>
              </tr>
              <tr>
                <td><span class="cbt-symbol state-ans-marked">5</span></td>
                <td style="text-align: left;">The question is answered and marked for review. <strong>(Will be evaluated for scoring)</strong></td>
              </tr>
            </tbody>
          </table>

          <h4 style="font-size: 13px; font-weight: 700; margin-bottom: 6px;">Marking Scheme:</h4>
          <ul style="padding-left: 18px; margin-bottom: 12px; color: #374151;">
            <li>+4 marks for each correct response (MCQ Single and Numeric).</li>
            <li>-1 mark for each incorrect response.</li>
            <li>0 marks for unattempted questions.</li>
          </ul>

          <h4 style="font-size: 13px; font-weight: 700; margin-bottom: 6px;">Navigation &amp; Answering:</h4>
          <ul style="padding-left: 18px; color: #374151;">
            <li>Click <strong>Save &amp; Next</strong> to save the current answer and advance.</li>
            <li>Click <strong>Clear Response</strong> to clear the selected choice.</li>
            <li>Click <strong>Mark for Review &amp; Next</strong> to flag for review.</li>
            <li>Keyboard: <code>[1-4]</code> selects MCQ option; <code>[Alt+S]</code> Save &amp; Next; <code>[Alt+C]</code> Clear; <code>[Alt+M]</code> Mark for review.</li>
          </ul>
        </div>
        <div class="cbt-modal-footer">
          <button class="btn-cbt-primary" id="instr-modal-close-action">Close Instructions</button>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = modalHtml;

  const close = () => {
    container.innerHTML = '';
    if (onClose) onClose();
  };

  container.querySelector('#instr-modal-close-btn')?.addEventListener('click', close);
  container.querySelector('#instr-modal-close-action')?.addEventListener('click', close);
  container.querySelector('#instr-modal-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'instr-modal-overlay') close();
  });
}
