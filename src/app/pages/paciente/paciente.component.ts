import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interfaces';
import { PacienteService } from 'src/app/service/paciente.service';
import { Paciente } from '../../interfaces/paciente.interfaces';

@Component({
  selector: 'app-paciente-inicio',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})

export class PacienteComponent implements OnInit {

  public tarjetas: Card[];
  public pacientes: any;

  constructor(private pacienteService: PacienteService) {
    this.tarjetas = [
      {
        titulo: 'Lista de Pacientes',
        router: './paciente/listas',
        imagen: 'imag1'
      },
      {
        titulo: 'Lista de Pacientes',
        router: './paciente/listas',
        imagen: 'imag1'
      }
    ];

    
   }

  ngOnInit(): void {
    this.getPacientes();
  }

  getPacientes() {
    this.pacienteService.getPacientes()
        .subscribe( response => {
          console.log(response);
          this.pacientes = response;
        },
        () => {
          console.log('error...')
        });
  }


}
