import { ResponseResetPasswordComponent } from './response-reset-password.component';
import { Route } from '@angular/router';

export const responseresetpasswordRoute: Route = {
    path: 'response-reset-password/:token',
    component: ResponseResetPasswordComponent
};
