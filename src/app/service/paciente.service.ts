import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PacienteService {

  private nodeURL = environment.nodeURL;
  private pacienteURL = this.nodeURL + '/pacientes'

  constructor( private readonly http: HttpClient ) { }

  getPacientes(): Observable<any> {
    return this.http.get(this.pacienteURL)
  }


 // postFiltrarPaciente( nombre: string, apellido: string, dni: number ) : Observable<any>{
 //   let params = new HttpParams().set('nombre', nombre).set('apellido', apellido).set('dni', dni);
 //   return this.http.post(this.pacienteURL + '/filtrar', {params});
 // }

}
