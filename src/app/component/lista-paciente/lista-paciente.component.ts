import { Component, Input} from '@angular/core';


@Component({
  selector: 'app-lista-paciente',
  templateUrl: './lista-paciente.component.html',
  styleUrls: ['./lista-paciente.component.scss'],
})


export class ListaPacienteComponent  {

  @Input() dataSource: any;
  public displayedColumns: string[] = ['dni', 'nomApe', 'fecha', 'tel', 'modif', 'detalle', 'elim' ];
  
  constructor() {
  }

  modificar( element: any){

  }

  eliminar( element: any){

  }

  detalle( element: any ){

  }

}
