# Página 5 · Gestión de Paquetes y Evaluación de Alternativas

En un entorno de servidor sin interfaz gráfica, la gestión del software no se hace descargando instaladores desde un navegador, sino a través de un gestor de paquetes. En Ubuntu Server utilizamos **APT** (Advanced Package Tool). 

En esta sección del laboratorio, detallo mi flujo de trabajo para buscar, evaluar e instalar herramientas de forma segura, aplicando criterios técnicos para no sobrecargar la máquina virtual innecesariamente.

## 1. El flujo de trabajo seguro con APT

Antes de instalar cualquier cosa en un servidor de producción, es vital seguir una secuencia lógica para evitar conflictos de dependencias o instalar software obsoleto. El flujo correcto que apliqué fue:

1. **`sudo apt update`** Sincroniza nuestro servidor con los repositorios oficiales de Ubuntu para obtener la lista más reciente de software disponible. (Esto ya lo habíamos ejecutado en la configuración básica).
2. **`apt search <paquete>`** Busca coincidencias en los repositorios según una palabra clave.
3. **`apt show <paquete>`** Muestra la "cédula de identidad" del paquete antes de instalarlo (peso, quién lo mantiene, qué otras librerías necesita).
4. **`sudo apt install <paquete>`** Realiza la descarga e instalación definitiva.

---

## 2. Análisis de Factibilidad: Eligiendo un Monitor de Sistema

Ante la necesidad concreta de instalar un monitor de recursos para ver el consumo de CPU y RAM de nuestro servidor, evalué distintas alternativas en lugar de instalar lo primero que apareciera. Mi análisis de factibilidad fue el siguiente:

* **Alternativa 1: `top` (Ya incluido)**
  * **Ventajas:** Viene preinstalado en casi cualquier distribución Linux. No consume espacio extra.
  * **Desventajas:** Su interfaz es monocromática, rudimentaria y poco amigable para matar procesos o entender la carga de un vistazo.
* **Alternativa 2: `htop`**
  * **Ventajas:** Interfaz interactiva, usa colores, permite desplazarse con las flechas del teclado y es sumamente ligero. Tiene soporte oficial directo en los repositorios principales de Ubuntu.
  * **Desventajas:** Requiere instalación manual.
* **Alternativa 3: `glances` o `btop`**
  * **Ventajas:** Interfaces gráficamente muy avanzadas y con mucha más telemetría (red, discos, sensores).
  * **Desventajas:** Son mucho más pesados y, en el caso de `glances`, arrastra dependencias de Python que no necesitamos en un servidor web ligero. Es un exceso (overkill) para los 2GB de RAM de nuestra máquina virtual.

**Mi Decisión:**
Opté por instalar **`htop`** junto con **`tree`**, una herramienta ligera para ver directorios en forma de árbol. `htop` ofrece el equilibrio perfecto: mejora enormemente la usabilidad respecto a `top` pero mantiene un impacto casi nulo en el almacenamiento y la memoria del servidor, cumpliendo perfectamente con el criterio de factibilidad.

---

## 3. Ejecución y Evidencia

Primero ejecuté el siguiente comando:

* **comandos ejecutados:**
      ```bash
      sudo apt update
      ```

Cuando ejecuté `sudo apt update` lo que hice fue pedirle al sistema que actualizara la lista de paquetes disponibles en los repositorios. En otras palabras, el comando no instala nada todavía, sino que descarga la información más reciente sobre versiones, parches y actualizaciones que existen para los programas del sistema. Con esto dejo mi máquina al día respecto a lo que está disponible, y así puedo ver qué paquetes tienen nuevas versiones antes de decidir si quiero instalarlas con apt upgrade. Es básicamente un “refresh” de la base de datos de software del sistema.

**Mi Evidencia:**

![Actualización de lista de paquetes disponibles en los repositorios](/img/img_paquetes/aptUpdate.png)

Luego para llevar a cabo mi decisión, primero busqué e inspeccioné el paquete para asegurarme de que fuera la versión correcta y revisar sus dependencias:

* **comando ejecutado:**
      ```bash
      apt search htop
      ```

Cuando ejecuté `apt search htop` lo que hice fue buscar en los repositorios si existe algún paquete relacionado con ese nombre. Este comando no instala nada, solo revisa la base de datos de paquetes disponibles y me muestra coincidencias. En este caso, me sirve para confirmar que htop está disponible para instalar, ver su descripción y verificar si hay variantes o paquetes similares. Es básicamente una forma rápida de consultar qué información ofrece el sistema sobre un programa antes de decidir si quiero instalarlo.

**Mi Evidencia:**

![Búsqueda en repositorios con algún paquete relacionado con htop](/img/img_paquetes/aptSearch.png)

* **comando ejecutado:**
      ```bash
      apt show htop
      ```

Cuando ejecuté `apt show htop`, lo que hice fue pedirle al sistema que me mostrara toda la información detallada del paquete `htop` A diferencia de `apt search` que solo muestra coincidencias, este comando entrega una ficha completa del programa: su descripción, la versión disponible, el tamaño, quién lo mantiene, en qué repositorio está y qué dependencias necesita. En la práctica, es como revisar la “tarjeta técnica” del paquete antes de instalarlo, para entender exactamente qué ofrece y cómo se integra con el sistema.

**Mi Evidencia:**

![Información detallada del paquete htop](/img/img_paquetes/aptShow.png)


Luego procedí con la instalación simultánea de ambas herramientas:

* **comando ejecutado:**
     ```bash
     sudo apt install -y htop tree
     ```
*(El parámetro "-y" lo incluí para automatizar la confirmación de la instalación, asumiendo "sí" a las preguntas de confirmación del sistema de paquetes).*

*(El paquete "tree" se incluyó porque me permite ver la estructura de directorios en forma de árbol).*

Con esto, el servidor quedó equipado con las herramientas necesarias para monitoreo y visualización, sin comprometer su rendimiento ni llenarlo de librerías innecesarias.

**Mi Evidencia:**

![Instalación de paquetes htop y tree](/img/img_paquetes/htopTree.png)