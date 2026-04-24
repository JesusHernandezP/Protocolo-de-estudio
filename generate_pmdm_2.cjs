const fs = require('fs');

const rawSections = [
  {
    moduleId: 'pmdm-u3',
    data: [
        {q: "1. ¿Qué imprime el siguiente código?\nfun main() {\n  val lista = listOf(\"Kotlin\", \"Java\", \"C++\")\n  println(lista[1])\n}", o: ["Kotlin", "C++", "Java", "null"], a: "Java", f: "Las colecciones en Kotlin tienen índice base cero; lista[1] accede al segundo elemento."},
        {q: "2. ¿Qué valor tiene 'esMayor' en: val edad: Int? = null; val esMayor = edad ?: 18?", o: ["null", "0", "18", "Lanza excepción"], a: "18", f: "El operador Elvis (?:) devuelve el valor de la derecha si el operando de la izquierda es nulo."},
        {q: "3. ¿Qué imprime: operar(3, 4) { x, y -> x + y } si la función es fun operar(a, b, op: (Int, Int) -> Int)?", o: ["7", "12", "34", "No compila"], a: "7", f: "La lambda ejecuta la suma de los dos parámetros pasados a la función de orden superior."},
        {q: "4. ¿Qué muestra: data class Producto(nombre, precio); val p2 = p.copy(precio = 5.99)?", o: ["5.99", "9.99", "0.0", "null"], a: "5.99", f: "El método copy permite crear una instancia modificando solo las propiedades indicadas."},
        {q: "5. ¿Qué hace 'when' al usar 'is String -> ...' e 'is Int -> ...'?", o: ["Devuelve 'otro'", "Comprobación de tipos en tiempo de ejecución", "Lanza excepción", "Solo acepta Strings"], a: "Hace comprobación de tipos en tiempo de ejecución", f: "Kotlin utiliza Smart Casts al verificar tipos con el operador 'is' dentro de un when o if."},
        {q: "6. ¿Qué resultado se obtiene de: listOf(1, 2, 3, 4, 5).reduce { acc, n -> acc + n }?", o: ["10", "15", "5", "1"], a: "15", f: "Reduce acumula los valores de la lista aplicando la operación de izquierda a derecha (1+2+3+4+5)."},
        {q: "7. ¿Qué define: val area: Int get() = ancho * alto?", o: ["Propiedad mutable", "Falta setter", "Propiedad delegada", "Propiedad calculada con getter personalizado"], a: "Declara una propiedad calculada con getter personalizado", f: "No almacena un valor en memoria, sino que lo calcula dinámicamente cada vez que se invoca."},
        {q: "8. ¿Qué imprime: val a = 10; val b = 3; println(a / b)?", o: ["3.3333", "3", "4", "0"], a: "3", f: "En Kotlin, la división entre dos enteros (Int) produce un resultado entero, truncando los decimales."},
        {q: "9. ¿Qué imprime: intArrayOf(1, 2, 3).average()?", o: ["2.0", "0.0", "6.0", "No compila"], a: "2.0", f: "La función average() calcula la media aritmética y devuelve un valor de tipo Double."},
        {q: "10. ¿Qué imprime: Regex(\"\\\\d{3}\").matches(\"123\")?", o: ["123", "true", "false", "Lanza excepción"], a: "true", f: "La expresión regular \\d{3} busca exactamente tres dígitos numéricos, lo cual coincide con '123'."},
        {q: "11. ¿Qué imprime 'for (i in 10 downTo 6)' si hay un 'if (i == 8) break'?", o: ["10 9 8", "8 7 6", "6 7 8", "10 9"], a: "10 9", f: "El bucle empieza en 10, imprime 10 y 9, y al llegar a 8 el 'break' detiene la ejecución inmediatamente."},
        {q: "12. ¿Qué imprime: val texto: String? = null; println(texto?.length)?", o: ["null", "0", "Lanza excepción", "No compila"], a: "null", f: "El operador de llamada segura (?.) devuelve nulo si el receptor es nulo, en lugar de lanzar una excepción."},
        {q: "13. ¿Qué hace: class Caja<T>(val contenido: T)?", o: ["Solo Int", "Imprime Hola", "Imprime null", "Lanza excepción"], a: "Imprime Hola", f: "Es una clase genérica que puede contener cualquier tipo de dato, en este caso un String."},
        {q: "40. ¿Qué hace: fun String.contarVocales() = count { it in \"aeiou\" }?", o: ["Añade propiedad", "No compila", "Modifica clase original", "Declara función de extensión"], a: "Declara una función de extensión que cuenta vocales en la cadena", f: "Las funciones de extensión permiten añadir funcionalidades a clases sin herencia ni decoración."},
        {q: "14. ¿Estado del ciclo de vida si una Activity es parcialmente visible (ej. diálogo encima)?", o: ["onCreate", "onResume", "onPause", "onDestroy"], a: "onPause", f: "onPause se alcanza cuando la actividad pierde el foco pero sigue siendo parcialmente visible."},
        {q: "15. ¿Qué contiene normalmente la carpeta res/layout?", o: ["Kotlin", "Strings", "Archivos XML de diseño", "Gradle"], a: "Archivos XML de diseño de interfaz", f: "En el modelo clásico de Android, los diseños visuales se definen en XML dentro de esta carpeta."},
        {q: "16. En LinearLayout, ¿qué hace 'android:orientation=\"horizontal\"'?", o: ["Fila horizontal", "Columna vertical", "Superpone", "Ignora"], a: "Ordena las vistas en fila horizontal", f: "Define la dirección en la que se apilan los elementos hijos dentro del contenedor."},
        {q: "17. ¿Qué hace 'android:layout_weight=\"1\"'?", o: ["1 px", "Ocupa todo", "Indica proporción de espacio adicional", "Sin efecto"], a: "Indica la proporción de espacio adicional que debe ocupar", f: "Weight distribuye el espacio sobrante del contenedor entre los hijos según su ratio."},
        {q: "18. ¿Para qué sirve 'setResult(RESULT_OK, data)' seguido de 'finish()'?", o: ["Cierra app", "Devuelve resultado a la Activity anterior", "Broadcast", "Nueva Activity"], a: "Devuelve un resultado a la Activity que la inició", f: "Permite enviar datos de vuelta a una actividad que fue lanzada con la intención de recibir respuesta."},
        {q: "19. ¿Qué muestra un Toast en Android?", o: ["Mensaje emergente breve", "Diálogo modal", "Snackbar", "Notificación"], a: "Un mensaje emergente breve en pantalla", f: "Es un aviso no interactivo que desaparece automáticamente tras unos segundos."},
        {q: "20. En Jetpack Compose, ¿para qué sirve el componente Scaffold?", o: ["Negocio", "Intent", "Cierra Activity", "Estructura básica de pantalla con zonas de UI"], a: "Proporciona una estructura básica de pantalla con zonas de UI", f: "Implementa la estructura visual básica de Material Design (TopBar, BottomBar, Fab)."},
        {q: "21. ¿Dónde se habilita la depuración USB en un dispositivo real?", o: ["Settings -> Developer Options", "AndroidManifest", "Código Kotlin", "Solo ADB"], a: "Se activa en Settings → Developer Options", f: "Es un paso previo necesario en el hardware antes de poder desplegar apps desde el IDE."},
        {q: "22. ¿Qué significa 'minSdkVersion 21'?", o: ["Java 21", "Android 5.0 (API 21) o superior", "API 21 exacto", "Sin efecto"], a: "La app se ejecuta solo en Android 21 y superiores", f: "Define el nivel mínimo de API que el dispositivo debe tener para poder instalar la aplicación."},
        {q: "23. ¿Para qué sirve un ArrayAdapter en un ListView?", o: ["Layout Activity", "Adaptador para mostrar texto en la lista", "Cierra lista", "Elimina datos"], a: "Asigna un adaptador simple para mostrar elementos de texto", f: "Es el puente entre una colección de datos (como un Array o List) y la vista de lista."},
        {q: "24. Ventaja principal de RecyclerView frente a ListView:", o: ["Usa XML", "Sin adaptadores", "Mejor rendimiento y flexibilidad", "Sin ViewHolder"], a: "Mejor rendimiento y flexibilidad en listas grandes", f: "Optimiza la memoria al reciclar las vistas de los elementos que salen de la pantalla."},
        {q: "25. ¿Qué hace 'addToBackStack(null)' al realizar una transacción de fragmento?", o: ["Reemplaza Activity", "Cierra app", "Elimina previos", "Permite volver atrás con el botón físico"], a: "Añade el fragmento y permite volver atrás con el botón “Atrás”", f: "Guarda el estado de la transacción en la pila para que el usuario pueda revertirla al pulsar 'Atrás'."},
        {q: "26. ¿Qué hace 'setSupportActionBar(toolbar)'?", o: ["Oculta barra", "Convierte Toolbar en ActionBar", "Deshabilita menú", "Intent implícito"], a: "Convierte la Toolbar en la ActionBar de la Activity", f: "Permite usar las APIs de la ActionBar clásica sobre un widget Toolbar más flexible."},
        {q: "27. ¿Qué hace 'menuInflater.inflate(R.menu.menu_main, menu)'?", o: ["Infla el menú", "Borra menú", "Crea Toolbar", "Servicio"], a: "Infla el menú definido en menu_main", f: "Transforma un recurso XML de menú en objetos de menú reales en la barra superior."},
        {q: "28. ¿Qué ocurre al usar Intent.createChooser(intent, ...)?", o: ["Solo navegador", "Elige app para compartir", "Correo directo", "Error"], a: "Permite elegir una app para compartir el texto", f: "Muestra un diálogo al usuario para que seleccione qué aplicación instalada procesará el Intent."},
        {q: "29. ¿Qué representa el uso de openOrCreateDatabase(...) e INSERT/SELECT?", o: ["RAM", "Preferencias", "Base de datos relacional local SQLite", "Servidor remoto"], a: "Usa una base de datos relacional local en el dispositivo", f: "SQLite es el motor de base de datos embebido estándar en Android."},
        {q: "30. ¿Por qué usar 'dp' (density-independent pixels) en layouts?", o: ["Velocidad", "Se adapta a diferentes densidades de pantalla", "Solo tablets", "px recomendado"], a: "dp se adapta mejor a diferentes densidades de pantalla", f: "Asegura que los elementos mantengan el mismo tamaño físico aparente en distintos dispositivos."},
        {q: "31. ¿Qué hace setContent { MiAppTheme { OperacionesBasicas() } }?", o: ["Hilo fondo", "Solo estilos", "Otra Activity", "Dibuja la interfaz dentro del tema"], a: "Dibuja la interfaz definida por OperacionesBasicas dentro del tema", f: "Define la jerarquía de componentes Compose que formarán la UI de la actividad."},
        {q: "32. ¿Qué hace 'Arrangement.spacedBy(10.dp)' en una Column de Compose?", o: ["Coloca verticalmente con espacio", "Superpone", "Horizontal", "Oculta"], a: "Coloca los textos verticalmente con espacio de 10.dp", f: "Define la separación fija entre cada uno de los elementos hijos del contenedor vertical."},
        {q: "33. ¿Para qué sirve comprobar 'Build.VERSION.SDK_INT'? ", o: ["Actividades", "Versión Java", "Adaptar comportamiento según versión de Android", "No se usa"], a: "Adaptar el comportamiento según la versión de Android presente", f: "Permite ejecutar código específico para versiones nuevas manteniendo compatibilidad con las antiguas."},
        {q: "34. ¿Qué representa 'debuggable true' en el build.gradle?", o: ["Bluetooth", "Impide USB", "Solo emulador", "Permite depuración en dispositivo físico"], a: "Selecciona en Android Studio el dispositivo conectado por USB", f: "Habilita que el IDE pueda inspeccionar y depurar la aplicación mientras se ejecuta en el hardware."},
        {q: "35. ¿Cuál es la función del archivo AndroidManifest.xml?", o: ["UI XML", "Configuración esencial (permisos, actividades)", "Script Gradle", "Base de datos"], a: "Archivo donde se declara configuración esencial de la app", f: "Es el índice de la aplicación para el sistema operativo Android."},
        {q: "36. ¿Qué hace 'android:inputType=\"textUri\"' en un EditText?", o: ["Teclado URL", "Impide texto", "Solo números", "Solo mayúsculas"], a: "Sugiere un teclado adaptado para escribir URLs", f: "Optimiza la experiencia de usuario mostrando teclas como '.com' o '/' en el teclado virtual."},
        {q: "37. ¿Qué hace 'intent.putExtra(\"url\", ...)' al lanzar SecondActivity?", o: ["Navegador", "Inicia Activity pasando datos", "Cierra actual", "Broadcast"], a: "Inicia SecondActivity pasando la URL como extra", f: "Los 'extras' son el mecanismo estándar para transferir información entre actividades mediante Intents."},
        {q: "38. ¿Para qué sirve Log.d(\"Tag\", \"Mensaje\")?", o: ["Base de datos", "Toast", "Mensaje en Logcat", "Excepción"], a: "Registra un mensaje de depuración en Logcat", f: "Permite al desarrollador ver trazas de ejecución en la consola de Android Studio sin molestar al usuario."},
        {q: "39. ¿Qué hace el método onSaveInstanceState?", o: ["Restaura tras cambios de config", "Elimina datos", "Cierra app", "No tiene efecto"], a: "Guarda datos para restaurarlos tras cambios de configuración", f: "Permite salvar el estado de la UI (como texto en campos) ante eventos como la rotación de la pantalla."}
    ]
  },
  {
    moduleId: 'pmdm-u4',
    data: [
      {q: "1. ¿Qué imprime este código usando secuencias?\nval resultado = (1..1000).asSequence().filter { it % 3 == 0 }.map { it * it }.take(3).sum()", o: ["14", "36", "1 + 9 + 36 = 46", "9 + 36 + 81 = 126"], a: "9 + 36 + 81 = 126", f: "La secuencia toma los 3 primeros múltiplos de 3 (3, 6, 9), los eleva al cuadrado (9, 36, 81) y los suma."},
        {q: "2. Dado: val lista = mutableListOf(1, 2, 3); val otra = lista; lista += 4; ¿Qué se imprime al mostrar 'otra'?", o: ["[0, 1, 2, 3, 4, 5]", "[1, 2, 3, 4]", "Depende de la JVM", "No compila"], a: "[1, 2, 3, 4]", f: "En Kotlin, al asignar 'otra = lista' ambos apuntan al mismo objeto en memoria. Al modificar la original, la referencia compartida refleja el cambio."},
        {q: "3. ¿Qué salida produce: texto?.takeIf { it.isNotBlank() }?.length ?: -1 si el texto es 'Kotlin'?", o: ["0", "-1", "5", "6"], a: "6", f: "Como 'Kotlin' no está en blanco, takeIf devuelve el string, y se obtiene su longitud (6)."},
        {q: "4. ¿Qué imprime este ejemplo con when y smart cast si se pasa 'Hola' (String)?", o: ["3", "4", "5", "0"], a: "5", f: "x.length es 4. El código suma x.length + 1, resultando en 5."},
        {q: "5. ¿Qué se imprime en consola si llamamos dos veces a inc() en una clase con setter privado?", o: ["0", "1", "2", "No compila"], a: "2", f: "El setter privado impide modificar la variable desde fuera, pero permite que los métodos internos de la clase (como inc()) la alteren."},
        {q: "6. ¿Qué resultado se obtiene al usar una función inline para medir tiempo y sumar (1..1000)?", o: ["Imprime solo 50050", "Imprime solo la suma", "Imprime tiempo y luego la suma", "No compila"], a: "Imprime tiempo y luego la suma", f: "La función inline ejecuta el bloque de código, imprime la traza de tiempo y devuelve el resultado de la suma."},
        {q: "7. ¿Qué imprime: listOf('K','o','t','l','i','n').fold('') { acc, s -> acc + s }?", o: ["Kotlin", "kOTLIN", "[K, o, t, l, i, n]", "No compila"], a: "Kotlin", f: "fold concatena cada carácter empezando por una cadena vacía, resultando en la palabra completa."},
        {q: "8. ¿Qué valor se imprime tras 'mapa.computeIfPresent(\"b\") { _, v -> v * 10 }' si b era 2?", o: ["2", "10", "20", "null"], a: "20", f: "computeIfPresent actualiza el valor asociado a la clave si esta existe, multiplicando 2 * 10."},
        {q: "9. ¿Qué ocurre al usar 'val ref: (String) -> String = ::saludar'?", o: ["No compila", "Imprime Hola Kotlin", "Imprime la referencia", "Excepción"], a: "Imprime Hola Kotlin", f: "Se utiliza una referencia a función (::) que cumple con la firma de la lambda definida."},
        {q: "10. ¿Qué imprime partition { it % 2 == 0 } seguido de pares.sum() - impares.sum() para (1..5)?", o: ["-3", "-1", "1", "3"], a: "-3", f: "Pares (2,4) suman 6. Impares (1,3,5) suman 9. 6 - 9 = -3."},
        {q: "11. ¿Qué imprime 'maximo(\"kotlin\", \"java\")'?", o: ["kotlin", "java", "null", "No compila"], a: "kotlin", f: "Al ser T : Comparable, las cadenas se comparan alfabéticamente. 'k' es mayor que 'j'."},
        {q: "12. ¿En qué orden se ejecutan los bloques init en una jerarquía de clases B : A()?", o: ["AB", "BA", "A", "B"], a: "AB", f: "Primero se inicializa la clase base (A) y luego la clase derivada (B)."},
        {q: "13. ¿Resultado de sequence { yield(1); yield(2); yield(3) }.map{*3}.drop(1).first()?", o: ["1", "3", "6", "9"], a: "6", f: "Genera (3, 6, 9), elimina el primero (3) y toma el siguiente (6)."},
        {q: "14. ¿Qué pasa al usar lista!!.size si la lista es nula?", o: ["Imprime 0", "Imprime null", "Lanza NullPointerException", "No compila"], a: "Lanza NullPointerException", f: "El operador de aserción no nula (!!) fuerza la ejecución y lanza NPE si el objeto es nulo."},
        {q: "15. ¿Qué hace 'var valor: String by lazy { ... }'?", o: ["No compila (lazy es solo para val)", "Inicializa al leer", "Inicializa en constructor", "Nunca inicializa"], a: "No compila (lazy es solo para val)", f: "La delegación 'by lazy' está diseñada exclusivamente para propiedades de solo lectura (val)."},
        {q: "16. ¿Qué imprime Estado.PENDIENTE.siguiente()?.name usando una extensión con when?", o: ["PENDIENTE", "PROCESANDO", "COMPLETADO", "null"], a: "PROCESANDO", f: "La lógica del when mapea PENDIENTE hacia PROCESANDO."},
        {q: "17. ¿Qué hace 'emptyList().siNoVacia { ... }' en una función de orden superior?", o: ["Imprime 0", "Imprime null", "No imprime nada", "Lanza excepción"], a: "No imprime nada", f: "Al estar vacía, la condición isNotEmpty() es falsa y el bloque lambda nunca se ejecuta."},
        {q: "18. Resultado de: (1..5).filter{>2}.map{it*it}.takeWhile{it<20}?", o: ["[9, 12, 16]", "[7, 14]", "[8, 15]", "[9, 16]"], a: "[9, 16]", f: "Filtra (3,4,5), eleva al cuadrado (9, 16, 25) y toma mientras sea menor a 20 (9, 16)."},
        {q: "19. ¿Qué hace 'when' con un sealed class Resultado (Exito/Error)?", o: ["No compila (falta else)", "Imprime OK", "Imprime 2", "Excepción"], a: "Imprime 2", f: "Al ser sealed, when es exhaustivo y no necesita else. Devuelve la longitud de 'OK' (2)."},
        {q: "20. ¿Qué se imprime al filtrar palabras con longitud > 4 en 'Kotlin es genial'?", o: ["0", "1", "2", "3"], a: "2", f: "Las palabras 'Kotlin' (6) y 'genial' (6) cumplen la condición."},
        {q: "21. ¿Qué muestra 'String::class.simpleName'?", o: ["java.lang.String", "String", "kotlin.String", "null"], a: "String", f: "simpleName devuelve el nombre de la clase sin el paquete."},
        {q: "22. Resultado de: mutableListOf(1,2,3,4).removeIf { it % 2 == 0 }?", o: ["[1, 3]", "[2, 4]", "[1, 2, 3, 4]", "[ ]"], a: "[1, 3]", f: "Elimina los elementos que cumplen la condición de ser pares."},
        {q: "23. ¿Qué hace 'fun String.quitarEspacios()'?", o: ["Modifica clase original", "Devuelve misma cadena", "Devuelve cadena sin espacios", "Excepción"], a: "Devuelve la cadena sin espacios", f: "Utiliza filter para crear una nueva cadena omitiendo caracteres en blanco."},
        {q: "24. Resultado de when { x in 0..5 -> 0 } si x es 5?", o: ["0", "-1", "1", "No compila"], a: "0", f: "El rango 0..5 es inclusivo, por lo que 5 cumple la condición."},
        {q: "25. ¿Qué hace job.cancel() seguido de job.join() en una corrutina?", o: ["Ejecuta todo", "Imprime algunas iteraciones y luego Cancelado", "Nunca cancela", "No compila"], a: "Imprime algunas iteraciones y luego Cancelado", f: "Detiene la ejecución de la corrutina de forma cooperativa."},
        {q: "26. ¿Qué hace 'FLAG_ACTIVITY_CLEAR_TOP' en un Intent?", o: ["Limpia actividades superiores", "Nueva instancia sin extras", "Broadcast", "Solo servicios"], a: "Limpia actividades superiores", f: "Si la actividad ya existe, cierra todas las que están por encima de ella en la pila."},
        {q: "27. ¿Qué representa 'android:layout_weight' en un layout XML?", o: ["Altura fija", "Ocupa todo", "Comparte espacio proporcionalmente", "Obsoleto"], a: "Comparte espacio proporcionalmente", f: "Permite que las vistas en un LinearLayout se expandan según una proporción del espacio libre."},
        {q: "28. ¿Para qué sirve '.addToBackStack(\"detalle\")'?", o: ["No volver atrás", "Excepción", "Elimina fragmentos", "Permite volver atrás con el botón físico"], a: "Permite volver atrás con el botón físico", f: "Guarda la transacción en la pila para que el botón 'Atrás' revierta el cambio de fragmento."},
        {q: "29. ¿Qué hace Intent(ACTION_SEND) con tipo 'message/rfc822'?", o: ["Selector de apps de correo", "Envío automático", "Abre navegador", "No compila"], a: "Selector de apps de correo", f: "Indica al sistema que queremos enviar un mensaje compatible con protocolos de email."},
        {q: "30. ¿Qué implica usar 'startActivityForResult' (API clásica)?", o: ["Sin resultado", "Recibir datos en onActivityResult", "Solo servicios", "Excepción"], a: "Recibir datos en onActivityResult con requestCode 100", f: "Se lanza la actividad esperando que devuelva información al finalizar mediante un callback."},
        {q: "31. ¿Qué problema resuelve el ViewHolder en RecyclerView?", o: ["Ciclo de vida", "Evita llamadas repetidas a findViewById", "Layout Manager", "Solo ListView"], a: "Guarda referencias a vistas para evitar llamadas repetidas a findViewById", f: "Mejora drásticamente el rendimiento al hacer scroll en listas largas."},
        {q: "32. ¿Qué ventaja ofrece Room sobre SQLite plano?", o: ["SQL sin clases", "Capa ORM con validación en compilación", "Sustituye SQLite", "Solo preferencias"], a: "Añade una capa ORM con comprobación de consultas en compilación", f: "Evita errores de sintaxis SQL en tiempo de ejecución al validarlos al compilar."},
        {q: "33. ¿Qué hace 'var valor by remember { mutableStateOf(0) }' en Compose?", o: ["Incrementa contador", "Muestra siempre 0", "No recompone", "No compila"], a: "Incrementa el contador cada vez que se pulsa el botón", f: "remember mantiene el estado durante la recomposición de la UI."},
        {q: "34. ¿Para qué sirve 'rememberSaveable'?", o: ["Pierde estado en rotación", "Conserva estado en cambios de configuración", "Solo emulador", "No compila"], a: "Conserva el estado en cambios de configuración básicos", f: "A diferencia de remember, este sobrevive a la recreación de la Activity (como al rotar la pantalla)."},
        {q: "35. ¿Qué valida la Regex '^[A-Za-z0-9._%+-]+@[...]$'?", o: ["Teléfono", "Excepción", "False siempre", "Correo electrónico"], a: "Valida un correo de forma aproximada y devuelve true en el ejemplo", f: "Es el patrón estándar para verificar el formato de una dirección de email."},
        {q: "36. ¿Qué es un 'typealias' en Kotlin?", o: ["Nueva clase", "Alias legible para un tipo de función", "Genera código", "Solo genéricos"], a: "Define un alias legible para un tipo de función", f: "Permite acortar firmas de funciones complejas para mejorar la legibilidad."},
        {q: "37. Resultado de 'listOf(\"1\", \"a\", \"2\").mapNotNull { it.toIntOrNull() }'?", o: ["[1, 2]", "[1, a, 2, b]", "[ ]", "Excepción"], a: "[1, 2]", f: "Transforma a entero y descarta automáticamente los valores que resultaron nulos (las letras)."},
        {q: "38. ¿Qué imprime 'grupos[3]?.size' tras un groupBy { it.length } para ('uno', 'dos')?", o: ["0", "1", "2", "3"], a: "2", f: "Agrupa las palabras de longitud 3 ('uno' y 'dos'). El tamaño de ese grupo es 2."},
        {q: "39. ¿Qué visibilidad tiene una clase marcada como 'internal'?", o: ["Cualquier módulo", "Solo el mismo módulo", "Solo mismo archivo", "Solo subclases"], a: "Solo dentro del mismo módulo", f: "Limita el acceso al código que forma parte de la misma unidad de compilación."},
        {q: "40. ¿Qué hace 'Impresora by base' en la delegación de clases?", o: ["Reimplementar obligatorio", "No compila", "No implementa interfaz", "Delega llamadas automáticamente"], a: "ImpresoraLog delega las llamadas de imprimir a base automáticamente", f: "Es una característica de Kotlin que implementa el patrón Decorator sin código repetitivo."}
    ]
  }
];

const mappedQuestions = [];
let globalIndex = 517;

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

console.log('Successfully added ' + mappedQuestions.length + ' PMDM questions part 2. Total: ' + combined.length);
