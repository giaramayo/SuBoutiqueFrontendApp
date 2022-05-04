import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.scss']
})
export class TratamientoComponent implements OnInit {

  public tratamientos: any;

  constructor() { }

  ngOnInit(): void {
    this.tratamientos = [{
      descripcion: 'ddd',
      duracion: 1,
      precio: 111
    }]
  }

}
