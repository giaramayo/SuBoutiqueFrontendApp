import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-persona',
  templateUrl: './card-persona.component.html',
  styleUrls: ['./card-persona.component.scss']
})
export class CardPersonaComponent  {

  @Input() paciente: any;
  
  constructor() { }


}
