import './style.css';
import { renderDashboardView } from './views/DashboardView.js';
import { renderInstructionsView } from './views/InstructionsView.js';
import { renderExamView } from './views/ExamView.js';
import { renderResultView } from './views/ResultView.js';

// Application state and root mount
const appRoot = document.getElementById('app');
let currentViewTeardown = null;

// PWA deferred prompt capture
window.deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.deferredPrompt = e;
  // Trigger UI re-render on dashboard if visible
  if (window.location.hash === '' || window.location.hash.startsWith('#dashboard')) {
    handleRouting();
  }
});

// Register Service Worker for offline PWA capability
if ('serviceWorker' in navigator && !window.location.hostname.includes('localhost') && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        console.log('Exam Edge ServiceWorker registered with scope:', reg.scope);
      })
      .catch((err) => {
        console.warn('ServiceWorker registration skipped or failed:', err);
      });
  });
} else if ('serviceWorker' in navigator) {
  // Also register on local dev/preview
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('Exam Edge SW registered (local):', reg.scope))
      .catch((e) => console.log('SW registration note:', e.message));
  });
}

/**
 * Hash router implementation
 */
function handleRouting() {
  if (currentViewTeardown && typeof currentViewTeardown === 'function') {
    currentViewTeardown();
    currentViewTeardown = null;
  }

  const hash = window.location.hash || '#dashboard';
  const [route, queryStr] = hash.split('?');
  const params = new URLSearchParams(queryStr || '');

  window.scrollTo({ top: 0, behavior: 'instant' });

  if (route === '#instructions') {
    const testId = params.get('test') || 'full-mock-1';
    renderInstructionsView(appRoot, {
      testId,
      onProceedToExam: (id) => {
        window.location.hash = `#exam?test=${id}`;
      },
      onBackToDashboard: () => {
        window.location.hash = '#dashboard';
      }
    });
  } else if (route === '#exam') {
    const testId = params.get('test') || 'full-mock-1';
    const isResume = params.get('resume') === 'true';

    currentViewTeardown = renderExamView(appRoot, {
      testId,
      isResume,
      onSubmitExam: (result) => {
        window.location.hash = `#result?attempt=${result.attemptId}`;
      }
    });
  } else if (route === '#result') {
    const attemptId = params.get('attempt');
    renderResultView(appRoot, {
      attemptId,
      onRetakeTest: (tId) => {
        window.location.hash = `#instructions?test=${tId}`;
      },
      onBackToDashboard: () => {
        window.location.hash = '#dashboard';
      }
    });
  } else {
    // Default: #dashboard
    renderDashboardView(appRoot, {
      onStartTest: (testId) => {
        window.location.hash = `#instructions?test=${testId}`;
      },
      onResumeTest: () => {
        window.location.hash = '#exam?resume=true';
      },
      onReviewAttempt: (attemptId) => {
        window.location.hash = `#result?attempt=${attemptId}`;
      }
    });
  }
}

// Router Event Listeners
window.addEventListener('hashchange', handleRouting);
window.addEventListener('DOMContentLoaded', handleRouting);
