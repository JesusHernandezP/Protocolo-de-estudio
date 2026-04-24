const fs = require('fs');

const rawSections = [
  {
    moduleId: 'db-u1',
    data: [
    {q: "¿Qué clase de Java se usa para representar un fichero o directorio?", o: ["java.io.InputStream", "java.nio.Path", "java.io.FileReader", "java.io.File"], a: "java.io.File", f: "La clase java.io.File representa rutas de ficheros y directorios en Java."},
    {q: "¿Qué método de la clase File comprueba si un fichero existe?", o: ["exists()", "canRead()", "isPresent()", "isFile()"], a: "exists()", f: "El método exists() devuelve true si el fichero o directorio existe en el sistema."},
    {q: "¿Qué clase se usa para leer texto carácter a carácter de un fichero?", o: ["FileReader", "ObjectInputStream", "FileOutputStream", "BufferedWriter"], a: "FileReader", f: "FileReader es un Reader que permite leer caracteres de un fichero de texto."},
    {q: "¿Qué clase permite leer líneas completas de texto de forma eficiente?", o: ["DataInputStream", "FileWriter", "PrintStream", "BufferedReader"], a: "BufferedReader", f: "BufferedReader tiene el método readLine() que permite leer líneas completas de texto."},
    {q: "¿Cuál es la forma correcta de escribir texto en un fichero?", o: ["new FileInputStream('fichero.txt')", "new FileReader('fichero.txt')", "new ObjectReader('fichero.txt')", "new FileWriter('fichero.txt')"], a: "new FileWriter('fichero.txt')", f: "FileWriter permite escribir caracteres en un fichero de texto."},
    {q: "¿Qué excepción se lanza habitualmente al trabajar con ficheros?", o: ["NullPointerException", "ClassNotFoundException", "IOException", "IllegalArgumentException"], a: "IOException", f: "IOException es la excepción base para errores de entrada/salida."},
    {q: "¿Qué clase de java.nio.file se usa para operaciones avanzadas?", o: ["FileSystem", "FileStore", "Files", "Paths"], a: "Files", f: "La clase Files proporciona métodos estáticos para operaciones avanzadas sobre ficheros."},
    {q: "¿Qué método de File devuelve un array con los ficheros de un directorio?", o: ["getChildren()", "getFiles()", "list()", "listFiles()"], a: "listFiles()", f: "listFiles() devuelve un array de objetos File con el contenido del directorio."},
    {q: "¿Qué clase se utiliza para serializar objetos Java?", o: ["BufferedOutputStream", "FileWriter", "DataOutputStream", "ObjectOutputStream"], a: "ObjectOutputStream", f: "ObjectOutputStream permite escribir objetos Java serializados en un flujo de salida."},
    {q: "¿Qué interfaz debe implementar una clase para ser serializable?", o: ["Cloneable", "Serializable", "Runnable", "Comparable"], a: "Serializable", f: "La interfaz Serializable marca una clase como serializable en Java."}
    ]
  },
  {
    moduleId: 'db-u2',
    data: [
    {q: "¿Qué significa JDBC?", o: ["Java Data Binary Connection", "Java DataBase Connectivity", "Java Dynamic Base Connector", "Java DataBase Configuration"], a: "Java DataBase Connectivity", f: "JDBC es la API para conectar con bases de datos relacionales."},
    {q: "¿Qué interfaz representa una conexión activa?", o: ["Statement", "ResultSet", "DriverManager", "Connection"], a: "Connection", f: "La interfaz Connection representa una sesión de conexión a la base de datos."},
    {q: "¿Qué método de DriverManager obtiene la conexión?", o: ["openConnection()", "connect()", "createConnection()", "getConnection()"], a: "getConnection()", f: "getConnection(url, user, password) devuelve una conexión a la BBDD."},
    {q: "¿Ventaja de PreparedStatement frente a Statement?", o: ["Cierre automático", "Permite transacciones", "Rapidez de escritura", "Previene inyección SQL y usa parámetros"], a: "Previene inyección SQL y usa parámetros", f: "PreparedStatement usa marcadores (?) que mejoran la seguridad y rendimiento."},
    {q: "¿Qué interfaz representa el resultado de un SELECT?", o: ["RowSet", "DataSet", "ResultSet", "QueryResult"], a: "ResultSet", f: "ResultSet contiene las filas devueltas por una consulta SELECT."},
    {q: "¿Qué método avanza al siguiente registro en un ResultSet?", o: ["moveNext()", "next()", "getNext()", "advance()"], a: "next()", f: "next() avanza el cursor a la siguiente fila y devuelve true si existe."},
    {q: "¿Qué método ejecuta una sentencia SELECT?", o: ["execute()", "executeQuery()", "executeUpdate()", "executeSelect()"], a: "executeQuery()", f: "executeQuery() se usa para sentencias SELECT y devuelve un ResultSet."},
    {q: "¿Para qué sirve setAutoCommit(false)?", o: ["Deshabilitar driver", "Cerrar conexión", "Manejo manual de transacciones", "Limpiar ResultSet"], a: "Manejo manual de transacciones", f: "Permite controlar manualmente cuándo se confirman los cambios con commit()."},
    {q: "¿Qué método confirma una transacción?", o: ["save()", "commit()", "confirm()", "apply()"], a: "commit()", f: "commit() de Connection confirma todos los cambios de la transacción actual."},
    {q: "¿URL JDBC típica para MySQL?", o: ["jdbc:mysql:localhost/db", "jdbc:mysql://localhost:3306/db", "sql:mysql://localhost/db", "mysql://localhost:3306/db"], a: "jdbc:mysql://localhost:3306/db", f: "Sigue el formato jdbc:mysql://host:puerto/nombre_bd."}
    ]
  },
  {
    moduleId: 'db-u3',
    data: [
    {q: "¿Qué significa ORM?", o: ["Object Relational Mapping", "Object Resource Manager", "Online Relational Model", "Object Runtime Module"], a: "Object Relational Mapping", f: "Mapea objetos Java a tablas de bases de datos relacionales."},
    {q: "¿Framework ORM más popular en Java?", o: ["JDBC", "MyBatis", "Hibernate", "Spring Data"], a: "Hibernate", f: "Hibernate es el framework ORM más utilizado y referencia de JPA."},
    {q: "¿Estándar de Java que define la API para ORM?", o: ["JNDI", "JPA", "JTA", "JDBC"], a: "JPA", f: "Java Persistence API (JPA) es la especificación estándar para mapeo ORM."},
    {q: "¿Anotación para marcar una clase como entidad?", o: ["@Persistent", "@Entity", "@Model", "@Table"], a: "@Entity", f: "Indica que la clase Java se mapea a una tabla de la base de datos."},
    {q: "¿Anotación que indica la clave primaria?", o: ["@UniqueId", "@Key", "@PrimaryKey", "@Id"], a: "@Id", f: "Marca el campo que será la clave primaria de la tabla."},
    {q: "¿Anotación para que la clave se genere automáticamente?", o: ["@AutoId", "@GeneratedValue", "@Sequence", "@AutoGenerate"], a: "@GeneratedValue", f: "Indica que el valor del campo @Id es generado por la BBDD."},
    {q: "¿Interfaz de JPA que gestiona operaciones CRUD?", o: ["SessionFactory", "Transaction", "EntityManager", "DataSource"], a: "EntityManager", f: "Es la interfaz central para persistir, buscar y eliminar entidades."},
    {q: "¿Lenguaje de consulta de JPA?", o: ["NativeQL", "SQL", "JPQL", "HQL"], a: "JPQL", f: "Java Persistence Query Language es el lenguaje orientado a objetos de JPA."},
    {q: "¿Anotación para mapear un campo a una columna específica?", o: ["@DBColumn", "@Field", "@Attribute", "@Column"], a: "@Column", f: "Permite especificar el nombre y propiedades de la columna en la BBDD."},
    {q: "¿Relación JPA cuando una entidad tiene varios objetos de otra?", o: ["@ManyToOne", "@ManyToMany", "@OneToMany", "@OneToOne"], a: "@OneToMany", f: "Mapea una relación de uno a muchos mediante colecciones."}
    ]
  },
  {
    moduleId: 'db-u4',
    data: [
    {q: "¿Qué son las bases de datos objeto-relacionales?", o: ["Sin esquema", "Distribuidas", "Relacionales con conceptos de OO", "Solo objetos"], a: "Relacionales con conceptos de OO", f: "Extienden el modelo relacional con herencia, tipos complejos y métodos."},
    {q: "¿Driver JDBC para PostgreSQL?", o: ["org.postgresql.Driver", "postgresql.jdbc.Driver", "com.postgresql.jdbc.Driver", "org.pg.Driver"], a: "org.postgresql.Driver", f: "Es el driver oficial de PostgreSQL para Java."},
    {q: "¿Qué permite el tipo ARRAY en PostgreSQL?", o: ["Índices rápidos", "Relaciones sin FK", "Múltiples valores en una columna", "Binarios"], a: "Múltiples valores en una columna", f: "Permite almacenar una lista de valores en una sola columna."},
    {q: "¿Concepto de OO que permite herencia de tablas?", o: ["Abstracción", "Encapsulación", "Polimorfismo", "Herencia de tablas"], a: "Herencia de tablas", f: "PostgreSQL soporta que una tabla hija herede columnas de la padre."},
    {q: "¿Tipo definido por el usuario para agrupar campos?", o: ["STRUCT", "OBJECT TYPE", "USER DEFINED TYPE (UDT)", "COMPOSITE"], a: "USER DEFINED TYPE (UDT)", f: "Permiten crear tipos complejos similares a clases en SQL."},
    {q: "¿Estándar SQL que incluyó capacidades OO?", o: ["SQL-92", "SQL-89", "SQL:2003", "SQL:1999"], a: "SQL:1999", f: "Introdujo tipos definidos por el usuario y herencia en SQL."},
    {q: "¿Cómo se accede en Java a un UDT?", o: ["getArray()", "getString()", "getObject() y cast a Struct", "getBlob()"], a: "getObject() y cast a Struct", f: "Se recuperan con getObject() y se convierten a java.sql.Struct."},
    {q: "¿Cuál es una base de datos orientada a objetos pura?", o: ["PostgreSQL", "MySQL", "Oracle", "db4o"], a: "db4o", f: "db4o almacena objetos Java directamente sin mapeo relacional."},
    {q: "¿Ventaja de BBDD OO en aplicaciones Java?", o: ["Eliminan desfase objeto-relacional", "Siempre más rápidas", "Más baratas", "Mejor SQL"], a: "Eliminan desfase objeto-relacional", f: "Eliminan el 'impedance mismatch' al persistir objetos directamente."},
    {q: "¿Qué es el 'impedance mismatch'?", o: ["Codificación", "Conflicto entre modelo de objetos y relacional", "Versión de driver", "Error de red"], a: "Conflicto entre modelo de objetos y relacional", f: "Es la dificultad de mapear objetos a tablas relacionales."}
    ]
  },
  {
    moduleId: 'db-u5',
    data: [
    {q: "¿Qué significa XML?", o: ["eXtensible Markup Language", "eXtensible Model Listing", "eXtended Model Language", "eXtra Markup List"], a: "eXtensible Markup Language", f: "Lenguaje de marcas para estructurar datos."},
    {q: "¿API que carga el XML completo en memoria?", o: ["SAX", "JAXB", "DOM", "StAX"], a: "DOM", f: "Document Object Model carga el XML como un árbol de nodos en memoria."},
    {q: "¿API secuencial basada en eventos para XML?", o: ["JAXB", "DOM", "XPath", "SAX"], a: "SAX", f: "Simple API for XML procesa el fichero sin cargarlo todo, ideal para archivos grandes."},
    {q: "¿Tecnología que convierte XML en objetos automáticamente?", o: ["JAXB", "XQuery", "DOM", "SAX"], a: "JAXB", f: "Java Architecture for XML Binding convierte XML a objetos Java y viceversa."},
    {q: "¿Lenguaje para buscar nodos en un XML?", o: ["SQL", "HQL", "JPQL", "XPath"], a: "XPath", f: "Es el estándar para navegar y seleccionar nodos en un documento XML."},
    {q: "¿Anotación JAXB para la clase raíz?", o: ["@XmlDocument", "@XmlRootElement", "@XmlRoot", "@XmlClass"], a: "@XmlRootElement", f: "Indica que la clase es el elemento raíz del XML generado."},
    {q: "¿Qué es una base de datos XML nativa?", o: ["Almacena y consulta XML directamente", "Sistema de ficheros", "Relacional que importa XML", "Sin esquema"], a: "Almacena y consulta XML directamente", f: "Preservan la estructura original del XML (ej. eXist-db)."},
    {q: "¿Lenguaje de consulta específico para BBDD XML?", o: ["SQL", "HQL", "XQuery", "JPQL"], a: "XQuery", f: "Es el estándar W3C para consultar y transformas datos XML."},
    {q: "¿Proceso de convertir Objeto Java a XML?", o: ["Encoding", "Serialización", "Marshalling", "Parsing"], a: "Marshalling", f: "Es la transformación de un objeto Java en su representación XML."},
    {q: "¿Interfaz DOM que representa el documento completo?", o: ["XmlTree", "Node", "Document", "Element"], a: "Document", f: "Representa el documento completo y es el nodo raíz del árbol."}
    ]
  },
  {
    moduleId: 'db-u6',
    data: [
    {q: "¿Qué son los JavaBeans?", o: ["Componentes reutilizables", "Módulos de servidor", "Ficheros XML", "Librerías BBDD"], a: "Componentes reutilizables", f: "Siguen convenciones como getters/setters y constructor vacío."},
    {q: "¿Convención de acceso a propiedades en JavaBeans?", o: ["getProp y setProp", "prop y setProp", "read y write", "fetch y store"], a: "getProp y setProp", f: "Se usan getters y setters siguiendo la nomenclatura estándar."},
    {q: "¿Patrón de Spring que gestiona dependencias?", o: ["Factory Method", "Observer", "Singleton puro", "Inyección de dependencias (DI)"], a: "Inyección de dependencias (DI)", f: "Usa DI e Inversión de Control para gestionar componentes."},
    {q: "¿Anotación genérica para un componente Spring?", o: ["@Managed", "@Component", "@Service", "@Bean"], a: "@Component", f: "Es la anotación base para declarar un componente gestionado."},
    {q: "¿Anotación específica para la capa de repositorio?", o: ["@Component", "@Repository", "@Controller", "@Service"], a: "@Repository", f: "Marca la capa de datos y activa la traducción de excepciones."},
    {q: "¿Qué es Spring Data JPA?", o: ["Driver JDBC", "Framework XML", "ORM propio", "Abstracción de JPA"], a: "Abstracción de JPA", f: "Simplifica el acceso a datos mediante repositorios automáticos."},
    {q: "¿Interfaz para crear un repositorio básico?", o: ["EntityManager", "DataRepository", "CrudRepository", "JpaSession"], a: "CrudRepository", f: "Proporciona las operaciones CRUD básicas automáticas."},
    {q: "¿Anotación Spring para transacciones?", o: ["@Transactional", "@Commit", "@Transaction", "@Atomic"], a: "@Transactional", f: "Gestiona inicio, commit y rollback automáticamente."},
    {q: "¿Ventaja de un pool como HikariCP?", o: ["Elimina JDBC", "Sin credenciales", "Genera SQL", "Reutiliza conexiones"], a: "Reutiliza conexiones", f: "Mantiene conexiones abiertas mejorando el rendimiento."},
    {q: "¿Propósito del patrón DAO?", o: ["Transacciones auto", "Separar lógica de datos de la de negocio", "Definir UI", "Generar esquemas"], a: "Separar lógica de datos de la de negocio", f: "Encapsula el acceso a datos tras una interfaz abstracta."}
    ]
  }
];

const mappedQuestions = [];
let globalIndex = 161; // Continue from digitalization questions

rawSections.forEach(section => {
  section.data.forEach((q, i) => {
    let opts = q.o.map((text, idx) => ({
      id: String.fromCharCode(97 + idx),
      text: text
    }));
    
    let correctOpt = opts.find(opt => q.a.includes(opt.text) || opt.text.includes(q.a));
    let correctId = correctOpt ? correctOpt.id : 'a';
    
    mappedQuestions.push({
      id: "db-q" + String(globalIndex).padStart(3, '0'),
      subjectId: 'database',
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

console.log('Successfully added ' + mappedQuestions.length + ' database questions. Total: ' + combined.length);
