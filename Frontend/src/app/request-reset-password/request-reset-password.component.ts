import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { YogiService } from '../services/yogi.service';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.css']
})
export class RequestResetPasswordComponent implements OnInit {
  RequestResetForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  IsvalidForm = true;

  constructor(
    private yogiService: YogiService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.RequestResetForm = new FormGroup({
      email: new FormControl(
        null,
        [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])
    });
  }

  RequestResetUser(form) {
    if (form.valid) {
      this.IsvalidForm = true;
      this.yogiService.requestReset(this.RequestResetForm.value).subscribe(
        (data) => {
          this.RequestResetForm.reset();
          this.errorMessage = null;
          this.successMessage = 'Le lien du votre nouveau mot de passe a été envoyé à votre adresse email avec succès.';
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['login']);
          }, 3000);
        },
        (error) => {
          if (error.message) {
            this.errorMessage = error.error.message;
          }
        }
      );
    } else {
      this.IsvalidForm = false;
    }
  }
}
