import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  fecha: Date,
  hora: Date
}

@Component({
  selector: 'app-dialog-reprogramar',
  templateUrl: './dialog-reprogramar.component.html',
  styleUrls: ['./dialog-reprogramar.component.scss']
})
export class DialogReprogramarComponent {

  constructor(private dialogRef: MatDialogRef<DialogReprogramarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


      confirmar(){
        this.dialogRef.close(true);
      }
    
      cancelar(){
        this.dialogRef.close(false);
      }

}
