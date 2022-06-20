import { Component} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

public logo: string;
public formLogin: FormGroup;

constructor(private authService: AuthService) { 
  this.logo = 'assets/imagenLg.jpeg'

  this.formLogin = new FormGroup({
    usuario: new FormControl('', Validators.required),
    contrasenia: new FormControl('', Validators.required)
  });

}

  ingresar() {
    console.log(this.formLogin)
  }

}
