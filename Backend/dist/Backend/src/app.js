"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose = require("mongoose");
var Application = /** @class */ (function () {
    function Application(port) {
        this.port = port;
    }
    Application.prototype.start = function () {
        var app = express_1.default();
        var MONGODB_CONNECTION = 'mongodb://127.0.0.1:27017';
        mongoose.connect(MONGODB_CONNECTION, {
            useNewUrlParser: true
        });
        var db = mongoose.connection;
        console.log('oppps');
        db.once('open', function (_) {
            console.log('Database connected:', MONGODB_CONNECTION);
        });
        db.on('error', function (err) {
            console.error('connection error:', err);
        });
        app.listen(this.port, function () {
            console.log("réponse recue !");
        });
    };
    return Application;
}());
exports.Application = Application;
