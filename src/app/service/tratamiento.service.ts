import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TratamientoService {

  private nodeURL = environment.url;
  private tratamientoURL = this.nodeURL + '/tratamiento'

  constructor( private readonly http: HttpClient ) { }

  getAll(): Observable<any> {
    return this.http.get(this.tratamientoURL)
  }

  getFiltrar(nombre: string): Observable<any> {
    return this.http.get(this.tratamientoURL + '/filtrar/' + nombre);
  }

  modificar(tratamiento: any): Observable<any> {
    let body = {
      _id: tratamiento._id, 
      descripcion: tratamiento.descripcion,
      duracion: tratamiento.duracion,
      precio: tratamiento.precio
    }
    return this.http.put(this.tratamientoURL + '/modificar/' + tratamiento._id, body);
  }

  crear(tratamiento: any): Observable<any> {
    let body = {
      descripcion: tratamiento.descripcion,
      // duracion: tratamiento.duracion,
      duracion: 60,
      precio: tratamiento.precio
    }
    return this.http.post(this.tratamientoURL + '/crear', body);
  }

  eliminar(id: number): Observable<any>{
    return this.http.delete(this.tratamientoURL + '/borrar/' + id);
  }



}
