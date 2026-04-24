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
              <div class="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide uppercase whitespace-nowrap max-w-full text-center">
                PLATAFORMA DE ESTUDIO
              </div>
              <h1 class="text-4xl sm:text-6xl md:text-8xl lg:text-[8rem] font-black font-display uppercase tracking-tight mb-6 leading-[1.1] sm:leading-none text-slate-100">
                Simulacro de <br class="sm:hidden"> <span class="text-blue-500">EXAMENES</span>
              </h1>
              <p class="text-slate-400 text-sm sm:text-xl md:text-2xl font-light mb-10 sm:mb-12 max-w-[95%] sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed text-balance">
                Desarrollo de Aplicaciones Multiplataforma.
              </p>
              <button class="btn-futuristic scale-90 sm:scale-100" onclick="location.hash='#/modules'">COMENZAR ESTUDIO</button>
          </div>
      </section>

      <section id="modules-section" class="py-20 min-h-[100dvh] flex flex-col justify-center px-4 md:px-8 w-full max-w-7xl mx-auto">
          <div class="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
              <div>
                  <h2 class="font-display text-4xl font-bold mb-2 tracking-tight text-white">Módulos de Práctica</h2>
                  <div class="h-1 w-20 bg-blue-500 rounded-full"></div>
              </div>
              <p class="font-mono text-sm text-slate-400 flex items-center gap-2">
                <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Sistema en Línea
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
                      <h3 class="font-display text-lg font-semibold mb-1">${s.name}</h3>
                      <div class="text-[10px] text-slate-500 uppercase font-medium tracking-wide mb-4">SIMULADOR</div>
                      <div class="progress-bar">
                          <div class="progress-fill bg-blue-500" style="width: 0%"></div>
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
          <button class="text-slate-400 mb-8 font-medium hover:text-white transition-colors" onclick="location.hash='#/modules'">← Volver a módulos</button>
          <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-10">
              <div>
                  <h1 class="text-4xl text-white font-bold font-display tracking-tight">${subject.name}</h1>
                  <p class="text-slate-400 mt-2">${subject.description}</p>
              </div>
              <div class="text-right font-mono text-slate-500 text-sm">
                  <div>CÓDIGO: ${subject.code}</div>
                  <div class="text-emerald-500 mt-1">ESTADO: ACTIVO</div>
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
                            `<button class="btn-futuristic py-2 px-4 border-yellow text-xs" onclick="location.hash='#/review/${m.id}'">REVISAR ERRORES</button>` : ''}
                          <button class="btn-futuristic py-2 px-4 text-xs bg-blue-600 text-white border-0 hover:bg-blue-700 hover:text-white shadow-md shadow-blue-500/20" onclick="location.hash='#/quiz/${m.id}'">COMENZAR EXAMEN</button>
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
              <button class="btn-futuristic py-2 px-4 text-xs border-slate-700 bg-transparent text-slate-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 transition-all font-medium" onclick="location.hash='#/subject/${subjectId}'">
                 SALIR DEL EXAMEN
              </button>
          </div>
          
          <div class="flex justify-between items-center mb-6 font-medium text-sm text-slate-400">
              <span>Módulo: ${moduleTitle}</span>
              <span class="font-mono">Pregunta ${currentIndex + 1} de ${total}</span>
          </div>
          
          <div class="progress-bar mb-10 h-1">
              <div class="progress-fill bg-blue-500" style="width: ${progress}%"></div>
          </div>

          <div class="glass-panel p-10 mb-8">
              <h2 class="text-2xl font-bold leading-relaxed mb-10">${question.question}</h2>
              
              <div id="options-container">
                  ${question.options.map(opt => `
                    <div class="quiz-option glass-panel" onclick="window.handleSelectOption('${opt.id}')" data-id="${opt.id}">
                        <span class="font-mono mr-4 text-slate-500 font-medium">${opt.id.toUpperCase()}.</span> ${opt.text}
                    </div>
                  `).join('')}
              </div>

              <div id="feedback-panel" class="feedback-panel border-t border-white/10 mt-10">
                  <h4 id="feedback-title" class="font-display font-semibold uppercase mb-2"></h4>
                  <p id="option-explanation" class="text-sm text-slate-300 mb-4"></p>
                  <div class="bg-blue-500/10 p-4 rounded-lg border-l-4 border-blue-500 text-sm">
                      <strong class="text-blue-400">Explicación:</strong> <span class="text-slate-300" id="general-explanation"></span>
                  </div>
                  <button id="next-btn" class="btn-futuristic mt-8 w-full bg-blue-600 text-white font-medium hover:bg-blue-700" style="display:none">Siguiente pregunta</button>
                  <button id="finish-btn" class="btn-futuristic mt-8 w-full border-blue-500 text-blue-400 font-medium hover:bg-blue-500/10" style="display:none">Finalizar examen</button>
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
      feedbackTitle.innerText = result.isCorrect ? 'Respuesta correcta' : 'Respuesta incorrecta';
      feedbackTitle.className = result.isCorrect ? 'font-display font-semibold mb-2 text-emerald-400' : 'font-display font-semibold mb-2 text-red-400';
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
          <div class="font-display font-bold text-6xl mb-4 ${isSuccess ? 'text-emerald-400' : 'text-red-400'}">
              ${stats.percentage}%
          </div>
          <h2 class="text-2xl font-bold tracking-tight mb-2 text-white">EXAMEN COMPLETADO</h2>
          <p class="text-slate-400 mb-10">${isSuccess ? 'Has superado la prueba de conocimientos con éxito.' : 'No has alcanzado la puntuación mínima. Te recomendamos repasar el módulo.'}</p>

          <div class="grid grid-cols-2 gap-4 mb-12">
              <div class="glass-panel p-6">
                  <div class="text-slate-500 font-medium text-sm mb-1">Aciertos</div>
                  <div class="text-3xl font-semibold text-emerald-400 font-display">${stats.score}</div>
              </div>
              <div class="glass-panel p-6">
                  <div class="text-slate-500 font-medium text-sm mb-1">Errores</div>
                  <div class="text-3xl font-semibold text-red-400 font-display">${stats.failedCount}</div>
              </div>
          </div>

          <div class="flex flex-col gap-4">
              <button class="btn-futuristic bg-blue-600 text-white border-0 hover:bg-blue-700" onclick="location.hash='#/quiz/${moduleId}'">REPETIR EXAMEN</button>
              ${stats.failedCount > 0 ? `<button class="btn-futuristic border-yellow text-yellow-500 hover:bg-yellow-500/10" onclick="location.hash='#/review/${moduleId}'">REVISAR ERRORES</button>` : ''}
              <button class="btn-futuristic border-slate-700 text-slate-300 hover:bg-slate-800" onclick="location.hash='#/modules'">VOLVER A MÓDULOS</button>
          </div>
      </div>
    `;
  }
};
