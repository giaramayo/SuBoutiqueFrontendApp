import { Component, Input } from '@angular/core';
import { PacienteService } from '../../service/paciente.service';

@Component({
  selector: 'app-antecedentes',
  templateUrl: './antecedentes.component.html',
  styleUrls: ['./antecedentes.component.scss']
})
export class AntecedentesComponent {

  @Input() antecedente: any;

  constructor(private pacienteService: PacienteService) { 
  }

}
