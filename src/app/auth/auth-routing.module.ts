import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { AutenticadoComponent } from './pages/autenticado/autenticado.component';
import { DashoardComponent } from '../auth/pages/dashoard/dashoard.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'autenticado', component: AutenticadoComponent },
      { path: 'noautentidado', component: DashoardComponent },
      { path: '**', redirectTo: 'login' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})

export class AuthRoutingModule { }
