import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';
import { WindowCommentComponent } from './window-comment/window-comment.component';
import { WindowTimeComponent } from './window-time/window-time.component';
import { calendrierRoutes } from './calendrier.routes';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VisTimelineDirective } from './timeline/vis-timeline.directive';
import { VisTimelineService } from './timeline/vis-timeline.service';

@NgModule({
  declarations: [TimelineComponent, WindowCommentComponent, WindowTimeComponent, VisTimelineDirective],
  imports: [
    CommonModule,
    RouterModule.forChild(calendrierRoutes),
    FormsModule,
    NgbModule
  ],
  entryComponents: [WindowTimeComponent, WindowCommentComponent],
  providers: [VisTimelineService]
})
export class CalendrierModule { }
