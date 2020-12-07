import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CourseFormComponent } from './course-form/course-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseFilterPipe } from './course-filter.pipe';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';


@NgModule({
  declarations: [
    CourseFormComponent,
    CourseListComponent,
    CourseFilterPipe,
    CategoryListComponent,
    CategoryFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
  ]
})
export class CoursesModule { }
