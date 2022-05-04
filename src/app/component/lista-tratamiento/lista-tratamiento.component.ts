import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lista-tratamiento',
  templateUrl: './lista-tratamiento.component.html',
  styleUrls: ['./lista-tratamiento.component.scss']
})
export class ListaTratamientoComponent {

  @Input() dataSource: any;
  public displayedColumns: string[] = ['descripcion', 'duracion', 'precio', 'modif', 'elim' ];
  
  constructor() { }

  modificar( element: any){

  }

  eliminar( element: any){

  }


}
