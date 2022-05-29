import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export interface DialogData {
  icono   : string,
  mensaje : string,
  titulo  : string
}


@Component({
  selector: 'app-dialog-snackbar',
  templateUrl: './dialog-snackbar.component.html',
  styleUrls: ['./dialog-snackbar.component.scss']
})
export class DialogSnackbarComponent  {

  constructor(public sbRef: MatSnackBarRef<DialogSnackbarComponent>,
              @Inject(MAT_SNACK_BAR_DATA) public data: DialogData) { }


}
