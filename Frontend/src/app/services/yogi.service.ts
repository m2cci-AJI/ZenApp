import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YogiService {
  yogiConnection: string = 'http://localhost:4000/api/';

  constructor(private http: HttpClient) { }

  addYogi(body) {
    return this.http.post(this.yogiConnection + 'signup', body, {observe: 'response'});
  }

  setYogi(body: any, id: any) {
    return this.http.put(this.yogiConnection + 'login/' + id, body, {observe: 'response'});
  }

  connection(body) {
    return this.http.post(this.yogiConnection + 'login', body, {observe: 'response'});
  }

  getAllYogi() {
    return this.http.get(this.yogiConnection + 'signup', {observe: 'response'});
  }

  getOneYogi(id: any) {
    return this.http.get(this.yogiConnection + 'signup/' + id, {observe: 'response'});
  }

  requestReset(body) {
    return this.http.post(this.yogiConnection + 'req-reset-password', body, {observe: 'response'});
  }

  confirmPassword(body) {
    return this.http.post(this.yogiConnection + 'confirm-reset-password', body);
  }

  newPassword(body) {
    return this.http.post(this.yogiConnection + 'new-password', body);
  }

  ValidPasswordToken(body) {
    return this.http.post(this.yogiConnection + 'valid-password-token', body);
  }
}
