import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lista-historial',
  templateUrl: './lista-historial.component.html',
  styleUrls: ['./lista-historial.component.scss']
})
export class ListaHistorialComponent  {

  @Input() dataSource: any;
  public displayedColumns: string[] = ['fecha', 'hora', 'tratamiento', 'observacion'];

  constructor() { }

}
