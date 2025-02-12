# Projet IUT

## Description

Ce projet est une application web développée avec Hapi.js, permettant de gérer les utilisateurs et les films. L'application inclut des fonctionnalités telles que l'inscription, la connexion, la gestion des utilisateurs, la gestion des films et la gestion des favoris.

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
    MAIL_HOST=smtp.ethereal.email
    MAIL_PORT=587
    MAIL_USER=khalid.rosenbaum35@ethereal.email
    MAIL_PASS=y8Hup4fDZJBAEREaGq
    MAIL_FROM=khalid.rosenbaum35@ethereal.email
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
