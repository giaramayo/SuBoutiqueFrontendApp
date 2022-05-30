import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  fecha: Date,
}

@Component({
  selector: 'app-dialog-agendar-turno',
  templateUrl: './dialog-agendar-turno.component.html',
  styleUrls: ['./dialog-agendar-turno.component.scss']
})
export class DialogAgendarTurnoComponent {

  constructor(private dialogRef: MatDialogRef<DialogAgendarTurnoComponent>,
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
