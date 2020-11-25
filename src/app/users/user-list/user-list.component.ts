import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { User } from '../interfaces/user';
import { ROLES } from '../mocks/user-roles';
import { UserService } from "../user.service";
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]>;
  selectedId: string;
  roles = ROLES;
  roleFilter = "";
  // id: string = this.route.snapshot.paramMap.get('id');

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    // this.getUsers();
    // if (this.route.snapshot.routeConfig.path == "users/remove/:id") {
    //   this.removeUser(this.id);
    // }
    this.users$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = params.get('id');
        if(this.selectedId) {
          this.deleteUser(this.selectedId);
        }
        return this.userService.getUsers();
      })
        
    )
    

  }

  ngOnChanges(): void {
    this.getUsers();
  }

  getUsers(): void {
    // this.userService.getUsers()
      // .subscribe(users => this.users = users);
      // .subscribe();
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id)
    // TODO: not reload component, but reuse
      .subscribe(() => this.router.navigate(['/users']));
  }

}
