import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-modificar-tratamiento',
  templateUrl: './dialog-modificar-tratamiento.component.html',
  styleUrls: ['./dialog-modificar-tratamiento.component.scss']
})
export class DialogModificarTratamientoComponent {

  public tratamiento: any;

  constructor(
    public dialogRef: MatDialogRef<DialogModificarTratamientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {
    this.tratamiento = data;
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