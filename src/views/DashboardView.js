import { TEST_PRESETS } from '../data/questionBank.js';
import { Storage } from '../utils/storage.js';

/**
 * Clean, minimal DashboardView
 * Free of emojis, gradients, decorative glow effects, or promotional copy.
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
    <!-- Top Header Bar -->
    <header class="dash-header-bar">
      <a href="#dashboard" class="dash-brand">
        JEEReady | Practice Portal
      </a>

      <div style="font-size: 13px; color: #e2e8f0;">
        <span>${profile.name.replace('Candidate: ', '')}</span>
      </div>
    </header>

    <main class="dash-container">
      <!-- Active Exam Resume Banner if available -->
      ${activeExam ? `
        <div class="dash-resume-card">
          <div>
            <div style="font-weight: 700; font-size: 14px; color: #1e3a8a;">
              Incomplete Test: ${activeExam.testTitle}
            </div>
            <div style="font-size: 12px; color: #475569; margin-top: 2px;">
              ${Math.floor(activeExam.timeRemaining / 60)} minutes remaining. Saved automatically.
            </div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button id="resume-exam-btn" class="btn-cbt-primary" style="padding: 6px 14px;">
              Resume Test
            </button>
            <button id="discard-exam-btn" class="btn-cbt-default" style="padding: 6px 10px; font-size: 12px;">
              Discard
            </button>
          </div>
        </div>
      ` : ''}

      <!-- Performance Summary Stats -->
      <div class="dash-stats-row">
        <div class="dash-stat-box">
          <div class="dash-stat-val">${totalAttempts}</div>
          <div class="dash-stat-label">Tests Attempted</div>
        </div>
        <div class="dash-stat-box">
          <div class="dash-stat-val">${avgScore}</div>
          <div class="dash-stat-label">Average Score / 300</div>
        </div>
        <div class="dash-stat-box">
          <div class="dash-stat-val">${topScore}</div>
          <div class="dash-stat-label">Highest Score</div>
        </div>
        <div class="dash-stat-box">
          <div class="dash-stat-val">${overallAccuracy}%</div>
          <div class="dash-stat-label">Accuracy Rate</div>
        </div>
      </div>

      <!-- Practice Tests Section -->
      <div class="dash-section-heading">Available Practice Tests</div>

      <div class="dash-tests-grid">
        ${TEST_PRESETS.map((test) => `
          <div class="dash-test-item">
            <div>
              <div class="dash-test-name">${test.title}</div>
              <div style="font-size: 12px; color: #64748b; line-height: 1.4;">${test.description}</div>
            </div>

            <div>
              <div class="dash-test-meta">
                <span>Duration: <strong>${test.durationMinutes} min</strong></span>
                <span>Questions: <strong>${test.totalQuestions}</strong></span>
                <span>Marks: <strong>${test.maxMarks}</strong></span>
              </div>

              <button class="btn-cbt-primary start-test-btn" data-test-id="${test.id}" style="width: 100%;">
                Start Practice Test
              </button>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Recent Test Attempts History -->
      <div class="dash-section-heading" style="display: flex; justify-content: space-between; align-items: center;">
        <span>Recent Test Attempts</span>
        ${completedTests.length > 0 ? `
          <button id="clear-history-btn" class="btn-cbt-default" style="font-size: 11px; padding: 2px 8px; color: #c62828;">
            Clear History
          </button>
        ` : ''}
      </div>

      ${completedTests.length > 0 ? `
        <div style="overflow-x: auto;">
          <table class="dash-history-table">
            <thead>
              <tr>
                <th>Date &amp; Time</th>
                <th>Test Title</th>
                <th>Score</th>
                <th>Accuracy</th>
                <th>Breakdown (P / C / M)</th>
                <th>Time Taken</th>
                <th>Action</th>
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
                    <td style="color: #64748b; font-size: 12px;">${dateStr}</td>
                    <td><strong>${attempt.testTitle}</strong></td>
                    <td>
                      <strong>${attempt.totalScore}</strong> / ${attempt.maxScore}
                    </td>
                    <td>${attempt.accuracy}%</td>
                    <td style="font-family: var(--font-mono); font-size: 12px;">
                      P: ${pScore} | C: ${cScore} | M: ${mScore}
                    </td>
                    <td>${minsTaken} mins</td>
                    <td>
                      <button class="btn-cbt-default review-attempt-btn" data-attempt-id="${attempt.attemptId}" style="padding: 2px 8px; font-size: 12px;">
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
        <div style="text-align: center; padding: 24px; color: #64748b; font-size: 13px; background: #ffffff; border: 1px solid var(--cbt-border); border-radius: 3px;">
          No completed tests yet. Start a practice test above to view detailed score analysis and step-by-step solutions.
        </div>
      `}
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
    if (confirm('Clear history?')) {
      Storage.clearAllHistory();
      renderDashboardView(container, { onStartTest, onResumeTest, onReviewAttempt });
    }
  });
}
