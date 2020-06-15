import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { DebugElement } from '@angular/core';
import { YogiService } from 'src/app/services/yogi.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let submitEl: DebugElement;
  let serviceYogi: YogiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      providers: [YogiService ],
      imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    serviceYogi = TestBed.get(YogiService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    submitEl = fixture.debugElement.query(By.css('button[type=submit]'));
  }));

  it('is add signup component defined', () => {
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
    const nameEl = component.contactForm.controls["name"];
    const loginEl = component.contactForm.controls["login"];
    const emailEl = component.contactForm.controls["email"];
    const birthdayEl = component.contactForm.controls["birthday"];
    const CMPasseEl = component.contactForm.controls["CMPasse"];
    const passwordEl = component.contactForm.controls["MPasse"];
    nameEl.setValue('araraf');
    emailEl.setValue('jemaienit@hotmail.fr');
    loginEl.setValue('jemZE');
    passwordEl.setValue('ararafsdhdbbd');
    CMPasseEl.setValue('ararafsdhdbbd');
    birthdayEl.setValue('11/11/1986');
    const res = component.validForm();
    expect(component.contactForm.valid).toBeTruthy();
    expect(component.contactForm.value.email).toEqual('jemaienit@hotmail.fr');
    expect(component.contactForm.value.birthday).toEqual('11/11/1986');
    expect(component.contactForm.value.login).toEqual('jemZE');
    expect(component.contactForm.value.MPasse).toEqual('ararafsdhdbbd');
    expect(component.contactForm.value.CMPasse).toEqual('ararafsdhdbbd');
    expect(component.contactForm.value.name).toEqual('araraf');
    expect(res).toBeFalsy();
  });

  it('should verify if the form controls are invalid if the condition are not satisfied', () => {
    const nameEl = component.contactForm.controls["name"];
    const loginEl = component.contactForm.controls["login"];
    const emailEl = component.contactForm.controls["email"];
    const birthdayEl = component.contactForm.controls["birthday"];
    const CMPasseEl = component.contactForm.controls["CMPasse"];
    const passwordEl = component.contactForm.controls["MPasse"];
    nameEl.setValue('');
    emailEl.setValue('jemaienit');
    loginEl.setValue('');
    passwordEl.setValue('ararafs');
    CMPasseEl.setValue('ararafsdhdbb');
    birthdayEl.setValue('11/11/1986');
    const res = component.validForm();
    expect(component.contactForm.invalid).toBeTruthy();
    expect(component.contactForm.controls["email"].valid).toBeFalsy();
    expect(component.contactForm.controls["login"].valid).toBeFalsy();
    expect(component.contactForm.controls["MPasse"].valid).toBeFalsy();
    expect(res).toBeTruthy();
  });

  it('should call addYogi method of yogiService', () => {
    spyOn(serviceYogi, 'addYogi').and.callThrough();
    component.onSubmit();
    expect(serviceYogi.addYogi).toHaveBeenCalledTimes(1);
  });

  it('should validate onGoBack', () => {
    component.onGoBack();
    expect(component.messageError).toEqual(null);
  });

});
