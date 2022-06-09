import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { TurnoService } from '../../service/turno.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent {

  public lineChartType: ChartType = 'line';
  public chartData = [
    {
      data: [],
      label: ''
    }
  ];

  public chartLabels = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio'
  ];

  public chartOptions = { responsive: true };

  constructor(private turnoService: TurnoService) {
    this.estadisticaTratamientoMasSolicitadoMes()
  }

  estadisticaTratamientoMasSolicitadoMes() {
    this.turnoService.estadisticaTratamientoMasSolicitadoMes()
      .subscribe(resp => {
        this.chartData = resp.arrayEstDesc;
        console.log(this.chartData)
      })
  }



}
