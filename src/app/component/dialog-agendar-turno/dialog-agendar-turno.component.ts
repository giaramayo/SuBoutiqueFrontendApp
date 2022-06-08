import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TratamientoService } from '../../service/tratamiento.service';
import { PacienteService } from '../../service/paciente.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TurnoService } from '../../service/turno.service';

export interface DialogData {
  titulo: string,
  turno: any
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

export class DialogAgendarTurnoComponent  {

  public turno: any;
  public formTurno: FormGroup;
  public tratamientos: any;
  public pacientes: PacienteTurno[];
  public horarios: any;
  public filteredOptionsPaciente?: Observable<any>
  public selectTratamiento: number;
  public selectHorario: number;
  public selectPaciente: number;
  public fechaAgendar: Date;


  constructor(private dialogRef: MatDialogRef<DialogAgendarTurnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private tratamientoService: TratamientoService,
    private pacienteService: PacienteService,
    private turnosService: TurnoService
    ) {
    dialogRef.disableClose = true;
    this.turno = data.turno;
    this.fechaAgendar = data.turno.fecha;

    this.formTurno = new FormGroup({
      fecha: new FormControl('', Validators.required),
      hora: new FormControl('', Validators.required),
      tratamiento: new FormControl('', Validators.required),
      paciente: new FormControl('', Validators.required),
    });
    
    this.pacientes = [];
    this.selectTratamiento = this.turno.id_tratamiento;
    this.selectPaciente = this.turno.id_paciente;
    this.selectHorario = this.turno.id_hora

   
    this.buscarTratamientos();
  }

  // private _filterPaciente(value: string): any[] {
  //   const filterValue = value.toLowerCase();
  //   return this.pacientes.filter(pac => pac.apellido.toLowerCase().includes(filterValue) );
  // }

  buscarTratamientos() {
    this.tratamientoService.getAll()
      .subscribe( resp => {
        this.tratamientos = resp;
      },
      (err) => {
        console.log("Error: ", err);
      },
      () => {
        this.buscarPacientes()
      });
  }

  buscarPacientes() {
      this.pacienteService.getPacientes()
      .subscribe( resp => {
        this.pacientes = resp;
        // console.log(this.pacientes)

        // this.filteredOptionsPaciente = this.formTurno.valueChanges.pipe(
        //   startWith(''),
        //   map(pac => (pac ? this._filterPaciente(pac) : this.pacientes.slice())),
        // );
    
      },
      (err) => {
        console.log("Error: ", err);
      },
      () => {
        this.buscarHorarios()
      });
  }

  buscarHorarios() {
    let mes = this.fechaAgendar?.getMonth()
    let mesM = mes ? (mes + 1).toString() : 0;
    let fecha = this.fechaAgendar?.getFullYear() + "-" + this.formatoVariable(mesM) + "-" +  this.formatoVariable(this.fechaAgendar?.getDate())

      this.turnosService.horariosDisponibles(fecha)
        .subscribe( resp => {
            this.horarios = resp.horariosDisponibles;
        })
  }

  formatoVariable( valor: any ): string {
    return valor.length > 1 ? valor : ('0' + valor);
  }

  confirmar() {
    this.dialogRef.close(true);
  }

  cancelar() {
    this.dialogRef.close(false);
  }





  // cerrar(): void {
  //   this.dialogRef.close();
  // }

  // guardar(){
  //   if(this.data._id)
  //       this.modificar();
  //   else 
  //      this.crear();    
  // }

  // modificar() {
  //   this.TratamientoService.modificar(this.tratamiento)
  //   .subscribe( resp => {
  //      this.dialogRef.close(resp);
  //     });
  // }

  // crear() {
  //   this.TratamientoService.crear(this.tratamiento)
  //   .subscribe( resp => {
  //     this.dialogRef.close(resp);
  //   });
  // }



}
