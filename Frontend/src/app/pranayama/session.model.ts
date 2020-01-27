import { Respiration } from './respiration.enum';
import { Musique } from './musique.enum';

export class SessionPranayama {
  typeRespiration: Respiration;
  musique: Musique;
  durationSession: number;
  durationRespiration: number;
  constructor(typeResp: Respiration, duraSes: number, duraResp: number, musique: Musique) {
     this.typeRespiration = typeResp;
     this.durationSession = duraSes;
     this.durationRespiration = duraResp;
     this.musique = musique;
  }

}