import { Component } from '@angular/core';


@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.scss']
})
export class TurnoComponent {

  public selected?: Date | null;
  public hoy: Date;

  public abrirPanel: boolean;

  constructor() { 
    this.hoy = new Date();
    this.abrirPanel = false;
  }


}
