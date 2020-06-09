import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  jwt: string = undefined;
  constructor() { }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.loadToken();
  }

  isAuthentified() {
     return ((this.jwt !== undefined) && (this.jwt !== null));
  }

  loadToken() {
    this.jwt = localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
    this.jwt = undefined;
  }

}
