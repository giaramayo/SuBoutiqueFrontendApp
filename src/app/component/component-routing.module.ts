import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component'
import { PacienteAgregarComponent } from './paciente/agregar/agregar.component';
import { PacienteModificarComponent } from './paciente/modificar/modificar.component';
import { PacienteListarComponent } from './paciente/listar/listar.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'paciente/agregar', component: PacienteAgregarComponent },
      { path: 'paciente/modificar', component: PacienteModificarComponent },
      { path: 'paciente/listar', component: PacienteListarComponent },
      { path: '**', component: MainComponent },

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
