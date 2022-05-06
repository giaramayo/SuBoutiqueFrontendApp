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

    this.pacienteService.getFiltrarPaciente(
      this.pacienteForm.get('nombre')?.value,
      this.pacienteForm.get('apellido')?.value,
      this.pacienteForm.get('dni')?.value
    ).subscribe(response => {
      console.log(response);
    },
    error => {
      this.botonFiltroLoading = false;
      console.log(error.error.error);
      this.openSnackBar('dasd', 'Dance');
    },
    () => {
      this.botonFiltroLoading = false;
    });

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  agregar(){
    this.router.navigateByUrl(this.routerAgregar);
  }


  // esEmailValido() {
  //   const  email = this.pacienteForm.get('nombre')?.value
  //   console.log(email)
  //   const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   // /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //   console.log(!email.match(EMAIL_REGEX))

  //   return !email.match(EMAIL_REGEX);
  // }

}
