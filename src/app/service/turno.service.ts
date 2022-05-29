import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TurnoService {

  private nodeURL = environment.nodeURL;
  private turnoURL = this.nodeURL + '/turnos'

  constructor( private readonly http: HttpClient ) { }


  buscarHistorialDelPaciente( id: number ): Observable<any> {
    return this.http.get(this.turnoURL + '/buscarhistorial/' + id);
  }

  buscarTurnoPorFecha( fecha: string ) : Observable<any> {
    return this.http.get(this.turnoURL + '/buscar/fecha/' + fecha);
  }

//   eliminar(documento: number): Observable<any> {
//     return this.http.delete(this.pacienteURL + '/borrar/' + documento)
//   }

//   getLocalidad() : Observable<any> {
//     return this.http.get(this.localidadURL);
//   }
 // postFiltrarPaciente( nombre: string, apellido: string, dni: number ) : Observable<any>{
 //   let params = new HttpParams().set('nombre', nombre).set('apellido', apellido).set('dni', dni);
 //   return this.http.post(this.pacienteURL + '/filtrar', {params});
 // }

}
