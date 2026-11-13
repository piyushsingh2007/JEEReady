import { renderMathInText } from '../utils/mathRenderer.js';
import { Storage } from '../utils/storage.js';

/**
 * Minimal ResultView for Exam Edge
 * Clear performance metrics, subject breakdown, and step-by-step solutions.
 */
export function renderResultView(container, { attemptId, onRetakeTest, onBackToDashboard }) {
  const result = Storage.getCompletedTestById(attemptId) || Storage.getCompletedTests()[0];

  if (!result) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 16px;">
        <h3 style="font-size: 16px; font-weight: 600; color: #0f172a;">No Test Result Found</h3>
        <p style="color: #64748b; font-size: 13px; margin: 8px 0 16px;">The requested attempt could not be loaded.</p>
        <button class="btn-cbt-primary" id="err-back-dash-btn">Return to Dashboard</button>
      </div>
    `;
    container.querySelector('#err-back-dash-btn')?.addEventListener('click', onBackToDashboard);
    return;
  }

  const calcPercentile = (score, max) => {
    if (max === 0) return '0.00';
    const pct = (score / max) * 100;
    if (pct >= 85) return (99.5 + (pct - 85) * 0.03).toFixed(2);
    if (pct >= 70) return (98.0 + (pct - 70) * 0.1).toFixed(2);
    if (pct >= 50) return (93.0 + (pct - 50) * 0.25).toFixed(2);
    if (pct >= 30) return (80.0 + (pct - 30) * 0.65).toFixed(2);
    if (pct >= 15) return (55.0 + (pct - 15) * 1.6).toFixed(2);
    return Math.max(10, pct * 3.6).toFixed(2);
  };

  const estPercentile = calcPercentile(result.totalScore, result.maxScore);
  const timeTakenMins = Math.floor(result.timeTakenSeconds / 60);
  const timeTakenSecs = result.timeTakenSeconds % 60;

  let statusFilter = 'all';
  let subjectFilter = 'all';

  const subjectTitles = {
    physics: 'Physics',
    chemistry: 'Chemistry',
    mathematics: 'Mathematics'
  };

  const renderContent = () => {
    const html = `
      <!-- Top Bar -->
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
          <span class="cbt-test-name">Performance Report</span>
        </div>
        <div style="display: flex; gap: 8px;">
          <button id="res-print-btn" class="cbt-top-link-btn">
            Print
          </button>
          <button id="res-back-btn" class="cbt-top-link-btn" style="color: #93c5fd;">
            Dashboard
          </button>
        </div>
      </header>

      <main class="results-panel">
        <!-- Hero Box -->
        <div class="results-hero-box">
          <div class="results-hero-top">
            <div>
              <h1 class="results-title">${result.testTitle}</h1>
              <div class="results-timestamp">
                Completed on ${new Date(result.completedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
              </div>
            </div>

            <button id="res-retake-btn" class="btn-cbt-default">
              Retake Test
            </button>
          </div>

          <!-- Score Metrics Grid -->
          <div class="results-score-grid">
            <div class="score-box">
              <div class="score-lbl">Total Score</div>
              <div class="score-num">${result.totalScore} <span class="score-denom">/ ${result.maxScore}</span></div>
            </div>

            <div class="score-box">
              <div class="score-lbl">Accuracy</div>
              <div class="score-num accent-green">${result.accuracy}%</div>
            </div>

            <div class="score-box">
              <div class="score-lbl">Est. Percentile</div>
              <div class="score-num accent-blue">${estPercentile}</div>
            </div>

            <div class="score-box">
              <div class="score-lbl">Time Taken</div>
              <div class="score-num" style="font-size: 1.4rem;">${timeTakenMins}m ${timeTakenSecs}s</div>
            </div>
          </div>

          <div class="results-summary-strip">
            <span>Correct: <strong>${result.correctCount}</strong> (+${result.correctCount * 4})</span>
            <span>&bull;</span>
            <span>Incorrect: <strong>${result.incorrectCount}</strong> (-${result.incorrectCount})</span>
            <span>&bull;</span>
            <span>Unanswered: <strong>${result.unansweredCount}</strong></span>
            <span>&bull;</span>
            <span>Attempted: <strong>${result.correctCount + result.incorrectCount}</strong> / ${result.questions.length}</span>
          </div>
        </div>

        <!-- Subject Breakdown Table -->
        <section class="results-section">
          <h2 class="results-section-heading">Subject Performance</h2>
          <div class="dash-table-wrapper">
            <table class="cbt-summary-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Correct</th>
                  <th>Incorrect</th>
                  <th>Unanswered</th>
                  <th>Accuracy</th>
                </tr>
              </thead>
              <tbody>
                ${Object.keys(result.subjectBreakdown).map(sub => {
                  const data = result.subjectBreakdown[sub];
                  return `
                    <tr>
                      <td style="font-weight: 600;">${subjectTitles[sub] || sub}</td>
                      <td style="font-weight: 700; color: #0f172a;">${data.score} / ${data.maxScore}</td>
                      <td style="color: #16a34a; font-weight: 600;">${data.correct}</td>
                      <td style="color: #dc2626; font-weight: 600;">${data.incorrect}</td>
                      <td style="color: #64748b;">${data.unanswered}</td>
                      <td><strong>${data.accuracy}%</strong></td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </section>

        <!-- Filterable Question Review -->
        <section class="results-section">
          <div class="review-filter-bar">
            <h2 class="results-section-heading" style="margin-bottom: 0;">
              Solutions &amp; Review
            </h2>

            <div class="review-status-chips">
              <button class="review-chip ${statusFilter === 'all' ? 'active' : ''}" data-status="all">
                All (${result.questions.length})
              </button>
              <button class="review-chip ${statusFilter === 'correct' ? 'active' : ''}" data-status="correct">
                Correct (${result.correctCount})
              </button>
              <button class="review-chip ${statusFilter === 'incorrect' ? 'active' : ''}" data-status="incorrect">
                Incorrect (${result.incorrectCount})
              </button>
              <button class="review-chip ${statusFilter === 'unanswered' ? 'active' : ''}" data-status="unanswered">
                Unanswered (${result.unansweredCount})
              </button>
            </div>
          </div>

          <!-- Subject sub-filters -->
          <div class="review-subject-chips">
            <button class="review-subchip ${subjectFilter === 'all' ? 'active' : ''}" data-subject="all">
              All Subjects
            </button>
            <button class="review-subchip ${subjectFilter === 'physics' ? 'active' : ''}" data-subject="physics">
              Physics
            </button>
            <button class="review-subchip ${subjectFilter === 'chemistry' ? 'active' : ''}" data-subject="chemistry">
              Chemistry
            </button>
            <button class="review-subchip ${subjectFilter === 'mathematics' ? 'active' : ''}" data-subject="mathematics">
              Mathematics
            </button>
          </div>

          <!-- Question Cards -->
          <div class="review-list">
            ${(() => {
              const filtered = result.questions.filter(q => {
                if (subjectFilter !== 'all' && q.subject !== subjectFilter) return false;
                if (statusFilter === 'correct') return q.isAttempted && q.isCorrect;
                if (statusFilter === 'incorrect') return q.isAttempted && !q.isCorrect;
                if (statusFilter === 'unanswered') return !q.isAttempted;
                return true;
              });

              if (filtered.length === 0) {
                return '<div class="dash-empty-state"><p>No questions match the selected filter.</p></div>';
              }

              return filtered.map(q => {
                const isMcq = q.type === 'mcq';
                let statusBadgeClass = 'badge-unanswered';
                let statusText = 'Unanswered (0 Marks)';
                if (q.isAttempted) {
                  if (q.isCorrect) {
                    statusBadgeClass = 'badge-correct';
                    statusText = 'Correct (+4 Marks)';
                  } else {
                    statusBadgeClass = 'badge-incorrect';
                    statusText = 'Incorrect (-1 Mark)';
                  }
                }

                return `
                  <div class="review-item-card" id="q-review-${q.questionNumber}">
                    <div class="review-card-header">
                      <div class="review-card-meta">
                        <strong class="review-q-num">Q.${q.questionNumber}</strong>
                        <span class="review-q-sub">
                          ${q.subject.toUpperCase()} &bull; Section ${q.section} (${isMcq ? 'MCQ Single' : 'Numeric'}) ${q.topic ? `&bull; ${q.topic}` : ''}
                        </span>
                      </div>
                      <span class="review-status-tag ${statusBadgeClass}">
                        ${statusText}
                      </span>
                    </div>

                    <div class="review-q-text">
                      ${renderMathInText(q.questionText)}
                    </div>

                    ${isMcq ? `
                      <div class="review-options-list">
                        ${q.options.map((opt, oIdx) => {
                          const isCorrectOpt = oIdx === q.correctAnswer;
                          const isUserOpt = oIdx === q.userResponse;
                          let optClass = 'opt-default';
                          let tag = '';

                          if (isCorrectOpt) {
                            optClass = 'opt-correct';
                            tag = '<span class="opt-tag tag-green">Correct Answer</span>';
                          }
                          if (isUserOpt && !isCorrectOpt) {
                            optClass = 'opt-incorrect';
                            tag = '<span class="opt-tag tag-red">Your Choice (Incorrect)</span>';
                          } else if (isUserOpt && isCorrectOpt) {
                            tag = '<span class="opt-tag tag-green">Your Choice (Correct)</span>';
                          }

                          return `
                            <div class="review-opt-row ${optClass}">
                              <span class="opt-letter">(${String.fromCharCode(65 + oIdx)})</span>
                              <div class="opt-text">${renderMathInText(opt)}</div>
                              ${tag}
                            </div>
                          `;
                        }).join('')}
                      </div>
                    ` : `
                      <div class="review-numeric-summary">
                        <div>
                          <span style="color: #64748b;">Your Value:</span>
                          <strong class="${q.isCorrect ? 'text-green' : 'text-red'}" style="font-family: var(--font-mono); margin-left: 6px;">
                            ${q.userResponse !== null && q.userResponse !== '' ? q.userResponse : 'Unattempted'}
                          </strong>
                        </div>
                        <div>
                          <span style="color: #64748b;">Official Value:</span>
                          <strong class="text-green" style="font-family: var(--font-mono); margin-left: 6px;">
                            ${q.correctAnswer}
                          </strong>
                        </div>
                      </div>
                    `}

                    <!-- Explanation -->
                    <div class="review-sol-box">
                      <div class="review-sol-label">Step-by-step Solution:</div>
                      <div class="review-sol-content">${renderMathInText(q.explanation)}</div>
                    </div>
                  </div>
                `;
              }).join('');
            })()}
          </div>
        </section>
      </main>
    `;

    container.innerHTML = html;

    container.querySelectorAll('.review-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        statusFilter = btn.getAttribute('data-status');
        renderContent();
      });
    });

    container.querySelectorAll('.review-subchip').forEach(btn => {
      btn.addEventListener('click', () => {
        subjectFilter = btn.getAttribute('data-subject');
        renderContent();
      });
    });

    container.querySelector('#res-back-btn')?.addEventListener('click', onBackToDashboard);
    container.querySelector('#res-retake-btn')?.addEventListener('click', () => {
      if (onRetakeTest) onRetakeTest(result.testId);
    });
    container.querySelector('#res-print-btn')?.addEventListener('click', () => {
      window.print();
    });
  };

  renderContent();
}
