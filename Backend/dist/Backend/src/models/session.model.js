"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var yoga_enum_1 = require("../../../Frontend/src/app/yoga.enum");
var meditation_enum_1 = require("../../../Frontend/src/app/meditation.enum");
var respiration_enum_1 = require("../../../Frontend/src/app/pranayama/respiration.enum");
var SessionSchema = new mongoose_1.Schema({
    idYogi: { type: String, required: true },
    typeYoga: { type: yoga_enum_1.sessionYoga, required: true },
    sousTypeYoga: { type: meditation_enum_1.Meditation || respiration_enum_1.Respiration, required: true },
    durationYoga: { type: Number, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    comment: { type: Object, required: true },
    img: { type: String, required: true }
});
exports.Yoga = mongoose_1.model("Yoga", SessionSchema);
