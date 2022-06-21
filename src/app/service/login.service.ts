import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private nodeURL = environment.nodeURL;
  private turnoURL = this.nodeURL + '/user'

  constructor(private readonly http: HttpClient, private cookies: CookieService) { }

  ingresar(usuario: any): Observable<any> {
    return this.http.post(this.turnoURL + '/login', usuario);
  }

  setToken(token: any) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }

  get isCheckLogeado() {
    const tokenSession = this.getToken();
    return tokenSession ? true : false;
  }

}
