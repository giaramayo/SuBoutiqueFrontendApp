import { Component } from '@angular/core';
import { TurnoService } from '../../service/turno.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSnackbarComponent } from '../../component/dialog-snackbar/dialog-snackbar.component';
import { PacienteService } from '../../service/paciente.service';
import { TratamientoService } from '../../service/tratamiento.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAgendarTurnoComponent } from '../../component/dialog-agendar-turno/dialog-agendar-turno.component';


@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.scss']
})
export class TurnoComponent {

  public selected?: Date | null;
  public hoy: Date;
  public turnos: any[];

  public abrirPanel: boolean;

  constructor( private turnoService: TurnoService,
               public _snackBar: MatSnackBar,
               public dialog: MatDialog) { 
    this.hoy = new Date();
    this.selected = this.hoy;
    this.abrirPanel = false;
    this.turnos = [];
    this.consultar();
    // this.turnos = [{
    //   id: 1,
    //   paciente: {
    //     dni: 1111,
    //     nombre: "Lucia",
    //     apellido: "H"
    //   },
    //   tratamiento: {
    //     nombre: 'Limpieza'
    //   },
    //   estado: 'CONFIRMADO',
    //   fechaHora: new Date(),
    //   observacion: 'ddd'
    // },
    // {
    //   id: 1,
    //   paciente: {
    //     dni: 3333,
    //     nombre: "Sofia",
    //     apellido: "K"
    //   },
    //   tratamiento: {
    //     nombre: 'Masajes'
    //   },
    //   estado: 'CANCELADO',
    //   fechaHora: new Date(),
    //   observacion: 'ddd'
    // }];

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

}
