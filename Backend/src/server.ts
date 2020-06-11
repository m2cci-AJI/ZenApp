import { Application } from './app';

let app = new Application(process.env.PORT || 4000); // istancier l'objet serveur 
app.start(); // exécuter le serveur