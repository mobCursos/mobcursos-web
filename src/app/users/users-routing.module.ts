import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/form', component: UserFormComponent },
  { path: 'users/random', component: UserFormComponent }, /** ONLY FOR DEVELOPMENT/TESTS */
  { path: 'users/edit/:id', component: UserFormComponent },
  { path: 'users/remove/:id', component: UserListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
