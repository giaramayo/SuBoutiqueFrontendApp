import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogModificarTratamientoComponent } from '../../component/dialog-modificar-tratamiento/dialog-modificar-tratamiento.component';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.scss']
})
export class TratamientoComponent implements OnInit {

  public tratamientos: any;
  public tratamientoForm: FormGroup;
  public botonFiltroLoading: boolean;

  constructor(public dialog: MatDialog) { 
    this.botonFiltroLoading = false;
    this.tratamientoForm = new FormGroup({
      descripcion:  new FormControl("")
   });
  }

  ngOnInit(): void {
    this.tratamientos = [{
      id: 11111,
      descripcion: 'ddd',
      duracion: 1,
      precio: 111
    }]
  }

  buscar() {

  }

  agregar(){
    const nuevo = {
      descripcion: '',
      duracion: 0,
      precio: 0,
      titulo: 'Agregar Tratamiento'
    }

    const dialogRef = this.dialog.open(DialogModificarTratamientoComponent, {
      width: '270px',
      data: nuevo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
//       element = result;
    });
  }

}
