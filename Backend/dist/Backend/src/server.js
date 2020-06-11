"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var app = new app_1.Application(process.env.PORT || 4000); // istancier l'objet serveur 
app.start(); // exécuter le serveur
