import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PacienteService } from '../../service/paciente.service';
import { TurnoService } from '../../service/turno.service';
import { DialogHistorialComponent } from '../dialog-historial/dialog-historial.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSnackbarComponent } from '../dialog-snackbar/dialog-snackbar.component';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-paciente',
  templateUrl: './lista-paciente.component.html',
  styleUrls: ['./lista-paciente.component.scss'],
})

export class ListaPacienteComponent {

  @Input() dataSource: any;
  public displayedColumns: string[] = ['dni', 'nomApe', 'fecha', 'tel', 'consulta', 'detalle'];
  private routerDetalle: string = "paciente/detalle";

  private historial: any[];
  private antecedente: any;

  constructor(public _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private pacienteService: PacienteService,
    private turnoService: TurnoService,
    private router: Router) {
    this.historial = [];
    this.antecedente = {
      biotipo: '',
      fototipo: '',
      alergias: '',
      medicamentos: '',
      tratamientos_clinicos: ''
    };
  }

  detalle(element: any) {
    this.router.navigateByUrl(this.routerDetalle + "/" + element._id + "/paciente");
  }

  getPacientes() {
    this.pacienteService.getPacientes()
      .subscribe(resp => {
        this.dataSource = new MatTableDataSource(resp);
      });
  }

  consultarHistorias(element: any) {
    this.turnoService.buscarHistorialDelPaciente(element._id)
      .subscribe(resp => {
        if (resp) {
          this.historial = resp;
          this.getAntecedente(element);
        }
      },
        err => {
          this._snackBar.openFromComponent(DialogSnackbarComponent, {
            data: { icono: 'report', mensaje: err.error.error, titulo: 'Error' },
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "bottom",
            panelClass: ["snack-bar-err"]
          });
        });
  }

  getAntecedente(element: any) {
    this.pacienteService.consultarAntecedentes(element.id_antecedente)
      .subscribe(resp => {
        if (resp) {
          this.antecedente.biotipo = resp.biotipo;
          this.antecedente.fototipo = resp.fototipo;
          this.antecedente.afeccion_cutanea = resp.afeccion_cutanea;
          this.antecedente.alergias = resp.alergias;
          this.antecedente.medicamentos = resp.medicamentos;
          this.antecedente.tratamientos_clinicos = resp.tratamientos_clinicos;
        }
      },
        () => {
          console.log("error al consultar antecedentes")
        },
        () => {
          this.dialogConsultaHistorial(element);
        });
  }

  dialogConsultaHistorial(element: any) {
    const dialogRef = this.dialog.open(DialogHistorialComponent, {
       width: '90%',
     // maxHeight: '90vh',
      data: {
        dataSource: this.historial,
        paciente: element,
        antecedente: this.antecedente,
        titulo: 'Historial de ' + element.apellido + ', ' + element.nombre
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.historial = [];
      this.antecedente = {
        biotipo: '',
        fototipo: '',
        alergias: '',
        medicamentos: '',
        tratamientos_clinicos: ''
      };
    });
  }
}
