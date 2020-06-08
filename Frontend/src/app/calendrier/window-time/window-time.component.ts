import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-window-time',
  templateUrl: './window-time.component.html',
  styleUrls: ['./window-time.component.css']
})
export class WindowTimeComponent implements OnInit {
  dateStart: Date;
  dateEnd: Date;

  constructor(private dialogRef: MatDialogRef<WindowTimeComponent>) { }

  ngOnInit() {
  }

  onWindow(f) {
    this.dateStart = f.value['dp3'];
    this.dateEnd = f.value['dp4'];
    this.dialogRef.close({action: 1, data: {start: this.dateStart, end: this.dateEnd}});
  }

  closeModal() {
    this.dialogRef.close();
  }

  CompareDates(dateStart: any, dateEnd: any) {
    return (dateStart > dateEnd);
  }

}
