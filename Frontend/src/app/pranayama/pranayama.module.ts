import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuningComponent } from './tuning/tuning.component';
import { UserManualComponent } from './user-manual/user-manual.component';
import { PracticeComponent } from './practice/practice.component';
import { RouterModule } from '@angular/router';
import { paranayamaRoutes } from './pranayama.routes';
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  declarations: [TuningComponent, UserManualComponent, PracticeComponent],
  imports: [
    CommonModule, RouterModule.forChild(paranayamaRoutes), Ng5SliderModule
  ]
})

export class PranayamaModule { }
