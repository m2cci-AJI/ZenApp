import { Application } from './app';

let app = new Application(process.env.PORT || 4000);
app.start();