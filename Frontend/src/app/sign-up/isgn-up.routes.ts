import { Routes } from '@angular/router';
import { signupRoute } from './sign-up/sign-up.route';

const SIGNUP_ROUTES = [signupRoute];

export const signupRoutes: Routes = [
    {
        path: 'signup',
        children: SIGNUP_ROUTES
    }
];
