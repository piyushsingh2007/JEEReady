import { getTestQuestions } from '../data/questionBank.js';
import { Storage } from '../utils/storage.js';
import { Feedback } from '../utils/feedback.js';
import { renderExamHeader } from '../components/Header.js';
import { renderQuestionView } from '../components/QuestionView.js';
import { renderPaletteSidebar } from '../components/QuestionPalette.js';
import { renderSubmitModal } from '../components/SubmitModal.js';
import { renderQuestionPaperModal } from '../components/QuestionPaperModal.js';
import { renderInstructionsModal } from '../components/InstructionsModal.js';

export function renderExamView(container, { testId, isResume = false, onSubmitExam }) {
  let examData = null;
  const profile = Storage.getProfile();

  if (isResume) {
    const saved = Storage.getActiveExam();
    if (saved) {
      examData = saved;
    }
  }

  if (!examData) {
    // Initialize new test session
    const { preset, questions, durationMinutes } = getTestQuestions(testId);
    
    // Build initial responses map
    const initialResponses = {};
    questions.forEach(q => {
      initialResponses[q.id] = {
        status: 'not_visited', // 'not_visited' | 'unanswered' | 'answered' | 'marked' | 'answered_marked'
        selectedOption: null,
        numericalAnswer: '',
        timeSpentSeconds: 0
      };
    });

    const firstQ = questions[0];
    initialResponses[firstQ.id].status = 'unanswered'; // First question is visited immediately

    examData = {
      testId: preset.id,
      testTitle: preset.title,
      totalDurationSeconds: durationMinutes * 60,
      timeRemaining: durationMinutes * 60,
      startedAt: Date.now(),
      subjects: preset.subjects,
      currentSubject: firstQ.subject,
      currentQuestionId: firstQ.id,
      questions: questions,
      responses: initialResponses
    };

    Storage.saveActiveExam(examData);
  }

  // Setup DOM container structure
  container.innerHTML = `
    <div class="exam-viewport">
      <div id="cbt-header-mount"></div>
      
      <div class="cbt-main-split">
        <main class="cbt-question-panel" id="cbt-question-mount"></main>
        <aside class="cbt-palette-sidebar" id="cbt-palette-mount"></aside>
      </div>

      <!-- Modals mount point -->
      <div id="cbt-modals-mount"></div>
    </div>
  `;

  const headerMount = container.querySelector('#cbt-header-mount');
  const questionMount = container.querySelector('#cbt-question-mount');
  const paletteMount = container.querySelector('#cbt-palette-mount');
  const modalsMount = container.querySelector('#cbt-modals-mount');

  let timerInterval = null;
  let timerWarningPlayed = false;

  // Formatting helper for MM:SS or HH:MM:SS
  const formatTime = (secs) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Helper to persist current state
  const saveCurrentState = () => {
    Storage.saveActiveExam(examData);
  };

  // Switch active question
  const navigateToQuestion = (qId) => {
    const targetQ = examData.questions.find(q => q.id === qId);
    if (!targetQ) return;

    // Track response status transition: if not_visited, becomes unanswered
    if (examData.responses[targetQ.id].status === 'not_visited') {
      examData.responses[targetQ.id].status = 'unanswered';
    }

    examData.currentQuestionId = targetQ.id;
    examData.currentSubject = targetQ.subject;
    saveCurrentState();
    renderAll();

    // Close mobile drawer if open
    paletteMount.classList.remove('open');
  };

  // Next / Previous helpers
  const goNext = () => {
    const currentIndex = examData.questions.findIndex(q => q.id === examData.currentQuestionId);
    if (currentIndex < examData.questions.length - 1) {
      navigateToQuestion(examData.questions[currentIndex + 1].id);
    }
  };

  const goPrevious = () => {
    const currentIndex = examData.questions.findIndex(q => q.id === examData.currentQuestionId);
    if (currentIndex > 0) {
      navigateToQuestion(examData.questions[currentIndex - 1].id);
    }
  };

  // Action handlers
  const handleSelectOption = (optIdx) => {
    const qId = examData.currentQuestionId;
    examData.responses[qId].selectedOption = optIdx;
    saveCurrentState();
    renderQuestionOnly();
  };

  const handleChangeNumerical = (val) => {
    const qId = examData.currentQuestionId;
    examData.responses[qId].numericalAnswer = val;
    saveCurrentState();
  };

  const handleSaveAndNext = () => {
    const qId = examData.currentQuestionId;
    const resp = examData.responses[qId];
    const q = examData.questions.find(item => item.id === qId);

    const hasAnswer = (q.type === 'mcq' && resp.selectedOption !== null) ||
                      (q.type === 'numerical' && resp.numericalAnswer && resp.numericalAnswer.trim() !== '');

    if (hasAnswer) {
      resp.status = 'answered';
    } else {
      resp.status = 'unanswered';
    }

    saveCurrentState();
    goNext();
  };

  const handleSaveAndMark = () => {
    const qId = examData.currentQuestionId;
    const resp = examData.responses[qId];
    const q = examData.questions.find(item => item.id === qId);

    const hasAnswer = (q.type === 'mcq' && resp.selectedOption !== null) ||
                      (q.type === 'numerical' && resp.numericalAnswer && resp.numericalAnswer.trim() !== '');

    if (hasAnswer) {
      resp.status = 'answered_marked'; // Evaluated!
    } else {
      resp.status = 'marked';
    }

    saveCurrentState();
    goNext();
  };

  const handleClearResponse = () => {
    const qId = examData.currentQuestionId;
    const resp = examData.responses[qId];
    resp.selectedOption = null;
    resp.numericalAnswer = '';
    resp.status = 'unanswered';
    saveCurrentState();
    renderAll();
  };

  const handleMarkForReviewAndNext = () => {
    const qId = examData.currentQuestionId;
    const resp = examData.responses[qId];
    const q = examData.questions.find(item => item.id === qId);

    const hasAnswer = (q.type === 'mcq' && resp.selectedOption !== null) ||
                      (q.type === 'numerical' && resp.numericalAnswer && resp.numericalAnswer.trim() !== '');

    if (hasAnswer) {
      resp.status = 'answered_marked';
    } else {
      resp.status = 'marked';
    }

    saveCurrentState();
    goNext();
  };

  // Subject tab click
  const handleSelectSubject = (subject) => {
    if (subject === examData.currentSubject) return;
    examData.currentSubject = subject;
    // Find first question of this subject
    const firstSubjectQ = examData.questions.find(q => q.subject === subject);
    if (firstSubjectQ) {
      navigateToQuestion(firstSubjectQ.id);
    } else {
      saveCurrentState();
      renderAll();
    }
  };

  // Modals
  const openQuestionPaper = () => {
    renderQuestionPaperModal(modalsMount, {
      questions: examData.questions,
      onClose: () => { modalsMount.innerHTML = ''; }
    });
  };

  const openInstructions = () => {
    renderInstructionsModal(modalsMount, {
      onClose: () => { modalsMount.innerHTML = ''; }
    });
  };

  // Submit test confirmation and result calculation
  const openSubmitConfirmation = () => {
    renderSubmitModal(modalsMount, {
      questions: examData.questions,
      responses: examData.responses,
      timeRemainingFormatted: formatTime(examData.timeRemaining),
      onClose: () => { modalsMount.innerHTML = ''; },
      onConfirmSubmit: finalizeSubmission
    });
  };

  const finalizeSubmission = () => {
    clearInterval(timerInterval);

    // Calculate score, accuracy, and subject breakdowns
    let totalScore = 0;
    let maxScore = examData.questions.length * 4;
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;
    let markedCount = 0;

    const subjectBreakdown = {};
    examData.subjects.forEach(sub => {
      subjectBreakdown[sub] = {
        total: 0,
        score: 0,
        maxScore: 0,
        correct: 0,
        incorrect: 0,
        unanswered: 0,
        accuracy: 0
      };
    });

    const questionResults = examData.questions.map((q, idx) => {
      const resp = examData.responses[q.id] || { status: 'not_visited', selectedOption: null, numericalAnswer: '' };
      const sub = q.subject;
      subjectBreakdown[sub].total++;
      subjectBreakdown[sub].maxScore += 4;

      let isAttempted = false;
      let isCorrect = false;
      let marksAwarded = 0;

      // Evaluation eligibility: Answered OR Answered & Marked for Review
      const isEligible = resp.status === 'answered' || resp.status === 'answered_marked';

      if (q.type === 'mcq') {
        if (resp.selectedOption !== null && isEligible) {
          isAttempted = true;
          if (resp.selectedOption === q.correctAnswer) {
            isCorrect = true;
            marksAwarded = 4;
          } else {
            isCorrect = false;
            marksAwarded = -1;
          }
        }
      } else {
        // Numerical Question
        if (resp.numericalAnswer && resp.numericalAnswer.trim() !== '' && isEligible) {
          isAttempted = true;
          const userNum = parseFloat(resp.numericalAnswer.trim());
          if (!isNaN(userNum)) {
            if (q.acceptableRange) {
              isCorrect = userNum >= q.acceptableRange[0] && userNum <= q.acceptableRange[1];
            } else {
              isCorrect = Math.abs(userNum - q.correctAnswer) < 0.01;
            }
          }
          if (isCorrect) {
            marksAwarded = 4;
          } else {
            marksAwarded = -1;
          }
        }
      }

      if (isAttempted) {
        if (isCorrect) {
          correctCount++;
          subjectBreakdown[sub].correct++;
        } else {
          incorrectCount++;
          subjectBreakdown[sub].incorrect++;
        }
      } else {
        unansweredCount++;
        subjectBreakdown[sub].unanswered++;
        if (resp.status === 'marked') markedCount++;
      }

      totalScore += marksAwarded;
      subjectBreakdown[sub].score += marksAwarded;

      return {
        questionId: q.id,
        questionNumber: idx + 1,
        subject: q.subject,
        section: q.section,
        type: q.type,
        topic: q.topic,
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        userResponse: q.type === 'mcq' ? resp.selectedOption : resp.numericalAnswer,
        status: resp.status,
        isAttempted,
        isCorrect,
        marksAwarded
      };
    });

    // Compute accuracies
    const totalAttempted = correctCount + incorrectCount;
    const overallAccuracy = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;

    Object.keys(subjectBreakdown).forEach(sub => {
      const subAtt = subjectBreakdown[sub].correct + subjectBreakdown[sub].incorrect;
      subjectBreakdown[sub].accuracy = subAtt > 0 ? Math.round((subjectBreakdown[sub].correct / subAtt) * 100) : 0;
    });

    const attemptResult = {
      attemptId: 'att_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      testId: examData.testId,
      testTitle: examData.testTitle,
      startedAt: examData.startedAt,
      completedAt: Date.now(),
      timeTakenSeconds: examData.totalDurationSeconds - examData.timeRemaining,
      totalDurationSeconds: examData.totalDurationSeconds,
      totalScore,
      maxScore,
      correctCount,
      incorrectCount,
      unansweredCount,
      markedCount,
      accuracy: overallAccuracy,
      subjectBreakdown,
      questions: questionResults
    };

    Feedback.playCompletion();
    Storage.saveCompletedTest(attemptResult);

    if (onSubmitExam) {
      onSubmitExam(attemptResult);
    }
  };

  // Render methods
  const renderHeaderOnly = () => {
    const isWarning = examData.timeRemaining <= 600; // < 10 minutes
    renderExamHeader(headerMount, {
      testTitle: examData.testTitle,
      timeRemainingFormatted: formatTime(examData.timeRemaining),
      isTimerWarning: isWarning,
      candidateProfile: profile,
      subjects: examData.subjects,
      currentSubject: examData.currentSubject,
      questions: examData.questions,
      responses: examData.responses,
      onSelectSubject: handleSelectSubject,
      onOpenQuestionPaper: openQuestionPaper,
      onOpenInstructions: openInstructions,
      onToggleMobilePalette: () => {
        paletteMount.classList.toggle('open');
      }
    });
  };

  const renderQuestionOnly = () => {
    const currentQ = examData.questions.find(q => q.id === examData.currentQuestionId) || examData.questions[0];
    const qIndex = examData.questions.findIndex(q => q.id === currentQ.id) + 1;

    renderQuestionView(questionMount, {
      question: currentQ,
      questionNumber: qIndex,
      totalQuestions: examData.questions.length,
      currentResponse: examData.responses[currentQ.id],
      onSaveAndNext: handleSaveAndNext,
      onSaveAndMark: handleSaveAndMark,
      onClearResponse: handleClearResponse,
      onMarkForReviewAndNext: handleMarkForReviewAndNext,
      onPrevious: goPrevious,
      onNext: goNext,
      onSelectOption: handleSelectOption,
      onChangeNumerical: handleChangeNumerical
    });
  };

  const renderPaletteOnly = () => {
    renderPaletteSidebar(paletteMount, {
      questions: examData.questions,
      responses: examData.responses,
      currentQuestionId: examData.currentQuestionId,
      currentSubject: examData.currentSubject,
      candidateProfile: profile,
      onSelectQuestion: navigateToQuestion,
      onOpenQuestionPaper: openQuestionPaper,
      onSubmitClick: openSubmitConfirmation,
      onCloseMobileDrawer: () => {
        paletteMount.classList.remove('open');
      }
    });
  };

  const renderAll = () => {
    renderHeaderOnly();
    renderQuestionOnly();
    renderPaletteOnly();
  };

  // Start live countdown timer
  timerInterval = setInterval(() => {
    if (examData.timeRemaining > 0) {
      examData.timeRemaining--;
      const timerDisplay = document.getElementById('cbt-timer-display');
      if (timerDisplay) {
        timerDisplay.textContent = formatTime(examData.timeRemaining);
      }

      // Check warning sound at 10 minutes
      if (examData.timeRemaining === 600 && !timerWarningPlayed) {
        timerWarningPlayed = true;
        Feedback.playTimerWarning();
        renderHeaderOnly();
      }

      // Periodically auto-save every 10 seconds
      if (examData.timeRemaining % 10 === 0) {
        saveCurrentState();
      }
    } else {
      // Auto-submit when time expires
      clearInterval(timerInterval);
      alert('Time is up! Your exam answers are now being submitted automatically.');
      finalizeSubmission();
    }
  }, 1000);

  // Keyboard navigation shortcuts
  const keyHandler = (e) => {
    // Only handle if no modal is open
    if (modalsMount.innerHTML.trim() !== '') return;

    // Check if focused in numerical input
    if (document.activeElement && document.activeElement.id === 'numerical-input-box') {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSaveAndNext();
      }
      return;
    }

    if (e.altKey) {
      if (e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSaveAndNext();
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        handleMarkForReviewAndNext();
      } else if (e.key.toLowerCase() === 'c') {
        e.preventDefault();
        handleClearResponse();
      } else if (e.key.toLowerCase() === 'p') {
        e.preventDefault();
        goPrevious();
      } else if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        goNext();
      }
    } else {
      // Numbers 1, 2, 3, 4 to select MCQ options
      const currentQ = examData.questions.find(q => q.id === examData.currentQuestionId);
      if (currentQ && currentQ.type === 'mcq') {
        if (['1', '2', '3', '4'].includes(e.key)) {
          handleSelectOption(parseInt(e.key, 10) - 1);
        }
      }
    }
  };

  window.addEventListener('keydown', keyHandler);

  // Initial render
  renderAll();

  // Return teardown function if route changes
  return () => {
    clearInterval(timerInterval);
    window.removeEventListener('keydown', keyHandler);
  };
}
