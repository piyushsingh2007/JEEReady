/**
 * SubmitModal component
 * Displays section-by-section breakdown of answered/unanswered/marked questions
 * and requires confirmation before final submission.
 */

export function renderSubmitModal(container, {
  questions,
  responses,
  timeRemainingFormatted,
  onConfirmSubmit,
  onClose
}) {
  // Aggregate stats by Subject & Section
  const sections = [
    { subject: 'physics', section: 'A', name: 'Physics - Section A (MCQ)' },
    { subject: 'physics', section: 'B', name: 'Physics - Section B (Numerical)' },
    { subject: 'chemistry', section: 'A', name: 'Chemistry - Section A (MCQ)' },
    { subject: 'chemistry', section: 'B', name: 'Chemistry - Section B (Numerical)' },
    { subject: 'mathematics', section: 'A', name: 'Mathematics - Section A (MCQ)' },
    { subject: 'mathematics', section: 'B', name: 'Mathematics - Section B (Numerical)' }
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
    <div class="modal-overlay" id="submit-modal-overlay">
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title">Exam Summary & Submission Confirmation</div>
          <button class="modal-close-btn" id="submit-modal-close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 0.75rem 1rem; border-radius: 4px; margin-bottom: 1.25rem; font-size: 0.85rem; color: #0369a1;">
            <strong>Time Remaining:</strong> ${timeRemainingFormatted}. Once submitted, you will not be able to modify your answers.
          </div>

          <table class="submit-summary-table">
            <thead>
              <tr>
                <th>Section Name</th>
                <th>No. of Qs</th>
                <th>Answered</th>
                <th>Not Answered</th>
                <th>Marked for Review</th>
                <th>Ans & Marked</th>
                <th>Not Visited</th>
              </tr>
            </thead>
            <tbody>
              ${summary.map(s => `
                <tr>
                  <td>${s.name}</td>
                  <td>${s.total}</td>
                  <td style="color: #16a34a; font-weight: 700;">${s.answered}</td>
                  <td style="color: #dc2626; font-weight: 700;">${s.unanswered}</td>
                  <td style="color: #7c3aed; font-weight: 700;">${s.marked}</td>
                  <td style="color: #7c3aed; font-weight: 700;">${s.ansMarked}</td>
                  <td style="color: #64748b;">${s.notVisited}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 1rem; font-size: 0.875rem;">
            <div><strong>Total Evaluated Responses:</strong> ${totalEvaluated} of ${totalQuestions}</div>
            <div style="font-size: 0.775rem; color: #64748b; margin-top: 0.25rem;">
              (Includes both <em>Answered</em> and <em>Answered & Marked for Review</em> questions according to official JEE Main rules)
            </div>
          </div>

          <div style="margin-top: 1.25rem; font-weight: 600; text-align: center; color: #1e293b;">
            Are you sure you want to finish and submit the test now?
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="submit-modal-cancel-btn">
            No, Return to Test
          </button>
          <button class="btn btn-danger" id="submit-modal-confirm-btn" style="font-weight: 700;">
            Yes, Submit Exam Final
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
