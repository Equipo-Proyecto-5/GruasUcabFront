import { ICranes } from "@/models/Cranes";


export const adaptCranesData = (cranes: ICranes): ICranes => {
    return {
        id: cranes.id,
        proveedorId: cranes.proveedorId,
        tipo: cranes.tipo,
        marca: cranes.marca,
        modelo: cranes.modelo,
        año: cranes.año,
        placa: cranes.placa,
        color: cranes.color,
        estatus: cranes.estatus?.toLowerCase() || "inactivo",
    };
};
