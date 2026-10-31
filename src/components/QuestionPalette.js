/**
 * QuestionPalette component matching the attached JEE CBT screenshot
 * Features candidate profile header, authentic 5-state status legend,
 * subject header strip, 4-column question grid (showing active section),
 * collapse handle, and Submit Test button.
 */

export function renderPaletteSidebar(container, {
  questions,
  responses,
  currentQuestionId,
  currentSubject,
  candidateProfile,
  isCollapsed = false,
  onSelectQuestion,
  onSubmitClick,
  onToggleCollapse
}) {
  const subjectTitles = {
    physics: 'Physics',
    chemistry: 'Chemistry',
    mathematics: 'Mathematics'
  };

  const currentQ = questions.find(q => q.id === currentQuestionId);
  const currentSection = currentQ ? currentQ.section : 'A';

  // Filter questions for the active subject and active section (matching CBT screenshot: 20 MCQs for Sec A)
  const subjectQuestions = questions.filter(q => q.subject === currentSubject);
  const displayQuestions = subjectQuestions.some(q => q.section === currentSection)
    ? subjectQuestions.filter(q => q.section === currentSection)
    : subjectQuestions;

  const html = `
    <!-- Collapse/Expand handle on divider border -->
    <button class="cbt-collapse-toggle-handle" id="cbt-palette-toggle-handle" title="${isCollapsed ? 'Expand Question Palette' : 'Collapse Question Palette'}">
      ${isCollapsed ? '›' : '‹'}
    </button>

    <!-- Candidate Profile Row -->
    <div class="cbt-palette-candidate">
      <div class="candidate-avatar-icon">
        ${candidateProfile.name.split(' ').pop().charAt(0) || 'C'}
      </div>
      <div class="candidate-name-text">
        ${candidateProfile.name.replace('Candidate: ', '')}
      </div>
    </div>

    <!-- Status Legend (2-Column format matching screenshot) -->
    <div class="cbt-palette-legend">
      <div class="legend-grid">
        <div class="legend-item">
          <span class="cbt-symbol state-answered"></span>
          <span>Answered</span>
        </div>
        <div class="legend-item">
          <span class="cbt-symbol state-unanswered"></span>
          <span>Not Answered</span>
        </div>
        <div class="legend-item">
          <span class="cbt-symbol state-not-visited"></span>
          <span>Not Visited</span>
        </div>
        <div class="legend-item">
          <span class="cbt-symbol state-marked"></span>
          <span>Marked for Review</span>
        </div>
      </div>

      <div class="legend-item-full">
        <span class="cbt-symbol state-ans-marked"></span>
        <span>Answered &amp; Marked for Review (will be considered for evaluation)</span>
      </div>
    </div>

    <!-- Blue Subject Header Strip -->
    <div class="cbt-palette-subject-bar">
      <span>${subjectTitles[currentSubject] || currentSubject}</span>
    </div>

    <!-- Question Numbers Grid (4-column layout matching screenshot) -->
    <div class="cbt-palette-grid-area">
      <div class="cbt-questions-grid">
        ${displayQuestions.map(q => {
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
            <button class="cbt-q-tile cbt-symbol ${stateClass} ${isActive ? 'current-active' : ''}" 
                    data-qid="${q.id}"
                    title="Question ${overallIndex} (${q.section === 'A' ? 'MCQ Single' : 'Numeric'}) - ${status.replace('_', ' ')}">
              ${overallIndex}
            </button>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Palette Bottom: Submit Test Button -->
    <div class="cbt-palette-bottom">
      <button id="sidebar-submit-btn" class="btn-cbt-submit">
        Submit Test
      </button>
    </div>
  `;

  container.innerHTML = html;

  if (isCollapsed) {
    container.classList.add('collapsed');
  } else {
    container.classList.remove('collapsed');
  }

  // Event Listeners
  container.querySelectorAll('.cbt-q-tile').forEach(btn => {
    btn.addEventListener('click', () => {
      const qid = btn.getAttribute('data-qid');
      if (qid && onSelectQuestion) {
        onSelectQuestion(qid);
      }
    });
  });

  container.querySelector('#sidebar-submit-btn')?.addEventListener('click', () => {
    if (onSubmitClick) onSubmitClick();
  });

  container.querySelector('#cbt-palette-toggle-handle')?.addEventListener('click', () => {
    if (onToggleCollapse) onToggleCollapse();
  });
}
