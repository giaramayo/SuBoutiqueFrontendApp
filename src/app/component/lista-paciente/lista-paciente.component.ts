import { Component, Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PacienteService } from '../../service/paciente.service';
import { TurnoService } from '../../service/turno.service';
import { DialogHistorialComponent } from '../dialog-historial/dialog-historial.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSnackbarComponent } from '../dialog-snackbar/dialog-snackbar.component';

@Component({
  selector: 'app-lista-paciente',
  templateUrl: './lista-paciente.component.html',
  styleUrls: ['./lista-paciente.component.scss'],
})

export class ListaPacienteComponent  {

  @Input() dataSource: any;
  public displayedColumns: string[] = ['dni', 'nomApe', 'fecha', 'tel', 'consulta', 'detalle'];
  
  constructor(public _snackBar: MatSnackBar,
              public dialog: MatDialog,
              private pacienteService: PacienteService,
              private turnoService: TurnoService) {}

  detalle( element: any ){
      console.log("detalle")
      console.log(element)
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
          if(resp)
              this.dialogConsultaHistorial(resp, element);
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

  dialogConsultaHistorial(lista: any, element: any) {
      const dialogRef = this.dialog.open(DialogHistorialComponent, {
      width: '650px',
      data: {
          dataSource: lista,
          paciente: element
        }
    });

    dialogRef.afterClosed().subscribe(result => {
       console.log(result)
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
