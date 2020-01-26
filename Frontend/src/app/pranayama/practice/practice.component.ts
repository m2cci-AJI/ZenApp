import { Component, OnInit, AfterViewInit } from '@angular/core';
import anime from 'animejs/lib/anime.es';

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
  totalSecondes: number = 0.25 * 60;
  durationInsp: number = 20;

  constructor() {}

  ngAfterViewInit() {
    this.something = anime({
      targets: '.stage',
      translateY: '415px',
      easing: 'linear',
      duration: this.durationInsp * 1000,
      loop: true,
      direction: 'alternate'
    });
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

}
