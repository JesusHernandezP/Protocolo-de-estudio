# Especificación Técnica - Los Juegos del DAM

## Arquitectura
- **SPA (Single Page Application)**: Navegación basada en hashes (#).
- **Módulos ES6**: Separación de responsabilidades.
- **Estado Local**: Persistencia en `localStorage` bajo la clave `damStudyProgress`.

## Rutas
- `#/home`: Pantalla principal.
- `#/subject/:id`: Vista de módulos de una asignatura.
- `#/quiz/:moduleId`: Interfaz de examen.
- `#/results/:moduleId`: Resumen de desempeño.
- `#/review/:moduleId`: Repaso de errores guardados.

## Formato de Datos (JSON)
Las preguntas siguen el esquema obligatorio con `optionExplanations` y `correctOptionId`.
