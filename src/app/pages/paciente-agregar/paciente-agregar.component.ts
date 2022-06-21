import { Component } from '@angular/core';
import { PacienteService } from '../../service/paciente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Paciente } from '../../interfaces/paciente.interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSnackbarComponent } from '../../component/dialog-snackbar/dialog-snackbar.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

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
export class PacienteAgregarComponent {

  public MAX_EDAD = 99;
  public MIN_EDAD = 14;

  public disabledOK: boolean;
  public routerVolver: any;
  public step: number;
  public tiposDocumentos: NameValue[];
  public formPaciente: FormGroup;
  public startDate = new Date(1990, 0, 1);
  public localidades: Localidad[];
  public biotipos: NameValue[];
  public fototipos: NameValue[];
  public tienealergias = false;

  private paciente!: Paciente;
  public pacienteDetalle: any;
  public edad: number;

  constructor(public _snackBar: MatSnackBar,
    private routerAct: ActivatedRoute,
    private pacienteService: PacienteService,
    private router: Router) {

    this.disabledOK = true;
    this.step = 0;
    // this.routerVolver = "/paciente";
    this.routerVolver = this.routerAct.snapshot.paramMap.get('pages');
    this.localidades = [];
    this.edad = 0;

    this.formPaciente = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      tipo_documento: new FormControl('', Validators.required),
      //documento: new FormControl('', [Validators.required, Validators.pattern(/^(20|23|24|27|30|33|34)([0-9]{9}|[0-9]{8})([0-9])$/g)]), // Solamente valida CUIT
      documento: new FormControl('', [Validators.required, Validators.pattern(/^(20|23|24|27|30|33|34)([0-9]{9}|[0-9]{8})([0-9])$|^[0-9]{8}$/g)]),
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
      tratamientos_clinicos: new FormControl(''),
      edad: new FormControl(0, [Validators.max(this.MAX_EDAD), Validators.min(this.MIN_EDAD)])
    });

    this.tiposDocumentos = [
      { value: 1, name: 'DNI' },
      { value: 2, name: 'CUIT' },
      { value: 3, name: 'Pasaporte' }
    ];

    this.biotipos = [
      { value: 1, name: 'Piel Normal' },
      { value: 2, name: 'Piel Grasa' },
      { value: 3, name: 'Piel Seca' },
      { value: 4, name: 'Piel Mixta' }
    ];

    this.fototipos = [
      { value: 1, name: 'Fototipo I' },
      { value: 2, name: 'Fototipo II' },
      { value: 3, name: 'Fototipo III' },
      { value: 4, name: 'Fototipo IV' },
      { value: 5, name: 'Fototipo V' }
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


  volver() {
    this.router.navigateByUrl(this.routerVolver);
  }

  guardar() {
    this.paciente = {
      documento: this.formPaciente.get('documento')?.value,
      tipo_documento: this.formPaciente.get('tipo_documento')?.value.name,
      nombre: this.formPaciente.get('nombre')?.value,
      apellido: this.formPaciente.get('apellido')?.value,
      calle: this.formPaciente.get('calle')?.value,
      numero: this.formPaciente.get('numero')?.value,
      codigo_postal: this.formPaciente.get('codigo_postal')?.value,
      barrio: {
        _id: this.formPaciente.get('localidad')?.value._id,
        descripcion: this.formPaciente.get('localidad')?.value.descripcion,
      },
      telefono: this.formPaciente.get('telefono')?.value,
      correo: this.formPaciente.get('email')?.value,
      fecha_nacimiento: this.formPaciente.get('fecha_nacimiento')?.value,
      edad: this.formPaciente.get('edad')?.value,
      antecedente: {
        biotipo: this.formPaciente.get('biotipo')?.value.name,
        fototipo: this.formPaciente.get('fototipo')?.value.name,
        afeccion_cutanea: this.formPaciente.get('afeccion_cutanea')?.value,
        alergias: this.formPaciente.get('alergias')?.value,
        medicamentos: this.formPaciente.get('medicamentos')?.value,
        tratamientos_clinicos: this.formPaciente.get('tratamientos_clinicos')?.value,
      }
    }

    this.pacienteService.agregarPaciente(this.paciente)
      .subscribe(resp => {
        if (resp) {
          this._snackBar.openFromComponent(DialogSnackbarComponent, {
            data: {
              icono: 'done',
              mensaje: "Se dio de alta al paciente " + this.paciente.apellido + ", " + this.paciente.nombre,
              titulo: 'Guardar'
            },
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "bottom",
            panelClass: ["snack-bar-ok"]
          });
          this.volver();
        }
      },
        err => {
          console.log(err);
          this._snackBar.openFromComponent(DialogSnackbarComponent, {
            data: { icono: 'report', mensaje: "Ocurrio un error al guardar el paciente", titulo: 'Error' },
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "bottom",
            panelClass: ["snack-bar-err"]
          });
        });

  }

  getLocalidad() {
    this.pacienteService.getLocalidad()
      .subscribe(resp => {
        this.localidades = resp;
      },
        err => {
          this._snackBar.openFromComponent(DialogSnackbarComponent, {
            data: { icono: 'report', mensaje: "Ocurrio un error consultar Localidades", titulo: 'Error' },
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "bottom",
            panelClass: ["snack-bar-err"]
          });
        });
  }

  calcularEdad(event: MatDatepickerInputEvent<Date>) {
    let fechaSelect = Math.abs(Date.now() - event.value!.getTime());
    this.edad = Math.floor((fechaSelect / (1000 * 3600 * 24))/365);
  }

}
