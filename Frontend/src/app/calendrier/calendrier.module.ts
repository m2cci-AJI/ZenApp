import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';
import { WindowCommentComponent } from './window-comment/window-comment.component';
import { WindowTimeComponent } from './window-time/window-time.component';



@NgModule({
  declarations: [TimelineComponent, WindowCommentComponent, WindowTimeComponent],
  imports: [
    CommonModule
  ]
})
export class CalendrierModule { }
