import { Component, OnInit, ViewChild } from '@angular/core';
import { TurnoService } from '../../service/turno.service';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public imag1: string = 'imag1';
  public hoy: Date;
  public turnosHoy: any[];
  public routerAgregar: string;
  public fecha: string;

  /// Estadisticas
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };
  public pieChartTratamientos?: ChartData<'pie', number[], string | string[]>;
  public pieChartEstados?: ChartData<'pie', number[], string | string[]>;
  public pieChartType: ChartType = 'pie';   //Tipo de grafico

  constructor(private turnoService: TurnoService,
    private router: Router) {
    this.hoy = new Date();
    this.turnosHoy = [];
    this.routerAgregar = '/paciente/agregar/inicio';

    let mes = this.hoy?.getMonth()
    let mesM = mes ? (mes + 1).toString() : 0;
    let fecha = this.hoy.getFullYear() + "-" + this.formatoVariable(mesM) + "-" + this.formatoVariable(this.hoy.getDate())
    this.fecha = fecha;
    this.consultarLosPrimeros();
  }

  consultarLosPrimeros() {
    this.turnoService.buscarTurnoPoximo(this.fecha)
      .subscribe(resp => {
        if (resp) {
          this.turnosHoy = resp;
        }
      },
        (err) => {
          console.log("error al consultar turnos del dia - Erros: ", err)
        },
        () => {
          this.estadisticaDelDiaTratamiento();
        });
  }

  estadisticaDelDiaTratamiento() {
    this.turnoService.estadisticasPorFecha(this.fecha)
      .subscribe(resp => {
        if (resp) {
          this.pieChartTratamientos = {
            labels: resp.tratamientos,
            datasets: [{
              data: resp.contadores
            }]
          };
        }
      },
      (err) => {
        console.log("error al consultar turnos del dia - Erros: ", err)
      },
      () => {
        this.estadisticaDelDiaEstados();
      });
  }

  estadisticaDelDiaEstados() {
    this.turnoService.estadisticaEstadoPorFecha(this.fecha)
      .subscribe(resp => {
        if (resp) {
          this.pieChartEstados = {
            labels: resp.estados,
            datasets: [{
              data: resp.contadores
            }]
          };
        }
      })
  }

  formatoVariable(valor: any): string {
    return valor.length > 1 ? valor : ('0' + valor);
  }

  agregarPaciente() {
    this.router.navigateByUrl(this.routerAgregar);
  }

}
