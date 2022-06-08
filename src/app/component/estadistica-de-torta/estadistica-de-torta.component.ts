import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TurnoService } from '../../service/turno.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-estadistica-de-torta',
  templateUrl: './estadistica-de-torta.component.html',
  styleUrls: ['./estadistica-de-torta.component.scss']
})
export class EstadisticaDeTortaComponent{

  @Input() fecha!: string;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };
  
  public pieChartData?: ChartData<'pie', number[], string | string[]>;
  
  public pieChartType: ChartType = 'pie';   //Tipo de grafico
 
  constructor(private turnoService: TurnoService) {
    console.log(this.fecha)
    this.estadisticaDelDiaTratamiento(this.fecha)
  }

  estadisticaDelDiaTratamiento(fecha: any) {
    this.turnoService.estadisticasPorFecha(fecha)
          .subscribe(resp => {
            if(resp){
             // this.valoresDiaDia = resp.contadores;
             this.pieChartData = {
              labels: resp.tratamientos,
              datasets: [ {
                data: [ 300, 500, 100 ]
              } ]
             };
            }
            console.log(this.pieChartData)

          })
  }
}
