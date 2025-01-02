import { IOrder } from "@/models/Order";



export const adaptOrderData = (order: IOrder): IOrder => {
    return {
        id: order.id,
        fecha: order.fecha,
        polizaFechaInicio: order.polizaFechaInicio,
        polizaFechaFin: order.polizaFechaFin,
        detallesIncidente: order.detallesIncidente,
        direccionOrigen: order.direccionOrigen,
        direccionDestino: order.direccionDestino,
        cantidadKmExtra: order.cantidadKmExtra,
        costosServiciosAdicionales: order.costosServiciosAdicionales,
        costoTotalKmExtra: order.costoTotalKmExtra,
        costoTotal: order.costoTotal,
        nombreDenunciante: order.nombreDenunciante,
        tipoDocumentoDenunciante: order.tipoDocumentoDenunciante,
        numeroDocumentoDenunciante: order.numeroDocumentoDenunciante,
        estatus: order.estatus?.toLowerCase(),
        Administratorid: order.Administratorid,
        Craneid: order.Craneid,
        Operatorsid: order.Operatorsid,
        marca: order.marca,
        modelo: order.modelo,
        anio: order.anio,

        polizaAseguradoId: order.polizaAseguradoId,
        nombreAsegurado: order.nombreAsegurado,
        documentoIdentidad: order.documentoIdentidad,
        coberturaBasePoliza: order.coberturaBasePoliza,
        distanciaCoberturaPoliza: order.distanciaCoberturaPoliza,
        tipoPoliza: order.tipoPoliza,
        placaVehiculo: order.placaVehiculo,
        informacionVehiculo: order.informacionVehiculo,
        tipoVehiculo: order.tipoVehiculo
    };
};