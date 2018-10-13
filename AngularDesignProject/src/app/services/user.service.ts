import {Injectable} from '@angular/core';
import {User} from '../shared/models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Permission} from '../shared/models/permission';
import Any = jasmine.Any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User | null;

  constructor(private http: HttpClient) {
    this.currentUser = null;
  }

  Login(username, password) {
    const body = `username=${username}&password=${password}`;
    const options = {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};

    return this.http.post('http://localhost:3000/api/login', body.toString(), options);
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
