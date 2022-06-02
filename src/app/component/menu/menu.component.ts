import { Component } from '@angular/core';


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

  constructor() { 
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
      // {
      //   name  :'Productos',
      //   router:'./paciente',
      // },
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
      },
      {
        name  :'Sing up',
        router:'./paciente'
      }
    ];
  }

  openSidenav(){
    this.mostrarSNV = !this.mostrarSNV;
  }

}
