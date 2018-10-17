import { Component, OnInit } from '@angular/core';
import { SensorDataService } from '../services/sensor-data.service';
import {User} from '../shared/models/user';
import {Sensor , SensorType} from '../shared/models/sensor';
import Any = jasmine.Any;
import {UserService} from '../services/user.service';
import * as CanvasJS from '../../../canvasJS/canvasjs.min.js';
import {DataPoint} from "../shared/models/dataPoint";

@Component({
  selector: 'app-choose-data',
  templateUrl: './choose-data.component.html',
  styleUrls: ['./choose-data.component.css']
})
export class ChooseDataComponent implements OnInit {
  sensorList = [];
  selectedSensorID: number;
  sensorDescription = '';

  constructor(private sensorData: SensorDataService, public userService: UserService) {  }

  ngOnInit() {
    this.sensorData.getSensors().subscribe((response: Any) => {
      if (response.errors[0] != null) {
        console.log(response.errors);
      } else {
        for (const x in response.data) {
          this.sensorList.push(new Sensor(response.data[x].id, response.data[x].name));
        }
      }
    });
  }
  displaySensorData() {
    this.getDescriptionForSensor();
    const dataPoints = [];
    this.sensorData.getkWhForSensor(this.selectedSensorID).subscribe((response: Any) => {
      if (response.errors[0] == null) {
        for (const p in response.data) {
          dataPoints.push(new DataPoint(response.data[p].kWh, response.data[p].time));
        }
        console.log(dataPoints)
        this.showChartForSensor(dataPoints);
      }
    });

  }
  showChartForSensor(data: Array<DataPoint>) {
    const points = []
    for (const p in data) {
      points.push({y: data[p].value, label: data[p].label})
    }
    const chart = new CanvasJS.Chart('graph', {
      exportEnabled: true,
      title: {
        text: 'SensorData'
      },
      axisY: {
        title: 'kWh'
      },
      axisX: {
        title: 'Timestamps (nanoseconds)'
      },
      data: [{
        type: 'column',
        dataPoints: points
      }]
    });
    chart.render();
  }

  getDescriptionForSensor() {
    this.sensorData.getSensorDescription(this.selectedSensorID).subscribe((response: Any) => {
      if (response.errors[0] != null) {
        console.log(response.errors);
      } else {
        this.sensorDescription = 'Description: ' + response.data.buildingDescription;
      }
    });
  }

}
