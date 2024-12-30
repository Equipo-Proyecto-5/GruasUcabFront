export interface IOrder {
    id?: string | number;
    fecha: Date;
    polizaFechaInicio: string;
    polizaFechaFin: string;
    detallesIncidente: string;
    direccionOrigen: string;
    direccionDestino: string;
    cantidadKmExtra?: string;
    costosServiciosAdicionales?: string;
    costoTotalKmExtra?: string;
    costoTotal: string;
    nombreDenunciante: string;
    tipoDocumentoDenunciante: string;
    numeroDocumentoDenunciante: string;
    estatus?: string;
    Administratorid?: string | number | null;
    Craneid?: string | number | null;
    Operatorsid?: string | number | null;
    marca: string;
    modelo: string;
    anio: string;

    
  
    polizaAseguradoId: string | number;
    nombreAsegurado: string;
    documentoIdentidad: string;
    coberturaBasePoliza: number;
    distanciaCoberturaPoliza: number;
    tipoPoliza: string;
    placaVehiculo: string;
    informacionVehiculo: string;
    tipoVehiculo: string;
};
