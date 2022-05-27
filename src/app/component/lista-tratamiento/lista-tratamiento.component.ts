import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogModificarTratamientoComponent } from '../dialog-modificar-tratamiento/dialog-modificar-tratamiento.component';
import { TratamientoService } from '../../service/tratamiento.service';

@Component({
  selector: 'app-lista-tratamiento',
  templateUrl: './lista-tratamiento.component.html',
  styleUrls: ['./lista-tratamiento.component.scss']
})
export class ListaTratamientoComponent {

  @Input() dataSource: any;
  public displayedColumns: string[] = ['descripcion', 'duracion', 'precio', 'modif', 'elim' ];
  
  constructor(public dialog: MatDialog,
              private tratamientoService: TratamientoService) { }

  modificar( element: any){
    
    element.titulo = 'Modificar Tratamiento';

    const dialogRef = this.dialog.open(DialogModificarTratamientoComponent, {
      width: '270px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
        this.getTratamientos();
    });
  }

  getTratamientos(){
    this.tratamientoService.getAll().subscribe( resp => {
      this.dataSource = resp;
    });
  }

  eliminar( element: any){
    console.log(element);
    this.tratamientoService.eliminar(element._id)
      .subscribe(resp => {
        console.log(resp);
      },
      () => undefined,
      () => {
        this.getTratamientos();
      })

  }


}
