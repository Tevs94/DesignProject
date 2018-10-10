export class PermissionList {

  constructor(addUser: boolean, deleteUser: boolean, addSensor: boolean, editDescription: boolean) {
    this.addUser = addUser;
    this.deleteUser = deleteUser;
    this.addSensor = addSensor;
    this.editDescription = editDescription;
  }

  addUser: boolean;
  deleteUser: boolean;
  addSensor: boolean;
  editDescription: boolean;
}
