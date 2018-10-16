import {type} from "os";

export enum SensorType {
  energy = 0,
  water
}

export class Sensor {
  id: Number;
  name: String;
  sensorType: SensorType;
  location: String;

  constructor(id: Number, name: String, sensorType: SensorType = SensorType.energy) {
    this.id = id;
    this.name = name;
    this.sensorType = sensorType;
  }
  setLocation(location: String) {
    this.location = location;
  }

};
