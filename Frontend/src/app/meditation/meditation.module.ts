import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PracticeComponent } from './practice/practice.component';
import { UserManualComponent } from './user-manual/user-manual.component';
import { RouterModule } from '@angular/router';
import { meditationRoutes } from './meditation.routes';

@NgModule({
  declarations: [PracticeComponent, UserManualComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(meditationRoutes)
  ]
})
export class MeditationModule { }
