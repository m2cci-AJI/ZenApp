import { Injectable } from '@angular/core';
import { Yoga } from '../models/yoga.model';

@Injectable({
  providedIn: 'root'
})

export class StatisticsService {
  Days: string[] = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  constructor() { }

  // add days to date
  addDaysToDate(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  /*change the format of date*/
  formatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return day + '-' + month + '-' + year;
  }

  /*get the day from date */
  getDay(date: Date) {
    return this.Days[date.getDay()];
  }

  getTableTwoDates(table: any[]) {
    const dates = [];
    let CoupleDate: any;
    for (let i = 0; i < 6; i++) {
      CoupleDate = { date1: table[i], date2: table[i + 1] };
      dates.push(CoupleDate);
    }
    return dates;
  }

  createDataFreqY(data: any[], TableSessions: Yoga[]) {
    const frequencies = [];
    for (let i = 0; i < data.length; i++) {
      let frequency = 0;
      for (let j = 0; j < TableSessions.length; j++) {
        if ((new Date(TableSessions[j].start) >= data[i].date1)
          && (new Date(TableSessions[j].start) < data[i].date2)) {
          frequency = frequency + 1;
        }
      }
      frequencies.push(frequency);
    }
    return frequencies;
  }

  linedataDay(tableX: any[], tableY: any[]) {
    const lineData = [];
    let data: any;
    for (let i = 0; i < tableX.length; i++) {
      data = { x: this.getDay(tableX[i]), y: tableY[i] };
      lineData.push(data);
    }
    return lineData;
  }

  linedataWM(tableX: any[], tableY: any[]) {
    const lineData = [];
    let data: any;
    for (let i = 0; i < tableX.length; i++) {
      data = { x: this.getFormatDate(tableX[i]), y: tableY[i] };
      lineData.push(data);
    }
    return lineData;
  }

  getFormatDate(couple: any) {
    const date1 = this.formatDate(couple.date1);
    const date2 = this.formatDate(couple.date2);
    return date1 + ' / ' + date2;
  }

  getTableOnedates(n: number) {
    const dates = [];
    let date = new Date();
    for (let i = 0; i < 7; i++) {
      dates.splice(0, 0, new Date(date));
      date = this.addDaysToDate(date, (-n));
    }
    return dates;
  }

  createDataDurY(data: any[], TableSessions: Yoga[]) {
    const durations = [];
    for (let i = 0; i < data.length; i++) {
      let duration = 0;
      for (let j = 0; j < TableSessions.length; j++) {
        if ((new Date(TableSessions[j].start) >= data[i].date1)
          && (new Date(TableSessions[j].start) < data[i].date2)) {
          duration = duration + TableSessions[j].durationYoga;
        }
      }
      durations.push(duration);
    }
    return durations;
  }
}
