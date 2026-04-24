# 📖 Especificación Técnica: Los Juegos del DAM

Este proyecto se ha mantenido lo más ligero posible, omitiendo la necesidad de un framework React pesado, usando Vanilla JS en módulos para potenciar la carga rápida y la personalización exacta.

## Estructura de Directorios

- `/js/`: Contiene la lógica del negocio.
  - `app.js`: Entry point. Orquesta los enrutamientos y carga las vistas y los fondos (efecto Canvas y Scroll Observer).
  - `data.js`: Mock o lectura de los JSON locales (Vía Fetch de `/data/`).
  - `progress.js`: Servicio envoltorio de `localStorage`.
  - `quiz.js`: Lógica de evaluación de respuestas y estado de la partida actual.
  - `router.js`: Controlador de vistas a través del hash en la URI.
  - `ui.js`: Constructor del DOM interactivo basado en Tailwind.
- `/css/`: Constantes CSS de variables neón, efectos inmersivos como _scanlines_ o fondos con filtros blur y grid layouts (ej. `styles.css`).
- `/src/index.css`: Archivo base principal para el procesamiento de Tailwind CSS.
- `/data/`: Archivos `.json` estáticos de solo lectura con módulos (`subjects.json`) y sus preguntas asociadas (`questions.json`).

## Modelo de Datos Local

### Subject (Asignatura)
Representa un módulo formativo, ej: Programación, Entornos de Desarrollo.
- `id` (String): ID Único del curso.
- `title` (String): Título completo.
- `abbreviation` (String): Siglas para badges.
- `color` (String): Preferencia visual de resalte (ej `cyan`, `purple`).

### Question (Pregunta)
- `id` (String): Identificador interno.
- `moduleId` (String): Módulo de la asignatura al que pertenece (ej `MOD_01`).
- `subjectId` (String): Conexión Padre al Subject.
- `text` (String): Texto del enunciado de la pregunta.
- `options` (Array): Lista de opciones `{ id: string, text: string }`.
- `correctOptionId` (String): Id que resuelve la métrica.
- `explanation` (String): Explicación motivada del feedback.

## Decisiones Arquitectónicas (ADRs)

1. **Tailwind CSS v4 vía Vite:** Aprovecha el motor de purgado e inclusión rápida manteniendo la sintaxis oficial, a la vez que hace el despliegue a Vercel casi inmediato y sin fricciones.
2. **Hash Routing:** Permite un simulador Single Page Application genuino en un servidor de archivos estáticos genérico (Nginx, Netlify, Github Pages, Vercel...) sin requerir la intervención para configurar reescrituras de URLs al `index.html`.
3. **ScrollSpy Automático:** Al transitar por scroll en la landing, se autoescribe el `#` subyacente en la barra de URL para prevenir desajustes al recargar la ventana.
