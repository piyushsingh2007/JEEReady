/**
 * SubmitModal component
 * Section-wise breakdown of question states before final exam submission
 */

export function renderSubmitModal(container, {
  questions,
  responses,
  timeRemainingFormatted,
  onConfirmSubmit,
  onClose
}) {
  const sections = [
    { subject: 'physics', section: 'A', name: 'Physics - Section A (MCQ Single)' },
    { subject: 'physics', section: 'B', name: 'Physics - Section B (Numeric)' },
    { subject: 'chemistry', section: 'A', name: 'Chemistry - Section A (MCQ Single)' },
    { subject: 'chemistry', section: 'B', name: 'Chemistry - Section B (Numeric)' },
    { subject: 'mathematics', section: 'A', name: 'Mathematics - Section A (MCQ Single)' },
    { subject: 'mathematics', section: 'B', name: 'Mathematics - Section B (Numeric)' }
  ];

  const summary = sections.map(sec => {
    const secQuestions = questions.filter(q => q.subject === sec.subject && q.section === sec.section);
    let answered = 0, unanswered = 0, marked = 0, ansMarked = 0, notVisited = 0;

    secQuestions.forEach(q => {
      const resp = responses[q.id];
      const status = resp ? resp.status : 'not_visited';
      if (status === 'answered') answered++;
      else if (status === 'unanswered') unanswered++;
      else if (status === 'marked') marked++;
      else if (status === 'answered_marked') ansMarked++;
      else notVisited++;
    });

    return {
      ...sec,
      total: secQuestions.length,
      answered,
      unanswered,
      marked,
      ansMarked,
      notVisited
    };
  }).filter(sec => sec.total > 0);

  const totalAnswered = summary.reduce((acc, s) => acc + s.answered, 0);
  const totalAnsMarked = summary.reduce((acc, s) => acc + s.ansMarked, 0);
  const totalEvaluated = totalAnswered + totalAnsMarked;
  const totalQuestions = questions.length;

  const modalHtml = `
    <div class="cbt-modal-backdrop" id="submit-modal-overlay">
      <div class="cbt-modal-panel">
        <div class="cbt-modal-header">
          <span>Exam Summary &amp; Submission Confirmation</span>
          <button class="cbt-modal-close-btn" id="submit-modal-close-btn">&times;</button>
        </div>
        <div class="cbt-modal-body">
          <div class="cbt-modal-notice">
            Time Remaining: <strong>${timeRemainingFormatted}</strong>. Once submitted, answers cannot be edited.
          </div>

          <table class="cbt-summary-table">
            <thead>
              <tr>
                <th>Section</th>
                <th>Total</th>
                <th>Answered</th>
                <th>Not Answered</th>
                <th>Marked</th>
                <th>Ans &amp; Marked</th>
                <th>Not Visited</th>
              </tr>
            </thead>
            <tbody>
              ${summary.map(s => `
                <tr>
                  <td>${s.name}</td>
                  <td>${s.total}</td>
                  <td style="color: #2e7d32; font-weight: 700;">${s.answered}</td>
                  <td style="color: #c62828; font-weight: 700;">${s.unanswered}</td>
                  <td style="color: #6a1b9a; font-weight: 700;">${s.marked}</td>
                  <td style="color: #6a1b9a; font-weight: 700;">${s.ansMarked}</td>
                  <td style="color: #6c757d;">${s.notVisited}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div style="background: #f8fafc; border: 1px solid var(--cbt-border); padding: 10px; font-size: 13px; margin-top: 10px;">
            Total Evaluated Responses: <strong>${totalEvaluated}</strong> of ${totalQuestions}
            <div style="font-size: 11px; color: #6c757d; margin-top: 2px;">
              (Includes questions marked as 'Answered' and 'Answered &amp; Marked for Review')
            </div>
          </div>

          <div style="margin-top: 14px; text-align: center; font-weight: 600; color: #212529;">
            Are you sure you want to finish and submit the test now?
          </div>
        </div>
        <div class="cbt-modal-footer">
          <button class="btn-cbt-default" id="submit-modal-cancel-btn">
            No, Return to Test
          </button>
          <button class="btn-cbt-primary" id="submit-modal-confirm-btn" style="background-color: #c62828; border-color: #c62828;">
            Yes, Submit Final
          </button>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = modalHtml;

  const close = () => {
    container.innerHTML = '';
    if (onClose) onClose();
  };

  container.querySelector('#submit-modal-close-btn')?.addEventListener('click', close);
  container.querySelector('#submit-modal-cancel-btn')?.addEventListener('click', close);
  container.querySelector('#submit-modal-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'submit-modal-overlay') close();
  });

  container.querySelector('#submit-modal-confirm-btn')?.addEventListener('click', () => {
    container.innerHTML = '';
    if (onConfirmSubmit) onConfirmSubmit();
  });
}
