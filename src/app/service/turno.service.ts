import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TurnoService {

  private nodeURL = environment.url;
  private turnoURL = this.nodeURL + '/turno'
  private estadosURL = this.nodeURL + '/estado'

  constructor( private readonly http: HttpClient ) { }


  buscarHistorialDelPaciente( id: number ): Observable<any> {
    return this.http.get(this.turnoURL + '/buscarhistorial/' + id);
  }

  buscarTurnoPorFecha( fecha: string ) : Observable<any> {
    return this.http.get(this.turnoURL + '/buscar/fecha/' + fecha);
  }

  buscarTurnoPoximo( fecha: string ) : Observable<any> {
    return this.http.get(this.turnoURL + '/buscar/proximos/' + fecha);
  }

  getEstados() : Observable<any> {
    return this.http.get(this.estadosURL);
  }

  modificarTurno(id: number, body: any): Observable<any> {
    return this.http.put(this.turnoURL + '/modificar/' + id, body);
  }

  horariosDisponibles( fecha: string ) : Observable<any> {
    return this.http.get(this.turnoURL + '/horariosDisponibles/' + fecha);
  }

  guardarNuevoTurno( turno: any ) : Observable<any> {
    return this.http.post(this.turnoURL + '/crear', turno);
  }

}
