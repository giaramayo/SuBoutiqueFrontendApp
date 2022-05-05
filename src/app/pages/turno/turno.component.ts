import { Component } from '@angular/core';


@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.scss']
})
export class TurnoComponent {

  public selected?: Date | null;
  public hoy: Date;

  constructor() { 
    this.hoy = new Date();
  }


}
