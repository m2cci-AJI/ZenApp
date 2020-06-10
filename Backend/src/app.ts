
import express, { Request, Response } from 'express';
import mongoose = require("mongoose");

export class Application {

    constructor(private port: any) { }

    start() {
        const app = express();
        const MONGODB_CONNECTION: string = 'mongodb://127.0.0.1:27017';
        mongoose.connect(MONGODB_CONNECTION,
            {
                useNewUrlParser: true
            });
        const db = mongoose.connection;
        console.log('oppps');
        db.once('open', _ => {
            console.log('Database connected:', MONGODB_CONNECTION)
        });
        db.on('error', err => {
            console.error('connection error:', err)
        });
        app.listen(this.port, () => {
            console.log("réponse recue !");
        });
    }
}