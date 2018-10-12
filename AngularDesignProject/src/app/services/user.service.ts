import {Injectable} from '@angular/core';
import {User} from '../shared/models/user';
import {HttpClient} from '@angular/common/http';
import {Permission} from "../shared/models/permission";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User | null;

  constructor(private httpClient:HttpClient) {
    this.currentUser = null;
  }

  Login(username, password) {
    let user = this.http.get('/api/login')

    this.currentUser = new User(user.username, 'admin', adminPermissions);
  }

  CreateUser(username: String, password: String, permissions: Array<Permission>) {
    if (this.currentUser.permissions.includes(Permission.addUser)) {
      const newUser = new User(username, password, permissions);
      // Need to send this to the database
    }
  }

  Logout()  {
    this.currentUser = null;
  }
}
