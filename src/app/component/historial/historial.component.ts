import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

  @Input() dataSource: any;
  public displayedColumns: string[] = ['fecha', 'tratamiento', 'observacion'];
  

  constructor() { }

  ngOnInit(): void {
  }

}
