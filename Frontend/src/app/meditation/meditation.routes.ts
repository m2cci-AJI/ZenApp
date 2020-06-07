import { Routes } from '@angular/router';
import { practiceRoute } from './practice/practice.route';
import { userManualRoute } from './user-manual/user-manual.route';

const MEDITATION_ROUTES = [practiceRoute, userManualRoute];
export const meditationRoutes: Routes = [
{
  path: 'meditation',
  children: MEDITATION_ROUTES
}
];
