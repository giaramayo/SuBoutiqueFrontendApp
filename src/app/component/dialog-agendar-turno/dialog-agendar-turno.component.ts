import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TratamientoService } from '../../service/tratamiento.service';
import { PacienteService } from '../../service/paciente.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TurnoService } from '../../service/turno.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

export interface DialogData {
  titulo: string,
  turno: any
}

interface TurnoA {
  id_paciente: number,
  id_tratamiento: number,
  id_estado: number,
  fecha_turno: string,
  hora: string,
  observacion: string
}

interface PacienteTurno {
  apellido: string,
  calle: string,
  codigo_postal: number,
  correo: string,
  documento: string,
  edad: number,
  fecha_nacimiento: string,
  id_antecedente: number,
  id_barrio: number,
  nombre: string,
  numero: number,
  telefono: number,
  tipo_documento: string
  _id: number
}

@Component({
  selector: 'app-dialog-agendar-turno',
  templateUrl: './dialog-agendar-turno.component.html',
  styleUrls: ['./dialog-agendar-turno.component.scss']
})

export class DialogAgendarTurnoComponent {

  public turno: any;
  public formTurno: FormGroup;
  public tratamientos: any;
  public pacientes: PacienteTurno[];
  public estados: any;
  public horarios: any[];
  public filteredOptionsPaciente?: Observable<any>
  public selectTratamiento: number;
  public selectHorario: number;
  public selectEstados: number;
  public selectPaciente: number;
  public fechaAgendar: Date;
  public turnoAgendar: TurnoA;
  public fechaS: string;
  public hoy = new Date();
  public cargando: boolean;
  public clickGuardar: boolean = false;

  constructor(private dialogRef: MatDialogRef<DialogAgendarTurnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private tratamientoService: TratamientoService,
    private pacienteService: PacienteService,
    private turnosService: TurnoService
  ) {
    this.cargando = true
    dialogRef.disableClose = true;
    this.turno = data.turno;
    this.fechaAgendar = data.turno.fecha;

    this.formTurno = new FormGroup({
      fecha: new FormControl('', Validators.required),
      hora: new FormControl('', Validators.required),
      tratamiento: new FormControl('', Validators.required),
      paciente: new FormControl('', Validators.required),
      estado: new FormControl(''),
      observacion: new FormControl('')
    });

    this.pacientes = [];
    this.horarios = [];
    this.selectTratamiento = this.turno.id_tratamiento;
    this.selectPaciente = this.turno.id_paciente;
    this.selectHorario = this.turno.id_hora
    this.selectEstados = 1;

    this.turnoAgendar = {
      id_paciente: 0,
      id_tratamiento: 0,
      id_estado: 0,
      fecha_turno: '',
      hora: '',
      observacion: ''
    }

    this.fechaS = ""
    this.buscarTratamientos();
  }

  buscarTratamientos() {
    this.tratamientoService.getAll()
      .subscribe(resp => {
        this.tratamientos = resp;
      },
        (err) => {
          console.log("Error: ", err);
          this.cargando = false;
        },
        () => {
          this.buscarPacientes();
        });
  }

  buscarPacientes() {
    this.pacienteService.getPacientes()
      .subscribe(resp => {
        this.pacientes = resp;
      },
        (err) => {
          console.log("Error: ", err);
          this.cargando = false;
        },
        () => {
          let mes = this.fechaAgendar?.getMonth()
          let mesM = mes ? (mes + 1).toString() : 0;
          let dia = this.fechaAgendar?.getDate().toString();
          let fecha = this.fechaAgendar?.getFullYear() + "-" + this.formatoVariable(mesM) + "-" + this.formatoVariable(dia)
          this.fechaS = fecha;
          this.buscarHorarios()
        });
  }

  buscarHorarios() {
    this.cargando = true;
    this.turnosService.horariosDisponibles(this.fechaS)
      .subscribe(resp => {
        this.horarios = resp.horariosDisponibles;
      },
        err => {
          console.log(err)
          this.cargando = false;
        },
        () => {
          if (this.data.turno._id)
            this.getTurno();
          else
            this.cargando = false;
        })
  }

  getTurno() {
    this.formTurno.get('hora')?.setValue(this.data.turno.hora);
    this.formTurno.get('tratamiento')?.setValue(this.data.turno.id_tratamiento);
    this.formTurno.get('paciente')?.setValue(this.data.turno.id_paciente);
    this.formTurno.get('fecha')?.setValue(this.data.turno.fecha);
    this.formTurno.get('estado')?.setValue(this.data.turno.id_estado);
    this.formTurno.get('observacion')?.setValue(this.data.turno.observacion);
    this.selectEstados = this.data.turno.id_estado;

    const horario = { _id: this.horarios.length, horario: this.data.turno.hora };
    this.horarios.push(horario);
    this.obtenerEstados()
  }

  obtenerEstados() {
    this.turnosService.getEstados()
      .subscribe(resp => {
        if (resp)
          this.estados = resp;
      },
        err => {
          console.log(err)
        },
        () => {
          this.cargando = false;
        });
  }

  formatoVariable(valor: any): string {
    return valor.length > 1 ? valor : ('0' + valor);
  }

  confirmar() {
    this.clickGuardar = true;
    if (this.data.turno._id)
      this.guardarModificado();
    else
      this.guardarNuevo();
  }

  guardarModificado() {
    this.cargando = true;
    const hora = this.selectHorario.toString() === '0' ? this.data.turno.hora : this.selectHorario.toString();
    const id = this.data.turno._id;
    let body = {
      id_paciente: this.selectPaciente,
      id_tratamiento: this.selectTratamiento,
      id_estado: this.selectEstados,
      fecha_turno: this.fechaS,
      hora,
      observacion: this.formTurno.get('observacion')?.value,
      _id: id
    }
    console.log(body)
    let mensaje = "";
    this.turnosService.modificarTurno(id, body)
      .subscribe(resul => {
        if(resul)
          mensaje = resul.msg
      },
        () => {
          this.cargando = false;
          this.dialogRef.close({resul: false,  mensaje: "Ocurrió un error al intentar modificar el turno"});
        },
        () => { 
          this.dialogRef.close({resul: true,  mensaje});
        });
  }

  guardarNuevo() {
    this.turnoAgendar = {
      id_paciente: this.selectPaciente,
      id_tratamiento: this.selectTratamiento,
      id_estado: 1,
      fecha_turno: this.fechaS,
      hora: this.selectHorario.toString(),
      observacion: ''
    }
    console.log(this.turnoAgendar)
    
    this.turnosService.guardarNuevoTurno(this.turnoAgendar)
      .subscribe(resp => {
        console.log(resp);
      },
        (err) => {
          console.log("Error: ", err);
          this.cargando = false;
          this.dialogRef.close(true); 
        },
        () => {
          this.cargando = false;
          this.dialogRef.close(true); 
        });
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  seleccionarFecha(event: MatDatepickerInputEvent<Date>) {
    let mes = event.value?.getMonth()
    let mesM = mes ? (mes + 1).toString() : 0;
    let dia = event.value?.getDate().toString();
    let fecha = event.value?.getFullYear() + "-" + this.formatoVariable(mesM) + "-" + this.formatoVariable(dia)
    this.fechaS = fecha;
    this.buscarHorarios();
  }
}
