import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getFiltrarPaciente( nombre: string, apellido: string, dni: number ) : Observable<any>{
    return this.http.get(this.pacienteURL + '/buscar/' + apellido + '/' + {nombre});
  }

}
