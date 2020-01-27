import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManualComponent } from './user-manual/user-manual.component';
import { PracticeComponent } from './practice/practice.component';
import { RouterModule } from '@angular/router';
import { paranayamaRoutes } from './pranayama.routes';
import { TuningModule } from './tuning/tuning.module';

@NgModule({
  declarations: [UserManualComponent, PracticeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(paranayamaRoutes),
    TuningModule
  ]
})

export class PranayamaModule { }
