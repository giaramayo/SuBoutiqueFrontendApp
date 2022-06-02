import { Component, Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PacienteService } from '../../service/paciente.service';
import { TurnoService } from '../../service/turno.service';
import { DialogHistorialComponent } from '../dialog-historial/dialog-historial.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSnackbarComponent } from '../dialog-snackbar/dialog-snackbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-paciente',
  templateUrl: './lista-paciente.component.html',
  styleUrls: ['./lista-paciente.component.scss'],
})

export class ListaPacienteComponent  {

  @Input() dataSource: any;
  public displayedColumns: string[] = ['dni', 'nomApe', 'fecha', 'tel', 'consulta', 'detalle'];
  private routerDetalle: string = "paciente/detalle";

  private historial: any[];
  private antecedente: any;

  constructor(public _snackBar: MatSnackBar,
              public dialog: MatDialog,
              private pacienteService: PacienteService,
              private turnoService: TurnoService,
              private router: Router) {

                this.historial = [];
                this.antecedente = {
                  biotipo: '',
                  fototipo: '',
                  alergias: '',
                  medicamentos: '',
                  tratamientos_clinicos: ''
                };
             
              }

  detalle( element: any ){
      this.router.navigateByUrl(this.routerDetalle + "/" + element._id + "/paciente");
  }

  getPacientes() {
    this.pacienteService.getPacientes()
    .subscribe( resp => {
          this.dataSource = resp;
        });
  }

  consultarHistorias(element: any) {
    this.turnoService.buscarHistorialDelPaciente(element._id)
        .subscribe( resp => {
          if(resp) {
            this.historial = resp;
            this.getAntecedente(element);
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

  getAntecedente(element: any) {
      this.pacienteService.consultarAntecedentes(element.id_antecedente)
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
            this.dialogConsultaHistorial(element);
          });
  }

  dialogConsultaHistorial(element: any) {
      const dialogRef = this.dialog.open(DialogHistorialComponent, {
      width: '700px',
      data: {
          dataSource: this.historial,
          paciente: element,
          antecedente: this.antecedente,
          titulo: 'Historial de ' + element.apellido +', ' + element.nombre
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

  // eliminar( element: any){
  //   const dialogRef = this.dialog.open(ConfirmacionComponent, {
  //     width: '270px',
  //     data: {
  //         msj: "¿Esta seguro que desea eliminar el paciente \"" + element.apellido + ", " + element.nombre + "\"?",
  //         titulo: "Eliminar"
  //       }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //      if(result)
  //        this.eliminarPaciente(element.documento);
  //   });
  // }
  // eliminarPaciente(documento: number) {
  //     this.pacienteService.eliminar(documento)
  //       .subscribe(resp => {
  //         console.log(resp);
  //       },
  //       () => undefined,
  //       () => {
  //         this.getPacientes();
  //       });
  // }

}
