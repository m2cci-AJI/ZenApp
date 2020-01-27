import { Routes } from '@angular/router';
import { durationBreathingRoute } from './duration-breathing/duration-breathing.route';
import { durationSessionRoute } from './duration-session/duration-session.route';
import { endTuningRoute } from './end-tuning/end-tuning.route';
import { musiqueTuningRoute } from './musique-tuning/musique-tuning.route';
import { startTuningRoute } from './start-tuning/start-tuning.route';
import { typeRespRoute } from './type-resp/type-resp.route';


const TUNING_ROUTES = [
  durationBreathingRoute,
  durationSessionRoute,
  endTuningRoute,
  musiqueTuningRoute,
  startTuningRoute,
  typeRespRoute
];

export const tuningRoutes: Routes = [
  {
    path: 'tuning',
    children: TUNING_ROUTES
  }
];
