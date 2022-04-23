import { Component, OnInit } from '@angular/core';

interface AuthResponse {
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
  public active: boolean;
  public dataHeader: AuthResponse[] = [
    {
      name  :'Paciente',
      router:'./paciente'
    },
    {
      name  :'Producto',
      router:'./paciente'
    },
    {
      name  :'Paciente',
      router:'./paciente'
    },
    {
      name  :'Paciente',
      router:'./paciente'
    }
  ];

  constructor() { 
    this.logo = 'nombreCm'
    this.active = true;
  }

  ngOnInit(): void {
  }

  openMenu() {
    this.active = !this.active;
  }

}
