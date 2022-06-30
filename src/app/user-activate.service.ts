import { Injectable } from '@angular/core';
import { LoginService } from './service/login.service';
import { CanActivate, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSnackbarComponent } from './component/dialog-snackbar/dialog-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class UserActivateService implements CanActivate {

  constructor(private authService: LoginService,
              private router: Router,
              public _snackBar: MatSnackBar) { }

  canActivate() {   
    if (!this.authService.getToken()) {
        // this._snackBar.openFromComponent(DialogSnackbarComponent, {
        //   data: { icono: 'report', mensaje: "No se encuentra logeado, por favor ingresar un usuario y contraseña.", titulo: 'Usuario no Autenticado' },
        //   duration: 4000,
        //   horizontalPosition: "right",
        //   verticalPosition: "bottom",
        //   panelClass: ["snack-bar-war"]
        // });
        this.router.navigate(['/login']);
        return false;
    }
    return true;
  };
}