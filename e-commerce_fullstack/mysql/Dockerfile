# Usa l'immagine ufficiale di MySQL come base
FROM mysql

# Imposta le variabili d'ambiente per la configurazione di MySQL
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_USER=my_user
ENV MYSQL_PASSWORD=my_password

# Copia il file init.sql nella directory docker-entrypoint-initdb.d
# Tutti i file .sql in questa directory verranno eseguiti automaticamente all'avvio del container
COPY init.sql /docker-entrypoint-initdb.d/

# Esponi la porta 3306
EXPOSE 3306