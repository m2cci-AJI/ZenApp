"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../src/app");
var mongoose = require("mongoose");
var supertest = require('supertest');
var request = supertest;
describe('app', function () {
    var app;
    beforeEach(function (done) {
        app = new app_1.Application(process.env.PORT || 4000);
        app.start();
        app.use(function (req, res, next) {
            req.name = 'ahmed';
            req.login = 'jemaiAH';
            req.birthday = '03/11/1985';
            req.email = 'ahmed.jemai@hotmail.com';
            req.password = 'AHm08718127',
                req.ConnectionPerWeek = 3;
            next();
        });
        done();
    });
    afterEach(function (done) {
        mongoose.disconnect(done());
    });
    it("GET /api/signup", function (done) {
        var yogis = [];
        request(app).get('/api/signup').expect(200, done);
    });
});
