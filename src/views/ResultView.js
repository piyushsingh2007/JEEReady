import { renderMathInText } from '../utils/mathRenderer.js';
import { Storage } from '../utils/storage.js';

/**
 * Clean, minimal ResultView
 * Accurate scorecard, subject performance, and question-by-question review with KaTeX solutions.
 */
export function renderResultView(container, { attemptId, onRetakeTest, onBackToDashboard }) {
  const result = Storage.getCompletedTestById(attemptId) || Storage.getCompletedTests()[0];

  if (!result) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 16px;">
        <h3>No Test Result Found</h3>
        <button class="btn-cbt-primary" id="err-back-dash-btn" style="margin-top: 12px;">Return to Dashboard</button>
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
          <span>JEEReady - Performance Report</span>
        </div>
        <div style="display: flex; gap: 8px;">
          <button id="res-print-btn" class="cbt-top-link-btn">
            Print Report
          </button>
          <button id="res-back-btn" class="cbt-top-link-btn" style="color: #38bdf8;">
            Back to Dashboard
          </button>
        </div>
      </header>

      <main class="results-panel">
        <!-- Hero Box -->
        <div class="results-hero-box">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px;">
            <div>
              <h1 style="font-size: 18px; font-weight: 700; color: #111827;">${result.testTitle}</h1>
              <div style="font-size: 12px; color: #64748b; margin-top: 2px;">
                Attempted on ${new Date(result.completedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
              </div>
            </div>

            <div>
              <button id="res-retake-btn" class="btn-cbt-default" style="font-size: 12px; padding: 4px 10px;">
                Retake Test
              </button>
            </div>
          </div>

          <!-- Score Metrics Grid -->
          <div class="results-score-grid">
            <div class="score-box">
              <div class="score-num">${result.totalScore} <span style="font-size: 13px; color: #64748b; font-weight: 500;">/ ${result.maxScore}</span></div>
              <div class="score-lbl">Total Score</div>
            </div>

            <div class="score-box">
              <div class="score-num" style="color: #2e7d32;">${result.accuracy}%</div>
              <div class="score-lbl">Accuracy</div>
            </div>

            <div class="score-box">
              <div class="score-num" style="color: #0288d1;">${estPercentile}</div>
              <div class="score-lbl">Estimated Percentile</div>
            </div>

            <div class="score-box">
              <div class="score-num" style="font-size: 1.3rem;">${timeTakenMins}m ${timeTakenSecs}s</div>
              <div class="score-lbl">Time Taken</div>
            </div>
          </div>

          <div style="display: flex; gap: 16px; margin-top: 14px; padding-top: 10px; border-top: 1px dashed var(--cbt-border-light); font-size: 12px; color: #475569; flex-wrap: wrap;">
            <span>Correct: <strong>${result.correctCount}</strong> (+${result.correctCount * 4} Marks)</span>
            <span>Incorrect: <strong>${result.incorrectCount}</strong> (-${result.incorrectCount} Marks)</span>
            <span>Unanswered: <strong>${result.unansweredCount}</strong></span>
            <span>Attempted: <strong>${result.correctCount + result.incorrectCount}</strong> of ${result.questions.length}</span>
          </div>
        </div>

        <!-- Subject Breakdown Table -->
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 14px; font-weight: 700; margin-bottom: 8px; color: #111827;">Subject-wise Breakdown</h2>
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
                    <td>${subjectTitles[sub] || sub}</td>
                    <td style="font-weight: 700; color: var(--cbt-blue-primary);">${data.score} / ${data.maxScore}</td>
                    <td style="color: #2e7d32; font-weight: 600;">${data.correct}</td>
                    <td style="color: #c62828; font-weight: 600;">${data.incorrect}</td>
                    <td style="color: #6c757d;">${data.unanswered}</td>
                    <td><strong>${data.accuracy}%</strong></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <!-- Filterable Question Review -->
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
            <h2 style="font-size: 14px; font-weight: 700; color: #111827;">
              Question-by-Question Solutions
            </h2>

            <div style="display: flex; gap: 4px; flex-wrap: wrap;">
              <button class="btn-cbt-default status-filter ${statusFilter === 'all' ? 'btn-cbt-primary' : ''}" data-status="all" style="font-size: 11px; padding: 3px 8px;">
                All (${result.questions.length})
              </button>
              <button class="btn-cbt-default status-filter ${statusFilter === 'correct' ? 'btn-cbt-primary' : ''}" data-status="correct" style="font-size: 11px; padding: 3px 8px;">
                Correct (${result.correctCount})
              </button>
              <button class="btn-cbt-default status-filter ${statusFilter === 'incorrect' ? 'btn-cbt-primary' : ''}" data-status="incorrect" style="font-size: 11px; padding: 3px 8px;">
                Incorrect (${result.incorrectCount})
              </button>
              <button class="btn-cbt-default status-filter ${statusFilter === 'unanswered' ? 'btn-cbt-primary' : ''}" data-status="unanswered" style="font-size: 11px; padding: 3px 8px;">
                Unanswered (${result.unansweredCount})
              </button>
            </div>
          </div>

          <!-- Subject sub-filters -->
          <div style="display: flex; gap: 4px; margin-bottom: 14px;">
            <button class="btn-cbt-default subject-filter ${subjectFilter === 'all' ? 'btn-cbt-primary' : ''}" data-subject="all" style="font-size: 11px; padding: 2px 7px;">
              All Subjects
            </button>
            <button class="btn-cbt-default subject-filter ${subjectFilter === 'physics' ? 'btn-cbt-primary' : ''}" data-subject="physics" style="font-size: 11px; padding: 2px 7px;">
              Physics
            </button>
            <button class="btn-cbt-default subject-filter ${subjectFilter === 'chemistry' ? 'btn-cbt-primary' : ''}" data-subject="chemistry" style="font-size: 11px; padding: 2px 7px;">
              Chemistry
            </button>
            <button class="btn-cbt-default subject-filter ${subjectFilter === 'mathematics' ? 'btn-cbt-primary' : ''}" data-subject="mathematics" style="font-size: 11px; padding: 2px 7px;">
              Mathematics
            </button>
          </div>

          <!-- Question Cards -->
          <div>
            ${(() => {
              const filtered = result.questions.filter(q => {
                if (subjectFilter !== 'all' && q.subject !== subjectFilter) return false;
                if (statusFilter === 'correct') return q.isAttempted && q.isCorrect;
                if (statusFilter === 'incorrect') return q.isAttempted && !q.isCorrect;
                if (statusFilter === 'unanswered') return !q.isAttempted;
                return true;
              });

              if (filtered.length === 0) {
                return '<div style="text-align: center; padding: 24px; color: #6c757d;">No questions match the selected filter.</div>';
              }

              return filtered.map(q => {
                const isMcq = q.type === 'mcq';
                let statusText = 'Unanswered (0 Marks)';
                let statusColor = '#6c757d';
                if (q.isAttempted) {
                  if (q.isCorrect) {
                    statusText = 'Correct (+4 Marks)';
                    statusColor = '#2e7d32';
                  } else {
                    statusText = 'Incorrect (-1 Mark)';
                    statusColor = '#c62828';
                  }
                }

                return `
                  <div class="review-item-card" id="q-review-${q.questionNumber}">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px solid var(--cbt-border-light); padding-bottom: 6px;">
                      <div>
                        <strong>Q.${q.questionNumber}</strong> | 
                        <span style="color: #6c757d; font-size: 12px;">
                          ${q.subject.toUpperCase()} &bull; Section ${q.section} (${isMcq ? 'MCQ Single' : 'Numeric'}) &bull; ${q.topic || ''}
                        </span>
                      </div>
                      <div style="font-weight: 700; font-size: 12px; color: ${statusColor};">
                        ${statusText}
                      </div>
                    </div>

                    <div style="font-size: 13px; line-height: 1.6; margin-bottom: 10px;">
                      ${renderMathInText(q.questionText)}
                    </div>

                    ${isMcq ? `
                      <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px;">
                        ${q.options.map((opt, oIdx) => {
                          const isCorrectOpt = oIdx === q.correctAnswer;
                          const isUserOpt = oIdx === q.userResponse;
                          let bg = '#ffffff';
                          let border = '#e5e7eb';
                          let tag = '';

                          if (isCorrectOpt) {
                            bg = '#f0fdf4';
                            border = '#86efac';
                            tag = '<span style="color: #2e7d32; font-weight: 700; margin-left: auto; font-size: 11px;">[Correct Answer]</span>';
                          }
                          if (isUserOpt && !isCorrectOpt) {
                            bg = '#fef2f2';
                            border = '#fca5a5';
                            tag = '<span style="color: #c62828; font-weight: 700; margin-left: auto; font-size: 11px;">[Your Choice - Incorrect]</span>';
                          } else if (isUserOpt && isCorrectOpt) {
                            tag = '<span style="color: #2e7d32; font-weight: 700; margin-left: auto; font-size: 11px;">[Your Choice - Correct]</span>';
                          }

                          return `
                            <div style="display: flex; align-items: center; gap: 8px; padding: 5px 10px; border: 1px solid ${border}; border-radius: 2px; background: ${bg}; font-size: 13px;">
                              <strong style="color: #6b7280; font-size: 12px;">(${String.fromCharCode(65 + oIdx)})</strong>
                              <div>${renderMathInText(opt)}</div>
                              ${tag}
                            </div>
                          `;
                        }).join('')}
                      </div>
                    ` : `
                      <div style="background: #f8fafc; border: 1px solid var(--cbt-border); padding: 8px 12px; font-size: 12px; margin-bottom: 10px; display: flex; justify-content: space-between;">
                        <div>
                          Your Value: 
                          <strong style="color: ${q.isCorrect ? '#2e7d32' : '#c62828'}; font-family: var(--font-mono);">
                            ${q.userResponse !== null && q.userResponse !== '' ? q.userResponse : 'Unattempted'}
                          </strong>
                        </div>
                        <div>
                          Official Value: 
                          <strong style="color: #2e7d32; font-family: var(--font-mono);">${q.correctAnswer}</strong>
                        </div>
                      </div>
                    `}

                    <!-- Explanation -->
                    <div class="review-sol-box">
                      <div style="font-weight: 700; color: #2e7d32; margin-bottom: 4px;">Solution:</div>
                      <div>${renderMathInText(q.explanation)}</div>
                    </div>
                  </div>
                `;
              }).join('');
            })()}
          </div>
        </div>
      </main>
    `;

    container.innerHTML = html;

    container.querySelectorAll('.status-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        statusFilter = btn.getAttribute('data-status');
        renderContent();
      });
    });

    container.querySelectorAll('.subject-filter').forEach(btn => {
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
