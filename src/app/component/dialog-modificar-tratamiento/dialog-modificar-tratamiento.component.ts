import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tratamiento } from '../../interfaces/tratamiento.interfaces';
import { TratamientoService } from '../../service/tratamiento.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-modificar-tratamiento',
  templateUrl: './dialog-modificar-tratamiento.component.html',
  styleUrls: ['./dialog-modificar-tratamiento.component.scss']
})
export class DialogModificarTratamientoComponent {

  public tratamiento: any;
  public titulo: string;

  public formTratamiento: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogModificarTratamientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tratamiento,
    private TratamientoService: TratamientoService ) {
          dialogRef.disableClose = true;
          this.tratamiento = data;
          this.titulo = data._id ? 'Modificar Tratamiento' : 'Agregar Tratamiento';

          this.formTratamiento = new FormGroup({
            descripcion: new FormControl('', Validators.required),
            precio: new FormControl('', Validators.required),
            // duracion: new FormControl('', Validators.required),
          });
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  guardar(){
    if(this.data._id)
        this.modificar();
    else 
       this.crear();    
  }

  modificar() {
    this.TratamientoService.modificar(this.tratamiento)
    .subscribe( resp => {
       this.dialogRef.close(resp);
      });
  }

  crear() {
    this.TratamientoService.crear(this.tratamiento)
    .subscribe( resp => {
      this.dialogRef.close(resp);
    });
  }

}