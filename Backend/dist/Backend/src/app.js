"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Application = /** @class */ (function () {
    function Application(port) {
        this.port = port;
    }
    Application.prototype.start = function () {
        var app = express_1.default();
        app.listen(this.port, function () {
            console.log("réponse recue !");
        });
    };
    return Application;
}());
exports.Application = Application;
