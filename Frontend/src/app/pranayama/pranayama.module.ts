import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuningComponent } from './tuning/tuning.component';
import { UserManualComponent } from './user-manual/user-manual.component';
import { PracticeComponent } from './practice/practice.component';
import { RouterModule } from '@angular/router';
import { paranayamaRoutes } from './pranayama.routes';

@NgModule({
  declarations: [TuningComponent, UserManualComponent, PracticeComponent],
  imports: [
    CommonModule, RouterModule.forChild(paranayamaRoutes)
  ]
})

export class PranayamaModule { }
