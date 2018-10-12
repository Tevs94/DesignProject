import { Component, OnInit } from '@angular/core';
import { UserService} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService) { }
  username = ''
  password = ''
  loggedIn = 'Not Logged in';
  login() {
    this.userService.Login(this.username, this.password);
    this.loggedIn = 'Logged in as ' + this.userService.currentUser.username;
  }

}
