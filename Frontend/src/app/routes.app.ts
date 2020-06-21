import { paranayamaRoutes } from './pranayama/pranayama.routes';
import { homeRoute } from './home/home.route';
import { meditationRoutes } from './meditation/meditation.routes';
import { calendrierRoutes } from './calendrier/calendrier.routes';
import { statisticsRoutes } from './statistics/statistics.routes';
import { signupRoutes } from './sign-up/sign-up.routes';
import { loginRoutes } from './login/login.routes';
import { requestresetpasswordRoute } from './request-reset-password/request-reset-password.route';
import { responseresetpasswordRoute } from './response-reset-password/response-reset-password.route';
import { Routes } from '@angular/router';

export const routes: Routes = [
    requestresetpasswordRoute,
    responseresetpasswordRoute,
    homeRoute,
    {path: '', redirectTo: 'home' , pathMatch: 'full'},
    ...paranayamaRoutes,
    ...meditationRoutes,
    ...calendrierRoutes,
    ...statisticsRoutes,
    ...signupRoutes,
    ...loginRoutes
  ];
