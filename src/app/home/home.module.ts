import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { HomeComponent } from './home/home.component';
import { HomeTeacherComponent } from './home-teacher/home-teacher.component';
import { HomeStudentComponent } from './home-student/home-student.component';


@NgModule({
  declarations: [HomeComponent, HomeAdminComponent, HomeTeacherComponent, HomeStudentComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
