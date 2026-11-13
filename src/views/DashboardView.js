import { TEST_PRESETS } from '../data/questionBank.js';
import { Storage } from '../utils/storage.js';

/**
 * Minimal, distraction-free DashboardView for Exam Edge
 * Restrained typography, subtle borders, no promotional bloat or AI gradients.
 */
export function renderDashboardView(container, { onStartTest, onResumeTest, onReviewAttempt }) {
  const profile = Storage.getProfile();
  const activeExam = Storage.getActiveExam();
  const completedTests = Storage.getCompletedTests();

  // Aggregate stats
  const totalAttempts = completedTests.length;
  let totalScoreSum = 0;
  let topScore = 0;
  let totalCorrect = 0;
  let totalAttempted = 0;

  completedTests.forEach(t => {
    totalScoreSum += t.totalScore;
    if (t.totalScore > topScore) topScore = t.totalScore;
    totalCorrect += t.correctCount || 0;
    totalAttempted += (t.correctCount || 0) + (t.incorrectCount || 0);
  });

  const avgScore = totalAttempts > 0 ? Math.round(totalScoreSum / totalAttempts) : 0;
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  const html = `
    <!-- Top Navigation Bar -->
    <header class="dash-header-bar">
      <div class="dash-header-inner">
        <a href="#dashboard" class="dash-brand">
          <span class="brand-edge-mark">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>
          </span>
          <span class="dash-brand-title">Exam Edge</span>
          <span class="dash-brand-pill">JEE 2026</span>
        </a>

        <div class="dash-user-meta">
          <span class="dash-user-label">Candidate</span>
          <span class="dash-user-name">${profile.name.replace('Candidate: ', '')}</span>
        </div>
      </div>
    </header>

    <main class="dash-container">
      <!-- Active Exam Resume Banner if available -->
      ${activeExam ? `
        <div class="dash-resume-card">
          <div class="dash-resume-info">
            <div class="dash-resume-tag">In-Progress Session</div>
            <div class="dash-resume-title">${activeExam.testTitle}</div>
            <div class="dash-resume-sub">
              ${Math.floor(activeExam.timeRemaining / 60)} minutes remaining &bull; Automatically saved
            </div>
          </div>
          <div class="dash-resume-actions">
            <button id="resume-exam-btn" class="btn-cbt-primary">
              Resume Test
            </button>
            <button id="discard-exam-btn" class="btn-cbt-ghost">
              Discard
            </button>
          </div>
        </div>
      ` : ''}

      <!-- Performance Summary Stats -->
      <section class="dash-stats-section">
        <div class="dash-stat-box">
          <div class="dash-stat-label">Tests Taken</div>
          <div class="dash-stat-val">${totalAttempts}</div>
        </div>
        <div class="dash-stat-box">
          <div class="dash-stat-label">Average Score</div>
          <div class="dash-stat-val">${avgScore} <span class="dash-stat-denom">/ 300</span></div>
        </div>
        <div class="dash-stat-box">
          <div class="dash-stat-label">Top Score</div>
          <div class="dash-stat-val">${topScore} <span class="dash-stat-denom">/ 300</span></div>
        </div>
        <div class="dash-stat-box">
          <div class="dash-stat-label">Accuracy</div>
          <div class="dash-stat-val">${overallAccuracy}<span class="dash-stat-denom">%</span></div>
        </div>
      </section>

      <!-- Practice Tests Section -->
      <section class="dash-section">
        <div class="dash-section-header">
          <div>
            <h2 class="dash-section-title">Available Practice Tests</h2>
            <p class="dash-section-desc">Authentic CBT simulation following official NTA 2026 paper pattern.</p>
          </div>
        </div>

        <div class="dash-tests-grid">
          ${TEST_PRESETS.map((test) => `
            <div class="dash-test-card">
              <div class="dash-test-header">
                <span class="dash-test-badge ${test.category === 'full-mock' ? 'badge-primary' : 'badge-neutral'}">
                  ${test.category === 'full-mock' ? 'Full Mock' : test.category === 'subject' ? 'Subject Test' : 'Sprint'}
                </span>
                <span class="dash-test-timing">${test.durationMinutes} mins</span>
              </div>

              <div class="dash-test-body">
                <h3 class="dash-test-name">${test.title}</h3>
                <p class="dash-test-desc">${test.description}</p>
              </div>

              <div class="dash-test-footer">
                <div class="dash-test-specs">
                  <span><strong>${test.totalQuestions}</strong> questions</span>
                  <span>&bull;</span>
                  <span><strong>${test.maxMarks}</strong> marks</span>
                </div>
                <button class="btn-cbt-primary start-test-btn" data-test-id="${test.id}">
                  Start Test
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Recent Test Attempts History -->
      <section class="dash-section">
        <div class="dash-section-header" style="justify-content: space-between; align-items: baseline;">
          <div>
            <h2 class="dash-section-title">Attempt History</h2>
            <p class="dash-section-desc">Past performance reviews and solution breakdowns.</p>
          </div>
          ${completedTests.length > 0 ? `
            <button id="clear-history-btn" class="btn-cbt-ghost-danger">
              Clear History
            </button>
          ` : ''}
        </div>

        ${completedTests.length > 0 ? `
          <div class="dash-table-wrapper">
            <table class="dash-history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Test Title</th>
                  <th>Score</th>
                  <th>Accuracy</th>
                  <th>Subject Breakdown</th>
                  <th>Time Taken</th>
                  <th style="text-align: right;">Action</th>
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
                      <td class="cell-date">${dateStr}</td>
                      <td class="cell-title">${attempt.testTitle}</td>
                      <td class="cell-score">
                        <span class="score-highlight">${attempt.totalScore}</span>
                        <span class="score-denom">/${attempt.maxScore}</span>
                      </td>
                      <td class="cell-acc">${attempt.accuracy}%</td>
                      <td class="cell-mono">
                        <span>P: ${pScore}</span>
                        <span class="sep">&bull;</span>
                        <span>C: ${cScore}</span>
                        <span class="sep">&bull;</span>
                        <span>M: ${mScore}</span>
                      </td>
                      <td class="cell-time">${minsTaken}m</td>
                      <td style="text-align: right;">
                        <button class="btn-cbt-default review-attempt-btn" data-attempt-id="${attempt.attemptId}">
                          Review
                        </button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        ` : `
          <div class="dash-empty-state">
            <p>No completed tests yet. Start a practice test above to view score analytics and step-by-step solutions.</p>
          </div>
        `}
      </section>
    </main>
  `;

  container.innerHTML = html;

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
    if (confirm('Discard in-progress test?')) {
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
    if (confirm('Clear all test attempt history?')) {
      Storage.clearAllHistory();
      renderDashboardView(container, { onStartTest, onResumeTest, onReviewAttempt });
    }
  });
}
