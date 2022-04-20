import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Paciente } from '../interfaces/paciente.interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PacienteService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  getHeroes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${ this.baseUrl }/heroes`);
  }

  getHeroePorId( id: string ):Observable<Paciente> {
    return this.http.get<Paciente>(`${ this.baseUrl }/heroes/${ id }`);
  }

  getSugerencias( termino: string ): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${ this.baseUrl }/heroes?q=${ termino }&_limit=6`);
  }

}
