# Página 8 ·  Desafío (HTTPS y Dominio)

## 1. El Intento de Certificación SSL (Let's Encrypt)
Como parte del desafío opcional, intenté asegurar el servidor Nginx instalando un certificado SSL/TLS gratuito mediante **Certbot** y la autoridad certificadora **Let's Encrypt**. 

Los comandos ejecutados para preparar el entorno fueron:
`sudo apt install certbot python3-certbot-nginx`
`sudo certbot --nginx -d wiki.posang.local`

**Análisis del Intento (Fallo Esperado):**
Como se observa en la captura de evidencia, el proceso arrojó un error de validación (ACME Challenge). Esto ocurre porque Let's Encrypt requiere resolver el dominio a través de un servidor DNS público de internet para verificar la propiedad del mismo. Al estar operando en una máquina virtual local (VirtualBox con NAT) y sin un dominio registrado de nivel superior (TLD), los servidores de Let's Encrypt no pueden alcanzar mi IP para validar la solicitud. 

*El intento demuestra el flujo correcto que se aplicaría en un entorno de producción (VPS o Cloud) una vez asignada una IP pública.*

> **Mi Evidencia (Fallo de Certbot):**
> ![Intento de Certbot en la terminal](/img/img_desafio/errorDominio.png)


---

## 2. Asociación de Dominio Local (DNS Simulation)
Para cumplir con la segunda alternativa del desafío ("asociar un nombre de dominio"), decidí aplicar una técnica de resolución local manipulando el archivo `hosts` del sistema operativo cliente (mi máquina anfitriona Windows).

En lugar de acceder mediante la dirección de *loopback* (`localhost`), modifiqué el archivo ubicado en `C:\Windows\System32\drivers\etc\hosts` añadiendo la siguiente regla de enrutamiento estático:

`127.0.0.1       wiki.posang.local`

**Resultado:**
Al engañar al resolvedor DNS de mi sistema operativo, ahora puedo acceder a la Wiki directamente utilizando el nombre de dominio personalizado `http://wiki.posang.local:8080`. El túnel de Port Forwarding de VirtualBox captura esta petición y la envía con éxito al puerto 80 del servidor Nginx en Ubuntu.

> **Mi Evidencia (Dominio Local Funcionando):**
> ![Navegador accediendo por el dominio wiki.posang.local](/img/img_desafio/cambioDominio.png)
