import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { HomeStudentComponent } from './home-student/home-student.component';
import { HomeTeacherComponent } from './home-teacher/home-teacher.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
  
  { path: 'home',
    //canActivate: [AuthGuard],
    children: [
      { path: '',
        children: [
          { path: 'admin', component: HomeAdminComponent },      
          { path: 'teacher', component: HomeTeacherComponent },      
          { path: 'student', component: HomeStudentComponent },      
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
