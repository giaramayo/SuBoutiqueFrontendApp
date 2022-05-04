import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.scss']
})
export class TratamientoComponent implements OnInit {

  public tratamientos: any;
  public tratamientoForm: FormGroup;
  public botonFiltroLoading: boolean;

  constructor() { 
    this.botonFiltroLoading = false;
    this.tratamientoForm = new FormGroup({
      descripcion:  new FormControl("")
   });
  }

  ngOnInit(): void {
    this.tratamientos = [{
      descripcion: 'ddd',
      duracion: 1,
      precio: 111
    }]
  }

  buscar() {

  }

  agregar() {
    
  }

}
