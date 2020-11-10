import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from "../user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.users = this.userService.getUsers();
        // .subscribe(users => this.users = users);
  }

  addUser(newUser: User) {
    this.users.push(newUser);
  }

}
