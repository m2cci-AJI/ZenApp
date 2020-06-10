"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
exports.auth = function (req, res, next) {
    var secretKey = 'aagethrud812d8d2dhdydbd5d4d2d';
    try {
        if (req.headers.authorization) {
            var token = req.headers.authorization.split(' ')[1];
            var decodedToken = jwt.verify(token, secretKey);
            var idyogi = decodedToken.id;
            if (req.body.idYogi && req.body.idYogi !== idyogi) {
                throw 'Invalid client ID';
            }
            else {
                next();
            }
        }
    }
    catch (_a) {
        res.status(401).json({ error: new Error('Invalid request!') });
    }
};
module.exports = exports.auth;
