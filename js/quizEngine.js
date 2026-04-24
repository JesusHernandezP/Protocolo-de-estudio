import { ProgressService } from './progressService.js';

export const QuizEngine = {
  state: {
    questions: [],
    currentIndex: 0,
    score: 0,
    answers: [],
    moduleId: null,
    isReviewMode: false
  },

  init(questions, moduleId, isReviewMode = false) {
    this.state = {
      questions: questions,
      currentIndex: 0,
      score: 0,
      answers: [],
      moduleId: moduleId,
      isReviewMode: isReviewMode
    };
  },

  getCurrentQuestion() {
    return this.state.questions[this.state.currentIndex];
  },

  submitAnswer(optionId) {
    const question = this.getCurrentQuestion();
    const isCorrect = optionId === question.correctOptionId;
    
    if (isCorrect) this.state.score++;
    
    this.state.answers.push({
      questionId: question.id,
      selectedId: optionId,
      isCorrect: isCorrect
    });

    return {
      isCorrect,
      correctId: question.correctOptionId,
      explanation: question.explanation,
      optionExplanation: question.optionExplanations[optionId]
    };
  },

  nextQuestion() {
    this.state.currentIndex++;
    return this.state.currentIndex < this.state.questions.length;
  },

  getFinalStats() {
    const total = this.state.questions.length;
    const percentage = Math.round((this.state.score / total) * 100);
    const failedIds = this.state.answers
      .filter(a => !a.isCorrect)
      .map(a => a.questionId);

    const stats = {
      score: this.state.score,
      total: total,
      percentage: percentage,
      failedCount: failedIds.length
    };

    if (!this.state.isReviewMode) {
      ProgressService.saveQuizAttempt(this.state.moduleId, stats, failedIds);
    }

    return stats;
  }
};
