const fs = require('fs');

const rawSections = [
  {
    moduleId: 'pmdm-u1',
    data: [
        {q: "1. ¿Cuál es la salida del siguiente código?\nfun main() {\n  val mensaje = if (25 >= 18) \"Mayor de edad\" else \"Menor de edad\"\n  println(mensaje)\n}", o: ["Mayor de edad", "Menor de edad", "null", "No imprime nada"], a: "Mayor de edad", f: "En Kotlin, 'if' es una expresión que devuelve un valor. Como la condición es verdadera, devuelve la primera cadena."},
        {q: "2. En este fragmento, ¿qué valor tiene longitud al final?\nval nombre: String? = null\nval longitud = nombre?.length ?: 0", o: ["3", "0", "null", "Error de compilación"], a: "0", f: "Se utiliza el operador safe call (?.) y el operador elvis (?:). Al ser nombre nulo, se toma el valor por defecto 0."},
        {q: "3. ¿Qué imprime este bucle for?\nfor (i in 1..5) { print(i) }", o: ["12345", "123456", "01234", "54321"], a: "12345", f: "El rango '1..5' es inclusivo, por lo que imprime los números del 1 al 5 ambos incluidos."},
        {q: "4. ¿Cuál es el resultado de la comparación 'u1 == u2' con data class si u2 es una copia de u1?", o: ["false", "true", "Error de compilación", "null"], a: "true", f: "Las 'data class' en Kotlin implementan automáticamente equals(), comparando el contenido de sus propiedades."},
        {q: "5. ¿Qué valor tiene resultado en: 'listOf(1, 2, 3, 4).filter { it % 2 == 0 }'?", o: ["[2, 4]", "[1, 3]", "[1, 2, 3, 4]", "[]"], a: "[2, 4]", f: "La función 'filter' devuelve solo los elementos que cumplen la condición (en este caso, números pares)."},
        {q: "6. ¿Qué hace el operador !! en Kotlin?", o: ["Devuelve null si es null", "Convierte a tipo no nullable y lanza excepción si es null", "Proporciona valor por defecto", "Llamada segura"], a: "Convierte a tipo no nullable y lanza excepción si es null", f: "Es el operador de aserción no nula (not-null assertion), que fuerza el tipo pero arriesga un NullPointerException."},
        {q: "7. En una expresión 'when' con dia = 3, ¿cuál es la salida?", o: ["Lunes", "Martes", "Miércoles", "Otro"], a: "Miércoles", f: "La estructura 'when' evalúa el valor y ejecuta la rama correspondiente al número 3."},
        {q: "8. ¿Qué tipo de colección devuelve 'lista.filter { ... }'?", o: ["Set", "List", "Array", "MutableList"], a: "List", f: "Por defecto, las funciones de transformación sobre colecciones en Kotlin devuelven una nueva List (inmutable)."},
        {q: "9. En Android, ¿qué hace: Intent(Intent.ACTION_VIEW, Uri.parse('https://google.com'))?", o: ["Abre navegador con Google", "Envía email", "Abre nueva Activity", "Lanza servicio"], a: "Abre navegador con Google", f: "Es un Intent implícito que utiliza la acción VIEW para mostrar un recurso URI."},
        {q: "10. ¿Cuál es el backing field en un setter personalizado?", o: ["edad", "field", "value", "this.edad"], a: "field", f: "En Kotlin, 'field' es el identificador especial para acceder directamente a la propiedad dentro de sus accesores."},
        {q: "11. ¿Qué imprime 'for (i in 10 downTo 8) { print(i) }'?", o: ["108", "123", "1098", "876"], a: "1098", f: "downTo crea un rango descendente inclusivo (10, 9, 8)."},
        {q: "12. ¿Qué valor tiene 'area' en una propiedad con 'get() = ancho * alto'?", o: ["Suma", "Producto de ancho por alto", "Perímetro", "null"], a: "Producto de ancho por alto", f: "Es una propiedad calculada (custom getter) que se computa cada vez que se accede a ella."},
        {q: "13. ¿Qué hace la extensión 'String.esPalindromo()' mencionada?", o: ["Cuenta vocales", "Invierte la cadena", "Verifica si es palíndromo", "Mayúsculas"], a: "Verifica si es palíndromo", f: "Limpia espacios, pone en minúscula y compara la cadena con su versión invertida (reversed())."},
        {q: "14. En el ciclo de vida Android, ¿qué método se ejecuta primero?", o: ["onStart()", "onCreate()", "onResume()", "onPause()"], a: "onCreate()", f: "onCreate es el primer método del ciclo de vida que se llama cuando se crea la Activity."},
        {q: "15. ¿Qué devuelve una función genérica con 'where T : Comparable' que compara (a > b)?", o: ["El mayor de los dos", "Siempre el primero", "Error", "null"], a: "El mayor de los dos", f: "Al estar restringido a Comparable, permite usar operadores de comparación para hallar el máximo."},
        {q: "16. En una corrutina runBlocking { launch { delay(1000); print('Mundo!') }; print('Hola,') }", o: ["Hola, Mundo!", "Mundo! Hola,", "Solo Hola,", "Error"], a: "Hola, Mundo!", f: "launch es no bloqueante; se imprime 'Hola,' inmediatamente y 'Mundo!' tras el delay de 1 segundo."},
        {q: "17. En 'Intent(this, SecondActivity::class.java)', ¿qué Activity se lanza?", o: ["MainActivity", "SecondActivity", "Nombre genérico", "Ninguna"], a: "SecondActivity", f: "Es un Intent explícito indicando la clase de destino."},
        {q: "18. ¿Qué método maneja el click en un elemento de un ListView?", o: ["onClickListener", "onItemClickListener", "onBindViewHolder", "getView"], a: "onItemClickListener", f: "Es el listener específico para detectar la interacción con los ítems de una lista clásica."},
        {q: "19. ¿Qué hace un filtro de intent en AndroidManifest con action.SEND y text/plain?", o: ["Abre URLs", "Lanza servicios", "Envía emails", "Recibe intents para compartir texto"], a: "Recibe intents para compartir texto", f: "Declara la capacidad de la Activity para procesar datos de tipo texto compartidos por otras apps."},
        {q: "20. En RecyclerView, ¿qué método procesa/rellena los datos visuales?", o: ["onCreateViewHolder", "onBindViewHolder", "getItemCount", "onViewRecycled"], a: "onBindViewHolder", f: "Asocia los datos de la colección con los componentes de la interfaz de cada ítem."},
        {q: "21. ¿Qué imprime un catch de '123a'.toInt()?", o: ["Imprime el mensaje de error", "Error compilación", "123", "NPE"], a: "Imprime el mensaje de error", f: "Captura la NumberFormatException producida al intentar convertir caracteres no numéricos."},
        {q: "22. En 'runBlocking { val job = launch { ... }; println(\"Launch\") }', ¿qué se imprime primero?", o: ["Solo Launch", "Done Launch", "Launch Done", "Error"], a: "Launch Done", f: "La corrutina lanzada se ejecuta de fondo, permitiendo que el hilo principal imprima 'Launch' primero."},
        {q: "23. ¿Qué se recomienda para la comunicación de un Fragment hacia su Activity?", o: ["OnClickListener", "Listener personalizado", "OnActivityResult", "Bundle"], a: "Listener personalizado", f: "Se define una interfaz en el Fragment que la Activity debe implementar para recibir eventos."},
        {q: "24. ¿Qué LayoutManager necesita un RecyclerView para una lista vertical estándar?", o: ["ListViewManager", "LinearLayoutManager", "ConstraintLayout", "RelativeLayout"], a: "LinearLayoutManager", f: "Es el gestor responsable de posicionar los elementos de forma lineal vertical u horizontal."},
        {q: "25. ¿Qué devuelve 'listOf(1, 2, 3, 4).fold(0) { acc, n -> acc + n }'?", o: ["10", "6", "4", "0"], a: "10", f: "fold acumula los valores empezando por un valor inicial (0), sumándolos todos (1+2+3+4)."},
        {q: "26. En Activity con resultado, ¿qué método de respuesta recibe los datos?", o: ["RESULT_OK", "0", "REQUEST_CODE", "onActivityResult"], a: "onActivityResult", f: "Es el callback donde se reciben los datos devueltos por una Activity lanzada con startActivityForResult."},
        {q: "27. ¿Qué hace la propiedad delegada 'by lazy { ... }'?", o: ["Observable", "Inicialización perezosa", "Backing field", "Extension"], a: "Inicialización perezosa", f: "El valor se calcula solo la primera vez que se accede a la propiedad (Lazy initialization)."},
        {q: "28. ¿Qué método reemplaza un Fragment dinámicamente en un contenedor?", o: ["attach()", "add()", "replace()", "show()"], a: "replace()", f: "Se usa dentro de una FragmentTransaction para sustituir el fragmento actual por uno nuevo."},
        {q: "29. Resultado de '(1..1000000).asSequence().filter{it%2==0}.take(3).toList()'?", o: ["Procesa toda la lista", "[4, 16, 36]", "Error memoria", "[]"], a: "[4, 16, 36]", f: "Las secuencias son perezosas; solo procesan los elementos necesarios para obtener los 3 primeros resultados pares al cuadrado."},
        {q: "30. Para usar una Toolbar como ActionBar en una Activity, se usa:", o: ["setSupportActionBar(toolbar)", "findViewById", "inflateMenu", "onCreateOptionsMenu"], a: "setSupportActionBar(toolbar)", f: "Este método configura la Toolbar para que actúe con las capacidades de la ActionBar clásica."}
    ]
  },
  {
    moduleId: 'pmdm-u2',
    data: [
        {q: "1. ¿Qué imprime el siguiente código?\nval nombre = \"Ana\"\nval saludo = \"Hola, $nombre!\"\nprintln(saludo)", o: ["Hola, {nombre}!", "Hola, nombre!", "Hola, Ana!", "$nombre Hola!"], a: "Hola, Ana!", f: "Kotlin utiliza String Templates mediante el símbolo $ para interpolar variables en cadenas de texto."},
        {q: "2. ¿Qué ocurrirá al ejecutar: var nombre: String = \"Juan\"; nombre = null?", o: ["Imprime 'null' sin error", "Imprime una cadena vacía", "Lanza error de compilación", "Lanza excepción en tiempo de ejecución"], a: "Lanza error de compilación", f: "Por defecto, los tipos en Kotlin no admiten nulos a menos que se declaren explícitamente con el signo de interrogación (String?)."},
        {q: "3. ¿Qué tipo tiene la variable resultado en: val resultado = 5.toDouble() / 2?", o: ["Int", "Float", "Double", "Long"], a: "Double", f: "Al convertir uno de los operandos a Double, el resultado de la división se promociona automáticamente a Double."},
        {q: "4. ¿Qué muestra por pantalla: listOf(1, 2, 3, 4).filter { it % 2 == 0 }?", o: ["[1,2,3]", "[2, 4]", "[1,3]", "[ ]"], a: "[2, 4]", f: "La función filter devuelve una lista con los elementos que cumplen la condición; en este caso, los números pares."},
        {q: "5. ¿Qué imprime: val nombre: String? = null; println(nombre?.length ?: 0)?", o: ["null", "0", "-1", "Lanza excepción"], a: "0", f: "El operador Elvis (?:) devuelve el valor de la derecha si la expresión de la izquierda resulta en nulo."},
        {q: "6. ¿Qué valor toma mensaje: val edad = 20; val mensaje = if (edad >= 18) 'Mayor' else 'Menor'?", o: ["null", "Mayor de edad", "Menor de edad", "Lanza excepción"], a: "Mayor de edad", f: "En Kotlin, 'if' es una expresión que devuelve un valor basado en la evaluación de la condición."},
        {q: "7. Resultado de comparar dos data class iguales (Usuario1 == Usuario2):", o: ["false", "true", "Depende del sistema", "No compila"], a: "true", f: "Las data class implementan automáticamente equals(), comparando los valores de sus propiedades en lugar de las referencias de memoria."},
        {q: "8. ¿Qué hace 'fun Persona.saludar() { ... }'?", o: ["Crea una clase abstracta", "Declara una función de extensión", "Declara una interfaz", "Produce error"], a: "Declara una función de extensión", f: "Las extensiones permiten añadir nuevas funciones a clases existentes sin necesidad de heredar de ellas."},
        {q: "9. ¿Qué se imprime: val n = arrayOf(1,2,3); n[0]=10; println(n.joinToString())?", o: ["1, 2, 3", "2, 3, 4", "10, 2, 3", "2, 3, 10"], a: "10, 2, 3", f: "Los Arrays en Kotlin son mutables, permitiendo cambiar el valor de sus posiciones mediante el índice."},
        {q: "10. ¿Qué ocurrirá al ejecutar: val texto: String? = \"Hola\"; println(texto!!.length)?", o: ["Lanza NullPointerException", "Imprime 4", "Imprime 0", "Error de compilación"], a: "Imprime 4", f: "El operador !! fuerza la conversión a tipo no nulo. Como el texto no es nulo, devuelve su longitud correctamente."},
        {q: "11. ¿Qué valor se imprime en un bucle 'for (i in 1..5 step 2)' sumando i?", o: ["9", "6", "15", "5"], a: "9", f: "El bucle recorre los valores 1, 3 y 5 (paso de 2). La suma es 1+3+5 = 9."},
        {q: "12. Salida de: val mapa = mapOf(1 to \"uno\"); println(mapa[3] ?: \"desconocido\")", o: ["null", "tres", "desconocido", "Error de compilación"], a: "desconocido", f: "Al no existir la clave 3, el mapa devuelve nulo, y el operador Elvis aplica el valor por defecto."},
        {q: "13. ¿Qué imprime when(3) con casos 'in 1..2 -> bajo' e 'in 3..5 -> medio'?", o: ["bajo", "medio", "alto", "null"], a: "medio", f: "El valor 3 entra dentro del rango inclusivo 3..5 definido en la rama del when."},
        {q: "14. Una clase que implementa una interface con 'override val nombre'...", o: ["Es una clase abstracta", "Implementa una interfaz en clase concreta", "Es una data class", "Es inválido"], a: "Implementa una interfaz en una clase concreta", f: "Kotlin permite declarar propiedades en interfaces que las clases hijas deben sobrescribir."},
        {q: "15. Resultado de: mutableListOf('a', 'b', 'c').removeAt(1)?", o: ["[a, c]", "[b, c]", "[a, b]", "[ ]"], a: "[a, c]", f: "removeAt(1) elimina el elemento en el índice 1 ('b'), dejando el resto de la lista."},
        {q: "16. Resultado de: listOf(1, 2, 3, 4).map { it * it }.first()?", o: ["Imprime 1", "Imprime 2", "Imprime 4", "Imprime 16"], a: "Imprime 1", f: "map transforma los elementos (1, 4, 9, 16) y first() devuelve el primer elemento de la nueva lista."},
        {q: "17. Si 'Perro' hereda de 'Animal' y ambos tienen 'sonido()', ¿qué imprime Animal a = Perro()?", o: ["sonido genérico", "guau", "Error", "null"], a: "guau", f: "Se aplica el polimorfismo: se ejecuta el método sobrescrito en la instancia real (Perro)."},
        {q: "18. ¿Cuántas líneas tiene un String con triple comilla y dos líneas de texto?", o: ["1", "2", "3", "0"], a: "2", f: "Los strings multilínea con \"\"\" respetan los saltos de línea literales dentro del bloque."},
        {q: "19. ¿Qué define 'object Logger { ... }'?", o: ["Múltiples instancias", "Un singleton con un método", "Una interfaz", "No compila"], a: "Define un singleton con un método", f: "La palabra clave 'object' declara una clase y crea una única instancia de la misma (patrón Singleton)."},
        {q: "20. Resultado de: (1..10).asSequence().filter{par}.map{it*2}.take(2).toList()?", o: ["[ 2,4,6,8]", "[ 8,4]", "[ 4]", "[ 4,8]"], a: "[ 4,8]", f: "Filtra pares (2, 4, 6...), multiplica por 2 (4, 8, 12...) y toma los 2 primeros (4, 8)."},
        {q: "21. En Jetpack Compose, ¿qué hace una función con @Composable?", o: ["Servicio en segundo plano", "Dibuja elementos de UI (texto, etc.)", "Crea Intent", "Declara Activity"], a: "Declara una función composable que dibuja texto", f: "La anotación @Composable indica que la función transforma datos en nodos de la interfaz."},
        {q: "22. ¿Qué ocurre en onCreate tras setContent { Text('Hola') }?", o: ["No muestra nada", "Se dibuja el texto con Compose", "Lanza intent", "Solo ejecuta EdgeToEdge"], a: "Se dibuja el texto 'Hola Android' con Compose", f: "setContent es el punto de entrada para definir la UI de la Activity usando Compose."},
        {q: "23. En Android clásico, ¿qué hace boton.setOnClickListener { ... }?", o: ["Cambia color", "Maneja el evento de clic", "Cierra actividad", "Ejecuta al iniciar"], a: "Asigna un listener para manejar el clic", f: "Es el método estándar para definir la acción que ocurre cuando el usuario pulsa el botón."},
        {q: "24. ¿Qué hace Intent(ACTION_VIEW, Uri.parse('http...'))?", o: ["Abre siempre la misma app", "Abre la URL con la app adecuada (navegador)", "Inicia servicio", "Envía broadcast"], a: "Intenta abrir la URL con una app adecuada", f: "Es un Intent implícito que solicita al sistema realizar una acción sobre un dato (URI)."},
        {q: "25. En XML, android:layout_width='wrap_content' significa:", o: ["Oculta el texto", "Ocupa toda la pantalla", "Se ajusta al tamaño del contenido", "Evita acceso"], a: "Ajusta tamaño al contenido del TextView", f: "wrap_content hace que la vista sea tan grande como lo que contiene en su interior."},
        {q: "26. ¿Qué método del ciclo de vida se llama cuando la Activity deja de ser visible?", o: ["onCreate", "onResume", "onStop", "onDestroy"], a: "onStop", f: "onStop ocurre cuando el usuario ya no puede ver la Activity en pantalla."},
        {q: "27. ¿Qué hace intent.putExtra('mensaje', 'Hola')?", o: ["Envía un Bundle con clave 'Hola'", "No envía nada", "Añade dato extra clave-valor", "Crea servicio"], a: "Añade un extra con clave 'mensaje' y valor 'Hola'", f: "Se usa para pasar información entre componentes (como de una Activity a otra)."},
        {q: "28. ¿Qué patrón usa 'class ImpresoraAvanzada(...) : Impresora by base'?", o: ["Singleton", "Decorator usando delegación", "Factory", "Strategy"], a: "Decorator usando delegación", f: "La cláusula 'by' permite delegar la implementación de una interfaz a un objeto base."},
        {q: "29. En un RecyclerView, ¿para qué sirve ViewHolder?", o: ["Transacciones BD", "Reutilizar vistas y evitar findViewById", "Ciclo de vida", "Intents implícitos"], a: "Para reutilizar vistas y evitar llamadas repetidas a findViewById", f: "Optimiza el rendimiento al reciclar los contenedores de las vistas de la lista."},
        {q: "30. ¿Qué hace listView.setOnItemClickListener { ... }?", o: ["Establece adaptador", "Detecta pulsaciones sobre elementos de la lista", "Elimina elemento", "Cambia layout"], a: "Detecta pulsaciones sobre elementos de la lista", f: "Captura el índice y los datos del elemento específico que ha sido pulsado."},
        {q: "31. ¿Qué ocurre en el onCreateView de un Fragment?", o: ["No se puede inflar", "Se infla el layout como vista del fragmento", "Solo para actividades", "Error compilación"], a: "Se infla el layout mi_fragment como vista del fragmento", f: "Es donde se define y crea la jerarquía de vistas de la interfaz del fragmento."},
        {q: "32. ¿Qué hace supportFragmentManager...replace(id, MiFragment()).commit()?", o: ["Crea servicio", "Añade a pila actividades", "Reemplaza el contenedor por el fragmento", "Cierra fragmentos"], a: "Reemplaza el contenido del contenedor por el fragmento", f: "Realiza una transacción para actualizar dinámicamente la UI de la Activity con un fragmento."},
        {q: "33. ¿Qué representa <LinearLayout android:orientation='vertical'>?", o: ["Fila horizontal", "Columna vertical", "Ignora orientación", "FrameLayout"], a: "Un contenedor que organiza las vistas en columna vertical", f: "Alinea a sus hijos uno debajo de otro siguiendo el eje Y."},
        {q: "34. ¿Qué unidad es mejor para tamaños de texto en Android?", o: ["dp", "px", "sp", "pt"], a: "sp", f: "Scalable Pixels (sp) respetan las preferencias de tamaño de fuente que el usuario tenga en el sistema."},
        {q: "35. ¿Qué hace prefs.edit().putString('usuario', 'Ana').apply()?", o: ["Guarda en RAM volátil", "Almacena valor persistente", "Crea SQLite", "Envía broadcast"], a: "Almacena un valor persistente asociado a 'usuario'", f: "SharedPreferences guarda datos simples de forma permanente en un archivo XML interno."},
        {q: "36. ¿Qué tipo de intent es Intent(this, SecondActivity::class.java)?", o: ["Implícito", "Explícito", "Broadcast", "De servicio"], a: "Explícito", f: "Es explícito porque indica exactamente la clase del componente que debe iniciarse."},
        {q: "37. ¿Qué hace el filtro con action.MAIN y category.LAUNCHER?", o: ["Activity secundaria", "Punto de entrada/icono de la app", "Evita implícitos", "Llamadas internas"], a: "Indica que la activity se lanza desde el icono de la app", f: "Define qué Activity se ejecuta cuando el usuario pulsa el icono de la aplicación en el menú del móvil."},
        {q: "38. ¿Qué ocurre al intentar 'abc'.toInt() dentro de un try-catch?", o: ["Imprime 'abc'", "Se detiene el programa", "Imprime 'Error de formato'", "Imprime 0"], a: "Imprime 'Error de formato'", f: "Se captura la excepción NumberFormatException lanzada al intentar convertir letras a números."},
        {q: "39. En Jetpack Compose, ¿para qué sirve @Preview?", o: ["Solo física", "Previsualización en el IDE", "Genera APK", "Evita compilación"], a: "Muestra una previsualización en el IDE", f: "Permite ver el diseño sin tener que ejecutar la aplicación en el emulador o dispositivo real."},
        {q: "40. Salida de runBlocking { launch { delay(1000); print('Mundo') }; print('Hola') }?", o: ["Mundo y luego Hola", "Hola y luego Mundo", "Nunca imprime", "Lanza excepción"], a: "Hola y luego Mundo", f: "launch es asíncrono; se imprime 'Hola' y el código dentro de launch espera un segundo antes de imprimir 'Mundo'."}
    ]
  }
];

const mappedQuestions = [];
let globalIndex = 447;

rawSections.forEach(section => {
  section.data.forEach((q, i) => {
    let opts = q.o.map((text, idx) => ({
      id: String.fromCharCode(97 + idx),
      text: text
    }));
    
    let correctOpt = opts.find(opt => q.a.includes(opt.text) || opt.text.includes(q.a));
    let correctId = correctOpt ? correctOpt.id : 'a';
    
    mappedQuestions.push({
      id: "pmdm-q" + String(globalIndex).padStart(3, '0'),
      subjectId: 'pmdm',
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

console.log('Successfully added ' + mappedQuestions.length + ' PMDM questions part 1. Total: ' + combined.length);
