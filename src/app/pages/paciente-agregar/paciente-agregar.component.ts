import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../service/paciente.service';

@Component({
  selector: 'app-paciente-agregar',
  templateUrl: './paciente-agregar.component.html',
  styleUrls: ['./paciente-agregar.component.scss']
})
export class PacienteAgregarComponent  {

  public disabledOK : boolean;

  step = 0;

   constructor( private pacienteService: PacienteService ) {
      this.disabledOK = true;
    }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

 


}
