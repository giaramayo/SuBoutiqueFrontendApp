import { Component } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';


interface OptionMenu {
  name: string;
  router?: string;
};

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent  {

  public logo: string;
  public mostrarSNV: boolean;
  public optionsMenu: OptionMenu[];
  public routerSalir: string = '/login'

  constructor(private loginService: LoginService,
              private router: Router) { 
    this.logo = 'nombreCm';
    this.mostrarSNV = false;
    this.optionsMenu = [
      {
        name  :'Inicio',
        router:'./inicio',
      },
      {
        name  :'Pacientes',
        router:'./paciente',
      },
      {
        name  :'Turnos',
        router:'./turnos',
      },
      {
        name  :'Tratamientos',
        router:'./tratamientos',
      },
      {
        name  :'Estadisticas',
        router:'./estadisticas',
      }
    ];
  }

  openSidenav(){
      this.mostrarSNV = !this.mostrarSNV;
  }

  cerrarSeccion(){
    this.loginService.setToken('');
    this.router.navigateByUrl(this.routerSalir);
  }
}
