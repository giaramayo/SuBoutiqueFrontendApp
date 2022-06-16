import { Component } from '@angular/core';
import { ChartType, ChartData } from 'chart.js';
import { EstadisticaService } from '../../service/estadistica.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent {

  //Estadistica por Tratamiento
  public lineChartType: ChartType = 'line'; //tipo de grafico
  public chartTratamientoMes = [
    {
      data: [],
      label: ''
    }
  ];
  public chartLabelsMes = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio'];
  public chartOptions = { responsive: true };

  //Estadisitca por Estacion
  public dataEstacion: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [ ], label: 'Turnos' },
    ]
  };
  public barChartType: ChartType = 'bar'; //tipo de grafico


  constructor(private estadisticaService: EstadisticaService) {
    this.estadisticaTratamientoMasSolicitadoMes()
  }

  estadisticaTratamientoMasSolicitadoMes() {
    this.estadisticaService.estadisticaTratamientoMasSolicitadoMes()
      .subscribe(resp => {
        this.chartTratamientoMes = resp.arrayEstDesc;
        console.log(this.chartTratamientoMes)
      },
      (err) => {
        console.log(err)
      },
      ()=> {
        this.estadisticaTratamientoPorEstacion();
      })
  }

  estadisticaTratamientoPorEstacion() {
    this.estadisticaService.estadisticaTratamientoPorEstacion()
      .subscribe( resp => {
          console.log(resp)
          this.dataEstacion.labels = resp.estaciones;
          this.dataEstacion.datasets[0].data = resp.contadores
      })
  }


}
