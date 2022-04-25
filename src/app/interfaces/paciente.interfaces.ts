import { Login } from './interfaces';


export interface Paciente {
    id            : number;
    dni           : number;
    tipoDocumento : string;
    nombre        : string;
    apellido      : string;
    barrio        : Barrio;
    telefono      : string;
    email         : string;
    fechaNac      : Date;
    login         : Login;
    antecedente   : antecedentesClinicos;
}

export interface antecedentesClinicos {
    id                  : number;
    biotipo             : string;
    fototipo            : number;
    afectacionCutanea   : string;
    alergias            : string;
    medPrescriptos      : string;
    tratamiento         : string;
}

export interface Barrio {
    id      : number;
    nombre  : string
}

