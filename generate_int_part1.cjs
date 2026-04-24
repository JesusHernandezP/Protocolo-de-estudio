const fs = require('fs');

const rawSections = [
  {
    moduleId: 'int-u1',
    data: [
    {q: "¿Cuál es el objetivo principal de una interfaz de usuario?", o: ["Facilitar la interacción eficaz y comprensible entre usuario y sistema", "Aumentar el tamaño del código fuente", "Sustituir la lógica de negocio", "Reducir elementos gráficos"], a: "Facilitar la interacción eficaz y comprensible entre usuario y sistema", f: "La interfaz es el medio por el cual el usuario interactúa con la lógica del sistema de forma eficiente."},
    {q: "En interfaces, el término 'prototipo de baja fidelidad' se refiere a:", o: ["Maqueta interactiva funcional", "Código definitivo", "Boceto simple que representa la estructura general", "Diagrama UML de clases"], a: "Boceto simple que representa la estructura general", f: "Son representaciones esquemáticas (wireframes) que sirven para validar la estructura antes de programar."},
    {q: "Ventaja de separar la lógica de presentación de la de negocio:", o: ["Programar todo en un solo archivo", "Evolucionar la interfaz sin afectar la lógica interna", "Imposibilitar pruebas unitarias", "Hacer el código menos reutilizable"], a: "Evolucionar la interfaz sin afectar la lógica interna", f: "Esta separación (como en el patrón MVC) facilita el mantenimiento y la escalabilidad."},
    {q: "¿Qué principio se respeta al validar que los campos de usuario y clave no estén vacíos?", o: ["Layouts responsivos", "Compatibilidad de SO", "Localización de textos", "Prevención de errores y validación de datos"], a: "Prevención de errores y validación de datos", f: "Validar las entradas antes de procesarlas evita estados inconsistentes en la aplicación."},
    {q: "¿Cuál es un componente de entrada típico?", o: ["Etiqueta estática (label)", "Marco o panel", "Icono decorativo", "Campo de texto editable (text field)"], a: "Campo de texto editable (text field)", f: "Los campos de texto permiten al usuario introducir datos alfanuméricos."},
    {q: "¿Qué disposición mejora la legibilidad en formularios con muchos campos?", o: ["Agrupar campos relacionados en secciones claras", "Colocar todo en una única columna sin separación", "Orden alfabético", "Nombres técnicos abreviados"], a: "Agrupar campos relacionados en secciones claras", f: "La agrupación lógica ayuda al usuario a procesar la información por bloques."},
    {q: "Buena práctica tipográfica en interfaces:", o: ["Usar muchas fuentes diferentes", "Tamaños de letra muy pequeños", "Fuente legible y consistente en toda la app", "Cambiar la fuente en cada pantalla"], a: "Fuente legible y consistente en toda la app", f: "La consistencia tipográfica reduce la carga cognitiva del usuario."},
    {q: "Un diálogo modal se caracteriza por:", o: ["Permitir interacción con la ventana principal", "Bloquear la interacción con la ventana principal hasta cerrarse", "Ser siempre transparente", "Ejecutarse en segundo plano"], a: "Bloquear la interacción con la ventana principal hasta cerrarse", f: "El modal obliga al usuario a atender la ventana emergente antes de continuar con la principal."},
    {q: "¿Qué fase implica a usuarios finales probando prototipos?", o: ["Especificación de requisitos", "Codificación de BD", "Empaquetado", "Evaluación y pruebas de usabilidad"], a: "Evaluación y pruebas de usabilidad", f: "En esta fase se valida si la interfaz es realmente fácil de usar para el público objetivo."},
    {q: "¿Ventaja de usar Layout Managers?", o: ["Adaptación a distintos tamaños de ventana", "Uso de coordenadas absolutas", "Impiden redimensionar", "Interfaz fija e inamovible"], a: "Adaptación a distintos tamaños de ventana", f: "Los gestores de distribución calculan automáticamente la posición de los componentes al cambiar el tamaño de la ventana."}
    ]
  },
  {
    moduleId: 'int-u2',
    data: [
    {q: "¿Ventaja principal de definir la interfaz mediante XML?", o: ["Descripción declarativa y fácilmente editable", "Mezclar interfaz con lógica", "Impide reutilizar componentes", "Código menos legible"], a: "Descripción declarativa y fácilmente editable", f: "XML permite separar el diseño de la lógica de programación (Java, C#, etc.)."},
    {q: "¿Qué representa habitualmente cada tag en el XML de interfaz?", o: ["Sentencia condicional", "Tabla de BD", "Componente visual o contenedor", "Hilo de ejecución"], a: "Componente visual o contenedor", f: "Cada etiqueta suele mapearse directamente a una clase de componente (Button, Layout, etc.)."},
    {q: "¿Qué indica el atributo 'android:onClick'?", o: ["Texto mostrado", "ID del botón", "Método del código que se ejecutará al pulsar", "Estilo visual"], a: "Método del código que se ejecutará al pulsar", f: "Asocia el evento de clic con una función definida en el controlador (Activity)."},
    {q: "Papel de los atributos en un elemento XML:", o: ["Describen propiedades (tamaño, texto, color)", "Solo para comentarios", "Solo para versiones", "No tienen relevancia"], a: "Describen propiedades (tamaño, texto, color)", f: "Los atributos definen el estado inicial y la apariencia del componente."},
    {q: "Propiedad 'match_parent' significa que el componente:", o: ["No será visible", "Ancho fijo de 100px", "Ancho mínimo necesario", "Se ajustará al ancho disponible del contenedor"], a: "Se ajustará al ancho disponible del contenedor", f: "Indica que el componente quiere ser tan grande como su padre."},
    {q: "¿Propósito de usar recursos externos (@string/...) en lugar de texto literal?", o: ["Impedir traducción", "Hacer XML más grande", "Facilitar localización y mantenimiento", "Obligar a recompilar"], a: "Facilitar localización y mantenimiento", f: "Permite cambiar el idioma de la app sin modificar el código de la interfaz."},
    {q: "¿Ventaja de un esquema o DTD asociado al XML?", o: ["Validar estructura y detectar errores automáticamente", "Impide abrir el archivo", "Obliga a un solo elemento", "Hace el XML ilegible"], a: "Validar estructura y detectar errores automáticamente", f: "El esquema asegura que el desarrollador no use etiquetas o atributos inexistentes."},
    {q: "La propiedad 'orientation=vertical' en un LinearLayout indica:", o: ["Fila de componentes", "Columna de componentes", "Layout invisible", "Límite de dos elementos"], a: "Columna de componentes", f: "Los elementos se apilan uno debajo de otro."},
    {q: "fragmento 'style=@style/TituloPrincipal' implica:", o: ["Heredar propiedades visuales definidas en ese estilo", "Texto literal", "Sin estilo", "Se convierte en botón"], a: "Heredar propiedades visuales definidas en ese estilo", f: "Permite centralizar el diseño y aplicarlo a múltiples componentes."},
    {q: "¿Por qué asociar XML a una clase controladora?", o: ["Gestionar eventos y lógica de los componentes", "Almacenar base de datos", "Sin ella no se renderiza", "XML no necesita lógica"], a: "Gestionar eventos y lógica de los componentes", f: "La clase controladora (Activity/Controller) 'infla' el XML y le da funcionalidad."}
    ]
  },
  {
    moduleId: 'int-u3',
    data: [
    {q: "¿Qué se entiende por usabilidad?", o: ["Eficacia, eficiencia y satisfacción para objetivos específicos", "Número de funciones técnicas", "Líneas de código", "Atractivo visual exclusivo"], a: "Eficacia, eficiencia y satisfacción para objetivos específicos", f: "La usabilidad mide qué tan fácil y satisfactorio es usar el software."},
    {q: "Principio de 'Visibilidad del estado del sistema':", o: ["Ocultar lo que hace", "Informar solo errores críticos", "Mantener informado al usuario mediante retroalimentación", "No mostrar progreso"], a: "Mantener informado al usuario mediante retroalimentación", f: "El usuario debe saber siempre qué está pasando (ej. barras de carga)."},
    {q: "La consistencia implica que:", o: ["Colores diferentes en cada pantalla", "Resultados distintos según contexto", "Elementos similares funcionen de forma similar", "No dar ayudas"], a: "Elementos similares funcionen de forma similar", f: "Reduce el aprendizaje al aplicar patrones conocidos en toda la app."},
    {q: "Problema del mensaje 'Error 0x80004005':", o: ["Solución clara", "Comprensible", "Indica el campo", "No es informativo ni orienta al usuario"], a: "No es informativo ni orienta al usuario", f: "Los códigos crípticos frustran al usuario; deben usarse mensajes en lenguaje natural."},
    {q: "Una prueba de usabilidad real consiste en:", o: ["Preguntar a desarrolladores", "Medir carga del servidor", "Revisar código", "Observar usuarios realizando tareas"], a: "Observar usuarios realizando tareas", f: "Es la forma empírica de detectar cuellos de botella en la interacción."},
    {q: "¿Qué favorece la prevención de errores?", o: ["Borrar sin confirmación", "Ocultar etiquetas", "Botones peligrosos cerca de comunes", "Restringir entradas con listas y validaciones"], a: "Restringir entradas con listas y validaciones", f: "Es mejor evitar que el usuario cometa el error que corregirlo después."},
    {q: "Un buen mensaje de validación debe:", o: ["Culpar al usuario", "Estar en el log interno", "Indicar el campo que falla y cómo corregirlo", "Mostrar código numérico"], a: "Indicar el campo que falla y cómo corregirlo", f: "Debe ser constructivo y específico."},
    {q: "Principio de 'Control y libertad del usuario':", o: ["No permitir deshacer", "Sin posibilidad de cancelar", "Ofrecer deshacer, rehacer y cancelar", "Ocultar opción de salida"], a: "Ofrecer deshacer, rehacer y cancelar", f: "Permite al usuario recuperarse de acciones accidentales."},
    {q: "Métrica típica de usabilidad:", o: ["Líneas de código", "Tiempo medio en completar una tarea", "Megabytes del ejecutable", "Tablas de la BD"], a: "Tiempo medio en completar una tarea", f: "A menor tiempo para la misma tarea, mayor eficiencia de la interfaz."},
    {q: "Accesibilidad se refiere a:", o: ["Solo usuarios expertos", "Diseño para personas con diversidad funcional", "Puertos del servidor", "Resolución de pantalla única"], a: "Diseño para personas con diversidad funcional", f: "Garantiza que todos los usuarios, independientemente de sus capacidades, puedan usar el sistema."}
    ]
  },
  {
    moduleId: 'int-u4',
    data: [
    {q: "¿Qué es un informe?", o: ["Script de base de datos", "Documento sin formato", "Presentación de datos formateada para resumir info", "Log para desarrolladores"], a: "Presentación de datos formateada para resumir info", f: "Los informes transforman datos brutos en información útil para humanos."},
    {q: "¿Para qué sirve un informe en el desarrollo?", o: ["Sustituir documentación", "Apoyar la toma de decisiones con info clave", "Ejecutar pruebas unitarias", "Reemplazar la GUI"], a: "Apoyar la toma de decisiones con info clave", f: "Permite analizar tendencias y resultados de forma visual."},
    {q: "Función del motor de informes:", o: ["Gestionar transacciones", "Generar listados con cálculos y gráficos", "Reemplazar servidor", "Administrar usuarios"], a: "Generar listados con cálculos y gráficos", f: "Automatiza la maquetación de datos provenientes de diversas fuentes."},
    {q: "Fase de diseño de informes:", o: ["Modificar datos originales", "Distribuir elementos visualmente en una herramienta", "Exportar a PDF", "Configurar permisos"], a: "Distribuir elementos visualmente en una herramienta", f: "Se define dónde va el título, las columnas y los totales."},
    {q: "¿Qué es un informe incrustado?", o: ["Almacenado en web externa", "Fuera del proyecto", "Compilado dentro del proyecto como recurso", "Sin clase contenedora"], a: "Compilado dentro del proyecto como recurso", f: "Facilita la distribución al incluir el informe dentro del archivo ejecutable."},
    {q: "Herramienta libre que usa .jrxml y .jasper:", o: ["Crystal Reports", "JasperReports (Jaspersoft Studio)", "Eclipse BIRT", "MS Word"], a: "JasperReports (Jaspersoft Studio)", f: "Es el estándar de código abierto para informes en Java."},
    {q: "Papel del archivo JRXML:", o: ["Ejecutable final", "Plantilla de diseño que se compila", "Almacén de datos", "Log de errores"], a: "Plantilla de diseño que se compila", f: "Es el archivo XML donde se define visualmente el informe."},
    {q: "Sección que aparece solo al inicio con el nombre del informe:", o: ["Detail", "Page Header", "Page Footer", "Title"], a: "Title", f: "La banda 'Title' solo se imprime una vez al principio del documento."},
    {q: "La sección 'Detail' sirve para:", o: ["Resumen global", "Fecha y logo por página", "Desplegar valores de cada registro", "Número de página"], a: "Desplegar valores de cada registro", f: "Se repite por cada fila de datos que devuelve la consulta."},
    {q: "Operación para mostrar solo info relevante:", o: ["Borrar de la BD", "Filtrar datos según criterios", "Eliminar encabezados", "Impedir parámetros"], a: "Filtrar datos según criterios", f: "Permite generar informes específicos (ej. ventas de un solo mes)."}
    ]
  },
  {
    moduleId: 'int-u5',
    data: [
    {q: "Propósito fundamental de las pruebas:", o: ["Eliminar todos los defectos", "Justificar el coste", "Encontrar errores antes que el usuario", "Hacer el software complejo"], a: "Encontrar errores antes que el usuario", f: "Las pruebas reducen el riesgo de fallos en el entorno real."},
    {q: "La calidad del software es:", o: ["Algo que se añade al final", "Funcionamiento rápido", "Forma de pensar y actuar en todo el ciclo", "Número de líneas de código"], a: "Forma de pensar y actuar en todo el ciclo", f: "La calidad se construye desde el diseño, no solo al probar."},
    {q: "Consecuencia de mala gestión de pruebas:", o: ["Menor tiempo entrega", "Menos mantenimiento", "Satisfacción del cliente", "Altos costes por corrección tardía"], a: "Altos costes por corrección tardía", f: "Cuanto más tarde se detecta un error, más caro es arreglarlo."},
    {q: "Objetivo realista de las pruebas:", o: ["Minimizar errores (no inexistencia absoluta)", "Garantizar cero defectos", "Probar solo lo principal", "Mínimo esfuerzo"], a: "Minimizar errores (no inexistencia absoluta)", f: "Es teóricamente imposible demostrar que un software no tiene errores."},
    {q: "Verificación de software significa:", o: ["Producto atractivo", "Cumplir lo que el cliente pidió", "Instalación correcta", "El producto funciona según su diseño"], a: "El producto funciona según su diseño", f: "¿Estamos construyendo el producto correctamente?"},
    {q: "Validación de software significa:", o: ["Código compila", "Conforme a lo que el cliente esperaba", "Ejecutar todos los casos", "Respuesta rápida"], a: "Conforme a lo que el cliente esperaba", f: "¿Estamos construyendo el producto correcto para el cliente?"},
    {q: "Limitación inherente al proceso de pruebas:", o: ["Probar exhaustivamente todo", "Casos de prueba finitos", "Complejidad y coste impiden prueba total", "Estrategia evita errores"], a: "Complejidad y coste impiden prueba total", f: "El número de combinaciones posibles es infinito en la práctica."},
    {q: "Prueba a módulos o clases por separado:", o: ["Sistema", "Regresión", "Capacidad", "Unitarias"], a: "Unitarias", f: "Validan que cada componente individual funcione aisladamente."},
    {q: "Objetivo de las pruebas de regresión:", o: ["Evaluar hardware", "Precisión de cálculos", "Asegurar que cambios no dañaron lo que funcionaba", "Interfaz amigable"], a: "Asegurar que cambios no dañaron lo que funcionaba", f: "Se ejecutan tras modificar el código para evitar 'efectos secundarios'."},
    {q: "Pruebas de aceptación se centran en:", o: ["Carga extrema", "Cumplir requisitos y expectativas del cliente", "Estándares internos", "Seguridad de acceso"], a: "Cumplir requisitos y expectativas del cliente", f: "Es la prueba final antes de que el cliente firme la entrega."}
    ]
  }
];

const mappedQuestions = [];
let globalIndex = 221; // Next free ID

rawSections.forEach(section => {
  section.data.forEach((q, i) => {
    let opts = q.o.map((text, idx) => ({
      id: String.fromCharCode(97 + idx),
      text: text
    }));
    
    let correctOpt = opts.find(opt => q.a.includes(opt.text) || opt.text.includes(q.a));
    let correctId = correctOpt ? correctOpt.id : 'a';
    
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

console.log('Successfully added ' + mappedQuestions.length + ' interface questions part 1. Total: ' + combined.length);
