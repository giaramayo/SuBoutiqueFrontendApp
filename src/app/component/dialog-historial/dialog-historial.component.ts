import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  dataSource: any,
  antecedente: any,
  titulo: string
}

@Component({
  selector: 'app-dialog-historial',
  templateUrl: './dialog-historial.component.html',
  styleUrls: ['./dialog-historial.component.scss']
})

export class DialogHistorialComponent {

  constructor( private dialogRef: MatDialogRef<DialogHistorialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
    }

    confirmar(){
      this.dialogRef.close(true);
    }
  
    cancelar(){
      this.dialogRef.close(false);
    }
}
