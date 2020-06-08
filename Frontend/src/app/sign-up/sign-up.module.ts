import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { signupRoutes } from './isgn-up.routes';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(signupRoutes)
  ]
})
export class SignUpModule { }
