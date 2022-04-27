import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interfaces';

@Component({
  selector: 'app-paciente-inicio',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  public tarjetas: Card[];

  constructor() {
    this.tarjetas = [
      {
        titulo: 'Lista de Pacientes',
        router: './paciente/listas',
        imagen: 'imag1'
      },
      {
        titulo: 'Lista de Pacientes',
        router: './paciente/listas',
        imagen: 'logoR'
      }
    ];
   }

  ngOnInit(): void {
  }

}
