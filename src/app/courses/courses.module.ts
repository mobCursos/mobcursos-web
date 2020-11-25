import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CourseFormComponent } from './course-form/course-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseListComponent } from './course-list/course-list.component';


@NgModule({
  declarations: [
    CourseFormComponent,
    CourseListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
  ]
})
export class CoursesModule { }
