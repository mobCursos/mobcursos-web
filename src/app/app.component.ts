import { Component } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'mobcursos-web';
  public isMenuCollapsed = true;
  roles$: Observable<any[]>;

  constructor(
    firestore: AngularFirestore,
    public authService: AuthService) {
      this.roles$ = firestore.collection('roles').valueChanges({idField: '_id'});
  
    }
  
}
