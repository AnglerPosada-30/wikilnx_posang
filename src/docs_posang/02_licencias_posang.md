# Página 2 · Análisis de Software Libre y Licencias

## Software libre y licencias

**Comandos ejecutados para la exploración de licencias:**
```bash
ls /usr/share/common-licenses/
less /usr/share/common-licenses/GPL-3
cat /usr/share/doc/bash/copyright
```

Resultado de la exploración de la ejecución de los comandos proporcionados, mediante la PowerShell conectada al servidor *srv-wiki*.

1. **Directorio de Licencias**

**Ejecución del comando:**
    ```bash
    ls /usr/share/common-licenses/
    ```

Me dio la siguiente respuesta: 

| Licencias |
| --- |
| Apache-2.0 |
| Artistic |
| BSD |
| CC0-1.0 |
| GFDL |
| GFDL-1.2 |
| GFDL-1.3 |
| GPL |
| GPL-1 |
| GPL-2 |
| GPL-3 |
| LGPL |
| LGPL-2 |
| LGPL-2.1 |
| LGPL-3 |
| MPL-1.1 |
| MPL-2.0 |

**Análisis del Resultado:**
El comando `ls` (listar) nos mostró el contenido del directorio `/usr/share/common-licenses/` Lo que estamos viendo es un listado de archivos de texto sin extensión, donde cada uno contiene los términos legales completos de las licencias de software libre y código abierto más reconocidas en la industria.
    
**Fundamento técnico de este directorio**

* **Centralización y optimización de espacio:**
Un sistema operativo como Ubuntu Server está compuesto por miles de paquetes y herramientas individuales. Muchos de estos programas comparten la misma licencia, por ejemplo, Bash, el Kernel y herramientas GNU comparten variantes de la licencia GPL. En lugar de que cada programa instale y guarde su propia copia del texto legal, Ubuntu almacena una sola copia centralizada en este directorio. Los programas simplemente hacen referencia a estos archivos, ahorrando espacio en el disco.

* **Clasificación de las licencias observadas:**

- **Familia GPL y LGPL** `GPL-2, GPL-3, LGPL`
Archivos correspondientes a las licencias Copyleft de la Fundación del Software Libre, que protegen la apertura del código fuente de las herramientas principales del sistema.

- **Licencias Permisivas** `Apache-2.0, BSD`
Archivos para el software que permite su uso y modificación sin obligar a heredar la licencia en trabajos derivados.

- **Documentación Libre** `GFDL`
GNU Free Documentation License, utilizada legalmente para los manuales, wikis y archivos de ayuda del sistema.

**Conclusión del comando 1:**
Este directorio evidencia de forma práctica cómo Ubuntu gestiona legalmente su composición híbrida, manteniendo un repositorio estandarizado de todos los acuerdos de distribución bajo los que opera el sistema.

![Ejecución del comando ls /usr/share/common-licenses/](/img/img_licencias/ls.png)



2. **Exploración del texto de licencias específicas**

**Ejecución del comando:**
    ```bash
    less /usr/share/common-licenses/GPL-3
    ```

*nota: Se utilizó la tecla "q" para salir del modo de visualización y retornar al prompt*

**Análisis y fundamento técnico:**

El comando `less` funciona como un paginador de terminal. A diferencia de otras utilidades que imprimen el contenido de un archivo de golpe saturando la pantalla, less carga el documento y permite navegar por él de forma interactiva (arriba/abajo) ocupando poca memoria.

Al ejecutarlo sobre el archivo `GPL-3` el sistema muestra el texto legal completo de la *GNU General Public License Version 3*. A nivel de administración de servidores, esta herramienta es fundamental porque permite auditar los términos legales (el copyleft) y los derechos de distribución del software instalado directamente desde la consola, sin depender de un entorno gráfico o de un navegador web externo.

![Ejecución del comando less /usr/share/common-licenses/GPL-3](/img/img_licencias/less.png)


3. **Revisión de los derechos de autor de Bash**

**Ejecución del comando:**
    ```bash
    cat /usr/share/doc/bash/copyright
    ```

**Análisis y fundamento técnico:**
El comando `cat` (concatenar) lee el contenido de un archivo y lo vuelca íntegramente en la salida estándar (la consola).

Al inspeccionar el archivo `/usr/share/doc/bash/copyright` estamos auditando cómo el sistema operativo documenta la propiedad intelectual de un paquete individual en específico; en este caso, *bash* (el intérprete de comandos por defecto)

Al ejecutar el comando, el texto en pantalla nos muestra quién es el autor del programa Bash (generalmente la Free Software Foundation) y bajo qué licencia se distribuye.

Lo interesante es que este archivo no contiene todo el documento legal enorme. En su lugar, simplemente menciona que usa la licencia GPL y nos "apunta" hacia el archivo general de licencias que revisamos en el comando anterior.

Esto nos demuestra de forma sencilla cómo se organiza Linux: para no tener el mismo texto legal repetido miles de veces (uno por cada programa instalado), guarda una sola copia general en el sistema y hace que los demás archivos simplemente hagan referencia a ella para ser más ordenados y ahorrar espacio.

![Ejecución del comendo cat /usr/share/doc/bash/copyright](/img/img_licencias/cat.png)

### 1. ¿Qué es el software libre?
El software libre (Free Software) es aquel que respeta la libertad de los usuarios y la comunidad. No se refiere a la gratuidad (precio), sino a la libertad de uso. Según la Free Software Foundation (FSF), para que un programa sea considerado libre, debe garantizar cuatro libertades fundamentales:
* **Libertad 0:** Ejecutar el programa como se desee, con cualquier propósito.
* **Libertad 1:** Estudiar cómo funciona el programa y cambiarlo para que haga lo que el usuario quiera (el acceso al código fuente es un prerrequisito).
* **Libertad 2:** Redistribuir copias para ayudar a otros.
* **Libertad 3:** Distribuir copias de las versiones modificadas a terceros, permitiendo que toda la comunidad se beneficie de las mejoras.

### 2. Diferencias entre tipos de licencias

* **Copyleft (Ej. GPL - General Public License):**
  El principio del *copyleft* garantiza que las libertades del software libre se mantengan en todas las versiones derivadas. Si tomas un código con licencia GPL (como el kernel de Linux o Bash), lo modificas y lo distribuyes, **estás obligado** a distribuir ese nuevo software también bajo la licencia GPL y liberar su código fuente. Tiene un efecto "viral" que impide que el código abierto se convierta en software privativo.
* **Permisivas (Ej. MIT, BSD, Apache):**
  Otorgan las mismas libertades de uso y modificación, pero **no obligan** a que los trabajos derivados mantengan la misma licencia. Un desarrollador puede tomar código con licencia MIT, modificarlo, compilarlo y venderlo como software propietario y de código cerrado. La única exigencia suele ser mantener el aviso de derechos de autor original.
* **Software Propietario (o Privativo):**
  Es aquel donde el creador o propietario retiene la mayoría de los derechos. El código fuente está cerrado (no es accesible para el usuario) y su uso, redistribución o modificación están estrictamente prohibidos o controlados mediante acuerdos de licencia de usuario final (EULA). El usuario solo adquiere una licencia de *uso* bajo condiciones específicas.

### 3. ¿Bajo qué tipo de licencia está Ubuntu?
Ubuntu **no tiene una única licencia**, sino que es una distribución (un conjunto o compilación) que agrupa miles de paquetes de software desarrollados por distintas comunidades y empresas, cada uno con su propia licencia. 

* El núcleo (Linux Kernel) y muchas herramientas base del sistema operativo (como las de GNU) están bajo la licencia **GPL** (Copyleft).
* Otros componentes y librerías pueden usar licencias **permisivas** (MIT, BSD).
* Además, por defecto, Ubuntu incluye repositorios (como *multiverse* o *restricted*) que contienen **software propietario** o privativo, como controladores (drivers) de tarjetas gráficas, firmware de tarjetas de red o códecs multimedia, para garantizar que el hardware del usuario funcione correctamente desde el primer momento.

Por lo tanto, Ubuntu es un sistema operativo compuesto principalmente por software libre y de código abierto (FOSS), pero adopta un enfoque pragmático al incluir software privativo para asegurar la compatibilidad del hardware.
