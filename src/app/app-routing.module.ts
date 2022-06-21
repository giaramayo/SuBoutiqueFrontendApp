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
import { LoginComponent } from './pages/login/login.component';
import { UserActivateService } from './user-activate.service';

const routes: Routes = [
  { path: 'paciente', component: PacienteComponent, canActivate: [UserActivateService]},
  { path: 'paciente/agregar/:pages', component: PacienteAgregarComponent, canActivate: [UserActivateService]},
  { path: 'paciente/detalle/:id/:pages', component: DetallePacienteComponent, canActivate: [UserActivateService]},
  { path: 'tratamientos', component: TratamientoComponent, canActivate: [UserActivateService]},
  { path: 'turnos', component: TurnoComponent, canActivate: [UserActivateService]},
  { path: 'estadisticas', component: EstadisticasComponent, canActivate: [UserActivateService]},
  { path: 'inicio', component: HomeComponent, canActivate: [UserActivateService]},
  { path: 'login', component: LoginComponent },
  { path: '**', component: ErrorPageComponent},
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
