import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendrierService } from 'src/app/services/calendrier.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-window-comment',
  templateUrl: './window-comment.component.html',
  styleUrls: ['./window-comment.component.css']
})
export class WindowCommentComponent implements OnInit {
  sensations: string;
  emotions: string;
  pensees: string;

  constructor(private dialogRef: MatDialogRef<WindowCommentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private calendrierService: CalendrierService) {
                const idyogi = new JwtHelperService().decodeToken(localStorage.getItem('token')).id;
                this.calendrierService.getItems(idyogi).subscribe((outputs) => {
                   const sessionsYoga = ((outputs.body)as any).Data;
                   const sessionYoga = sessionsYoga[data.item - 1];
                   this.sensations = sessionYoga.comment.sensations;
                   this.emotions = sessionYoga.comment.emotions;
                   this.pensees = sessionYoga.comment.pensees;
                }, (err) => {
                    console.log('the error is: ', err);
                });

  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
