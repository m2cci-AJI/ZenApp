import { Routes } from '@angular/router';
import { timelineRoute } from './timeline/timeline.route';

const CALENDRIER_ROUTES = [timelineRoute];

export const calendrierRoutes: Routes = [
    {
        path: 'calendrier',
        children: CALENDRIER_ROUTES
    }
];
