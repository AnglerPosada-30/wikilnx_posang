#   Página 4 · Gestión Profunda de Archivos y Permisos 

En esta sección del laboratorio trabajamos con la gestión de permisos y propietarios en nuestro Ubuntu Server. Como no tenemos interfaz gráfica, todo este control lo hacemos directamente por la terminal.

## 1. Preparación de un entorno de trabajo rápido.

* **comando ejecutado:**
      ```bash
      mkdir -p ~/demo && cd ~/demo && touch nota.txt && mkdir privado
      ```

Al ejecutar este comando lo que hice fue preparar rápidamente una pequeña estructura de trabajo dentro de mi carpeta personal. Primero creé la carpeta `demo` asegurándome de que no diera error si ya existía. Luego entré directamente en ella para continuar con la organización interna. Una vez dentro, generé un archivo vacío llamado `nota.txt` que me sirve como punto de partida para anotar lo que necesite. Finalmente, añadí una carpeta llamada `privado` pensada para separar contenido o archivos que quiera mantener más ordenados o reservados. En resumen, con un solo comando se dejó lista una estructura básica con una carpeta principal, un archivo y un espacio privado para seguir trabajando.

**Mi Evidencia:**

![Preparación de entorno de trabajo rápido](/img/img_permisos/mkdir.png)

---

## 2. Lectura de permisos ("ls -l")

* **comando ejecutado:**
      ```bash
      ls -l
      ```

Cuando listamos los archivos usando el comando *ls -l*, aparece una cadena que parece un código raro, como *-rw-rw-r--*. En realidad, esto se lee separándolo en bloques:
* El primer símbolo nos dice si es un archivo normal ("-") o un directorio ("d").
* Luego vienen tres grupos de tres letras: los permisos para el **dueño** (el que creó el archivo), para el **grupo** de usuarios, y para **los demás** (cualquier otro).
* Las letras son simples: `r` es para leer (read), `w` es para escribir (write) y `x` es para ejecutar (execute). Si vemos un guion `-` significa que ese permiso está denegado.

* **Mi Evidencia:**

![Lectura de permisos con ls -l](/img/img_permisos/ls.png)

---

## 3. Modificación de permisos ("chmod")

* **comando ejecutado:**
      ```bash
      chmod 600 nota.txt
      ```
* **comando ejecutado:**
      ```bash
      chmod u+x,go-rwx privado
      ```

Para cambiar los permisos que vimos arriba, usamos el comando `chmod` En la práctica vimos que hay dos maneras de hacerlo:

**Método numérico:** Es básicamente sumar valores. Leer vale 4, escribir vale 2 y ejecutar vale 1. Entonces, cuando ejecutamos `chmod 600 nota.txt` le dimos permiso 6 al dueño (4 de leer + 2 de escribir) y 0 a los demás. Es decir, nadie más puede siquiera ver el archivo.

**Método simbólico:** En vez de números, usamos letras directamente. Por ejemplo, con `chmod u+x,go-rwx privado` le estamos ordenando al sistema: al usuario `u` súmale `+` el permiso de ejecución `x` y al grupo y otros `go` quítales `-` cualquier permiso que tengan de leer, escribir o ejecutar `rwx`

Antes de cambiar los permisos, tanto el archivo `nota.txt` como la carpeta `privado` tenían permisos bastante abiertos. El archivo podía ser leído y escrito por mí y por mi grupo, y cualquier otro usuario podía leerlo. La carpeta, en cambio, permitía que otros usuarios entraran y vieran su contenido porque tenía permisos de lectura y ejecución para todos. En resumen, todo estaba accesible para cualquiera en el sistema.

Después de ejecutar los comandos `chmod 600 nota.txt` y `chmod u+x,go-rwx privado` dejé todo mucho más restringido. El archivo `nota.txt` quedó solo para mí: ahora únicamente yo puedo leerlo y escribirlo, y nadie más tiene acceso. La carpeta `privado` también quedó completamente cerrada; solo yo puedo entrar en ella, ver su contenido y trabajar dentro. Con esos cambios, convertí ambos elementos en recursos personales y protegidos dentro de mi directorio.

* **Mi Evidencia:**

![Modificando permisos con chmod](/img/img_permisos/chmod.png)

---

## 4. Cambio de propietario ("chown")

* **comando ejecutado:**
      ```bash
      sudo chown root:root nota.txt
      ```
Antes de ejecutar el comando, el archivo `nota.txt` seguía siendo completamente mío: yo era el dueño y pertenecía a mi grupo. Eso significaba que tenía control total sobre él y que las restricciones que había configurado con chmod aplicaban únicamente dentro de ese contexto de propiedad. En otras palabras, el archivo estaba bajo mi usuario y no tenía ninguna relación con el usuario administrador del sistema.

Después de ejecutar `sudo chown root:root nota.txt` cambié por completo la propiedad del archivo. Ahora `nota.txt` pasó a pertenecer al usuario root y al grupo root, lo que lo convierte en un archivo administrado directamente por el sistema y no por mí. Ese cambio implica que solo el usuario root tiene autoridad sobre él, y cualquier modificación, lectura o ajuste futuro requiere permisos de administrador. Con ese comando, básicamente trasladé el archivo desde mi espacio de usuario hacia el control del superusuario.

* **Mi Evidencia:**

![Cambio de dueño con chown](/img/img_permisos/chown.png)

---

## 5. Permisos especiales (setgid y sticky bit)

* **comando ejecutado:**
      ```bash
      sudo mkdir /srv/compartido && sudo chmod 2775 /srv/compartido
      ```
Cuando ejecuté este comando, lo que hice fue crear un directorio destinado a ser usado de manera colaborativa y luego ajusté sus permisos para que funcionara correctamente como carpeta compartida. Primero, con `sudo mkdir /srv/compartido` generé la carpeta en una ubicación del sistema donde normalmente se guardan recursos comunes. Después, con `sudo chmod 2775 /srv/compartido` configuré los permisos para que tanto yo como el grupo pudiéramos leer, escribir y entrar en la carpeta, mientras que otros usuarios solo pudieran leer y acceder. Además, ese “2” inicial activa el `setgid` lo que asegura que cualquier archivo o carpeta creada dentro herede automáticamente el grupo propietario. En la práctica, dejé `/srv/compartido` lista para que varios usuarios trabajen dentro sin problemas de permisos ni desorden en la propiedad de los archivos.

**setgid:** El setgid es un permiso especial que puedo aplicar a una carpeta para que todo lo que se cree dentro de ella herede automáticamente el grupo propietario. En condiciones normales, cuando un usuario crea un archivo o una subcarpeta, estos quedan asociados al grupo principal del usuario, lo que puede generar desorden si varias personas trabajan en el mismo directorio. Al activar el setgid, me aseguro de que todos los archivos y carpetas creados dentro mantengan el mismo grupo, sin importar quién los genere. En la práctica, esto permite que un directorio compartido funcione realmente como tal, porque todos los usuarios del grupo pueden colaborar sin tener que estar corrigiendo permisos o cambiando propietarios cada vez que se agrega algo nuevo.



* **comando ejecutado:**
      ```bash
      sudo chmod +t /tmp
      ```
Luego, cuando ejecuté este comando, lo que hice fue activar el `sticky bit` en el directorio `/tmp` Este directorio es un espacio temporal que todos los usuarios del sistema pueden usar, y por lo mismo necesita una protección especial. Al aplicar el `sticky bit` dejé configurado que, aunque cualquiera pueda crear archivos dentro de `/tmp` solo el dueño de cada archivo puede eliminarlo. En la práctica, esto evita que un usuario borre o modifique los archivos temporales de otro, manteniendo el directorio compartido funcionando de manera segura y ordenada. Con ese comando, aseguré que /tmp siga siendo un lugar público, pero protegido contra interferencias entre usuarios.

**sticky bit:** es un permiso especial que puedo activar en un directorio para evitar que los usuarios borren archivos que no les pertenecen. Normalmente, si un directorio es público y todos tienen permisos de escritura, cualquiera podría eliminar cualquier archivo dentro, aunque no sea suyo. Al aplicar el sticky bit, lo dejo funcionando de forma más segura: cada usuario solo puede borrar los archivos que él mismo creó. En la práctica, esto convierte un directorio compartido en un espacio ordenado y protegido, donde todos pueden trabajar sin interferir con el trabajo de los demás.

* **comando ejecutado:**
      ```bash
      ls -ld /srv/compartido /tmp
      ```
Finalmente,  lo que hice fue revisar los permisos especiales y la configuración de ambos directorios para confirmar que quedaron tal como los había preparado. En el caso de `/srv/compartido` pude ver que aparece con `drwxrwsr-x` Eso me confirma que la carpeta tiene permisos de lectura, escritura y acceso para mí y para el grupo, y que además está activo el setgid. Gracias a eso, todo lo que se cree dentro heredará automáticamente el grupo propietario, lo que deja el directorio funcionando como un espacio colaborativo ordenado.

En cambio, al revisar `/tmp` aparece con `drwxrwxrwt` Ese “t” al final me confirma que el sticky bit está activado. Esto significa que, aunque todos los usuarios pueden escribir dentro de `/tmp` cada uno solo puede borrar sus propios archivos. En otras palabras `/tmp` quedó funcionando como un directorio público pero protegido, donde nadie puede interferir con los archivos temporales de otros.

Con ese comando verifiqué que ambos directorios quedaron configurados exactamente como necesitaba: uno para trabajo colaborativo y el otro como espacio temporal seguro.

**Mi Evidencia:**

![Permisos especiales](/img/img_permisos/AjustesPermiso.png)

