import jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';

export let auth = (req: Request, res: Response, next: NextFunction) => {
  const secretKey = 'aagethrud812d8d2dhdydbd5d4d2d'; // clé de sécurité de token d'authentification
  try {
    if (req.headers.authorization) {
      const token = (<string>req.headers.authorization).split(' ')[1]; // récupérer le token d'autentification de l'entête de la requête
      const decodedToken = jwt.verify(token, secretKey); // décoder le token d'authentification
      const idyogi = (decodedToken as any).id; // récupérer l'id d'utilisateur du token
      if (req.body.idYogi && req.body.idYogi !== idyogi) {
        throw 'Invalid client ID';
      } else {
        next();
      }
    } // comparer l'id du token associé à l'entête de requête avec l'id envoyé dans le corps
  }
  catch {
    res.status(401).json({ error: new Error('Invalid request!') });
  }
}

module.exports = auth;