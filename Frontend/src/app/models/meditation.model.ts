import { Meditation } from '../meditation.enum';

export class SessionMeditation {
 typeMeditation: Meditation;
 durationSession: number;
 description: string;
 image: string;
 audio: string;

 constructor(typeMed: Meditation, DurSes: number, desc: string, img: string, audio: string) {
    this.typeMeditation = typeMed;
    this.durationSession = DurSes;
    this.description = desc;
    this.image = img;
    this.audio = audio;
 }
}
