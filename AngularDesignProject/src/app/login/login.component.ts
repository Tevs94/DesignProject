import { Component, OnInit } from '@angular/core';
import { UserService} from '../services/user.service';
import {User} from "../shared/models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService) { }
  username = '';
  password = '';
  isLoggedIn = false;
  loggedInText = 'Not Logged in';
  login() {
    try {
      this.userService.Login(this.username, this.password).subscribe((response: Any) => {
        if (response[Error] != null) {
          console.log(response.Error);
        } else {
          this.userService.currentUser = new User(response.username, response.password, response.permissions);
          this.userService.currentUser.id = response.id;
          this.loggedInText = 'Logged in as ' + this.userService.currentUser.username;
          this.isLoggedIn = true;
        }
      });

    } catch (ex) {
      console.log(ex);
    }

  }

}
