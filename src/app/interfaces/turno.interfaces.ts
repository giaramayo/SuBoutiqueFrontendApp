import { Paciente } from './paciente.interfaces';
import { Tratamiento } from './tratamiento.interfaces';

export interface Turno {
    _id           : number;
    paciente     : Paciente;
    tratamiento  : Tratamiento;
    estado       : Estado;
    fechaHora    : Date;
    observacion  : string;
}


export interface Estado {
    id          : number;
    descripcion : string;
}