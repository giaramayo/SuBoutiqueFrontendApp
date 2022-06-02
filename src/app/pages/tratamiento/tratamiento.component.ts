import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { DialogModificarTratamientoComponent } from '../../component/dialog-modificar-tratamiento/dialog-modificar-tratamiento.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSnackbarComponent } from '../../component/dialog-snackbar/dialog-snackbar.component';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.scss']
})
export class TratamientoComponent implements OnInit {

  public tratamientos: any;
  public tratamientoForm: FormGroup;
  public botonFiltroLoading: boolean;

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
      this.tratamientos = resp;
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
      this.tratamientos = resp;
    })

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

}
