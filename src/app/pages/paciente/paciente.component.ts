import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paciente-inicio',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  public imagenNom: string;

  constructor() {
    this.imagenNom = 'imag1'
   }

  ngOnInit(): void {
  }

}
