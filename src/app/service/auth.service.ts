import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Paciente } from '../interfaces/paciente.interfaces';
import { Login } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl: string = environment.nodeURL;
  private _usuario!: Paciente;

  get usuario() {
    return { ...this._usuario };
  }


  constructor( private http: HttpClient ) { }

  registro( name: string, email: string, password: string ) {

    const url  = `${ this.baseUrl }/auth/new`;
    const body = { email, password, name };

    return this.http.post<Login>( url, body )
      .pipe(
        tap( ({ ok, token }) => {
          if ( ok ) {
            localStorage.setItem('token', token! );
          }
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg) )
      );

  }



  login( email: string, password: string ) {

    const url  = `${ this.baseUrl }/auth`;
    const body = { email, password };

    return this.http.post<Login>( url, body )
      .pipe(
        tap( resp => {
          if ( resp.ok ) {
            localStorage.setItem('token', resp.token! );
          }
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg) )
      );
  }


  logout() {
    localStorage.clear();
  }


}
