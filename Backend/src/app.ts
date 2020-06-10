
import express, { Request, Response } from 'express';
import mongoose = require("mongoose");
import bodyparser = require("body-parser");
import cors from 'cors';
import { Yogi } from './models/yogi.model';
var bcrypt = require('bcryptjs');
import jsonwebtoken = require('jsonwebtoken');
import { passwordResetToken } from './models/token.model';
import nodemailer from 'nodemailer';
import crypto from "crypto";

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
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
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

        app.post('/api/login', (req: Request, res: Response, next) => {
            Yogi.findOne({ email: req.body.email })
                .then((yogi) => {
                    if (!yogi) {
                        return res.status(401).json({ message: 'Cet email n\'existe pas ! Veuillez vérifier votre adresse email.' });
                    } else {
                        bcrypt.compare(req.body.password, yogi.password)
                            .then((valid: any) => {
                                if (!valid) {
                                    return res.status(401).json({ message: 'Ce mot de passe ne correspond pas à cet email ! Veuillez vérifier votre mot de passe.' });
                                } else {
                                    return res.status(200).json({
                                        id: yogi._id,
                                        token: jsonwebtoken.sign(
                                            { id: yogi._id },
                                            SECRET_KEY,
                                            { expiresIn: '24h' }
                                        )
                                    });
                                }
                            })
                            .catch((err: any) => res.status(500).json({ message: 'Cette erreur vient du serveur ! Veuillez re-connecter ultérieurement !' }));
                    }
                })
                .catch(() => { });
        });

        app.post('/api/valid-password-token', (req: Request, res: Response, next) => {
            if (!req.body.resettoken) {
                return res.status(500).json({ message: 'Token est obligatoire !' });
            }
            passwordResetToken.findOne({ resettoken: req.body.resettoken })
                .then((token) => {
                    if (!token) {
                        return res.status(409).json({ message: 'L\'URL est non validé' });
                    }
                    Yogi.findByIdAndUpdate({ _id: token._userId }, {}) // revised
                        .then(() => {
                            res.status(200).json({ message: 'Token a été vérifié avec succès.' });
                        })
                        .catch((err: any) => { res.status(500).send({ msg: err.message }) });
                })
                .catch((error: any) => res.status(500).json(error));
        });


        app.post('/api/req-reset-password', (req: Request, res: Response, next) => {
            Yogi.findOne({ email: req.body.email })
                .then((yogi) => {
                    if (!yogi) {
                        return res.status(401).json({ message: 'Cet email n\'existe pas ! Veuillez vérifier votre adresse email.' });
                    }
                    let resettoken = new passwordResetToken({ _userId: yogi._id, resettoken: crypto.randomBytes(16).toString('hex') });
                    resettoken.save()
                        .then(() => {
                            passwordResetToken.find({ _userId: yogi._id, resettoken: { $ne: resettoken.resettoken } }).remove().exec();
                            let transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'jemaienit@gmail.com',
                                    pass: 'AHm08718127'
                                }
                            });
                            let mailOptions = {
                                to: yogi.email,
                                from: 'jemaienit@gmail.com',
                                subject: 'Changement de mot de passe de votre compte',
                                html: '<h1>Changement du mot de passe de votre compte<h1><h4>Bonjour ' + yogi.name + ',</h4><p>Nous avons reçu une demande de ré-initialisation de votre mot de passe. (Si vous n\'avez pas émis cette demande, veuillez ignorer cet email.)</p><h4>Pour ré-initialiser votre mot de passe, cliquez sur le lien ci-dessous.</h4><a href = "http://localhost:4200/response-reset-password/' + resettoken.resettoken + '">Modifiez votre mot de passe</a><p>Une fois votre mot de passe modifié, nous vous recommandons de le conserver de manière sécurisée. Ne communiquez pas votre mot de passe et ne répondez jamais à un email sollicitant vos codes d\'accès.</p><p>Cordialement.</p>'
                            };
                            transporter.sendMail(mailOptions, (err, info) => {
                                console.log(err || info);
                            });
                            res.status(200).json({ message: 'L\'email est envoyé avec succès !' });
                        })
                        .catch((error: any) => res.status(500).send({ msg: error.message }));

                })
                .catch((err) => { res.status(500).json(err) });
        });

        app.put('/api/login/:id', (req: Request, res: Response, next) => {
            Yogi.update({ _id: req.params.id }, { ...req.body, _id: req.params.id })
                .then((data) => res.status(200).json({ message: 'user is updated with success!', Data: data }))
                .catch((err) => res.status(400).json(err));
        });

        app.get('/api/signup', (req: Request, res: Response, next) => {
            Yogi.find()
                .then((yogis) => { res.status(200).json({ message: 'users are getted with sucees !', Data: yogis }) })
                .catch((err) => { res.status(400).json({ err }) });
        });

        app.listen(this.port, () => {
            console.log("réponse recue !");
        });
    }
}