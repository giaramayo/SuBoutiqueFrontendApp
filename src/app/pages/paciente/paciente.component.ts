import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PacienteService } from 'src/app/service/paciente.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-paciente-inicio',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})

export class PacienteComponent implements OnInit {

  public pacientes: any;
  public pacienteForm: FormGroup;
  public botonFiltroLoading: boolean;
  public routerAgregar: string;

  constructor( private _snackBar: MatSnackBar,
               private pacienteService: PacienteService,
               private router: Router) {  

    this.botonFiltroLoading = false;
    this.routerAgregar = '/paciente/agregar'
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
    this.pacienteService.getPacientes().subscribe( resp => {
          this.pacientes = resp;
        });
  }

  buscarPacientes(){
    this.botonFiltroLoading = true;
    this.pacientes.filter()
   /*
    this.pacienteService.postFiltrarPaciente(
      this.pacienteForm.get('nombre')?.value,
      this.pacienteForm.get('apellido')?.value,
      this.pacienteForm.get('dni')?.value
    ).subscribe(resp => {
      console.log(resp);
      this.pacientes = resp;
    },
    error => {
      this.botonFiltroLoading = false;
      this.openSnackBar(error.error.error, '');
    },
    () => {
      this.botonFiltroLoading = false;
    });
*/
  }

  validar(): boolean {
    return!( this.pacienteForm.get('nombre')?.value 
          || this.pacienteForm.get('apellido')?.value
          || this.pacienteForm.get('dni')?.value);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  agregar(){
    this.router.navigateByUrl(this.routerAgregar);
  }


}
