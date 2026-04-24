const fs = require('fs');

const rawSections = [
  {
    moduleId: 'emp-u1',
    data: [
    {q: "1. ¿Qué ha impulsado principalmente la evolución reciente de los procesos de selección?", o: ["Aumento empleo público", "Nuevas tecnologías y digitalización", "Reducción formación profesional", "Incremento trabajo manual"], a: "Nuevas tecnologías y digitalización", f: "La digitalización ha transformado la búsqueda y evaluación de talento."},
    {q: "2. ¿Qué caracteriza a los procesos virtuales de selección?", o: ["Solo entrevistas presenciales", "Gestión del ciclo mediante plataformas digitales", "Eliminación del currículum", "Solo llamadas"], a: "Gestión del ciclo mediante plataformas digitales", f: "Permiten una gestión remota y eficiente de las candidaturas."},
    {q: "3. ¿Qué es un ATS (Applicant Tracking System)?", o: ["Sistema de formación", "Programa de videollamadas", "Sistema de seguimiento y cribado automático", "Portal generalista"], a: "Sistema de seguimiento y cribado automático", f: "Es la herramienta estándar para procesar grandes volúmenes de CVs."},
    {q: "4. ¿Cuál es una función principal de los ATS?", o: ["Redactar cartas", "Filtrar currículums mediante palabras clave", "Entrevistas presenciales", "Contratar automáticamente"], a: "Filtrar currículums mediante palabras clave", f: "Identifican a los candidatos que mejor encajan con la descripción del puesto."},
    {q: "5. ¿Qué ventaja aportan los ATS en la primera fase?", o: ["Aumentan sesgo", "Reducen tiempo de revisión", "Eliminan reclutadores", "Sustituyen la entrevista"], a: "Reducen tiempo de revisión", f: "Agilizan drásticamente la criba inicial."},
    {q: "6. Limitación de los ATS:", o: ["No analizan formación", "Pueden descartar candidatos válidos por falta de palabras clave exactas", "Solo empresas pequeñas", "No filtran"], a: "Pueden descartar candidatos válidos por falta de palabras clave exactas", f: "Son algoritmos que dependen de términos específicos."},
    {q: "7. ¿Qué se recomienda antes de iniciar la búsqueda de empleo?", o: ["Enviar muchos CV sin personalizar", "Esperar contacto", "Realizar proceso de autoconocimiento", "Aceptar cualquier oferta"], a: "Realizar proceso de autoconocimiento", f: "Es el paso fundamental para saber qué valor aportas al mercado."},
    {q: "8. El análisis FODA personal sirve para...", o: ["Evaluar solo debilidades", "Conocer fortalezas, oportunidades, debilidades y amenazas", "Preparar entrevistas técnicas", "Redactar CV auto"], a: "Conocer fortalezas, oportunidades, debilidades y amenazas", f: "Es una herramienta de diagnóstico estratégico personal."},
    {q: "9. El networking es importante porque...", o: ["Evita entrevistas", "Permite cubrir vacantes a través de contactos", "Sustituye formación", "Elimina portales"], a: "Permite cubrir vacantes a través de contactos", f: "Gran parte del mercado laboral es 'oculto' y se mueve por referencias."},
    {q: "10. Red social profesional destacada:", o: ["Instagram", "TikTok", "LinkedIn", "Facebook"], a: "LinkedIn", f: "Es el portal líder para el networking y visibilidad profesional."},
    {q: "11. ¿Por qué personalizar el currículum?", o: ["Valoración de adecuación al puesto", "Evita portales", "Reduce candidaturas", "Sustituye carta"], a: "Valoración de adecuación al puesto", f: "Aumenta las probabilidades de superar la criba."},
    {q: "12. Aporte de la formación continua:", o: ["Reduce necesidad experiencia", "Mantiene actualizado al profesional", "Elimina competencia", "Evita entrevistas"], a: "Mantiene actualizado al profesional", f: "Es clave para la empleabilidad a largo plazo."},
    {q: "13. La flexibilidad laboral implica...", o: ["Rechazar cambios", "Solo trabajos estables", "Adaptarse a nuevos roles o contextos", "Trabajar siempre igual"], a: "Adaptarse a nuevos roles o contextos", f: "Es la capacidad de evolucionar con las necesidades de la empresa."},
    {q: "14. Entrevista con lista fija de preguntas:", o: ["No estructurada", "En grupo", "Estructurada", "Virtual"], a: "Estructurada", f: "Garantiza objetividad al preguntar lo mismo a todos."},
    {q: "15. La entrevista por competencias evalúa...", o: ["Teoría", "Liderazgo o trabajo en equipo", "Idiomas", "Informática básica"], a: "Liderazgo o trabajo en equipo", f: "Busca predecir el desempeño basado en comportamientos pasados."},
    {q: "16. Prueba que simula situaciones reales:", o: ["Psicométrica", "Idiomas", "Simulación o role-playing", "Teórica"], a: "Simulación o role-playing", f: "Evalúa cómo reaccionas ante problemas reales del puesto."},
    {q: "17. Principio del sector público:", o: ["Rapidez", "Igualdad, mérito y capacidad", "Experiencia obligatoria", "Informal"], a: "Igualdad, mérito y capacidad", f: "Son los pilares de la selección en la administración pública."},
    {q: "18. ¿Qué es la marca personal?", o: ["Logotipo", "Impresión que los demás tienen de ti profesionalmente", "Perfil sin contenido", "CV estándar"], a: "Impresión que los demás tienen de ti profesionalmente", f: "Es tu reputación y valor en el mercado."},
    {q: "19. Definición de marca personal (Jeff Bezos):", o: ["CV actualizado", "Experiencia", "Lo que dicen de ti cuando no estás presente", "Imagen en redes"], a: "Lo que dicen de ti cuando no estás presente", f: "Es el rastro que dejas en los demás."},
    {q: "20. La autoorientación profesional es...", o: ["Esperar", "Gestionar autónomamente la propia carrera", "Cambiar siempre", "Depender de otros"], a: "Gestionar autónomamente la propia carrera", f: "Tomar las riendas del desarrollo laboral propio."}
    ]
  },
  {
    moduleId: 'emp-u2',
    data: [
    {q: "21. Trabajo centrado en tareas del día a día:", o: ["Creativo", "Colaborativo", "Operativo", "Liderazgo"], a: "Operativo", f: "Son las tareas rutinarias necesarias para el funcionamiento."},
    {q: "22. Trabajo orientado a la innovación:", o: ["Operativo", "Creativo", "Colaborativo", "Funcional"], a: "Creativo", f: "Se enfoca en generar valor mediante nuevas ideas."},
    {q: "23. Reunión para revisar el progreso:", o: ["Brainstorming", "Planificación", "Seguimiento", "Retroalimentación"], a: "Seguimiento", f: "Sirven para monitorizar el estado de los proyectos."},
    {q: "24. Reunión para generar soluciones:", o: ["Resolución de problemas", "Seguimiento", "Planificación", "Brainstorming"], a: "Brainstorming", f: "Su fin es la generación masiva de ideas."},
    {q: "25. Grupo temporal para un proyecto:", o: ["Funcional", "Interdisciplinar", "Equipo de proyecto", "Mejora continua"], a: "Equipo de proyecto", f: "Se disuelven al alcanzar el objetivo específico."},
    {q: "26. Característica de grupos interdisciplinares:", o: ["Mismo departamento", "Mejora continua", "Miembros de diferentes áreas", "Permanentes"], a: "Miembros de diferentes áreas", f: "Combinan diferentes visiones para resolver problemas complejos."},
    {q: "27. Prioridad en la gestión del conflicto:", o: ["Centrar en personas", "Evitar comunicación", "Enfocarse en el problema", "Imponer opinión"], a: "Enfocarse en el problema", f: "Desvincular el error del individuo ayuda a la resolución."},
    {q: "28. Método de acuerdo común:", o: ["Mayoría", "Autoritaria", "Consenso", "Intuición"], a: "Consenso", f: "Busca el compromiso de todos los miembros del equipo."},
    {q: "29. Decisión basada en información objetiva:", o: ["Autoritaria", "Consenso", "Mayoría", "Basada en datos"], a: "Basada en datos", f: "Utiliza el análisis de hechos reales para decidir."},
    {q: "30. Regla Mehrabian (mayor peso):", o: ["Palabras", "Tono", "Lenguaje corporal", "Escrito"], a: "Lenguaje corporal", f: "Representa la mayor parte del impacto en la comunicación emocional."},
    {q: "31. Asertividad es...", o: ["Agresividad", "Claridad y respeto", "Evitar expresar", "Imponer"], a: "Claridad y respeto", f: "Es el equilibrio entre la pasividad y la agresividad."},
    {q: "32. Técnica para reducir conflictos:", o: ["Persuasiva", "Comunicación No Violenta (CNV)", "Informal", "Jerárquica"], a: "Comunicación No Violenta (CNV)", f: "Se basa en observaciones, sentimientos, necesidades y peticiones."},
    {q: "33. Objetivo de elevator pitch:", o: ["CV detallado", "Llamar atención y transmitir valor en poco tiempo", "Sustituir entrevista", "Toda la trayectoria"], a: "Llamar atención y transmitir valor en poco tiempo", f: "Es una presentación concisa y poderosa."},
    {q: "34. Estructura del elevator pitch incluye:", o: ["DAFO", "Introducción personal", "Referencias", "Certificados"], a: "Introducción personal", f: "Es el inicio necesario para situar al interlocutor."},
    {q: "35. Herramienta de intervalos de 25 min:", o: ["Eisenhower", "Gantt", "Pomodoro", "Kanban"], a: "Pomodoro", f: "Optimiza la concentración dividiendo el tiempo en bloques."},
    {q: "36. Técnica para urgencia e importancia:", o: ["Gantt", "PERT", "Matriz de Eisenhower", "Pomodoro"], a: "Matriz de Eisenhower", f: "Clasifica las tareas en 4 cuadrantes estratégicos."},
    {q: "37. Visualizar tareas con barras temporales:", o: ["Kanban", "Trello", "Diagrama de Gantt", "Eisenhower"], a: "Diagrama de Gantt", f: "Muestra la duración y solapamiento de tareas."},
    {q: "38. Herramienta para comprender emociones:", o: ["Calendario", "Rueda de las emociones", "ABC", "Eisenhower"], a: "Rueda de las emociones", f: "Facilita la identificación de sentimientos complejos."},
    {q: "39. Metodología de tarjetas visuales:", o: ["PERT", "Kanban", "Gantt", "Pomodoro"], a: "Kanban", f: "Gestiona el flujo de trabajo visualmente (To Do, Doing, Done)."},
    {q: "40. Letra B en Técnica ABC:", o: ["Acontecimiento", "Creencias o interpretaciones", "Consecuencias", "Solución"], a: "Creencias o interpretaciones", f: "B (Beliefs) representa cómo procesamos el evento."}
    ]
  },
  {
    moduleId: 'emp-u3',
    data: [
    {q: "41. ¿Qué es la innovación?", o: ["Copia", "Nuevas ideas que generan valor", "Solo tecnología", "Reducción costes"], a: "Nuevas ideas que generan valor", f: "La innovación requiere implementación y utilidad."},
    {q: "42. Revolución que introdujo la producción en cadena:", o: ["Digital", "Era Innovación", "Segunda Revolución Industrial", "Industrial inicial"], a: "Segunda Revolución Industrial", f: "Fue el hito de la producción masiva y el fordismo."},
    {q: "43. Tecnología de la era actual:", o: ["Telégrafo", "Vapor", "Inteligencia artificial", "Artesanal"], a: "Inteligencia artificial", f: "Es el motor de la actual Revolución Digital."},
    {q: "44. Impacto de la automatización:", o: ["Más manual", "Menos eficiencia", "Mejora eficiencia y reduce costes", "Sin innovación"], a: "Mejora eficiencia y reduce costes", f: "Optimiza procesos y recursos."},
    {q: "45. Papel clave de los jóvenes:", o: ["Más dinero", "Rechazo tecnología", "Creatividad y mentalidad emprendedora", "Evitan equipo"], a: "Creatividad y mentalidad emprendedora", f: "Aportan nuevas perspectivas y adaptabilidad."},
    {q: "46. Evento de colaboración juvenil:", o: ["Auditoría", "Hackatones", "Juntas", "Inspecciones"], a: "Hackatones", f: "Fomentan la resolución creativa de retos en tiempo récord."},
    {q: "47. En Scrum, ¿quién prioriza el backlog?", o: ["Scrum Master", "Equipo", "Product Owner", "Cliente"], a: "Product Owner", f: "Representa los intereses del negocio y el valor del producto."},
    {q: "48. ¿Qué es un sprint?", o: ["Informe", "Iteración corta de trabajo", "Reunión mensual", "Control"], a: "Iteración corta de trabajo", f: "Ciclo de desarrollo (usualmente de 1 a 4 semanas)."},
    {q: "49. Tareas seleccionadas para un sprint:", o: ["Product Backlog", "Incremento", "Sprint Backlog", "Roadmap"], a: "Sprint Backlog", f: "Contiene los ítems a realizar en el ciclo actual."},
    {q: "50. Metodología contra desperdicios:", o: ["Scrum", "Lean", "Design Thinking", "Kanban"], a: "Lean", f: "Su filosofía es maximizar valor eliminando lo innecesario."},
    {q: "51. ¿Qué es un MVP?", o: ["Final", "Prototipo completo", "Versión mínima viable para feedback", "Plan"], a: "Versión mínima viable para feedback", f: "Permite aprender de los usuarios con el menor esfuerzo."},
    {q: "52. ¿Qué es pivotar?", o: ["Abandonar", "Cambiar estrategia según aprendizaje", "Mantener siempre", "Aumentar costes"], a: "Cambiar estrategia según aprendizaje", f: "Reorientar el modelo de negocio tras validar hipótesis."},
    {q: "53. Habilidad para recuperarse de fracasos:", o: ["Creatividad", "Resiliencia", "Autonomía", "Liderazgo"], a: "Resiliencia", f: "Es vital para el éxito del emprendedor."},
    {q: "54. Pensamiento divergente asociado a:", o: ["Resiliencia", "Creatividad", "Tiempo", "Productividad"], a: "Creatividad", f: "Busca múltiples soluciones a un mismo problema."},
    {q: "55. Iniciativa y autonomía implica:", o: ["Esperar", "Proactividad y toma de decisiones", "Delegar siempre", "Evitar"], a: "Proactividad y toma de decisiones", f: "No esperar a que otros te digan qué hacer."},
    {q: "56. Ventaja trabajo colaborativo:", o: ["Menos ideas", "Aumenta sinergia", "Menos calidad", "Sin feedback"], a: "Aumenta sinergia", f: "El resultado del grupo es mayor que la suma de las partes."},
    {q: "57. Técnica para empatizar con el usuario:", o: ["Brainstorming", "Design Thinking", "Mapa mental", "Seis sombreros"], a: "Design Thinking", f: "Es una metodología centrada en el ser humano."},
    {q: "58. ¿Qué busca la transformación digital?", o: ["Sustituir", "Mantener", "Mejorar procesos y modelos con tecnologías digitales", "Reducir"], a: "Mejorar procesos y modelos con tecnologías digitales", f: "No es solo usar PCs, es cambiar la lógica del negocio."},
    {q: "59. ODS en Agenda 2030:", o: ["10", "12", "15", "17"], a: "17", f: "Son los 17 objetivos globales de la ONU."},
    {q: "60. Economía circular persigue:", o: ["Consumo", "Residuos", "Reutilizar, reciclar y reducir impacto", "Coste sin medio ambiente"], a: "Reutilizar, reciclar y reducir impacto", f: "Cierra el ciclo de vida de los materiales."}
    ]
  },
  {
    moduleId: 'emp-u4',
    data: [
    {q: "61. ¿Qué es el público objetivo?", o: ["Competidores", "Grupo al que se dirige el producto", "Proveedores", "Habitantes"], a: "Grupo al que se dirige el producto", f: "Es el segmento de mercado al que quieres captar."},
    {q: "62. Característica demográfica:", o: ["Estilo de vida", "Edad", "Actitud", "Motivaciones"], a: "Edad", f: "Variables estadísticas como edad, sexo o ingresos."},
    {q: "63. Segmentación de mercado:", o: ["Mismo a todos", "Dividir mercado en grupos homogéneos", "Reducir", "Eliminar"], a: "Dividir mercado en grupos homogéneos", f: "Permite enfocar mejor las estrategias."},
    {q: "64. Segmentación por valores e intereses:", o: ["Geográfica", "Conductual", "Psicográfica", "Demográfica"], a: "Psicográfica", f: "Se basa en la personalidad y estilo de vida."},
    {q: "65. Buyer persona es...", o: ["Real concreto", "Perfil semi-ficticio del cliente ideal", "Informe", "Segmentación"], a: "Perfil semi-ficticio del cliente ideal", f: "Representación humanizada del público objetivo."},
    {q: "66. Rol que toma decisión final:", o: ["Usuario", "Influenciador", "Decisor", "Comprador"], a: "Decisor", f: "Es quien tiene la autoridad para aprobar la compra."},
    {q: "67. Mapa de empatía sirve para...", o: ["Costes", "Comprender necesidades y emociones del cliente", "Ingresos", "Organigrama"], a: "Comprender necesidades y emociones del cliente", f: "Explora lo que el cliente ve, oye, piensa y siente."},
    {q: "68. Componente del mapa de empatía:", o: ["Ingresos", "Qué piensan y sienten", "Canales", "Costes"], a: "Qué piensan y sienten", f: "Foco en el mundo interior del usuario."},
    {q: "69. Mapa de propuesta de valor busca...", o: ["Alinear productos con necesidades", "Precios", "Contabilidad", "Equipo"], a: "Alinear productos con necesidades", f: "Busca el encaje entre producto y mercado."},
    {q: "70. No es elemento del Canvas:", o: ["Clientes", "Propuesta valor", "Costes", "Plan de estudios"], a: "Plan de estudios", f: "El Canvas tiene 9 bloques puramente de negocio."},
    {q: "71. Freemium se caracteriza por...", o: ["Cobrar siempre", "Servicio básico gratis y funciones premium de pago", "Solo suscripción", "Sin ingresos"], a: "Servicio básico gratis y funciones premium de pago", f: "Combina lo gratuito (Free) con lo premium."},
    {q: "72. Tarifa periódica por acceso:", o: ["Plataforma", "Suscripción", "Freemium", "Venta directa"], a: "Suscripción", f: "Modelo basado en la recurrencia."},
    {q: "73. Modelo de plataforma:", o: ["Físicos", "Conectar diferentes grupos de usuarios", "Servicios personal", "Sin intermediarios"], a: "Conectar diferentes grupos de usuarios", f: "Actúa como intermediario (ej: Uber, Airbnb)."},
    {q: "74. Triple Bottom Line evalúa eco, social y...", o: ["Tecno", "Ambiental", "Legal", "Comercial"], a: "Ambiental", f: "Mide el éxito en tres dimensiones de sostenibilidad."},
    {q: "75. RSC se refiere a...", o: ["Mínimo legal", "Integrar prácticas responsables con sociedad y ambiente", "Máximo beneficio", "Externo"], a: "Integrar prácticas responsables con sociedad y ambiente", f: "Compromiso voluntario más allá de la ley."},
    {q: "76. Equidad vs Igualdad:", o: ["Todo mismo", "Tiene en cuenta necesidades específicas", "Solo empresas", "Económico"], a: "Tiene en cuenta necesidades específicas", f: "Busca la justicia basándose en el contexto individual."},
    {q: "77. Etapa ciclo vida con reciclaje:", o: ["Producción", "Distribución", "Uso", "Fin de vida"], a: "Fin de vida", f: "Es donde se gestiona el residuo o reutilización."},
    {q: "78. CX se refiere a...", o: ["App", "Percepción global del cliente sobre la empresa", "Compra concreta", "Usabilidad"], a: "Percepción global del cliente sobre la empresa", f: "Abarca todos los puntos de contacto."},
    {q: "79. Customer Journey describe...", o: ["Interfaces", "Recorrido del cliente desde contacto hasta postventa", "Precios", "Interna"], a: "Recorrido del cliente desde contacto hasta postventa", f: "Mapea las fases del cliente con la marca."},
    {q: "80. Objetivo prototipado:", o: ["Venta", "Validar ideas y recoger feedback antes de lanzar", "Marketing", "Precios"], a: "Validar ideas y recoger feedback antes de lanzar", f: "Permite fallar rápido y barato."}
    ]
  },
  {
    moduleId: 'emp-u5',
    data: [
    {q: "81. Diferencia emprendimiento vs innovación social:", o: ["Tecno vs Social", "Ninguna", "Económico vs Impacto social/ambiental", "Solo beneficio"], a: "Económico vs Impacto social/ambiental", f: "El fin último de la innovación social es el bienestar colectivo."},
    {q: "82. Similitud entre ambos:", o: ["Creatividad e innovación", "Evitan sosten", "Subvenciones", "Beneficio"], a: "Creatividad e innovación", f: "Ambos buscan resolver problemas de forma nueva."},
    {q: "83. Liderazgo ético es...", o: ["Rapidez", "Delegar", "Solo eco", "Integridad, transparencia y responsabilidad"], a: "Integridad, transparencia y responsabilidad", f: "Se basa en valores morales sólidos."},
    {q: "84. Liderazgo sostenible se centra en...", o: ["Corto plazo", "Integrar sostenibilidad en la estrategia", "Sin innovar", "Salarios"], a: "Integrar sostenibilidad en la estrategia", f: "Busca la viabilidad a largo plazo de la organización y el entorno."},
    {q: "85. Práctica ética y sostenible:", o: ["Rentabilidad solo", "Evitar valores", "Invertir en prácticas sostenibles y RSC", "Ocultar"], a: "Invertir en prácticas sostenibles y RSC", f: "Compromiso con los grupos de interés."},
    {q: "86. ¿Qué son los KETs?", o: ["Tecnologías avanzadas transformadoras", "Marketing", "Administrativa", "Legales"], a: "Tecnologías avanzadas transformadoras", f: "Key Enabling Technologies: IA, Nanotecnología, etc."},
    {q: "87. Impacto de los KETs:", o: ["Menos eficientes", "Automatización y mayor eficiencia operativa", "Sin innovar", "Errores"], a: "Automatización y mayor eficiencia operativa", f: "Optimizan la capacidad de producción y servicio."},
    {q: "88. Ejemplo de KET:", o: ["Fax", "Telégrafo", "Máquina", "Inteligencia artificial"], a: "Inteligencia artificial", f: "Es una tecnología clave transversal."},
    {q: "89. Pensamiento de diseño es...", o: ["Rígido", "Exclusivo graf", "Centrado en el usuario y experimentación", "Teórico"], a: "Centrado en el usuario y experimentación", f: "Metodología ágil y empática."},
    {q: "90. Primera etapa Design Thinking:", o: ["Empatía", "Prototipado", "Pruebas", "Ideación"], a: "Empatía", f: "Entender profundamente al usuario primero."},
    {q: "91. Fase de definición del problema:", o: ["Ideas sin límite", "Probar", "Final", "Sintetizar información para concretar"], a: "Sintetizar información para concretar", f: "Acotar el reto a resolver."},
    {q: "92. ¿Para qué sirve prototipar?", o: ["Sustituir", "Crear versiones tangibles para evaluar", "Venta directa", "Plan"], a: "Crear versiones tangibles para evaluar", f: "Materializar la idea para testarla."},
    {q: "93. EBT es...", o: ["ONG", "Cooperativa", "Tradicional", "Empresa basada en tecnología e I+D"], a: "Empresa basada en tecnología e I+D", f: "Empresa de Base Tecnológica."},
    {q: "94. Ventaja de EBTs:", o: ["Sin inversión", "Solo universidad", "Escalar rápido", "Sin cualificación"], a: "Escalar rápido", f: "Tienen un alto potencial de crecimiento exponencial."},
    {q: "95. ¿Qué son los ODS?", o: ["Locales", "Marketing", "Internas", "Objetivos globales Agenda 2030"], a: "Objetivos globales Agenda 2030", f: "Metas mundiales para un futuro mejor."},
    {q: "96. Integrar ODS implica...", o: ["Reducir", "Alinear estrategia con objetivos sociales/ambientales", "Ignorar renta", "Sustituir"], a: "Alinear estrategia con objetivos sociales/ambientales", f: "Hacer del ODS parte del propósito de la empresa."},
    {q: "97. Canvas adaptado a sosteniblidad:", o: ["Gantt", "DAFO", "Social", "Sustainable Business Model Canvas"], a: "Sustainable Business Model Canvas", f: "Versión que añade impacto ambiental y social."},
    {q: "98. Canvas de Impacto Social sirve para...", o: ["RRHH", "Planificar y medir el impacto social", "Económico", "Anuncios"], a: "Planificar y medir el impacto social", f: "Mide el cambio positivo generado."},
    {q: "99. Un estudio de viabilidad analiza:", o: ["Costes solo", "Competencia solo", "Impacto solo", "Factibilidad técnica, económica y de mercado"], a: "Factibilidad técnica, económica y de mercado", f: "Evalúa si el proyecto es realizable y rentable."},
    {q: "100. Criterios ESG son:", o: ["Calidad", "Gestión", "Financiero", "Ambientales, Sociales y de Gobernanza"], a: "Ambientales, Sociales y de Gobernanza", f: "Factores para medir el impacto ético y sostenible (Environmental, Social, Governance)."}
    ]
  }
];

const mappedQuestions = [];
let globalIndex = 597; // Continuación del índice global de preguntas

rawSections.forEach(section => {
  section.data.forEach((q, i) => {
    let opts = q.o.map((text, idx) => ({
      id: String.fromCharCode(97 + idx),
      text: text
    }));
    
    let correctOpt = opts.find(opt => q.a.includes(opt.text) || opt.text.includes(q.a));
    let correctId = correctOpt ? correctOpt.id : 'a';
    
    mappedQuestions.push({
      id: "emp-q" + String(globalIndex).padStart(3, '0'),
      subjectId: 'employability',
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

const existing = JSON.parse(fs.readFileSync('data/questions.json', 'utf8'));
const combined = existing.concat(mappedQuestions);

fs.writeFileSync('data/questions.json', JSON.stringify(combined, null, 2));

console.log('Successfully added ' + mappedQuestions.length + ' Employability questions. Total: ' + combined.length);
