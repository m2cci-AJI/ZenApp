import { Injectable } from '@angular/core';
import { Yoga } from '../models/yoga.model';
import { ItemCalendrier } from '../models/item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendrierService {
  items: ItemCalendrier[];
  sessionsYoga: Yoga[];
  connectionYoga: string = 'http://localhost:4000/api/session';
  constructor(private http: HttpClient) {
  }

  getItems(id: string) {
    return this.http.get(this.connectionYoga + '/' + id, {observe: 'response'});
  }

  addItem(yoga: Yoga) {
    return this.http.post(this.connectionYoga, yoga, {observe: 'response'});
  }

  updateItem(yoga: Yoga, id: any) {
    return this.http.put(this.connectionYoga + '/' + id, yoga, {observe: 'response'});
  }


  getStart(end: Date, duration: number) {
    return new Date(end.getTime() - duration * 60000);
  }
}
