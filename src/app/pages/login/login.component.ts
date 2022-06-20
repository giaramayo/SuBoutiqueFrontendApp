import { Component} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

public logo: string;
public formLogin: FormGroup;

constructor(private loginService: LoginService) { 
  this.logo = 'assets/imagenLg.jpeg'

  this.formLogin = new FormGroup({
    usuario: new FormControl('', Validators.required),
    contrasenia: new FormControl('', Validators.required)
  });

}

  ingresar() {
    let email = this.formLogin.get('usuario')?.value
    let password = this.formLogin.get('contrasenia')?.value
    console.log(email)
    console.log(password)
  }

}
