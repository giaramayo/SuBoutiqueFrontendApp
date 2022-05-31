import { Component } from '@angular/core';
import { TurnoService } from '../../service/turno.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSnackbarComponent } from '../../component/dialog-snackbar/dialog-snackbar.component';
import { PacienteService } from '../../service/paciente.service';
import { TratamientoService } from '../../service/tratamiento.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAgendarTurnoComponent } from '../../component/dialog-agendar-turno/dialog-agendar-turno.component';
import { DialogHistorialComponent } from '../../component/dialog-historial/dialog-historial.component';
import { Router } from '@angular/router';


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
    let fecha = this.selected?.getFullYear() + "-" + this.selected?.getMonth() + "-" +  this.selected?.getDate()
    fecha = "2022-05-23"  //PRUEBA
    this.turnoService.buscarTurnoPorFecha(fecha)
      .subscribe( resp => {
        console.log(resp)
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

  agendar() {
    const dialogRef = this.dialog.open(DialogAgendarTurnoComponent, {
      width: '270px',
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
              console.log(resp)
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
      width: '650px',
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

  cambiarEstado(turno: any) {}
}
