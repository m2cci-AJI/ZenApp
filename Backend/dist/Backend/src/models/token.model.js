"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var resettokenSchema = new mongoose_1.Schema({
    _userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Yogi' },
    resettoken: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});
exports.passwordResetToken = mongoose_1.model('passwordResetToken', resettokenSchema);
