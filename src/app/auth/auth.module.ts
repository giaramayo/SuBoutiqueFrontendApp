import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticadoComponent } from './pages/autenticado/autenticado.component';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../modules/material/material.module';


@NgModule({
  declarations: [
    AutenticadoComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule
  ]
})

export class AuthModule { }
