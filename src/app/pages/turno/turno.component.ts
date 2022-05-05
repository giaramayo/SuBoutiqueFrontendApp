import { Component } from '@angular/core';


@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.scss']
})
export class TurnoComponent {

  public selected?: Date | null;
  public hoy: Date;
  public turnos: any[];

  public abrirPanel: boolean;

  constructor() { 
    this.hoy = new Date();
    this.abrirPanel = false;

    this.turnos = [{
      id: 1,
      paciente: {
        dni: 1111,
        nombre: "Lucia",
        apellido: "H"
      },
      tratamiento: {
        nombre: 'Limpieza'
      },
      estado: 'CONFIRMADO',
      fechaHora: new Date(),
      observacion: 'ddd'
    },
    {
      id: 1,
      paciente: {
        dni: 3333,
        nombre: "Sofia",
        apellido: "K"
      },
      tratamiento: {
        nombre: 'Masajes'
      },
      estado: 'CANCELADO',
      fechaHora: new Date(),
      observacion: 'ddd'
    }];

  }


}
