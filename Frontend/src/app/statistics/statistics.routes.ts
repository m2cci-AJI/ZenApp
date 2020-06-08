import { Routes } from '@angular/router';
import { statisticsRoute } from './statistics/statistics.route';

const STATISTICS_ROUTES = [statisticsRoute];

export const statisticsRoutes: Routes = [
    {
        path: 'statistics',
        children: STATISTICS_ROUTES
    }
];
