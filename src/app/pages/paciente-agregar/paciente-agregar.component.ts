import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../service/paciente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paciente-agregar',
  templateUrl: './paciente-agregar.component.html',
  styleUrls: ['./paciente-agregar.component.scss']
})
export class PacienteAgregarComponent  {

  public disabledOK : boolean;
  public routerVolver: string;
  public step :number;

   constructor( private pacienteService: PacienteService,
                private router: Router ) {
      this.disabledOK = true;
      this.step = 0;
      this.routerVolver = "/paciente"
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


  volver(){
    this.router.navigateByUrl(this.routerVolver);
  }

 


}
