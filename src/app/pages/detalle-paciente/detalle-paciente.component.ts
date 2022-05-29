import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '../../interfaces/paciente.interfaces';
import { Turno } from '../../interfaces/turno.interfaces';
import { PacienteService } from '../../service/paciente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSnackbarComponent } from '../../component/dialog-snackbar/dialog-snackbar.component';
import { TurnoService } from '../../service/turno.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from '../../component/confirmacion/confirmacion.component';

@Component({
  selector: 'app-detalle-paciente',
  templateUrl: './detalle-paciente.component.html',
  styleUrls: ['./detalle-paciente.component.scss']
})
export class DetallePacienteComponent implements OnInit {

  public idPaciente: any;
  public routerVolver: string;
  public paciente: any;
  public historial: any[];

  constructor(private router: Router,
              private routerAct: ActivatedRoute,
              private pacienteService: PacienteService,
              private turnoService: TurnoService,
              public _snackBar: MatSnackBar,
              public dialog: MatDialog) {
    this.routerVolver = "/paciente";
    this.idPaciente = this.routerAct.snapshot.paramMap.get('id');
    this.historial = [];
    this.paciente =  {documento     : "",
                      tipo_documento : "",
                      nombre        : "",
                      apellido      : "",
                      calle         : "",
                      numero        : "",
                      codigo_postal : "",
                      barrio        : { _id: "", descripcion: "" },
                      telefono      :  "",
                      correo        : "",
                      fecha_nacimiento : "",
                      antecedente   : { _id: "", biotipo: "", fototipo: "", afeccion_cutanea: "", alergias: "", medicamentos: "", tratamientos_clinicos: ""}
                    };
    this.getPaciente();
   }

  ngOnInit(): void {
    // this.getPaciente();
  }

  getPaciente() {
    this.pacienteService.consultarPaciente( this.idPaciente )
        .subscribe( resp => {
          console.log(resp);
          if( resp ){
            this.paciente =  {
              _id            : this.idPaciente,
              documento     : resp.documento,
              tipo_documento : resp.tipo_documento,
              nombre        : resp.nombre,
              apellido      : resp.apellido,
              calle         : resp.calle,
              numero        : resp.numero,
              codigo_postal : resp.codigo_postal,
              barrio        : { _id: resp.id_barrio },
              telefono      :  resp.telefono,
              correo        : resp.correo,
              fecha_nacimiento : resp.fecha_nacimiento,
              antecedente   : { _id: resp.id_antecedente }
            };
          }
        },
        () => {
          this._snackBar.openFromComponent(DialogSnackbarComponent,{ 
            data: { icono: 'report', mensaje: "Error al consultar paciente", titulo: 'Error'},
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ["snack-bar-err"]
          });    
        },
        () => {
          this.getAntecedente()
        });
  }

  getAntecedente() {
    this.pacienteService.consultarAntecedentes(this.paciente.antecedente._id)
        .subscribe( resp => {
          if(resp){
            this.paciente.antecedente.biotipo = resp.biotipo;
            this.paciente.antecedente.fototipo = resp.fototipo;
            this.paciente.antecedente.afeccion_cutanea = resp.afeccion_cutanea;
            this.paciente.antecedente.alergias = resp.alergias;
            this.paciente.antecedente.medicamentos = resp.medicamentos;
            this.paciente.antecedente.tratamientos_clinicos = resp.tratamientos_clinicos;
          }
        },
        () => {
          this._snackBar.openFromComponent(DialogSnackbarComponent,{ 
            data: { icono: 'report', mensaje: "Error al consultar anecedentes del paciente", titulo: 'Error'},
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ["snack-bar-err"]
          });    
        },
        () => {
            this.getLocalidad();
        });
  }

  getLocalidad(){
    this.pacienteService.getLocalidadId(this.paciente.barrio._id)
        .subscribe( resp => {
          if(resp){
            this.paciente.barrio.descripcion = resp.descripcion;
          }
        },
        () => {
          this._snackBar.openFromComponent(DialogSnackbarComponent,{ 
            data: { icono: 'report', mensaje: "Error al consultar la localidad", titulo: 'Error'},
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ["snack-bar-err"]
          });    
        }, 
        () => {
            this.buscarHistorial();
        });
  }

  buscarHistorial(){
      this.turnoService.buscarHistorialDelPaciente(this.idPaciente)
          .subscribe( resp =>{
              if(resp){
                this.historial = resp;
              }
          },
          () => {
            this._snackBar.openFromComponent(DialogSnackbarComponent,{ 
              data: { icono: 'warning_amber', mensaje: "No se encontro historial para el paciente", titulo: 'Historial'},
              duration: 4000,
              horizontalPosition: "right",
              verticalPosition: "top",
              panelClass: ["snack-bar-war"]
            });    
          });
  }

  volver(){
    this.router.navigateByUrl(this.routerVolver);
  }

  modificar() {
    
  }

  eliminar() {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '270px',
      data: {
          msj: '¿Esta seguro que desea dar de baja al paciente \"' + this.paciente.nombre + ' ' + this.paciente.apellido + '\"?',
          titulo: "Eliminar paciente"
        }
    });
    dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.eliminarPaciente();
        }
    });

  }

  eliminarPaciente() {
    this.pacienteService.eliminarPorId(this.paciente._id)
        .subscribe( resp => {
          if(resp){
            this._snackBar.openFromComponent(DialogSnackbarComponent,{ 
              data: { icono: 'done', mensaje: 'Se elimino con exito al paciente', titulo: 'Eliminado'},
              duration: 4000,
              horizontalPosition: "right",
              verticalPosition: "top",
              panelClass: ["snack-bar-ok"]
            });
            this.volver();
          }
        },
        () => {
          this._snackBar.openFromComponent(DialogSnackbarComponent,{ 
            data: { icono: 'report', mensaje: "Error intentar eliminar el paciente", titulo: 'Error'},
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ["snack-bar-err"]
          });    
        })
  }
}
