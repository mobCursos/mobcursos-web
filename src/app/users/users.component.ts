import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../interfaces/user';
import { ROLES } from '../mocks/user-roles';
import { UserService } from "../user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // @Output() selectUserEvent = new EventEmitter<any>();

  users: User[];
  roles = ROLES;
  roleFilter = "";
  // selectedUser: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  addUser(newUser: User) {
    this.users.push(newUser);
  }

  // onEdit(user: User): void {
  //   this.selectedUser = user;
  //   console.warn(this.selectedUser);
  //   // this.selectUserEvent.emit()
  // }

}
