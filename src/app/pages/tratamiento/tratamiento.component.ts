import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TratamientoService } from 'src/app/service/tratamiento.service';
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

  constructor(public dialog: MatDialog,
              private tratamientoService: TratamientoService) { 
    this.botonFiltroLoading = false;
    this.tratamientoForm = new FormGroup({
      descripcion:  new FormControl("")
   });
  }

  ngOnInit(): void {
    this.getTratamientos();
  }

  getTratamientos(){
    this.tratamientoService.getAll().subscribe( resp => {
      this.tratamientos = resp;
    });
  }

  buscar() {
    this.tratamientoService.getFiltrar(this.tratamientoForm.get('descripcion')?.value)
    .subscribe( resp => {
      this.tratamientos = resp;
    })

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
      if(result)
        this.getTratamientos();
    });
  }

  validar(): boolean {
    return!this.tratamientoForm.get('descripcion')?.value;
  }

}
