import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { DialogModificarTratamientoComponent } from '../../component/dialog-modificar-tratamiento/dialog-modificar-tratamiento.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSnackbarComponent } from '../../component/dialog-snackbar/dialog-snackbar.component';
import { ConfirmacionComponent } from '../../component/confirmacion/confirmacion.component';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.scss']
})
export class TratamientoComponent implements OnInit {

  public dataSource: any;
  public tratamientoForm: FormGroup;
  public botonFiltroLoading: boolean;
  public displayedColumns: string[] = ['descripcion', 'duracion', 'precio', 'modif', 'elim' ];


  constructor(public _snackBar: MatSnackBar,
              public dialog: MatDialog,
              private tratamientoService: TratamientoService) { 
    this.botonFiltroLoading = false;
    this.tratamientoForm = new FormGroup({
      descripcion:  new FormControl("")
   });
  }

  ngOnInit(): void {
    this.getTratamientos();
  }

  getTratamientos(){
    this.tratamientoService.getAll().subscribe( resp => {
      this.dataSource = resp;
    },
    () => {
      this._snackBar.openFromComponent(DialogSnackbarComponent,{ 
        data: { icono: 'report', mensaje: "Error al consultar tratamientos", titulo: 'Error'},
        duration: 4000,
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: ["snack-bar-err"]
      });
    });
  }

  buscar() {
    this.tratamientoService.getFiltrar(this.tratamientoForm.get('descripcion')?.value)
    .subscribe( resp => {
      this.dataSource = resp;
    });
  }

  agregar(){
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
      if(result){
        this._snackBar.openFromComponent(DialogSnackbarComponent,{ 
          data: { icono: 'done', mensaje: result.msg, titulo: 'Guardar'},
          duration: 4000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["snack-bar-ok"]
        });
        this.getTratamientos();
      }        
    });
  }

  validar(): boolean {
    return!this.tratamientoForm.get('descripcion')?.value;
  }









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

  // getTratamientos(){
  //   this.tratamientoService.getAll().subscribe( resp => {
  //     this.dataSource = resp;
  //   }, () => {
  //     this._snackBar.openFromComponent(DialogSnackbarComponent,{ 
  //       data: { icono: 'report', mensaje: "Ocurrio un error al consultar los tratamientos", titulo: 'Error'},
  //       duration: 4000,
  //       horizontalPosition: "right",
  //       verticalPosition: "top",
  //       panelClass: ["snack-bar-err"]
  //     });
  //   });
  // }

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
