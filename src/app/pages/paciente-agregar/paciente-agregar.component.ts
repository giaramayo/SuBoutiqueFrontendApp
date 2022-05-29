import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../service/paciente.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Paciente } from '../../interfaces/paciente.interfaces';

interface NameValue {
  value: number,
  name: string    
}

interface Localidad {
  _id: number,
  descripcion: string
}

@Component({
  selector: 'app-paciente-agregar',
  templateUrl: './paciente-agregar.component.html',
  styleUrls: ['./paciente-agregar.component.scss']
})
export class PacienteAgregarComponent  {

  public disabledOK : boolean;
  public routerVolver: string;
  public step :number;
  public tiposDocumentos : NameValue[];
  public formPaciente: FormGroup;
  public startDate = new Date(1990, 0, 1);
  public localidades: Localidad[];
  public biotipos : NameValue[];
  public fototipos : NameValue[];
  public tienealergias = false;

  private paciente!: Paciente;

   constructor( private pacienteService: PacienteService,
                private router: Router ) {
      this.disabledOK = true;
      this.step = 0;
      this.routerVolver = "/paciente";
      this.localidades = [];
      
      this.formPaciente = new FormGroup({
        nombre: new FormControl('', Validators.required),
        apellido: new FormControl('', Validators.required),
        tipo_documento: new FormControl('', Validators.required),
        documento: new FormControl('', [Validators.required, Validators.pattern(/^(20|23|24|27|30|33|34)([0-9]{9}|[0-9]{8})([0-9])$/g)]),
        fecha_nacimiento: new FormControl('', Validators.required),
        telefono: new FormControl('', Validators.minLength(10)),
        email: new FormControl('', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')),
        calle: new FormControl('', Validators.required),
        numero: new FormControl('', Validators.required),
        codigo_postal: new FormControl('', Validators.required),
        localidad: new FormControl('', Validators.required),
        biotipo: new FormControl('', Validators.required),
        fototipo: new FormControl('', Validators.required),
        afeccion_cutanea: new FormControl(''),
        alergias: new FormControl(''),
        medicamentos: new FormControl(''),
        tratamientos_clinicos: new FormControl('')
      });

      this.tiposDocumentos = [
        {value: 1, name: 'DNI'},
        {value: 2, name: 'CUIT'},
        {value: 3, name: 'Pasaporte'}
      ];

      this.biotipos = [
        {value: 1, name: 'Piel Normal'},
        {value: 2, name: 'Piel Grasa'},
        {value: 3, name: 'Piel Seca'},
        {value: 4, name: 'Piel Mixta'}
      ];

      this.fototipos = [
        {value: 1, name: 'Fototipo I'},
        {value: 2, name: 'Fototipo II'},
        {value: 3, name: 'Fototipo III'},
        {value: 4, name: 'Fototipo IV'},
        {value: 5, name: 'Fototipo V'}
      ];

      this.getLocalidad();

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

  guardar(){
    this.paciente = {
      documento     : this.formPaciente.get('documento')?.value,
      tipo_documento : this.formPaciente.get('tipo_documento')?.value.name,
      nombre        : this.formPaciente.get('nombre')?.value,
      apellido      : this.formPaciente.get('apellido')?.value,
      calle         : this.formPaciente.get('calle')?.value,
      numero        : this.formPaciente.get('numero')?.value,
      codigo_postal : this.formPaciente.get('codigo_postal')?.value,
      barrio        : {
        _id: this.formPaciente.get('localidad')?.value._id,
        descripcion: this.formPaciente.get('localidad')?.value.descripcion,
      },
      telefono      : this.formPaciente.get('telefono')?.value,
      correo        : this.formPaciente.get('correo')?.value,
      fecha_nacimiento : this.formPaciente.get('fecha_nacimiento')?.value,
      antecedente   : {
        biotipo              : this.formPaciente.get('biotipo')?.value.name,
        fototipo             : this.formPaciente.get('fototipo')?.value.name,
        afeccion_cutanea     : this.formPaciente.get('afeccion_cutanea')?.value,
        alergias             : this.formPaciente.get('alergias')?.value,
        medicamentos         : this.formPaciente.get('medicamentos')?.value,
        tratamientos_clinicos: this.formPaciente.get('tratamientos_clinicos')?.value,
      }
    }

    this.pacienteService.agregarPaciente(this.paciente)
      .subscribe( resp => {
        console.log(resp);
      },
      err => {
        console.log(err);
      });

  } 

  getLocalidad() {
    this.pacienteService.getLocalidad()
      .subscribe( resp => {
          this.localidades = resp;
      });
 }

}
