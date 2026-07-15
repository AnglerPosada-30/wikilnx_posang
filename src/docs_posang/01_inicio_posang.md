# Portada y Visión General del Proyecto

**Asignatura:** Sistemas Operativos (T13V35)
**Docente:** Rubén Schnettler Lucero
**Estudiante:** Angler Posada
**Código del Proyecto:** wikilnx_posang

---

## 1. Introducción y Objetivo del Laboratorio

El objetivo central de este proyecto es desplegar y administrar un servidor Linux funcional, utilizando exclusivamente la interfaz de línea de comandos (CLI). A diferencia de los sistemas operativos de escritorio, aquí trabajamos sin interfaz gráfica, replicando las condiciones reales y los estándares exigidos en la industria tecnológica.

Montar el entorno inicial resultó ser un proceso bastante fluido gracias a la familiaridad previa con la configuración de máquinas virtuales Ubuntu Server en VirtualBox para otros proyectos de bases de datos. Aprovechando esa base, el enfoque de este laboratorio fue profundizar en la administración del sistema: gestionar la seguridad, controlar los permisos a bajo nivel y, finalmente, configurar la máquina para que actúe como un servidor web real capaz de alojar y presentar esta misma documentación.

---

## 2. Topología de la Red y Entorno

Para aislar el entorno de trabajo y mantener el control, utilicé una única máquina virtual montada sobre mi computadora personal. La estructura de conexión es la siguiente:

* **Anfitrión (Mi PC Principal):** Funciona como el cliente desde donde administro el servidor mediante la terminal y donde visualizo la web a través del navegador.
* **Máquina Virtual (srv-wiki):** Corre el sistema operativo Ubuntu Server 24.04 LTS.
* **Enrutamiento y Reglas de Conexión:**
  * **Red NAT:** La máquina virtual está configurada con un adaptador de red NAT, lo que le permite tener salida a internet de forma segura para descargar actualizaciones y paquetes mediante `apt`.
  * **Reenvío de Puertos (Port Forwarding):** Para poder interactuar con el servidor desde mi máquina anfitriona sin usar una segunda computadora, configuré dos túneles directos en VirtualBox:
    * El puerto **2222** de mi PC redirige al puerto **22** del servidor, habilitando la administración remota segura a través de SSH (`ssh -p 2222 inacap@localhost`).
    * El puerto **8080** de mi PC redirige al puerto **80** del servidor, permitiendo que mi navegador local consuma el sitio web que Nginx está sirviendo.

---

## 3. Bitácora del Desarrollo (Fases del Proyecto)

Este proyecto se construyó de manera progresiva, asegurando cada capa del servidor antes de pasar a la siguiente. A continuación, detallo el flujo de trabajo completo que desarrollé a lo largo del laboratorio:

### Fase A: Análisis de Software Libre y Licencias
Antes de tocar la configuración del servidor, realicé una revisión de los tipos de licenciamiento que rigen las herramientas que utilizamos. Exploré las diferencias clave entre el software propietario y el software libre, distinguiendo entre licencias restrictivas (Copyleft/GPL) y licencias más permisivas (MIT, Apache), además de identificar bajo qué modelo opera nuestro Ubuntu Server.

### Fase B: Preparación, Redes y Seguridad Básica
En esta etapa, le di identidad y seguridad a la máquina.
* Configuré el nombre del equipo (`hostnamectl`) para identificarlo en la red como `srv-wiki`.
* Revisé la asignación de direcciones IP (`ip a`).
* Actualicé la lista de repositorios y los paquetes del sistema (`apt update && apt upgrade`) para parchar vulnerabilidades.
* **Hardenización:** Activé y configuré el firewall UFW, bloqueando todo el tráfico entrante por defecto y abriendo explícitamente solo los servicios necesarios (el puerto 22 para SSH y el puerto 80 para el tráfico web).

### Fase C: Gestión Profunda de Archivos y Permisos (CLI)
Aquí trabajé en el control de acceso a la información. Utilizando comandos como `ls -l`, `chmod` y `chown`, aseguré directorios personales para restringir la lectura y escritura. Además, preparé un entorno colaborativo configurando permisos especiales: activé el `setgid` para que los archivos hereden el grupo en carpetas compartidas, y el `sticky bit` para proteger los archivos temporales de borrados accidentales por otros usuarios.

### Fase D: Gestión de Paquetes y Evaluación de Alternativas
Utilicé la herramienta `apt` (Advanced Package Tool) para buscar, analizar e instalar software. En lugar de instalar a ciegas, apliqué criterios de factibilidad, analizando el peso, el soporte y las dependencias de los paquetes (como herramientas de monitoreo del sistema) antes de integrarlos al servidor.

### Fase E: Despliegue de Servicios y Servidor Web (Nginx)
La etapa final e integradora del proyecto.
1. Instalé **Nginx** como servidor web principal.
2. Preparé el entorno instalando **Node.js** y **Git** para poder clonar mi repositorio.
3. Compilé esta aplicación React directamente en el servidor.
4. Configuré Nginx, asignándole los permisos correctos al usuario `www-data`, para que tomara los archivos compilados y los publicara hacia el exterior de forma estable.

---

## 4. Conclusión del Proceso
El resultado de este trabajo es un servidor Linux completamente configurado desde cero, operando de forma segura detrás de un firewall, con permisos de usuario estrictamente controlados, y funcionando activamente como un nodo web que sirve de manera autónoma esta misma documentación navegable.
