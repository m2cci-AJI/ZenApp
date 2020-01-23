import { Routes } from '@angular/router';
import { practiceRoute } from './practice/practice.route';
import { tuningRoute } from './tuning/tuning.route';
import { userManualRoute } from './user-manual/user-manual.route';

const PRANAYAMA_ROUTES = [practiceRoute, tuningRoute, userManualRoute];

export const paranayamaRoutes: Routes = [
    {
        path: 'pranayama',
        children: PRANAYAMA_ROUTES
    }
];
