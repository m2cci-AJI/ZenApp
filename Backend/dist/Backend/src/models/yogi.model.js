"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
var yogiSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    login: { type: String, required: true },
    birthday: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    ConnectionPerWeek: { type: Number, required: true }
});
yogiSchema.plugin(uniqueValidator);
exports.Yogi = mongoose_1.model("Yogi", yogiSchema);
// modèle utilisé pour enregister, modifer ou supprimer un document associé à un client utilisant l'application.
