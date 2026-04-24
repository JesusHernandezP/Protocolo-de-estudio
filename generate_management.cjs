const fs = require('fs');

const rawSections = [
  {
    moduleId: 'management-u1',
    data: [
    {q: "1. ¿Qué imprime Aula (Pedro, María) len(aula.alumnos)?", o: ["1", "3", "0", "2"], a: "2", f: "Se agregaron dos elementos a la lista interna."},
    {q: "2. Prefijo __ en self.__edad indica:", o: ["Variable global", "Atributo 'privado' (name mangling)", "Atributo estático", "Constante"], a: "Atributo 'privado' (name mangling)", f: "Dificulta el acceso desde fuera de la clase."},
    {q: "3. ¿Qué hace el método get_edad() que retorna self.__edad?", o: ["Modifica", "Borra", "Devuelve valor de atributo privado", "Crea atributo"], a: "Devuelve valor de atributo privado", f: "Es el accesor estándar para leer datos encapsulados."},
    {q: "4. Salida de Estudiante('Ana', 20) print(nombre, get_edad()):", o: ["Ana", "20 Ana", "__edad 20", "Ana 20"], a: "Ana 20", f: "Muestra el atributo público nombre y el retorno del método."},
    {q: "5. Relación Aula con lista de alumnos:", o: ["Herencia", "Polimorfismo", "Composición/Agregación", "Sobrecarga"], a: "Composición/Agregación", f: "Una clase contiene instancias de otra."},
    {q: "6. Atributo _salario en Python:", o: ["Privado", "Convención de uso interno (protegido)", "Clase", "Estático"], a: "Convención de uso interno (protegido)", f: "Un guion indica que no debería usarse fuera de la clase."},
    {q: "7. ¿Qué hace el decorador @property?", o: ["Ejecuta una vez", "Estático", "Acceso como atributo", "Sin parámetros"], a: "Acceso como atributo", f: "Permite acceder al método como si fuera un atributo."},
    {q: "8. Empleado('Ana', 1000) con @property salario (* 1.2):", o: ["1000", "800", "0", "1200.0"], a: "1200.0", f: "Aplica la bonificación definida en el getter."},
    {q: "9. emp.salario = 500 con validación >= 800:", o: ["Asigna 500", "Excepción", "Muestra 'Mínimo 800€' y no cambia", "Asigna 800"], a: "Muestra 'Mínimo 800€' y no cambia", f: "La lógica del setter protege la integridad del dato."},
    {q: "10. @property y @setter permiten:", o: ["Quitar encapsulación", "Simular atributos públicos con control", "Globales", "Estáticos"], a: "Simular atributos públicos con control", f: "Mantiene la sintaxis simple protegiendo el acceso."},
    {q: "11. f'Total: {aula.contar_alumnos()} alumnos' con 2 alumnos:", o: ["Total: 0", "Total: 1", "Total: 2 alumnos", "Error"], a: "Total: 2 alumnos", f: "Utiliza f-strings para interpolar el conteo."},
    {q: "12. Acceso directo est.__edad:", o: ["Error de atributo", "20", "None", "Memoria"], a: "Error de atributo", f: "El name mangling cambia el nombre internamente."},
    {q: "13. Uso de get_ y set_:", o: ["Hilos", "Leer/modificar atributos encapsulados", "Borrar", "Herencia"], a: "Leer/modificar atributos encapsulados", f: "Fundamento de la encapsulación en POO."},
    {q: "14. Módulo estándar JSON en Python:", o: ["pickle", "csv", "requests", "json"], a: "json", f: "Librería nativa de Python."},
    {q: "15. ¿Qué hace json.dump(obj, fichero)?", o: ["Lee JSON", "Escribe objeto Python en archivo JSON", "Diccionario", "Comprime"], a: "Escribe objeto Python en archivo JSON", f: "Vuelca el contenido directamente al archivo."},
    {q: "16. ¿Qué hace json.load(fichero)?", o: ["Cadena JSON", "Carga JSON de archivo a objeto Python", "Elimina", "Nuevo vacío"], a: "Carga JSON de archivo a objeto Python", f: "Deserializa el archivo a dict o list."},
    {q: "17. Parámetro indent=4 en dump:", o: ["Encriptar", "Límite 4KB", "Sangría para legibilidad", "4 claves"], a: "Sangría para legibilidad", f: "Mejora visual para humanos (pretty print)."},
    {q: "18. ensure_ascii=False sirve para:", o: ["Quitar espacios", "Permitir acentos y caracteres no ASCII", "Mayúsculas", "No guardar"], a: "Permitir acentos y caracteres no ASCII", f: "Evita que caracteres especiales se escapen."},
    {q: "19. ¿Qué devuelve json.dumps(datos)?", o: ["Diccionario", "Lista", "Cadena (str) formato JSON", "Archivo"], a: "Cadena (str) formato JSON", f: "Genera el texto serializado, no un archivo."},
    {q: "20. ¿Qué hace json.loads(cadena)?", o: ["Convierte a objeto Python", "Dict a bytes", "Descarga", "Modo binario"], a: "Convierte a objeto Python", f: "Parsea el texto JSON recibido."},
    {q: "21. Resultado de json.loads(json.dumps(datos))['curso']:", o: ["list", "dict Python", "str", "json"], a: "dict Python", f: "Recupera la estructura tras serializar."},
    {q: "22. Estructura {'nombre': 'Ana', 'edad': 25} es:", o: ["Lista", "Diccionario", "Cadena", "Set"], a: "Diccionario", f: "Estructura clave-valor."},
    {q: "23. get_edad() + 1 con edad 20:", o: ["19", "20", "21", "Error"], a: "21", f: "Aritmética simple con retorno de método."},
    {q: "24. self.salario dentro de @salario.setter:", o: ["Error", "Usa getter bonificado", "Recursión", "No cambia"], a: "Usa getter bonificado", f: "Llama internamente al property."},
    {q: "25. Forma recomendada abrir JSON para escribir:", o: ["'r'", "'wb'", "with open(..., 'w', encoding='utf-8') as f:", "open()"], a: "with open(..., 'w', encoding='utf-8') as f:", f: "Garantiza cierre y codificación."},
    {q: "26. mostrar_alumnos() con lista vacía:", o: ["Nada", "Alumnos", "Error", "Aula vacía"], a: "Aula vacía", f: "Control de flujo de listas."},
    {q: "27. Ventaja @property y @setter frente a públicos:", o: ["Código corto", "Validar acceso sin cambiar sintaxis externa", "Sin errores", "Sin self"], a: "Validar acceso sin cambiar sintaxis externa", f: "Permite añadir lógica sin romper compatibilidad."},
    {q: "28. Tipo dato json.load(f):", o: ["Lista", "Cadena", "Entero", "Objeto Python (dict/list)"], a: "Objeto Python (dict/list)", f: "Recrea la estructura original."},
    {q: "29. json.dump vs json.dumps:", o: ["Ambos archivo", "Ambos cadena", "dump archivo, dumps cadena", "No dicts"], a: "dump archivo, dumps cadena", f: "La 's' final es de 'string'."},
    {q: "30. print(emp.salario) con @property:", o: ["init", "Lee directo", "Llama @property con bonificación", "Error"], a: "Llama @property con bonificación", f: "Uso transparente del getter."}
    ]
  },
  {
    moduleId: 'management-u2',
    data: [
    {q: "31. Acrónimo ERP:", o: ["Employee", "Enterprise Resource Planning", "External", "Retail"], a: "Enterprise Resource Planning", f: "Planificación de Recursos Empresariales."},
    {q: "32. Ventaja ERP integrado:", o: ["Múltiple", "Desconectado", "Personalización fácil", "Análisis centralizado"], a: "Personalización fácil", f: "Unifica datos de todos los departamentos."},
    {q: "33. Paso tras crear base datos Odoo:", o: ["Instalar módulos", "Sitio", "Eliminar demo", "Pass"], a: "Instalar módulos", f: "Odoo es modular."},
    {q: "34. Inconveniente On-premise:", o: ["Escala", "Mantenimiento cero", "Sin internet", "Inversión inicial hardware"], a: "Inversión inicial hardware", f: "Requiere servidores propios."},
    {q: "35. CRM significa:", o: ["Client", "Corporate", "Customer Relationship Management", "Central"], a: "Customer Relationship Management", f: "Gestión de clientes."},
    {q: "36. Integración BI facilita:", o: ["Análisis centralizado", "Sobredimensión", "Separadas", "Coste"], a: "Análisis centralizado", f: "Visión global de datos."},
    {q: "37. Licencia ERP recomendada:", o: ["Privativa", "Libre para menor dependencia", "Propietaria", "Mixta"], a: "Libre para menor dependencia", f: "Evita dependencia del fabricante."},
    {q: "38. IaaS:", o: ["Infraestructura", "Instalación", "Integración", "Activos"], a: "Infraestructura", f: "Servidores virtuales."},
    {q: "39. Módulo leads y oportunidades:", o: ["Facturas", "CRM", "Empleados", "Compras"], a: "CRM", f: "Core del marketing/ventas."},
    {q: "40. Problema implantación:", o: ["Datos", "Instante", "Resistencia empleados", "Cero"], a: "Resistencia empleados", f: "Factor humano crítico."},
    {q: "41. BI mide:", o: ["Licencias", "Ventas", "Hardware", "Pasado, presente y futuro"], a: "Pasado, presente y futuro", f: "Análisis de tendencias."},
    {q: "42. PaaS:", o: ["Plataforma", "Access", "Production", "Payment"], a: "Plataforma", f: "Platform as a Service."},
    {q: "43. Odoo Ventas, ¿qué se factura?", o: ["Lead", "Pedido de venta", "Rechazado", "Dpto"], a: "Pedido de venta", f: "Flujo de venta."},
    {q: "44. Reto técnico:", o: ["Migración datos heterogéneos", "Mentalidad", "Gratuita", "Escala"], a: "Migración datos heterogéneos", f: "Consolidar fuentes externas."},
    {q: "45. SaaS:", o: ["Sales", "Secure", "Software como servicio", "Server"], a: "Software como servicio", f: "Software vía web."},
    {q: "46. Orden de producción incluye:", o: ["Cantidad, fecha y línea", "Solo precio", "Proveedores", "Clientes"], a: "Cantidad, fecha y línea", f: "Parámetros de fabricación."},
    {q: "47. Ventaja ERP en nube:", o: ["Sin internet", "Datos locales", "Alto coste", "Escalabilidad sencilla"], a: "Escalabilidad sencilla", f: "Crecimiento rápido bajo demanda."},
    {q: "48. Stock/Inventario es:", o: ["Ventas", "Existencias para comercio/producción", "Empleados", "Facturas"], a: "Existencias para comercio/producción", f: "Control de material."},
    {q: "49. Odoo protección base de datos:", o: ["Demo", "Logo", "Idioma", "Contraseña maestra generada"], a: "Contraseña maestra generada", f: "Seguridad de nivel gestor."},
    {q: "50. Módulo Odoo compras:", o: ["Compra", "Ventas", "CRM", "Web"], a: "Compra", f: "Gestión de abastecimiento."},
    {q: "51. Copia seguridad Odoo incluye:", o: ["Hardware", "Código", "PostgreSQL y filestore", "Licencia"], a: "PostgreSQL y filestore", f: "Registros y archivos adjuntos."},
    {q: "52. Evolución ERP con Internet:", o: ["Centralización nube", "Mainframes", "PC aislados", "Sin servidores"], a: "Centralización nube", f: "Acceso global distribuido."},
    {q: "53. Orden configuración módulos:", o: ["Simultáneo", "Empresa -> Usuarios -> Contabilidad...", "Usuarios -> Empresa...", "Contabilidad..."], a: "Empresa -> Usuarios -> Contabilidad...", f: "Jerarquía lógica de datos."},
    {q: "54. Principio permisos Odoo:", o: ["Acceso total", "Sin restricciones", "Mínimo privilegio", "Solo admin"], a: "Mínimo privilegio", f: "Seguridad por rol."},
    {q: "55. Personalizar vistas sin código:", o: ["Python", "CMD", "DB", "Odoo Studio"], a: "Odoo Studio", f: "No-code editor."}
    ]
  },
  {
    moduleId: 'management-u3',
    data: [
    {q: "56. ¿Qué integran los ERP modernos?", o: ["CRM y BI", "Solo contabilidad", "Hardware", "Licencias"], a: "CRM y BI", f: "Visión 360 del negocio."},
    {q: "57. Método NO recomendado multiusuario:", o: ["On-premise", "Carpeta compartida DB", "Nube", "VPS"], a: "Carpeta compartida DB", f: "Provoca corrupción de datos."},
    {q: "58. Lead en Odoo CRM:", o: ["Empleado", "Factura", "Posible cliente no cualificado", "Proveedor"], a: "Posible cliente no cualificado", f: "Pista comercial."},
    {q: "59. ¿Qué integran la mayoría de los sistemas ERP modernos?", o: ["CRM y BI", "Solo contabilidad", "Hardware externo", "Licencias privativas"], a: "CRM y BI", f: "Un ERP actual busca centralizar no solo la gestión interna, sino también la relación con clientes y el análisis de datos."},
    {q: "60. ¿Qué método NO se recomienda para entornos multiusuario?", o: ["On-premise", "Carpeta compartida de base datos", "Nube SAAS", "VPS"], a: "Carpeta compartida de base datos", f: "Usar carpetas compartidas para bases de datos compartidas provoca bloqueos y corrupción de archivos."},
    {q: "61. En Odoo CRM, ¿qué representa un lead?", o: ["Empleado", "Factura pagada", "Posible cliente no cualificado", "Proveedor"], a: "Posible cliente no cualificado", f: "Un lead es el paso previo a una oportunidad; es una pista que aún debe ser validada comercialmente."},
    {q: "62. ¿Qué problema genera un ERP sobredimensionado en pymes?", o: ["Seguridad cero", "Coste bajo", "Simplicidad", "Recursos excesivos"], a: "Recursos excesivos", f: "Tener más funciones de las necesarias complica el uso y eleva los costes sin aportar valor real."},
    {q: "63. ¿Qué elemento genera Odoo automáticamente al instalarse?", o: ["Contraseña maestra para manager", "Facturas automáticas", "Departamentos", "Sitio web completo"], a: "Contraseña maestra para manager", f: "Al crear una base de datos local, Odoo genera o solicita una master password para proteger la gestión de bases de datos."},
    {q: "64. ¿Qué es una oportunidad en Odoo CRM?", o: ["Pedido rechazado", "Lead cualificado para venta", "Backup diario", "Módulo extra"], a: "Lead cualificado para venta", f: "Una oportunidad es un lead que ya ha mostrado un interés real y tiene potencial de cierre."},
    {q: "65. ¿Qué define a un cliente en relaciones comerciales?", o: ["Paga impuestos", "Provee materias", "Adquiere bien/servicio por dinero", "Fabrica productos"], a: "Adquiere bien/servicio por dinero", f: "Es el receptor final de la propuesta de valor a cambio de una contraprestación económica."},
    {q: "66. ¿Qué tipo de instalación tiene Odoo en local?", o: ["On-premise con PostgreSQL", "Solo cloud", "Carpeta compartida", "Mainframe"], a: "On-premise con PostgreSQL", f: "Odoo se apoya obligatoriamente en el motor de base de datos relacional PostgreSQL."},
    {q: "67. En el módulo Facturación de Odoo, ¿qué se crea a partir de un pedido?", o: ["Backup", "Lead nuevo", "Departamento", "Factura cliente"], a: "Factura cliente", f: "El pedido confirmado es el disparador para generar el documento contable de cobro."},
    {q: "68. ¿Cuál es una ventaja clave de la personalización en ERP?", o: ["Sin mantenimiento", "Programación total", "Módulos/plugins", "Coste cero"], a: "Módulos/plugins", f: "La capacidad de añadir funciones mediante extensiones permite que el ERP crezca con la empresa."},
    {q: "69. ¿Qué factor potencia el rendimiento de un ERP?", o: ["Solo datos volumen", "Usuarios simultáneos", "OS Windows solo", "Sin RAID"], a: "Usuarios simultáneos", f: "La capacidad de gestionar múltiples conexiones concurrentes determina la escalabilidad del sistema."},
    {q: "70. ¿Qué representa el proceso de producción?", o: ["Elaboración producto con fases", "Solo ventas", "Almacén", "Logística"], a: "Elaboración producto con fases", f: "Define la transformación de materias primas mediante una secuencia de operaciones."},
    {q: "71. En la prueba cloud de Odoo, ¿cuál es el máximo de aplicaciones permitidas gratis?", o: ["Ninguna", "Ilimitadas", "5 solo", "10 aplicaciones"], a: "10 aplicaciones", f: "Odoo limita el número de módulos instalables en su oferta gratuita cloud."},
    {q: "72. En Odoo, ¿qué convierte un presupuesto de compra?", o: ["Factura venta", "Pedido de compra", "Lead", "Empleado"], a: "Pedido de compra", f: "Al validar el presupuesto del proveedor, este se convierte formalmente en una orden de compra."},
    {q: "73. ¿Qué supuso la evolución de los PC para los ERP?", o: ["Nube solo", "Grandes mainframes", "Acceso pymes con limitaciones", "Sin servidores"], a: "Acceso pymes con limitaciones", f: "Los ordenadores personales permitieron que empresas más pequeñas digitalizaran su gestión."},
    {q: "74. ¿Cuál es la solución más efectiva ante la resistencia al cambio?", o: ["Formación completa empleados", "Ignorar", "Despedir", "Manuales solos"], a: "Formación completa empleados", f: "La capacitación reduce el miedo a la herramienta y mejora la adopción tecnológica."},
    {q: "75. ¿Qué elemento incluye el filestore en un backup de Odoo?", o: ["Solo DB", "Ficheros almacenados", "Config conf", "Addons"], a: "Ficheros almacenados", f: "El filestore contiene imágenes, PDFs y adjuntos que no se guardan directamente en la base de datos SQL."},
    {q: "76. ¿Qué define a un proveedor?", o: ["Impone el IVA", "Compra final", "Fabrica solo", "Provee bienes/servicios"], a: "Provee bienes/servicios", f: "Es el agente encargado de abastecer a la empresa de los recursos necesarios."},
    {q: "77. En Odoo Ventas, ¿qué acción se realiza con un presupuesto?", o: ["Enviar por correo o imprimir", "Facturación automática", "Conversión a lead", "Generación de backup"], a: "Enviar por correo o imprimir", f: "Es el paso inicial para que el cliente revise la oferta comercial."},
    {q: "78. ¿Qué es una línea de producción?", o: ["Fecha sola", "Solo cantidad", "Operaciones secuenciales recursos", "Proveedor"], a: "Operaciones secuenciales recursos", f: "Es la disposición física y lógica de los medios para fabricar un bien."},
    {q: "79. ¿Cuál es un riesgo principal de los ERP en la nube?", o: ["Escalado difícil", "Espionaje de datos", "Bajo coste", "Sin mantenimiento"], a: "Espionaje de datos", f: "Al estar en servidores externos, la seguridad de la conexión y del proveedor es crítica."},
    {q: "80. ¿Qué integra la seguridad en un ERP moderno?", o: ["Solo medidas locales", "Seguridad independiente por app", "Sin encriptación", "Centralizada con actualizaciones automáticas"], a: "Centralizada con actualizaciones automáticas", f: "El sistema central gestiona los parches y permisos de forma global."},
    {q: "81. ¿Cuál es un reto típico de los datos en ERP?", o: ["Heterogéneos no", "Perfectos siempre", "Migración incompleta", "Seguridad extra"], a: "Migración incompleta", f: "No trasladar todos los datos históricos o hacerlo con errores es un fallo común en implantaciones."},
    {q: "82. ¿Dónde se configura el archivo odoo.conf para ajustes del servidor?", o: ["Carpeta de instalación Odoo", "Dentro del navegador", "Módulo Studio", "Base de datos"], a: "Carpeta de instalación Odoo", f: "Es un archivo de sistema inaccesible desde la interfaz web por seguridad."},
    {q: "83. ¿Qué activa el modo desarrollador en Odoo?", o: ["Menú principal", "Configuración → Activar modo desarrollador", "Solo en Studio", "Línea de comandos"], a: "Configuración → Activar modo desarrollador", f: "Permite ver campos técnicos y realizar configuraciones avanzadas desde la UI."},
    {q: "84. ¿Cuál es la principal ventaja de una instalación ERP on-premise?", o: ["Mantenimiento único", "Múltiples configuraciones independientes", "Datos expuestos", "Complejidad operativa baja"], a: "Múltiples configuraciones independientes", f: "Permite un control total sobre la infraestructura y personalizaciones profundas."},
    {q: "85. ¿Qué método está contraindicado para multiusuario?", o: ["VPS", "Navegador web", "Docker", "Acceso simultáneo a carpeta compartida"], a: "Acceso simultáneo a carpeta compartida", f: "Este método es inseguro y propenso a errores de concurrencia."},
    {q: "86. ¿Qué tour realiza Odoo automáticamente al iniciar en cloud?", o: ["Backup", "CRM con oportunidades", "Gestión empleados", "Compras"], a: "CRM con oportunidades", f: "Odoo guía al usuario nuevo a través del flujo de ventas inicial."},
    {q: "87. ¿Qué licencia utiliza Odoo en entornos educativos?", o: ["SAP", "Enterprise", "Community: libre y gratuita", "Navision"], a: "Community: libre y gratuita", f: "La versión Community es la base Open Source que permite el aprendizaje sin costes."},
    {q: "88. En Odoo cloud, ¿qué finaliza la activación de la base de datos?", o: ["Instalación módulos", "Pass master", "Link de confirmación por email", "Logo"], a: "Link de confirmación por email", f: "Odoo requiere validar la cuenta mediante un correo para evitar bases de datos fantasma."},
    {q: "89. ¿Cuál es el modelo de coste característico de la nube?", o: ["Pago por uso escalable", "Hardware fijo", "Sin coste luz", "Autogestionado"], a: "Pago por uso escalable", f: "Se paga solo por los recursos o usuarios que realmente se necesitan."},
    {q: "90. ¿Qué define la relación laboral con un empleado?", o: ["Cliente", "Servicios a cambio de salario por contrato", "Proveedor", "Autónomo sin contrato"], a: "Servicios a cambio de salario por contrato", f: "Es un vínculo jurídico donde se intercambia tiempo y talento por remuneración."},
    {q: "91. ¿Qué módulos de Odoo presentan interconexión nativa?", o: ["CRM exclusivamente", "Aislados", "Sin proveedores", "Ventas-Facturación"], a: "Ventas-Facturación", f: "La integración permite que un pedido aprobado genere su factura sin reintroducir datos."},
    {q: "92. ¿Qué representa un presupuesto de compra en Odoo?", o: ["Solicitud convertible a pedido", "Factura directa", "Lead", "Backup"], a: "Solicitud a proveedores convertible a pedido", f: "Es la formalización de una consulta de precio y stock a un proveedor."},
    {q: "93. ¿Qué implica el proceso de distribución?", o: ["Solo fabricación", "Bienes del almacén al consumidor final", "Eliminación stock", "Exclusión logística"], a: "Bienes del almacén al consumidor final", f: "Engloba el transporte y la entrega del producto vendido."},
    {q: "94. ¿Qué añade Odoo Enterprise sobre Community?", o: ["Totalmente libre", "Igual", "Funcionalidades premium de pago", "Sin soporte"], a: "Funcionalidades premium de pago", f: "Enterprise incluye módulos como Studio, soporte oficial y versiones móviles."},
    {q: "95. ¿Mejor estrategia ante resistencia al cambio?", o: ["Sin comunicación", "Ignorar", "Reemplazo personal", "Mostrar oportunidades estratégicas"], a: "Mostrar oportunidades estratégicas", f: "Ayudar a los empleados a ver cómo la herramienta les facilita la vida reduce la fricción."},
    {q: "96. ¿Qué contienen los addons en el backup de Odoo?", o: ["Solo DB", "Módulos adicionales instalados", "Config", "Sesiones"], a: "Módulos adicionales instalados", f: "Son las carpetas que contienen el código personalizado o extra del sistema."},
    {q: "97. ¿Qué función cumplen los plugins en ERP?", o: ["Funcionalidades modulares", "Hardware", "Licencias", "Datos"], a: "Funcionalidades modulares", f: "Permiten extender el núcleo del sistema de forma limpia."},
    {q: "98. ¿Qué define el almacenamiento en ERP?", o: ["Transporte", "Venta inmediata", "Producción", "Guardar materiales y stock"], a: "Guardar materiales y stock", f: "Es la gestión física de las existencias en el almacén."},
    {q: "99. ¿Cuál es la URL del Database Manager en local?", o: ["/web/database/manager", "/web/app/manager", "App móvil", "SSH"], a: "http://localhost:8069/web/database/manager", f: "Es el panel oculto para crear, duplicar o borrar bases de datos."},
    {q: "100. ¿Cómo se actualiza la lista de módulos nuevos?", o: ["Modo dev solamente", "Reiniciar servidor", "Caché", "Actualizando la lista de aplicaciones"], a: "Actualizando la lista de aplicaciones", f: "Es necesario pulsar esta opción dentro del menú Apps para que Odoo detecte carpetas nuevas en addons."},
    {q: "101. Método para recuperar primer registro SQL:", o: ["fetchall", "fetchone", "fetchmany", "read"], a: "fetchone()", f: "Devuelve una sola fila, ideal para consultas de ID único."},
    {q: "102. Tipo de dato decimal en SQLite:", o: ["INTEGER", "TEXT", "BLOB", "REAL"], a: "REAL", f: "Es el equivalente a float o double en otros sistemas."},
    {q: "103. Comando para guardar cambios permanentes en DB:", o: ["execute", "rollback", "commit", "close"], a: "commit()", f: "Sin este comando, los cambios realizados durante la transacción se pierden."}
    ]
  },
  {
    moduleId: 'management-u4',
    data: [
    {q: "76. ¿Qué imprime: [x**2 for x in [1, 2, 3, 4, 5] if x % 2 == 0]?", o: ["[16, 16]", "[4, 4]", "[16, 4]", "[4, 16]"], a: "[4, 16]", f: "Filtra los números pares (2 y 4) y los eleva al cuadrado."},
    {q: "77. ¿Cuál es el resultado de 'Ana,25,Madrid'.split(',')?", o: ["('Ana', '25', 'Madrid')", "['Ana', '25', 'Madrid']", "{'Ana': '25'}", "Error"], a: "['Ana', '25', 'Madrid']", f: "El método split devuelve una lista de subcadenas basadas en el separador."},
    {q: "78. ¿Resultado de reduce(lambda x, y: x * y, [1, 2, 3, 4])?", o: ["10", "21", "24", "20"], a: "24", f: "Multiplica acumulativamente: ((1*2)*3)*4 = 24."},
    {q: "79. ¿Longitud de {'pera', 'manzana', 'pera', 'kiwi'}?", o: ["3", "4", "Error", "2"], a: "3", f: "Los sets eliminan automáticamente los elementos duplicados."},
    {q: "80. En Cuenta, con saldo 100 y @property que multiplica por 1.1, ¿qué imprime cuenta.saldo?", o: ["110.0", "Error", "100", "_saldo"], a: "110.0", f: "El getter decorado con @property calcula y devuelve el valor dinámicamente."},
    {q: "81. ¿Qué devuelve list(filter(lambda x: x > 3, [1, 2, 3, 4, 5, 6]))?", o: ["[4, 6]", "[4, 5, 6]", "[4, 5]", "[5, 6]"], a: "[4, 5, 6]", f: "Devuelve todos los elementos que cumplen la condición de ser mayores a 3."},
    {q: "82. ¿Qué hace open('datos.txt', 'w')?", o: ["Lee el archivo", "Añade al final", "Crea o sobrescribe el archivo", "Error si no existe"], a: "Crea o sobrescribe el archivo", f: "El modo 'w' (write) trunca el archivo si ya existe o lo crea de cero."},
    {q: "83. ¿Resultado de map(str.upper, ['ana', 'luis', 'marta'])?", o: ["['ana', 'luis']", "['A', 'L', 'M']", "['Ana', 'Luis']", "['ANA', 'LUIS', 'MARTA']"], a: "['ANA', 'LUIS', 'MARTA']", f: "Aplica el método de convertir a mayúsculas a cada elemento de la lista."},
    {q: "84. Si Perro hereda de Animal y ambos tienen hablar(), ¿qué imprime perro.hablar()?", o: ["Sonido genérico", "None", "Guau guau", "Error"], a: "Guau guau", f: "Es un ejemplo de polimorfismo donde prima el método de la clase hija."},
    {q: "85. ¿Qué produce json.dumps({'nombre': 'Ana', 'edad': 25})?", o: ["{'nombre': 'Ana'}", "{\"nombre\": \"Ana\", \"edad\": 25}", "Ana", "Error"], a: "{\"nombre\": \"Ana\", \"edad\": 25}", f: "Serializa el diccionario a una cadena de texto con comillas dobles (estándar JSON)."},
    {q: "86. Resultado de {x: x**2 for x in range(1, 4)}:", o: ["{1: 1, 2: 4, 3: 9}", "{1: 1, 4: 2}", "{1, 4, 9}", "Error"], a: "{1: 1, 2: 4, 3: 9}", f: "Comprensión de diccionario que asigna a cada clave su cuadrado."},
    {q: "87. ¿Qué cadena produce '-'.join(['Python', '3', '11'])?", o: ["Python-3-11", "['Python', '3']", "Python 3 11", "Error"], a: "Python-3-11", f: "Une los elementos de la lista usando el guion como separador."},
    {q: "88. ¿Qué operación realiza 'cur.execute(\"INSERT INTO...\")'?", o: ["Lee registros", "Actualiza datos", "Inserta un nuevo registro", "Elimina tabla"], a: "Inserta un nuevo registro", f: "Es la sentencia DML de SQL para añadir datos."},
    {q: "89. Longitud de frozenset(['rojo', 'azul', 'rojo']):", o: ["2", "1", "3", "Error"], a: "2", f: "Al igual que el set normal, el frozenset no permite duplicados."},
    {q: "90. Resultado de lambda: '  hola mundo  '.strip().upper()", o: ["hola mundo", " HOLA MUNDO ", "HOLA MUNDO", "Error"], a: "HOLA MUNDO", f: "strip() quita espacios exteriores y upper() pasa a mayúsculas."},
    {q: "91. Si self.__pin = '1234', ¿qué devuelve verificar_pin('1234')?", o: ["Error", "None", "__pin", "True"], a: "True", f: "El método interno sí tiene acceso al atributo privado."},
    {q: "92. Resultado de {1, 2, 3, 4} - {3, 4, 5}:", o: ["{3, 4}", "{1, 2}", "set()", "{1, 2, 5}"], a: "{1, 2}", f: "Operación de diferencia: elementos en el primer set que no están en el segundo."},
    {q: "93. ¿Efecto del modo 'a' en open()?", o: ["Sobrescribe", "Lee", "Añade al final del archivo", "Error"], a: "Añade al final del archivo", f: "Modo 'append', no borra el contenido previo."},
    {q: "94. ¿Resultado de reduce(lambda x, y: x + y, [1, 2, 3, 4, 5])?", o: ["17", "14", "16", "15"], a: "15", f: "Suma total de los elementos."},
    {q: "95. ¿Qué muestra Derivada.__mro__?", o: ["Tupla de jerarquía", "Diccionario", "Error", "Solo clase base"], a: "Tupla de jerarquía", f: "Muestra el orden de resolución de métodos de la clase."},
    {q: "96. ¿Qué objeto Python genera json.loads() de un objeto JSON?", o: ["str", "dict", "list", "Error"], a: "dict", f: "Mapea los objetos '{}' de JSON a diccionarios de Python."},
    {q: "97. Resultado de [num for fila in [[1,2],[3,4]] for num in fila]:", o: ["[1,2]", "[1,2,3,4]", "[[1,2]]", "Error"], a: "[1, 2, 3, 4]", f: "Comprensión anidada para aplanar una matriz."},
    {q: "98. ¿Qué permite @limite.setter?", o: ["Solo lectura", "Borrar", "Asignación con validación", "Excepción"], a: "Asignación con validación", f: "Permite ejecutar código (como un max(0, v)) al intentar asignar un valor."},
    {q: "99. ¿Qué imprime print(archivo.closed) tras salir de un bloque with?", o: ["False", "True", "Error", "None"], a: "True", f: "El context manager asegura el cierre del recurso automáticamente."},
    {q: "100. ¿Resultado de {'Ana', 'Luis'} | {'Luis', 'Marta'}?", o: ["{'Ana', 'Luis'}", "{'Luis'}", "{'Ana', 'Luis', 'Marta'}", "Error"], a: "{'Ana', 'Luis', 'Marta'}", f: "Operación de unión: todos los elementos de ambos sin duplicados."},
    {q: "101. ¿Qué hace pickle.dump?", o: ["Guarda JSON", "Lee binario", "Serializa objeto Python a binario", "Texto"], a: "Serializa objeto Python a binario", f: "Pickle es el formato de serialización nativo de Python."},
    {q: "102. ¿Qué recupera cur.fetchone()[0] tras un SELECT COUNT(*)?", o: ["Nombres", "Número total de registros", "Precios", "None"], a: "Número total de registros", f: "fetchone() devuelve una tupla; el índice 0 tiene el resultado del conteo."},
    {q: "103. Resultado de '-'.join('a_b_c'.split('_')):", o: ["a_b_c", "a-b-c", "abc", "Error"], a: "a-b-c", f: "Divide por guion bajo y une con guion medio."},
    {q: "104. ¿Qué hereda una Sucursal de Empresa(nombre='TechCorp')?", o: ["None", "Sucursal", "Error", "TechCorp"], a: "TechCorp", f: "Atributo de clase heredado por la subclase."},
    {q: "105. ¿Qué hace el método writelines de un archivo?", o: ["Escribe una línea", "Escribe cada string de una lista", "Lee", "Añade \n"], a: "Escribe cada string de la lista", f: "Vuelca una colección de cadenas al archivo sin añadir saltos de línea extra."},
    {q: "106. ¿Qué devuelve max([('A', 10), ('B', 50)], key=lambda x: x[1])?", o: ["('B', 50)", "'B'", "50", "Error"], a: "('B', 50)", f: "Busca el elemento cuya segunda posición (índice 1) sea la mayor."},
    {q: "107. ¿Qué valor imprime p.distancia_origen para Punto(3, 4)?", o: ["7", "5.0", "3.4", "25"], a: "5.0", f: "Aplica Pitágoras (3^2 + 4^2 = 25, raíz = 5)."},
    {q: "108. ¿Intersección entre {1, 2, 3, 4} & {2, 3, 5, 6}?", o: ["{1,2,3,4,5,6}", "{2, 3}", "set()", "{4, 5}"], a: "{2, 3}", f: "Elementos comunes a ambos conjuntos."},
    {q: "109. ¿Qué hace json.load (sin 's')?", o: ["Escribe", "Lee JSON de archivo y convierte a dict/list", "String", "Error"], a: "Lee JSON de archivo y convierte a dict/list", f: "Carga datos desde un file-object."},
    {q: "110. Cuadrado(5).area() heredado de Rectangulo:", o: ["0", "Error", "25", "None"], a: "25", f: "El método área fue sobrescrito correctamente en la clase hija."},
    {q: "111. Resultado de reduce(lambda x, y: x if x < y else y, [8, 3, 15, 2]):", o: ["8", "15", "2", "3"], a: "2", f: "Encuentra el valor mínimo de la lista."},
    {q: "112. Resultado de [x**2 if x % 2 == 0 else -x for x in [1, 2, 3]]:", o: ["[1, 4, 9]", "[1, 4, -3]", "[-1, 4, -3]", "[-1, 2, -3]"], a: "[-1, 4, -3]", f: "Si es par al cuadrado (4), si es impar negativo (-1, -3)."},
    {q: "113. Longitud de frozenset([1, (2, 3), (2, 3), 4]):", o: ["5", "3", "4", "2"], a: "3", f: "Los elementos únicos son 1, la tupla (2,3) y 4."},
    {q: "114. Herencia múltiple D(B, C). Si B y C tienen f(), ¿cuál se ejecuta?", o: ["B", "C", "A", "None"], a: "B", f: "Sigue el orden de definición de izquierda a derecha (MRO)."},
    {q: "115. Tras p.valor = -5 con max(0, valor) en setter, ¿qué imprime p.valor?", o: ["-5", "10", "5", "0"], a: "0", f: "El setter ha normalizado el valor negativo a 0."},
    {q: "116. type(json.loads('[\"a\", \"b\", \"c\"]')):", o: ["list", "dict", "tuple", "set"], a: "list", f: "Mapeo de array JSON a lista Python."},
    {q: "117. map(operator.add, [1, 2], [4, 5]) genera:", o: ["[5, 7]", "[4, 5]", "[1, 2]", "[1, 3]"], a: "[5, 7]", f: "Suma los elementos posición a posición (1+4, 2+5)."},
    {q: "118. cur.fetchone() tras INSERT de (1, 'Ana'):", o: ["None", "(0, 'Ana')", "(1, 'Ana')", "Error"], a: "(1, 'Ana')", f: "Recupera la tupla insertada."},
    {q: "119. s1 ^ s2 ({1, 2, 3} ^ {2, 3, 4}):", o: ["{1, 4}", "{2, 3}", "{1, 2, 3, 4}", "{1, 2, 3}"], a: "{1, 4}", f: "Diferencia simétrica: elementos que están en uno u otro, pero no en ambos."},
    {q: "120. print(Clase.contador) tras crear 2 instancias con contador += 1:", o: ["2", "1", "0", "3"], a: "2", f: "Atributo de clase compartido y actualizado en cada __init__."},
    {q: "121. json.dumps({'a': 1})[0] es:", o: ["'a'", "a", "{", "\""], a: "{", f: "El primer carácter de la cadena JSON de un objeto es la llave de apertura."},
    {q: "122. map(sum, map(lambda x: x*2, [[1, 2]])):", o: ["[4, 8]", "[2, 4]", "[1, 2]", "[6]"], a: "[6]", f: "Dobla [1,2] a [2,4] y luego suma los elementos (2+4 = 6)."},
    {q: "123. print(p) si __str__ devuelve f'({self.x}, {self.y})':", o: ["Punto(3, 4)", "3, 4", "(3, 4)", "3 4"], a: "(3, 4)", f: "Se invoca el método __str__ para la representación textual."},
    {q: "124. {c for c in 'abracadabra' if c not in 'aeiou'} sorted:", o: ["acdr", "abcdr", "['b', 'c', 'd', 'r']", "abr"], a: "['b', 'c', 'd', 'r']", f: "Extrae consonantes únicas y las ordena alfabéticamente."},
    {q: "125. json.dumps([{'n': x} for x in range(2, 4)])[1] es:", o: ["{", "n", "\"", "["], a: "{", f: "La cadena es '[{\"n\": 2}...]', el índice 1 es la llave del primer objeto."},
    {q: "126. Decorador @dobla: dobla(5) devuelve:", o: ["5", "7.5", "10", "None"], a: "10", f: "El decorador multiplica el resultado de la función original por 2."},
    {q: "127. f = lambda x, y=3: x**y. ¿f(2) es?", o: ["2", "5", "8", "6"], a: "8", f: "Usa el valor por defecto de y=3, por lo tanto 2^3 = 8."},
    {q: "128. filter(lambda k: d[k] > 3, d.keys()) para {'a': 1, 'c': 7}:", o: ["['a', 'b']", "['a', 'c']", "['c']", "[]"], a: "['c']", f: "Solo la clave 'c' tiene un valor mayor a 3."},
    {q: "129. p.__dict__ para clase con _v y property valor:", o: ["{'_v': 10}", "{'_v': 20, 'valor': 20}", "{'_v': 20}", "Error"], a: "{'_v': 10}", f: "Las propiedades no se guardan en el __dict__ de la instancia, solo los atributos reales."},
    {q: "130. with open... raise RuntimeError. ¿Qué sucede?", o: ["Cierra y sigue", "No abre", "Lanza error y no imprime 'final'", "Solo crea"], a: "Lanza error y no imprime 'final'", f: "El programa se interrumpe, pero el block 'with' garantiza que el archivo se cierre antes de propagar el error."},
    {q: "131. len({frozenset({1, 2}), frozenset({1, 2})}):", o: ["0", "1", "2", "TypeError"], a: "1", f: "Como son frozensets idénticos, el set solo guarda uno."},
    {q: "132. map(lambda x: lambda y: x + y (2), [1, 2, 3]):", o: ["[1, 2, 3]", "[2, 2, 2]", "[3, 4, 5]", "[4, 5, 6]"], a: "[3, 4, 5]", f: "Suma 2 a cada elemento de la lista."},
    {q: "133. type(fetchone() de columna REAL):", o: ["float", "int", "str", "decimal"], a: "float", f: "SQLite mapea el tipo REAL al tipo float de Python."},
    {q: "134. @decorar(3) sobre f(x)=x*2. ¿f(4)?", o: ["4", "8", "11", "7"], a: "11", f: "(4 * 2) + 3 = 11."},
    {q: "135. json.dumps('café')[1] es:", o: ["c", "é", "a", "f"], a: "c", f: "La cadena serializada es '\"café\"', el índice 0 es la comilla y el 1 es la 'c'."},
    {q: "136. print(hasattr(c, 'x'), getattr(c, 'x')) si x=10:", o: ["False 10", "True 10", "True None", "Error"], a: "True 10", f: "Reflection: detecta que el atributo existe y recupera su valor."},
    {q: "137. c.b = 20 en clase con __slots__ = ['a']:", o: ["10", "20", "AttributeError", "30"], a: "AttributeError", f: "__slots__ impide la creación de atributos que no estén en la lista definida."}
    ]
  }
];

const mappedQuestions = [];
let globalIndex = 857;

rawSections.forEach(section => {
  section.data.forEach((q, i) => {
    let opts = q.o.map((text, idx) => ({
      id: String.fromCharCode(97 + idx),
      text: text
    }));
    
    let correctOpt = opts.find(opt => q.a.includes(opt.text) || opt.text.includes(q.a));
    let correctId = correctOpt ? correctOpt.id : 'a';
    
    mappedQuestions.push({
      id: "management-q" + String(globalIndex).padStart(3, '0'),
      subjectId: 'management',
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

console.log('Successfully added ' + mappedQuestions.length + ' Management questions. Total: ' + combined.length);
