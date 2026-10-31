/**
 * QuestionPalette component
 * Renders the 5-state NTA JEE Main style question palette, candidate card,
 * and live question status breakdown.
 */

export function renderPaletteSidebar(container, {
  questions,
  responses,
  currentQuestionId,
  currentSubject,
  candidateProfile,
  onSelectQuestion,
  onOpenQuestionPaper,
  onSubmitClick,
  onCloseMobileDrawer
}) {
  // Count states across the current test
  const counts = {
    answered: 0,
    unanswered: 0,
    notVisited: 0,
    marked: 0,
    ansMarked: 0
  };

  questions.forEach(q => {
    const resp = responses[q.id];
    const status = resp ? resp.status : 'not_visited';
    if (status === 'answered') counts.answered++;
    else if (status === 'unanswered') counts.unanswered++;
    else if (status === 'marked') counts.marked++;
    else if (status === 'answered_marked') counts.ansMarked++;
    else counts.notVisited++;
  });

  // Filter questions for the active subject
  const subjectQuestions = questions.filter(q => q.subject === currentSubject);
  const sectionAQuestions = subjectQuestions.filter(q => q.section === 'A');
  const sectionBQuestions = subjectQuestions.filter(q => q.section === 'B');

  const html = `
    <!-- Candidate Info Card -->
    <div class="palette-candidate-card">
      <div class="palette-candidate-avatar-large">
        ${candidateProfile.name.split(' ').pop().charAt(0) || 'C'}
      </div>
      <div>
        <div style="font-weight: 700; font-size: 0.9rem; color: #0f172a;">${candidateProfile.name}</div>
        <div style="font-size: 0.75rem; color: #64748b; font-family: var(--font-mono);">${candidateProfile.rollNumber}</div>
      </div>
      ${onCloseMobileDrawer ? `
        <button id="close-palette-drawer-btn" style="margin-left: auto; font-size: 1.25rem; color: #64748b; padding: 0.25rem;">✕</button>
      ` : ''}
    </div>

    <!-- Status Legend Breakdown -->
    <div class="palette-legend-box">
      <div class="legend-chip">
        <span class="q-symbol state-answered">${counts.answered}</span>
        <span>Answered</span>
      </div>
      <div class="legend-chip">
        <span class="q-symbol state-unanswered">${counts.unanswered}</span>
        <span>Not Answered</span>
      </div>
      <div class="legend-chip">
        <span class="q-symbol state-not-visited">${counts.notVisited}</span>
        <span>Not Visited</span>
      </div>
      <div class="legend-chip">
        <span class="q-symbol state-marked">${counts.marked}</span>
        <span>Marked for Review</span>
      </div>
      <div class="legend-chip" style="grid-column: span 2;">
        <span class="q-symbol state-ans-marked">${counts.ansMarked}</span>
        <span>Ans & Marked for Review (Evaluated)</span>
      </div>
    </div>

    <!-- Question Palette Grid -->
    <div class="palette-grid-wrapper">
      <!-- Section A (MCQs) -->
      ${sectionAQuestions.length > 0 ? `
        <div class="palette-section-title">
          <span>Section A (MCQ)</span>
          <span style="font-size: 0.7rem; color: #94a3b8;">${sectionAQuestions.length} Questions</span>
        </div>
        <div class="palette-btn-grid" style="margin-bottom: 1.25rem;">
          ${sectionAQuestions.map(q => {
            const resp = responses[q.id];
            const status = resp ? resp.status : 'not_visited';
            const isActive = q.id === currentQuestionId;
            const overallIndex = questions.findIndex(item => item.id === q.id) + 1;
            
            let stateClass = 'state-not-visited';
            if (status === 'answered') stateClass = 'state-answered';
            else if (status === 'unanswered') stateClass = 'state-unanswered';
            else if (status === 'marked') stateClass = 'state-marked';
            else if (status === 'answered_marked') stateClass = 'state-ans-marked';

            return `
              <button class="palette-q-btn q-symbol ${stateClass} ${isActive ? 'active-q' : ''}" 
                      data-qid="${q.id}"
                      title="Q${overallIndex} - ${status.replace('_', ' ')}">
                ${overallIndex}
              </button>
            `;
          }).join('')}
        </div>
      ` : ''}

      <!-- Section B (Numerical) -->
      ${sectionBQuestions.length > 0 ? `
        <div class="palette-section-title">
          <span>Section B (Numerical)</span>
          <span style="font-size: 0.7rem; color: #94a3b8;">${sectionBQuestions.length} Questions</span>
        </div>
        <div class="palette-btn-grid">
          ${sectionBQuestions.map(q => {
            const resp = responses[q.id];
            const status = resp ? resp.status : 'not_visited';
            const isActive = q.id === currentQuestionId;
            const overallIndex = questions.findIndex(item => item.id === q.id) + 1;
            
            let stateClass = 'state-not-visited';
            if (status === 'answered') stateClass = 'state-answered';
            else if (status === 'unanswered') stateClass = 'state-unanswered';
            else if (status === 'marked') stateClass = 'state-marked';
            else if (status === 'answered_marked') stateClass = 'state-ans-marked';

            return `
              <button class="palette-q-btn q-symbol ${stateClass} ${isActive ? 'active-q' : ''}" 
                      data-qid="${q.id}"
                      title="Q${overallIndex} - ${status.replace('_', ' ')}">
                ${overallIndex}
              </button>
            `;
          }).join('')}
        </div>
      ` : ''}
    </div>

    <!-- Sidebar Footer Actions -->
    <div class="palette-sidebar-footer">
      <button id="sidebar-question-paper-btn" class="btn btn-outline" style="width: 100%;">
        📄 Question Paper
      </button>
      <button id="sidebar-submit-btn" class="btn btn-danger" style="width: 100%; font-weight: 700;">
        Submit Test
      </button>
    </div>
  `;

  container.innerHTML = html;

  // Attach event listeners
  container.querySelectorAll('.palette-q-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const qid = btn.getAttribute('data-qid');
      if (qid && onSelectQuestion) {
        onSelectQuestion(qid);
      }
    });
  });

  const qPaperBtn = container.querySelector('#sidebar-question-paper-btn');
  if (qPaperBtn && onOpenQuestionPaper) {
    qPaperBtn.addEventListener('click', onOpenQuestionPaper);
  }

  const submitBtn = container.querySelector('#sidebar-submit-btn');
  if (submitBtn && onSubmitClick) {
    submitBtn.addEventListener('click', onSubmitClick);
  }

  const closeDrawerBtn = container.querySelector('#close-palette-drawer-btn');
  if (closeDrawerBtn && onCloseMobileDrawer) {
    closeDrawerBtn.addEventListener('click', onCloseMobileDrawer);
  }
}
