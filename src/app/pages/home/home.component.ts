import { Component, OnInit } from '@angular/core';
import { TurnoService } from '../../service/turno.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public imag1: string = 'imag1';
  public hoy: Date;
  public turnosHoy: any[];
  public routerAgregar: string;

  constructor(private turnoService: TurnoService,
              private router: Router) {
    this.hoy = new Date();
    this.turnosHoy = [];
    this.routerAgregar = '/paciente/agregar/inicio'
  }

  ngOnInit(): void {
    this.consultarLosPrimeros();
  }

  consultarLosPrimeros() {
    let mes = this.hoy?.getMonth()
    let mesM = mes ? (mes + 1).toString() : 0;
    let fecha = this.hoy.getFullYear() + "-" + this.formatoVariable(mesM) + "-" + this.formatoVariable(this.hoy.getDate())
    //  fecha = "2022-05-23"  //TODO
    console.log(fecha)
    this.turnoService.buscarTurnoPoximo(fecha)
      .subscribe(resp => {
        if (resp) {
          this.turnosHoy = resp;
        }
      });
  }

  formatoVariable(valor: any): string {
    return valor.length > 1 ? valor : ('0' + valor);
  }

  agregarPaciente() {
    this.router.navigateByUrl(this.routerAgregar);
  }

}
