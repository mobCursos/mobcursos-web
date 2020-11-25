import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseListComponent } from './course-list/course-list.component';

const routes: Routes = [
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/form', component: CourseFormComponent },
  { path: 'courses/random', component: CourseFormComponent }, /** ONLY FOR DEVELOPMENT/TESTS */
  { path: 'courses/edit/:id', component: CourseFormComponent },
  { path: 'courses/remove/:id', component: CourseListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
