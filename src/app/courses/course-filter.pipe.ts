import { Pipe, PipeTransform } from '@angular/core';
import { Course } from './interfaces/course';

@Pipe({
  name: 'courseFilter'
})
export class CourseFilterPipe implements PipeTransform {

  getCourse(course: Course, term: string){
    return course.name.toLowerCase().includes(term.toLowerCase())
  }
  
  transform(courses: Course[], term: string) {
    if(term === ""){
      return courses;
    } 
    
    if (courses) {
    return courses.filter(course => this.getCourse(course, term));
    }
    else {
      return [];
    }
  }

}
