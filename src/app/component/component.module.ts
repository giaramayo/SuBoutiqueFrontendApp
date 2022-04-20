import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main/main.component';

import { ComponentRoutingModule } from './component-routing.module';

import { MaterialModule } from './material/material.module';
import { MenuComponent } from './menu/menu.component'
import { ImagenPipe } from '../pipes/imagen.pipe';

@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    ImagenPipe
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    MaterialModule
  ]
})
export class ComponentModule { }
