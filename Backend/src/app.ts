
import express, { Request, Response } from 'express';

export class Application {

    constructor(private port: any) { }

    start() {
        const app = express();
        app.listen(this.port, () => {
            console.log("réponse recue !");
        });
    }
}