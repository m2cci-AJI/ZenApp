import { Schema, Model, model } from 'mongoose';

let resettokenSchema: Schema = new Schema({
    _userId: { type: Schema.Types.ObjectId, required: true, ref: 'Yogi' },
    resettoken: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

export const passwordResetToken: Model<any> = model<any>('passwordResetToken', resettokenSchema);
 // modèle utilisé pour enregister, modifer ou supprimer un document associé à un token d'authenfication.