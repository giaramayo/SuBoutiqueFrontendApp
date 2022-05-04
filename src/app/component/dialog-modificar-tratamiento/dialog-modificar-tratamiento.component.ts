import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-modificar-tratamiento',
  templateUrl: './dialog-modificar-tratamiento.component.html',
  styleUrls: ['./dialog-modificar-tratamiento.component.scss']
})
export class DialogModificarTratamientoComponent {

  constructor(public dialog: MatDialog) {}

}
