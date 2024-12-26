import {IRepProvider  } from "@/models/RepProvider";


export const adaptRepProviderData = (repProvider: IRepProvider): IRepProvider => {
    return {
        id: repProvider.id,
        tipoUsuario:repProvider.tipoUsuario,
        primerNombre: repProvider.primerNombre,
        primerApellido: repProvider.primerApellido,
        segundoNombre: repProvider.segundoNombre,
        segundoApellido: repProvider.segundoApellido,
        fechaNacimiento: repProvider.fechaNacimiento,
        numeroTelefono: repProvider.numeroTelefono,
        direccion:repProvider.direccion,
        tipoDocumentoIdentidad:repProvider.tipoDocumentoIdentidad,
        numeroDocumentoIdentidad:repProvider.numeroDocumentoIdentidad,
        correo:repProvider.correo,
        contrasena:repProvider.contrasena,
        gradoLicencia:null,
        idEmpresaProveedor:repProvider.idEmpresaProveedor,
        documentoTransito:null
    };
};
