export interface IProvider {
    id?: string | number;
    denominacionComercial: string;
    razonSocial: string;
    direccionFisica: string;
    tipoDocumentoIdentidad: string;
    numeroDocumentoIdentidad: string;
    estatus?: string;
};
