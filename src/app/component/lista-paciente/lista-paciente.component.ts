import { Component, ViewChild, Input} from '@angular/core';


@Component({
  selector: 'app-lista-paciente',
  templateUrl: './lista-paciente.component.html',
  styleUrls: ['./lista-paciente.component.css'],
})


export class ListaPacienteComponent  {

  @Input() dataSource: any;
  public displayedColumns: string[] = ['dni', 'nomApe', 'fecha', 'tel', 'dom' ];


  
  constructor() {
  }


}
