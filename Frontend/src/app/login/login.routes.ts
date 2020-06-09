import { Routes } from '@angular/router';
import { loginRoute } from './login/login.route';

const LOGIN_ROUTES = [loginRoute];

export const loginRoutes: Routes = [
    {
        path: 'login',
        children: LOGIN_ROUTES
    }
];
