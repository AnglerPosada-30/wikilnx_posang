# Página 7 · Bitácora de Interacción y Prompt Engineering (IA)

## 1. Metodología de Uso (Prompt Engineering)
Durante el desarrollo del proyecto `wikilnx_posang`, utilicé el modelo Gemini como asistente técnico. Para garantizar respuestas precisas y evitar código genérico o desactualizado, apliqué técnicas de *Prompt Engineering*. 

En lugar de hacer preguntas simples, estructuré mis consultas definiendo claramente:
* **El Rol:** Cómo debía comportarse la IA (ej. Administrador de Sistemas, Desarrollador DevOps).
* **El Contexto:** Detalles de mi entorno de trabajo (Ubuntu Server CLI, Vite, React).
* **El Problema:** El error exacto o la duda conceptual a resolver.
* **La Tarea / Restricciones:** Lo que esperaba como salida (comandos específicos, análisis de factibilidad, evitar interfaces gráficas).

A continuación, detallo los *prompts* estructurados que diseñé para superar los hitos más complejos del laboratorio.

---

## 2. Registro de Prompts Estructurados

### Hito 1: Arquitectura de Despliegue y Control de Versiones
Para entender el ciclo de vida del software antes de ejecutar comandos a ciegas en el servidor, diseñé este prompt buscando clarificar la arquitectura técnica.

> **Mi Prompt Estructurado:**
> *"Actúa como un Ingeniero DevOps. **Contexto:** Estoy desarrollando una Wiki web con React (Vite) en Windows y necesito desplegarla en un entorno de producción (Ubuntu Server 24.04 CLI) utilizando Nginx. **Problema:** Al clonar mi repositorio en el servidor y hacer `npm install` me da un error de que no existe el `package.json` **Tarea:** Explícame detalladamente el flujo de trabajo correcto entre el entorno de desarrollo local, el control de versiones en GitHub y el servidor. Además, aclárame si conceptualmente mi servidor Ubuntu operará de forma similar a plataformas PaaS como Vercel, y cómo se dividen las responsabilidades de compilación y alojamiento web."*

**Resultado:** Gracias a esta instrucción detallada, la IA me explicó la diferencia entre el entorno de desarrollo donde se crea el `package.json` y el repositorio. Comprendí que yo estaba construyendo mi propio motor de despliegue manual, usando Node.js para compilar `npm run build` y Nginx para servir estáticos.

### Hito 2: Resolución de Errores de Dependencias (Tailwind CSS)
Cuando el servidor frontend falló tras la instalación de librerías, evité pedir "soluciones mágicas" y le entregué a la IA el registro exacto del motor de empaquetado.

> **Mi Prompt Estructurado:**
> *"Actúa como Desarrollador Frontend experto. **Contexto:** Estoy configurando Tailwind CSS en un proyecto nuevo de Vite. **Problema:** Al ejecutar `npm run dev`, Vite arroja un Error 500 con el siguiente mensaje exacto en consola: `[postcss] It looks like you're trying to use tailwindcss directly as a PostCSS plugin. The PostCSS plugin has moved...` **Tarea:** Analiza si esto se debe a un choque de compatibilidad por la reciente actualización de Tailwind a la versión 4. Si es así, entrégame el comando CLI exacto de `npm` para forzar la desinstalación de la versión conflictiva e instalar de forma segura la última versión 3 estable, sin romper el resto de mis configuraciones."*

**Resultado:** El prompt permitió diagnosticar inmediatamente el choque entre la arquitectura antigua de PostCSS y la nueva v4 de Tailwind. Apliqué el comando `npm install -D tailwindcss@3` y estabilicé mi entorno sin perder tiempo reconfigurando archivos.

### Hito 3: Enrutamiento de Archivos Estáticos en Compilación
Me enfrenté a un problema donde las imágenes se veían en mi código, pero desaparecían en el navegador al compilar el proyecto.

> **Mi Prompt Estructurado:**
> *"**Contexto:** Utilizo Vite, React y `react-markdown` para mi wiki. Las rutas de mis capturas de pantalla en los archivos `.md` están escritas como rutas relativas (`../img/foto.png`) **Problema:** En el código fuente de VS Code se enlazan bien, pero al compilar el proyecto `npm run build` y subirlo al servidor Nginx, las imágenes arrojan un error HTTP 404 (Not Found). **Tarea:** Explícame a nivel técnico cómo maneja Vite los archivos estáticos en tiempo de construcción (build time). Indícame en qué directorio específico de la arquitectura del proyecto debo ubicar mis imágenes y cómo debe ser la sintaxis exacta de la ruta en el Markdown para que Nginx las resuelva correctamente desde la raíz del dominio."*

**Resultado:** La IA me explicó el funcionamiento de la carpeta `public/` en frameworks modernos. Moví mis recursos multimedia allí y modifiqué mis rutas relativas a rutas absolutas `/img/foto.png` solucionando el enrutamiento para Nginx.

### Hito 4: Evaluación de Factibilidad (Gestión de Paquetes)
Para la sección de administración de paquetes, necesité evaluar qué herramienta de monitoreo de hardware instalar, aplicando criterios de optimización de servidor.

> **Mi Prompt Estructurado:**
> *"Actúa como Administrador de Sistemas Linux. **Tarea:** Realiza una evaluación técnica de factibilidad para elegir e instalar una herramienta de monitoreo de sistema en mi servidor Ubuntu. **Restricciones:** El servidor no tiene interfaz gráfica (solo CLI) y cuenta con recursos limitados (2 CPUs, 4GB RAM). **Requisitos:** Realiza un análisis comparativo crítico entre las herramientas predeterminadas `top` y alternativas populares como `htop` o `glances` Considera peso, dependencias y usabilidad. Finalmente, recomiéndame la opción más equilibrada y entrégame el comando `apt` para instalarla."*

**Resultado:** Este prompt generó la justificación técnica perfecta para mi wiki. La IA descartó herramientas pesadas basadas en Python `glances` y argumentó a favor de `htop` herramienta que instalé exitosamente para monitorear el rendimiento en tiempo real.

### Hito 5: Permisos de Seguridad Web en Linux
Al desplegar Nginx, necesitaba asegurarme de que los archivos web tuvieran la propiedad correcta para evitar vulnerabilidades de seguridad.

> **Mi Prompt Estructurado:**
> *"**Contexto:** Mi proyecto web ya está compilado y alojado en la carpeta `/var/www/wiki` **Problema:** Necesito configurar los permisos correctos en Ubuntu Server para que Nginx pueda servir la página, sin exponer la máquina a riesgos. **Tarea:** Explica detalladamente por qué es obligatorio aplicar el comando de cambio de propietario `chown` utilizando específicamente el usuario y grupo `www-data` ¿Qué vulnerabilidades prevengo al hacer esto en lugar de dejar los archivos a nombre de mi usuario administrador local o de root?"*

**Resultado:** La respuesta a este prompt me dio el fundamento teórico vital para mi documentación: asignar `www-data` aísla el servidor web. Si un atacante lograra vulnerar Nginx, solo tendría acceso a los archivos web y no obtendría permisos de superusuario `root` en el sistema operativo.

---

## 3. Conclusión sobre el uso de la Herramienta
En conclusión, el rigor aplicado mediante el Prompt Engineering transformó por completo mi experiencia en este laboratorio: pasé de ser un mero ejecutor de comandos a operar con la visión crítica de un administrador de sistemas. Formular consultas estructuradas—definiendo roles, contextos técnicos y restricciones operativas—me permitió utilizar a la IA como un verdadero consultor y arquitecto de infraestructura. Esta metodología no solo resolvió bloqueos puntuales, sino que fue la clave para interiorizar la arquitectura subyacente que conecta el desarrollo del software con el despliegue a bajo nivel en Linux. El resultado no es solo una aplicación web operativa servida por Nginx, sino la consolidación de un flujo de trabajo analítico, autónomo y profesional.