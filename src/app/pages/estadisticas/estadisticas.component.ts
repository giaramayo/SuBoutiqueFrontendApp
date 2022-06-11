import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { TurnoService } from '../../service/turno.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent {

  public lineChartType: ChartType = 'line'; //tipo de grafico
  public chartTratamientoMes = [
    {
      data: [],
      label: ''
    }
  ];

  public chartLabelsMes = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio'];
  public chartOptions = { responsive: true };

  constructor(private turnoService: TurnoService) {
    this.estadisticaTratamientoMasSolicitadoMes()
  }

  estadisticaTratamientoMasSolicitadoMes() {
    this.turnoService.estadisticaTratamientoMasSolicitadoMes()
      .subscribe(resp => {
        this.chartTratamientoMes = resp.arrayEstDesc;
        console.log(this.chartTratamientoMes)
      })
  }



}
