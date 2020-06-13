import { TestBed } from '@angular/core/testing';

import { CalendrierService } from './calendrier.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Yoga } from '../models/yoga.model';
import { sessionYoga } from '../yoga.enum';
import { Comment } from '../models/comment.model';
import { HttpClient } from '@angular/common/http';

describe('CalendrierService', () => {
  let service: CalendrierService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CalendrierService]
    });
    httpClient = TestBed.get(HttpClient);
    service = TestBed.get(CalendrierService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get all sessions associated to user by using its id', () => {
    const sessions: Yoga[] = [
      new Yoga('112', sessionYoga['0'], 'Carré', 15, new Date(2020, 9, 3), new Date(), new Comment('aggga', 'agga', 'agghhs'), 'hhrttr'),
      new Yoga('132', sessionYoga['1'], 'Carré', 15, new Date(2020, 10, 2), new Date(), new Comment('aggga', 'agga', 'agghhs'), 'hhrttr')
    ];
    service.getItems('112').subscribe((data: any) => {
      expect(data.body.length).toBe(2);
      expect(data.body).toEqual(sessions);
    });
    const request = httpMock.expectOne('http://localhost:4000/api/session/112');
    expect(request.request.method).toBe('GET');
    request.flush(sessions);
  });

  it('should add one session to the database', () => {
    const yoga: Yoga =
      new Yoga('112', sessionYoga['0'], 'Carré', 15, new Date(2020, 9, 3), new Date(), new Comment('aggga', 'agga', 'agghhs'), 'hhrttr');
    service.addItem(yoga).subscribe((data: any) => {
      expect(data.body).toEqual(yoga);
    });
    const request = httpMock.expectOne('http://localhost:4000/api/session');
    expect(request.request.method).toBe('POST');
    request.flush(yoga);
  });

  it('should update one session to the database by selecting the id', () => {
    const yoga: Yoga =
      new Yoga('112', sessionYoga['0'], 'Carré', 15, new Date(2020, 9, 3), new Date(), new Comment('aggga', 'agga', 'agghhs'), 'hhrttr');
    service.updateItem(yoga, '112').subscribe((data: any) => {
      expect(data.body).toEqual(yoga);
    });
    const request = httpMock.expectOne('http://localhost:4000/api/session/112');
    expect(request.request.method).toBe('PUT');
    request.flush(yoga);
  });

  it('should get the start date', () => {
    const endTime: Date = new Date(2020, 10, 1, 15, 30, 25);
    const duration = 1; // minutes
    const startTime = service.getStart(endTime, duration);
    expect(startTime).toEqual(new Date(2020, 10, 1, 15, 29, 25));
  });

});
