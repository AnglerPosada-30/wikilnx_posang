# Mi Bitácora: Instalación y Configuración de Ubuntu Server 24.04 LTS (VirtualBox)

En este documento voy a explicar paso a paso cómo armé y configuré mi máquina virtual `srv-wiki`, siguiendo lo que nos pidieron en la Guía de Trabajo de la Unidad 3 de Linux Server.

---

## FASE 1: Preparación y Creación de la Máquina Virtual

### 1.1 Creación de la VM
- Primero, abrí VirtualBox y le di al botón de **Nueva** para crear la máquina.
- **Nombre:** Le puse de nombre `srv-wiki`.
- **Imagen ISO:** Busqué y cargué la ISO de Ubuntu Server 24.04 LTS que ya había descargado.
- **Tipo y Versión:** Me aseguré de que el tipo fuera **Linux** y la versión **Ubuntu (64-bit)**.
- *Nota:* Me salté la "instalación desatendida" porque quería hacer el proceso a mano y no perderme de nada.

![Nombre de la máquina Virtual](../img/imgConfiguracion/nombreServer.png)

### 1.2 Asignación de Recursos 
- **Memoria RAM:** Le asigné **4096 MB** (o sea, 4 GB).
- **Procesadores:** Le puse 2 CPUs para que anduviera fluido.
- **Disco Duro Virtual:** Le creé un disco duro nuevecito de **25 GB**.

![Asignación de recursos de hardware para el servidor](../img/imgConfiguracion/hardwareVirtual.png)

---

## FASE 2: Configuración de Red y Reenvío de Puertos (Paso Clave)

Antes de prender la máquina, tuve que configurar la red para que mi pc de verdad se pudiera comunicar con el servidor Linux.

- Me metí a la **Configuración** de la máquina y fui a la pestaña de **Red**.
- **Adaptador 1:** Revisé que estuviera conectado a **NAT**.
- Abrí las opciones de **Avanzado** y entré a **Reenvío de puertos**.
- Acá agregué dos reglas importantes para redirigir el tráfico:
  1. **Regla SSH:** Nombre `ssh` | Protocolo `TCP` | Puerto de mi compu `2222` | Puerto del servidor `22`
  2. **Regla Web:** Nombre `web` | Protocolo `TCP` | Puerto de mi compu `8080` | Puerto del servidor `80`

![Configuración de reglas para los puertos para ssh y web](../img/imgConfiguracion/reglasPuertos.png)

---

## FASE 3: Instalación de Ubuntu Server

Ahora sí, prendí la máquina y arranqué con el instalador de Ubuntu. Estos fueron los pasos que seguí:

![Inicialización de la Maquina Virtual](../img/imgConfiguracion/inicioMaquina.png)

### 3.1 Tipo de instalación
- Dejé la opción que venía marcada por defecto: **`(X) Ubuntu Server`**. No quise usar la versión "minimizada" porque prefiero tener las herramientas estándar a mano. Le di a **[ Hecho ]**.

![Selección de la opción de Ubuntu Server](../img/imgConfiguracion/ubuntuServer.png)


### 3.2 Configuración de Red
- Acá solo me fijé que la tarjeta de red (`enp0s3`) agarrara una IP sola por DHCP (me dio la `10.0.2.15`), lo que confirmaba que el NAT funcionaba bien. No toqué nada más y le di a **[ Hecho ]**.

![Configuración Network](../img/imgConfiguracion/netwokConfiguracion.png)


### 3.3 Configuración de Proxy
- Como estoy en una red normal y no uso proxy, dejé ese espacio totalmente en blanco y pasé a la siguiente pantalla.

![Proxy no configurada, por no necesidad de usarlo](../img/imgConfiguracion/sinProxy.png
)


### 3.4 Configuración del Disco (Almacenamiento)
- Dejé marcado que usara todo el disco de 25 GB. 
- **Ojo acá:** Desmarqué la opción de usar **LVM** presionando la barra espaciadora. Lo hice para que fuera más simple y el sistema usara el 100% del disco de forma tradicional (ext4). Después confirmé la pantalla de resumen aceptando que se iba a formatear el disco virtual.

![Selección de la opción de uso completo del Disco](../img/imgConfiguracion/discoCompleto.png)

### 3.5 Creación de mi Usuario
Ingresé los datos tal cual los pedía la pauta del laboratorio:
- **Mi nombre:** `inacap`
- **Nombre del servidor:** `srv-wiki`
- **Nombre de usuario:** `inacap`
- **Contraseña:** Le puse una clave segura que me acordara fácilmente.

![Creación del perfil de usuario, con contraseña, nombre de usuario y nombre de servidor](../img/imgConfiguracion/configuracionPerfil.png)

### 3.6 Ubuntu Pro
- Me preguntó si quería actualizar a Ubuntu Pro. Como esto es un lab de la u y no un servidor de empresa, le puse **`(X) Skip for now`** (omitir por ahora) y seguí.

![Selección de la Opción Skip For Now](../img/imgConfiguracion/skipForNow.png)


### 3.7 Habilitar SSH (¡Súper importante!)
- Para poder conectarme más rato desde la terminal de mi compu, era obligatorio instalar SSH. Marqué la casilla **`[X] Install OpenSSH server`** apretando el espacio y le di a **[ Hecho ]**.

![Habilitamos la opción de install OpenSSH Server](../img/imgConfiguracion/openSsh.png)

### 3.8 Programas Extra (Snaps)
- Como la guía pide que nosotros mismos instalemos Nginx y el resto de cosas a mano por línea de comandos, pasé de largo esta lista sin marcar absolutamente nada.

![No instalar servicios externos automáticamente](../img/imgConfiguracion/sinServiciosExternos.png)

---
*(Acá dejé que el sistema instalara todo solo. Aprovechó de bajar unas actualizaciones de seguridad y, cuando terminó, le di a "Reboot Now" para reiniciar).*

![Instalación de todos los servicios seleccionados](../img/imgConfiguracion/instalacionCompleta.png)
---

## FASE 4: Mi primera conexión por SSH

Cuando la máquina se reinició y apareció la pantalla negra pidiendo el login, preferí no entrar por ahí, sino desde mi propio PC para poder copiar y pegar comandos más fácil.

1. Abrí la terminal en mi computador.
2. Escribí el siguiente comando para aprovechar el puerto 2222 que configuré al principio:
   ```bash
   ssh -p 2222 inacap@localhost

![Ejecución del comando ssh -p 2222 inacap@localhost](../img/imgConfiguracion/conexionMaquina.png)

![Conexión exitosa a la maquina virtual desde la powershell](../img/imgConfiguracion/conexionExitosa.png)