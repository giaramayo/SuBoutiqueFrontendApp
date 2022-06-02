import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogModificarTratamientoComponent } from '../dialog-modificar-tratamiento/dialog-modificar-tratamiento.component';
import { TratamientoService } from '../../service/tratamiento.service';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSnackbarComponent } from '../dialog-snackbar/dialog-snackbar.component';

@Component({
  selector: 'app-lista-tratamiento',
  templateUrl: './lista-tratamiento.component.html',
  styleUrls: ['./lista-tratamiento.component.scss']
})
export class ListaTratamientoComponent {

  @Input() dataSource: any;
  public displayedColumns: string[] = ['descripcion', 'duracion', 'precio', 'modif', 'elim' ];
  
  constructor(public _snackBar: MatSnackBar,
              public dialog: MatDialog,
              private tratamientoService: TratamientoService) { }

  modificar( element: any){
    element.titulo = 'Modificar Tratamiento';
    const dialogRef = this.dialog.open(DialogModificarTratamientoComponent, {
      width: '300px',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getTratamientos();
        this._snackBar.openFromComponent(DialogSnackbarComponent,{ 
          data: { icono: 'done', mensaje: result.msg, titulo: 'Modificado'},
          duration: 4000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["snack-bar-ok"]
        });
      }

    });
  }

  getTratamientos(){
    this.tratamientoService.getAll().subscribe( resp => {
      this.dataSource = resp;
    }, () => {
      this._snackBar.openFromComponent(DialogSnackbarComponent,{ 
        data: { icono: 'report', mensaje: "Ocurrio un error al consultar los tratamientos", titulo: 'Error'},
        duration: 4000,
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: ["snack-bar-err"]
      });
    });
  }

  eliminar( element: any){
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      //width: '270px',
      data: {
          msj: "¿Esta seguro que desea eliminar \"" + element.descripcion + "\"?",
          titulo: "Eliminar"
        }
    });
    dialogRef.afterClosed().subscribe(result => {
        if(result)
          this.elimitarTratamiento(element._id)
    });
  }

  elimitarTratamiento(id: number) {
      this.tratamientoService.eliminar(id)
        .subscribe(resp => {
          if(resp){
            this._snackBar.openFromComponent(DialogSnackbarComponent,{ 
              data: { icono: 'done', mensaje: resp.msg, titulo: 'Eliminado'},
              duration: 4000,
              horizontalPosition: "right",
              verticalPosition: "top",
              panelClass: ["snack-bar-ok"]
            });
          }
        },
        () => {
          this._snackBar.openFromComponent(DialogSnackbarComponent,{ 
            data: { icono: 'report', mensaje: "Ocurrio un error al eliminar el tratamiento indicado", titulo: 'Error'},
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ["snack-bar-err"]
          });
        },
        () => {
          this.getTratamientos();
        });
  }


}
