import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogModificarTratamientoComponent } from '../dialog-modificar-tratamiento/dialog-modificar-tratamiento.component';
import { TratamientoService } from '../../service/tratamiento.service';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';

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
        this.getTratamientos();
    });
  }

  getTratamientos(){
    this.tratamientoService.getAll().subscribe( resp => {
      this.dataSource = resp;
    });
  }

  eliminar( element: any){
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '270px',
      data: {
          msj: "¿Esta seguro que desea eliminar \"" + element.descripcion + "\"?",
          titulo: "Eliminar"
        }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.elimitarTratamiento(element._id)
    });
  }

  elimitarTratamiento(id: number) {
      this.tratamientoService.eliminar(id)
        .subscribe(resp => {
          console.log(resp);
        },
        () => undefined,
        () => {
          this.getTratamientos();
        });
  }


}
