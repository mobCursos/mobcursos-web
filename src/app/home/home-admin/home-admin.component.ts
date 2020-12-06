import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CourseService } from 'src/app/courses/course.service';
import { Course } from 'src/app/courses/interfaces/course';
import { User } from 'src/app/users/interfaces/user';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor(
    public userService: UserService,
    public courseService: CourseService,
  ) { }

  totalUsers: number;
  totalUsersAdmin: number;
  totalUsersTeacher: number;
  totalUsersStudent: number;
  totalCourses: number;
  users: User[];
  courses: Course[];

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.totalUsers = users.length;
        this.totalUsersAdmin = users.filter(user => user.role == 'admin').length;
        this.totalUsersTeacher = users.filter(user => user.role == 'teacher').length;
        this.totalUsersStudent = users.filter(user => user.role == 'student').length;
      }
    );
    
    this.courseService.getCourses(true).subscribe(
      courses => this.totalCourses = courses.length
    );
    
  }

}
