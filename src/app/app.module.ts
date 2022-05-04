import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MenuComponent } from './component/menu/menu.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ImagenPipe } from './pipes/imagen.pipe';
import { MaterialModule } from './modules/material/material.module';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { CardComponent } from './component/card/card.component';
import { ListaPacienteComponent } from './component/lista-paciente/lista-paciente.component';
import { MatButtonLoadingDirective } from './directive/mat-button-loading.directive';
import {MatProgressSpinner, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PacienteAgregarComponent } from './pages/paciente-agregar/paciente-agregar.component';
import { TratamientoComponent } from './pages/tratamiento/tratamiento.component';
import { TurnoComponent } from './pages/turno/turno.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';

@NgModule({
  declarations: [
    ImagenPipe,
    AppComponent,
    MenuComponent,
    ErrorPageComponent,
    PacienteComponent,
    CardComponent,
    ListaPacienteComponent,
    MatButtonLoadingDirective,
    PacienteAgregarComponent,
    TratamientoComponent,
    TurnoComponent,
    EstadisticasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  entryComponents: [MatProgressSpinner],
  bootstrap: [AppComponent]
})

export class AppModule { }
