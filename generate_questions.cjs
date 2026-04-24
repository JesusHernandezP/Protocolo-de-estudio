const fs = require('fs');

const rawSections = [
  // SECTION 1
  {
    moduleId: 'english-s1',
    data: [
      {q: "Transforma a pasiva: 'People analyze the data every day.'", o: ["The data is analyzed every day.", "The data are analyzed every day.", "People is analyzed data.", "The data was analyzed every day."], a: "The data is analyzed every day.", f: "Según el Algoritmo de la Pasiva, el objeto 'the data' pasa a ser el sujeto[cite: 2030]."},
      {q: "¿Qué sucede con el sujeto original 'Someone' en la pasiva?", o: ["Es obligatorio ponerlo", "Suele omitirse por ser irrelevante", "Se pone al principio", "Se cambia por 'the data'"], a: "Suele omitirse por ser irrelevante", f: "Sujetos como 'Someone' o 'People' se omiten para centrar el foco en la acción[cite: 2032]."},
      {q: "En 'The teacher gave the students homework', ¿cuál es la pasiva recomendada?", o: ["Homework was given...", "The students were given homework", "The teacher was given...", "The students given homework"], a: "The students were given homework", f: "En estructuras de doble objeto, se recomienda que la persona que recibe sea el sujeto[cite: 2045]."},
      {q: "¿Cuál es la forma pasiva del Pasado Simple?", o: ["am/is/are + participio", "was/were + participio", "have been + participio", "will be + participio"], a: "was/were + participio", f: "La Matriz de Compilación indica que el pasado usa 'was/were'[cite: 2035]."},
      {q: "Transforma: 'The team will solve the problem.'", o: ["The problem solved.", "The problem will be solved.", "The problem is solved.", "The problem was solved."], a: "The problem will be solved.", f: "El futuro en pasiva utiliza la estructura 'will be + participio'[cite: 2035]."},
      {q: "¿Qué estructura usa la Pasiva Impersonal?", o: ["I say that...", "It is said that...", "People said that...", "It says that..."], a: "It is said that...", f: "Se utiliza para reportar hechos generales de forma impersonal[cite: 2051]."},
      {q: "Completa: 'The new medicine is known ___ safe.'", o: ["to be", "being", "is", "that is"], a: "to be", f: "La estructura es [Subject] + is known to + infinitivo[cite: 2055]."},
      {q: "Pasiva de Present Perfect: 'They have discovered the results.'", o: ["The results have been discovered.", "The results has been discovered.", "The results were discovered.", "The results have discovered."], a: "The results have been discovered.", f: "El Present Perfect usa 'have/has been + participio'[cite: 2035]."},
      {q: "¿Qué elemento es opcional en la pasiva?", o: ["El verbo To Be", "El Participio", "El Agente (by Agent)", "El Objeto"], a: "El Agente (by Agent)", f: "El agente solo se incluye si aporta información necesaria[cite: 2028]."},
      {q: "Transforma: 'The chef is preparing the meal.'", o: ["The meal is prepared.", "The meal is being prepared.", "The meal was prepared.", "The meal has been prepared."], a: "The meal is being prepared.", f: "El presente continuo en pasiva requiere el auxiliar 'being'."}
    ]
  },
  // SECTION 2
  {
    moduleId: 'english-s2',
    data: [
      {q: "¿Cuál es el uso exclusivo de 'Will' según el Blueprint?", o: ["Planes meditados", "Decisiones inmediatas", "Hábitos", "Obligaciones"], a: "Decisiones inmediatas", f: "Will se usa para decisiones tomadas en el momento (Immediate decisions)[cite: 2077]."},
      {q: "¿Qué porcentaje de certeza expresa 'Must'?", o: ["0%", "50%", "80%", "100%"], a: "100%", f: "Must indica obligación o certeza absoluta en el espectro modal[cite: 2070]."},
      {q: "¿Qué modales expresan un 50% de posibilidad?", o: ["Must/Have to", "Should/Need to", "Might/Could", "Can't"], a: "Might/Could", f: "Might y Could se usan para duda o posibilidad media[cite: 2065]."},
      {q: "¿Cuál es la función de 'Should'?", o: ["Obligación total", "Imposibilidad", "Consejo o necesidad", "Decisión inmediata"], a: "Consejo o necesidad", f: "Should se sitúa en el 80% para dar recomendaciones[cite: 2067]."},
      {q: "¿Qué modal indica imposibilidad absoluta (0%)?", o: ["Mustn't", "Shouldn't", "Can't", "Might not"], a: "Can't", f: "Can't se usa cuando hay evidencia de que algo es imposible[cite: 2063]."},
      {q: "¿Cómo se forman las interrogativas con modales?", o: ["Usando 'do/does'", "Invirtiendo el orden", "Añadiendo 'to'", "Usando 'did'"], a: "Invirtiendo el orden", f: "Se invierte el sujeto y el modal, por ejemplo: 'Should we...?'[cite: 2072]."},
      {q: "¿Qué estructura tiene el Future Simple?", o: ["Subject + going to", "Subject + will + infinitive", "Subject + will + -ing", "Subject + will have"], a: "Subject + will + infinitive", f: "Estructura base para decisiones inmediatas y predicciones[cite: 2080]."},
      {q: "Completa: 'You ____ park here' (Obligación).", o: ["must", "might", "can", "should"], a: "must", f: "Must expresa la obligación directa de cumplimiento[cite: 2069]."},
      {q: "Diferencia de 'Be going to' vs 'Will':", o: ["No hay diferencia", "Going to es para planes meditados", "Will es más formal", "Going to es pasado"], a: "Going to es para planes meditados", f: "Will es para el instante, Going to para intenciones previas[cite: 2172, 2224]."},
      {q: "¿Qué expresa 'Mustn't'?", o: ["Falta de obligación", "Prohibición", "Consejo", "Duda"], a: "Prohibición", f: "Es la forma negativa de la obligación, indicando que algo no está permitido[cite: 2072]."}
    ]
  },
  // SECTION 3
  {
    moduleId: 'english-s3',
    data: [
      {q: "¿Cuál es la 'Regla de Oro' del Reported Speech?", o: ["Paso adelante", "Eliminar verbos", "Un paso atrás en el tiempo", "Mantener comillas"], a: "Un paso atrás en el tiempo", f: "Al reportar, el tiempo verbal viaja al pasado (Backshift)[cite: 2084]."},
      {q: "Si en estilo directo digo 'will', ¿a qué cambia en el indirecto?", o: ["will be", "would", "had to", "was"], a: "would", f: "El futuro simple 'will' se convierte en el condicional 'would'[cite: 2097]."},
      {q: "Cambio de: 'I want water' (Noelia said...).", o: ["she wants water", "she wanted water", "she would want water", "she had wanted water"], a: "she wanted water", f: "El Present Simple cambia a Past Simple[cite: 2090]."},
      {q: "¿Qué conector se usa en preguntas de Sí/No?", o: ["that", "if / whether", "who", "because"], a: "if / whether", f: "Las preguntas cerradas se enrutan mediante 'if' o 'whether'[cite: 2106]."},
      {q: "¿Qué sucede con los auxiliares do/does/did?", o: ["Se mantienen", "Se eliminan en la compilación final", "Se cambian por 'was'", "Se ponen al final"], a: "Se eliminan en la compilación final", f: "La pregunta se transforma en una afirmación sin auxiliares[cite: 2113]."},
      {q: "¿Cuál es el cambio para 'Yesterday'?", o: ["The previous day", "The following day", "That day", "Tomorrow"], a: "The previous day", f: "Los marcadores temporales deben ajustarse al momento del reporte[cite: 2099]."},
      {q: "Diferencia entre 'Say' y 'Tell':", o: ["No hay diferencia", "'Tell' requiere objeto directo (me, him...)", "'Say' es solo para preguntas", "'Tell' no usa 'that'"], a: "'Tell' requiere objeto directo (me, him...)", f: "Decimos 'He told me', pero 'He said that'[cite: 2120]."},
      {q: "¿Qué tiempos NO cambian (Excepción)?", o: ["Present Simple", "Past Perfect y Past Continuous", "Will y Can", "Present Perfect"], a: "Past Perfect y Past Continuous", f: "Estos tiempos permanecen igual al no poder ir más atrás[cite: 2100]."},
      {q: "Reporta: 'Where are you?' (He asked...).", o: ["where was I", "where I was", "where am I", "if I was there"], a: "where I was", f: "En preguntas reportadas, el sujeto va ANTES que el verbo[cite: 2114]."},
      {q: "¿Qué verbo de reporte usa estructura [Verb + V-ing]?", o: ["Say", "Tell", "Suggest", "Advise"], a: "Suggest", f: "Suggest y Recommend suelen ir seguidos de gerundio[cite: 2125]."}
    ]
  },
  // SECTION 4
  {
    moduleId: 'english-s4',
    data: [
      {q: "¿Cuál es la función de 'Whose'?", o: ["Lugar", "Tiempo", "Posesión", "Personas"], a: "Posesión", f: "Se utiliza para indicar a quién pertenece algo (Cuyo/a)[cite: 2129]."},
      {q: "¿Qué caracteriza a las 'Defining Clauses'?", o: ["Llevan comas", "Información extra", "Información necesaria para identificar", "Prohibido usar 'that'"], a: "Información necesaria para identificar", f: "Especifican de qué sujeto estamos hablando y nunca llevan comas[cite: 2141]."},
      {q: "¿En qué tipo de cláusula está PROHIBIDO usar 'that'?", o: ["Defining", "Non-Defining", "Short clauses", "Sujeto"], a: "Non-Defining", f: "En las cláusulas explicativas (con comas) solo se usa who o which[cite: 2149]."},
      {q: "¿Cuándo se puede borrar el pronombre relativo?", o: ["Cuando es sujeto", "Cuando es objeto (seguido de otro sujeto)", "Siempre", "Nunca"], a: "Cuando es objeto (seguido de otro sujeto)", f: "Si el pronombre no realiza la acción, es omitible[cite: 2157]."},
      {q: "¿Qué pronombre es el 'comodín' para personas o cosas?", o: ["Who", "Which", "That", "Whom"], a: "That", f: "That puede sustituir a who o which solo en cláusulas especificativas[cite: 2136]."},
      {q: "Pronombre para lugares:", o: ["When", "Where", "Which", "Whose"], a: "Where", f: "Indica la ubicación física de la acción[cite: 2134]."},
      {q: "Pronombre para tiempos:", o: ["When", "Where", "Who", "That"], a: "When", f: "Se inyecta para dar datos sobre momentos o épocas[cite: 2130]."},
      {q: "¿Cómo se llama la cláusula que va entre comas?", o: ["Defining", "Non-Defining", "Essential", "Object"], a: "Non-Defining", f: "Son cláusulas explicativas que aportan un 'bonus' de datos[cite: 2145]."},
      {q: "En 'The machine that broke down...', ¿puedo borrar 'that'?", o: ["Sí", "No", "Solo si es formal", "A veces"], a: "No", f: "No se puede omitir porque 'that' actúa como sujeto de 'broke down'[cite: 2153]."},
      {q: "¿Qué pronombre se usa específicamente para personas en función de objeto?", o: ["Who", "Whom", "Which", "Whose"], a: "Whom", f: "Aunque menos común en lenguaje hablado, 'whom' es la forma de objeto[cite: 2132]."}
    ]
  },
  // SECTION 5
  {
    moduleId: 'english-s5',
    data: [
      {q: "¿Para qué se usa el Present Simple?", o: ["Acciones ahora", "Hábitos y rutinas", "Pasado reciente", "Planes futuros"], a: "Hábitos y rutinas", f: "Describe hechos generales y situaciones permanentes[cite: 2182]."},
      {q: "Estructura del Present Continuous:", o: ["Verb + -ed", "am/is/are + -ing", "have + participio", "had + -ing"], a: "am/is/are + -ing", f: "Se usa para acciones que suceden ahora mismo[cite: 2185]."},
      {q: "¿Qué tiempo describe una acción pasada con relevancia actual?", o: ["Past Simple", "Present Perfect Simple", "Past Perfect", "Future Simple"], a: "Present Perfect Simple", f: "Une el pasado con el presente (ej: 'I have cooked')[cite: 2190]."},
      {q: "¿Qué auxiliar se usa para negativas en Past Simple?", o: ["don't", "didn't", "haven't", "wasn't"], a: "didn't", f: "El auxiliar 'did' se usa para negar e interrogar en pasado simple[cite: 2200]."},
      {q: "¿Qué tiempo es el 'pasado del pasado'?", o: ["Past Simple", "Past Perfect Simple", "Past Continuous", "Present Perfect"], a: "Past Perfect Simple", f: "Indica que una acción ocurrió antes que otra acción pasada[cite: 2210]."},
      {q: "Uso del Past Continuous:", o: ["Hechos generales", "Acción terminada", "Acción en progreso en el pasado", "Decisión inmediata"], a: "Acción en progreso en el pasado", f: "A menudo describe una acción larga interrumpida por otra[cite: 2205]."},
      {q: "Diferencia entre 'Since' y 'For':", o: ["No hay diferencia", "'Since' punto concreto, 'For' duración", "'Since' futuro, 'For' pasado", "Solo se usan en presente"], a: "'Since' punto concreto, 'For' duración", f: "'Since 2015' vs 'For five years'[cite: 2196]."},
      {q: "En el condicional tipo 2, ¿qué forma del verbo To Be se prefiere?", o: ["was", "were", "been", "is"], a: "were", f: "Se usa siempre 'were' incluso para I/He/She/It (ej: 'If I were you')[cite: 2249]."},
      {q: "¿Qué tiempo enfatiza la duración de una acción que continúa?", o: ["Present Perfect Simple", "Present Perfect Continuous", "Past Simple", "Future Continuous"], a: "Present Perfect Continuous", f: "Estructura: have/has + been + -ing[cite: 2194]."},
      {q: "¿Qué palabra clave indica Past Simple?", o: ["right now", "yesterday", "since", "yet"], a: "yesterday", f: "Expresiones como yesterday o ago son pistas del pasado terminado[cite: 2251]."}
    ]
  },
  // SECTION 6
  {
    moduleId: 'english-s6',
    data: [
      {q: "Uso de 'Future Continuous':", o: ["Acción terminada", "Acción en progreso en un momento futuro", "Promesa", "Plan meditado"], a: "Acción en progreso en un momento futuro", f: "Estructura: will be + -ing[cite: 2229]."},
      {q: "¿Estructura del Future Perfect Simple?", o: ["will be + -ing", "will have + participio", "will have been + -ing", "going to + participio"], a: "will have + participio", f: "Acción que habrá terminado antes de un punto futuro[cite: 2233]."},
      {q: "Completa: 'Next month, I ___ working here for 5 years.'", o: ["will have been", "will be", "am going to", "will"], a: "will have been", f: "Future Perfect Continuous para duración hasta un punto futuro[cite: 2238]."},
      {q: "¿Qué tiempo usarías para una predicción basada en evidencia presente?", o: ["Will", "Be going to", "Future Continuous", "Present Simple"], a: "Be going to", f: "Como al ver nubes negras: 'It is going to rain'[cite: 2226]."},
      {q: "¿Qué expresa 'will' en promesas u ofertas?", o: ["Plan cerrado", "Decisión/Intención", "Obligación", "Posibilidad"], a: "Decisión/Intención", f: "Se usa para ofrecer ayuda o hacer una promesa espontánea[cite: 2220]."},
      {q: "Este tiempo mañana, 'I will be travelling'. ¿Qué tiempo es?", o: ["Future Simple", "Future Continuous", "Future Perfect", "Present Continuous"], a: "Future Continuous", f: "Acción en curso en un momento específico del mañana[cite: 2231]."},
      {q: "¿Qué estructura usa el Futuro con 'Be going to'?", o: ["am/is/are + going to + infinitivo", "will + going to", "going to + -ing", "have + going to"], a: "am/is/are + going to + infinitivo", f: "Indica planes e intenciones personales[cite: 2223]."},
      {q: "La expresión 'By 10 pm' suele indicar el uso de:", o: ["Future Simple", "Future Perfect", "Future Continuous", "Present Simple"], a: "Future Perfect", f: "Indica el límite temporal para que una acción termine[cite: 2236]."},
      {q: "Futuro para predicciones generales sin evidencia:", o: ["Will", "Be going to", "Present Continuous", "Past Simple"], a: "Will", f: "Opiniones sobre el futuro (ej: 'I think people will live on Mars')[cite: 2221]."},
      {q: "¿Qué tiempo se usa para planes futuros cercanos confirmados?", o: ["Future Simple", "Present Continuous", "Future Perfect", "Past Perfect"], a: "Present Continuous", f: "Acciones agendadas (ej: 'I am meeting my boss at 5')[cite: 2186]."}
    ]
  }
];

const mappedQuestions = [];

let globalIndex = 1;

rawSections.forEach(section => {
  section.data.forEach((q, i) => {
    let opts = q.o.map((text, idx) => ({
      id: String.fromCharCode(97 + idx),
      text: text
    }));
    
    let correctId = opts.find(opt => opt.text === q.a)?.id;
    if(!correctId) correctId = 'a'; // Fallback
    
    mappedQuestions.push({
      id: "eng-q" + String(globalIndex).padStart(3, '0'),
      subjectId: 'english',
      moduleId: section.moduleId,
      question: q.q,
      options: opts,
      correctOptionId: correctId,
      explanation: q.f,
      optionExplanations: {} 
    });
    
    globalIndex++;
  });
});

fs.writeFileSync('data/questions.json', JSON.stringify(mappedQuestions, null, 2));

console.log('Successfully generated questions.json with ' + mappedQuestions.length + ' questions.');
