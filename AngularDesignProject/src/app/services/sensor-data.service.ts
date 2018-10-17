import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Sensor, SensorType} from '../shared/models/sensor';
import { DataPoint } from "../shared/models/dataPoint";
import {User} from "../shared/models/user";
import Any = jasmine.Any;
import {forEach} from "@angular/router/src/utils/collection";

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

  constructor(private http: HttpClient) { }

  dateTime2Nanoseconds(dateTime: string) {}

  getSensors() {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    const options = {headers: headers};
    return this.http.get('http://localhost:3000/api/sensors', options);
  }

  getSensorDescription(sensorID: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    const options = {headers: headers};
    return this.http.get('http://localhost:3000/api/sensorDescriptions/' + sensorID.toString(), options);
  }

  getkWhForSensor (sensorID: number) {
    const dataPoints = [];
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let params = new HttpParams();
    params = params.append('startTime', '1514932200000000000');
    params = params.append('endTime', '1514935800000000000');
    console.log(params)
    const options = {headers: headers, params: params };
    return this.http.get('http://localhost:3000/api/sensorData/' + sensorID.toString(), options);
  }
}

