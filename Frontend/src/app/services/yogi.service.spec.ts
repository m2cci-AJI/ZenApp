import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { YogiService } from './yogi.service';
import { Yogi } from '../models/yogi.model';
import { HttpClient } from '@angular/common/http';

describe('YogiService', () => {
  let service: YogiService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [YogiService]
    });
    httpClient = TestBed.get(HttpClient);
    service = TestBed.get(YogiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get all yogi from database', () => {
    const allYogi: Yogi[] = [
      new Yogi('ahmed', 'zed', '02/12/1487', 'ahmed.jemai@yahoo.fr', '001114445', 5),
      new Yogi('ahmed', 'zed', '02/12/1487', 'jemai@hotmail.fr', '001114445', 5)
    ];

    service.getAllYogi().subscribe((yogis: any) => {
      expect(yogis.body.length).toBe(2);
      expect(yogis.body).toEqual(allYogi);
    });

    const request = httpMock.expectOne('http://localhost:4000/api/signup');
    expect(request.request.method).toBe('GET');
    request.flush(allYogi);
  });

  it('should add one yogi to database', () => {
    const newYogi: Yogi = new Yogi('bouhmid', 'zedi', '02/12/2487', 'ahmejemai@yahoo.fr', '0114445', 5);
    service.addYogi(newYogi).subscribe((data) => {
      expect(data.body).toEqual(newYogi, 'should return the employee');
    });
    const request = httpMock.expectOne('http://localhost:4000/api/signup');
    expect(request.request.method).toBe('POST');
  });

  it('should get one yogi from database by using id', () => {
    service.getOneYogi(123).subscribe((data) => {
      console.log(data.body);
    });

    const request = httpMock.expectOne('http://localhost:4000/api/signup/123');
    expect(request.request.method).toBe('GET');
  });

  it('should update one yogi by using its id', () => {
    const newYogi: Yogi = new Yogi('bouhmid', 'zedi', '02/12/2487', 'ahmejemai@yahoo.fr', '0114445', 5);
    service.setYogi(newYogi, 123).subscribe((data) => {
      expect(data.body).toEqual(newYogi);
    });
    const request = httpMock.expectOne('http://localhost:4000/api/login/123');
    expect(request.request.method).toBe('PUT');
   });

  it('should connect by using email and password of user', () => {
     const Body = {
       email: 'ahmed.jemai@hotmail.com',
       password: '125487555'
     };
     service.connection(Body).subscribe((data) => {
         expect(data.body).toEqual(Body);
     });
     const request = httpMock.expectOne('http://localhost:4000/api/login');
     expect(request.request.method).toBe('POST');
   });

  it('requestReset', () => {
    const Body: any = '';
    service.requestReset(Body).subscribe((data) => {
      expect(data.body).toEqual(Body);
    });
    const request = httpMock.expectOne('http://localhost:4000/api/req-reset-password');
    expect(request.request.method).toBe('POST');
  });

  it('confirmPassword', () => {
    const Body: any = '';
    service.confirmPassword(Body).subscribe((data: any) => {
      expect(data.body).toEqual(Body);
    });
    const request = httpMock.expectOne('http://localhost:4000/api/confirm-reset-password');
    expect(request.request.method).toBe('POST');
  });

  it('newPassword', () => {
    const Body: any = '';
    service.newPassword(Body).subscribe((data: any) => {
      expect(data.body).toEqual(Body);
    });
    const request = httpMock.expectOne('http://localhost:4000/api/new-password');
    expect(request.request.method).toBe('POST');
  });

  it('ValidPasswordToken', () => {
    const Body: any = '';
    service.ValidPasswordToken(Body).subscribe((data: any) => {
      expect(data.body).toEqual(Body);
    });
    const request = httpMock.expectOne('http://localhost:4000/api/valid-password-token');
    expect(request.request.method).toBe('POST');
  });

});
