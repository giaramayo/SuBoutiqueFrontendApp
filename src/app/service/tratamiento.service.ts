import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TratamientoService {

  private nodeURL = environment.nodeURL;
  private tratamientoURL = this.nodeURL + '/tratamiento'

  constructor( private readonly http: HttpClient ) { }

  getAll(): Observable<any> {
    return this.http.get(this.tratamientoURL)
  }

  getFiltrar(nombre: string): Observable<any> {
    return this.http.get(this.tratamientoURL + '/filtrar/' + nombre);
  }

  


}
