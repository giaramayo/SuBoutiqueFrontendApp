import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  idEstado: number,
  estados: any,
  comentario: string,
  paciente: string,
  fecha: string
}

@Component({
  selector: 'app-dialog-cambiar-estado',
  templateUrl: './dialog-cambiar-estado.component.html',
  styleUrls: ['./dialog-cambiar-estado.component.scss']
})
export class DialogCambiarEstadoComponent {

  public select: number;

  constructor(private dialogRef: MatDialogRef<DialogCambiarEstadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      this.select = data.idEstado;
    }

    confirmar(){
      this.dialogRef.close({id: this.select, comentario: this.data.comentario});
    }
  
    cancelar(){
      this.dialogRef.close();
    }


}
