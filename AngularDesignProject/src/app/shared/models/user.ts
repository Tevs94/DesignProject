import {Permission} from './permission';

export class User {
  constructor(username: String, password: String, permissions: Array<Permission> = []) {
    this.username = username;
    this.password = password;
    this.permissions = permissions;
  }
  username: String;
  password: String;
  permissions: Array<Permission>;
}

