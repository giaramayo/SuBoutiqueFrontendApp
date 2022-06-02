import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { HomeComponent } from './pages/home/home.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { PacienteAgregarComponent } from './pages/paciente-agregar/paciente-agregar.component';
import { TratamientoComponent } from './pages/tratamiento/tratamiento.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { TurnoComponent } from './pages/turno/turno.component';
import { DetallePacienteComponent } from './pages/detalle-paciente/detalle-paciente.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)   },
  { path: 'paciente', component: PacienteComponent},
  { path: 'paciente/agregar/:pages', component: PacienteAgregarComponent},
  { path: 'paciente/detalle/:id/:pages', component: DetallePacienteComponent},
  { path: 'tratamientos', component: TratamientoComponent},
  { path: 'turnos', component: TurnoComponent},
  { path: 'estadisticas', component: EstadisticasComponent},
  { path: 'inicio', component: HomeComponent },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})


export class AppRoutingModule { }
