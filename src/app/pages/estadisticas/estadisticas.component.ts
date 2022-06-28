import { Component } from '@angular/core';
import { ChartType, ChartData, ChartConfiguration } from 'chart.js';
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
  public pieChartType: ChartType = 'pie';   //Tipo de grafico
  // public pieChartTratamientos?: ChartData<'pie', number[], string | string[]>;
  public cargando: boolean;

  public chartTratamientoMes = [
    {
      data: [],
      label: ''
    }
  ];
  public totalTurnosTemporada: number = 0;
  public totalTurnosEstado: number = 0;
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
  public dataEstadoHist: ChartData<'bar'> = {
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

  public dataLocalidad: ChartData<'pie'> = {
    labels: [],
    datasets: [
      { data: [ ] }
    ]
  };
  public dataLocalidadCompleto: any [];
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };

  constructor(private estadisticaService: EstadisticaService) {
    this.dataLocalidadCompleto = [];
    this.cargando = true;
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
        this.cargando = false;
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
        console.log(err);
        this.cargando = false;
      },
      ()=> {
        this.estadisticaPorLocalidad();
      })
  }

  estadisticaPorLocalidad() {
    this.estadisticaService.estadisticaPorLocalidad()
        .subscribe(resp=> {
          for (let index = 0; index < resp.contador.length; index++) {
            if(resp.contador[index] != 0) {
              this.dataLocalidad.datasets[0].data?.push(resp.contador[index]);
              this.dataLocalidad.labels?.push(resp.barriosDes[index]);
            }
            this.dataLocalidadCompleto.push({label: resp.barriosDes[index], valor: resp.contador[index]});
          }
          this.dataLocalidadCompleto.sort((a, b) => {
            if(a.valor > b.valor) return -1;
            else if(a.valor == b.valor) return 1;
            else return 0;
          })
        },
        err =>{
          console.log(err);
          this.cargando = false;
        },
        () => {
          this.estadisticaTratamientoPorEstacion();
        })
  }

  estadisticaTratamientoPorEstacion() {
    this.estadisticaService.estadisticaTratamientoPorEstacion()
      .subscribe( resp => {
          this.totalTurnosTemporada = resp.total;
          this.dataEstacion.labels = resp.estaciones;
          this.dataEstacion.datasets[0].data = resp.contadores;
      },
      (err) => {
        console.log(err);
        this.cargando = false;
      },
      ()=> {
       this.estadisticaPorEstadoHist();
      })
  }

  estadisticaPorEstadoHist() {
    this.estadisticaService.estadisticaPorEstagoHist()
      .subscribe( resp => {
          this.totalTurnosEstado = resp.total;
          this.dataEstadoHist.labels = resp.estadosDes;
          this.dataEstadoHist.datasets[0].data = resp.contador;
      },
      (err) => {
        console.log(err)
        this.cargando = false;
      },
      ()=> {
       // this.estadisticaPorEdad();
       this.cargando = false;
      })
  }

}
