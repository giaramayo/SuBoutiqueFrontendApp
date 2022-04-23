import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { InicioPacienteComponent } from './paciente/inicio-paciente/inicio-paciente.component';
import { PacienteAgregarComponent } from './paciente/agregar/agregar.component';
import { PacienteModificarComponent } from './paciente/modificar/modificar.component';
import { PacienteListarComponent } from './paciente/listar/listar.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'paciente', component: InicioPacienteComponent },
      { path: 'paciente/agregar', component: PacienteAgregarComponent },
      { path: 'paciente/modificar', component: PacienteAgregarComponent },
      { path: 'paciente/listar', component: PacienteAgregarComponent },
      { path: 'paciente/agregar', component: PacienteAgregarComponent },
      { path: 'paciente/modificar', component: PacienteModificarComponent },
      { path: 'paciente/listar', component: PacienteListarComponent },
      { path: '**', component: HomeComponent },

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

export class ComponentRoutingModule { }
