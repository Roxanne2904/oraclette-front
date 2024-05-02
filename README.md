# O'Raclette front 🧀

## Sommaire

- [Installation du projet](#Installation-du-projet)
  - [Développement](#Développement)
  - [Production](#Production)
- [Tests](#Tests)

## Installation du projet

1. Dupliquer le fichier des variables d'environnement :

   ```sh
   cp .env.example .env
   ```

1. Définir les variables d'environnement dans le fichier `.env`

1. Pour éviter les problèmes d'importation et assurer une expérience de développement fluide, installez les dépendances localement :

   ```sh
   npm install
   ```

### Développement

1. [Installer et initialiser](#Installation-du-projet) le projet

2. Lancer le conteneur Docker :

   ```sh
   docker compose up --build -d
   ```

Une fois le conteneur lancé, l'application devrait être active sur [localhost:8080](http://localhost:8080/)

### Production

1. [Installer et initialiser](#Installation-du-projet) le projet

1. Construire le projet pour le déploiement :

   ```sh
   npm run build
   ```

1. Ajouter le `.htaccess` dans le répertoire de production :

   ```sh
   cp .htaccess ./dist/
   ```

## Tests

1. [Installer et initialiser](#Installation-du-projet) le projet

1. Lancer Cypress :

   ```sh
   npm run test
   ```

1. Cliquer sur "Tests E2E"

1. Choisir un navigateur

1. Ouvrir une spec
