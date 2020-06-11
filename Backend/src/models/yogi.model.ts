import { Schema, Model, model } from "mongoose";
let uniqueValidator = require('mongoose-unique-validator');


let yogiSchema: Schema = new Schema({
  name: {type: String, required: true},
  login: {type: String, required: true},
  birthday: {type: String, required: true},
  email: {type: String, required: true, unique:true},
  password: {type: String, required: true},
  ConnectionPerWeek: {type: Number, required: true}
});

yogiSchema.plugin(uniqueValidator);

export const Yogi: Model<any> = model<any>("Yogi", yogiSchema);
 // modèle utilisé pour enregister, modifer ou supprimer un document associé à un client utilisant l'application.