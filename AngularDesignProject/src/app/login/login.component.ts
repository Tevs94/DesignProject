import { Component, OnInit } from '@angular/core';
import { UserService} from '../services/user.service';
import {User} from "../shared/models/user";
import Any = jasmine.Any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public userService: UserService) { }
  username = '';
  password = '';
  isLoggedIn = false;
  loggedInText = 'Not Logged in';
  login() {
    try {
      this.userService.Login(this.username, this.password).subscribe((response: Any) => {
        if (response.errors != null) {
          console.log(response.errors);
        } else {
          this.userService.currentUser = new User(response.id, response.username, response.password, response.permissions);
          this.loggedInText = 'Logged in as ' + this.userService.currentUser.username;
          this.isLoggedIn = true;
        }
      });

    } catch (ex) {
      console.log(ex);
    }

  }

}
