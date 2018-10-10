import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import { User } from '../shared/models/user';
import {PermissionList} from '../shared/models/permission';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User | null;

  constructor() {
    this.currentUser = null;
  }

  Login(username, password) {
    // return this.http.get('/api/user')
    // .map((res: Response) => res.json().response);
    // temporary user with admin permissions
    const adminPermissions = new PermissionList(true, true, true, true);
    this.currentUser = new User('admin', 'admin', adminPermissions);
  }

  CreateUser(username: String, password: String, permissions: PermissionList) {
    if (this.currentUser.permissions.addUser === true)  {
      const newUser = new User(username, password, permissions);
      // Need to send this to the database
    }
  }

  Logout()  {
    this.currentUser = null;
  }
}
