import { Router } from './router.js';
import { DataService } from './dataService.js';
import { UI } from './ui.js';
import { QuizEngine } from './quizEngine.js';
import { ProgressService } from './progressService.js';

// Starfield Logic
function initStarfield() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    const numStars = Math.floor((canvas.width * canvas.height) / 3000);
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            alpha: Math.random()
        });
    }
  }

  function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
          star.x += star.vx;
          star.y += star.vy;
          if (star.x < 0) star.x = canvas.width;
          if (star.x > canvas.width) star.x = 0;
          if (star.y < 0) star.y = canvas.height;
          if (star.y > canvas.height) star.y = 0;

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
          ctx.fill();
      });
      requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  resize();
  animate();
}

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
  initStarfield();
  Router.init(routes);
});
