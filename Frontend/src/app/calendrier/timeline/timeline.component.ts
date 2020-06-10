import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TimelineOptions, DataSet, Timeline } from 'vis';
import { ItemCalendrier } from '../../models/item.model';
import { CalendrierService } from 'src/app/services/calendrier.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { WindowTimeComponent } from '../window-time/window-time.component';
import { WindowCommentComponent } from '../window-comment/window-comment.component';
import { Yoga } from 'src/app/models/yoga.model';
import { sessionYoga } from 'src/app/yoga.enum';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})

export class TimelineComponent implements OnInit, AfterViewInit {

  @ViewChild('VisTimeLine', {static: false}) VisTimeLine: ElementRef;
  public item: number = undefined;
  public timeline: Timeline;

  constructor(private matDialog: MatDialog,
              private calendrierService: CalendrierService) { }

  ngOnInit() {
    this.createItems();
  }

  ngAfterViewInit(): void {
  }

  setCommentWindow() {
    const dialogConfig = new MatDialogConfig();
    this.openModal(dialogConfig);
    const dialogRef = this.matDialog.open(WindowCommentComponent, dialogConfig);
  }

  getItem(yoga: Yoga, i: number): ItemCalendrier {
    const id = i;
    const content = '<div class = "float-left"><img src = "../assets/img/'
      + yoga.img
      + '" width = "110px" height = "110px"></div><div class = "float-right"> <p class = "type">'
      + yoga.typeYoga
      + '</p> <p class = "sous-type">'
      + yoga.sousTypeYoga
      + '</p> <p class = "duration float-right">'
      + yoga.durationYoga
      + ' min </p> </div>';
    const start = yoga.start;
    const end = yoga.end;
    const editable = false;
    let className: string;
    if (yoga.typeYoga === sessionYoga['0']) {
      className = 'red';
    } else {
      className = 'green';
    }
    return new ItemCalendrier(id, content, start, end, editable, className);
  }

  createItems(): any {
      const idyogi = new JwtHelperService().decodeToken(localStorage.getItem('token')).id;
      this.calendrierService.getItems(idyogi).subscribe((data) => {
        const sessionsYoga = ((data.body) as any).Data;
        const items = [];
        for (let i = 0; i < sessionsYoga.length; i++) {
          const item = this.getItem(sessionsYoga[i], i + 1);
          items.push(item);
        }
        const options: TimelineOptions = {
          stack: true,
          verticalScroll: true
        };
        const Items: any = new DataSet(items);
        const container = this.VisTimeLine.nativeElement;
        this.timeline = new Timeline(container as any, Items, options);
        this.timeline.on('doubleClick',
         (event) => {
           if (event.what === 'item') {
              this.item = event.item;
              this.setCommentWindow();
            }
        });
      },
      (err) => {
          console.log('the error is: ', err);
      });
  }

  centrer() {
    this.timeline.moveTo(this.timeline.getCurrentTime());
  }

  ajuster() {
    this.timeline.fit();
  }

  changeFormatDate(date: any) {
    const year = date.year;
    const month = date.month;
    const day = date.day;
    return new Date(year + '-' + month + '-' + day);
  }

  openModal(dialogConfig: MatDialogConfig) {
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (screen.width <= 600) {
      dialogConfig.width = '99%';
    } else {
      dialogConfig.width = '50%';
    }
    if (this.item !== undefined) {
      dialogConfig.data = {item: this.item};
      this.item = undefined;
    }
  }

  setWindow() {
    const dialogConfig = new MatDialogConfig();
    this.openModal(dialogConfig);
    const dialogRef = this.matDialog.open(WindowTimeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          if (data.action === 1) {
            this.timeline.setWindow(
              this.changeFormatDate(data.data.start),
              this.changeFormatDate(data.data.end)
            );
          }
        }
      }
    );
  }
}
