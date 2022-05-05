import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tratamiento } from '../../interfaces/tratamiento.interfaces';

@Component({
  selector: 'app-dialog-modificar-tratamiento',
  templateUrl: './dialog-modificar-tratamiento.component.html',
  styleUrls: ['./dialog-modificar-tratamiento.component.scss']
})
export class DialogModificarTratamientoComponent {

  public tratamiento: any;
  public titulo: string;

  constructor(
    public dialogRef: MatDialogRef<DialogModificarTratamientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tratamiento ) {
    this.tratamiento = data;
    this.titulo = data.id ? 'Modificar Tratamiento' : 'Agregar Tratamiento'
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  guardar(){
    console.log(this.tratamiento);
    console.log(this.data)
    this.cerrar();
  }

}