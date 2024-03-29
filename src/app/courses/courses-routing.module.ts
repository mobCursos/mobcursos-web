import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
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
        ]
      }
    ]
  },

  { path: 'courses/categories',
    canActivate: [AuthGuard],
    children: [
      { path: '',
        children: [
          { path: '', component: CategoryListComponent },
          { path: 'form', component: CategoryFormComponent },
          { path: 'edit/:id', component: CategoryFormComponent },
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
