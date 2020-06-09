import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { YogiService } from '../services/yogi.service';
import { MustMatch } from '../sign-up/sign-up/must-match.validator';

@Component({
  selector: 'app-response-reset-password',
  templateUrl: './response-reset-password.component.html',
  styleUrls: ['./response-reset-password.component.css']
})
export class ResponseResetPasswordComponent implements OnInit {

  ResponseResetForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  resetToken: null;
  CurrentState: any;
  IsResetFormValid = true;
  constructor(
    private yogiService: YogiService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    this.CurrentState = 'Wait';
    this.route.params.subscribe(params => {
      this.resetToken = params.token;
      this.VerifyToken();
    });
  }

  ngOnInit() {
    this.Init();
  }

  VerifyToken() {
    this.yogiService.ValidPasswordToken({ resettoken: this.resetToken }).subscribe(
      data => {
        this.CurrentState = 'Verified';
      },
      err => {
        this.CurrentState = 'NotVerified';
      }
    );
  }

  Init() {
    this.ResponseResetForm = this.fb.group(
      {
        resettoken: [this.resetToken],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
      }, {
        validator: MustMatch('newPassword', 'confirmPassword')
      }
    );
  }

  ResetPassword(form) {
    if (form.valid) {
      this.IsResetFormValid = true;
      this.yogiService.newPassword(this.ResponseResetForm.value).subscribe(
        data => {
          this.ResponseResetForm.reset();
          this.successMessage = (data as any).message;
          const emailBody = (data as any).email;
          this.yogiService.confirmPassword({email: emailBody}).subscribe(
            () => {
              console.log('email envoyé !');
            },
            (err) => {
              console.log(err);
            }
          );
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['login']);
          }, 3000);
        },
        err => {
          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
      );
    } else { this.IsResetFormValid = false; }
  }

}
