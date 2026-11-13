/**
 * Local persistence management for Exam Edge
 * Manages active exam attempts, completed test history, candidate profile, and settings
 */

const STORAGE_KEYS = {
  ACTIVE_EXAM: 'examedge_active_exam_v1',
  COMPLETED_TESTS: 'examedge_completed_tests_v1',
  PROFILE: 'examedge_candidate_profile_v1',
  SETTINGS: 'examedge_user_settings_v1',
  CUSTOM_CONFIG: 'examedge_exam_config_v1'
};

const LEGACY_STORAGE_KEYS = {
  ACTIVE_EXAM: 'jeeready_active_exam_v1',
  COMPLETED_TESTS: 'jeeready_completed_tests_v1',
  PROFILE: 'jeeready_candidate_profile_v1',
  SETTINGS: 'jeeready_user_settings_v1',
  CUSTOM_CONFIG: 'jeeready_exam_config_v1'
};

export const DEFAULT_PROFILE = {
  name: 'Candidate: Piyush Singh',
  rollNumber: 'JEE2026-98214',
  applicationNumber: '260310058491',
  centerCode: 'CBT-DL-048 (Delhi North)',
  medium: 'English',
  avatarUrl: '/icons/icon-192.png'
};

export const DEFAULT_SETTINGS = {
  soundEnabled: true,
  theme: 'cbt-classic',
  timerAlertThresholdMinutes: 10,
  autoAdvanceOnSave: true
};

export const Storage = {
  // --- Active Exam Persistence ---
  getActiveExam() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_EXAM) || localStorage.getItem(LEGACY_STORAGE_KEYS.ACTIVE_EXAM);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading active exam from storage:', e);
      return null;
    }
  },

  saveActiveExam(examState) {
    try {
      if (!examState) {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_EXAM);
        localStorage.removeItem(LEGACY_STORAGE_KEYS.ACTIVE_EXAM);
        return;
      }
      localStorage.setItem(STORAGE_KEYS.ACTIVE_EXAM, JSON.stringify(examState));
    } catch (e) {
      console.error('Error saving active exam to storage:', e);
    }
  },

  clearActiveExam() {
    try {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_EXAM);
      localStorage.removeItem(LEGACY_STORAGE_KEYS.ACTIVE_EXAM);
    } catch (e) {
      console.error('Error clearing active exam:', e);
    }
  },

  // --- Completed Test History ---
  getCompletedTests() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_TESTS) || localStorage.getItem(LEGACY_STORAGE_KEYS.COMPLETED_TESTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading completed tests:', e);
      return [];
    }
  },

  getCompletedTestById(attemptId) {
    const list = this.getCompletedTests();
    return list.find(t => t.attemptId === attemptId) || null;
  },

  saveCompletedTest(testResult) {
    try {
      const list = this.getCompletedTests();
      list.unshift(testResult);
      const trimmed = list.slice(0, 50);
      localStorage.setItem(STORAGE_KEYS.COMPLETED_TESTS, JSON.stringify(trimmed));
      this.clearActiveExam();
      return testResult;
    } catch (e) {
      console.error('Error saving completed test:', e);
      return testResult;
    }
  },

  deleteCompletedTest(attemptId) {
    try {
      const list = this.getCompletedTests().filter(t => t.attemptId !== attemptId);
      localStorage.setItem(STORAGE_KEYS.COMPLETED_TESTS, JSON.stringify(list));
    } catch (e) {
      console.error('Error deleting test:', e);
    }
  },

  clearAllHistory() {
    try {
      localStorage.removeItem(STORAGE_KEYS.COMPLETED_TESTS);
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_EXAM);
      localStorage.removeItem(LEGACY_STORAGE_KEYS.COMPLETED_TESTS);
      localStorage.removeItem(LEGACY_STORAGE_KEYS.ACTIVE_EXAM);
    } catch (e) {
      console.error('Error clearing history:', e);
    }
  },

  // --- Profile ---
  getProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE) || localStorage.getItem(LEGACY_STORAGE_KEYS.PROFILE);
      return data ? { ...DEFAULT_PROFILE, ...JSON.parse(data) } : DEFAULT_PROFILE;
    } catch (e) {
      return DEFAULT_PROFILE;
    }
  },

  saveProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving profile:', e);
    }
  },

  // --- Settings ---
  getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS) || localStorage.getItem(LEGACY_STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings:', e);
    }
  }
};
