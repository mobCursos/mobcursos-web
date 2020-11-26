import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    const url: string = state.url;
    console.warn('authGuard - STATE URL: ', url)
    
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean | UrlTree {
    console.warn('check AUTH login')
    console.warn('isLoggedIn:', this.authService.isLoggedIn)
    if (this.authService.isLoggedIn) { return true; }

    // store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Redirect to the login page
    return this.router.parseUrl('/login');
  }
  
}
