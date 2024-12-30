import { ICreateOrder } from "@/models/CreateOrder";



export const adaptCreateOrdersAdapter = (order: ICreateOrder): ICreateOrder => {
    return {
        detallesIncidente: order.detallesIncidente,
        direccionOrigen: order.direccionOrigen,
        direccionDestino: order.direccionDestino,
        nombreDenunciante: order.nombreDenunciante,
        tipoDocumentoDenunciante: order.tipoDocumentoDenunciante,
        numeroDocumentoDenunciante: order.numeroDocumentoDenunciante,
        polizaAseguradoId: order.polizaAseguradoId,
        administrador: order.administrador,
        operador: order.operador,
    };
};