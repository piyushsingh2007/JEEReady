/**
 * InstructionsModal component
 * Quick reference modal for exam instructions, color codes, and navigation rules.
 */

export function renderInstructionsModal(container, { onClose }) {
  const modalHtml = `
    <div class="modal-overlay" id="instr-modal-overlay">
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title">JEE Main Computer Based Test (CBT) Instructions</div>
          <button class="modal-close-btn" id="instr-modal-close-btn">&times;</button>
        </div>
        <div class="modal-body" style="font-size: 0.9rem; line-height: 1.6;">
          <h4 style="font-size: 1rem; color: #0f172a; margin-bottom: 0.5rem;">Question Palette Symbol Legends:</h4>
          
          <table class="legend-table" style="margin-bottom: 1.25rem;">
            <tbody>
              <tr>
                <td><span class="q-symbol state-not-visited">1</span></td>
                <td>You have not visited the question yet.</td>
              </tr>
              <tr>
                <td><span class="q-symbol state-unanswered">2</span></td>
                <td>You have visited the question but have not answered it yet.</td>
              </tr>
              <tr>
                <td><span class="q-symbol state-answered">3</span></td>
                <td>You have answered the question.</td>
              </tr>
              <tr>
                <td><span class="q-symbol state-marked">4</span></td>
                <td>You have NOT answered the question, but have marked it for review.</td>
              </tr>
              <tr>
                <td><span class="q-symbol state-ans-marked">5</span></td>
                <td>The question is answered and marked for review. <strong>(Will be evaluated for scoring!)</strong></td>
              </tr>
            </tbody>
          </table>

          <h4 style="font-size: 1rem; color: #0f172a; margin-bottom: 0.5rem;">Marking Scheme & Rules:</h4>
          <ul style="padding-left: 1.25rem; margin-bottom: 1rem; color: #334155;">
            <li><strong>+4 Marks</strong> for each correct response in both Section A (MCQs) and Section B (Numerical).</li>
            <li><strong>-1 Mark</strong> for each incorrect response in both Section A and Section B.</li>
            <li><strong>0 Marks</strong> for unattempted questions.</li>
            <li>In Section B, enter the correct numerical value using either the on-screen keypad or physical keyboard.</li>
          </ul>

          <h4 style="font-size: 1rem; color: #0f172a; margin-bottom: 0.5rem;">Navigation & Answering:</h4>
          <ul style="padding-left: 1.25rem; color: #334155;">
            <li>Click <strong>Save & Next</strong> to save your answer and proceed to the next question.</li>
            <li>Click <strong>Clear Response</strong> to deselect an option or clear numerical input.</li>
            <li>Click <strong>Mark for Review & Next</strong> to flag a question for later without answering.</li>
            <li>Keyboard shortcuts: <code>[1-4]</code> selects option, <code>[Alt+S]</code> Save & Next, <code>[Alt+C]</code> Clear, <code>[Alt+P]</code> Previous, <code>[Alt+N]</code> Next.</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" id="instr-modal-close-action">Close Instructions</button>
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
