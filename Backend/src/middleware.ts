import jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';

export let auth = (req: Request, res: Response, next: NextFunction) => {
  const secretKey = 'aagethrud812d8d2dhdydbd5d4d2d';
  try {
    if (req.headers.authorization) {
      const token = (<string>req.headers.authorization).split(' ')[1];
      const decodedToken = jwt.verify(token, secretKey);
      const idyogi = (decodedToken as any).id;
      if (req.body.idYogi && req.body.idYogi !== idyogi) {
        throw 'Invalid client ID';
      } else {
        next();
      }
    }
  }
  catch {
    res.status(401).json({ error: new Error('Invalid request!') });
  }
}

module.exports = auth;