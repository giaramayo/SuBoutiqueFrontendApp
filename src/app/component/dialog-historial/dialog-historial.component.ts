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
  public panelOpenState = true;
  
  constructor( private dialogRef: MatDialogRef<DialogHistorialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
    }

    filtrar(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.data.dataSource.filter = filterValue.trim().toLowerCase();
    }

    confirmar(){
      this.dialogRef.close(true);
    }
  
    cancelar(){
      this.dialogRef.close(false);
    }
}
