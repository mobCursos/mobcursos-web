import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseListComponent } from './course-list/course-list.component';

const routes: Routes = [
  { path: 'courses-noauth', component: CourseListComponent},
  { path: 'courses-noauth/subscribe', redirectTo: '/login'},
  
  { path: 'courses',
    canActivate: [AuthGuard],
    children: [
      { path: '',
        children: [
          { path: '', component: CourseListComponent },
          { path: 'available', component: CourseListComponent },
          { path: 'form', component: CourseFormComponent },
          { path: 'random', component: CourseFormComponent }, /** ONLY FOR DEVELOPMENT/TESTS */
          { path: 'edit/:id', component: CourseFormComponent },
          { path: 'remove/:id', component: CourseListComponent }        
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
