# Script de Instalación: Configuración de Entorno de Desarrollo

Este script automatiza la configuración de un entorno de desarrollo completo que incluye Apache, PHP y MySQL. Además, prepara una base de datos y configura un host virtual para un proyecto web.

## Propósito del Script

El objetivo principal de este script es instalar y configurar los componentes necesarios para ejecutar un sistema web. Esto incluye la instalación de Apache como servidor web, PHP como lenguaje de backend, y MySQL como base de datos. También realiza configuraciones específicas para que el proyecto funcione correctamente, como la creación de un host virtual y la generación de un archivo de configuración con credenciales para la base de datos.

## Importancia de un Sistema Limpio

Es crucial ejecutar este script en un sistema limpio para evitar conflictos con configuraciones o dependencias preexistentes. Si ya hay versiones instaladas de Apache, PHP o MySQL, estas pueden generar problemas que afecten el correcto funcionamiento del sistema.
En caso de utilizar estas dependencias se recomienda leer el Manual Técnico, donde se detalla el paso a paso de la instalación en el capítulo 4, sección 2: Entorno de producción.

Para garantizar un entorno limpio:
- Elimina cualquier instalación previa de Apache, PHP o MySQL. Esto puede lograrse utilizando el comando `sudo apt-get remove --purge` seguido de los paquetes relacionados.
- Limpia archivos residuales en directorios como `/etc/apache2`, `/etc/php`, y `/var/lib/mysql`.
- Si trabajas en un entorno existente, realiza un respaldo de las configuraciones y datos importantes antes de proceder.

## Pasos del Script

1. **Preparación del Sistema**  
   El script actualiza los paquetes instalados y agrega el repositorio necesario para instalar PHP 8.3, asegurándose de que el sistema esté listo para los siguientes pasos.

2. **Instalación de Apache**  
   Se instala el servidor web Apache y se configura para trabajar con PHP 8.3 como módulo.

3. **Instalación de PHP**  
   PHP 8.3 y las extensiones necesarias, como la compatibilidad con MySQL, se instalan para permitir la ejecución del sistema.

4. **Instalación y Configuración de MySQL**  
   MySQL se instala y configura automáticamente con contraseñas seguras para el usuario `root`. Además, se crea una base de datos llamada `formsSystem` y un usuario `fsAdmin` con permisos sobre esta base. Si están disponibles, también se importan datos iniciales desde archivos SQL.

5. **Creación del Archivo config.php**  
   Un archivo de configuración llamado `config.php` se genera automáticamente con las credenciales de la base de datos, las cuales son necesarias para la conexión del sistema.

6. **Configuración de Apache**  
   Se crea un archivo de configuración llamado `forms-site.conf`, que define un host virtual. Este host virtual:
   - Define la raíz del documento para el frontend del sistema.
   - Establece un alias `/api` que permite enrutar las solicitudes a la API del proyecto.
   Se habilita el módulo `rewrite`, se desactiva la configuración por defecto de Apache y se activa la configuración específica del proyecto.

7. **Reinicio de Apache**  
   El script reinicia Apache para aplicar los cambios y activar las configuraciones realizadas.

## Detalles de Configuración Generada

El host virtual creado permite que el frontend se sirva desde el directorio `frontend/forms/dist` y que las solicitudes a la API se enruten al directorio `src`. Además, el archivo `config.php` contiene la información necesaria para que el sistema se conecte a la base de datos configurada.

## Ejecución del Script

Para ejecutar el script, asegúrese de contar con permisos de superusuario y utilice el siguiente comando:
`chmod 700 install.sh`
`bash install.sh`
---
