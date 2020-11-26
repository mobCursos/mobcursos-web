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
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    
    return this.checkLogin(url);
  }

  checkLogin(url: string): true | UrlTree  {
    if (this.authService.isLoggedIn) { return true; }

    // store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Redirect to the login page with extras
    return this.router.parseUrl('/login');
  }
  
}
