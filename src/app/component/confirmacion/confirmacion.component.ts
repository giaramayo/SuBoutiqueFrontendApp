import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  msj: string,
  titulo: string
}

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})


export class ConfirmacionComponent  {

  constructor(private dialogRef: MatDialogRef<ConfirmacionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
                dialogRef.disableClose = true;
              }

  confirmar(){
    this.dialogRef.close(true);
  }

  cancelar(){
    this.dialogRef.close(false);
  }

}
