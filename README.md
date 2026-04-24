# 🌌 Los Juegos del DAM

Una plataforma de estudio inmersiva, de estética *cyberpunk* / futurista, diseñada para preparar y superar los exámenes del ciclo formativo de Desarrollo de Aplicaciones Multiplataforma (DAM). 

## 🚀 Despliegue Rápido en Vercel

Este proyecto está listo para ser desplegado fácilmente en Vercel. 

1. **Sube el código a GitHub:**
   - Abre tu terminal en la carpeta de este proyecto.
   - Si no has inicializado un repositorio, ejecuta: `git init`
   - Agrega los archivos: `git add .`
   - Haz un commit: `git commit -m "feat: versión final"`
   - Conéctalo a tu repositorio remoto en GitHub: `git remote add origin <URL-de-tu-repo>`
   - Empuja el código: `git push -u origin main`

2. **Importa en Vercel:**
   - Ve a [Vercel](https://vercel.com/new).
   - Conecta tu cuenta de GitHub e importa el repositorio que acabas de subir.
   - Vercel detectará automáticamente **Vite**.
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` o `vite build`
   - **Output Directory**: `dist`
   - Haz clic en **Deploy**.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5, JavaScript (ES6+), CSS3
- **Estilos:** Tailwind CSS v4 + Animaciones personalizadas
- **Herramientas de construcción:** Vite
- **Iconografía:** Lucide React (vía CDN en el prototipo final)

## 🧩 Características

- **Diseño Responsivo e Inmersivo**: Interfaz "estilo terminal", con scanlines y modo neón. Navegación en cascada y scroll espía.
- **Protocolo de Estudio Activo**: Simulador de test riguroso pero interactivo.
- **Progreso Persistente**: Uso de `localStorage` para guardar de forma local las puntuaciones conseguidas en simulacros y repeticiones.
- **Rutado SPA sin recargas**: Sistema construido en JavaScript Vanilla con Hash Routing (`#/home`, `#/modules`, etc.) optimizado para fluidez y para no saturar al usuario con recargas innecesarias.

¡Que los Juegos del DAM comiencen, y que las variables siempre estén a tu favor!
