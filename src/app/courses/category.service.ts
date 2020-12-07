import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from './interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getCategories(): Observable<any[]> {
    return this.firestore.collection('category').valueChanges({idField: '_id'});
  }
}
