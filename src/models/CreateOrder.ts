
export interface ICreateOrder {
    detallesIncidente: string;
    direccionOrigen: string;
    direccionDestino: string;
    nombreDenunciante: string;
    tipoDocumentoDenunciante: string;
    numeroDocumentoDenunciante: string;
    polizaAseguradoId: string | number;
    administrador?: string | null | number;
    operador?: string | null | number;
  }