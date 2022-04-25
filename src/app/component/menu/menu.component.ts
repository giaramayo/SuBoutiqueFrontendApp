import { Component, OnInit } from '@angular/core';

interface OptionMenu {
  name: string;
  router?: string;
};

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  public logo: string;
  public mostrarSNV: boolean;
  public optionsMenu: OptionMenu[];

  constructor() { 
    this.logo = 'nombreCm';
    this.mostrarSNV = false;
    this.optionsMenu = [
      {
        name  :'Inicio',
        router:'/'
      },
      {
        name  :'Pacientes',
        router:'./paciente'
      },
      {
        name  :'Productos',
        router:'./paciente'
      },
      {
        name  :'Turnos',
        router:'./paciente'
      },
      {
        name  :'Tratamientos',
        router:'./paciente'
      },
      {
        name  :'Estadisticas',
        router:'./paciente'
      },
      {
        name  :'Sing up',
        router:'./paciente'
      }
    ];
  }

  ngOnInit(): void {
  }

  openSidenav(){
    this.mostrarSNV = !this.mostrarSNV;
  }

}
