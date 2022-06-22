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
  public barChartType: ChartType = 'bar'; //tipo de grafico

  public chartTratamientoMes = [
    {
      data: [],
      label: ''
    }
  ];
  public totalTurnosMes: number = 0;
  public chartLabelsMes = ['Enero','Febrero','Marzo','Abril','Mayo','Junio'];
  public chartOptions = { responsive: true };
  //Estadisitca por Estacion
  public dataEstacion: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [ ], label: 'Turnos' },
    ]
  };
  
  public totalPacienteEdad: number = 0;
  public dataEdadTratados: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [ ], label: 'Edad' },
    ]
  };

  constructor(private estadisticaService: EstadisticaService) {
    this.estadisticaTratamientoMasSolicitadoMes()
  }

  estadisticaTratamientoMasSolicitadoMes() {
    this.estadisticaService.estadisticaTratamientoMasSolicitadoMes()
      .subscribe(resp => {
        this.chartTratamientoMes = resp.arrayEstDesc;
        this.totalTurnosMes = resp.totalTurnos;
      },
      (err) => {
        console.log(err)
      },
      ()=> {
        this.estadisticaPorEdad();
      })
  }
  
  estadisticaPorEdad() {
    this.estadisticaService.estadisticaPorEdad()
      .subscribe( resp => {
        this.dataEdadTratados.labels = resp.rangos
        this.dataEdadTratados.datasets[0].data = resp.edades
        this.totalPacienteEdad = resp.totalPaciente
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
          this.dataEstacion.labels = resp.estaciones;
          this.dataEstacion.datasets[0].data = resp.contadores
      },
      (err) => {
        console.log(err)
      },
      ()=> {
       // this.estadisticaPorEdad();
      })
  }


}
