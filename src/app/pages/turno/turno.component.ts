import { Component } from '@angular/core';
import { TurnoService } from '../../service/turno.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSnackbarComponent } from '../../component/dialog-snackbar/dialog-snackbar.component';
import { PacienteService } from '../../service/paciente.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAgendarTurnoComponent } from '../../component/dialog-agendar-turno/dialog-agendar-turno.component';
import { DialogHistorialComponent } from '../../component/dialog-historial/dialog-historial.component';
import { Router } from '@angular/router';
import { DialogCambiarEstadoComponent } from '../../component/dialog-cambiar-estado/dialog-cambiar-estado.component';
import { DialogReprogramarComponent } from '../../component/dialog-reprogramar/dialog-reprogramar.component';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.scss']
})
export class TurnoComponent {

  public selected?: Date | null;
  public hoy: Date;
  public turnos: any[];
  private routerDetalle: string = "paciente/detalle";
  public abrirPanel: boolean;
  public historial: any;
  public antecedente: any;
  public estados: any;
  public cargando: boolean;
  private tituloHistorial: string = "";

  constructor(private turnoService: TurnoService,
    private pacienteService: PacienteService,
    public _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router) {
    this.cargando = true;
    this.hoy = new Date();
    this.selected = this.hoy;
    this.abrirPanel = false;
    this.turnos = [];
    this.historial = [];
    this.estados = [];
    this.antecedente = {
      biotipo: '',
      fototipo: '',
      alergias: '',
      medicamentos: '',
      tratamientos_clinicos: ''
    };
    this.consultar();
    // this.obtenerEstados();
  }

  // obtenerEstados() {
  //   this.turnoService.getEstados()
  //     .subscribe(resp => {
  //       if (resp)
  //         this.estados = resp;
  //     },
  //       err => {
  //         console.log(err)
  //       },
  //       () => {
  //         this.cargando = false;
  //       });
  // }

  consultar() {
    let mes = this.selected?.getMonth()
    let mesM = mes ? (mes + 1).toString() : 0;
    let dia = this.selected?.getDate().toString();
    let fecha = this.selected?.getFullYear() + "-" + this.formatoVariable(mesM) + "-" + this.formatoVariable(dia)
    //  fecha = "2022-05-23"  //TODO
    this.turnoService.buscarTurnoPorFecha(fecha)
      .subscribe(resp => {
        if (resp) {
          this.turnos = resp;
        }
      },
        err => {
          console.log(err);
          this._snackBar.openFromComponent(DialogSnackbarComponent, {
            data: { icono: 'warning_amber', mensaje: "No se encontró turno para la fecha", titulo: 'Sin turnos' },
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "bottom",
            panelClass: ["snack-bar-war"]
          });
          this.cargando = false;
        },
        () => {
          this.cargando = false;
        });
  }

  formatoVariable(valor: any): string {
    return valor.length > 1 ? valor : ('0' + valor);
  }

  agendar() {
    const dialogRef = this.dialog.open(DialogAgendarTurnoComponent, {
      width: '500px',
      data: {
        titulo: "Agendar nuevo turno",
        turno: {
          _id: null,
          id_tratamiento: 0,
          id_paciente: 0,
          fecha: this.selected,
          id_hora: 0,
          hora: ''
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.consultar();
      }
    });

  }

  detalleDelPaciente(id: number) {
    this.router.navigateByUrl(this.routerDetalle + "/" + id + "/turnos");
  }

  consultarHistorial(turno: any) {
    const id = turno.id_paciente
    this.tituloHistorial = 'Historial de ' + turno.paciente[0].apellido + ", " + turno.paciente[0].nombre
    this.cargando = true;
    this.turnoService.buscarHistorialDelPaciente(id)
      .subscribe(resp => {
        if (resp) {
          this.historial = resp;
          this.getAntecedente(id);
        }
      },
        err => {
          this._snackBar.openFromComponent(DialogSnackbarComponent, {
            data: { icono: 'report', mensaje: err.error.error, titulo: 'Error' },
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "bottom",
            panelClass: ["snack-bar-err"]
          });
          this.cargando = false;
        });
  }

  getAntecedente(id: number) {
    this.pacienteService.consultarAntecedentePorPaciente(id)
      .subscribe(resp => {
        if (resp) {
          this.antecedente.biotipo = resp.biotipo;
          this.antecedente.fototipo = resp.fototipo;
          this.antecedente.afeccion_cutanea = resp.afeccion_cutanea;
          this.antecedente.alergias = resp.alergias;
          this.antecedente.medicamentos = resp.medicamentos;
          this.antecedente.tratamientos_clinicos = resp.tratamientos_clinicos;
        }
      },
        () => {
          console.log("Error al consultar antecedentes")
          this.cargando = false;
        },
        () => {
          this.dialogConsultaHistorial();
          this.cargando = false;
        });
  }

  dialogConsultaHistorial() {
    const dialogRef = this.dialog.open(DialogHistorialComponent, {
      // width: '700px',
    //  maxHeight: '90vh',
      width: '90%',
      data: {
        dataSource: this.historial,
        antecedente: this.antecedente,
        titulo: this.tituloHistorial
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.tituloHistorial = "";
      this.historial = [];
      this.antecedente = {
        biotipo: '',
        fototipo: '',
        alergias: '',
        medicamentos: '',
        tratamientos_clinicos: ''
      };
    });
  }

  // cambiarEstadoBKP(turno: any) {
  //   let estadoAnt = turno.id_estado;
  //   let paciente = turno.paciente[0].apellido + ", " + turno.paciente[0].nombre
  //   let fecha = turno.fecha_turno + " " + turno.hora;
  //   const dialogRef = this.dialog.open(DialogCambiarEstadoComponent, {
  //     width: '500px',
  //     data: {
  //       idEstado: turno.id_estado,
  //       estados: this.estados,
  //       comentario: turno.observacion,
  //       paciente,
  //       fecha
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       if (result.id !== estadoAnt) {
  //         turno.id_estado = result.id;
  //         turno.observacion = result.comentario
  //         this.modificarTurno(turno._id, turno);
  //       }
  //     }
  //   });
  // }

  cambiarEstado(turno: any) {
    const dialogRef = this.dialog.open(DialogAgendarTurnoComponent, {
      width: '500px',
      data: {
        titulo: "Editar Turno",
        turno: {
          _id: turno._id,
          id_tratamiento: turno.id_tratamiento,
          id_paciente: turno.id_paciente,
          fecha: this.selected,
          id_hora: 0,
          hora: turno.hora,
          id_estado: turno.id_estado,
          observacion: turno.observacion 
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.consultar();
      }
    });
  }

  modificarTurno(id: number, turno: any) {
    let body = {
      fecha_turno: turno.fecha_turno,
      hora: turno.hora,
      id_estado: turno.id_estado,
      id_paciente: turno.id_paciente,
      id_tratamiento: turno.id_tratamiento,
      observacion: turno.observacion,
      _id: id
    };
    this.cargando = true;
    this.turnoService.modificarTurno(id, body)
      .subscribe(resul => {
        if (resul) {
          this._snackBar.openFromComponent(DialogSnackbarComponent, {
            data: { icono: 'done', mensaje: resul.msg, titulo: 'Actualizado' },
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "bottom",
            panelClass: ["snack-bar-ok"]
          });
        }
      },
        () => {
          this._snackBar.openFromComponent(DialogSnackbarComponent, {
            data: { icono: 'report', mensaje: "Ocurrió un error al intentar modificar el turno", titulo: 'Error' },
            duration: 4000,
            horizontalPosition: "end",
            verticalPosition: "bottom",
            panelClass: ["snack-bar-err"]
          });
          this.cargando = false;
        },
        () => { this.consultar(); });

  }

  reprogramar(turno: any) {
    const dialogRef = this.dialog.open(DialogReprogramarComponent, {
      width: '370px',
      data: {
        //   idEstado: turno.id_estado,
        //  estados: this.estados
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != turno.id_estado) {
        turno.id_estado = result;
        this.modificarTurno(turno._id, turno);
      }
    });
  }

  consultarTurno(event: any) {
    this.selected = event.value
    this.consultar()
  }
}
