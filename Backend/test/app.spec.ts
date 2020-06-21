import { Application } from '../src/app';
import mongoose = require("mongoose"); 
let supertest = require('supertest');
let request = supertest;
describe('app', () => {
    let app: any;
    
    beforeEach((done) => {
        app = new Application(process.env.PORT || 4000);
        app.start();
        app.use((req: any, res: any, next: any) => {
            req.name = 'ahmed';
            req.login = 'jemaiAH';
            req.birthday = '03/11/1985';
            req.email = 'ahmed.jemai@hotmail.com';
            req.password = 'AHm08718127',
            req.ConnectionPerWeek = 3;
            next()
          });
          done();
    });

    afterEach((done:any) => {
        mongoose.disconnect(done());
    });

    it("GET /api/signup", (done) => {
        let yogis = [];
        request(app).get('/api/signup').expect(200, done);
    });
});