import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';

import { ComponentRoutingModule } from './component-routing.module';

import { MaterialModule } from './material/material.module';

import { ImagenPipe } from '../pipes/imagen.pipe';
import { InicioPacienteComponent } from './paciente/inicio-paciente/inicio-paciente.component';
import { MenuComponent } from './menu/menu.component'

@NgModule({
  declarations: [
    HomeComponent,
    ImagenPipe,
    InicioPacienteComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    MaterialModule
  ]
})
export class ComponentModule { }
