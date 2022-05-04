import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';

import { PacienteService } from 'src/app/service/paciente.service';

@Component({
  selector: 'app-paciente-inicio',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})

export class PacienteComponent implements OnInit {

  public pacientes: any;
  public pacienteForm: FormGroup;
  public botonFiltroLoading: boolean;


  constructor(private pacienteService: PacienteService) {  

    this.botonFiltroLoading = false;

     this.pacienteForm = new FormGroup({
        nombre:  new FormControl(""),
        apellido: new FormControl(""),
        dni: new FormControl("")
     });

   }

  ngOnInit(): void {
    this.getPacientes();
  }

  getPacientes() {
    this.pacienteService.getPacientes()
        .subscribe( response => {
          console.log(response);
          this.pacientes = response;
        },
        () => {
          console.log('error...')
        });
  }

  buscarPacientes(){
    this.botonFiltroLoading = true;

    // this.pacienteService.getFiltrarPaciente(
    //   this.pacienteForm.get('nombre').value,
    //   this.pacienteForm.get('apellido').value,
    //   this.pacienteForm.get('dni').value
    // ).subscribe(response => {
    //   console.log(response);
    // });

  }


}
