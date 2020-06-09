import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Yogi } from 'src/app/models/yogi.model';
import { YogiService } from 'src/app/services/yogi.service';
import { Router } from '@angular/router';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  contactForm: FormGroup;
  messageError: string;
  constructor(private formBuilder: FormBuilder,
              private yogiService: YogiService,
              private router: Router) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      login: ['', Validators.required],
      birthday: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      MPasse: ['', [Validators.required, Validators.minLength(8)]],
      CMPasse: ['', [Validators.required, Validators.minLength(8)]]
    }, {
      validator: MustMatch('MPasse', 'CMPasse')
    });
  }

  onSubmit() {
    const name = this.contactForm.value.name;
    const login = this.contactForm.value.login;
    const birthday = this.contactForm.value.birthday;
    const email = this.contactForm.value.email;
    const password = this.contactForm.value.MPasse;
    const ConnectionPerWeek = 0;
    const yogi = new Yogi(name, login, birthday, email, password, ConnectionPerWeek);
    this.yogiService.addYogi(yogi).subscribe(
      ( ) => {
        this.router.navigateByUrl('/login');
      },
      (err) => {
        console.log(err);
        this.messageError = err.error.message;
      }
    );
  }

  onGoBack() {
    this.contactForm.reset();
    this.messageError = null;
  }

  validForm() {
    return this.contactForm.status === 'INVALID';
  }


}
