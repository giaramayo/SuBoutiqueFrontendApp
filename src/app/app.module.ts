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
import { ListaTratamientoComponent } from './component/lista-tratamiento/lista-tratamiento.component';
import { DialogModificarTratamientoComponent } from './component/dialog-modificar-tratamiento/dialog-modificar-tratamiento.component';
import { GraficoComponent } from './component/grafico/grafico.component';
import { NumberPipe } from './pipes/number.pipe';
import { ConfirmacionComponent } from './component/confirmacion/confirmacion.component';
import { HistorialComponent } from './component/historial/historial.component';
import { ListaHistorialComponent } from './component/lista-historial/lista-historial.component';
import { DialogHistorialComponent } from './component/dialog-historial/dialog-historial.component';
import { DialogSnackbarComponent } from './component/dialog-snackbar/dialog-snackbar.component';
import { DetallePacienteComponent } from './pages/detalle-paciente/detalle-paciente.component';
import { DialogAgendarTurnoComponent } from './component/dialog-agendar-turno/dialog-agendar-turno.component';

@NgModule({
  declarations: [
    ImagenPipe,
    NumberPipe,
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
    EstadisticasComponent,
    ListaTratamientoComponent,
    DialogModificarTratamientoComponent,
    GraficoComponent,
    ConfirmacionComponent,
    HistorialComponent,
    ListaHistorialComponent,
    DialogHistorialComponent,
    DialogSnackbarComponent,
    DetallePacienteComponent,
    DialogAgendarTurnoComponent
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
