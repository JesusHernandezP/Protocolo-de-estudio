const STORAGE_KEY = 'damStudyProgress';

export const ProgressService = {
  getProgress() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { subjects: {}, modules: {} };
  },

  saveQuizAttempt(moduleId, stats, failedQuestions) {
    const progress = this.getProgress();
    
    if (!progress.modules[moduleId]) {
      progress.modules[moduleId] = {
        attempts: 0,
        bestScore: 0,
        lastScore: 0,
        failedQuestionIds: [],
        lastAttemptDate: null,
        completed: false
      };
    }

    const mod = progress.modules[moduleId];
    mod.attempts += 1;
    mod.lastScore = stats.percentage;
    mod.bestScore = Math.max(mod.bestScore, stats.percentage);
    mod.failedQuestionIds = failedQuestions;
    mod.lastAttemptDate = new Date().toISOString();
    mod.completed = stats.percentage >= 50;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  },

  getModuleProgress(moduleId) {
    const progress = this.getProgress();
    return progress.modules[moduleId] || null;
  }
};
