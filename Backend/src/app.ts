
import express, { Request, Response } from 'express';
import mongoose = require("mongoose");
import bodyparser = require("body-parser");
import cors from 'cors';
import { Yogi } from './models/yogi.model';
var bcrypt = require('bcryptjs');

export class Application {

    constructor(private port: any) { }

    start() {
        const app = express();
        const MONGODB_CONNECTION: string = 'mongodb://127.0.0.1:27017';
        app.use(cors());
        app.options('*', cors());
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ limit: '10mb', extended: true }));
        const SECRET_KEY: string = 'aagethrud812d8d2dhdydbd5d4d2d';
        mongoose.connect(MONGODB_CONNECTION,
            {
                useNewUrlParser: true
            });
        const db = mongoose.connection;
        
        db.once('open', _ => {
            console.log('Database connected:', MONGODB_CONNECTION)
        });
        db.on('error', err => {
            console.error('connection error:', err)
        });

        app.post('/api/signup', (req: Request, res: Response, next) => {
            bcrypt.hash(req.body.password, 10)
                .then((hash:any) => {
                    const yogi = new Yogi({
                        login: req.body.login,
                        name: req.body.name,
                        email: req.body.email,
                        birthday: req.body.birthday,
                        password: hash,
                        ConnectionPerWeek: req.body.ConnectionPerWeek
                    });
                    yogi.save()
                        .then((data: any) => { res.status(200).json({ message: 'user is successifuly added !', Data: data }) })
                        .catch((err: any) => {
                            res.status(400).json({ message: 'L\'email que vous saisissez est invalide. Cet email existe déja !', err: err });
                        })
                        .catch((err: any) => { res.status(500).json({ message: 'Cette erreur vient du serveur ! Veuillez re-connecter ultérieurement.', error: err }) });
                });
        });

        app.listen(this.port, () => {
            console.log("réponse recue !");
        });
    }
}