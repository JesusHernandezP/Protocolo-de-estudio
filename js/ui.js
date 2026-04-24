import { Router } from './router.js';
import { DataService } from './dataService.js';
import { ProgressService } from './progressService.js';
import { QuizEngine } from './quizEngine.js';

const app = document.getElementById('app');

export const UI = {
  renderHome(subjects) {
    app.innerHTML = `
      <section id="home-section" class="home-hero flex flex-col items-center justify-center min-h-[100dvh] w-full px-4 md:px-8 overflow-x-hidden">
          <div class="flex flex-col items-center justify-center text-center w-full max-w-6xl mx-auto">
              <div class="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase whitespace-nowrap max-w-full text-center">
                PROTOCOLO DE ESTUDIO ACTIVO
              </div>
              <h1 class="text-4xl sm:text-6xl md:text-8xl lg:text-[8rem] font-black font-display text-glow uppercase italic mb-6 leading-[1.1] sm:leading-none tracking-tight">
                LOS JUEGOS <br class="sm:hidden"> DEL <span class="text-cyan">DAM</span>
              </h1>
              <p class="text-slate-400 text-sm sm:text-xl md:text-2xl font-light mb-10 sm:mb-12 max-w-[95%] sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed text-balance">
                Una experiencia inmersiva para dominar tus disciplinas.
              </p>
              <button class="btn-futuristic scale-90 sm:scale-100" onclick="location.hash='#/modules'">INICIAR PROTOCOLO</button>
          </div>
      </section>

      <section id="modules-section" class="py-20 min-h-[100dvh] flex flex-col justify-center px-4 md:px-8 w-full max-w-7xl mx-auto">
          <div class="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
              <div>
                  <h2 class="font-display text-4xl font-bold mb-2 uppercase italic text-glow">Terminal de Prácticas</h2>
                  <div class="h-1 w-20 bg-cyan rounded-full"></div>
              </div>
              <p class="font-mono text-sm text-cyan flex items-center gap-2">
                <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse" style="animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"></span>
                Sistemas Operativos en Línea
              </p>
          </div>
          <div id="subjects" class="subjects-grid">
              ${subjects.map(s => {
                const progress = ProgressService.getModuleProgress(s.id);
                return `
                  <div class="card glass-panel border-${s.color}" onclick="location.hash='#/subject/${s.id}'">
                      <div class="flex justify-between items-start mb-6">
                          <div class="text-${s.color}"><i data-lucide="${s.icon}"></i></div>
                          <span class="font-mono text-[10px] opacity-50">${s.code}</span>
                      </div>
                      <h3 class="font-display text-2xl font-bold mb-1">${s.name}</h3>
                      <div class="text-[10px] text-cyan uppercase tracking-widest mb-4">SIMULADOR ACTIVO</div>
                      <div class="progress-bar">
                          <div class="progress-fill bg-cyan" style="width: 0%"></div>
                      </div>
                  </div>
                `;
              }).join('')}
          </div>
      </section>
    `;
    lucide.createIcons();
  },

  renderSubject(subject) {
    app.innerHTML = `
      <div class="py-10 px-4">
          <button class="text-cyan mb-8 font-mono hover:text-white transition-colors" onclick="location.hash='#/modules'">< VOLVER A MÓDULOS</button>
          <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-10">
              <div>
                  <h1 class="text-6xl font-black font-display uppercase italic">${subject.name}</h1>
                  <p class="text-slate-400 mt-2">${subject.description}</p>
              </div>
              <div class="text-right font-mono text-cyan">
                  <div>CÓDIGO: ${subject.code}</div>
                  <div>SISTEMA: ESTABLE</div>
              </div>
          </div>

          <div class="grid gap-4">
              ${subject.modules.map(m => {
                const prog = ProgressService.getModuleProgress(m.id);
                return `
                  <div class="glass-panel p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div class="flex-1">
                          <h3 class="text-xl font-bold font-display">${m.title}</h3>
                          <div class="flex gap-4 mt-2 font-mono text-[10px] text-slate-500">
                              <span>PREGUNTAS: ${m.questionsCount}</span>
                              <span>PUNTUACIÓN MÁX: ${prog ? prog.bestScore + '%' : 'N/A'}</span>
                          </div>
                      </div>
                      <div class="flex gap-3">
                          ${prog && prog.failedQuestionIds.length > 0 ? 
                            `<button class="btn-futuristic py-2 px-4 border-yellow text-xs" onclick="location.hash='#/review/${m.id}'">REPASAR ERRORES</button>` : ''}
                          <button class="btn-futuristic py-2 px-4 text-xs" onclick="location.hash='#/quiz/${m.id}'">INICIAR QUIZ</button>
                      </div>
                  </div>
                `;
              }).join('')}
          </div>
      </div>
    `;
  },

  renderQuiz(moduleTitle, currentIndex, total) {
    const question = QuizEngine.getCurrentQuestion();
    const progress = Math.round(((currentIndex) / total) * 100);
    const subjectId = QuizEngine.state.questions[0].subjectId;
    
    app.innerHTML = `
      <div class="max-w-4xl mx-auto py-10 px-4">
          <div class="flex justify-between items-center mb-8">
              <button class="text-slate-400 font-mono hover:text-white transition-colors text-xs flex items-center gap-2" onclick="location.hash='#/subject/${subjectId}'">
                  <i data-lucide="arrow-left" class="w-4 h-4"></i> VOLVER AL MÓDULO
              </button>
              <button class="btn-futuristic py-2 px-4 text-xs border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all font-bold tracking-widest" onclick="location.hash='#/subject/${subjectId}'">
                 SALIR DEL QUIZ
              </button>
          </div>
          
          <div class="flex justify-between items-center mb-6 font-mono text-xs text-cyan">
              <span>MOD: ${moduleTitle}</span>
              <span>PREGUNTA ${currentIndex + 1} DE ${total}</span>
          </div>
          
          <div class="progress-bar mb-10 h-1">
              <div class="progress-fill bg-cyan" style="width: ${progress}%"></div>
          </div>

          <div class="glass-panel p-10 mb-8">
              <h2 class="text-2xl font-bold leading-relaxed mb-10">${question.question}</h2>
              
              <div id="options-container">
                  ${question.options.map(opt => `
                    <div class="quiz-option glass-panel" onclick="window.handleSelectOption('${opt.id}')" data-id="${opt.id}">
                        <span class="font-mono mr-4 text-cyan opacity-50">${opt.id.toUpperCase()}.</span> ${opt.text}
                    </div>
                  `).join('')}
              </div>

              <div id="feedback-panel" class="feedback-panel border-t border-white/10 mt-10">
                  <h4 id="feedback-title" class="font-display font-bold uppercase mb-2"></h4>
                  <p id="option-explanation" class="text-sm italic mb-4"></p>
                  <div class="bg-cyan/5 p-4 rounded border-l-2 border-cyan text-sm">
                      <strong>SISTEMA:</strong> <span id="general-explanation"></span>
                  </div>
                  <button id="next-btn" class="btn-futuristic mt-8 w-full" style="display:none">SIGUIENTE</button>
                  <button id="finish-btn" class="btn-futuristic mt-8 w-full border-pink" style="display:none">FINALIZAR PROTOCOLO</button>
              </div>
          </div>
      </div>
    `;

    // Global handler for selecting option
    window.handleSelectOption = (optionId) => {
      const result = QuizEngine.submitAnswer(optionId);
      const options = document.querySelectorAll('.quiz-option');
      const feedbackPanel = document.getElementById('feedback-panel');
      const feedbackTitle = document.getElementById('feedback-title');
      const optionExp = document.getElementById('option-explanation');
      const generalExp = document.getElementById('general-explanation');
      const nextBtn = document.getElementById('next-btn');
      const finishBtn = document.getElementById('finish-btn');

      options.forEach(opt => {
        opt.onclick = null;
        if (opt.dataset.id === result.correctId) opt.classList.add('correct');
        if (opt.dataset.id === optionId && !result.isCorrect) opt.classList.add('incorrect');
        opt.style.opacity = (opt.dataset.id === result.correctId || opt.dataset.id === optionId) ? '1' : '0.4';
      });

      feedbackPanel.style.display = 'block';
      feedbackTitle.innerText = result.isCorrect ? 'EXCELENTE - TRANSMISIÓN CORRECTA' : 'ERROR DE TRANSMISIÓN - INCORRECTA';
      feedbackTitle.className = result.isCorrect ? 'font-display font-bold uppercase mb-2 text-green-400' : 'font-display font-bold uppercase mb-2 text-red-500';
      optionExp.innerText = result.optionExplanation;
      generalExp.innerText = result.explanation;

      if (currentIndex + 1 < total) {
        nextBtn.style.display = 'block';
        nextBtn.onclick = () => {
          QuizEngine.nextQuestion();
          UI.renderQuiz(moduleTitle, QuizEngine.state.currentIndex, total);
        };
      } else {
        finishBtn.style.display = 'block';
        finishBtn.onclick = () => Router.navigate(`results/${QuizEngine.state.moduleId}`);
      }
    };
    
    lucide.createIcons();
  },

  renderResults(stats, moduleId) {
    const isSuccess = stats.percentage >= 50;
    app.innerHTML = `
      <div class="max-w-2xl mx-auto py-20 px-4 text-center">
          <div class="font-display text-glow text-6xl mb-4 ${isSuccess ? 'text-green-400' : 'text-red-500'}">
              ${stats.percentage}%
          </div>
          <h2 class="text-3xl font-bold uppercase mb-2">ANÁLISIS COMPLETADO</h2>
          <p class="text-slate-400 mb-10">${isSuccess ? 'Protocolo exitoso. Conocimientos asimilados.' : 'Conexión inestable. Se recomienda revisión del módulo.'}</p>

          <div class="grid grid-cols-2 gap-4 mb-12">
              <div class="glass-panel p-6">
                  <div class="text-slate-500 text-xs uppercase mb-1">Aciertos</div>
                  <div class="text-2xl font-bold text-green-400 font-display">${stats.score}</div>
              </div>
              <div class="glass-panel p-6">
                  <div class="text-slate-500 text-xs uppercase mb-1">Errores</div>
                  <div class="text-2xl font-bold text-red-500 font-display">${stats.failedCount}</div>
              </div>
          </div>

          <div class="flex flex-col gap-4">
              <button class="btn-futuristic" onclick="location.hash='#/quiz/${moduleId}'">REPETIR PROTOCOLO</button>
              ${stats.failedCount > 0 ? `<button class="btn-futuristic border-yellow" onclick="location.hash='#/review/${moduleId}'">REPASAR ERRORES</button>` : ''}
              <button class="btn-futuristic border-slate-700" onclick="location.hash='#/modules'">VOLVER A MÓDULOS</button>
          </div>
      </div>
    `;
  }
};
