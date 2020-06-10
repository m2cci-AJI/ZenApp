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
var express_1 = __importDefault(require("express"));
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var cors_1 = __importDefault(require("cors"));
var yogi_model_1 = require("./models/yogi.model");
var bcrypt = require('bcryptjs');
var jsonwebtoken = require("jsonwebtoken");
var token_model_1 = require("./models/token.model");
var nodemailer_1 = __importDefault(require("nodemailer"));
var crypto_1 = __importDefault(require("crypto"));
var auth = require('./middleware');
var session_model_1 = require("./models/session.model");
var Application = /** @class */ (function () {
    function Application(port) {
        this.port = port;
    }
    Application.prototype.start = function () {
        var app = express_1.default();
        var MONGODB_CONNECTION = 'mongodb://127.0.0.1:27017';
        app.use(cors_1.default());
        app.options('*', cors_1.default());
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ limit: '10mb', extended: true }));
        var SECRET_KEY = 'aagethrud812d8d2dhdydbd5d4d2d';
        mongoose.connect(MONGODB_CONNECTION, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        var db = mongoose.connection;
        db.once('open', function (_) {
            console.log('Database connected:', MONGODB_CONNECTION);
        });
        db.on('error', function (err) {
            console.error('connection error:', err);
        });
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
                })
                    .catch(function (err) { res.status(500).json({ message: 'Cette erreur vient du serveur ! Veuillez re-connecter ultérieurement.', error: err }); });
            });
        });
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
                }
            })
                .catch(function () { });
        });
        app.post('/api/valid-password-token', function (req, res, next) {
            if (!req.body.resettoken) {
                return res.status(500).json({ message: 'Token est obligatoire !' });
            }
            token_model_1.passwordResetToken.findOne({ resettoken: req.body.resettoken })
                .then(function (token) {
                if (!token) {
                    return res.status(409).json({ message: 'L\'URL est non validé' });
                }
                yogi_model_1.Yogi.findByIdAndUpdate({ _id: token._userId }, {}) // revised
                    .then(function () {
                    res.status(200).json({ message: 'Token a été vérifié avec succès.' });
                })
                    .catch(function (err) { res.status(500).send({ msg: err.message }); });
            })
                .catch(function (error) { return res.status(500).json(error); });
        });
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
                    });
                    var mailOptions = {
                        to: yogi.email,
                        from: 'jemaienit@gmail.com',
                        subject: 'Changement de mot de passe de votre compte',
                        html: '<h1>Changement du mot de passe de votre compte<h1><h4>Bonjour ' + yogi.name + ',</h4><p>Nous avons reçu une demande de ré-initialisation de votre mot de passe. (Si vous n\'avez pas émis cette demande, veuillez ignorer cet email.)</p><h4>Pour ré-initialiser votre mot de passe, cliquez sur le lien ci-dessous.</h4><a href = "http://localhost:4200/response-reset-password/' + resettoken.resettoken + '">Modifiez votre mot de passe</a><p>Une fois votre mot de passe modifié, nous vous recommandons de le conserver de manière sécurisée. Ne communiquez pas votre mot de passe et ne répondez jamais à un email sollicitant vos codes d\'accès.</p><p>Cordialement.</p>'
                    };
                    transporter.sendMail(mailOptions, function (err, info) {
                        console.log(err || info);
                    });
                    res.status(200).json({ message: 'L\'email est envoyé avec succès !' });
                })
                    .catch(function (error) { return res.status(500).send({ msg: error.message }); });
            })
                .catch(function (err) { res.status(500).json(err); });
        });
        app.put('/api/login/:id', function (req, res, next) {
            yogi_model_1.Yogi.update({ _id: req.params.id }, __assign(__assign({}, req.body), { _id: req.params.id }))
                .then(function (data) { return res.status(200).json({ message: 'user is updated with success!', Data: data }); })
                .catch(function (err) { return res.status(400).json(err); });
        });
        app.get('/api/signup', function (req, res, next) {
            yogi_model_1.Yogi.find()
                .then(function (yogis) { res.status(200).json({ message: 'users are getted with sucees !', Data: yogis }); })
                .catch(function (err) { res.status(400).json({ err: err }); });
        });
        app.get('/api/signup/:id', function (req, res, next) {
            yogi_model_1.Yogi.find({ _id: req.params.id })
                .then(function (yogi) { res.status(200).json({ message: 'user is getted with sucees !', Data: yogi }); })
                .catch(function (err) { res.status(400).json({ err: err }); });
        });
        app.get('/api/session/:id', auth, function (req, res, next) {
            session_model_1.Yoga.find({ idYogi: req.params.id })
                .then(function (data) { return res.status(200).json({ message: 'sessions are getted with succes', Data: data }); })
                .catch(function (err) { return res.status(400).json({ err: err }); });
        });
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
            });
            yoga.save()
                .then(function (data) { return res.status(201).json({ message: 'session is added with success!', Data: data }); })
                .catch(function (err) { return res.status(400).json({ err: err }); });
        });
        app.put('/api/session/:id', auth, function (req, res, next) {
            session_model_1.Yoga.update({ _id: req.params.id }, __assign(__assign({}, req.body), { _id: req.params.id }))
                .then(function (data) { return res.status(200).json({ message: 'session is updated with success!', Data: data }); })
                .catch(function (err) { return res.status(400).json(err); });
        });
        app.listen(this.port, function () {
            console.log("réponse recue !");
        });
    };
    return Application;
}());
exports.Application = Application;
