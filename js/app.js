import { Router } from './router.js';
import { DataService } from './dataService.js';
import { UI } from './ui.js';
import { QuizEngine } from './quizEngine.js';
import { ProgressService } from './progressService.js';

function setupScrollObserver() {
  const options = { root: null, rootMargin: '0px', threshold: 0.5 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let newHash = '';
        if (entry.target.id === 'home-section') {
          newHash = '#/home';
        } else if (entry.target.id === 'modules-section') {
          newHash = '#/modules';
        }
        
        // Update URL without triggering hashchange
        if (newHash && window.location.hash !== newHash) {
          history.replaceState(null, null, newHash);
        }
      }
    });
  }, options);
  
  const homeSection = document.getElementById('home-section');
  const modulesSection = document.getElementById('modules-section');
  
  if (homeSection) observer.observe(homeSection);
  if (modulesSection) observer.observe(modulesSection);
}

// Routes
const routes = {
  home: async () => {
    const subjects = await DataService.getSubjects();
    UI.renderHome(subjects);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      setupScrollObserver();
    }, 10);
  },
  modules: async () => {
    const subjects = await DataService.getSubjects();
    UI.renderHome(subjects);
    setTimeout(() => {
      const el = document.getElementById('modules-section');
      if (el) window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
      setupScrollObserver();
    }, 100);
  },
  subject: async (id) => {
    const subjects = await DataService.getSubjects();
    const subject = subjects.find(s => s.id === id);
    if (subject) UI.renderSubject(subject);
  },
  quiz: async (moduleId) => {
    const questions = await DataService.getQuestions(moduleId);
    if (questions.length > 0) {
      QuizEngine.init(questions, moduleId);
      UI.renderQuiz(moduleId, 0, questions.length);
    }
  },
  review: async (moduleId) => {
    const questions = await DataService.getQuestions(moduleId);
    const progress = ProgressService.getModuleProgress(moduleId);
    if (progress && progress.failedQuestionIds.length > 0) {
      const failedQuestions = questions.filter(q => progress.failedQuestionIds.includes(q.id));
      QuizEngine.init(failedQuestions, moduleId, true);
      UI.renderQuiz(moduleId, 0, failedQuestions.length);
    }
  },
  results: async (moduleId) => {
    const stats = QuizEngine.getFinalStats();
    UI.renderResults(stats, moduleId);
  }
};

// Start App
document.addEventListener('DOMContentLoaded', () => {
  Router.init(routes);
});
