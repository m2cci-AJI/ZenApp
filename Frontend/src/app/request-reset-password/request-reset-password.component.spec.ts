import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestResetPasswordComponent } from './request-reset-password.component';
import { YogiService } from '../services/yogi.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RequestResetPasswordComponent', () => {
  let component: RequestResetPasswordComponent;
  let fixture: ComponentFixture<RequestResetPasswordComponent>;
  let service: YogiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestResetPasswordComponent ],
      imports: [ RouterTestingModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, HttpClientTestingModule ],
      providers: [ YogiService ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(RequestResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(YogiService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify if the form ca be validated if all conditions are satisfied', () => {
    const emailEl = component.RequestResetForm.controls["email"];
    emailEl.setValue('jemaienit@hotmail.fr');
    expect(component.RequestResetForm.valid).toBeTruthy();
    expect(component.RequestResetForm.value.email).toEqual('jemaienit@hotmail.fr');
  });

  it('should verify if the form controls are invalid if the condition are not satisfied', () => {
    const emailEl = component.RequestResetForm.controls["email"];
    emailEl.setValue('jemaienit');
    expect(component.RequestResetForm.invalid).toBeTruthy();
    expect(component.RequestResetForm.controls["email"].valid).toBeFalsy();
  });

  it('should call requestReset method of yogiService when form.valid is true', () => {
    spyOn(service, 'requestReset').and.callThrough();
    const form = {valid: true};
    component.RequestResetUser(form);
    expect(service.requestReset).toHaveBeenCalledTimes(1);
    expect(component.IsvalidForm).toEqual(true);
  });

  it('should validate the case where form.valid is false', () => {
    spyOn(service, 'requestReset').and.callThrough();
    const form = {valid: false};
    component.RequestResetUser(form);
    expect(component.IsvalidForm).toEqual(false);
  });

});
