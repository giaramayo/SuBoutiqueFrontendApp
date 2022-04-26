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

@NgModule({
  declarations: [
    ImagenPipe,
    AppComponent,
    MenuComponent,
    ErrorPageComponent,
    PacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
