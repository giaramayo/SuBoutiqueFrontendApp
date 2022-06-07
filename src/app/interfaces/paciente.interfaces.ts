import { Login } from './interfaces';


export interface Paciente {
    _id            ?: number;
    documento     : string;
    tipo_documento : string;
    nombre        : string;
    apellido      : string;
    calle         : string;
    numero        : number;
    codigo_postal : number;
    barrio        : Barrio;
    telefono      : string;
    correo        : string;
    fecha_nacimiento : Date;
    edad          : number;
    antecedente   : antecedentesClinicos;
}
  //  login         : Login;

export interface antecedentesClinicos {
    _id                 ?: number;
    biotipo              : string;
    fototipo             : number;
    afeccion_cutanea     : string;
    alergias             : string;
    medicamentos         : string;
    tratamientos_clinicos: string;
}

export interface Barrio {
    _id      : number;
    descripcion  : string
}

