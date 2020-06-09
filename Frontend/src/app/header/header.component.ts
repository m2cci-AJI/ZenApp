import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authentificationService: AuthentificationService,
              private router: Router) { }

  ngOnInit() {
    this.authentificationService.loadToken();
  }

  logout() {
     this.authentificationService.logout();
     this.router.navigateByUrl('/home');
  }

  isAuthentified() {
     return this.authentificationService.isAuthentified();
  }

}
