import { Component, DoCheck, OnInit } from '@angular/core';
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

export class MenuComponent implements OnInit, DoCheck {

  public logo: string;
  public mostrarSNV: boolean;
  public optionsMenu: OptionMenu[];
  public routerSalir: string = '/login'
  public isLoggedIn$: boolean = false; 

  constructor(private loginService: LoginService,
              private router: Router) { 
    this.logo = 'nombreCm';
    this.mostrarSNV = false;
    this.isLoggedIn$ = this.loginService.isCheckLogeado;
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
        name  :'Estadísticas',
        router:'./estadisticas',
      }
    ];
  }

  ngOnInit() {
    this.isLoggedIn$ = this.loginService.isCheckLogeado;
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.isLoggedIn$ = this.loginService.isCheckLogeado;
    
  }

  openSidenav(){
      this.mostrarSNV = !this.mostrarSNV;
  }

  cerrarSeccion(){
    this.loginService.cerrarSeccion();
    this.router.navigateByUrl(this.routerSalir);
  }
}
