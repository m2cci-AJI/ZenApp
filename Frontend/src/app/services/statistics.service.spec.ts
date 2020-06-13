import { TestBed } from '@angular/core/testing';

import { StatisticsService } from './statistics.service';
import { Yoga } from '../models/yoga.model';
import { sessionYoga } from '../yoga.enum';
import { Comment } from '../models/comment.model';

describe('StatisticsService', () => {
  let service: StatisticsService;
  let Days: string[] = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatisticsService]
    });
    service = TestBed.get(StatisticsService);
  });

  it('should add days to date', () => {
    const date: Date = new Date(2020, 12, 6);
    const result = service.addDaysToDate(date, 3);
    expect(result).toEqual(new Date(2020, 12, 9));
  });

  it('should change the format of date', () => {
    const date: Date = new Date(2020, 11, 6);
    const result = service.formatDate(date);
    expect(result).toEqual('6-12-2020');
  });

  it('should get day from date', () => {
    const date: Date = new Date(2020, 11, 6);
    const result = service.getDay(date);
    expect(result).toEqual(Days[0]);
  });

  it('should get table with ouple date elements', () => {
    const table = [new Date(2020, 10, 1),
    new Date(2020, 10, 2),
    new Date(2020, 10, 3),
    new Date(2020, 10, 4),
    new Date(2020, 10, 5),
    new Date(2020, 10, 6),
    new Date(2020, 10, 7)];
    const TableRes = [
      { date1: new Date(2020, 10, 1), date2: new Date(2020, 10, 2) },
      { date1: new Date(2020, 10, 2), date2: new Date(2020, 10, 3) },
      { date1: new Date(2020, 10, 3), date2: new Date(2020, 10, 4) },
      { date1: new Date(2020, 10, 4), date2: new Date(2020, 10, 5) },
      { date1: new Date(2020, 10, 5), date2: new Date(2020, 10, 6) },
      { date1: new Date(2020, 10, 6), date2: new Date(2020, 10, 7) }
    ];
    const result = service.getTableTwoDates(table);
    expect(result).toEqual(TableRes);
  });

  it('should create data allowing to plot the graph', () => {
    const tableX = ['1', '2', '3'];
    const tableY = ['a', 'b', 'c'];
    spyOn(service, 'getDay').and.returnValues('Lundi', 'Mardi', 'Mercredi');
    const result = service.linedataDay(tableX, tableY);
    const tableRes = [
      { x: 'Lundi', y: 'a' },
      { x: 'Mardi', y: 'b' },
      { x: 'Mercredi', y: 'c' }
    ];
    expect(result).toEqual(tableRes);
  });

  it('should get new format of date couple', () => {
    const couple = {date1: new Date(2020, 9, 2), date2: new Date(2020, 10, 1)};
    spyOn(service, 'formatDate').and.returnValues('2020-10-2', '2020-11-1');
    const result = service.getFormatDate(couple);
    expect(result).toEqual('2020-10-2 / 2020-11-1');
  });

  it('should get table of total meditation duration/period', () => {
    const data = [
      {date1: new Date(2020, 9, 2), date2: new Date(2020, 10, 1)},
      {date1: new Date(2020, 10, 1), date2: new Date(2020, 11, 1)}
    ];
    const sessions: Yoga[] = [
      new Yoga('112', sessionYoga['0'], 'Carré', 15, new Date(2020, 9, 3), new Date(), new Comment('aggga', 'agga', 'agghhs'), 'hhrttr')
    ];
    const result = service.createDataDurY(data, sessions);
    expect(result).toEqual([15, 0]);
  });
});
