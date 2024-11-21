#!/bin/bash

# Detener ejecución si ocurre un error
set -e

# Variables para la base de datos
DB_NAME="formsSystem"
DB_USER="fsAdmin"
DB_PASSWORD="fsa!at!LIIT.2024"
DB_ROOT_PASSWORD="DB!at!LIIT.2024"

# Directorio del script
SCRIPT_DIR=$(dirname "$(realpath "$0")")

# Actualizar paquetes
echo "Actualizando el sistema... Esta operación puede tardar unos minutos..."
sudo apt update && sudo apt upgrade -y

# Agregar repositorio para PHP 8.3
echo "Agregando el repositorio de PHP 8.3... Esta versión de PHP es necesaria para ejecutar el sistema."
sudo apt install -y software-properties-common
sudo add-apt-repository -y ppa:ondrej/php
sudo apt update

# Instalar Apache
echo "Instalando Apache..."
sudo apt install -y apache2

# Instalar PHP 8.3 y extensiones necesarias
echo "Instalando PHP 8.3 y extensiones..."
sudo apt install -y php8.3 php8.3-cli php8.3-mysql  libapache2-mod-php8.3

# Configurar PHP como módulo de Apache
echo "Configurando Apache para usar PHP 8.3..."
sudo a2dismod php
sudo a2enmod php8.3
sudo systemctl restart apache2

# Instalar MySQL
echo "Instalando MySQL..."
sudo apt install -y mysql-server

# Configurar MySQL
echo "Configurando MySQL..."
sudo mysql_secure_installation <<EOF

y
$DB_ROOT_PASSWORD
$DB_ROOT_PASSWORD
y
y
y
y
EOF

# Crear base de datos y usuario
echo "Creando base de datos y usuario..."

# Importar datos (opcional)
if [ -f "sql/DB_init.sql" ] && [ -f "sql/DB_data.sql" ]; then
  echo "Importando datos desde sql/DB_init.sql y sql/insertAdmin.sql..."
  sudo mysql -u root -p"$DB_ROOT_PASSWORD" < sql/DB_init.sql
  sudo mysql -u root -p"$DB_ROOT_PASSWORD" < sql/insertAdmin.sql
fi

# escribir en el archivo de configuración config.php
echo "Escribiendo configuración en config.php..."
echo "<?php

\$host = 'localhost';
\$db_host = '\$DB_NAME';

return [
    'dsn' => 'mysql:host={\$host};dbname={\$db_host};charset=utf8',
    'username' => '\$DB_USER',
    'password' => '\$DB_ROOT_PASSWORD',
];" > src/config.php


# Configuración de Apache


# Archivo forms-site.conf
echo "Creando archivo de configuración de Apache..."
echo "<VirtualHost *:80>
    ServerName localhost
    DocumentRoot $SCRIPT_DIR/frontend/forms/dist

    <Directory $SCRIPT_DIR/frontend/forms/dist>
        AllowOverride All
        Require all granted
    </Directory>

    # API alias
    Alias /api $SCRIPT_DIR/src
    <Directory $SCRIPT_DIR/src>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>" > | sudo tee /etc/apache2/sites-available/forms-site.conf > /dev/null



echo "Habilitando módulo rewrite en Apache..."
sudo a2enmod rewrite

echo "Desactivando configuración por defecto de Apache..."
sudo a2dissite 000-default.conf

echo "Activando configuración de forms-site..."
sudo a2ensite forms-site.conf

echo "Reiniciando Apache..."
sudo systemctl restart apache2
