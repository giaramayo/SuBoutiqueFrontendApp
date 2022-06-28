import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSnackbarComponent } from '../../component/dialog-snackbar/dialog-snackbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public logo: string;
  public formLogin: FormGroup;
  private home: string = "/inicio"
  public cargando: boolean;

  constructor(private loginService: LoginService,
    public _snackBar: MatSnackBar,
    private router: Router) {
    this.logo = 'assets/animacionLg.gif';
    this.cargando = false;

    this.formLogin = new FormGroup({
      usuario: new FormControl('', Validators.required),
      contrasenia: new FormControl('', Validators.required)
    });

  }

  ingresar() {
    this.cargando = true;
    let usuario = {
      email: this.formLogin.get('usuario')?.value,
      password: this.formLogin.get('contrasenia')?.value
    }
    this.loginService.ingresar(usuario)
      .subscribe(resp => {
        this.loginService.setToken(resp.data.token);
        this.router.navigateByUrl(this.home);
      },
        err => {
          console.log(err)
          this._snackBar.openFromComponent(DialogSnackbarComponent, {
            data: { icono: 'report', mensaje: "No se encontró el usuario ingresado", titulo: 'Usuario Incorrecto' },
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "bottom",
            panelClass: ["snack-bar-war"]
          });
          this.cargando = false;
        },
        () => {
          this.cargando = false;
        })
  }

}
