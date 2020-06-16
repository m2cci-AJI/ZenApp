import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import anime from 'animejs/lib/anime.es';
import { Respiration } from '../respiration.enum';
import { Musique } from '../musique.enum';
import { PranayamaService } from '../../services/pranayama.service';
import { Observable } from 'rxjs';
import { sessionYoga } from 'src/app/yoga.enum';
import { Yoga } from 'src/app/models/yoga.model';
import { CalendrierService } from 'src/app/services/calendrier.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Comment } from '../../models/comment.model';
import { CommentComponent } from 'src/app/comment/comment.component';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit, AfterViewInit, OnDestroy {
  disabledPlay: boolean = true;
  something: any;
  timer: any;
  timerAudio: any;
  timerImpact: any;
  minutes: number;
  secondes: number;
  totalSecondes: number;
  durationResp: number;
  respiration: Respiration;
  musique: Musique;
  audioObject = new Audio();
  comment: Comment = new Comment('', '', '');
  endTime: boolean = false;
  idSession: any = undefined;
  tableImpacts: number[];

  constructor(private pranayamaService: PranayamaService,
              private calendrierService: CalendrierService,
              private matDialog: MatDialog) {
    if (this.pranayamaService.sessionPranyama) {
      this.initValues();
      this.pranayamaService.sessionPranyama = undefined;
    } else {
      this.pranayamaService.setDefaultValues();
      this.initValues();
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
        targets: '.ball-calm',
        translateX: path('x'),
        translateY: path('y'),
        easing: 'linear',
        duration: (this.durationResp * 3) * 1000,
        loop: true
      });
    } else if (this.respiration === Respiration['0']) {
      const path = anime.path('#polygon-coh');
      this.something = anime({
        targets: '.ball-coh',
        translateX: path('x'),
        translateY: path('y'),
        easing: 'linear',
        duration: this.durationResp * 1000 * 2,
        loop: true
      });
    } else if (this.respiration === Respiration['2']) {
      const path = anime.path('polygon');
      this.something = anime({
        targets: '.ball-dyn',
        translateX: path('x'),
        translateY: path('y'),
        easing: 'linear',
        duration: (this.durationResp * 3) * 1000,
        loop: true
      });
    } else if (this.respiration === Respiration['3']) {
      const path = anime.path('rect');
      this.something = anime({
        targets: '.ball-carre',
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
    this.startAudio();
    this.tableImpacts = this.detectImpact();
  }

  createAudio(audio: string) {
    new Observable(() => {
      this.audioObject.src = '../../../assets/audio/' + audio;
      this.audioObject.load();
    }).subscribe(() => {
      console.log(this.minutes);
    }, err => {
      console.log(err);
    });
  }

  startAudio() {
    if (this.musique === Musique['2']) {
      this.createAudio('musique_relaxante.mp3');
      this.audioObject.play();
    } else if (this.musique === Musique['1']) {
      this.startAudioIntervall();
    }
  }

  startAudioIntervall() {
    this.timerAudio = setInterval(() => {
      this.createAudio('son_bol.mp3');
      this.audioObject.play();
      setTimeout(() => {
        this.audioObject.pause();
      }, 1000);
    }, this.durationResp * 1000);
  }

  start() {
    this.timer = setInterval(() => {
      if (this.totalSecondes - 1 >= 0) {
        this.minutes = Math.floor(--this.totalSecondes / 60);
        this.secondes = this.totalSecondes - this.minutes * 60;
        if ((this.minutes <= 0) && (this.secondes <= 0)) {
          this.something.pause();
          this.editComment();
          this.endTime = true;
        }
      }
    }, 1000);
  }

  detectImpact(): number[] {
    let time = this.totalSecondes;
    const tabImpact: number[] = [];
    while (time > 0) {
      tabImpact.push(time);
      time = time - this.durationResp;
    }
    return tabImpact;
  }

  creationYogaCalendrier() {
    const typeYoga = sessionYoga['1'];
    const sousTypeYoga = this.respiration;
    const durationYoga = this.totalSecondes / 60;
    const end = new Date();
    const start = this.calendrierService.getStart(end, durationYoga);
    const comment = this.comment;
    const img = 'respiration_pranayama.jpg';
    const idYogi = new JwtHelperService().decodeToken(localStorage.getItem('token')).id;
    const sessionyoga = new Yoga(idYogi, typeYoga, sousTypeYoga, durationYoga, start, end, comment, img);
    if (this.idSession === undefined) {
      this.calendrierService.addItem(sessionyoga).subscribe((data) => {
        console.log('session added with success !, ', data.body);
        this.idSession = ((data.body) as any).Data._id;
      },
        (err) => {
          console.log('the error is: ', err);
        });
    } else {
      this.calendrierService.updateItem(sessionyoga, this.idSession).subscribe(() => {
        console.log('session updates with success !');
      },
        (err) => {
          console.log('the error is: ', err);
        });
    }
  }

  pauseAnimation() {
    this.disabledPlay = false;
    this.something.pause();
    clearInterval(this.timer);
    if (this.musique === Musique['1']) {
      clearInterval(this.timerAudio);
    } else if (this.musique === Musique['2']) {
      this.audioObject.pause();
    }
  }

  restartAnimation() {
    this.disabledPlay = true;
    this.something.play();
    this.start();
    if (this.musique === Musique['1']) {
      const timeBeforeImpact: number = this.calculateTimeBeforeImpact(this.totalSecondes);
      setTimeout(() => {
        this.createAudio('son_bol.mp3');
        this.audioObject.play();
        setTimeout(() => {
          this.audioObject.pause();
        }, 1000);
        this.startAudioIntervall();
      }, timeBeforeImpact * 1000);
    } else if (this.musique === Musique['2']) {
      this.audioObject.play();
    }
  }

  calculateTimeBeforeImpact(time: number): number {
    return this.totalSecondes - this.calculateTimeNextImpact(time);
  }

  calculateTimeNextImpact(time: number): number {
    for (let i = 0; i < this.tableImpacts.length; i++) {
      if (time > this.tableImpacts[i]) {
        return this.tableImpacts[i];
      }
    }
  }

  get repirationOutput(): any {
    return this.respiration as any;
  }

  openModal(dialogConfig: MatDialogConfig) {
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    if (this.comment !== undefined) {
      dialogConfig.data = { comment: this.comment, value: true };
    }
  }

  editComment() {
    const dialogConfig = new MatDialogConfig();
    this.openModal(dialogConfig);
    const dialogRef = this.matDialog.open(CommentComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          if (data.action === 1) {
            this.comment = data.data;
            this.creationYogaCalendrier();
          }
        }
      }
    );
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timerAudio);
    this.audioObject.pause();
  }

}
