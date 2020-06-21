import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthentificationService } from '../services/authentification.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { homeRoute } from '../home/home.route';
import { HomeComponent } from '../home/home.component';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service: AuthentificationService;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, HomeComponent ],
      imports: [ RouterTestingModule, RouterTestingModule.withRoutes([homeRoute]) ],
      providers: [ AuthentificationService ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    service = TestBed.get(AuthentificationService);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loloadToken method of authentification service', () => {
    spyOn(service, 'loadToken').and.callThrough();
    component.ngOnInit();
    expect(service.loadToken).toHaveBeenCalledTimes(1);
  });

  it('should validate logout', fakeAsync(() => {
    spyOn(service, 'logout').and.callThrough();
    component.logout();
    tick();
    expect(location.path()).toBe('/home');
    expect(service.logout).toHaveBeenCalledTimes(1);
  }));

  it('should validate isAuthentified', () => {
    spyOn(service, 'isAuthentified').and.callThrough();
    component.isAuthentified();
    expect(service.isAuthentified).toHaveBeenCalledTimes(1);
  });


});
