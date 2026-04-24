const fs = require('fs');

const rawSections = [
  {
    moduleId: 'dig-u1',
    data: [
    {q: "¿Qué busca el desarrollo sostenible?", o: ["Maximizar crecimiento a corto plazo", "Satisfacer necesidades actuales sin comprometer las futuras", "Priorizar tecnología sobre medioambiente", "Reducir bienestar social"], a: "Satisfacer necesidades actuales sin comprometer las futuras", f: "Busca el equilibrio entre crecimiento económico, cuidado del medio ambiente y bienestar social[cite: 443, 445, 451]."},
    {q: "¿Cuáles son los tres pilares del desarrollo sostenible?", o: ["Tecnología, economía y política", "Innovación, empleo y digitalización", "Crecimiento económico, bienestar social y sostenibilidad ambiental", "Producción, consumo y reciclaje"], a: "Crecimiento económico, bienestar social y sostenibilidad ambiental", f: "Estos tres ejes deben interactuar de forma equilibrada para garantizar la sostenibilidad[cite: 448, 451]."},
    {q: "¿Cuántos Objetivos de Desarrollo Sostenible (ODS) tiene la Agenda 2030?", o: ["10", "12", "15", "17"], a: "17", f: "La Agenda 2030 de la ONU define exactamente 17 objetivos globales[cite: 453, 457]."},
    {q: "¿Qué indica la Paradoja de Jevons?", o: ["La tecnología siempre ahorra", "La eficiencia puede aumentar el consumo total de recursos", "Los recursos son infinitos", "La digitalización no contamina"], a: "La eficiencia puede aumentar el consumo total de recursos", f: "A medida que la tecnología es más eficiente, su uso se abarata y acaba consumiéndose más[cite: 458, 461]."},
    {q: "¿Qué fase de las TIC genera mayor huella ambiental?", o: ["Diseño", "Consumo", "Eliminación", "Fabricación"], a: "Fabricación", f: "La extracción de materiales y la energía necesaria para producir hardware es el punto más crítico[cite: 463, 467]."},
    {q: "¿Qué es la obsolescencia programada?", o: ["Productos duraderos", "Reducir artificialmente la vida útil", "Reciclaje", "Eficiencia energética"], a: "Reducir artificialmente la vida útil", f: "Es una estrategia para forzar al consumidor a renovar productos antes de lo necesario[cite: 468, 470]."},
    {q: "¿Qué define a la tecnología sostenible?", o: ["Uso de energías fósiles", "Diseño modular y ciclo de vida sostenible", "Reducción de usuarios", "Producción masiva"], a: "Diseño modular y ciclo de vida sostenible", f: "Busca minimizar el impacto ambiental desde la concepción hasta el desecho del dispositivo[cite: 474, 476]."},
    {q: "¿Qué ODS está más vinculado a la innovación digital?", o: ["ODS 3", "ODS 7", "ODS 9", "ODS 13"], a: "ODS 9", f: "Este objetivo promueve infraestructuras resilientes y fomenta la innovación tecnológica[cite: 479, 482]."},
    {q: "¿Qué innovación digital ayuda a la reforestación masiva?", o: ["Sensores domésticos", "Drones para siembra", "Impresoras 3D", "E-commerce"], a: "Drones para siembra", f: "Los drones permiten reforestar áreas de difícil acceso de forma rápida y eficiente[cite: 484, 486]."},
    {q: "¿Qué modelo se basa en 'fabricar, usar y desechar'?", o: ["Economía circular", "Economía colaborativa", "Economía de suscripción", "Economía lineal"], a: "Economía lineal", f: "Es un modelo insostenible que agota recursos y genera residuos masivos[cite: 489, 493]."},
    {q: "¿Qué prioriza la economía circular?", o: ["Reutilización y reciclaje", "Consumo rápido", "Extracción de recursos", "Producción masiva"], a: "Reutilización y reciclaje", f: "Busca cerrar el ciclo de vida de los productos para que vuelvan al sistema como recursos[cite: 494, 495]."},
    {q: "¿Qué etapa incorpora criterios ambientales desde el inicio?", o: ["Producción", "Distribución", "Ecodiseño", "Consumo"], a: "Ecodiseño", f: "El ecodiseño es clave para crear productos fáciles de reparar y reciclar[cite: 499, 503]."},
    {q: "¿Qué impacto se asocia a la economía lineal?", o: ["Reducción de residuos", "Conservación de biodiversidad", "Ahorro de agua", "Agotamiento de recursos"], a: "Agotamiento de recursos", f: "Al no reutilizar nada, el sistema lineal consume materias primas de forma constante[cite: 505, 509]."},
    {q: "¿Qué ventaja competitiva da la economía circular?", o: ["Aumento de residuos", "Menos innovación", "Dependencia de materias primas", "Eficiencia de recursos"], a: "Eficiencia de recursos", f: "Permite a las empresas ahorrar costes y depender menos de materias primas vírgenes[cite: 511, 515]."},
    {q: "¿Qué permite el IoT en la economía circular?", o: ["Aumentar consumo", "Mantenimiento predictivo", "Reducir durabilidad", "Eliminar reciclaje"], a: "Mantenimiento predictivo", f: "Los sensores avisan antes de que algo se rompa, extendiendo la vida útil del producto[cite: 516, 518]."},
    {q: "¿Qué herramienta optimiza la recogida de basura?", o: ["Contenedores inteligentes", "Redes sociales", "Streaming", "Tokenización"], a: "Contenedores inteligentes", f: "Avisan cuando están llenos, optimizando las rutas de los camiones y ahorrando combustible[cite: 521, 522]."},
    {q: "¿Cuál es una barrera para la economía circular?", o: ["Exceso de información", "Legislación alineada", "Falta de info sobre reparación", "Alta inversión"], a: "Falta de info sobre reparación", f: "Si el usuario no sabe cómo o dónde reparar, acabará desechando el producto[cite: 526, 529]."},
    {q: "¿Qué problema afecta a las zonas rurales en la transición digital?", o: ["Exceso de conectividad", "Infraestructura insuficiente", "Saturación de datos", "Abundancia de talento"], a: "Infraestructura insuficiente", f: "La brecha digital impide que el entorno rural aproveche las ventajas de la digitalización[cite: 531, 533]."},
    {q: "¿Qué factor dificulta la seguridad en la transición?", o: ["Exceso de normas", "Déficits en ciberseguridad", "Mucha inversión", "Falta de dispositivos"], a: "Déficits en ciberseguridad", f: "La falta de protección digital expone a las empresas a ataques y fugas de datos[cite: 536, 538]."},
    {q: "¿Qué limita el mercado laboral digital hoy?", o: ["Escasez de habilidades digitales", "Exceso de profesionales IT", "Falta de tecnología", "Demasiada automatización"], a: "Escasez de habilidades digitales", f: "Las empresas no encuentran suficiente personal formado en competencias digitales básicas y avanzadas[cite: 541, 542]."}
    ]
  },
  {
    moduleId: 'dig-u2',
    data: [
    {q: "¿Qué se entiende por 'industria' en este tema?", o: ["Fabricación de bienes físicos", "Conjunto de procesos para generar bienes y servicios", "Solo sector secundario", "Actividades tecnológicas"], a: "Conjunto de procesos para generar bienes y servicios", f: "Abarca toda la cadena de valor, no solo la fabricación manual[cite: 5, 7]."},
    {q: "¿Qué sector transforma materia prima en productos?", o: ["Terciario", "Primario", "Secundario", "Cuaternario"], a: "Secundario", f: "Es el sector industrial encargado de la transformación de materiales[cite: 10, 13]."},
    {q: "¿Qué define a la Primera Revolución Industrial?", o: ["Informática", "Electricidad", "Digitalización", "Máquina de vapor"], a: "Máquina de vapor", f: "Supuso el paso del trabajo manual a las máquinas de vapor[cite: 15, 19]."},
    {q: "¿Qué distingue a la Industria 4.0?", o: ["Producción manual", "Digitalización, IoT e IA", "Electricidad", "Eliminación de automatización"], a: "Digitalización, IoT e IA", f: "Es la integración total de lo digital con lo físico[cite: 20, 22]."},
    {q: "¿Objetivo principal de la Industria 4.0?", o: ["Aumentar trabajo manual", "Eliminar intervención humana", "Integrar tecnologías digitales", "Sustituir trabajadores"], a: "Integrar tecnologías digitales", f: "Busca optimizar la producción mediante la conectividad[cite: 25, 28]."},
    {q: "¿Qué NO corresponde a la Industria 4.0?", o: ["Automatización", "Convergencia tecnológica", "Producción artesanal", "Análisis de datos"], a: "Producción artesanal", f: "La industria 4.0 se basa en procesos industriales tecnológicos, no manuales/artesanales[cite: 30, 33]."},
    {q: "¿Qué permiten los sistemas ciberfísicos (CPS)?", o: ["Separar mundo físico de digital", "Integrar e interconectar procesos físicos y digitales", "Sustituir informática", "Limitar comunicación"], a: "Integrar e interconectar procesos físicos y digitales", f: "Hacen que el mundo físico y el digital actúen como uno solo[cite: 36, 38]."},
    {q: "¿Primer paso de un CPS?", o: ["Emitir comandos", "Analizar en la nube", "Recoger datos del entorno", "Tomar decisiones"], a: "Recoger datos del entorno", f: "Sin sensores que capten la realidad, el sistema no puede funcionar[cite: 41, 44]."},
    {q: "¿Qué capa de CPS gestiona la comunicación?", o: ["Capa de percepción", "Capa de aplicación", "Capa de control", "Capa de transmisión"], a: "Capa de transmisión", f: "Es la responsable de mover los datos entre sensores y centros de control[cite: 46, 50]."},
    {q: "¿Qué significa convergencia IT/OT?", o: ["Separar sistemas", "Integrar tecnologías de información y de operaciones", "Sustituir OT", "Solo software"], a: "Integrar tecnologías de información y de operaciones", f: "Une la informática de oficina (IT) con la de la planta de producción (OT)[cite: 51, 53]."},
    {q: "¿Función de los sensores en un CPS?", o: ["Ejecutar acciones", "Almacenar datos", "Recoger datos del entorno", "Controlar interfaz"], a: "Recoger datos del entorno", f: "Actúan como los receptores de estímulos externos del sistema[cite: 56, 59]."},
    {q: "¿Qué componente actúa sobre el entorno físico?", o: ["Sensor", "Actuador", "Servidor", "Interfaz"], a: "Actuador", f: "Es el que realiza el movimiento o acción física (motores, interruptores, etc.)[cite: 61, 63]."},
    {q: "¿Tecnología clave de los CPS?", o: ["Inteligencia artificial", "Contabilidad", "Ofimática", "Procesadores de texto"], a: "Inteligencia artificial", f: "La IA permite que el CPS aprenda y tome decisiones autónomas[cite: 66, 67]."},
    {q: "¿Qué permite la automatización industrial?", o: ["Más errores", "Menos eficiencia", "Más productividad y seguridad", "Eliminar planificación"], a: "Más productividad y seguridad", f: "Las máquinas hacen tareas repetitivas o peligrosas con mayor precisión[cite: 71, 74]."},
    {q: "¿En qué se basa la toma de decisiones informada?", o: ["Intuición", "Análisis de datos y evidencias", "Opiniones", "Impulsos"], a: "Análisis de datos y evidencias", f: "Usa hechos reales procesados para reducir la incertidumbre[cite: 75, 79]."},
    {q: "¿Función del Business Intelligence?", o: ["Diseñar productos", "Automatizar robots", "Analizar y visualizar datos para decisiones", "Sustituir directivos"], a: "Analizar y visualizar datos para decisiones", f: "Convierte datos en paneles comprensibles para la estrategia de negocio[cite: 82, 85]."},
    {q: "¿En qué se basa el diseño centrado en el usuario (DCU)?", o: ["Priorizar tecnología", "Comprender necesidades y contexto del usuario", "Reducir participación", "Diseñar sin pruebas"], a: "Comprender necesidades y contexto del usuario", f: "Pone al ser humano en el centro del desarrollo de productos[cite: 87, 89]."},
    {q: "¿Principio del DCU de mejora por ciclos?", o: ["Empatía", "Prototipado", "Iteración", "Implementación"], a: "Iteración", f: "Significa repetir ciclos de diseño y prueba hasta llegar al producto ideal[cite: 92, 95]."},
    {q: "¿Beneficio del DCU para empresas?", o: ["Menor innovación", "Mayor competitividad", "Más costes", "Menos satisfacción"], a: "Mayor competitividad", f: "Un producto que gusta al usuario se vende mejor que uno que no le entiende[cite: 97, 99]."},
    {q: "¿Elemento cultural clave para la Industria 4.0?", o: ["Resistencia al cambio", "Comunicación cerrada", "Innovación continua y aprendizaje", "Eliminar colaboración"], a: "Innovación continua y aprendizaje", f: "La cultura debe estar abierta a aprender nuevas tecnologías constantemente[cite: 102, 105]."}
    ]
  },
  {
    moduleId: 'dig-u3',
    data: [
    {q: "¿Qué es la computación en la nube?", o: ["Sistema local", "Modelo de entrega de servicios por Internet", "Red privada cerrada", "Software instalado localmente"], a: "Modelo de entrega de servicios por Internet", f: "Permite acceder a recursos desde cualquier lugar[cite: 114, 116]."},
    {q: "¿Impacto de la nube en pymes?", o: ["Más inversión en infra propia", "Limita tecnología", "Democratiza acceso a tecnología avanzada", "Reduce competencia"], a: "Democratiza acceso a tecnología avanzada", f: "Las pequeñas empresas pueden usar herramientas potentes pagando solo lo que usan[cite: 119, 122]."},
    {q: "¿Función básica de la nube?", o: ["Diseñar hardware", "Almacenar y transferir archivos", "Fabricar servidores", "Reparar dispositivos"], a: "Almacenar y transferir archivos", f: "Es la utilidad más común y directa del almacenamiento cloud[cite: 124, 126]."},
    {q: "¿Quién ofrece los servicios cloud?", o: ["Usuario final", "Proveedor de servicios en la nube", "Admin local", "Desarrollador"], a: "Proveedor de servicios en la nube", f: "Empresas como Amazon, Google o Microsoft mantienen la infraestructura[cite: 129, 131]."},
    {q: "¿Elemento imprescindible para la nube?", o: ["Servidor propio", "Red privada", "Conexión a Internet estable", "Centro de datos local"], a: "Conexión a Internet estable", f: "Sin Internet no hay forma de conectar con los servicios remotos[cite: 134, 137]."},
    {q: "¿Característica de los centros de datos cloud?", o: ["Equipos domésticos", "Alta disponibilidad y seguridad", "Sin refrigeración", "Solo copias locales"], a: "Alta disponibilidad y seguridad", f: "Son búnkeres tecnológicos con copias de seguridad y vigilancia extrema[cite: 139, 141]."},
    {q: "¿Característica propia del cloud computing?", o: ["Acceso remoto", "Uso solo en oficinas", "Dependencia de hardware físico del usuario", "Costes fijos elevados"], a: "Acceso remoto", f: "La ubicuidad es su mayor ventaja[cite: 145, 146]."},
    {q: "¿Qué es el 'pago por uso'?", o: ["Cuota fija", "Pagar solo por recursos utilizados", "Gratis", "Pago único"], a: "Pagar solo por recursos utilizados", f: "Permite escalar costes según la necesidad del momento[cite: 150, 152]."},
    {q: "¿Beneficio económico de la nube?", o: ["Más costes fijos", "Sin gastos tecnológicos", "Ahorro en infraestructura y mantenimiento", "Más inversión inicial"], a: "Ahorro en infraestructura y mantenimiento", f: "Se pasa de invertir en máquinas (CapEx) a pagar servicios (OpEx)[cite: 155, 158]."},
    {q: "¿Desafío del uso de la nube?", o: ["Dependencia del proveedor", "Falta de escalabilidad", "Acceso limitado", "Menor colaboración"], a: "Dependencia del proveedor", f: "El 'vendor lock-in' es un riesgo si quieres cambiar de proveedor[cite: 160, 161]."},
    {q: "¿Riesgo de seguridad cloud?", o: ["No hay copias", "Fuga de información o ciberataques", "Falta de protección", "Exceso de control"], a: "Fuga de información o ciberataques", f: "Al estar en Internet, los datos son objetivo de hackers[cite: 165, 167]."},
    {q: "¿Cambio laboral impulsado por la nube?", o: ["Menos colaboración", "Rigidez horaria", "Flexibilidad y trabajo remoto", "Sin herramientas digitales"], a: "Flexibilidad y trabajo remoto", f: "Permite trabajar desde casa accediendo a la oficina virtual[cite: 170, 173]."},
    {q: "¿Modelo que da infraestructura (servidores, redes)?", o: ["SaaS", "PaaS", "IaaS", "CRM"], a: "IaaS", f: "Infrastructure as a Service: te dan el 'hierro' virtual[cite: 175, 179]."},
    {q: "¿Qué ofrece PaaS?", o: ["Apps finales", "Infra física", "Entorno para desarrollar y desplegar apps", "Solo almacenamiento"], a: "Entorno para desarrollar y desplegar apps", f: "Platform as a Service: ideal para programadores[cite: 182, 185]."},
    {q: "¿Modelo para usar apps en el navegador?", o: ["PaaS", "IaaS", "SaaS", "On-premise"], a: "SaaS", f: "Software as a Service: como Gmail o Netflix[cite: 187, 190]."},
    {q: "¿Nube que combina pública y privada?", o: ["Comunitaria", "Privada", "Pública", "Híbrida"], a: "Híbrida", f: "Permite tener datos críticos en local y el resto en la pública[cite: 192, 196]."},
    {q: "¿Ventaja de la nube pública?", o: ["Control total", "Menor coste inicial y escalabilidad", "Aislamiento completo", "Gestión interna"], a: "Menor coste inicial y escalabilidad", f: "Es compartida, lo que abarata costes drásticamente[cite: 197, 199]."},
    {q: "¿Qué persigue la gobernanza cloud?", o: ["Sustituir administración", "Regular el uso mediante políticas y controles", "Eliminar riesgos automáticamente", "Reducir uso"], a: "Regular el uso mediante políticas y controles", f: "Establece reglas para que el uso de la nube sea seguro y legal[cite: 202, 204]."},
    {q: "¿Normativa europea de protección de datos?", o: ["ISO 27001", "LOPDGDD", "RGPD", "ENS"], a: "RGPD", f: "El Reglamento General de Protección de Datos es de obligado cumplimiento en la UE[cite: 207, 210]."},
    {q: "¿Qué es Edge Computing?", o: ["Centralizar todo", "Acercar procesamiento a los dispositivos", "Eliminar nube", "Procesar remoto"], a: "Acercar procesamiento a los dispositivos", f: "Reduce la latencia al no tener que ir los datos hasta un servidor lejano[cite: 212, 214]."}
    ]
  },
  {
    moduleId: 'dig-u4',
    data: [
    {q: "¿Qué busca la transformación digital de producción?", o: ["Más burocracia", "Estructuras rígidas", "Productividad, menos costes y calidad", "Sustituir procesos humanos"], a: "Productividad, menos costes y calidad", f: "Es la meta de cualquier mejora tecnológica en la empresa[cite: 224, 227]."},
    {q: "¿Función de la unidad de Producción?", o: ["Finanzas", "Crear bienes o prestarlos con eficiencia", "Marketing", "RRHH"], a: "Crear bienes o prestarlos con eficiencia", f: "Es el motor generador del valor de la empresa[cite: 229, 231]."},
    {q: "¿Qué es la alineación estratégica?", o: ["Apps sin cambiar procesos", "Sincronizar tecnología con objetivos", "Delegar solo en IT", "Tecnología sobre estrategia"], a: "Sincronizar tecnología con objetivos", f: "La tecnología debe servir al plan de negocio, no ir por libre[cite: 234, 236]."},
    {q: "¿Qué son las THD?", o: ["Ofimática básica", "Tecnologías que mejoran procesos, productos y servicios", "Software administrativo", "Contabilidad digital"], a: "Tecnologías que mejoran procesos, productos y servicios", f: "Son las herramientas que 'habilitan' el salto digital[cite: 239, 241]."},
    {q: "¿Tecnología de conectividad inteligente?", o: ["IoT", "Big data", "Blockchain", "Robótica"], a: "IoT", f: "Permite que los objetos 'hablen' y se conecten[cite: 244, 245]."},
    {q: "¿Característica del 5G?", o: ["Más latencia", "Menos densidad", "Velocidades ultrarrápidas", "Solo fijos"], a: "Velocidades ultrarrápidas", f: "Aparte de velocidad, ofrece mínima latencia y alta conectividad[cite: 249, 252]."},
    {q: "¿Qué permite el IoT?", o: ["Procesar solo nube", "Conectar dispositivos para recoger y transmitir datos", "Sustituir informática", "Eliminar sensores"], a: "Conectar dispositivos para recoger y transmitir datos", f: "Convierte objetos cotidianos en fuentes de información[cite: 255, 257]."},
    {q: "¿Característica esencial del IoT?", o: ["Aislamiento", "Interoperabilidad", "Solo cables", "Sin software"], a: "Interoperabilidad", f: "Es vital que distintos dispositivos puedan entenderse entre sí[cite: 260, 262]."},
    {q: "¿Tecnología para gestionar volúmenes de datos?", o: ["Realidad aumentada", "Robótica", "Big data", "Realidad virtual"], a: "Big data", f: "Gestiona las 3 'V': Volumen, Velocidad y Variedad de datos[cite: 265, 268]."},
    {q: "¿Qué busca la analítica de datos?", o: ["Almacenar sin procesar", "Transformar datos en info útil para decisiones", "Más volumen", "Sustituir sistemas"], a: "Transformar datos en info útil para decisiones", f: "Los datos crudos no sirven; lo que importa es el conocimiento que extraes[cite: 270, 272]."},
    {q: "¿Característica del Blockchain?", o: ["Centralización", "Fácil de modificar", "Inmutabilidad de los registros", "Falta de trazabilidad"], a: "Inmutabilidad de los registros", f: "Lo que se escribe en blockchain no se puede borrar ni alterar[cite: 275, 278]."},
    {q: "¿Qué conecta un bloque con el anterior?", o: ["Nodos", "Hash del bloque anterior", "Clave pública", "Smart contract"], a: "Hash del bloque anterior", f: "Es el 'pegamento' matemático que hace la cadena segura[cite: 280, 282]."},
    {q: "¿Qué define mejor a la IA?", o: ["Órdenes fijas", "Máquinas que realizan tareas que requieren inteligencia humana", "Ofimática avanzada", "Almacenamiento"], a: "Máquinas que realizan tareas que requieren inteligencia humana", f: "Aprende, razona y resuelve problemas como una persona[cite: 285, 287]."},
    {q: "¿Aplicación práctica de la IA?", o: ["Gestionar emails", "Sistemas de recomendación personalizados", "Almacenamiento", "Redes cableadas"], a: "Sistemas de recomendación personalizados", f: "Como las sugerencias de Amazon o YouTube basadas en tus gustos[cite: 290, 292]."},
    {q: "¿Qué caracteriza a la IA Generativa?", o: ["Datos históricos", "Produce contenido nuevo (texto, imagen, audio)", "Solo clasifica", "Sin entrenamiento"], a: "Produce contenido nuevo (texto, imagen, audio)", f: "Crea contenido desde cero (ej. ChatGPT)[cite: 296, 298]."},
    {q: "¿Qué son los 'prompts'?", o: ["Errores", "Instrucciones del usuario para guiar a la IA", "Resultados", "Modelos"], a: "Instrucciones del usuario para guiar a la IA", f: "Es la frase que le escribes a la IA para pedirle algo[cite: 301, 303]."},
    {q: "¿Qué distingue a la robótica colaborativa?", o: ["Robots aislados", "Robots que interactúan de forma segura con humanos", "Sustitución total", "Solo laboratorios"], a: "Robots que interactúan de forma segura con humanos", f: "Llamados 'cobots', trabajan codo con codo con el personal[cite: 306, 308]."},
    {q: "¿Qué es la fabricación aditiva?", o: ["Eliminar material", "Impresión 3D a partir de modelos digitales", "Montaje tradicional", "Robots industriales"], a: "Impresión 3D a partir de modelos digitales", f: "Crea el objeto capa a capa añadiendo material[cite: 311, 313]."},
    {q: "¿Qué es un Gemelo Digital?", o: ["Diseño gráfico", "Copia física", "Réplica virtual de sistema real para simular", "Sensor"], a: "Réplica virtual de sistema real para simular", f: "Permite probar fallos en virtual antes de que pasen en real[cite: 316, 319]."},
    {q: "¿Objetivo de la ciberseguridad?", o: ["Seguridad física", "Proteger sistemas, redes y datos", "Más complejidad", "Limitar Internet"], a: "Proteger sistemas, redes y datos", f: "Es la defensa de los activos digitales de la empresa[cite: 321, 322]."}
    ]
  },
  {
    moduleId: 'dig-u5',
    data: [
    {q: "¿Qué es la transformación digital?", o: ["Pasar a PDF", "Reinventar organización mediante tecnologías", "Sustituir personal", "Informatizar IT"], a: "Reinventar organización mediante tecnologías", f: "No es solo comprar PCs, es cambiar cómo funciona la empresa[cite: 332, 334]."},
    {q: "¿Qué caracteriza a una empresa digital?", o: ["Tecnología en todos los procesos", "Jerarquía rígida", "Sin enfoque cliente", "Basada en intuición"], a: "Tecnología en todos los procesos", f: "La tecnología es el ADN de la compañía[cite: 337, 338]."},
    {q: "¿Rasgo organizativo de empresas digitales?", o: ["Unidisciplinares", "Jerárquicas", "Estructuras planas", "Decisiones centrales"], a: "Estructuras planas", f: "Hay menos niveles de mando para ganar agilidad[cite: 342, 345]."},
    {q: "¿Metodología con ciclos cortos (sprints)?", o: ["Kanban", "Scrum", "Waterfall", "PRINCE2"], a: "Scrum", f: "Se basa en entregas rápidas y feedback constante[cite: 348, 350]."},
    {q: "¿Documento que guía la digitalización?", o: ["Plan marketing", "Manual calidad", "Plan de transformación digital", "Plan financiero"], a: "Plan de transformación digital", f: "Es la hoja de ruta estratégica para el cambio digital[cite: 353, 357]."},
    {q: "¿Cuál es un pilar de la transformación digital?", o: ["Cultura", "Marketing", "Ventas", "Contabilidad"], a: "Cultura", f: "Sin cambio de mentalidad en las personas, la tecnología falla[cite: 359, 360]."},
    {q: "¿Objetivo del plan respecto al cliente?", o: ["Menos inversión", "Mejorar la experiencia del cliente", "Quitar canales", "Decidir central"], a: "Mejorar la experiencia del cliente", f: "La digitalización debe hacerle la vida más fácil al usuario[cite: 364, 367]."},
    {q: "¿Componente centrado en fidelizar?", o: ["Procesos", "Personas", "Clientes", "Modelos de negocio"], a: "Clientes", f: "Poner el foco en qué quiere y necesita el comprador[cite: 370, 373]."},
    {q: "¿Innovar en modelos de negocio implica...?", o: ["Ser tradicional", "Suscripciones, plataformas y cloud", "Quitar digital", "Menos valor"], a: "Suscripciones, plataformas y cloud", f: "Cambiar cómo se gana dinero (ej. vender servicios en vez de productos)[cite: 375, 377]."},
    {q: "¿Qué busca la automatización de procesos?", o: ["Más burocracia", "Reducir costes y tiempos", "Sin control", "Menos colaboración"], a: "Reducir costes y tiempos", f: "Hacer las tareas automáticas más rápido y barato[cite: 380, 382]."},
    {q: "¿Fase que evalúa la madurez digital?", o: ["Implementación", "Diagnóstico inicial", "Gestión del cambio", "Resultados"], a: "Diagnóstico inicial", f: "Es la foto de dónde estamos antes de empezar el viaje[cite: 385, 387]."},
    {q: "¿Metodología para objetivos claros?", o: ["OKR", "BPMN", "SMART", "ISO 9001"], a: "SMART", f: "Específicos, Medibles, Alcanzables, Relevantes y con Tiempo[cite: 390, 393]."},
    {q: "¿Qué son los KPI?", o: ["Indicadores de progreso", "Herramientas auto", "Plataformas", "Sistemas"], a: "Indicadores de progreso", f: "Métricas que dicen si lo estamos haciendo bien o mal[cite: 395, 396]."},
    {q: "¿Qué se define en la planificación?", o: ["Ética", "Recursos, calendario y áreas", "Solo tecnología", "Jerarquía"], a: "Recursos, calendario y áreas", f: "Es el detalle de cómo vamos a ejecutar el plan[cite: 400, 402]."},
    {q: "¿Qué ayuda a reducir riesgos antes de grandes cambios?", o: ["Comunicación", "Formación", "Implanta directa", "Pruebas piloto"], a: "Pruebas piloto", f: "Probar en pequeño antes de lanzarse a toda la empresa[cite: 406, 410]."},
    {q: "¿Qué persigue la gestión del cambio?", o: ["Imponer", "Preparar a personas para adoptar cambios", "Quitar líderes", "Sancionar"], a: "Preparar a personas para adoptar cambios", f: "Minimiza la resistencia humana a la novedad tecnológica[cite: 411, 413]."},
    {q: "¿Quiénes son responsables del cambio?", o: ["Solo dirección", "Solo IT", "Toda la organización", "Proveedores"], a: "Toda la organización", f: "Desde el CEO hasta el último empleado deben participar[cite: 416, 419]."},
    {q: "¿Qué es la mejora continua?", o: ["Proceso puntual", "Enfoque sistemático de optimización constante", "Auditoría aislada", "Informe anual"], a: "Enfoque sistemático de optimización constante", f: "Siempre se puede hacer mejor; nunca se termina de mejorar[cite: 421, 423]."},
    {q: "¿Barrera para la adopción tecnológica?", o: ["Apoyo dirección", "Formación", "Resistencia al cambio", "Comunicación"], a: "Resistencia al cambio", f: "El miedo a lo nuevo o a perder el puesto frena el avance[cite: 426, 429]."},
    {q: "¿Estrategia contra barreras humanas?", o: ["Comunicación y formación", "Menos inversión", "Centralizar", "Quitar personal"], a: "Comunicación y formación", f: "Informar y enseñar quita el miedo y da herramientas de éxito[cite: 431, 432]."}
    ]
  }
];

const mappedQuestions = [];
let globalIndex = 61; // Continue from English questions

rawSections.forEach(section => {
  section.data.forEach((q, i) => {
    let opts = q.o.map((text, idx) => ({
      id: String.fromCharCode(97 + idx),
      text: text
    }));
    
    let correctOpt = opts.find(opt => q.a.includes(opt.text) || opt.text.includes(q.a));
    let correctId = correctOpt ? correctOpt.id : 'a';
    
    mappedQuestions.push({
      id: "dig-q" + String(globalIndex).padStart(3, '0'),
      subjectId: 'digitalization',
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

console.log('Successfully added ' + mappedQuestions.length + ' digitalization questions. Total: ' + combined.length);
