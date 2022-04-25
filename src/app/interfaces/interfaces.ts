export interface Login {
    ok          : boolean;
    uid?        : string;
    name?       : string;
    contrasenia?: string;
    token?      : string;
    msg?        : string;
}