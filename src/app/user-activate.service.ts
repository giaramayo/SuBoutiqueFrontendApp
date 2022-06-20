import { Injectable } from '@angular/core';
import { LoginService } from './service/login.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserActivateService implements CanActivate {

  constructor(private authService: LoginService, private router: Router) { }

  canActivate() {
    // If the user is not logged in we'll send them back to the home page
    
    if (!this.authService.getToken()) {
        console.log('No estás logueado');
        this.router.navigate(['/login']);
        return false;
    }

    return true;
  };

}