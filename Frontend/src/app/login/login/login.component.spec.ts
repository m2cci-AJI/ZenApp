import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { YogiService } from 'src/app/services/yogi.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Observable } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitEl: DebugElement;
  let serviceYogi: YogiService;
  let serviceAuth: AuthentificationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [YogiService, AuthentificationService],
      imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    serviceYogi = TestBed.get(YogiService);
    serviceAuth = TestBed.get(AuthentificationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    submitEl = fixture.debugElement.query(By.css('button[type=submit]'));
  }));

  it('is add login component defined', () => {
    expect(component).toBeDefined();
  });

  it('should verify if the onSubmit method wil be applied when user clicks on button type submit', () => {
    component.ngOnInit();
    submitEl.nativeElement.disabled = false;
    spyOn(component, 'onSubmit');
    submitEl.nativeElement.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should verify if the form ca be validated if all conditions are satisfied', () => {
    const loginEl = component.contactForm.controls["login"];
    const emailEl = component.contactForm.controls["email"];
    const passwordEl = component.contactForm.controls["MPasse"];
    emailEl.setValue('jemaienit@hotmail.fr');
    loginEl.setValue('jemZE');
    passwordEl.setValue('ararafsdhdbbd');
    expect(component.contactForm.valid).toBeTruthy();
    expect(component.contactForm.value.email).toEqual('jemaienit@hotmail.fr');
    expect(component.contactForm.value.login).toEqual('jemZE');
    expect(component.contactForm.value.MPasse).toEqual('ararafsdhdbbd');
  });

  it('should verify if the form controls are invalid if the condition are not satisfied', () => {
    const loginEl = component.contactForm.controls["login"];
    const emailEl = component.contactForm.controls["email"];
    const passwordEl = component.contactForm.controls["MPasse"];
    emailEl.setValue('jemaienit');
    loginEl.setValue('');
    passwordEl.setValue('ara');
    expect(component.contactForm.invalid).toBeTruthy();
    expect(component.contactForm.controls["email"].valid).toBeFalsy();
    expect(component.contactForm.controls["login"].valid).toBeFalsy();
    expect(component.contactForm.controls["MPasse"].valid).toBeFalsy();
  });

  it('should call connection method of yogiService', () => {
      spyOn(serviceYogi, 'connection').and.callThrough();
      component.onSubmit();
      expect(serviceYogi.connection).toHaveBeenCalledTimes(1);
  });

});
