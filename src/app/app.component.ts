import { Component } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'mobcursos-web';  

  constructor(public authService: AuthService) {}
  
}
