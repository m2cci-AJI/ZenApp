import { Component, OnInit } from '@angular/core';
import { MeditationService } from '../../services/meditation.service';
import { CalendrierService } from 'src/app/services/calendrier.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CommentComponent } from 'src/app/comment/comment.component';
import { Yoga } from 'src/app/models/yoga.model';
import { sessionYoga } from 'src/app/yoga.enum';
import { Comment } from 'src/app/models/comment.model';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {
  meditations: any;
  audioObject = new Audio();
  comment: Comment;
  index: number;
  idSession: any = undefined;
  sousTypeYoga: any;
  constructor(private meditationService: MeditationService,
              private calendrierService: CalendrierService,
              public matDialog: MatDialog) { }

  ngOnInit() {
    this.meditations = [];
    this.meditationService.getMeditations();
    this.meditations = this.meditationService.meditations;
  }

  audioEnded(index: number) {
    this.comment = new Comment('', '', '');
    this.index = index;
    this.editComment();
  }

  creationYogaCalendrier() {
    const meditation = this.meditations[this.index];
    const typeYoga = sessionYoga['0'];
    const sousTypeYoga = meditation.typeMeditation;
    const durationYoga = meditation.durationSession;
    const end = new Date();
    const start = this.calendrierService.getStart(end, durationYoga);
    const comment = this.comment;
    const img = meditation.image;
    const idYogi = new JwtHelperService().decodeToken(localStorage.getItem('token')).id;
    const sessionyoga = new Yoga(idYogi, typeYoga, sousTypeYoga, durationYoga, start, end, comment, img);
    if ((this.idSession === undefined) ||  (this.sousTypeYoga !== sousTypeYoga)) {
      this.calendrierService.addItem(sessionyoga).subscribe((data) => {
        console.log('session added with success !, ', data.body);
        this.idSession = ((data.body) as any).Data._id;
        this.sousTypeYoga = sousTypeYoga;
      },
      (err) => {
        console.log('the error is: ', err);
      });
    } else if ((this.idSession !== undefined) && (this.sousTypeYoga === sousTypeYoga)) {
        this.calendrierService.updateItem(sessionyoga, this.idSession).subscribe(() => {
           console.log('session updates with success !');
      },
      (err) => {
           console.log('the error is: ', err);
      });
    }
  }

  endAudio(index: number) {
      if (index === this.index) {
        return true;
      } else {
        return false;
      }
  }

  openModal(dialogConfig: MatDialogConfig) {
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (screen.width <= 600) {
      dialogConfig.width = '99%';
    } else {
      dialogConfig.width = '50%';
    }
    if (this.comment !== undefined) {
      dialogConfig.data = {comment: this.comment, value: true};
    }
  }

  editComment() {
    let dialogRef: MatDialogRef<any>;
    const dialogConfig = new MatDialogConfig();
    this.openModal(dialogConfig);
    dialogRef = this.matDialog.open(CommentComponent, dialogConfig);
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

}
