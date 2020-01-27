import { Routes } from '@angular/router';
import { practiceRoute } from './practice/practice.route';
import { userManualRoute } from './user-manual/user-manual.route';
import { tuningRoutes } from './tuning/tuning.routes';

const PRANAYAMA_ROUTES = [practiceRoute, ...tuningRoutes, userManualRoute];

export const paranayamaRoutes: Routes = [
    {
        path: 'pranayama',
        children: PRANAYAMA_ROUTES
    }
];
