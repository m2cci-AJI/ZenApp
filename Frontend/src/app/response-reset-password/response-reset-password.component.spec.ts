import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ResponseResetPasswordComponent } from './response-reset-password.component';
import { YogiService } from '../services/yogi.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';

describe('ResponseResetPasswordComponent', () => {
  let component: ResponseResetPasswordComponent;
  let fixture: ComponentFixture<ResponseResetPasswordComponent>;
  let service: YogiService; 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ YogiService ],
      imports:[ FormsModule, ReactiveFormsModule, MatFormFieldModule, RouterTestingModule, HttpClientTestingModule ],
      declarations: [ ResponseResetPasswordComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ResponseResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(YogiService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ValidPasswordToken method of yogiService', () => {
    spyOn(service, 'ValidPasswordToken').and.callThrough();
    component.VerifyToken();
    expect(service.ValidPasswordToken).toHaveBeenCalledTimes(1);
  });

  it('should call ValidPasswordToken method of yogiService', () => {
    spyOn(service, 'ValidPasswordToken').and.callThrough();
    component.VerifyToken();
    expect(service.ValidPasswordToken).toHaveBeenCalledTimes(1);
  });

  it('should call Init method', () => {
    spyOn(component, 'Init').and.callThrough();
    component.ngOnInit();
    expect(component.Init).toHaveBeenCalled();
  });

  it('should call newPassword method of yogiService and change value of IsResetFormValid property', () => {
    spyOn(service, 'newPassword').and.callThrough();
    const form = {valid: true};
    component.ResetPassword(form);
    expect(service.newPassword).toHaveBeenCalled();
    expect(component.IsResetFormValid).toBeTruthy();
  });

  it('should change value of IsResetFormValid property whene form.valid becomes false', () => {
    const form = {valid: false};
    component.ResetPassword(form);
    expect(component.IsResetFormValid).toBeFalsy();
  });

});
