import {Permission} from './permission';

export class User {
  constructor(id: Number, username: String, password: String, permissions: Array<Permission> = []) {
    this.username = username;
    this.password = password;
    this.permissions = permissions;
  }
  id: Number;
  username: String;
  password: String;
  permissions: Array<Permission>;

}

