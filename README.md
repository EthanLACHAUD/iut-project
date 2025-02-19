# Projet IUT

## Prérequis

- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)
- MySQL (ou un autre serveur de base de données compatible)

## Installation

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/votre-nom-utilisateur/iut-project.git
    cd iut-project
    ```

2. Installez les dépendances :
    ```bash
    npm install
    ```

3. Configurez les variables d'environnement en créant un fichier `.env` à la racine du projet avec le contenu suivant :
    ```dotenv
    MAIL_HOST= # The hostname of the email server (e.g., smtp.example.com)
    MAIL_PORT= # The port number for the email server (e.g., 587 for TLS, 465 for SSL)
    MAIL_USER= # The username for authenticating with the email server
    MAIL_PASS= # The password for authenticating with the email server
    MAIL_FROM= # The email address that will appear in the 'From' field of the emails
    ```
   
## Configuration du docker-compose

   ```bash
   docker run -d --name hapi-mysql -p 3307:3306 -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user mysql:8.0 --default-authentication-plugin=mysql_native_password
   ```

## Exécution des migrations

Pour exécuter les migrations de la base de données, utilisez la commande suivante :
```bash
npx knex migrate:latest
```

## Lancement de l'application

Pour démarrer l'application, utilisez la commande suivante :
```bash
npm start
```

L'application sera accessible à l'adresse `http://localhost:3000`.

## Documentation de l'API

L'application utilise Swagger pour documenter son API. Une fois l'application démarrée, vous pouvez accéder à la documentation de l'API à l'adresse `http://localhost:3000/documentation`.

## Principales routes

### Utilisateurs

- `POST /user` : Créer un nouvel utilisateur
- `GET /user` : Lister tous les utilisateurs
- `DELETE /user/{id}` : Supprimer un utilisateur par ID
- `PATCH /user/{id}` : Mettre à jour un utilisateur par ID
- `POST /user/login` : Connexion d'un utilisateur

### Films

- `POST /movies` : Ajouter un nouveau film
- `PATCH /movies/{id}` : Mettre à jour un film par ID
- `DELETE /movies/{id}` : Supprimer un film par ID
- `GET /movies` : Lister tous les films
- `POST /movies/export` : Exporter la liste des films en CSV et l'envoyer par email

### Favoris

- `POST /favorites` : Ajouter un film aux favoris d'un utilisateur
- `DELETE /favorites/{movieId}` : Supprimer un film des favoris d'un utilisateur
- `GET /favorites` : Lister les films favoris d'un utilisateur
