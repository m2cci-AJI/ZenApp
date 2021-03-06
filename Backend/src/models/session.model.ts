import { Schema, Model, model } from "mongoose";
import { sessionYoga } from '../../../Frontend/src/app/yoga.enum';

let SessionSchema: Schema = new Schema({
    idYogi: {type: String, required: true},
    typeYoga: { type: sessionYoga, required: true },
    sousTypeYoga: { type: String, required: true },
    durationYoga: { type: Number, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    comment: { type: Object, required: true },
    img: { type: String, required: true }
});

export const Yoga: Model<any> = model<any>("Yoga", SessionSchema);
 // modèle utilisé pour enregister, modifer ou supprimer un document associé à une séance de relaxation (méditation ou pranayama).