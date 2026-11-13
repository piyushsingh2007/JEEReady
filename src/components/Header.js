/**
 * Header component for Exam Edge CBT
 * Minimal slate top bar + clean subject tabs & monospaced countdown timer
 */

export function renderExamHeader(container, {
  testTitle,
  timeRemainingFormatted,
  subjects,
  currentSubject,
  onSelectSubject,
  onOpenQuestionPaper,
  onOpenInstructions,
  onToggleMobilePalette
}) {
  const subjectTitles = {
    physics: 'Physics',
    chemistry: 'Chemistry',
    mathematics: 'Mathematics'
  };

  const html = `
    <!-- Top Bar: Minimal Dark Slate -->
    <header class="cbt-top-header">
      <div class="cbt-top-title">
        <span class="brand-edge-mark">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
          </svg>
        </span>
        <span class="brand-name-text">Exam Edge</span>
        <span class="cbt-top-sep">/</span>
        <span class="cbt-test-name">${testTitle}</span>
      </div>

      <div class="cbt-top-links">
        <button id="header-qpaper-btn" class="cbt-top-link-btn" title="View complete question paper">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          </svg>
          <span>Question Paper</span>
        </button>

        <button id="header-instructions-btn" class="cbt-top-link-btn" title="View exam instructions">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>Instructions</span>
        </button>
      </div>
    </header>

    <!-- Sub-header: Subject Tabs & Remaining Time -->
    <div class="cbt-sub-header">
      <div class="cbt-subject-tabs">
        ${subjects.map(sub => {
          const isActive = sub === currentSubject;
          return `
            <button class="cbt-subject-tab ${isActive ? 'active' : ''}" data-subject="${sub}">
              <span>${subjectTitles[sub] || sub}</span>
            </button>
          `;
        }).join('')}
      </div>

      <div style="display: flex; align-items: center; gap: 12px;">
        <div class="cbt-timer-box">
          <span class="timer-lbl">Time Left</span>
          <span class="timer-digits" id="cbt-timer-display">${timeRemainingFormatted}</span>
        </div>

        <!-- Mobile Palette toggle button (for < 600px width) -->
        <button id="mobile-palette-toggle-btn" class="btn-cbt-default" style="display: none; padding: 3px 8px; font-size: 11px;">
          Palette
        </button>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Subject tab clicks
  container.querySelectorAll('.cbt-subject-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.getAttribute('data-subject');
      if (sub && onSelectSubject) {
        onSelectSubject(sub);
      }
    });
  });

  container.querySelector('#header-qpaper-btn')?.addEventListener('click', () => {
    if (onOpenQuestionPaper) onOpenQuestionPaper();
  });

  container.querySelector('#header-instructions-btn')?.addEventListener('click', () => {
    if (onOpenInstructions) onOpenInstructions();
  });

  // Mobile toggle check
  const mobileToggle = container.querySelector('#mobile-palette-toggle-btn');
  if (mobileToggle) {
    if (window.innerWidth < 600) {
      mobileToggle.style.display = 'inline-block';
    }
    mobileToggle.addEventListener('click', () => {
      if (onToggleMobilePalette) onToggleMobilePalette();
    });
  }
}
