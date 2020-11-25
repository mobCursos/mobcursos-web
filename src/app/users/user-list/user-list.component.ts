import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { User } from '../interfaces/user';
import { ROLES } from '../mocks/user-roles';
import { UserService } from "../user.service";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  roles = ROLES;
  roleFilter = "";
  id: string = this.route.snapshot.paramMap.get('id');

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getUsers();
    if (this.route.snapshot.routeConfig.path == "users/remove/:id") {
      this.removeUser(this.id);
    }

  }

  ngOnChanges(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  removeUser(id: string): void {
    this.userService.deleteUser(id)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
