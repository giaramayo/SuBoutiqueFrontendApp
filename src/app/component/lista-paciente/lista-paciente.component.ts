import { Component, Input} from '@angular/core';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';
import { MatDialog } from '@angular/material/dialog';
import { PacienteService } from '../../service/paciente.service';
import { TurnoService } from '../../service/turno.service';


@Component({
  selector: 'app-lista-paciente',
  templateUrl: './lista-paciente.component.html',
  styleUrls: ['./lista-paciente.component.scss'],
})


export class ListaPacienteComponent  {

  @Input() dataSource: any;
  public displayedColumns: string[] = ['dni', 'nomApe', 'fecha', 'tel', 'consulta', 'detalle'];
  
  constructor(public dialog: MatDialog,
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
    this.turnoService.buscarTurnosPorPaciente(element._id)
        .subscribe( resp => {
          console.log(resp);
        },
        err => {
          console.log(err.error.error)
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
