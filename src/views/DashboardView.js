import { TEST_PRESETS } from '../data/questionBank.js';
import { Storage } from '../utils/storage.js';

/**
 * DashboardView
 * The student portal for initiating practice tests, checking recent performance,
 * configuring exam parameters, and resuming saved attempts.
 */
export function renderDashboardView(container, { onStartTest, onResumeTest, onReviewAttempt }) {
  const profile = Storage.getProfile();
  const activeExam = Storage.getActiveExam();
  const completedTests = Storage.getCompletedTests();

  // Aggregate user study stats
  const totalAttempts = completedTests.length;
  let totalScoreSum = 0;
  let maxScoreSum = 0;
  let topScore = 0;
  let totalCorrect = 0;
  let totalAttempted = 0;

  completedTests.forEach(t => {
    totalScoreSum += t.totalScore;
    maxScoreSum += t.maxScore;
    if (t.totalScore > topScore) topScore = t.totalScore;
    totalCorrect += t.correctCount || 0;
    totalAttempted += (t.correctCount || 0) + (t.incorrectCount || 0);
  });

  const avgScore = totalAttempts > 0 ? Math.round(totalScoreSum / totalAttempts) : 0;
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  const html = `
    <!-- Top Dashboard Navigation -->
    <header class="dashboard-nav">
      <div class="container nav-content">
        <a href="#dashboard" class="brand-wrapper">
          <img src="/icons/icon-192.png" alt="JEEReady" class="brand-logo-img" />
          <div class="brand-text-group">
            <span class="brand-title">JEEReady</span>
            <span class="brand-subtitle">JEE Main CBT Simulation</span>
          </div>
        </a>

        <div style="display: flex; align-items: center; gap: 1rem;">
          <button id="pwa-install-top-btn" class="btn btn-sm btn-outline" style="color: #38bdf8; border-color: #0284c7; display: none;">
            📲 Install App
          </button>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: #38bdf8; color: #0f172a; font-weight: 800; display: flex; align-items: center; justify-content: center; font-size: 0.85rem;">
              ${profile.name.split(' ').pop().charAt(0) || 'P'}
            </div>
            <span style="font-size: 0.85rem; font-weight: 600; color: #f8fafc;" class="candidate-header-name">
              ${profile.name.replace('Candidate: ', '')}
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="dashboard-hero">
      <div class="container hero-content">
        <div class="hero-tag">
          🎯 NTA-Accurate Computer Based Test Arena
        </div>
        <h1 class="hero-heading">
          Master the JEE Main CBT Flow with Confidence
        </h1>
        <p class="hero-desc">
          Experience realistic 3-hour computer-based exams with the official 75-question pattern, authentic 5-state question palette, Section A & B numerical entry, KaTeX formula rendering, and instant analytical breakdowns.
        </p>

        <!-- Stats Bar -->
        <div class="hero-stats-row">
          <div class="stat-card">
            <div class="stat-icon-box">📝</div>
            <div class="stat-meta">
              <span class="stat-val">${totalAttempts}</span>
              <span class="stat-lbl">Tests Attempted</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon-box">📊</div>
            <div class="stat-meta">
              <span class="stat-val">${avgScore}</span>
              <span class="stat-lbl">Average Score</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon-box">🏆</div>
            <div class="stat-meta">
              <span class="stat-val">${topScore}</span>
              <span class="stat-lbl">Highest Score</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon-box">🎯</div>
            <div class="stat-meta">
              <span class="stat-val">${overallAccuracy}%</span>
              <span class="stat-lbl">Overall Accuracy</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Container -->
    <main class="container dashboard-main-content">
      <!-- Active Exam Resume Banner if available -->
      ${activeExam ? `
        <div class="resume-test-banner">
          <div class="resume-info-group">
            <div class="resume-pulse-dot"></div>
            <div>
              <div style="font-weight: 800; font-size: 1.05rem;">
                Test in Progress: ${activeExam.testTitle}
              </div>
              <div style="font-size: 0.85rem; color: #cbd5e1;">
                You have an incomplete test with ${Math.floor(activeExam.timeRemaining / 60)} minutes remaining. Progress was saved automatically.
              </div>
            </div>
          </div>
          <div style="display: flex; gap: 0.75rem;">
            <button id="resume-exam-btn" class="btn btn-success btn-lg">
              Resume Test &raquo;
            </button>
            <button id="discard-exam-btn" class="btn btn-outline" style="color: #cbd5e1; border-color: rgba(255,255,255,0.3);">
              Discard
            </button>
          </div>
        </div>
      ` : ''}

      <!-- Practice Tests Section -->
      <div class="section-header-row">
        <h2 class="section-title">
          <span>⚡ Select Practice Test</span>
        </h2>
        <span class="badge badge-info">2026 JEE Main Paper 1 Pattern</span>
      </div>

      <div class="tests-grid">
        ${TEST_PRESETS.map((test) => {
          const isFullMock = test.category === 'full-mock';
          return `
            <div class="test-card ${isFullMock ? 'featured' : ''}">
              <div>
                <span class="test-card-subject-pill ${
                  test.subjects.length > 1 ? (isFullMock ? 'pill-full' : 'pill-mathematics') :
                  test.subjects[0] === 'physics' ? 'pill-physics' :
                  test.subjects[0] === 'chemistry' ? 'pill-chemistry' : 'pill-mathematics'
                }">
                  ${test.subjects.length > 1 ? (isFullMock ? 'Full Mock Test' : 'Sprint Diagnostic') : test.subjects[0]}
                </span>

                <h3 class="test-card-title">${test.title}</h3>
                <div style="font-size: 0.775rem; color: #0284c7; font-weight: 600; margin-bottom: 0.5rem;">${test.subtitle}</div>
                <p class="test-card-desc">${test.description}</p>
              </div>

              <div>
                <div class="test-card-meta-row">
                  <div class="meta-item">
                    <span>⏱️</span>
                    <span>${test.durationMinutes} Mins</span>
                  </div>
                  <div class="meta-item">
                    <span>❓</span>
                    <span>${test.totalQuestions} Questions</span>
                  </div>
                  <div class="meta-item">
                    <span>⭐</span>
                    <span>${test.maxMarks} Marks</span>
                  </div>
                </div>

                <button class="btn btn-primary start-test-btn" data-test-id="${test.id}" style="width: 100%;">
                  Start Practice Test &raquo;
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Recent Test Attempts History -->
      <div class="section-header-row">
        <h2 class="section-title">
          <span>📜 Recent Test Attempts & Performance History</span>
        </h2>
        ${completedTests.length > 0 ? `
          <button id="clear-history-btn" class="btn btn-sm btn-outline" style="color: #dc2626;">
            Clear History
          </button>
        ` : ''}
      </div>

      <div class="history-card">
        ${completedTests.length > 0 ? `
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Test Title</th>
                  <th>Score</th>
                  <th>Accuracy</th>
                  <th>Breakdown (P / C / M)</th>
                  <th>Time Taken</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${completedTests.map((attempt) => {
                  const dateStr = new Date(attempt.completedAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                  const pScore = attempt.subjectBreakdown?.physics?.score ?? '-';
                  const cScore = attempt.subjectBreakdown?.chemistry?.score ?? '-';
                  const mScore = attempt.subjectBreakdown?.mathematics?.score ?? '-';
                  const minsTaken = Math.floor(attempt.timeTakenSeconds / 60);

                  return `
                    <tr>
                      <td style="font-size: 0.8rem; color: #64748b;">${dateStr}</td>
                      <td><strong>${attempt.testTitle}</strong></td>
                      <td>
                        <span style="font-weight: 800; color: #0284c7; font-size: 1rem;">
                          ${attempt.totalScore}
                        </span>
                        <span style="font-size: 0.75rem; color: #64748b;">/${attempt.maxScore}</span>
                      </td>
                      <td>
                        <span class="badge ${attempt.accuracy >= 70 ? 'badge-success' : attempt.accuracy >= 40 ? 'badge-warning' : 'badge-danger'}">
                          ${attempt.accuracy}%
                        </span>
                      </td>
                      <td style="font-family: var(--font-mono); font-size: 0.8rem;">
                        P: ${pScore} | C: ${cScore} | M: ${mScore}
                      </td>
                      <td style="font-size: 0.8rem; color: #64748b;">
                        ${minsTaken} mins
                      </td>
                      <td>
                        <button class="btn btn-sm btn-outline review-attempt-btn" data-attempt-id="${attempt.attemptId}">
                          Review Solutions
                        </button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        ` : `
          <div style="text-align: center; padding: 3rem 1rem; color: #64748b;">
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🎯</div>
            <div style="font-weight: 700; font-size: 1.1rem; color: #0f172a;">No Completed Tests Yet</div>
            <p style="font-size: 0.875rem; margin-top: 0.25rem;">
              Take your first practice test above to see comprehensive accuracy analysis, percentile estimations, and step-by-step solutions!
            </p>
          </div>
        `}
      </div>

      <!-- PWA Install Card -->
      <div class="pwa-install-banner">
        <div class="pwa-banner-left">
          <div class="pwa-banner-icon">📱</div>
          <div>
            <div style="font-weight: 800; font-size: 1.1rem;">Install JEEReady on Your Phone or Desktop</div>
            <div style="font-size: 0.85rem; color: #e0f2fe; margin-top: 0.2rem;">
              Works 100% offline with full PWA support. Practice anywhere with zero internet interruptions during your exams.
            </div>
          </div>
        </div>
        <button id="pwa-install-banner-btn" class="btn btn-secondary" style="font-weight: 700;">
          Install PWA
        </button>
      </div>

      <!-- Official Pattern & Disclaimer Notice -->
      <footer style="margin: 2rem 0; padding: 1.5rem; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.8rem; color: #64748b; line-height: 1.6;">
        <strong>Important Disclaimer:</strong> JEEReady is an independent, student-built educational preparation platform created to help aspirants get comfortable with the Computer Based Testing (CBT) interface. JEEReady is NOT affiliated with, sponsored by, or endorsed by the National Testing Agency (NTA), the Ministry of Education, or the Joint Entrance Examination (JEE) Apex Board. All demo questions are samples for interface practice and do not claim to be official previous-year questions.
      </footer>
    </main>
  `;

  container.innerHTML = html;

  // Event Listeners
  container.querySelectorAll('.start-test-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const testId = btn.getAttribute('data-test-id');
      if (testId && onStartTest) onStartTest(testId);
    });
  });

  container.querySelector('#resume-exam-btn')?.addEventListener('click', () => {
    if (onResumeTest) onResumeTest();
  });

  container.querySelector('#discard-exam-btn')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to discard your saved test in progress?')) {
      Storage.clearActiveExam();
      renderDashboardView(container, { onStartTest, onResumeTest, onReviewAttempt });
    }
  });

  container.querySelectorAll('.review-attempt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const attemptId = btn.getAttribute('data-attempt-id');
      if (attemptId && onReviewAttempt) onReviewAttempt(attemptId);
    });
  });

  container.querySelector('#clear-history-btn')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your test history?')) {
      Storage.clearAllHistory();
      renderDashboardView(container, { onStartTest, onResumeTest, onReviewAttempt });
    }
  });

  // Handle PWA installation buttons
  const pwaBannerBtn = container.querySelector('#pwa-install-banner-btn');
  const pwaTopBtn = container.querySelector('#pwa-install-top-btn');
  
  if (window.deferredPrompt) {
    if (pwaTopBtn) pwaTopBtn.style.display = 'inline-flex';
    const triggerInstall = async () => {
      window.deferredPrompt.prompt();
      const choice = await window.deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        window.deferredPrompt = null;
        if (pwaTopBtn) pwaTopBtn.style.display = 'none';
        if (pwaBannerBtn) pwaBannerBtn.textContent = 'Installed';
      }
    };
    pwaBannerBtn?.addEventListener('click', triggerInstall);
    pwaTopBtn?.addEventListener('click', triggerInstall);
  } else {
    pwaBannerBtn?.addEventListener('click', () => {
      alert('To install JEEReady:\n\n• On Chrome/Edge (Desktop): Click the install icon in the address bar.\n• On iOS (Safari): Tap Share > "Add to Home Screen".\n• On Android (Chrome): Tap Menu (3 dots) > "Install app" or "Add to Home screen".');
    });
  }
}
