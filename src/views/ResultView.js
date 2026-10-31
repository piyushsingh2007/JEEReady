import { renderMathInText } from '../utils/mathRenderer.js';
import { Storage } from '../utils/storage.js';

/**
 * ResultView
 * Comprehensive score report, subject performance analytics, and question-by-question review with solutions.
 */
export function renderResultView(container, { attemptId, onRetakeTest, onBackToDashboard }) {
  const result = Storage.getCompletedTestById(attemptId) || Storage.getCompletedTests()[0];

  if (!result) {
    container.innerHTML = `
      <div class="container" style="text-align: center; padding: 4rem 1rem;">
        <h2>No Test Result Found</h2>
        <p style="color: #64748b; margin: 1rem 0;">We could not locate this test attempt report.</p>
        <button class="btn btn-primary" id="err-back-dash-btn">Return to Dashboard</button>
      </div>
    `;
    container.querySelector('#err-back-dash-btn')?.addEventListener('click', onBackToDashboard);
    return;
  }

  // Calculate estimated percentile based on normalized JEE score curve
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
  const totalAttempted = result.correctCount + result.incorrectCount;

  // Active filter state
  let statusFilter = 'all'; // 'all' | 'correct' | 'incorrect' | 'unanswered'
  let subjectFilter = 'all'; // 'all' | 'physics' | 'chemistry' | 'mathematics'

  const subjectTitles = {
    physics: 'Physics',
    chemistry: 'Chemistry',
    mathematics: 'Mathematics'
  };

  const renderContent = () => {
    const html = `
      <!-- Top Navigation -->
      <header class="dashboard-nav">
        <div class="container nav-content">
          <a href="#dashboard" class="brand-wrapper">
            <img src="/icons/icon-192.png" alt="JEEReady" class="brand-logo-img" />
            <div class="brand-text-group">
              <span class="brand-title">JEEReady</span>
              <span class="brand-subtitle">Performance Analytics</span>
            </div>
          </a>
          <div style="display: flex; gap: 0.75rem;">
            <button id="res-print-btn" class="btn btn-sm btn-outline" style="color: #cbd5e1; border-color: #334155;">
              🖨️ Print Report
            </button>
            <button id="res-back-btn" class="btn btn-sm btn-primary">
              &laquo; Dashboard
            </button>
          </div>
        </div>
      </header>

      <main class="container result-container">
        <!-- Hero Summary Card -->
        <div class="result-hero-card">
          <div class="result-header-row">
            <div>
              <span class="badge badge-info" style="margin-bottom: 0.5rem;">CBT PRACTICE ATTEMPT SCORECARD</span>
              <h1 style="font-size: 1.85rem; font-weight: 800; color: #ffffff;">${result.testTitle}</h1>
              <div style="font-size: 0.85rem; color: #cbd5e1; margin-top: 0.25rem;">
                Completed on ${new Date(result.completedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
              </div>
            </div>

            <div style="display: flex; gap: 0.75rem;">
              <button id="res-retake-btn" class="btn btn-secondary">
                🔄 Retake Test
              </button>
            </div>
          </div>

          <!-- Main Metric Cards -->
          <div class="result-main-stats-grid">
            <div class="result-stat-card">
              <div class="result-stat-val score-val">${result.totalScore} <span style="font-size: 1.1rem; color: #cbd5e1;">/ ${result.maxScore}</span></div>
              <div class="result-stat-lbl">Total Score</div>
            </div>

            <div class="result-stat-card">
              <div class="result-stat-val accuracy-val">${result.accuracy}%</div>
              <div class="result-stat-lbl">Accuracy Rate</div>
            </div>

            <div class="result-stat-card">
              <div class="result-stat-val" style="color: #a78bfa;">~${estPercentile}%ile</div>
              <div class="result-stat-lbl">Estimated Percentile</div>
            </div>

            <div class="result-stat-card">
              <div class="result-stat-val" style="font-size: 1.75rem; color: #fde047;">${timeTakenMins}m ${timeTakenSecs}s</div>
              <div class="result-stat-lbl">Time Taken</div>
            </div>
          </div>

          <!-- Mini Stats Row -->
          <div style="display: flex; justify-content: center; gap: 2rem; margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid rgba(255, 255, 255, 0.15); flex-wrap: wrap; font-size: 0.875rem;">
            <div>✅ <strong>${result.correctCount}</strong> Correct (+${result.correctCount * 4} Marks)</div>
            <div>❌ <strong>${result.incorrectCount}</strong> Incorrect (-${result.incorrectCount} Marks)</div>
            <div>⚪ <strong>${result.unansweredCount}</strong> Unanswered (0 Marks)</div>
            <div>🎯 <strong>${totalAttempted}</strong> of ${result.questions.length} Attempted</div>
          </div>
        </div>

        <!-- Subject Breakdown Cards -->
        <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-main);">
          Subject-wise Performance Breakdown
        </h2>

        <div class="subject-score-cards-grid">
          ${Object.keys(result.subjectBreakdown).map(sub => {
            const data = result.subjectBreakdown[sub];
            return `
              <div class="subject-perf-card">
                <div class="subject-perf-header">
                  <div class="subject-perf-title">${subjectTitles[sub] || sub}</div>
                  <div class="perf-score-badge">${data.score} / ${data.maxScore}</div>
                </div>

                <div style="margin-bottom: 0.75rem;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.35rem; color: var(--text-muted);">
                    <span>Accuracy</span>
                    <strong style="color: var(--text-main);">${data.accuracy}%</strong>
                  </div>
                  <div style="width: 100%; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                    <div style="width: ${data.accuracy}%; height: 100%; background: ${data.accuracy >= 70 ? '#22c55e' : data.accuracy >= 40 ? '#f59e0b' : '#ef4444'}; border-radius: 4px;"></div>
                  </div>
                </div>

                <div class="perf-breakdown-row">
                  <div>
                    <div class="perf-mini-val" style="color: #16a34a;">${data.correct}</div>
                    <div class="perf-mini-stat">Correct</div>
                  </div>
                  <div>
                    <div class="perf-mini-val" style="color: #dc2626;">${data.incorrect}</div>
                    <div class="perf-mini-stat">Incorrect</div>
                  </div>
                  <div>
                    <div class="perf-mini-val" style="color: #64748b;">${data.unanswered}</div>
                    <div class="perf-mini-stat">Unanswered</div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Question Performance Matrix -->
        <div style="background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 2rem;">
          <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
            <span>Question Response Matrix</span>
            <div style="display: flex; gap: 1rem; font-size: 0.75rem; color: #64748b;">
              <span style="display: flex; align-items: center; gap: 0.25rem;">
                <span style="width: 12px; height: 12px; background: #22c55e; border-radius: 2px;"></span> Correct
              </span>
              <span style="display: flex; align-items: center; gap: 0.25rem;">
                <span style="width: 12px; height: 12px; background: #ef4444; border-radius: 2px;"></span> Incorrect
              </span>
              <span style="display: flex; align-items: center; gap: 0.25rem;">
                <span style="width: 12px; height: 12px; background: #cbd5e1; border-radius: 2px;"></span> Unanswered
              </span>
            </div>
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
            ${result.questions.map(q => {
              let bg = '#cbd5e1';
              let color = '#334155';
              if (q.isAttempted) {
                if (q.isCorrect) {
                  bg = '#22c55e';
                  color = '#ffffff';
                } else {
                  bg = '#ef4444';
                  color = '#ffffff';
                }
              }
              return `
                <a href="#q-review-${q.questionNumber}" 
                   style="width: 32px; height: 32px; border-radius: 4px; background: ${bg}; color: ${color}; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; text-decoration: none;">
                  ${q.questionNumber}
                </a>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Filterable Question-by-Question Review -->
        <div class="review-section">
          <div class="review-filter-bar">
            <div>
              <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main);">
                Question-by-Question Detailed Solutions
              </h2>
              <div style="font-size: 0.8rem; color: var(--text-muted);">
                Review every question with step-by-step mathematical & chemical explanations
              </div>
            </div>

            <!-- Filter Buttons -->
            <div class="filter-btn-group">
              <button class="filter-btn status-filter ${statusFilter === 'all' ? 'active' : ''}" data-status="all">
                All (${result.questions.length})
              </button>
              <button class="filter-btn status-filter ${statusFilter === 'correct' ? 'active' : ''}" data-status="correct">
                Correct (${result.correctCount})
              </button>
              <button class="filter-btn status-filter ${statusFilter === 'incorrect' ? 'active' : ''}" data-status="incorrect">
                Incorrect (${result.incorrectCount})
              </button>
              <button class="filter-btn status-filter ${statusFilter === 'unanswered' ? 'active' : ''}" data-status="unanswered">
                Unanswered (${result.unansweredCount})
              </button>
            </div>
          </div>

          <!-- Subject Sub-Filter Tabs -->
          <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; overflow-x: auto;">
            <button class="filter-btn subject-filter ${subjectFilter === 'all' ? 'active' : ''}" data-subject="all">
              All Subjects
            </button>
            <button class="filter-btn subject-filter ${subjectFilter === 'physics' ? 'active' : ''}" data-subject="physics">
              Physics
            </button>
            <button class="filter-btn subject-filter ${subjectFilter === 'chemistry' ? 'active' : ''}" data-subject="chemistry">
              Chemistry
            </button>
            <button class="filter-btn subject-filter ${subjectFilter === 'mathematics' ? 'active' : ''}" data-subject="mathematics">
              Mathematics
            </button>
          </div>

          <!-- Filtered Questions List -->
          <div id="questions-review-list">
            ${(() => {
              const filtered = result.questions.filter(q => {
                if (subjectFilter !== 'all' && q.subject !== subjectFilter) return false;
                if (statusFilter === 'correct') return q.isAttempted && q.isCorrect;
                if (statusFilter === 'incorrect') return q.isAttempted && !q.isCorrect;
                if (statusFilter === 'unanswered') return !q.isAttempted;
                return true;
              });

              if (filtered.length === 0) {
                return `
                  <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
                    No questions found matching the selected filters.
                  </div>
                `;
              }

              return filtered.map(q => {
                const isMcq = q.type === 'mcq';
                let statusLabel = 'Unanswered (0 Marks)';
                let statusClass = 'status-unanswered';
                if (q.isAttempted) {
                  if (q.isCorrect) {
                    statusLabel = 'Correct (+4 Marks)';
                    statusClass = 'status-correct';
                  } else {
                    statusLabel = 'Incorrect (-1 Mark)';
                    statusClass = 'status-incorrect';
                  }
                }

                return `
                  <div class="review-question-card" id="q-review-${q.questionNumber}">
                    <div class="review-q-header">
                      <div>
                        <strong>Q.${q.questionNumber}</strong> &bull; 
                        <span style="color: var(--text-muted); font-size: 0.85rem;">
                          ${q.subject.toUpperCase()} &bull; Section ${q.section} &bull; ${q.topic || ''}
                        </span>
                      </div>
                      <div class="review-q-status ${statusClass}">
                        ${q.isCorrect ? '✓' : q.isAttempted ? '✗' : '⚪'} ${statusLabel}
                      </div>
                    </div>

                    <div style="font-size: 1rem; line-height: 1.7; margin-bottom: 1rem; color: #1e293b;">
                      ${renderMathInText(q.questionText)}
                    </div>

                    ${isMcq ? `
                      <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
                        ${q.options.map((opt, oIdx) => {
                          const isCorrectOpt = oIdx === q.correctAnswer;
                          const isUserOpt = oIdx === q.userResponse;
                          let border = '#e2e8f0';
                          let bg = '#ffffff';
                          let tag = '';

                          if (isCorrectOpt) {
                            border = '#22c55e';
                            bg = '#f0fdf4';
                            tag = '<span style="color: #16a34a; font-weight: 700; margin-left: auto;">[Correct Answer]</span>';
                          }
                          if (isUserOpt && !isCorrectOpt) {
                            border = '#ef4444';
                            bg = '#fef2f2';
                            tag = '<span style="color: #dc2626; font-weight: 700; margin-left: auto;">[Your Choice - Incorrect]</span>';
                          } else if (isUserOpt && isCorrectOpt) {
                            tag = '<span style="color: #16a34a; font-weight: 700; margin-left: auto;">[Your Choice - Correct]</span>';
                          }

                          return `
                            <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.65rem 1rem; border: 2px solid ${border}; border-radius: 6px; background: ${bg}; font-size: 0.95rem;">
                              <strong style="color: #64748b;">(${String.fromCharCode(65 + oIdx)})</strong>
                              <div>${renderMathInText(opt)}</div>
                              ${tag}
                            </div>
                          `;
                        }).join('')}
                      </div>
                    ` : `
                      <div class="review-answer-comparison">
                        <div>
                          <strong>Your Entered Value:</strong> 
                          <span style="font-family: var(--font-mono); font-weight: 700; color: ${q.isCorrect ? '#16a34a' : '#dc2626'};">
                            ${q.userResponse !== null && q.userResponse !== '' ? q.userResponse : 'None (Unattempted)'}
                          </span>
                        </div>
                        <div>
                          <strong>Correct Official Value:</strong> 
                          <span style="font-family: var(--font-mono); font-weight: 700; color: #16a34a;">
                            ${q.correctAnswer}
                          </span>
                        </div>
                      </div>
                    `}

                    <!-- Step-by-Step Solution -->
                    <div class="explanation-box">
                      <div class="explanation-title">
                        <span>💡 Step-by-Step Solution & Concept:</span>
                      </div>
                      <div style="color: #1e293b;">
                        ${renderMathInText(q.explanation)}
                      </div>
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

    // Attach filter click events
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

    // Top action buttons
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
