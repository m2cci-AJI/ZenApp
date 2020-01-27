import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartTuningComponent } from './start-tuning/start-tuning.component';
import { TypeRespComponent } from './type-resp/type-resp.component';
import { DurationSessionComponent } from './duration-session/duration-session.component';
import { DurationBreathingComponent } from './duration-breathing/duration-breathing.component';
import { EndTuningComponent } from './end-tuning/end-tuning.component';
import { MusiqueTuningComponent } from './musique-tuning/musique-tuning.component';
import { RouterModule } from '@angular/router';
import { tuningRoutes } from './tuning.routes';
import { Ng5SliderModule } from 'ng5-slider';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StartTuningComponent,
    TypeRespComponent,
    DurationSessionComponent,
    DurationBreathingComponent,
    EndTuningComponent,
    MusiqueTuningComponent],
  imports: [
    CommonModule,
     RouterModule.forChild(tuningRoutes),
     Ng5SliderModule,
     FormsModule
  ]
})

export class TuningModule { }
