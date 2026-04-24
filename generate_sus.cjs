const fs = require('fs');

const rawSections = [
  {
    moduleId: 'sus-u1',
    data: [
    {q: "¿Cuál es una preocupación global del siglo XXI?", o: ["Estancamiento tecnológico", "Deterioro medioambiental", "Reducción de población", "Automatización"], a: "Deterioro medioambiental", f: "El deterioro ambiental es el reto central de nuestra era según el texto."},
    {q: "¿Qué fenómeno intensifican los gases de efecto invernadero?", o: ["Desertificación local", "Contaminación acústica", "Calentamiento global", "Erosión"], a: "Calentamiento global", f: "Los GEI atrapan calor provocando el aumento térmico global."},
    {q: "¿Causa directa de la deforestación?", o: ["Turismo sostenible", "Agricultura y ganadería intensivas", "Teletrabajo", "Investigación"], a: "Agricultura y ganadería intensivas", f: "La expansión agrícola es la principal responsable de la pérdida de bosques."},
    {q: "Según el IPCC, los desastres recientes se relacionan con:", o: ["Volcanes", "Cambio climático", "Sobreexplotación pesquera", "Contaminación lumínica"], a: "Cambio climático", f: "El panel intergubernamental vincula los eventos extremos al calentamiento global."},
    {q: "Efecto de la globalización en el medio ambiente:", o: ["Reduce consumo", "Aumenta demanda de recursos y emisiones por transporte", "Elimina contaminación", "Mejora gestión auto"], a: "Aumenta demanda de recursos y emisiones por transporte", f: "El comercio global incrementa la huella por transporte de larga distancia."},
    {q: "¿Qué mide la huella ecológica?", o: ["Ingresos", "Demanda humana sobre recursos vs biocapacidad", "Empresas sostenibles", "Producción energía"], a: "Demanda humana sobre recursos vs biocapacidad", f: "Compara lo que consumimos con lo que la Tierra puede regenerar."},
    {q: "¿Qué componente se refiere a emisiones de CO2?", o: ["Huella hídrica", "Uso del suelo", "Huella de carbono", "Residuos"], a: "Huella de carbono", f: "Mide la totalidad de gases de efecto invernadero emitidos."},
    {q: "¿Qué mide la huella hídrica?", o: ["Calidad agua potable", "Volumen de agua utilizada directa o indirectamente", "Embalses", "Lluvias"], a: "Volumen de agua utilizada directa o indirectamente", f: "Evalúa el consumo de agua dulce en toda la cadena."},
    {q: "¿Herramienta que evalúa el impacto de inicio a fin?", o: ["Auditoría", "Análisis del ciclo de vida (ACV)", "Balance", "Estudio mercado"], a: "Análisis del ciclo de vida (ACV)", f: "Es el método estándar para medir impactos de la cuna a la tumba."},
    {q: "Efecto de mala gestión de residuos en el mar:", o: ["Reduce biodiversidad marina", "Mejora calidad", "Baja temperatura", "Sube reproducción"], a: "Reduce biodiversidad marina", f: "Los plásticos y vertidos destruyen ecosistemas oceánicos."},
    {q: "¿Qué organización advierte sobre muertes por aire contaminado?", o: ["FAO", "IPCC", "OMS", "OCDE"], a: "OMS", f: "La Organización Mundial de la Salud vincula la polución con graves riesgos sanitarios."},
    {q: "Consecuencia social de degradación del suelo:", o: ["Sube productividad", "Mejora seguridad alimentaria", "Baja presión migratoria", "Reducción de la producción de alimentos"], a: "Reducción de la producción de alimentos", f: "Suelos pobres no pueden sustentar a la población."},
    {q: "¿Iniciativa para limitar aumento a menos de 2ºC?", o: ["Montreal", "Acuerdo de París", "Kioto", "Pacto Verde"], a: "Acuerdo de París", f: "Es el compromiso internacional climático más importante."},
    {q: "¿Agenda global que integra sostenibilidad?", o: ["2020", "Europa 2020", "Agenda 2030", "Sendai"], a: "Agenda 2030", f: "Es el plan de acción de la ONU para las personas y el planeta."},
    {q: "¿ODS de acción por el clima?", o: ["ODS 3", "ODS 7", "ODS 12", "ODS 13"], a: "ODS 13", f: "Centrado específicamente en medidas urgentes contra el cambio climático."},
    {q: "¿Plan europeo para neutralidad en 2050?", o: ["Digital Europea", "Horizonte", "Pacto Verde Europeo", "Plan Juncker"], a: "Pacto Verde Europeo", f: "Hoja de ruta para hacer la economía de la UE sostenible."},
    {q: "Obstáculo para ODS en países en desarrollo:", o: ["Exceso tecnología", "Falta de financiación", "Mucha regulación", "Exceso recursos"], a: "Falta de financiación", f: "La falta de capital frena la implementación de infraestructuras verdes."},
    {q: "¿Qué agrava la desigualdad climática?", o: ["Pobres emiten más", "Ricos sufren más", "Países con menos emisiones son los más afectados", "Todos igual"], a: "Países con menos emisiones son los más afectados", f: "Países vulnerables pagan el precio de las emisiones de países industrializados."},
    {q: "¿Práctica que reduce huella ecológica?", o: ["Combustibles fósiles", "Economía circular", "Más plásticos", "Externalización"], a: "Economía circular", f: "Optimiza recursos y minimiza la extracción de materias vírgenes."},
    {q: "¿Enfoque imprescindible ante la crisis?", o: ["Acciones aisladas", "Solo tecnología", "Cooperación internacional y acción colectiva", "Corto plazo"], a: "Cooperación internacional y acción colectiva", f: "Un problema global requiere soluciones coordinadas entre naciones."}
    ]
  },
  {
    moduleId: 'sus-u2',
    data: [
    {q: "¿Cómo define el informe Brundtland el desarrollo sostenible?", o: ["Crecimiento ilimitado", "Cubrir necesidades presentes sin comprometer las futuras", "Protección ambiental sola", "Reducción consumo"], a: "Cubrir necesidades presentes sin comprometer las futuras", f: "Definición clásica que busca la equidad intergeneracional."},
    {q: "Impacto principal de sistemas productivos:", o: ["Solo biodiversidad", "Consumo recursos, residuos y emisiones", "Mejora ecosistemas", "Neutralidad"], a: "Consumo recursos, residuos y emisiones", f: "La actividad industrial consume materiales y genera contaminación."},
    {q: "¿Cuál es uno de los tres pilares del desarrollo sostenible?", o: ["Tecnológico", "Cultural", "Ambiental", "Digital"], a: "Ambiental", f: "Los pilares son Económico, Social y Ambiental."},
    {q: "Modelo 'extraer, producir y desechar':", o: ["Circular", "Lineal", "Colaborativo", "Verde"], a: "Lineal", f: "Modelo tradicional basado en el consumo finito de recursos."},
    {q: "Ventaja empresarial de la sostenibilidad:", o: ["Sube costes", "Menos competencia", "Mejora reputación corporativa", "Menos innovación"], a: "Mejora reputación corporativa", f: "Los consumidores valoran positivamente a las empresas responsables."},
    {q: "Estrategia que busca reducir residuos reutilizando:", o: ["Transición energética", "Producción limpia", "Economía circular", "Externalización"], a: "Economía circular", f: "Cierra el ciclo de vida de los materiales."},
    {q: "Ejemplo de transición energética:", o: ["Uso carbón", "Paneles solares en fábricas", "Más consumo", "Petróleo"], a: "Paneles solares en fábricas", f: "Paso de fuentes fósiles a fuentes renovables."},
    {q: "¿Qué persigue la producción más limpia?", o: ["Más extracción", "Minimizar impactos en todas las etapas", "Trasladar residuos", "Reducir eficiencia"], a: "Minimizar impactos en todas las etapas", f: "Busca la eficiencia máxima reduciendo contaminación desde el origen."},
    {q: "¿Qué recurso se regenera igual o superior a su consumo?", o: ["No renovable", "Renovable", "Mineral", "Fósil"], a: "Renovable", f: "Recursos que se mantienen en el tiempo si no se sobreexplotan."},
    {q: "¿Cuál es un recurso no renovable?", o: ["Solar", "Viento", "Biomasa", "Petróleo"], a: "Petróleo", f: "Su regeneración tarda millones de años, por lo que es finito."},
    {q: "Consecuencia de extracción de no renovables:", o: ["Suelo mejor", "Menos cambio climático", "Contaminación agua y degradación suelo", "Más biodiversidad"], a: "Contaminación agua y degradación suelo", f: "La minería y el petróleo suelen causar daños geológicos y químicos."},
    {q: "Reto de explotación intensiva de no renovables:", o: ["Más regeneración", "Agotamiento del recurso", "Menos dependencia", "Menos contaminación"], a: "Agotamiento del recurso", f: "Al no regenerarse, el stock disponible desaparece eventualmente."},
    {q: "Ventaja de recursos renovables:", o: ["Más contaminantes", "Limitados", "Indefinidos si se gestionan bien", "Sin tecnología"], a: "Indefinidos si se gestionan bien", f: "Son fuentes inagotables a escala humana."},
    {q: "Estrategia para recursos renovables:", o: ["Uso ineficiente", "Restauración de ecosistemas y uso eficiente", "Sobreexplotación", "Dependencia fósil"], a: "Restauración de ecosistemas y uso eficiente", f: "Asegura que la capacidad de regeneración no se vea superada."},
    {q: "Acción para gestionar mejor no renovables:", o: ["Subir extracción", "Bajar reciclaje", "Transición energética hacia renovables", "Usar carbón"], a: "Transición energética hacia renovables", f: "Reduce la necesidad de extraer combustibles fósiles."},
    {q: "Beneficio de sostenibilidad para empresas:", o: ["Baja reputación", "Incumplimiento", "Optimización del uso de recursos y reducción de costes", "Baja innovación"], a: "Optimización del uso de recursos y reducción de costes", f: "Ser eficiente ahorra dinero en materias primas y energía."},
    {q: "Papel de tecnología en sostenibilidad:", o: ["Sube impacto", "Monitorear y optimizar procesos", "Quita planificación", "Sube consumo"], a: "Monitorear y optimizar procesos", f: "Permite mayor control sobre las emisiones y recursos."},
    {q: "¿Qué sector consume el 50% de recursos extraídos?", o: ["Educación", "Sector industrial/productivo", "Turismo", "Cultura"], a: "Sector industrial/productivo", f: "La industria es el mayor consumidor material del planeta."},
    {q: "Estrategia que reduce dependencia fósil:", o: ["Lineal", "Transición energética", "Externalización", "Sobreexplotación"], a: "Transición energética", f: "Moverse a solar, eólica o hidroeléctrica."},
    {q: "Enfoque clave para sostenibilidad a largo plazo:", o: ["Uso indiscriminado", "Gestión responsable, innovación y cooperación", "Beneficio corto", "Centralizar"], a: "Gestión responsable, innovación y cooperación", f: "Es el resumen de la estrategia global sostenible."}
    ]
  },
  {
    moduleId: 'sus-u3',
    data: [
    {q: "¿Qué caracteriza al modelo circular frente al lineal?", o: ["Producir más rápido", "Extraer y desechar", "Busca ciclos regenerativos", "Baja renovables"], a: "Busca ciclos regenerativos", f: "El residuo se convierte en recurso."},
    {q: "Modelo que la economía circular pretende sustituir:", o: ["Colaborativo", "Modelo lineal", "Servicios", "Digital"], a: "Modelo lineal", f: "El modelo lineal es insostenible."},
    {q: "Práctica de economía circular:", o: ["Incinerar", "Subir consumo", "Reutilizar y reciclar materiales", "Externalizar"], a: "Reutilizar y reciclar materiales", f: "Mantiene los materiales dentro del sistema económico."},
    {q: "¿Qué principio NO forma parte de las 3R clásicas?", o: ["Reducir", "Reutilizar", "Reparar", "Reciclar"], a: "Reparar", f: "Reparar pertenece a las 7R; las 3R clásicas son Reducir, Reutilizar y Reciclar."},
    {q: "Ampliación del modelo 3R mencionada:", o: ["4R", "5R", "6R", "7R"], a: "7R", f: "El tema detalla el modelo de las 7R (Rediseñar, Reparar, etc.)."},
    {q: "¿Cuál pertenece a las 7R?", o: ["Rediseñar", "Refinar", "Reprogramar", "Reemplazar"], a: "Rediseñar", f: "Rediseñar para que el producto sea circular desde el inicio."},
    {q: "¿Qué persigue el rediseño?", o: ["Subir materias primas", "Prolongar vida útil y reducir residuos", "Más complejo", "Obsolescencia"], a: "Prolongar vida útil y reducir residuos", f: "Ecodiseño para durabilidad y reciclaje."},
    {q: "¿Qué caracteriza a la remanufactura?", o: ["Destruir", "Restaurar productos a su estado original", "Fabrica nuevos", "Quita reciclaje"], a: "Restaurar productos a su estado original", f: "Da una segunda vida al producto como si fuera nuevo."},
    {q: "Tecnología para rastrear materiales:", o: ["Robótica", "Blockchain", "Realidad virtual", "Ofimática"], a: "Blockchain", f: "Garantiza la trazabilidad e inmutabilidad del dato de origen."},
    {q: "Papel del IoT en economía circular:", o: ["Sube consumo", "Prolongar vida útil mediante monitorización", "Quita mantenimiento", "Quita humanos"], a: "Prolongar vida útil mediante monitorización", f: "Mantenimiento predictivo gracias a sensores."},
    {q: "Beneficio económico de la economía circular:", o: ["Sube costes", "Menos competitividad", "Ahorro de materias primas y costes", "Dependencia"], a: "Ahorro de materias primas y costes", f: "Usar lo que ya tienes es más barato que extraer."},
    {q: "Sector prioritario en Plan Acción Europeo:", o: ["Turismo", "Educación", "Electrónica, plásticos, textiles y construcción", "Banca"], a: "Electrónica, plásticos, textiles y construcción", f: "Sectores con mayor generación de residuos."},
    {q: "Modelo de negocio que mantiene productos en uso:", o: ["Venta rápida", "Producto como servicio", "Producción masa", "Obsolescencia"], a: "Producto como servicio", f: "El fabricante es dueño del equipo y le interesa que dure mucho."},
    {q: "Rasgo que reduce emisiones de CO2:", o: ["Incineración", "Ciclos de materiales más limpios", "Combustibles fósiles", "Transporte"], a: "Ciclos de materiales más limpios", f: "Menos extracción significa menos emisiones energéticas."},
    {q: "Práctica de economía de intercambio:", o: ["Compra individual", "Plataformas para compartir recursos", "Subir consumo", "Sin alquiler"], a: "Plataformas para compartir recursos", f: "Como carsharing o alquiler de herramientas."},
    {q: "Definición de conservación del valor:", o: ["Uso único", "Prolongar vida útil y reutilizar componentes", "Reciclar al final solo", "Sustituir rápido"], a: "Prolongar vida útil y reutilizar componentes", f: "Mantener la funcionalidad técnica del objeto."},
    {q: "Innovación que convierte residuo en energía:", o: ["Suscripción", "Conversión de residuos en recursos", "Externalización", "Vertederos"], a: "Conversión de residuos en recursos", f: "Waste-to-energy o supra-reciclaje."},
    {q: "Material alternativo a plásticos tradicionales:", o: ["Petróleo", "Materiales de base biológica", "Metales", "PVC"], a: "Materiales de base biológica", f: "Plásticos a partir de almidón, caña de azúcar, etc."},
    {q: "Tecnología para análisis masivo de datos circulares:", o: ["Big data", "Email", "Ofimática", "Móvil"], a: "Big data", f: "Procesa grandes volúmenes para optimizar flujos de recursos."},
    {q: "Objetivo circular a largo plazo:", o: ["Maximizar extracción", "Quitar reciclaje", "Minimizar residuos y optimizar recursos", "Producción sin límite"], a: "Minimizar residuos y optimizar recursos", f: "Sostenibilidad material plena."}
    ]
  },
  {
    moduleId: 'sus-u4',
    data: [
    {q: "¿En qué año fue adoptada la Agenda 2030?", o: ["2010", "2020", "2018", "2015"], a: "2015", f: "Se adoptó por la Asamblea General de la ONU en septiembre de 2015."},
    {q: "¿Cuántos ODS componen la Agenda 2030?", o: ["12", "15", "17", "20"], a: "17", f: "Consta de 17 objetivos con 169 metas."},
    {q: "Principio de 'nadie debe quedar atrás':", o: ["Universalidad", "No exclusión", "Integración", "Subsidiariedad"], a: "No exclusión", f: "Es el lema central para garantizar derechos a los más vulnerables."},
    {q: "Objetivo principal del Pacto Verde Europeo:", o: ["Burocracia", "Neutralidad climática en 2050", "Sustituir industria", "Centralizar energía"], a: "Neutralidad climática en 2050", f: "Hacer de Europa el primer continente climáticamente neutro."},
    {q: "Instrumento europeo post-COVID:", o: ["FEDER", "Horizonte", "NextGenerationEU", "LIFE"], a: "NextGenerationEU", f: "Plan de recuperación masivo centrado en transición ecológica y digital."},
    {q: "Componente principal de NextGenerationEU:", o: ["FSE+", "FEDER", "Mecanismo de Recuperación y Resiliencia (MRR)", "Fondo Desarrollo"], a: "Mecanismo de Recuperación y Resiliencia (MRR)", f: "Es el núcleo financiero de los fondos de recuperación."},
    {q: "Plan que articula los fondos en España:", o: ["Estrategia Digital", "Plan de Recuperación, Transformación y Resiliencia", "Plan Empleo", "Agenda 2050"], a: "Plan de Recuperación, Transformación y Resiliencia", f: "Conocido como el Plan España Puede."},
    {q: "Uno de los cuatro ejes del Plan español:", o: ["Reindustrialización pesada", "Transformación digital", "Administración central", "Privatización"], a: "Transformación digital", f: "Junto a la transición ecológica, cohesión social e igualdad."},
    {q: "ODS de producción y consumo responsables:", o: ["ODS 9", "ODS 11", "ODS 12", "ODS 13"], a: "ODS 12", f: "Garantiza modalidades de consumo y producción sostenibles."},
    {q: "ODS de acción por el clima:", o: ["ODS 7", "ODS 10", "ODS 12", "ODS 13"], a: "ODS 13", f: "Medidas urgentes contra el cambio climático."},
    {q: "Fondo europeo para desigualdades regionales:", o: ["FSE", "FEDER", "MRR", "Horizonte"], a: "FEDER", f: "Fondo Europeo de Desarrollo Regional."},
    {q: "Objetivo del FSE+:", o: ["Energía", "Investigación", "Mejorar empleabilidad, formación e inclusión", "Defensa"], a: "Mejorar empleabilidad, formación e inclusión", f: "Es el principal fondo para invertir en personas."},
    {q: "ODS de igualdad de género:", o: ["ODS 3", "ODS 5", "ODS 8", "ODS 10"], a: "ODS 5", f: "Lograr la igualdad entre los géneros."},
    {q: "Hoja de ruta nacional para ODS:", o: ["Estrategia de Desarrollo Sostenible 2030", "España Circular", "Estrategia Verde", "Energía 2030"], a: "Estrategia de Desarrollo Sostenible 2030", f: "El documento que adapta los ODS al Reino de España."},
    {q: "Desafío para implementación de Agenda 2030:", o: ["Mucho dinero", "Desigualdades territoriales", "Falta objetivos", "Sin marcos"], a: "Desigualdades territoriales", f: "Diferencias entre regiones dificultan el cumplimiento homogéneo."},
    {q: "Administración clave para contexto local:", o: ["Solo estatal", "Solo Europa", "Comunidades autónomas y municipios", "Solo privado"], a: "Comunidades autónomas y municipios", f: "La 'localización' de los ODS ocurre en el territorio cercano."},
    {q: "ODS de alianzas globales:", o: ["ODS 14", "ODS 15", "ODS 16", "ODS 17"], a: "ODS 17", f: "Fortalecer medios de ejecución y alianzas para el desarrollo."},
    {q: "Política europea de economía circular:", o: ["PAC", "Estrategia Europea de Economía Circular", "Agua", "Seguridad"], a: "Estrategia Europea de Economía Circular", f: "Plan de acción clave para el modelo circular en la UE."},
    {q: "Dimensión NO clásica del desarrollo sostenible:", o: ["Económica", "Social", "Tecnológica", "Ambiental"], a: "Tecnológica", f: "El triángulo clásico es Social, Económico y Ambiental (la tecnología es un medio)."},
    {q: "Actores que deben colaborar:", o: ["Solo gobiernos", "Gobiernos, empresas y sociedad civil", "Solo UE", "Organizaciones sin locales"], a: "Gobiernos, empresas y sociedad civil", f: "Es un esfuerzo multiactor y multinivel."}
    ]
  },
  {
    moduleId: 'sus-u5',
    data: [
    {q: "Dimensión de ODS para biosfera y mares:", o: ["Económica", "Social", "Ambiental", "Tecnológica"], a: "Ambiental", f: "Se enfoca en la conservación de recursos naturales."},
    {q: "ODS de agua y saneamiento:", o: ["ODS 11", "ODS 6", "ODS 12", "ODS 15"], a: "ODS 6", f: "Agua limpia y saneamiento universal."},
    {q: "Directiva marco para gestión de agua:", o: ["Energías", "Directiva Marco del Agua", "Residuos", "Hábitats"], a: "Directiva Marco del Agua", f: "Norma principal de la UE para proteger las masas de agua."},
    {q: "Instrumento para neutralidad 2050:", o: ["Horizonte", "Agenda Urbana", "Pacto Verde Europeo", "Biodiversidad"], a: "Pacto Verde Europeo", f: "Marco general legislativo y político europeo."},
    {q: "ODS de energías renovables:", o: ["ODS 7", "ODS 13", "ODS 14", "ODS 15"], a: "ODS 7", f: "Energía asequible y no contaminante."},
    {q: "Política de explotación sostenible pesquera:", o: ["Agua", "PAC", "Política Pesquera Común", "Plásticos"], a: "Política Pesquera Común", f: "Regula las capturas y la sostenibilidad del mar."},
    {q: "Programa europeo para biodiversidad:", o: ["LIFE", "FEDER", "FSE+", "MRR"], a: "LIFE", f: "Único fondo europeo dedicado exclusivamente al medio ambiente."},
    {q: "Estrategia para reducir residuos en UE:", o: ["Biodiversidad", "Estrategia Europea de Economía Circular", "Agenda Urbana", "Digital"], a: "Estrategia Europea de Economía Circular", f: "Fomenta la reparación y el reciclaje."},
    {q: "Objetivo del ODS 13:", o: ["Agua universal", "Proteger mar", "Medidas urgentes contra el cambio climático", "Consumo responsable"], a: "Medidas urgentes contra el cambio climático", f: "Enfocado en mitigación y adaptación."},
    {q: "Plan español de transición energética 2021-2030:", o: ["DSEAR", "PNIEC", "España Circular", "Agenda Urbana"], a: "PNIEC", f: "Plan Nacional Integrado de Energía y Clima."},
    {q: "Meta UE 2030 de GEI:", o: ["Reducción 23%", "Neutralidad total", "Reducción 55%", "Reducción 15%"], a: "Reducción 55%", f: "Es el objetivo intermedio del paquete 'Objetivo 55'."},
    {q: "Porcentaje de generación eléctrica renovable en España 2030:", o: ["32%", "50%", "65%", "74%"], a: "74%", f: "Meta ambiciosa del PNIEC para el mix eléctrico."},
    {q: "Directiva que impulsa renovables:", o: ["Agua", "Directiva de Energías Renovables", "Hábitats", "Residuos"], a: "Directiva de Energías Renovables", f: "Establece el objetivo vinculante de energía limpia en la UE."},
    {q: "ODS que protege ecosistemas marinos:", o: ["ODS 12", "ODS 14", "ODS 11", "ODS 7"], a: "ODS 14", f: "Vida submarina."},
    {q: "Ley española contra plásticos no reutilizables:", o: ["Cambio Climático", "Ley de Residuos y Suelos Contaminados", "Evaluación Ambiental", "Aguas"], a: "Ley de Residuos y Suelos Contaminados", f: "Prohíbe plásticos de un solo uso (pajitas, cubiertos)."},
    {q: "Estrategia UE 30% territorio protegido 2030:", o: ["Estrategia de Biodiversidad 2030", "Economía Circular", "Agenda Urbana", "Digital"], a: "Estrategia de Biodiversidad 2030", f: "Plan para recuperar la naturaleza en Europa."},
    {q: "ODS de ecosistemas terrestres:", o: ["ODS 11", "ODS 12", "ODS 14", "ODS 15"], a: "ODS 15", f: "Vida de ecosistemas terrestres."},
    {q: "Instrumento español contra desertificación:", o: ["PNIEC", "Programa Nacional de Acción contra la Desertificación", "DSEAR", "Circular"], a: "Programa Nacional de Acción contra la Desertificación", f: "Enfocado en suelos áridos y erosión."},
    {q: "Estrategia española de economía circular 2030:", o: ["Urbana", "Sostenible", "Estrategia Española de Economía Circular 2030", "Calidad Aguas"], a: "Estrategia Española de Economía Circular 2030", f: "España Circular 2030 (EEEC)."},
    {q: "Iniciativa de reciclaje con incentivos:", o: ["LIFE", "Reciclos", "PNIEC", "URBAN"], a: "Reciclos", f: "Sistema de devolución y recompensa de Ecoembes."}
    ]
  },
  {
    moduleId: 'sus-u6',
    data: [
    {q: "ODS de erradicación de pobreza extrema:", o: ["ODS 2", "ODS 1", "ODS 10", "ODS 4"], a: "ODS 1", f: "Fin de la pobreza."},
    {q: "ODS de seguridad alimentaria y hambre:", o: ["ODS 8", "ODS 11", "ODS 2", "ODS 3"], a: "ODS 2", f: "Hambre cero."},
    {q: "ODS de acceso universal a la salud:", o: ["ODS 3", "ODS 5", "ODS 4", "ODS 10"], a: "ODS 3", f: "Salud y bienestar."},
    {q: "ODS de educación de calidad:", o: ["ODS 10", "ODS 1", "ODS 4", "ODS 16"], a: "ODS 4", f: "Educación inclusiva y equitativa."},
    {q: "ODS de trabajo decente:", o: ["ODS 11", "ODS 8", "ODS 3", "ODS 12"], a: "ODS 8", f: "Trabajo decente y crecimiento económico."},
    {q: "ODS para reducir desigualdades entre países:", o: ["ODS 10", "ODS 5", "ODS 16", "ODS 2"], a: "ODS 10", f: "Reducción de las desigualdades."},
    {q: "ODS de igualdad de género:", o: ["ODS 4", "ODS 1", "ODS 5", "ODS 13"], a: "ODS 5", f: "Igualdad de género."},
    {q: "ODS de instituciones sólidas:", o: ["ODS 16", "ODS 9", "ODS 7", "ODS 14"], a: "ODS 16", f: "Paz, justicia e instituciones sólidas."},
    {q: "Política europea que apoya colectivos vulnerables:", o: ["FEDER", "FSE+", "Horizonte", "LIFE"], a: "FSE+", f: "Fondo Social Europeo Plus."},
    {q: "Apoyo económico mínimo en España a familias:", o: ["Desempleo", "Ingreso Mínimo Vital (IMV)", "Renta básica", "Hijo a cargo"], a: "Ingreso Mínimo Vital (IMV)", f: "Prestación no contributiva de la Seguridad Social."},
    {q: "Programa europeo de movilidad educativa:", o: ["Erasmus+", "FEDER", "FEAD", "LIFE"], a: "Erasmus+", f: "Fomenta la movilidad en educación y formación."},
    {q: "Ley educativa española de equidad:", o: ["LOMCE", "LOGSE", "LOMLOE", "LOE"], a: "LOMLOE", f: "Ley Orgánica por la que se modifica la LOE (Ley Celaá)."},
    {q: "Institución que garantiza salud universal en España:", o: ["INE", "Sistema Nacional de Salud (SNS)", "Trabajo", "Seguridad Social"], a: "Sistema Nacional de Salud (SNS)", f: "Acceso público y universal a la sanidad."},
    {q: "Fondo europeo para empleabilidad y pymes:", o: ["MRR", "FEDER", "FSE+", "FEAGA"], a: "FSE+", f: "Es el principal instrumento para empleo y cohesión social."},
    {q: "Política UE para agricultura sostenible:", o: ["Pesquera", "Política Agraria Común (PAC)", "Biodiversidad", "Agua"], a: "Política Agraria Común (PAC)", f: "Apoya a agricultores para garantizar suministro y sostenibilidad."},
    {q: "Zonas urbanas con difícil acceso a comida sana:", o: ["Resiliencia", "Desiertos alimentarios", "Cinturones verdes", "Innovación"], a: "Desiertos alimentarios", f: "Barrios sin tiendas de producto fresco."},
    {q: "Iniciativa contra desigualdad en España 2021-2027:", o: ["PNIEC", "Estrategia Nacional de Inclusión Social 2021–2027", "Circular", "Urbana"], a: "Estrategia Nacional de Inclusión Social 2021–2027", f: "Enfocada en combatir la pobreza."},
    {q: "Estrategia UE de 'gender mainstreaming':", o: ["Digital", "Estrategia para la Igualdad de Género 2020–2025", "Horizonte", "Pacto Verde"], a: "Estrategia para la Igualdad de Género 2020–2025", f: "Integra la perspectiva de género en todas las políticas."},
    {q: "Ley española de igualdad efectiva M/H:", o: ["1/2004", "Ley Orgánica 3/2007", "39/2006", "27/2013"], a: "Ley Orgánica 3/2007", f: "Ley para la igualdad efectiva de mujeres y hombres."},
    {q: "Impacto económico de igualdad de género en UE:", o: ["Baja PIB", "Incremento del PIB potencial de la UE", "Estancamiento", "Desempleo juvenil"], a: "Incremento del PIB potencial de la UE", f: "Mejorar la igualdad impulsa el crecimiento económico."}
    ]
  },
  {
    moduleId: 'sus-u7',
    data: [
    {q: "¿Qué es la RSC?", o: ["Obligación multinacionales", "Modelo de gestión que integra impactos sociales, económicos y ambientales", "Filantropía aislada", "Marketing"], a: "Modelo de gestión que integra impactos sociales, económicos y ambientales", f: "Gestión proactiva del impacto empresarial."},
    {q: "¿Diferencia RSC vs cumplimiento legal?", o: ["Opcional sin impacto", "Donaciones puntuales", "Compromiso voluntario y proactivo", "Solo RRHH"], a: "Compromiso voluntario y proactivo", f: "Va más allá de lo que exige la ley."},
    {q: "¿Grupo NO considerado stakeholder?", o: ["Empleados", "Clientes", "Competidores", "Comunidades"], a: "Competidores", f: "Suelen ser Empleados, Clientes, Accionistas, Proveedores y Sociedad."},
    {q: "Uno de los cinco principios de RSC:", o: ["Beneficio corto", "Cumplimiento legal", "Externalización", "Centralización"], a: "Cumplimiento legal", f: "Es la base mínima sobre la que se construye la RSC."},
    {q: "Principio de 'alcance global' de RSC:", o: ["Sede central", "País origen", "Extender RSC a todas las actividades y ubicaciones", "Filantropía"], a: "Extender RSC a todas las actividades y ubicaciones", f: "Se aplica a toda la multinacional y su cadena."},
    {q: "Organización de convenios laborales:", o: ["OMS", "OCDE", "OIT", "FMI"], a: "OIT", f: "Organización Internacional del Trabajo."},
    {q: "Práctica de derechos laborales:", o: ["Prohibir negociación", "Fomentar la libertad de asociación", "Externalizar sin control", "Menos formación"], a: "Fomentar la libertad de asociación", f: "Derecho a sindicación y negociación colectiva."},
    {q: "Ámbito RSC de aire, agua y biodiversidad:", o: ["Consumidor", "Medio ambiente", "Salud", "Fiscalidad"], a: "Medio ambiente", f: "Dimensión ecológica de la RSC."},
    {q: "¿Derecho del consumidor en RSC?", o: ["Publicidad intensiva", "Derecho a la información y a elegir", "Exclusividad", "Devolución ilimitada"], a: "Derecho a la información y a elegir", f: "Transparencia con el cliente."},
    {q: "Instrumento prevención daño ambiental:", o: ["París", "Kioto", "Declaración de Río de 1992", "Basilea"], a: "Declaración de Río de 1992", f: "Consagra el principio de precaución."},
    {q: "Concepto que extiende responsabilidad a cadena de valor:", o: ["Filantropía", "Empresa extendida", "Economía social", "Gobierno"], a: "Empresa extendida", f: "La empresa es responsable de sus proveedores."},
    {q: "Filantropía estratégica:", o: ["Acciones aisladas", "Integración de acciones responsables en la misión", "Donaciones puntuales", "Voluntariado"], a: "Integración de acciones responsables en la misión", f: "Vincula el impacto social con el negocio."},
    {q: "Ámbito RSC contra corrupción:", o: ["Marketing", "Transparencia y buen gobierno", "Consumidor", "Salud"], a: "Transparencia y buen gobierno", f: "Ética en la gestión directiva."},
    {q: "Práctica de transparencia:", o: ["Publicar estados financieros y realizar auditorías", "Limitar info", "Bajar controles", "Sin supervisión"], a: "Publicar estados financieros y realizar auditorías", f: "Rendición de cuentas ante la sociedad."},
    {q: "¿Qué es un informe de sostenibilidad?", o: ["Documento interno", "Informe financiero", "Documento que comunica impactos sociales, ambientales y económicos", "Plan marketing"], a: "Documento que comunica impactos sociales, ambientales y económicos", f: "Memorias de sostenibilidad (ej. GRI)."},
    {q: "Norma internacional de directrices RS:", o: ["ISO 9001", "ISO 14001", "ISO 26000", "ISO 45001"], a: "ISO 26000", f: "Es la guía para implementar responsabilidad social."},
    {q: "Práctica de compras responsables:", o: ["Precio más bajo", "Exigir a proveedores cumplimiento estándares", "Cambiar sin evaluar", "Externalizar riesgo"], a: "Exigir a proveedores cumplimiento estándares", f: "Asegura una cadena de suministro ética."},
    {q: "¿Compañía que integra ESG en inversión?", o: ["Repsol", "Mapfre", "Inditex", "Banco Santander"], a: "Banco Santander", f: "Ejemplo de finanzas sostenibles en el texto."},
    {q: "Ley de información no financiera en España:", o: ["2/2011", "26/2003", "3/2007", "Ley 11/2018"], a: "Ley 11/2018", f: "Obliga a reportar el desempeño extra-financiero."},
    {q: "Objetivo estratégico de RSC:", o: ["Bajar competitividad", "Solo legal", "Aumentar valor añadido y competitividad de forma sostenible", "Sustituir estrategia"], a: "Aumentar valor añadido y competitividad de forma sostenible", f: "Busca el éxito a largo plazo."}
    ]
  },
  {
    moduleId: 'sus-u8',
    data: [
    {q: "Función de sistemas de certificación:", o: ["Quitar ley", "Proporcionar marco verificable de buenas prácticas", "Marketing solo", "Dinero rápido"], a: "Proporcionar marco verificable de buenas prácticas", f: "Permiten auditar y certificar el desempeño."},
    {q: "¿Organización de normas ISO?", o: ["Comisión", "Organización Internacional de Normalización", "Medio Ambiente", "OCDE"], a: "Organización Internacional de Normalización", f: "International Organization for Standardization."},
    {q: "Norma ISO de gestión ambiental:", o: ["ISO 9001", "ISO 26000", "ISO 50001", "ISO 14001"], a: "ISO 14001", f: "Certifica el Sistema de Gestión Ambiental (SGA)."},
    {q: "¿Con qué ODS se relaciona ISO 14001?", o: ["ODS 4", "ODS 7", "ODS 12", "ODS 9"], a: "ODS 12", f: "Producción y consumo responsables."},
    {q: "Certificación de construcción sostenible:", o: ["FSC", "LEED", "Fairtrade", "MSC"], a: "LEED", f: "Leadership in Energy and Environmental Design."},
    {q: "Certificación de gestión forestal sostenible:", o: ["Rainforest", "EU Ecolabel", "FSC", "Energy Star"], a: "FSC", f: "Forest Stewardship Council."},
    {q: "Certificación de comercio justo:", o: ["Fairtrade", "LEED", "GOTS", "ISO 9001"], a: "Fairtrade", f: "Garantiza precios justos a productores."},
    {q: "Objetivo de certificación ISO:", o: ["Financiación", "Demostrar conformidad con estándares internacionales", "Quitar auditorías", "Quitar personal"], a: "Demostrar conformidad con estándares internacionales", f: "Valida externamente el sistema de la empresa."},
    {q: "¿Qué se revisa en Fase 1 de auditoría ISO?", o: ["Entrevistas", "Acciones correctivas", "Revisión documental del sistema de gestión", "Emisión certificado"], a: "Revisión documental del sistema de gestión", f: "Se comprueba si la documentación cumple con la norma."},
    {q: "¿Qué ocurre tras detectar no conformidades?", o: ["Certificado auto", "Se archiva", "La organización debe implantar acciones correctivas", "Cero correcciones"], a: "La organización debe implantar acciones correctivas", f: "Es obligatorio subsanar fallos para certificarse."},
    {q: "Beneficio de implantar ISO 14001:", o: ["Subir consumo", "Cumplir normativa ambiental y reducir costes", "Evitar controles", "Bajar transparencia"], a: "Cumplir normativa ambiental y reducir costes", f: "Reduce multas y mejora eficiencia energética."},
    {q: "¿Qué son las ecoetiquetas?", o: ["Publicidad verde", "Certificaciones ambientales de productos y servicios", "Impuestos", "Subvenciones"], a: "Certificaciones ambientales de productos y servicios", f: "Informan sobre el impacto ecológico del producto."},
    {q: "¿ODS relacionado con ecoetiquetas?", o: ["ODS 3", "ODS 9", "ODS 12", "ODS 16"], a: "ODS 12", f: "Ayuda al consumo responsable."},
    {q: "¿Qué caracteriza ecoetiquetas Tipo I?", o: ["Autodeclaración", "Sin verificación", "Son certificadas por terceros independientes", "Solo energía"], a: "Son certificadas por terceros independientes", f: "Tienen verificación externa rigurosa."},
    {q: "Tipo de ecoetiqueta de autodeclaración del fabricante:", o: ["Tipo III", "Tipo II (ISO 14021)", "Tipo I", "EU Ecolabel"], a: "Tipo II (ISO 14021)", f: "Símbolos como 'reciclable' sin sello externo obligatorio."},
    {q: "Ecoetiqueta europea de bajo impacto ambiental:", o: ["Energy Star", "Ángel Azul", "EU Ecolabel", "GOTS"], a: "EU Ecolabel", f: "La 'Ecolabel' de la flor europea."},
    {q: "Distintivo de pesca sostenible:", o: ["MSC", "FSC", "Fairtrade", "Rainforest"], a: "MSC", f: "Marine Stewardship Council."},
    {q: "Etiqueta de agricultura ecológica en UE:", o: ["EU Ecolabel", "Eurohoja", "GOTS", "Energy Star"], a: "Eurohoja", f: "Logo verde con estrellas en forma de hoja."},
    {q: "Papel de ecoetiquetas para consumidores:", o: ["Confusión", "Facilitar decisiones de compra responsables", "Quitar ley", "Quitar info"], a: "Facilitar decisiones de compra responsables", f: "Ayudan a distinguir qué productos son mejores para el planeta."},
    {q: "Objetivo Pacto Verde apoyado por ecoetiquetas:", o: ["Subir recursos", "Bajar transparencia", "Avanzar hacia una economía circular y neutra", "Quitar competencia"], a: "Avanzar hacia una economía circular y neutra", f: "Promueven productos eficientes y reciclables."}
    ]
  }
];

const mappedQuestions = [];
let globalIndex = 697;

rawSections.forEach(section => {
  section.data.forEach((q, i) => {
    let opts = q.o.map((text, idx) => ({
      id: String.fromCharCode(97 + idx),
      text: text
    }));
    
    let correctOpt = opts.find(opt => q.a.includes(opt.text) || opt.text.includes(q.a));
    let correctId = correctOpt ? correctOpt.id : 'a';
    
    mappedQuestions.push({
      id: "sus-q" + String(globalIndex).padStart(3, '0'),
      subjectId: 'sustainability',
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

console.log('Successfully added ' + mappedQuestions.length + ' Sustainability questions. Total: ' + combined.length);
