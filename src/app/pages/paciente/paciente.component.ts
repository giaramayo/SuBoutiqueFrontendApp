import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PacienteService } from 'src/app/service/paciente.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-paciente-inicio',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})

export class PacienteComponent implements OnInit {

  public dataSource: any;
  public botonFiltroLoading: boolean;
  public routerAgregar: string;
  public cargando: boolean;

  constructor( private _snackBar: MatSnackBar,
               private pacienteService: PacienteService,
               private router: Router) {  

    this.botonFiltroLoading = false;
    this.routerAgregar = '/paciente/agregar/paciente';
    this.cargando = true;
   }

  ngOnInit(): void {
    this.getPacientes();
  }

  getPacientes() {
    this.pacienteService.getPacientes().subscribe( resp => {
          this.dataSource = new MatTableDataSource(resp);
        },
        err => {
          console.log(err);
          this.cargando = false;
        },
        () => {
          this.cargando = false;
        });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  agregar(){
    this.router.navigateByUrl(this.routerAgregar);
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
