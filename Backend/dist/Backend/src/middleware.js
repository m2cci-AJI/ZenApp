"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
exports.auth = function (req, res, next) {
    var secretKey = 'aagethrud812d8d2dhdydbd5d4d2d'; // clé de sécurité de token d'authentification
    try {
        if (req.headers.authorization) {
            var token = req.headers.authorization.split(' ')[1]; // récupérer le token d'autentification de l'entête de la requête
            var decodedToken = jwt.verify(token, secretKey); // décoder le token d'authentification
            var idyogi = decodedToken.id; // récupérer l'id d'utilisateur du token
            if (req.body.idYogi && req.body.idYogi !== idyogi) {
                throw 'Invalid client ID';
            }
            else {
                next();
            }
        } // comparer l'id du token associé à l'entête de requête avec l'id envoyé dans le corps
    }
    catch (_a) {
        res.status(401).json({ error: new Error('Invalid request!') });
    }
};
module.exports = exports.auth;
