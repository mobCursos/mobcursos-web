import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { ROLES } from '../mocks/user-roles';
import { UserService } from "../user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  roles = ROLES;
  roleFilter = "";

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
