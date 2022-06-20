import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EstadisticaService {

  private nodeURL = environment.nodeURL;
  private turnoURL = this.nodeURL + '/estadisticas'

  constructor( private readonly http: HttpClient ) { }

  estadisticasPorFecha( fecha: string ) : Observable<any> {
    return this.http.get(this.turnoURL + '/porFecha/' + fecha);
  }
  estadisticaEstadoPorFecha( fecha: string ) : Observable<any> {
    return this.http.get(this.turnoURL + '/estadoPorFecha/' + fecha);
  }
  
  estadisticaTratamientoMasSolicitadoMes( ) : Observable<any> {
    return this.http.get(this.turnoURL + '/tratamientoMasSolicitadoMes');
  }

  estadisticaTratamientoPorEstacion( ) : Observable<any> {
    return this.http.get(this.turnoURL + '/tratamientoPorEstacion');
  }

  estadisticaPorEdad() : Observable<any> {
    return this.http.get(this.turnoURL + '/porEdad');
  }

}