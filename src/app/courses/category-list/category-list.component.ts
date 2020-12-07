import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CategoryService } from '../category.service';
import { Category } from '../interfaces/category';
import { Location } from "@angular/common";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  title:string = 'Cadastro de Categorias de Curso'

  categories$: Observable<any[]>;
  id: string = this.route.snapshot.paramMap.get('id');
  currentRoute: string;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private location: Location,
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.currentRoute = this.route.snapshot.routeConfig.path;
    
  }

  getCategories(): void {
      this.categories$ = this.categoryService.getCategories();
  }

  // deleteCategory(id: string): void {
  //   this.categorieservice.deleteCategory(id)
  //     .subscribe(() => this.getCategories());
  // }

  goBack(): void {
    this.location.back();
  }

}
