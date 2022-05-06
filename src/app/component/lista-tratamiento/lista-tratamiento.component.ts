import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogModificarTratamientoComponent } from '../dialog-modificar-tratamiento/dialog-modificar-tratamiento.component';

@Component({
  selector: 'app-lista-tratamiento',
  templateUrl: './lista-tratamiento.component.html',
  styleUrls: ['./lista-tratamiento.component.scss']
})
export class ListaTratamientoComponent {

  @Input() dataSource: any;
  public displayedColumns: string[] = ['descripcion', 'duracion', 'precio', 'modif', 'elim' ];
  
  constructor(public dialog: MatDialog) { }

  modificar( element: any){
    
    element.titulo = 'Modificar Tratamiento';

    const dialogRef = this.dialog.open(DialogModificarTratamientoComponent, {
      width: '270px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
       element = result;
    });
  }

  eliminar( element: any){
    
  }


}