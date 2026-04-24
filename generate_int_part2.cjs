const fs = require('fs');

const rawSections = [
  {
    moduleId: 'int-u6',
    data: [
    {q: "1. En Java Swing, ¿qué componente usarías para permitir al usuario escribir una sola línea de texto como su nombre?", o: ["JTextArea", "JLabel", "JTextField", "JPasswordField"], a: "JTextField", f: "JTextField es el componente estándar para entradas de texto de una sola línea."},
    {q: "2. ¿Qué tipo de componente usarías para permitir elegir solo una opción entre 'Masculino' y 'Femenino'?", o: ["JCheckBox", "JRadioButton", "JComboBox", "JButton"], a: "JRadioButton", f: "Los JRadioButton se agrupan para permitir una única selección exclusiva entre varias opciones."},
    {q: "3. En una pantalla de login, ¿qué componente es más adecuado para la contraseña?", o: ["JTextField", "JTextArea", "JLabel", "JPasswordField"], a: "JPasswordField", f: "JPasswordField oculta los caracteres introducidos por motivos de seguridad."},
    {q: "4. Dado el código 'btnGuardar.addActionListener(e -> salvarDatos());', ¿qué interfaz implementa la lambda?", o: ["MouseListener", "ActionListener", "KeyListener", "WindowListener"], a: "ActionListener", f: "Los botones generan ActionEvents que son capturados por la interfaz ActionListener."},
    {q: "5. En una interfaz gráfica, un 'formulario' se corresponde normalmente con:", o: ["Un layout manager", "Una ventana o contenedor principal", "Un único botón", "Una barra de menú"], a: "Una ventana o contenedor principal", f: "Un formulario es el contenedor (JFrame o JDialog) que organiza los controles de entrada."},
    {q: "6. ¿Qué tipo de listener usarías para reaccionar cuando el usuario cierra una ventana?", o: ["ActionListener", "FocusListener", "WindowListener", "MouseListener"], a: "WindowListener", f: "WindowListener gestiona eventos de ventana como abrir, cerrar, minimizar o activar."},
    {q: "7. ¿Cuál es el evento que dispara focusGained en un FocusListener?", o: ["Cuando se pulsa un botón", "Cuando el componente se pinta", "Cuando el componente gana el foco de entrada", "Cuando se cierra la ventana"], a: "Cuando el componente gana el foco de entrada", f: "focusGained se ejecuta cuando el cursor o la selección entra en el componente."},
    {q: "8. ¿Qué tipo de interfaz de usuario requiere escribir comandos en un intérprete de órdenes?", o: ["Gráfica", "Táctil", "Vocal", "Textual"], a: "Textual", f: "Las interfaces textuales (CLI) se basan en la introducción de comandos de texto."},
    {q: "9. ¿Qué tipo de interfaz es más habitual en sistemas de escritorio actuales?", o: ["Táctil", "Gráfica", "De línea de comandos", "De realidad virtual"], a: "Gráfica", f: "La interfaz gráfica (GUI) utiliza elementos visuales como iconos y ventanas."},
    {q: "10. En una interfaz táctil, la interacción principal se realiza:", o: ["Con ratón exclusivamente", "Con comandos de voz", "Con teclado únicamente", "Con pantalla táctil y gestos"], a: "Con pantalla táctil y gestos", f: "La interacción es directa mediante el contacto físico con el panel."},
    {q: "11. En una interfaz gráfica, los 'controles' también se conocen como:", o: ["Hilos", "Sockets", "Componentes", "Eventos"], a: "Componentes", f: "Los componentes son los bloques visuales reutilizables (botones, etiquetas, etc.)."},
    {q: "12. ¿Cuál de los siguientes se usa para mostrar un texto fijo, no interactivo?", o: ["JTextField", "JButton", "JLabel", "JCheckBox"], a: "JLabel", f: "JLabel muestra texto o imágenes que el usuario no puede editar."},
    {q: "13. En Swing, ¿qué componente permite mostrar varias líneas de texto editable?", o: ["JTextArea", "JLabel", "JTextField", "JRadioButton"], a: "JTextArea", f: "JTextArea está diseñado para bloques de texto largos y multilínea."},
    {q: "14. ¿Qué componente es más adecuado para seleccionar varias opciones independientes?", o: ["JRadioButton", "JCheckBox", "JLabel", "JButton"], a: "JCheckBox", f: "JCheckBox permite selecciones múltiples no excluyentes."},
    {q: "15. ¿Qué listener se emplearía para captar un clic de ratón sobre un panel?", o: ["KeyListener", "WindowListener", "MouseListener", "ActionListener"], a: "MouseListener", f: "MouseListener detecta clics, entradas, salidas y presiones del ratón."},
    {q: "16. En 'JComboBox cmb = new JComboBox<>(...);', ¿qué tipo de componente es cmb?", o: ["Lista desplegable", "Área de texto", "Botón con icono", "Etiqueta"], a: "Lista desplegable", f: "JComboBox presenta una lista de opciones que se despliega al hacer clic."},
    {q: "17. Para reaccionar a la selección de un elemento en una JComboBox, se usa:", o: ["WindowListener", "ActionListener", "FocusListener", "KeyListener"], a: "ActionListener", f: "Al seleccionar un item, JComboBox dispara un ActionEvent."},
    {q: "18. ¿Qué componente permite mostrar una lista donde se pueden seleccionar varios a la vez?", o: ["JComboBox", "JList", "JButton", "JLabel"], a: "JList", f: "JList permite selecciones simples o múltiples de una lista estática."},
    {q: "19. ¿Qué propiedad se relaciona con que el usuario aprenda a usar la app fácilmente?", o: ["Persistencia", "Introspección", "Usabilidad", "Serialización"], a: "Usabilidad", f: "La usabilidad mide la facilidad de uso, aprendizaje y satisfacción."},
    {q: "20. En Swing, para crear una ventana principal tradicional, se usa:", o: ["JDialog", "JFrame", "JPanel", "JApplet"], a: "JFrame", f: "JFrame es el contenedor principal para aplicaciones de escritorio con barra de título y bordes."},
    {q: "21. ¿Cuál de estos listeners captura pulsaciones de teclado?", o: ["MouseListener", "WindowListener", "FocusListener", "KeyListener"], a: "KeyListener", f: "KeyListener escucha eventos de teclas presionadas, soltadas o tipeadas."},
    {q: "22. Para mostrar la foto de perfil de un cliente, usarías:", o: ["JLabel con Icon", "JTextArea", "JButton", "JComboBox"], a: "JLabel con Icon", f: "JLabel puede contener objetos de tipo Icon/ImageIcon para mostrar imágenes."},
    {q: "23. ¿Qué patrón se sigue cuando un componente genera eventos y un listener los recibe?", o: ["Modelo-Visor", "Productor-Consumidor", "Observer (observador)", "Singleton"], a: "Observer (observador)", f: "Es el patrón base de la gestión de eventos en Java (Sujeto - Observador)."},
    {q: "24. ¿Qué componente usarías como contenedor genérico para organizar otros controles?", o: ["JPanel", "JMenuItem", "JList", "JTextArea"], a: "JPanel", f: "JPanel es el contenedor intermedio más versátil de Swing."},
    {q: "25. ¿Qué listener reacciona cuando el usuario entra y sale de un campo de texto?", o: ["FocusListener", "MouseListener", "WindowListener", "ActionListener"], a: "FocusListener", f: "FocusListener maneja focusGained y focusLost."},
    {q: "26. El conjunto de ventanas, controles y menús que ve el usuario es la:", o: ["Backend", "Interfaz de usuario", "ORM", "Framework"], a: "Interfaz de usuario", f: "La UI es el punto de contacto entre el humano y la máquina."},
    {q: "27. En Swing, ¿qué componente se usa típicamente para mostrar una barra de progreso?", o: ["JSlider", "JProgressBar", "JSpinner", "JTextArea"], a: "JProgressBar", f: "Muestra visualmente el porcentaje de avance de una tarea."},
    {q: "28. Interfaz habitual en cajeros automáticos modernos:", o: ["Textual", "Gráfica", "Táctil", "Por voz"], a: "Táctil", f: "La pantalla táctil facilita la entrada de datos rápida sin periféricos externos."},
    {q: "29. ¿Qué se necesita para que un objeto 'escuche' un botón?", o: ["Implementar Runnable", "Implementar ActionListener", "Implementar Comparable", "Implementar Serializable"], a: "Implementar ActionListener", f: "El objeto debe cumplir el contrato de la interfaz ActionListener."},
    {q: "30. ¿Cuál de estas afirmaciones sobre interfaces gráficas es correcta?", o: ["Solo código", "No generan eventos", "Están formadas por formularios y controles", "No permiten interacción"], a: "Están formadas por formularios y controles", f: "Es la estructura básica de composición de una GUI."}
    ]
  },
  {
    moduleId: 'int-u7',
    data: [
    {q: "31. ¿Cuál es la definición de usabilidad?", o: ["Cantidad de código", "Facilidad para alcanzar objetivos concretos", "Número de colores", "Rendimiento hardware"], a: "Facilidad para alcanzar objetivos concretos", f: "Define la calidad de la experiencia del usuario."},
    {q: "32. ¿Qué concepto permite que personas con discapacidades accedan al software?", o: ["Usabilidad", "Accesibilidad", "Eficiencia", "Utilidad"], a: "Accesibilidad", f: "La accesibilidad busca eliminar barreras de acceso."},
    {q: "33. Una interfaz útil se caracteriza por:", o: ["Efectos visuales", "Cumplir tareas para las que se diseñó", "Pocos botones", "Animaciones"], a: "Cumplir tareas para las que se diseñó", f: "La utilidad se mide por la capacidad de resolver el problema del usuario."},
    {q: "34. La retroalimentación en una interfaz se refiere a:", o: ["Ocultar errores", "Muchos textos", "Información sobre acciones del usuario", "Reducir pantallas"], a: "Información sobre acciones del usuario", f: "Permite que el usuario sepa que su acción fue recibida (ej: barra de carga o cambio de color)."},
    {q: "35. ¿Cuál de estos NO es uno de los atributos de usabilidad?", o: ["Aprendizaje", "Eficiencia", "Portabilidad", "Satisfacción"], a: "Portabilidad", f: "La portabilidad es un atributo de calidad de software, no específicamente de usabilidad de interfaz."},
    {q: "36. ¿Qué mide la efectividad en usabilidad?", o: ["Tiempo de carga", "Plenitud con la que se alcanza un objetivo", "Consumo memoria", "Usuarios simultáneos"], a: "Plenitud con la que se alcanza un objetivo", f: "Mide si el usuario logra terminar la tarea con éxito."},
    {q: "37. El objetivo de economizar elementos en el diseño es:", o: ["Más iconos", "Evitar la sobrecarga visual", "Reducir ventana", "Normas ISO"], a: "Evitar la sobrecarga visual", f: "Menos es más: evita distraer al usuario de lo importante."},
    {q: "38. Según ISO 9241, la usabilidad se relaciona con:", o: ["Líneas de código", "Eficacia y satisfacción en contexto de uso", "Precio licencia", "Compatibilidad SO"], a: "Eficacia y satisfacción en contexto de uso", f: "Es la definición normativa internacional."},
    {q: "39. ¿Qué ventaja aporta mejorar la usabilidad en banca online?", o: ["Menor velocidad", "Aumento de nuevos clientes", "Menor seguridad", "Eliminar atención al cliente"], a: "Aumento", f: "Una mejor interfaz atrae y retiene a los usuarios."},
    {q: "40. Una ventaja de la usabilidad para la organización es:", o: ["Más base de datos", "Reducir costes de diseño y mantenimiento", "Eliminar pruebas", "Más características"], a: "Reducir", f: "Prevenir errores de diseño ahorra dinero a largo plazo."},
    {q: "41. ¿Qué principio busca que operaciones similares se activen igual?", o: ["Familiaridad", "Consistencia", "Legibilidad", "Recuperabilidad"], a: "Consistencia", f: "La consistencia permite que el usuario prediga el comportamiento de la app."},
    {q: "42. La 'mínima sorpresa' implica que:", o: ["Comportamiento aleatorio", "Evitar situaciones inesperadas", "Ocultar errores", "Cambiar temas"], a: "Evitar situaciones inesperadas", f: "La app debe comportarse como el usuario espera."},
    {q: "43. Recomendación en el uso del color:", o: ["Máximos posibles", "Limitar a 4-5 por ventana y 7 total", "Evitar estados", "Fondo oscuro"], a: "Limitar a 4-5 por ventana y 7", f: "Evita la fatiga visual y mantiene la armonía."},
    {q: "44. Técnica de evaluación frente a reglas de diseño conocidas:", o: ["Pruebas A/B", "Evaluación heurística", "Caminata cognitiva", "Encuestas"], a: "Evaluación heurística", f: "Expertos revisan la interfaz basándose en principios (heurísticas)."},
    {q: "45. ¿Cuántos usuarios bastan para detectar problemas de usabilidad?", o: ["1-2", "3-4", "5-10", "Más de 50"], a: "5-10", f: "Según Jakob Nielsen, con 5 usuarios se detecta el 85% de los problemas de usabilidad."}
    ]
  }
];

const mappedQuestions = [];
let globalIndex = 271;

rawSections.forEach(section => {
  section.data.forEach((q, i) => {
    let opts = q.o.map((text, idx) => ({
      id: String.fromCharCode(97 + idx),
      text: text
    }));
    
    let correctOpt = opts.find(opt => q.a.includes(opt.text) || opt.text.includes(q.a));
    let correctId = correctOpt ? correctOpt.id : 'a'; // default to a if not matched perfectly
    
    mappedQuestions.push({
      id: "int-q" + String(globalIndex).padStart(3, '0'),
      subjectId: 'interfaces',
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

console.log('Successfully added ' + mappedQuestions.length + ' interface questions part 2. Total: ' + combined.length);
