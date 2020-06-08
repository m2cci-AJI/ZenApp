import { Injectable } from '@angular/core';
import { Meditation } from '../meditation.enum';
import { SessionMeditation } from '../models/meditation.model';

@Injectable({
  providedIn: 'root'
})

export class MeditationService {
  meditations: any;
  durations = [11, 9, 30, 18, 20, 13, 14, 15, 20];
  images = [
    'meditation_sons.png',
    'meditation_emotions.jpg',
    'meditation_sensations.jpg',
    'meditation_active.png',
    'meditation_vipassana.jpg',
    'meditation_compassion.jpg',
    'meditation_assise.jpg',
    'meditation_souffle.jpg',
    'body_scan.jpg'];
  audios = [
    'meditation_sons.mp3',
    'meditation_emotions.mp3',
    'meditation_sensations.mp3',
    'meditation_active.mp3',
    'meditation_vipassana.mp3',
    'meditation_compassion.mp3',
    'meditation_assise.mp3',
    'meditation_souffle.mp3',
    'body_scan.mp3'
  ];
  descriptions = [
    'http://yoga-meditation.tv/mediter-sur-les-sons/',
    'https://www.franceinter.fr/emissions/le-temps-de-mediter/le-temps-de-mediter-10-aout-2019',
    'https://www.culturedesoi.fr/768-meditation-ressenti-corporel/',
    'https://www.lautohypnose.fr/guide-auto-hypnose-gratuit/auto-hypnose-mode-emploi/',
    'http://www.maison-emmanuel.fr/pages/Meditation_sans_objet-8817224.html',
    'https://www.mediter-pour-etre-heureux.com/pratiquer-la-compassion/',
    'https://villagedespruniers.net/httpfr-villagedespruniers-pratiquesdepleineconscience/la-meditation-assise/',
    'https://www.pleineconscience-france.com/meditation-assise-sur-le-souffle-en-pleine-conscience/',
    'https://www.pleineconscience-france.com/le-balayage-corporel-en-pleine-conscience/'
  ];

  constructor() { }

  getMeditations() {
    this.meditations = [];
    for (let i = 0; i < 9; i++) {
      const meditation1 = new SessionMeditation(
        Meditation[i.toString()],
        this.durations[i],
        this.descriptions[i],
        this.images[i],
        this.audios[i]
      );
      this.meditations.push(meditation1);
    }
  }

}
