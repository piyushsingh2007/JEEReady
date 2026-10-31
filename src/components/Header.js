/**
 * Header component matching the JEE CBT exam screenshot
 * Compact dark top bar + clean subject tabs & time left sub-bar
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
    <!-- 1. Compact Dark Top Bar -->
    <header class="cbt-top-header">
      <div class="cbt-top-title">
        <span>JEEReady - ${testTitle}</span>
      </div>

      <div class="cbt-top-links">
        <button id="header-qpaper-btn" class="cbt-top-link-btn" title="View complete question paper">
          <span class="link-icon-badge green">P</span>
          <span>Question Paper</span>
        </button>

        <button id="header-instructions-btn" class="cbt-top-link-btn" title="View exam instructions">
          <span class="link-icon-badge blue">i</span>
          <span>Instructions</span>
        </button>
      </div>
    </header>

    <!-- 2. Sub-header: Subject Tabs & Remaining Time -->
    <div class="cbt-sub-header">
      <div class="cbt-subject-tabs">
        ${subjects.map(sub => {
          const isActive = sub === currentSubject;
          return `
            <button class="cbt-subject-tab ${isActive ? 'active' : ''}" data-subject="${sub}">
              <span>${subjectTitles[sub] || sub}</span>
              <span class="info-icon">i</span>
            </button>
          `;
        }).join('')}
      </div>

      <div style="display: flex; align-items: center; gap: 12px;">
        <div class="cbt-timer-box">
          <span>Time Left:</span>
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
