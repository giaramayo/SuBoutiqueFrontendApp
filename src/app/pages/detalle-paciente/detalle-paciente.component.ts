import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../service/paciente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSnackbarComponent } from '../../component/dialog-snackbar/dialog-snackbar.component';
import { TurnoService } from '../../service/turno.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from '../../component/confirmacion/confirmacion.component';
import { DialogAgendarTurnoComponent } from '../../component/dialog-agendar-turno/dialog-agendar-turno.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-detalle-paciente',
  templateUrl: './detalle-paciente.component.html',
  styleUrls: ['./detalle-paciente.component.scss']
})
export class DetallePacienteComponent implements OnInit {

  public idPaciente: any;
  public routerVolver: any;
  public routerPaciente: any = "/paciente/modificar";
  public paciente: any;
  public historial: any;
  public step: number;
  public cargando: boolean;
  // public fechaNacimiento = new Date();

  constructor(private router: Router,
    private routerAct: ActivatedRoute,
    private pacienteService: PacienteService,
    private turnoService: TurnoService,
    public _snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.cargando = true;
    this.idPaciente = this.routerAct.snapshot.paramMap.get('id');
    this.routerVolver = this.routerAct.snapshot.paramMap.get('pages');
    this.step = 0;
   // this.historial = [];
    this.paciente = {
      documento: "",
      tipo_documento: "",
      nombre: "",
      apellido: "",
      calle: "",
      numero: "",
      codigo_postal: "",
      barrio: { _id: "", descripcion: "" },
      telefono: "",
      correo: "",
      fecha_nacimiento: "",
      antecedente: { _id: "", biotipo: "", fototipo: "", afeccion_cutanea: "", alergias: "", medicamentos: "", tratamientos_clinicos: "" }
    };
    //this.getPaciente();
  }

  ngOnInit(): void {
    this.getPaciente();
  }

  getPaciente() {
    this.pacienteService.consultarPaciente(this.idPaciente)
      .subscribe(resp => {
        if (resp) {
          this.paciente = {
            _id: this.idPaciente,
            documento: resp.documento,
            tipo_documento: resp.tipo_documento,
            nombre: resp.nombre,
            apellido: resp.apellido,
            calle: resp.calle,
            numero: resp.numero,
            codigo_postal: resp.codigo_postal,
            barrio: { _id: resp.id_barrio },
            telefono: resp.telefono,
            correo: resp.correo,
            fecha_nacimiento: resp.fecha_nacimiento,
            edad: resp.edad,
            antecedente: { _id: resp.id_antecedente }
          };
          // this.fechaNacimiento.setDate(resp.fecha_nacimiento.substring(8,10));
          // this.fechaNacimiento.setMonth(resp.fecha_nacimiento.substring(5,7));
          // this.fechaNacimiento.setFullYear(resp.fecha_nacimiento.substring(0,4));
        }
      },
        () => {
          this._snackBar.openFromComponent(DialogSnackbarComponent, {
            data: { icono: 'report', mensaje: "Error al consultar paciente", titulo: 'Error' },
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "bottom",
            panelClass: ["snack-bar-err"]
          });
          this.cargando = false;
        },
        () => {
          this.getAntecedente();
        });
  }

  getAntecedente() {
    this.pacienteService.consultarAntecedentes(this.paciente.antecedente._id)
      .subscribe(resp => {
        if (resp) {
          this.paciente.antecedente.biotipo = resp.biotipo;
          this.paciente.antecedente.fototipo = resp.fototipo;
          this.paciente.antecedente.afeccion_cutanea = resp.afeccion_cutanea;
          this.paciente.antecedente.alergias = resp.alergias;
          this.paciente.antecedente.medicamentos = resp.medicamentos;
          this.paciente.antecedente.tratamientos_clinicos = resp.tratamientos_clinicos;
        }
      },
        (err) => {
          // this._snackBar.openFromComponent(DialogSnackbarComponent,{ 
          //   data: { icono: 'report', mensaje: "Error al consultar anecedentes del paciente", titulo: 'Error'},
          //   duration: 4000,
          //   horizontalPosition: "right",
          //   verticalPosition: "bottom",
          //   panelClass: ["snack-bar-err"]
          // });    
          console.log(err)
          this.cargando = false;
        },
        () => {
          this.getLocalidad();
        });
  }

  getLocalidad() {
    this.pacienteService.getLocalidadId(this.paciente.barrio._id)
      .subscribe(resp => {
        if (resp) {
          this.paciente.barrio.descripcion = resp.descripcion;
        }
      },
        () => {
          this._snackBar.openFromComponent(DialogSnackbarComponent, {
            data: { icono: 'report', mensaje: "Error al consultar la localidad", titulo: 'Error' },
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "bottom",
            panelClass: ["snack-bar-err"]
          });
          this.cargando = false;
        },
        () => {
          this.buscarHistorial();
        });
  }

  buscarHistorial() {
    this.turnoService.buscarHistorialDelPaciente(this.idPaciente)
      .subscribe(resp => {
        if (resp) {
          this.historial = new MatTableDataSource(resp);
        }
      },
        () => {
          this._snackBar.openFromComponent(DialogSnackbarComponent, {
            data: { icono: 'warning_amber', mensaje: "No se encontro historial para el paciente", titulo: 'Historial' },
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "bottom",
            panelClass: ["snack-bar-war"]
          });
          this.cargando = false;
        },
        () => {
          this.cargando = false;
        });
  }

  volver() {
    this.router.navigateByUrl(this.routerVolver);
  }

  modificar() {
    this.router.navigateByUrl(this.routerPaciente + "/" + this.idPaciente + "/" + this.routerVolver);
  }

  eliminar() {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      // width: '270px',
      data: {
        msj: '¿Esta seguro que desea dar de baja al paciente \"' + this.paciente.nombre + ' ' + this.paciente.apellido + '\"?',
        titulo: "Eliminar paciente"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarPaciente();
      }
    });

  }

  eliminarPaciente() {
    this.cargando = true;
    this.pacienteService.eliminarPorId(this.paciente._id)
      .subscribe(resp => {
        if (resp) {
          this._snackBar.openFromComponent(DialogSnackbarComponent, {
            data: { icono: 'done', mensaje: 'Se elimino con exito al paciente', titulo: 'Eliminado' },
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "bottom",
            panelClass: ["snack-bar-ok"]
          });
          this.volver();
        }
      },
        () => {
          this._snackBar.openFromComponent(DialogSnackbarComponent, {
            data: { icono: 'report', mensaje: "Error intentar eliminar el paciente", titulo: 'Error' },
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "bottom",
            panelClass: ["snack-bar-err"]
          });
          this.cargando = false;
        },
        () => {
          this.cargando = false;
        })
  }

  agendar() {
    const dialogRef = this.dialog.open(DialogAgendarTurnoComponent, {
      width: '270px',
      data: {
        fecha: new Date()
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.historial.filter = filterValue.trim().toLowerCase();
  }

}
