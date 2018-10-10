import {PermissionList} from "./permission";

export class User {
  constructor(username: String, password: String, permissions: PermissionList) {
    this.username = username;
    this.password = password;
    this.permissions = permissions;
  }
  username: String;
  password: String;
  permissions: PermissionList;
}

