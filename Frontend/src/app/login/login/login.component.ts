import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { YogiService } from 'src/app/services/yogi.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Yogi } from 'src/app/models/yogi.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  contactForm: FormGroup;
  messageError: string;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private yogiService: YogiService,
              private authentificationService: AuthentificationService) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      login: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      MPasse: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    const Email = this.contactForm.value.email;
    const Password = this.contactForm.value.MPasse;
    this.yogiService.connection({ email: Email, password: Password }).subscribe(
      (data) => {
        const id = ((data.body) as any).id;
        this.authentificationService.saveToken(data.body['token']);
        this.router.navigateByUrl('/home');
        this.yogiService.getOneYogi(id).subscribe((Oneyogi) => {
          const dataYogi = ((Oneyogi.body) as any).Data[0];
          const ConnectionPerWeek = dataYogi.ConnectionPerWeek + 1;
          const birthday = dataYogi.birthday;
          const email = dataYogi.email;
          const login = dataYogi.login;
          const name = dataYogi.name;
          const password = dataYogi.password;
          const yogi = new Yogi(name, login, birthday, email, password, ConnectionPerWeek);

          this.yogiService.setYogi(yogi, id).subscribe((datayogi) => {
            console.log(((datayogi.body) as any).Data);
          },
            (err) => {
              console.log(err);
            });
        },
          (err) => {
            console.log(err);
          });
      },
      (err) => {
        console.log(err);
        this.messageError = err.error.message;
      }
    );
  }

  validForm() {
    return this.contactForm.status === 'INVALID';
  }

  onGoBack() {
    this.contactForm.reset();
    this.messageError = null;
    this.submitted = false;
  }
}
