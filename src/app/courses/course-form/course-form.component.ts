import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { CourseService } from "../course.service";
import { Course } from '../interfaces/course';
import { CategoryService } from '../category.service';
import { Observable } from 'rxjs';
import { MOCK_COURSE_NAMES } from '../mocks/course-names';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private location: Location
    ) { }

  course: Course;

  categories$: Observable<any>;

  courseForm = this.fb.group({
    _id: [null],
    name: ['', Validators.required],
    category: ['', Validators.required],
    description: ['', Validators.required],
  });

  id:string = this.route.snapshot.paramMap.get('id');

  resetButtonText: string = "Limpar";
  backButtonText: string = "Voltar";
  

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
    /** ONLY FOR DEVELOPMENT/TESTS */
    // console.warn("Rota: ",this.route.snapshot.routeConfig.path);
    if (this.route.snapshot.routeConfig.path == "random") {
      this.courseForm.patchValue(this.getMockCourse());
    }
    else if(this.id){
      this.getCourseInForm();     
    }
    
    // this.courseForm.get('_id').disable(); /** TODO: automatic id from server */
  }

  getCourseInForm(): void {
    const id:string = this.id;
    // console.warn('GET COURSE id: ', this.id)
    this.courseService.getCourse(id)
      .subscribe(course => this.courseForm.patchValue(course));
    ;
  }

  onSubmit() {
    if(this.courseForm.value._id) {
      this.courseService.updateCourse(this.courseForm.value)
      .subscribe({
        next: () => alert('Dados atualizados com sucesso.'),
        error: () => alert('Erro ao atualizar dados.'),
        complete: () => this.goBack()
      })
    } else {
      this.courseService.createCourse(this.courseForm.value)
      .subscribe({
        next: () => alert('Novo curso criado com sucesso.'),
        error: () => alert('Erro ao criar o curso.'),
        complete: () => this.goBack()
      })
    }
  }

  onReset(): void {
    this.courseForm.reset();
  }

  goBack(): void {
    this.onReset();
    this.location.back();
  }  
  
  /** ONLY FOR DEVELOPMENT/TESTS */
  getMockCourse() {
    
    const mockCategoryIndex = Math.floor(Math.random() * 3); /* 0 a 2 */
    const mockName = MOCK_COURSE_NAMES[mockCategoryIndex];
    const mockCourseNumber = (100 + Math.floor(Math.random() * 900)).toString();  /* 100 a 999 */
    const mockCourse = `${mockName} ${mockCourseNumber}`;
    
    const course = {
      "teacher": null,
      "students": [],
      "_id": null,
      "name": mockCourse,
      "category": null,
      "description": mockCourse + 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla a nobis, id consectetur veniam, veritatis quos maiores dolor!', 
    }
    return course
  }

}
