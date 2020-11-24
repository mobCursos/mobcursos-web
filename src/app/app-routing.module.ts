import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseFormComponent } from './course-form/course-form.component';

const routes: Routes = [
  // { path: '', redirectTo: '/', pathMatch: 'full' },
  // USERS
  { path: 'users', component: UsersComponent },
  { path: 'users/form', component: UserFormComponent },
  { path: 'users/random', component: UserFormComponent }, /** ONLY FOR DEVELOPMENT/TESTS */
  { path: 'users/edit/:id', component: UserFormComponent },
  { path: 'users/remove/:id', component: UsersComponent },
  // COURSES
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/form', component: CourseFormComponent },
  { path: 'courses/random', component: CourseFormComponent }, /** ONLY FOR DEVELOPMENT/TESTS */
  { path: 'courses/edit/:id', component: CourseFormComponent },
  { path: 'courses/remove/:id', component: CoursesComponent },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
