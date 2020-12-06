import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/courses/course.service';
import { Course } from 'src/app/courses/interfaces/course';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.css']
})
export class HomeStudentComponent implements OnInit {

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
