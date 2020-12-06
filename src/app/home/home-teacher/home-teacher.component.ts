import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/courses/course.service';
import { Course } from 'src/app/courses/interfaces/course';

@Component({
  selector: 'app-home-teacher',
  templateUrl: './home-teacher.component.html',
  styleUrls: ['./home-teacher.component.css']
})
export class HomeTeacherComponent implements OnInit {

  constructor(
    public courseService: CourseService,
  ) { }

  totalCourses: number;
  courses: Course[];

  ngOnInit(): void {
    this.courseService.getOwnCourses().subscribe(
      courses => this.totalCourses = courses.length
    );
    
  }

}
