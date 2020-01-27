import { Injectable } from '@angular/core';
import { SessionPranayama } from './session.model';
import { Respiration } from './respiration.enum';
import { Musique } from './musique.enum';

@Injectable({
  providedIn: 'root'
})

export class PranayamaService {
  sessionPranyama: SessionPranayama;

  constructor() { }

  setDefaultValues() {
    const typeResp = Respiration['0'];
    const duraSes = 5;
    const duraResp = 5;
    const musique = Musique['0'];
    this.sessionPranyama = new SessionPranayama(typeResp, duraSes, duraResp, musique);
  }

  setTypeRespiration(typeResp: Respiration) {
    this.sessionPranyama.typeRespiration = typeResp;
  }

  setDurationSession(duraSes: number) {
    this.sessionPranyama.durationSession = duraSes;
  }

  setDurationRespiration(duraResp: number) {
    this.sessionPranyama.durationRespiration = duraResp;
  }

  setMusique(musique: Musique) {
    this.sessionPranyama.musique = musique;
  }


}
