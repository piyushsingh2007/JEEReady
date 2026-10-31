/**
 * Header component for the CBT exam environment
 */

export function renderExamHeader(container, {
  testTitle,
  timeRemainingFormatted,
  isTimerWarning,
  candidateProfile,
  subjects,
  currentSubject,
  questions,
  responses,
  onSelectSubject,
  onOpenQuestionPaper,
  onOpenInstructions,
  onToggleMobilePalette
}) {
  // Count answered questions per subject
  const subjectStats = {};
  subjects.forEach(sub => {
    const subQs = questions.filter(q => q.subject === sub);
    let answeredCount = 0;
    subQs.forEach(q => {
      const resp = responses[q.id];
      if (resp && (resp.status === 'answered' || resp.status === 'answered_marked')) {
        answeredCount++;
      }
    });
    subjectStats[sub] = {
      total: subQs.length,
      answered: answeredCount
    };
  });

  const subjectTitles = {
    physics: 'Physics',
    chemistry: 'Chemistry',
    mathematics: 'Mathematics'
  };

  const html = `
    <header class="cbt-top-bar">
      <!-- Left: Brand & Test Name -->
      <div class="cbt-brand-box">
        <a href="#dashboard" style="text-decoration: none; display: flex; align-items: center; gap: 0.5rem;">
          <img src="/icons/icon-192.png" alt="JEEReady" style="width: 28px; height: 28px; border-radius: 6px;" />
          <span class="cbt-logo-badge">JEEREADY</span>
        </a>
        <div class="cbt-test-info">
          <span class="cbt-test-name">${testTitle}</span>
          <span class="cbt-disclaimer-pill">Unofficial JEE Practice Lab</span>
        </div>
      </div>

      <!-- Center: High-contrast Countdown Timer -->
      <div class="cbt-timer-wrapper ${isTimerWarning ? 'warning' : ''}" title="Time remaining for this test">
        <span class="cbt-timer-label">Time Left:</span>
        <span class="cbt-timer-digits" id="cbt-timer-display">${timeRemainingFormatted}</span>
      </div>

      <!-- Right: Actions & Candidate Profile -->
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <button id="header-instructions-btn" class="btn btn-sm btn-outline" style="color: #cbd5e1; border-color: #334155;">
          ℹ️ Instructions
        </button>
        <button id="header-qpaper-btn" class="btn btn-sm btn-outline" style="color: #cbd5e1; border-color: #334155;">
          📄 Question Paper
        </button>

        <!-- Mobile Palette Toggle -->
        <button id="header-mobile-palette-btn" class="mobile-palette-toggle">
          <span>Palette</span>
          <span style="background: rgba(255,255,255,0.25); border-radius: 10px; padding: 0.1rem 0.35rem; font-size: 0.7rem;">
            ${questions.length}
          </span>
        </button>

        <!-- Candidate Profile -->
        <div class="cbt-candidate-info">
          <div class="cbt-candidate-avatar">
            ${candidateProfile.name.split(' ').pop().charAt(0) || 'C'}
          </div>
          <div class="cbt-candidate-meta">
            <span class="cbt-candidate-name">${candidateProfile.name}</span>
            <span class="cbt-candidate-roll">${candidateProfile.rollNumber}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Subject Switcher Bar -->
    <div class="cbt-section-bar">
      <div class="subject-tabs-group">
        ${subjects.map(sub => {
          const isActive = sub === currentSubject;
          const stats = subjectStats[sub] || { answered: 0, total: 0 };
          return `
            <button class="subject-tab-btn ${isActive ? 'active' : ''}" data-subject="${sub}">
              <span>${subjectTitles[sub] || sub}</span>
              <span class="subject-tab-badge">${stats.answered}/${stats.total}</span>
            </button>
          `;
        }).join('')}
      </div>

      <div class="cbt-aux-actions">
        <span style="font-size: 0.75rem; color: #64748b; font-weight: 600;">
          Medium: English
        </span>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Event Listeners
  container.querySelectorAll('.subject-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.getAttribute('data-subject');
      if (sub && onSelectSubject) {
        onSelectSubject(sub);
      }
    });
  });

  container.querySelector('#header-instructions-btn')?.addEventListener('click', () => {
    if (onOpenInstructions) onOpenInstructions();
  });

  container.querySelector('#header-qpaper-btn')?.addEventListener('click', () => {
    if (onOpenQuestionPaper) onOpenQuestionPaper();
  });

  container.querySelector('#header-mobile-palette-btn')?.addEventListener('click', () => {
    if (onToggleMobilePalette) onToggleMobilePalette();
  });
}
