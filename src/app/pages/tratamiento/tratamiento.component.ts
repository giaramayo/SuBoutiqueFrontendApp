import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { DialogModificarTratamientoComponent } from '../../component/dialog-modificar-tratamiento/dialog-modificar-tratamiento.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSnackbarComponent } from '../../component/dialog-snackbar/dialog-snackbar.component';
import { ConfirmacionComponent } from '../../component/confirmacion/confirmacion.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.scss']
})
export class TratamientoComponent implements OnInit {

  public dataSource: any;
  public botonFiltroLoading: boolean;
  public displayedColumns: string[] = ['descripcion', 'precio', 'modif', 'elim'];
  public cargando: boolean;

  constructor(public _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private tratamientoService: TratamientoService) {
    this.botonFiltroLoading = false;
    this.cargando = true;

  }

  ngOnInit(): void {
    this.getTratamientos();
  }

  getTratamientos() {
    this.tratamientoService.getAll().subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
    },
      () => {
        this._snackBar.openFromComponent(DialogSnackbarComponent, {
          data: { icono: 'report', mensaje: "Error al consultar tratamientos", titulo: 'Error' },
          duration: 4000,
          horizontalPosition: "right",
          verticalPosition: "bottom",
          panelClass: ["snack-bar-err"]
        });
        this.cargando = false;
      },
      () => { this.cargando = false; });
  }

  agregar() {
    const nuevo = {
      descripcion: '',
      duracion: 0,
      precio: 0,
      titulo: 'Agregar Tratamiento'
    }

    const dialogRef = this.dialog.open(DialogModificarTratamientoComponent, {
      width: '300px',
      data: nuevo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._snackBar.openFromComponent(DialogSnackbarComponent, {
          data: { icono: 'done', mensaje: result.msg, titulo: 'Guardar' },
          duration: 4000,
          horizontalPosition: "right",
          verticalPosition: "bottom",
          panelClass: ["snack-bar-ok"]
        });
        this.getTratamientos();
      }
    });
  }

  modificar(element: any) {
    element.titulo = 'Modificar Tratamiento';
    const dialogRef = this.dialog.open(DialogModificarTratamientoComponent, {
      width: '300px',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTratamientos();
        this._snackBar.openFromComponent(DialogSnackbarComponent, {
          data: { icono: 'done', mensaje: result.msg, titulo: 'Modificado' },
          duration: 4000,
          horizontalPosition: "right",
          verticalPosition: "bottom",
          panelClass: ["snack-bar-ok"]
        });
      }

    });
  }

  eliminar(element: any) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      data: {
        msj: "¿Está seguro que desea eliminar \"" + element.descripcion + "\"?",
        titulo: "Eliminar"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.elimitarTratamiento(element._id)
    });
  }

  elimitarTratamiento(id: number) {
    this.cargando = true;
    this.tratamientoService.eliminar(id)
      .subscribe(resp => {
        if (resp) {
          this._snackBar.openFromComponent(DialogSnackbarComponent, {
            data: { icono: 'done', mensaje: resp.msg, titulo: 'Eliminado' },
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "bottom",
            panelClass: ["snack-bar-ok"]
          });
        }
      },
        () => {
          this._snackBar.openFromComponent(DialogSnackbarComponent, {
            data: { icono: 'report', mensaje: "Ocurrió un error al eliminar el tratamiento indicado", titulo: 'Error' },
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "bottom",
            panelClass: ["snack-bar-err"]
          });
          this.cargando = false;
        },
        () => {
          this.getTratamientos();
        });
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
