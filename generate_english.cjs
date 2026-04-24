const fs = require('fs');

const rawSections = [
    {
      moduleId: "english-s1",
      data: [
        {q: "Choose the sentence in past simple", o: ["She go to school yesterday", "She went to school yesterday", "She has go to school yesterday", "She going to school yesterday"], a: "She went to school yesterday", f: "El pasado simple del verbo irregular 'go' es 'went'."},
        {q: "Choose the correct sentence", o: ["Last night, I watched a movie", "Last night, I watch a movie", "Last night, I watches a movie", "Last night, I watching a movie"], a: "Last night, I watched a movie", f: "Para acciones terminadas en el pasado usamos el pasado simple (-ed)."},
        {q: "Choose the correct sentence", o: ["They is studying now", "They are studying now", "They studying now", "They were study now"], a: "They are studying now", f: "El presente continuo para 'they' requiere el auxiliar 'are'."},
        {q: "You ______ drink more water (advice)", o: ["must", "should", "can", "may"], a: "should", f: "Usamos 'should' para dar consejos."},
        {q: "I ______ dinner when she arrived", o: ["eat", "was eating", "eats", "am eating"], a: "was eating", f: "Usamos el pasado continuo para una acción en progreso interrumpida por otra en pasado simple."},
        {q: "The man ______ car was stolen called the police", o: ["who", "which", "whose", "that"], a: "whose", f: "Usamos 'whose' para indicar posesión (cuyo/a)."},
        {q: "The book ______ I bought is very interesting", o: ["who", "which", "whose", "where"], a: "which", f: "Usamos 'which' o 'that' para objetos en cláusulas de relativo."},
        {q: "Reported Speech: 'I am hungry' – Laura", o: ["Laura said she is hungry", "Laura said she was hungry", "Laura says she hungry", "Laura said she hungry"], a: "Laura said she was hungry", f: "En el estilo indirecto, el Present Simple cambia a Past Simple."},
        {q: "Reported Speech: 'I finished my homework' – Tom", o: ["He said he finishes his homework", "He said he finished his homework", "He said he finish homework", "He says he finished"], a: "He said he finished his homework", f: "Se mantiene el tiempo pasado al reportar una acción ya concluida."},
        {q: "He ______ be at home. The lights are off (certainty)", o: ["must", "might", "can't", "should"], a: "can't", f: "Usamos 'can't' para deducciones negativas cuando estamos seguros de algo."},
        {q: "Reported Speech: 'I will call you tomorrow' – Ana", o: ["Ana said she will call me tomorrow", "Ana said she would call me the next day", "Ana says she call me tomorrow", "Ana said she calls me"], a: "Ana said she would call me the next day", f: "Will cambia a Would y tomorrow cambia a 'the next day'."},
        {q: "Comparative of 'good'", o: ["gooder", "more good", "better", "best"], a: "better", f: "Good es un adjetivo irregular; su comparativo es 'better'."},
        {q: "Comparative of 'happy'", o: ["happier", "more happy", "happyer", "happiest"], a: "happier", f: "Adjetivos terminados en -y cambian a -ier."},
        {q: "Choose the correct sentence", o: ["This is the more expensive phone", "This is the most expensive phone", "This is most expensive phone", "This is expensive most"], a: "This is the most expensive phone", f: "Superlativo de adjetivos largos: the most + adjetivo."},
        {q: "I think it ______ rain tomorrow (prediction)", o: ["is going to", "will", "going", "will going"], a: "will", f: "Usamos 'will' para predicciones basadas en opiniones."},
        {q: "Look at those clouds! It ______ rain", o: ["will", "is going to", "going", "will be"], a: "is going to", f: "Usamos 'be going to' para predicciones basadas en evidencias presentes."},
        {q: "Passive voice: 'The dog ate the food'", o: ["The food was eaten by the dog", "The food is eaten by the dog", "The food eats the dog", "The food eaten by dog"], a: "The food was eaten by the dog", f: "Estructura: Objeto + was/were + participio."},
        {q: "Passive voice: 'They built the house'", o: ["The house is built", "The house was built", "The house builds", "The house builded"], a: "The house was built", f: "Pasado simple en pasiva usa was/were + participio."},
        {q: "The project ______ next week", o: ["will finish", "will be finished", "is finish", "finished"], a: "will be finished", f: "Pasiva en futuro: will be + participio."},
        {q: "If I ______ time, I ______ you", o: ["have / will help", "will have / help", "have / help", "had / will help"], a: "have / will help", f: "First Conditional: If + Present Simple, will + base form."},
        {q: "If I ______ rich, I ______ travel the world", o: ["am / will", "were / would", "was / will", "were / will"], a: "were / would", f: "Second Conditional: If + Past Simple (were), would + base form."},
        {q: "If she ______ studied, she ______ passed", o: ["had / would", "had studied / would have", "studied / would", "has studied / would"], a: "had studied / would have", f: "Third Conditional: If + Past Perfect, would have + participio."},
        {q: "I ______ TV at the moment", o: ["watch", "am watching", "watched", "watching"], a: "am watching", f: "Present Continuous para acciones en el momento actual."},
        {q: "Tag question: You are coming, ______?", o: ["aren't you", "are you", "do you", "will you"], a: "aren't you", f: "Si la frase es afirmativa, la tag es negativa."},
        {q: "Tag question: Close the window, ______?", o: ["won't you", "will you", "do you", "aren't you"], a: "will you", f: "En imperativos, se suele usar 'will you' o 'won't you'."},
        {q: "I have ______ my keys", o: ["lose", "lost", "losing", "loses"], a: "lost", f: "Present Perfect requiere el participio del verbo (lost)."},
        {q: "______ you help me, please?", o: ["Must", "Should", "Could", "Have"], a: "Could", f: "Usamos 'could' para peticiones educadas."},
        {q: "______ I borrow your pen?", o: ["Can", "May", "Must", "Will"], a: "May", f: "May se usa para pedir permiso de manera formal."},
        {q: "You ______ stop at a red light", o: ["can", "may", "must", "could"], a: "must", f: "Must expresa obligación legal o fuerte."},
        {q: "My friend, ______ lives in Paris, is visiting me", o: ["which", "who", "where", "what"], a: "who", f: "Usamos 'who' para personas en cláusulas de relativo."}
      ]
    },
    {
      moduleId: "english-s2",
      data: [
        {q: "Choose the sentence in past simple", o: ["We see that movie yesterday", "We saw that movie yesterday", "We seen that movie yesterday", "We seeing that movie yesterday"], a: "We saw that movie yesterday", f: "Pasado simple de 'see' es 'saw'."},
        {q: "Choose the correct sentence", o: ["Last weekend, I visited my grandparents", "Last weekend, I visit my grandparents", "Last weekend, I visiting my grandparents", "Last weekend, I visits my grandparents"], a: "Last weekend, I visited my grandparents", f: "Acción terminada en el pasado."},
        {q: "Choose the correct sentence", o: ["He are working now", "He is working now", "He working now", "He was work now"], a: "He is working now", f: "Present Continuous para 'he' usa 'is'."},
        {q: "You ______ study harder (teacher to student)", o: ["can", "should", "may", "might"], a: "should", f: "Consejo del profesor."},
        {q: "They ______ football when it started to rain", o: ["played", "were playing", "play", "are playing"], a: "were playing", f: "Pasado continuo para una acción en progreso en el pasado."},
        {q: "The woman ______ son is a doctor is very kind", o: ["who", "which", "whose", "that"], a: "whose", f: "Posesión: la mujer cuyo hijo es doctor."},
        {q: "The restaurant ______ we ate was expensive", o: ["who", "where", "which", "whose"], a: "where", f: "Relative pronoun para lugares."},
        {q: "Reported: 'I like chocolate' – Marta", o: ["Marta said she liked chocolate", "Marta said she likes chocolate", "Marta said she like chocolate", "Marta says she liked chocolate"], a: "Marta said she liked chocolate", f: "Tense backshift: like -> liked."},
        {q: "Reported: 'I am reading a book' – David", o: ["He said he was reading a book", "He said he is reading a book", "He said he read a book", "He says he was reading"], a: "He said he was reading a book", f: "Present Continuous cambia a Past Continuous."},
        {q: "She ______ be tired after working all day (certainty)", o: ["might", "must", "can", "should"], a: "must", f: "Deducción lógica de certeza."},
        {q: "Reported: 'I can swim' – Pablo", o: ["Pablo said he can swim", "Pablo said he could swim", "Pablo says he could swim", "Pablo said he swim"], a: "Pablo said he could swim", f: "Can cambia a Could en estilo indirecto."},
        {q: "Comparative of 'bad'", o: ["badder", "worse", "more bad", "worst"], a: "worse", f: "Bad es irregular, comparativo 'worse'."},
        {q: "Comparative of 'fast'", o: ["faster", "more fast", "fastter", "fastest"], a: "faster", f: "Adjetivo corto añade -er."},
        {q: "Choose the correct sentence", o: ["This is the most small room", "This is the smallest room", "This is smallest room", "This is more small room"], a: "This is the smallest room", f: "Superlativo de adjetivos cortos: the -est."},
        {q: "I ______ help you later (promise)", o: ["am going", "will", "going to", "will going"], a: "will", f: "Usamos 'will' para promesas espontáneas."},
        {q: "Look! The baby ______ cry", o: ["will", "is going to", "going", "will be"], a: "is going to", f: "Evidencia inmediata."},
        {q: "Passive: 'The chef cooked the meal'", o: ["The meal was cooked by the chef", "The meal is cooked by the chef", "The meal cooks the chef", "The meal cook"], a: "The meal was cooked by the chef", f: "Pasada simple pasiva."},
        {q: "Passive: 'They cleaned the room'", o: ["The room cleaned", "The room was cleaned", "The room is cleaning", "The room clean"], a: "The room was cleaned", f: "Was/were + participio."},
        {q: "The letter ______ tomorrow", o: ["will send", "will be sent", "is send", "sent"], a: "will be sent", f: "Futuro pasivo."},
        {q: "If she ______ early, she ______ the train", o: ["arrives / will catch", "will arrive / catch", "arrive / will catch", "arrived / will catch"], a: "arrives / will catch", f: "First Conditional."},
        {q: "If I ______ you, I ______ apologize", o: ["am / will", "were / would", "was / will", "were / will"], a: "were / would", f: "Second Conditional hipotético."},
        {q: "If they ______ more time, they ______ finished the project", o: ["had / would have", "had had / would have", "have / would", "had / will"], a: "had had / would have", f: "Third Conditional: If + Past Perfect (had had)."},
        {q: "We ______ dinner right now", o: ["have", "are having", "had", "having"], a: "are having", f: "Present Continuous."},
        {q: "Tag question: She is your sister, ______?", o: ["isn't she", "is she", "does she", "will she"], a: "isn't she", f: "Tag negativa para frase afirmativa."},
        {q: "Tag question: Let's go to the park, ______?", o: ["shall we", "will you", "do we", "won't we"], a: "shall we", f: "Para sugerencias con 'Let's', la tag es 'shall we'."},
        {q: "I have ______ a new phone", o: ["buy", "bought", "buying", "buys"], a: "bought", f: "Participio de buy."},
        {q: "______ you speak English?", o: ["Must", "Can", "Should", "Have"], a: "Can", f: "Habilidad."},
        {q: "______ I ask you a question?", o: ["Can", "May", "Must", "Will"], a: "May", f: "Permiso formal."},
        {q: "You ______ wear a helmet when riding a bike", o: ["can", "may", "must", "will"], a: "must", f: "Obligación de seguridad."},
        {q: "The teacher, ______ teaches math, is very strict", o: ["which", "who", "where", "what"], a: "who", f: "Persona en relativo."}
      ]
    },
    {
      moduleId: "english-s3",
      data: [
        {q: "If I ______ more money, I ______ a new car", o: ["have / will buy", "had / would buy", "have / buy", "had / will buy"], a: "had / would buy", f: "Second conditional (hipótesis)."},
        {q: "Choose the correct sentence", o: ["She don't like coffee", "She doesn't likes coffee", "She doesn't like coffee", "She not like coffee"], a: "She doesn't like coffee", f: "Tercera persona negativo: doesn't + base form."},
        {q: "Passive voice: 'They wrote a letter'", o: ["A letter was written", "A letter is written", "A letter wrote", "A letter writing"], a: "A letter was written", f: "Past simple passive."},
        {q: "______ I open the window?", o: ["Must", "May", "Should", "Will"], a: "May", f: "Permiso formal."},
        {q: "Comparative of 'cold'", o: ["colder", "more cold", "coldest", "coldder"], a: "colder", f: "Adjetivo corto."},
        {q: "He ______ TV when I called him", o: ["watches", "watched", "was watching", "is watching"], a: "was watching", f: "Past Continuous (interrupción)."},
        {q: "The girl ______ is singing is my sister", o: ["which", "who", "where", "whose"], a: "who", f: "Relativo personas."},
        {q: "Reported: 'I have finished' – Luis", o: ["Luis said he has finished", "Luis said he had finished", "Luis says he had finished", "Luis said he finish"], a: "Luis said he had finished", f: "Present Perfect cambia a Past Perfect."},
        {q: "You ______ smoke here (prohibition)", o: ["must", "mustn't", "can", "may"], a: "mustn't", f: "Mustn't indica prohibición."},
        {q: "Choose the correct sentence", o: ["They is playing football", "They are playing football", "They playing football", "They plays football"], a: "They are playing football", f: "Present Continuous plural."},
        {q: "The house ______ we bought is big", o: ["who", "which", "where", "whose"], a: "which", f: "Relativo objetos."},
        {q: "I ______ my homework yesterday", o: ["do", "did", "done", "doing"], a: "did", f: "Past simple de 'do'."},
        {q: "Future: I think she ______ win the competition", o: ["is going", "will", "going to", "will going"], a: "will", f: "Predicción de opinión."},
        {q: "The cake ______ by my mother", o: ["was made", "made", "is make", "was make"], a: "was made", f: "Pasiva pasado."},
        {q: "If they ______ earlier, they ______ arrived on time", o: ["leave / will", "left / would", "had left / would have", "have / bureaucratic"], a: "had left / would have", f: "Third Conditional."},
        {q: "______ you help me with this exercise?", o: ["Must", "Could", "Have", "Should"], a: "Could", f: "Petición educada."},
        {q: "Superlative: 'tall'", o: ["taller", "the tallest", "more tall", "tallest"], a: "the tallest", f: "Superlativo corto."},
        {q: "She ______ studying now", o: ["is", "are", "am", "be"], a: "is", f: "Auxiliar be presente."},
        {q: "Choose the correct sentence", o: ["I have saw that film", "I have seen that film", "I have see that film", "I seen that film"], a: "I have seen that film", f: "Participio irregular de see."},
        {q: "The boy, ______ bike is broken, is sad", o: ["who", "which", "whose", "where"], a: "whose", f: "Relativo posesivo."},
        {q: "Tag question: You like pizza, ______?", o: ["don't you", "do you", "aren't you", "will you"], a: "don't you", f: "Present simple tag."},
        {q: "If she ______ harder, she ______ pass the exam", o: ["studies / will", "study / will", "will study / pass", "studied / will"], a: "studies / will", f: "First Conditional."},
        {q: "Reported: 'I am going to travel' – Elena", o: ["Elena said she is going to travel", "Elena said she was going to travel", "Elena says she was going", "Elena said she go"], a: "Elena said she was going to travel", f: "Am going to -> Was going to."},
        {q: "Choose the correct sentence", o: ["He can sings very well", "He can sing very well", "He cans sing very well", "He can to sing very well"], a: "He can sing very well", f: "Modales van seguidos de infinitivo sin 'to'."},
        {q: "We ______ dinner at the moment", o: ["eat", "are eating", "ate", "eating"], a: "are eating", f: "Present Continuous."},
        {q: "You ______ wear a uniform at school", o: ["can", "must", "may", "could"], a: "must", f: "Obligación."},
        {q: "Passive: 'Someone broke the window'", o: ["The window broke", "The window was broken", "The window is broken", "The window break"], a: "The window was broken", f: "Past simple passive."},
        {q: "Comparative: 'interesting'", o: ["interestinger", "more interesting", "most interesting", "interestingest"], a: "more interesting", f: "Comparativo adjetivo largo."},
        {q: "Choose the correct sentence", o: ["I didn't went to class", "I didn't go to class", "I not go to class", "I didn't gone to class"], a: "I didn't go to class", f: "Negativo pasado: didn't + base form."},
        {q: "The place ______ we met was beautiful", o: ["who", "which", "where", "whose"], a: "where", f: "Lugar."}
      ]
    },
     {
      moduleId: "english-s4",
      data: [
       {q: "Choose the correct sentence", o: ["He don’t understand the lesson", "He doesn’t understands the lesson", "He doesn’t understand the lesson", "He not understand the lesson"], a: "He doesn’t understand the lesson", f: "En presente simple negativo para 'he', usamos 'doesn't' seguido del verbo en infinitivo sin -s."},
    {q: "If I ______ you, I ______ accept that offer", o: ["am / will", "were / would", "was / will", "were / will"], a: "were / would", f: "Second Conditional: Se usa 'were' para todas las personas en la condición y 'would' en el resultado."},
    {q: "Passive voice: 'They are painting the house'", o: ["The house is painted", "The house is being painted", "The house was painted", "The house painting"], a: "The house is being painted", f: "Present Continuous Passive: Objeto + am/is/are + being + participio."},
    {q: "______ I use your phone for a moment?", o: ["Must", "May", "Should", "Have"], a: "May", f: "Usamos 'May' para pedir permiso de manera formal."},
    {q: "Comparative of 'strong'", o: ["stronger", "more strong", "strongest", "strongger"], a: "stronger", f: "Adjetivos cortos de una sílaba añaden el sufijo -er para el comparativo."},
    {q: "She ______ a shower when I arrived", o: ["has", "had", "was having", "is having"], a: "was having", f: "Past Continuous: Una acción que estaba en progreso cuando otra (en pasado simple) ocurrió."},
    {q: "The boy ______ is wearing a blue jacket is my cousin", o: ["which", "who", "whose", "where"], a: "who", f: "Relative Clause: 'Who' se utiliza como pronombre relativo para personas."},
    {q: "Reported Speech: 'I can’t come to the party' – Sara", o: ["Sara said she can’t come", "Sara said she couldn’t come", "Sara says she couldn’t come", "Sara said she can come"], a: "Sara said she couldn’t come", f: "Backshift: En estilo indirecto, 'can't' cambia a su forma en pasado 'couldn't'."},
    {q: "You ______ be quiet in the library", o: ["must", "can", "may", "could"], a: "must", f: "Modal: 'Must' expresa una obligación o norma necesaria en un lugar específico."},
    {q: "Choose the correct sentence", o: ["We was late yesterday", "We were late yesterday", "We are late yesterday", "We be late yesterday"], a: "We were late yesterday", f: "El pasado del verbo 'To Be' para el sujeto 'We' es 'were'."},
    {q: "The film ______ we watched was boring", o: ["who", "which", "where", "whose"], a: "which", f: "Relative Clause: 'Which' se utiliza para referirse a objetos o cosas (la película)."},
    {q: "I ______ to the gym last week", o: ["go", "went", "gone", "going"], a: "went", f: "Past Simple: 'Went' es el pasado irregular del verbo 'go'."},
    {q: "I promise I ______ call you tonight", o: ["am going", "will", "going to", "will going"], a: "will", f: "Future Simple: 'Will' se utiliza para hacer promesas espontáneas."},
    {q: "The book ______ by millions of people", o: ["read", "is read", "was readed", "reading"], a: "is read", f: "Passive Voice: Estructura de presente simple pasivo (am/is/are + participio)."},
    {q: "If they ______ more carefully, they ______ the mistake", o: ["checked / will see", "check / will see", "had checked / would have seen", "have checked / would see"], a: "had checked / would have seen", f: "Third Conditional: Hipótesis sobre el pasado (If + Past Perfect, would have + participio)."},
    {q: "______ you lend me some money?", o: ["Must", "Could", "Should", "Have"], a: "Could", f: "Petición educada: 'Could' es más formal y cortés que 'can'."},
    {q: "Superlative: 'beautiful'", o: ["beautifuller", "the most beautiful", "more beautiful", "beautifullest"], a: "the most beautiful", f: "Superlativo: Para adjetivos largos se antepone 'the most'."},
    {q: "He ______ working right now", o: ["is", "are", "am", "be"], a: "is", f: "Present Continuous: El auxiliar para la tercera persona del singular es 'is'."},
    {q: "Choose the correct sentence", o: ["I have wrote an email", "I have written an email", "I have write an email", "I written an email"], a: "I have written an email", f: "Present Perfect: Requiere el participio pasado del verbo escribir ('written')."},
    {q: "The woman, ______ husband is a teacher, is very friendly", o: ["who", "which", "whose", "where"], a: "whose", f: "Relative Clause: 'Whose' indica posesión (cuyo marido)."},
    {q: "Tag question: She is coming, ______?", o: ["isn’t she", "is she", "does she", "will she"], a: "isn’t she", f: "Tag Question: Si la oración es afirmativa, la coletilla debe ser negativa."},
    {q: "If he ______ now, he ______ catch the bus", o: ["leaves / will", "leave / will", "will leave / catch", "left / will"], a: "leaves / will", f: "First Conditional: Situación probable (If + Present Simple, will + infinitivo)."},
    {q: "Reported Speech: 'I saw that film yesterday' – Mario", o: ["Mario said he saw that film yesterday", "Mario said he had seen that film the day before", "Mario says he had seen that film", "Mario said he see that film"], a: "Mario said he had seen that film the day before", f: "Backshift: Past Simple cambia a Past Perfect y 'yesterday' a 'the day before'."},
    {q: "Choose the correct sentence", o: ["She must to finish her homework", "She must finish her homework", "She must finishes her homework", "She must finishing her homework"], a: "She must finish her homework", f: "Modales: Los verbos modales siempre van seguidos de infinitivo sin 'to'."},
    {q: "We ______ lunch at the moment", o: ["have", "are having", "had", "having"], a: "are having", f: "Present Continuous: Describe una acción que ocurre justo ahora."},
    {q: "You ______ turn off your phone during the exam", o: ["can", "must", "may", "could"], a: "must", f: "Obligación: 'Must' indica un requisito indispensable o prohibición si fuera negativo."},
    {q: "Passive: 'They will deliver the package'", o: ["The package will deliver", "The package will be delivered", "The package delivered", "The package is deliver"], a: "The package will be delivered", f: "Future Passive: Estructura 'will be + participio'."},
    {q: "Comparative: 'dangerous'", o: ["dangerouser", "more dangerous", "most dangerous", "dangerousest"], a: "more dangerous", f: "Comparativo: Adjetivos largos forman el comparativo con 'more'."},
    {q: "Choose the correct sentence", o: ["I didn’t ate breakfast", "I didn’t eat breakfast", "I not eat breakfast", "I didn’t eaten breakfast"], a: "I didn’t eat breakfast", f: "Pasado negativo: El auxiliar 'didn't' ya indica pasado, por lo que el verbo va en infinitivo."},
    {q: "The city ______ I was born is very big", o: ["who", "which", "where", "whose"], a: "where", f: "Relative Clause: 'Where' se utiliza para referirse a lugares."}
      ]
    }
];

const mappedQuestions = [];
let globalIndex = 1100; // start index higher so it doesn't conflict easily if someone didn't clear out

rawSections.forEach(section => {
  section.data.forEach((q, i) => {
    let opts = q.o.map((text, idx) => ({
      id: String.fromCharCode(97 + idx),
      text: text
    }));
    
    let correctOpt = opts.find(opt => q.a.includes(opt.text) || opt.text.includes(q.a));
    let correctId = correctOpt ? correctOpt.id : 'a'; // Use 'a' as fallback
    // Correct missing ones if fallback is weird:
    if(!correctOpt) {
      if(opts[0] && q.a === opts[0].text) correctId = 'a';
      if(opts[1] && q.a === opts[1].text) correctId = 'b';
      if(opts[2] && q.a === opts[2].text) correctId = 'c';
      if(opts[3] && q.a === opts[3].text) correctId = 'd';
    }
    
    mappedQuestions.push({
      id: "english-q" + String(globalIndex).padStart(3, '0'),
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

let existing = JSON.parse(fs.readFileSync('data/questions.json', 'utf8'));

// Delete existing english questions first
existing = existing.filter(q => q.subjectId !== 'english');

const combined = existing.concat(mappedQuestions);

fs.writeFileSync('data/questions.json', JSON.stringify(combined, null, 2));

console.log('Successfully replaced English questions. ' + mappedQuestions.length + ' new English questions added. Total questions: ' + combined.length);
