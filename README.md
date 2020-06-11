# ZenRelax

Depuis sa création en 2020 par l'instructeur Ahmed Jemai, l'application  **ZenRelax** vous permet de limiter le stress et d'installer le calme et la tranquilité en quelques minutes. Elle a été mise au point graçe aux différents ouvrages élaborés par le fameux psychiatre Christophe Andrée sur le sujet de la méditation. Cette application est d'utilisation très simple, efficace et gratuite. Elle a été créée dans le cadre d'aider les personnes anxieuses pendant la période de confinement pour gérer leurs stresses.

# Contenu de ZenRelax:

L' application **ZenRelax** comporte essentiellement deux types de pratiques méditatives:

* **Pranayama**: C'est une branche de Yoga basée sur la respiration. Elle utilise le lien entre notre état mental et la respiration. Vous avez peut-être remarqué que, lorsque vous êtes stressés, la respiration s'accélère. A l'inverse, un état d'esprit zen génère une respiration profonde et calme. Pranayma agit sur le souffle permettant ainsi de calmer les agitations du mental. Pour en savoir plus, consultez ce lien: [https://www.elle.fr/Minceur/Yoga/Pranayama-3637349](https://www.elle.fr/Minceur/Yoga/Pranayama-3637349).

* **Méditation**: C'est une pratique millénaire, qui a vu le jour en Inde il y a plus de cinq mille ans. Elle consiste à s'entraîner à maintenir son attention et à empêcher son esprit de se laisser emporter par les pensées qui surgissent sans arrêt.  Pour en savoir plus, consultez ce lien: [https://www.nicolebordeleau.com/meditation/](https://www.nicolebordeleau.com/meditation/).

---

# Les outils de Développement

Avant de pouvoir créer ce projet, vous devez installer et configurer les dépendances suivante sur votre ordinateur:

## La partie back-end:

#### Node.js:
Nous avons utilisé [Node.js](https://nodejs.org/) pour créer un serveur web contenant l'API REST. Installez également nodemon.js pour créer une expérience de développement agréable où votre navigateur s'actualise automatique à chaque changement du code source.

#### Express:
Nous avons également installé le micro-framework [Express](https://expressjs.com/) dans le but de créer l'API REST permettant, ainsi, d'intéragir avec la base de données. 

#### Typescript:
Nous avons utilisé le langage [TypeScript](https://www.typescriptlang.org/) sur la partie back-end. Le navigateur ne peut pas exécuter directement TypeScript. Le code doit être transpilé en JavaScript à l'aide d'un compilateur, qui nécessite une configuration via le fichier tsconfig.json. Ainsi, toutes les dépendances doivent être installées avec leurs fichiers de définition.  

#### Mongoose:
La base de données utilisée pour cette application est gérée par l'intermédiare de [Mongodb](https://www.mongodb.com/). C'est un système de gestion de base de données (SGBD) non-relationnelle orientée document. Afin de faciliter l'interaction avec ce SGBD, le mirco-framework Mongoose a été installé. 

## La partie Front-end:

#### Angular 8: 
l'outil [Angular](https://angular.io/) CLI permettant de gérer une application Agular a été installé. Cet outil offre plusieurs commandes facilitant la création du projet Angular, ainsi que la génération des composants, des modules, des services, ...

#### Bibliothèques: 
Les bibliothèques utilisées dans l'application coté client sont les suivantes:
* [vis.js](https://www.chartjs.org/): cette librairie a été exploitée pour créer un calendrier qui représente toutes les séances de méditation ou de pranayama pratiquées par le client.
* [chart.js](https://visjs.org/): cette librairie a été utilisée pour cérer des courbes représentant l'assiduité de client.
* [anime.js](https://animejs.com/): cette librairie a été employée afin de créer des animations visuellement agréable pour permettre au client de vivre une expérience méditative confortable.
* [syncfusion](https://www.syncfusion.com/): cette librairie nous a permis de développer un tableau de bord de visualisation des données afin de permettre au client de suivre son évolution dans la pratiques méditatives.
---

# Lancement de l'application sur le navigateur

Commencez par le clonage du projet en utilisant HTTPS:
```
https://github.com/m2cci-AJI/ZenApp.git

```
ou en utilisant SSH:
```
git@github.com:m2cci-AJI/ZenApp.git

```
Par la suite, passons à lancer notre application ZenRelax sur votre navigateur. En fait, cette application comporte principalement deux sous-dossiers indépendants: Frontend et Backend, avec leurs propres fichiers de configuration package.json. Tout d'abord, il faut exécuter la commande suivante dans deux terminaux différents pointés sur les dossiers Frontend et Backend:
```bash
npm install

```
Cette commande permet d'installer toutes les dépendances définits dans leurs fichiers de configuration package.json, en créant les dossiers node_modules correspondants.

Afin de lancer l'application angular localement sur votre serveur sur le port 4200, vous devez vous localiser sur le dossier Frontend et lancez la commande suivante sur le terminal:
```bash
npm run start
```
Cette commande exécute le script `start` définit dans le fichier package.json, comme suit:

```
  "scripts": {
    "start": "ng serve"
  }
```
Afin de lancer le serveur express sur le navigateur sur le port 4000, vous devez vous positionner sur le dossier Backend et exécuter la commande suivante:
```bash
npm run dev
```
Cette commande exécute le script `dev` définit dans le fichier package.json, comme suit:

```
  "scripts": {
    "dev": "concurrently -n \"TS, Node\" \"npx tsc --watch\" \"nodemon dist/Backend/src/server.js\""
  }
```
---

# Nettoyage du projet de l'application

Vous êtes invité à exécuter tout simplement la commande suivante:
```bash
npm run clean

```
Cette commande exécute le script `clean` qui est définit dans les fichiers package.json des parties Backend et Frontend, comme suit:

```
  "scripts": {
    "clean": "rm -rf node_modules"
  }
```
---

Finalement, je vous souhaite une expérience de méditation agréable, réjouissez-vous !
<p align="center">
  <img src = "Frontend/src/assets/img/meditation_pensees.jpg" width = 500>
</p>





