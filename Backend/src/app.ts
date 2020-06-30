
import express, { Request, Response } from 'express'; // importation de micro-framework express
import mongoose = require("mongoose"); // importation de micro-framework mongoose
import bodyparser = require("body-parser"); // importation de package permettant de transformer le corps de la requete en objet json
import cors from 'cors'; // importation de pachkage de sécurité cors
import { Yogi } from './models/yogi.model'; // importation du modèle yogi
var bcrypt = require('bcryptjs');  // importation du module bcryptjs pour cypter les mots de passe
import jsonwebtoken = require('jsonwebtoken'); // importation du module jsonwebtoken pour cérer un token d'authentification
import { passwordResetToken } from './models/token.model'; // importation du modèle token
import nodemailer from 'nodemailer'; // importation du micro-framework nodemailer utilisé pour envoyer des emails
import crypto from "crypto"; // imporation du micro-framework crypto pour générer des codes aléatoires
const auth = require('./middleware'); // importation de middleware de sécurité
import { Yoga } from './models/session.model'; // importation du modéle séance

export class Application {

    constructor(private port: any) { } // création du construteur utilisé pour instancier un serveur

    start() {
        const app = express(); // istanciation de l'objet express afin de créer le serveur 
        app.use(cors());
        app.options('*', cors()); // déblocage des mesures de sécurité cors
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ limit: '10mb', extended: true })); //  middlewares pour traiter les objets json envoyés dans les corps des requetes
        const SECRET_KEY: string = 'aagethrud812d8d2dhdydbd5d4d2d'; // clé de sécurité de token d'authentification
       
        /*********************************** Connexion à Mongodb ******************************************************************************/
        
        let env = process.env.NODE_ENV;
        const MONGODB_CONNECTION = 'mongodb://127.0.0.1:27017'; // localhost adresse local
        const MongoDB_URL = 'mongodb+srv://jemaiAHmed:AHm08718127@cluster0-r5ym1.mongodb.net/test?retryWrites=true&w=majority'; // adresse de la base de donnée distante enregistrée sur MONgodb Atlas
        mongoose.connect(env === 'development' ? MONGODB_CONNECTION: MongoDB_URL,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            }); // connection à la base de données Mongodb
        const db = mongoose.connection; // base de donnée mongodb

        // vérification si la connection à la base de donnée est faite ou pas
        db.once('open', _ => {
            console.log('Database connecté !')
        }); /*connection validée */
        db.on('error', err => {
            console.error('Erreur de connexion:', err)
        }); // erreur survenue empêchant la connection
         
        /********************************************************************************************************************************/
        
        app.post('/api/confirm-reset-password', (req: Request, res: Response, next) => {
            if (!req.body.email) {
                return res.status(500).json({ message: 'L\'email est manqué ! Veuillez écrire votre adresse email.' });
            } // envoi d'une erreur en cas où l'utilisateur a oublié de mettre son adresse email
            Yogi.findOne({ email: req.body.email })
                .then((yogi) => {
                    if (!yogi) {
                        return res.status(409).json({ message: 'Cet Email n\'existe pas !' });
                    } // envoi d'erreur en cas où l'email n'existe pas dans la base de données
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'jemaienit@gmail.com',
                            pass: 'AHm08718127'
                        }
                    }); // création du l'objet transporter permettant d'envoyer un email
                    let mailOptions = {
                        to: yogi.email,
                        from: 'jemaienit@gmail.com',
                        subject: 'Votre mot de passe a été modifié',
                        html: '<h1>Votre mot de passe a été modifié.<h1><h4>Bonjour ' + yogi.name + ',</h4><p>Cet email a pour but de vous confirmer la modification récente de votre mot de passe.</p><p>Conservez votre mot de passe de manière sécurisée. Ne le communiquez pas et ne répondez jamais à un email sollicitant vos codes d\'accès. </p><p>Votre adresse email et vos informations de contact ne sont pas partagées avec des tiers sans votre permission, sauf si cela est légalement requis ou lorsque cela est nécessaire pour le fonctionnement du site.</p><p>Cordialement.</p>'
                    }; // envoi de l'email
                    transporter.sendMail(mailOptions, (err, info) => {
                        console.log(err || info);
                    }); // envoi d'erreur en cas où l'email n'est pas envoyé
                    res.status(201).json({ message: 'L\'email est envoyé avec succès !' });
                })
                .catch((error: any) => res.status(500).json(error)); // erreur du serveur
        }); // middleware permettant de confirmer la modification du mot de passe en envoyant un email


        app.post('/api/signup', (req: Request, res: Response, next) => {
            bcrypt.hash(req.body.password, 10)
                .then((hash: any) => {
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
                        });
                }) // après le cryptage du mot de passe, l'objet yogi est sauvegardé dans la base de données
                .catch((err: any) => { res.status(500).json({ message: 'Cette erreur vient du serveur ! Veuillez re-connecter ultérieurement.', error: err }) });
        }); // middleware permettant de s'inscrire avant d'accéder à l'application

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
                    } // comparer le mot de passe entré par l'utilisateur avec celui qui a été enregistré lors de l'inscription de l'utilisateur
                })
                .catch(() => { });
        }); // middleware permettant de se connecter à l'application

        app.post('/api/valid-password-token', (req: Request, res: Response, next) => {
            if (!req.body.resettoken) {
                return res.status(500).json({ message: 'Token est obligatoire !' });
            }
            passwordResetToken.findOne({ resettoken: req.body.resettoken })
                .then((token) => {
                    if (!token) {
                        return res.status(409).json({ message: 'L\'URL est non validé' });
                    }
                    Yogi.findByIdAndUpdate({ _id: token._userId }, {})
                        .then(() => {
                            res.status(200).json({ message: 'Token a été vérifié avec succès.' });
                        })
                        .catch((err: any) => { res.status(500).send({ msg: err.message }) });
                })
                .catch((error: any) => res.status(500).json(error));
        }); // middleware permettant de valider le token d'authentification utilisé pour revenir à l'application après la clique sur le lien envoyé par l'email

        app.post('/api/new-password', (req: Request, res: Response, next) => {
            passwordResetToken.findOne({ resettoken: req.body.resettoken })
                .then((yogiToken) => {
                    if (!yogiToken) {
                        return res.status(409).json({ message: 'Token est expiré' });
                    }
                    Yogi.findOne({ _id: yogiToken._userId })
                        .then((yogiEmail) => {
                            if (!yogiEmail) {
                                return res.status(409).json({ message: 'Ce client n\'existe pas !' });
                            }
                            bcrypt.hash(req.body.newPassword, 10)
                                .then((hash: any) => {
                                    yogiEmail.password = hash;
                                    yogiEmail.save()
                                        .then(() => {
                                            yogiToken.remove();
                                            res.status(201).json({ message: 'Le mot de passe est modifié avec succès !', email: yogiEmail.email });
                                        })
                                        .catch(() => res.status(400).json({ message: 'Le mot de passe n\'est pas modifié !' }));
                                })
                                .catch(() => { res.status(400).json({ message: 'Erreur d\'encodage du mot de passe !' }); });
                        })
                        .catch((error: any) => res.status(500).json(error));
                })
                .catch((error: any) => res.status(500).json(error));
        }); // middleware permettant de valider la modification du mot de passe avant d'envoyer l'email de confirmation


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
                            }); // création du l'objet transporter permettant d'envoyer un email
                            let mailOptions = {
                                to: yogi.email,
                                from: 'jemaienit@gmail.com',
                                subject: 'Changement de mot de passe de votre compte',
                                html: '<h1>Changement du mot de passe de votre compte<h1><h4>Bonjour ' + yogi.name + ',</h4><p>Nous avons reçu une demande de ré-initialisation de votre mot de passe. (Si vous n\'avez pas émis cette demande, veuillez ignorer cet email.)</p><h4>Pour ré-initialiser votre mot de passe, cliquez sur le lien ci-dessous.</h4><a href = "http://localhost:4200/response-reset-password/' + resettoken.resettoken + '">Modifiez votre mot de passe</a><p>Une fois votre mot de passe modifié, nous vous recommandons de le conserver de manière sécurisée. Ne communiquez pas votre mot de passe et ne répondez jamais à un email sollicitant vos codes d\'accès.</p><p>Cordialement.</p>'
                            }; // envoi de l'email
                            transporter.sendMail(mailOptions, (err, info) => {
                                console.log(err || info);
                            }); // envoi d'erreur en cas où l'email n'est pas envoyé
                            res.status(200).json({ message: 'L\'email est envoyé avec succès !' });
                        })
                        .catch((error: any) => res.status(500).send({ msg: error.message }));

                })
                .catch((err) => { res.status(500).json(err) });
        }); // middleware permettant d'nvoyer un email contenant un lien permettant au client d'entrer le nouveau mot de passe

        app.put('/api/login/:id', (req: Request, res: Response, next) => {
            Yogi.update({ _id: req.params.id }, { ...req.body, _id: req.params.id })
                .then((data) => res.status(200).json({ message: 'user is updated with success!', Data: data }))
                .catch((err) => res.status(400).json(err));
        }); // middleware permettant de mettre à jour un utilisateur à travers son id

        app.get('/api/signup', (req: Request, res: Response, next) => {
            Yogi.find()
                .then((yogis) => { res.status(200).json({ message: 'users are getted with sucees !', Data: yogis }) })
                .catch((err) => { res.status(400).json({ err }) });
        }); // middleware permettant de récupérer tous les utilisateurs de l'application

        app.get('/api/signup/:id', (req: Request, res: Response, next) => {
            Yogi.find({ _id: req.params.id })
                .then((yogi) => { res.status(200).json({ message: 'user is getted with sucees !', Data: yogi }) })
                .catch((err) => { res.status(400).json({ err }) });
        }); // middleware permettant de récupérer un utilisateur à travers son id

        app.get('/api/session/:id', auth, (req: Request, res: Response, next) => {
            Yoga.find({ idYogi: req.params.id })
                .then((data) => res.status(200).json({ message: 'sessions are getted with succes', Data: data }))
                .catch((err) => res.status(400).json({ err }));
        }); // middleware permettant de récupérer toutes les séances de relaxation faites par l'utilisateur ayant un id bien défini

        app.post('/api/session', auth, (req: Request, res: Response, next) => {
            const yoga = new Yoga({
                idYogi: req.body.idYogi,
                typeYoga: req.body.typeYoga,
                sousTypeYoga: req.body.sousTypeYoga,
                durationYoga: req.body.durationYoga,
                start: req.body.start,
                end: req.body.end,
                comment: req.body.comment,
                img: req.body.img
            }); // création de lobjet yoga représentant une séance de relaxation soit méditation ou pranayama
            yoga.save()
                .then((data: any) => res.status(201).json({ message: 'session is added with success!', Data: data }))
                .catch((err: any) => res.status(400).json({ err }));
        }); // middleware permettant d'enregistrer une séance dans la base de données

        app.put('/api/session/:id', auth, (req: Request, res: Response, next) => {
            Yoga.update({ _id: req.params.id }, { ...req.body, _id: req.params.id })
                .then((data) => res.status(200).json({ message: 'session is updated with success!', Data: data }))
                .catch((err) => res.status(400).json(err));
        }); // middleware permettant de mettre à jour une séance de relaxation à travers son id

        app.listen(this.port, () => {
            console.log("Réponse recue !");
        }); // middleware permettant d'écouter le serveur sur un port
    }
}