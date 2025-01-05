

export interface IDriver {

    id?: string | number,
    tipoUsuario: string,  
    primerNombre: string,
    primerApellido: string,
    segundoNombre: string,
    segundoApellido: string,
    fechaNacimiento: string,
    numeroTelefono: string,
    direccion: string,
    tipoDocumentoIdentidad: string,
    numeroDocumentoIdentidad: string,
    correo: string,
    contrasena: string,
    gradoLicencia: string,
    idEmpresaProveedor?: string | number,
    documentosTransito: 
        {
        tipoDocumento: string,
        numeroDocumento: string,
        fechaEmision: string,
        fechaVencimiento: string,
        urlImagen: string
        }[],
    idGruaAsociada?: string | number;

    }