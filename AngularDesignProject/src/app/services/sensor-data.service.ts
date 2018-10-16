import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Sensor, SensorType} from '../shared/models/sensor';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

  constructor(private http: HttpClient) { }

  dateTime2Nanoseconds(dateTime: string) {}

  getSensors() {
    const options = {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
    this.http.get('localhost:3000/api/sensors', options);
  }
}
