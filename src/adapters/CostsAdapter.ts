import { ICosts } from "@/models/Costs";

export const adaptCostsData = (costs: ICosts): ICosts => {
    return {
        idOrden: costs.idOrden,
        id: costs.id,
        costo: costs.costo,
        descripcion: costs.descripcion,
        monto: costs.monto,
        nombre: costs.nombre,
        estatus: costs.estatus,
    };
}