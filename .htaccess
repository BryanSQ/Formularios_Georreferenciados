<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /

    # Serve static files directly
    RewriteCond %{REQUEST_FILENAME} -f
    RewriteRule ^ - [L]

    # Serve index.html for other routes
    RewriteRule ^ index.html [L]
</IfModule>
