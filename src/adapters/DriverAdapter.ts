import { IDriver } from "@/models/Driver";


export const adaptDriverData = (driver: IDriver): IDriver => {
    return {
        id: driver.id,
        tipoUsuario: driver.tipoUsuario,
        primerNombre: driver.primerNombre,
        primerApellido: driver.primerApellido,
        segundoNombre: driver.segundoNombre,
        segundoApellido: driver.segundoApellido,
        fechaNacimiento: driver.fechaNacimiento,
        numeroTelefono: driver.numeroTelefono,
        direccion: driver.direccion,
        tipoDocumentoIdentidad: driver.tipoDocumentoIdentidad,
        numeroDocumentoIdentidad: driver.numeroDocumentoIdentidad,
        correo: driver.correo,
        contrasena: driver.contrasena,
        gradoLicencia: driver.gradoLicencia,
        idEmpresaProveedor: driver.idEmpresaProveedor,
        documentosTransito: driver.documentosTransito.map((doc: any) => ({
          tipoDocumento: doc.tipoDocumento,
          numeroDocumento: doc.numeroDocumento,
          fechaEmision: doc.fechaEmision,
          fechaVencimiento: doc.fechaVencimiento,
          urlImagen: doc.urlImagen
        })),
        idGruaAsociada: driver.idGruaAsociada
      };
    };
