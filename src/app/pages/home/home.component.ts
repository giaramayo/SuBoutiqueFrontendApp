import { Component, OnInit, ViewChild } from '@angular/core';
import { TurnoService } from '../../service/turno.service';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { DialogAgendarTurnoComponent } from '../../component/dialog-agendar-turno/dialog-agendar-turno.component';
import { MatDialog } from '@angular/material/dialog';
import { EstadisticaService } from '../../service/estadistica.service';


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
    private estadistica: EstadisticaService,
    public dialog: MatDialog,
    private router: Router) {
    this.hoy = new Date();
    this.turnosHoy = [];
    this.routerAgregar = '/paciente/agregar/inicio';

    let mes = this.hoy?.getMonth()
    let mesM = mes ? (mes + 1).toString() : 0;
    let dia = this.hoy?.getDate().toString();
    let fecha = this.hoy.getFullYear() + "-" + this.formatoVariable(mesM) + "-" + this.formatoVariable(dia)
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
    this.estadistica.estadisticasPorFecha(this.fecha)
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
    this.estadistica.estadisticaEstadoPorFecha(this.fecha)
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

  agendar() {
    const dialogRef = this.dialog.open(DialogAgendarTurnoComponent, {
      width: '500px',
      data: {
          titulo: "Agendar nuevo turno",
          turno: {
            _id: null,
            id_tratamiento: 0,
            id_paciente: 0,
            fecha: this.hoy,
            id_hora: 0,
            hora: ''
          }
        }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.consultarLosPrimeros();
      }
    });

  }

}
