import { Component} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSnackbarComponent } from '../../component/dialog-snackbar/dialog-snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

public logo: string;
public formLogin: FormGroup;

constructor(private loginService: LoginService,
            public _snackBar: MatSnackBar) { 
  this.logo = 'assets/imagenLg.jpeg'

  this.formLogin = new FormGroup({
    usuario: new FormControl('', Validators.required),
    contrasenia: new FormControl('', Validators.required)
  });

}

  ingresar() {
    let usuario = {
      email: this.formLogin.get('usuario')?.value,
      password: this.formLogin.get('contrasenia')?.value
    }
    console.log(usuario)
    this.loginService.ingresar(usuario)
      .subscribe( resp => {
        console.log(resp.data.token)
      }, 
      err => {
        console.log(err)
        this._snackBar.openFromComponent(DialogSnackbarComponent, {
          data: { icono: 'report', mensaje: "No se encontro el usuario ingresado", titulo: 'Usuario Incorrecto' },
          duration: 4000,
          horizontalPosition: "right",
          verticalPosition: "bottom",
          panelClass: ["snack-bar-war"]
        });
      })

  }

}
