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

  constructor( private turnoService: TurnoService,
              private pacienteService: PacienteService,
               public _snackBar: MatSnackBar,
               public dialog: MatDialog,
               private router: Router) { 
    this.hoy = new Date();
    this.selected = this.hoy;
    this.abrirPanel = false;
    this.turnos = [];
    this.consultar();
    this.historial = [];
    this.estados = [];
    this.antecedente = {
                  biotipo: '',
                  fototipo: '',
                  alergias: '',
                  medicamentos: '',
                  tratamientos_clinicos: ''
                };
    this.obtenerEstados();
  }

  obtenerEstados(){
    this.turnoService.getEstados()
        .subscribe( resp => {
          if(resp)
            this.estados = resp;
        });
  }

  editar() {
    console.log("das")
  }
  
  consultar() {
    let mes = this.selected?.getMonth()
    let mesM = mes ? (mes + 1).toString() : 0;
    let fecha = this.selected?.getFullYear() + "-" + this.formatoVariable(mesM) + "-" +  this.formatoVariable(this.selected?.getDate())
  //  fecha = "2022-05-23"  //TODO
  console.log(fecha)
    this.turnoService.buscarTurnoPorFecha(fecha)
      .subscribe( resp => {
        if(resp){
          this.turnos = resp;
        }
      },
      err => {
        console.log(err);
        this._snackBar.openFromComponent(DialogSnackbarComponent,{ 
          data: { icono: 'warning_amber', mensaje: "No se encontro turno para la fecha", titulo: 'Sin turnos'},
          duration: 4000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["snack-bar-war"]
        });
  
      });
  }

  formatoVariable( valor: any ): string {
    return valor.length > 1 ? valor : ('0' + valor);
  }

  agendar() {
    const dialogRef = this.dialog.open(DialogAgendarTurnoComponent, {
      width: '500px',
      data: {
        fecha: this.selected
        }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

  }

  detalleDelPaciente( id: number ){
    this.router.navigateByUrl(this.routerDetalle + "/" + id + "/turnos");
  }

  consultarHistorial(id: number) {
    this.turnoService.buscarHistorialDelPaciente(id)
        .subscribe( resp => {
          if(resp) {
            this.historial = resp;
            this.getAntecedente(id);
          }
              
        },
        err => {
          this._snackBar.openFromComponent(DialogSnackbarComponent,{ 
            data: { icono: 'report', mensaje: err.error.error, titulo: 'Error'},
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ["snack-bar-err"]
          });
        });
  }

  getAntecedente(id: number) {
      this.pacienteService.consultarAntecedentePorPaciente(id)
          .subscribe( resp => {
            if(resp){
              this.antecedente.biotipo = resp.biotipo;
              this.antecedente.fototipo = resp.fototipo;
              this.antecedente.afeccion_cutanea = resp.afeccion_cutanea;
              this.antecedente.alergias = resp.alergias;
              this.antecedente.medicamentos = resp.medicamentos;
              this.antecedente.tratamientos_clinicos = resp.tratamientos_clinicos;
            }
          },
          () => {
            console.log("error al consultar antecedentes")
          },
          () => {
            this.dialogConsultaHistorial();
          });
  }

  dialogConsultaHistorial() {
      const dialogRef = this.dialog.open(DialogHistorialComponent, {
      width: '700px',
      data: {
          dataSource: this.historial,
          antecedente: this.antecedente,
          titulo: 'Historial'
        }
    });

    dialogRef.afterClosed().subscribe(result => {
       console.log(result)
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

  cambiarEstado(turno: any) {
    let estadoAnt = turno.id_estado;
    const dialogRef = this.dialog.open(DialogCambiarEstadoComponent, {
      width: '270px',
      data: {
        idEstado: turno.id_estado,
        estados: this.estados
        }
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result !== estadoAnt) {
          console.log(result)
          turno.id_estado = result;
         this.modificarTurno( turno._id, turno );
        }
    });
  }

  modificarTurno(id: number, turno: any){
    let body = {
            fecha_turno: turno.fecha_turno,
            hora: turno.hora,
            id_estado: turno.id_estado,
            id_paciente: turno.id_paciente,
            id_tratamiento: turno.id_tratamiento,
            observacion: turno.observacion,
            _id: id
    };

    this.turnoService.modificarTurno(id, body)
        .subscribe( resul => {
          // if(resul) {
          //   // this._snackBar.openFromComponent(DialogSnackbarComponent,{ 
          //   //   data: { icono: 'done', mensaje: resul.msg, titulo: 'Actualizado'},
          //   //   duration: 4000,
          //   //   horizontalPosition: "right",
          //   //   verticalPosition: "top",
          //   //   panelClass: ["snack-bar-ok"]
          //   // });
          // }
        },
        () => {
          this._snackBar.openFromComponent(DialogSnackbarComponent,{ 
            data: { icono: 'report', mensaje: "Ocurrio un error al intentar modificar el turno", titulo: 'Error'},
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ["snack-bar-err"]
          });
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
        if(result != turno.id_estado) {
          turno.id_estado = result;
          this.modificarTurno( turno._id, turno );
        }
    });
  }
}
