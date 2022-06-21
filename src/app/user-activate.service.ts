import { Injectable } from '@angular/core';
import { LoginService } from './service/login.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserActivateService implements CanActivate {

  constructor(private authService: LoginService, private router: Router) { }

  canActivate() {   
    if (!this.authService.getToken()) {
        console.log('No estás logueado');
        this.router.navigate(['/login']);
        return false;
    }

    return true;
  };

  

}