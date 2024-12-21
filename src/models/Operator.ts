
export interface IOperator {
    id?: string | number;
    tipoUsuario:string,
    primerNombre: string;
    primerApellido: string;
    segundoNombre?: string;
    segundoApellido?: string;
    fechaNacimiento: string;
    numeroTelefono: string;
    direccion:string;
    tipoDocumentoIdentidad:string;
    numeroDocumentoIdentidad:string;
    correo:string;
    contrasena:string;
    gradoLicencia?:string| null;
    idEmpresaProveedor?:string| null;
    documentoTransito?:string| null;
};
