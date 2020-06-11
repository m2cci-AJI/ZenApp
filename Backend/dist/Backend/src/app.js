"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express")); // importation de micro-framework express
var mongoose = require("mongoose"); // importation de micro-framework mongoose
var bodyparser = require("body-parser"); // importation de package permettant de transformer le corps de la requete en objet json
var cors_1 = __importDefault(require("cors")); // importation de pachkage de sécurité cors
var yogi_model_1 = require("./models/yogi.model"); // importation du modèle yogi
var bcrypt = require('bcryptjs'); // importation du module bcryptjs pour cypter les mots de passe
var jsonwebtoken = require("jsonwebtoken"); // importation du module jsonwebtoken pour cérer un token d'authentification
var token_model_1 = require("./models/token.model"); // importation du modèle token
var nodemailer_1 = __importDefault(require("nodemailer")); // importation du micro-framework nodemailer utilisé pour envoyer des emails
var crypto_1 = __importDefault(require("crypto")); // imporation du micro-framework crypto pour générer des codes aléatoires
var auth = require('./middleware'); // importation de middleware de sécurité
var session_model_1 = require("./models/session.model"); // importation du modéle séance
var Application = /** @class */ (function () {
    function Application(port) {
        this.port = port;
    } // création du construteur utilisé pour instancier un serveur
    Application.prototype.start = function () {
        var app = express_1.default(); // istanciation de l'objet express afin de créer le serveur 
        var MONGODB_CONNECTION = 'mongodb://127.0.0.1:27017'; // localhost adresse local
        app.use(cors_1.default());
        app.options('*', cors_1.default()); // déblocage des mesures de sécurité cors
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ limit: '10mb', extended: true })); //  middlewares pour traiter les objets json envoyés dans les corps des requetes
        var SECRET_KEY = 'aagethrud812d8d2dhdydbd5d4d2d'; // clé de sécurité de token d'authentification
        mongoose.connect(MONGODB_CONNECTION, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }); // connection à la base de données Mongodb
        var db = mongoose.connection; // base de donnée mongodb
        // vérification si la connection à la base de donnée est faite ou pas
        db.once('open', function (_) {
            console.log('Database connected:', MONGODB_CONNECTION);
        }); /*connection validée */
        db.on('error', function (err) {
            console.error('connection error:', err);
        }); /*erreur survenue empêchant la connection */
        app.post('/api/confirm-reset-password', function (req, res, next) {
            if (!req.body.email) {
                return res.status(500).json({ message: 'L\'email est manqué ! Veuillez écrire votre adresse email.' });
            } // envoi d'une erreur en cas où l'utilisateur a oublié de mettre son adresse email
            yogi_model_1.Yogi.findOne({ email: req.body.email })
                .then(function (yogi) {
                if (!yogi) {
                    return res.status(409).json({ message: 'Cet Email n\'existe pas !' });
                } // envoi d'erreur en cas où l'email n'existe pas dans la base de données
                var transporter = nodemailer_1.default.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'jemaienit@gmail.com',
                        pass: 'AHm08718127'
                    }
                }); // création du l'objet transporter permettant d'envoyer un email
                var mailOptions = {
                    to: yogi.email,
                    from: 'jemaienit@gmail.com',
                    subject: 'Votre mot de passe a été modifié',
                    html: '<h1>Votre mot de passe a été modifié.<h1><h4>Bonjour ' + yogi.name + ',</h4><p>Cet email a pour but de vous confirmer la modification récente de votre mot de passe.</p><p>Conservez votre mot de passe de manière sécurisée. Ne le communiquez pas et ne répondez jamais à un email sollicitant vos codes d\'accès. </p><p>Votre adresse email et vos informations de contact ne sont pas partagées avec des tiers sans votre permission, sauf si cela est légalement requis ou lorsque cela est nécessaire pour le fonctionnement du site.</p><p>Cordialement.</p>'
                }; // envoi de l'email
                transporter.sendMail(mailOptions, function (err, info) {
                    console.log(err || info);
                }); // envoi d'erreur en cas où l'email n'est pas envoyé
                res.status(201).json({ message: 'L\'email est envoyé avec succès !' });
            })
                .catch(function (error) { return res.status(500).json(error); }); // erreur du serveur
        }); // middleware permettant de confirmer la modification du mot de passe en envoyant un email
        app.post('/api/signup', function (req, res, next) {
            bcrypt.hash(req.body.password, 10)
                .then(function (hash) {
                var yogi = new yogi_model_1.Yogi({
                    login: req.body.login,
                    name: req.body.name,
                    email: req.body.email,
                    birthday: req.body.birthday,
                    password: hash,
                    ConnectionPerWeek: req.body.ConnectionPerWeek
                });
                yogi.save()
                    .then(function (data) { res.status(200).json({ message: 'user is successifuly added !', Data: data }); })
                    .catch(function (err) {
                    res.status(400).json({ message: 'L\'email que vous saisissez est invalide. Cet email existe déja !', err: err });
                });
            }) // après le cryptage du mot de passe, l'objet yogi est sauvegardé dans la base de données
                .catch(function (err) { res.status(500).json({ message: 'Cette erreur vient du serveur ! Veuillez re-connecter ultérieurement.', error: err }); });
        }); // middleware permettant de s'inscrire avant d'accéder à l'application
        app.post('/api/login', function (req, res, next) {
            yogi_model_1.Yogi.findOne({ email: req.body.email })
                .then(function (yogi) {
                if (!yogi) {
                    return res.status(401).json({ message: 'Cet email n\'existe pas ! Veuillez vérifier votre adresse email.' });
                }
                else {
                    bcrypt.compare(req.body.password, yogi.password)
                        .then(function (valid) {
                        if (!valid) {
                            return res.status(401).json({ message: 'Ce mot de passe ne correspond pas à cet email ! Veuillez vérifier votre mot de passe.' });
                        }
                        else {
                            return res.status(200).json({
                                id: yogi._id,
                                token: jsonwebtoken.sign({ id: yogi._id }, SECRET_KEY, { expiresIn: '24h' })
                            });
                        }
                    })
                        .catch(function (err) { return res.status(500).json({ message: 'Cette erreur vient du serveur ! Veuillez re-connecter ultérieurement !' }); });
                } // comparer le mot de passe entré par l'utilisateur avec celui qui a été enregistré lors de l'inscription de l'utilisateur
            })
                .catch(function () { });
        }); // middleware permettant de se connecter à l'application
        app.post('/api/valid-password-token', function (req, res, next) {
            if (!req.body.resettoken) {
                return res.status(500).json({ message: 'Token est obligatoire !' });
            }
            token_model_1.passwordResetToken.findOne({ resettoken: req.body.resettoken })
                .then(function (token) {
                if (!token) {
                    return res.status(409).json({ message: 'L\'URL est non validé' });
                }
                yogi_model_1.Yogi.findByIdAndUpdate({ _id: token._userId }, {})
                    .then(function () {
                    res.status(200).json({ message: 'Token a été vérifié avec succès.' });
                })
                    .catch(function (err) { res.status(500).send({ msg: err.message }); });
            })
                .catch(function (error) { return res.status(500).json(error); });
        }); // middleware permettant de valider le token d'authentification utilisé pour revenir à l'application après la clique sur le lien envoyé par l'email
        app.post('/api/new-password', function (req, res, next) {
            token_model_1.passwordResetToken.findOne({ resettoken: req.body.resettoken })
                .then(function (yogiToken) {
                if (!yogiToken) {
                    return res.status(409).json({ message: 'Token est expiré' });
                }
                yogi_model_1.Yogi.findOne({ _id: yogiToken._userId })
                    .then(function (yogiEmail) {
                    if (!yogiEmail) {
                        return res.status(409).json({ message: 'Ce client n\'existe pas !' });
                    }
                    bcrypt.hash(req.body.newPassword, 10)
                        .then(function (hash) {
                        yogiEmail.password = hash;
                        yogiEmail.save()
                            .then(function () {
                            yogiToken.remove();
                            res.status(201).json({ message: 'Le mot de passe est modifié avec succès !', email: yogiEmail.email });
                        })
                            .catch(function () { return res.status(400).json({ message: 'Le mot de passe n\'est pas modifié !' }); });
                    })
                        .catch(function () { res.status(400).json({ message: 'Erreur d\'encodage du mot de passe !' }); });
                })
                    .catch(function (error) { return res.status(500).json(error); });
            })
                .catch(function (error) { return res.status(500).json(error); });
        }); // middleware permettant de valider la modification du mot de passe avant d'envoyer l'email de confirmation
        app.post('/api/req-reset-password', function (req, res, next) {
            yogi_model_1.Yogi.findOne({ email: req.body.email })
                .then(function (yogi) {
                if (!yogi) {
                    return res.status(401).json({ message: 'Cet email n\'existe pas ! Veuillez vérifier votre adresse email.' });
                }
                var resettoken = new token_model_1.passwordResetToken({ _userId: yogi._id, resettoken: crypto_1.default.randomBytes(16).toString('hex') });
                resettoken.save()
                    .then(function () {
                    token_model_1.passwordResetToken.find({ _userId: yogi._id, resettoken: { $ne: resettoken.resettoken } }).remove().exec();
                    var transporter = nodemailer_1.default.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'jemaienit@gmail.com',
                            pass: 'AHm08718127'
                        }
                    }); // création du l'objet transporter permettant d'envoyer un email
                    var mailOptions = {
                        to: yogi.email,
                        from: 'jemaienit@gmail.com',
                        subject: 'Changement de mot de passe de votre compte',
                        html: '<h1>Changement du mot de passe de votre compte<h1><h4>Bonjour ' + yogi.name + ',</h4><p>Nous avons reçu une demande de ré-initialisation de votre mot de passe. (Si vous n\'avez pas émis cette demande, veuillez ignorer cet email.)</p><h4>Pour ré-initialiser votre mot de passe, cliquez sur le lien ci-dessous.</h4><a href = "http://localhost:4200/response-reset-password/' + resettoken.resettoken + '">Modifiez votre mot de passe</a><p>Une fois votre mot de passe modifié, nous vous recommandons de le conserver de manière sécurisée. Ne communiquez pas votre mot de passe et ne répondez jamais à un email sollicitant vos codes d\'accès.</p><p>Cordialement.</p>'
                    }; // envoi de l'email
                    transporter.sendMail(mailOptions, function (err, info) {
                        console.log(err || info);
                    }); // envoi d'erreur en cas où l'email n'est pas envoyé
                    res.status(200).json({ message: 'L\'email est envoyé avec succès !' });
                })
                    .catch(function (error) { return res.status(500).send({ msg: error.message }); });
            })
                .catch(function (err) { res.status(500).json(err); });
        }); // middleware permettant d'nvoyer un email contenant un lien permettant au client d'entrer le nouveau mot de passe
        app.put('/api/login/:id', function (req, res, next) {
            yogi_model_1.Yogi.update({ _id: req.params.id }, __assign(__assign({}, req.body), { _id: req.params.id }))
                .then(function (data) { return res.status(200).json({ message: 'user is updated with success!', Data: data }); })
                .catch(function (err) { return res.status(400).json(err); });
        }); // middleware permettant de mettre à jour un utilisateur à travers son id
        app.get('/api/signup', function (req, res, next) {
            yogi_model_1.Yogi.find()
                .then(function (yogis) { res.status(200).json({ message: 'users are getted with sucees !', Data: yogis }); })
                .catch(function (err) { res.status(400).json({ err: err }); });
        }); // middleware permettant de récupérer tous les utilisateurs de l'application
        app.get('/api/signup/:id', function (req, res, next) {
            yogi_model_1.Yogi.find({ _id: req.params.id })
                .then(function (yogi) { res.status(200).json({ message: 'user is getted with sucees !', Data: yogi }); })
                .catch(function (err) { res.status(400).json({ err: err }); });
        }); // middleware permettant de récupérer un utilisateur à travers son id
        app.get('/api/session/:id', auth, function (req, res, next) {
            session_model_1.Yoga.find({ idYogi: req.params.id })
                .then(function (data) { return res.status(200).json({ message: 'sessions are getted with succes', Data: data }); })
                .catch(function (err) { return res.status(400).json({ err: err }); });
        }); // middleware permettant de récupérer toutes les séances de relaxation faites par l'utilisateur ayant un id bien défini
        app.post('/api/session', auth, function (req, res, next) {
            var yoga = new session_model_1.Yoga({
                idYogi: req.body.idYogi,
                typeYoga: req.body.typeYoga,
                sousTypeYoga: req.body.sousTypeYoga,
                durationYoga: req.body.durationYoga,
                start: req.body.start,
                end: req.body.end,
                comment: req.body.comment,
                img: req.body.img
            }); // création de l"objet yoga représentant une séance de relaxation soit méditation ou pranayama
            yoga.save()
                .then(function (data) { return res.status(201).json({ message: 'session is added with success!', Data: data }); })
                .catch(function (err) { return res.status(400).json({ err: err }); });
        }); // middleware permettant d'enregistrer une séance dans la base de données
        app.put('/api/session/:id', auth, function (req, res, next) {
            session_model_1.Yoga.update({ _id: req.params.id }, __assign(__assign({}, req.body), { _id: req.params.id }))
                .then(function (data) { return res.status(200).json({ message: 'session is updated with success!', Data: data }); })
                .catch(function (err) { return res.status(400).json(err); });
        }); // middleware permettant de mettre à jour une séance de relaxation à travers son id
        app.listen(this.port, function () {
            console.log("réponse recue !");
        }); // middleware permettant d'écouter le serveur sur un port
    };
    return Application;
}());
exports.Application = Application;
