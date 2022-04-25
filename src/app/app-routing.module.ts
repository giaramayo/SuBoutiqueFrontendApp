import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { HomeComponent } from './pages/home/home.component';
import { PacienteInicioComponent } from './component/paciente-inicio/paciente-inicio.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)   },
  { path: '', component: HomeComponent },
  { path: 'paciente', component: PacienteInicioComponent},
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
