import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  sensations: string;
  emotions: string;
  pensees: string;
  value: boolean = false;

  constructor(private dialogRef: MatDialogRef<CommentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                if (data !== null) {
                  this.sensations = data.comment.sensations;
                  this.emotions = data.comment.emotions;
                  this.pensees = data.comment.pensees;
                  this.value = data.value;
                }
              }

  ngOnInit() { }

  get changeTitleWindow() {
    if (this.value) {
       return true; // change values
    } else {
      return false; // enter values
    }
  }

  onComment(f) {
      this.sensations = f.value['sensations'];
      this.emotions = f.value['emotions'];
      this.pensees = f.value['pensees'];
      const comment = new Comment(this.sensations, this.emotions, this.pensees);
      this.dialogRef.close({action: 1, data: comment});
  }

  closeModal() {
    this.dialogRef.close();
  }

}
