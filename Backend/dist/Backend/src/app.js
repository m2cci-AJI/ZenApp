"use strict";
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
            useNewUrlParser: true
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
        app.listen(this.port, function () {
            console.log("réponse recue !");
        });
    };
    return Application;
}());
exports.Application = Application;
