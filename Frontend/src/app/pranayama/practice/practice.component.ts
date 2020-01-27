import { Component, OnInit, AfterViewInit } from '@angular/core';
import anime from 'animejs/lib/anime.es';
import { Respiration } from '../respiration.enum';
import { Musique } from '../musique.enum';
import { PranayamaService } from '../pranayama.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit, AfterViewInit {
  something: any;
  timer: any;
  minutes: number;
  secondes: number;
  totalSecondes: number;
  durationResp: number;
  respiration: Respiration;
  musique: Musique;

  constructor(private pranayamaService: PranayamaService) {
    if (this.pranayamaService.sessionPranyama) {
      this.initValues();
    } else {
      this.pranayamaService.setDefaultValues();
      this.initValues();
      console.log(this.pranayamaService.sessionPranyama);
    }
  }

  initValues() {
    this.totalSecondes = this.pranayamaService.sessionPranyama.durationSession * 60;
    this.durationResp = this.pranayamaService.sessionPranyama.durationRespiration;
    this.respiration = this.pranayamaService.sessionPranyama.typeRespiration;
    this.musique = this.pranayamaService.sessionPranyama.musique;
  }

  ngAfterViewInit() {
    if (this.respiration === Respiration['1']) {
      const path = anime.path('polygon');
      this.something = anime({
      targets: '.stage',
      translateX: path('x'),
      translateY: path('y'),
      easing: 'linear',
      duration: (this.durationResp * 3) * 1000,
      loop: true
    });
    } else if (this.respiration === Respiration['0']) {
      this.something = anime({
        targets: '.stage',
        translateY: '440px',
        easing: 'linear',
        duration: this.durationResp * 1000,
        loop: true,
        direction: 'alternate'
      });
    } else if (this.respiration === Respiration['2']) {
      const path = anime.path('polygon');
      this.something = anime({
      targets: '.stage',
      translateX: path('x'),
      translateY: path('y'),
      easing: 'linear',
      duration: (this.durationResp * 3) * 1000,
      loop: true
    });
    } else if (this.respiration === Respiration['3']) {
      const path = anime.path('rect');
      this.something = anime({
      targets: '.stage',
      translateX: path('x'),
      translateY: path('y'),
      easing: 'linear',
      duration: (this.durationResp * 4) * 1000,
      loop: true
    });
    }
  }

  ngOnInit() {
    this.start();
  }

  start() {
    this.timer = setInterval(() => {
      if (this.totalSecondes - 1 >= 0) {
      this.minutes = Math.floor(--this.totalSecondes / 60);
      this.secondes = this.totalSecondes - this.minutes * 60;
      if ((this.minutes <= 0) && (this.secondes <= 0)) {
        this.something.pause();
      }
    }
    }, 1000);
  }

  pauseAnimation() {
    this.something.pause();
    clearInterval(this.timer);
  }

  restartAnimation() {
    this.something.play();
    this.start();
  }

  get ChronometreMinutes() {
    if (this.minutes < 10) {
      return '0' + this.minutes;
    } else {
      return this.minutes;
    }
  }

  get ChronometreSecondes() {
    if (this.secondes < 10) {
      return '0' + this.secondes;
    } else {
      return this.secondes;
    }
  }

  get repirationOutput() {
    return this.respiration as any;
  }


}
