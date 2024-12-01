import {IOperator  } from "@/models/Operator";


export const adaptOperatorData = (operator: IOperator): IOperator => {
    return {
        id: operator.id,
        tipoUsuario:operator.tipoUsuario,
        primerNombre: operator.primerNombre,
        primerApellido: operator.primerApellido,
        segundoNombre: operator.segundoNombre,
        segundoApellido: operator.segundoApellido,
        fechaNacimiento: operator.fechaNacimiento,
        numeroTelefono: operator.numeroTelefono,
        direccion:operator.direccion,
        tipoDocumentoIdentidad:operator.tipoDocumentoIdentidad,
        numeroDocumentoIdentidad:operator.numeroDocumentoIdentidad,
        correo:operator.correo,
        contrasena:operator.contrasena,
        gradoLicencia:null,
        idEmpresaProveedor:null,
        documentoTransito:null
    };
};
