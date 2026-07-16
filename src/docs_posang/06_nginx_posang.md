# Página 6 · Despliegue de Servicios y Servidor Web (Nginx)

Llegamos a la etapa final y más importante del laboratorio. El objetivo aquí es transformar nuestra máquina virtual en un servidor web real, utilizando Nginx, para alojar y servir esta misma wiki hacia el exterior. 

A continuación, detallo el paso a paso de cómo construí y publiqué el sitio web operando únicamente desde la terminal.

## 1. Instalación del Servidor Web (Nginx)

* **A -> Instalación del Servidor Web (Nginx)**
El primer paso fue instalar el motor web que se encargará de servir nuestra aplicación. Opté por Nginx debido a que es ligero, rápido y actualmente uno de los estándares más utilizados en la industria para aplicaciones web estáticas, como la que estamos desplegando.

* **comando ejecutado:**
     ```bash
     sudo apt install -y nginx
     ```

Una vez completada la instalación, el servicio se inicia automáticamente. Con esto, el servidor queda habilitado para recibir peticiones HTTP a través del puerto 80, lo que significa que ya está funcionando como servidor web básico.

* **Mi Evidencia:**

![Instalación de Gninx](/img/img_nginx/gninxInstalado.png)


* **B -> Verificación desde el Navegador**

Luego abrí el Navegador Web, Brave para ser específicos, y buscamos la URL:

[Link para abrir el servidor](http://localhost:8080)

Esto me permitió comprobar que el servidor estaba respondiendo correctamente y que la página por defecto de Nginx se encontraba disponible. En este punto, el servidor ya estaba conectado a la red y listo para recibir la estructura que posteriormente formará nuestra WIKI.

![Web esperando nuestro Sistema Web](/img/img_nginx/gninxWeb.png)

---

## 2. Preparación del Entorno y Construcción del Sitio

Como mi WIKI está desarrollada con React (Vite), Nginx no puede servir directamente el código fuente. Antes de publicarla, necesitaba generar la versión de producción: archivos HTML, CSS y JavaScript optimizados. Para eso preparé el entorno, descargué mi proyecto y ejecuté el proceso de construcción.

1. **Ejecutamos**:
     ```bash
     sudo apt install -y nodejs npm git
     ```
    
Este comando instala tres herramientas fundamentales:

- **nodejs**: el motor que permite ejecutar JavaScript fuera del navegador. Es indispensable para correr Vite y React.

- **npm**: el gestor de paquetes que instala todas las dependencias del proyecto.

- **git**: necesario para clonar mi repositorio desde GitHub.

*El parámetro -y acepta automáticamente todas las confirmaciones*

![Instalación de nodejs, npm y git](/img/img_nginx/nodeNpmGit.png)

![Instalación de nodejs, npm y git](/img/img_nginx/GNG.png)



2. **Ejecutamos**:
     ```bash
     git clone <https://github.com/AnglerPosada-30/wikilnx_posang.git>

     ```

Con este comando descargué mi proyecto directamente desde `GitHub` hacia el servidor. Esto crea una carpeta con todo el código fuente de mi WIKI.

![Proceso de clonación de mi Repositorio](/img/img_nginx/repositorioClonado.png)

3. **Ejecutamos:**
     ```bash
     cd wikilnx_posang

     ```

Aquí simplemente ingresé a la carpeta recién descargada para poder trabajar dentro del proyecto.

![Situandome en la carpeta del proyecto](/img/img_nginx/cdWiki.png)


El comando clave aquí es `npm run build`. Este proceso empaqueta todo mi código React y crea una carpeta llamada `dist/`. Esta carpeta contiene la web ya procesada y lista para ser publicada; esto es lo único que Nginx necesita.


4. **ejecutamos:**
     ```bash
     npm install
     ```

Este comando descarga e instala todas las dependencias necesarias para que el proyecto funcione: React, Vite, librerías adicionales, etc.
En otras palabras, reconstruye el entorno de desarrollo dentro del servidor.

![Instalación de dependencias en la carpeta del proyecto](/img/img_nginx/npmInstall.png)


5. **ejecutamos:**
      ```bash
     npm run build
     ```

Al ejecutar este comando dentro del proyecto, lo que activó el proceso de compilación con Vite en modo producción. El sistema tomó todos los módulos del proyecto, los optimizó y generó los archivos finales que van dentro de la carpeta dist. Al terminar, Vite me mostró el tamaño real y el tamaño comprimido (gzip) de cada archivo generado, confirmando que la construcción se completó correctamente en menos de cuatro segundos.     

**Evidencia**

![Activación del proceso de compilación con Vite](/img/img_nginx/npmBuild.png)
---

## 3. Alojamiento y Permisos de los Archivos

Nginx necesita saber de dónde leer los archivos, y por convención, los sitios web en Linux se guardan en `/var/www/`.

* **comandos ejecutados:**
     ```bash
     sudo mkdir -p /var/www/wiki
     sudo cp -r dist/* /var/www/wiki/
     sudo chown -R www-data:www-data /var/www/wiki
     ```

Lo que hice fue preparar el directorio donde se va a publicar la versión final del sitio y luego copiar los archivos generados por la compilación. Primero, creé la carpeta (/var/www/wiki) usando (sudo mkdir -p), asegurándome de que existiera incluso si faltaban directorios intermedios. Después copié todo el contenido de la carpeta dist hacia esa ubicación, que es donde normalmente se alojan los archivos que servirán al sitio en producción. Finalmente, cambié la propiedad de la carpeta y de todos sus archivos para que el usuario y grupo www-data —que es el que usa el servidor web— tenga control total sobre ellos. Con eso dejé el sitio listo para ser servido por el servidor.

**¿Por qué chown www-data?:** Este es un paso crítico de seguridad `www-data` es el usuario de sistema que Nginx utiliza para ejecutarse. Al transferirle la propiedad de la carpeta `/var/www/wiki/` le doy a Nginx el permiso exclusivo para leer y servir mis archivos hacia internet, evitando usar al usuario administrador para tareas web.

![Creación de la carpeta /var/www/wiki](/img/img_nginx/preparacionDirectorio.png)



---

## 4. Configuración del Sitio (Virtual Host)

Luego, tuve que darle a Nginx las instrucciones exactas sobre cómo manejar mi sitio creando su archivo de configuración.

* **comando ejecutado:**
      ```bash
      sudo nano /etc/nginx/sites-available/wiki
      ```

Para que Nginx pudiera servir correctamente mi sitio, necesitaba crear su archivo de configuración específico. Para eso abrí un nuevo archivo dentro de la ruta estándar de sitios disponibles usando el comando anterior mencionado. Este archivo es donde definí las reglas que Nginx debe seguir: la ubicación de los archivos del sitio, el comportamiento del servidor, y cualquier ajuste necesario para que la WIKI funcione en producción. Al abrirlo con nano, pude escribir manualmente toda la configuración que permitirá que Nginx reconozca y publique mi proyecto.


Dentro de ese archivo, pegué la siguiente configuración:

```nginx
server {
    listen 80 default_server;
    root /var/www/wiki;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
}
```
Esta es la "receta" del sitio. Le dice a Nginx: "Escucha en el puerto 80, tu directorio raíz es `/var/www/wiki`, carga el archivo `index.html`, y si alguien busca una ruta que no existe físicamente, redirígelo al `index.html`" (esto último es vital para que las rutas de React funcionen correctamente sin dar error 404).

![Receta del sitio web para nginx](/img/img_nginx/serverDic.png)


---

## 5. Activación y Recarga de Nginx

Después de crear el archivo de configuración de mi sitio, necesitaba activar ese sitio dentro de Nginx y deshabilitar la configuración por defecto. Para eso, primero generé un enlace simbólico desde sites-available hacia sites-enabled usando sudo ln -s. Este paso es importante porque Nginx solo toma en cuenta los sitios que están dentro de la carpeta sites-enabled.

Luego eliminé el archivo default que viene activado por defecto, ya que no lo necesitaba y podía interferir con mi nueva configuración. Después ejecuté sudo nginx -t para validar que la configuración no tuviera errores; este comando revisa la sintaxis y confirma si todo está correcto antes de recargar el servicio.

Finalmente, recargué Nginx con sudo systemctl reload nginx para aplicar los cambios sin detener el servidor. Con esto, mi sitio quedó oficialmente habilitado y listo para ser servido.

* **comandos ejecutados:**
     ```bash
     sudo ln -s /etc/nginx/sites-available/wiki /etc/nginx/sites-enabled/
     sudo rm /etc/nginx/sites-enabled/default
     sudo nginx -t
     sudo systemctl reload nginx
     ```

*El comando `nginx -t` es una excelente herramienta que prueba el archivo de configuración en busca de errores de tipeo (como un punto y coma faltante) antes de reiniciar el servicio, evitando que el servidor web se caiga por un error humano.*

![Comando necesarios para cagar la wiki al puerto 8080](/img/img_nginx/sitioDesplegado.png)


---

## 6. La Gran Prueba (Evidencia Clave)

Finalmente, abrí el navegador web en mi computadora anfitriona (fuera de la máquina virtual) e ingresé a `http://localhost:8080`. Gracias al reenvío de puertos (Port Forwarding) que configuré en VirtualBox, mi petición entró por el puerto 8080 de mi PC, viajó al puerto 80 del servidor Linux, y Nginx me respondió entregando la wiki perfectamente renderizada. 

Con esta prueba demostré que soy capaz de desplegar un sitio web desde cero utilizando únicamente la línea de comandos en un servidor Linux, dejando operativo un entorno completo de publicación web.

> **Mi Evidencia:**
![Sitio web sirviendo desde localhost:8080](/img/img_nginx/puerto80.png)
