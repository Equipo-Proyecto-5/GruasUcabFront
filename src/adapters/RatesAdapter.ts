import { IRate} from "@/models/Rate";


export const adaptRateData = (rate: IRate): IRate => {
    return {
        id: rate.id,
        nombre:rate.nombre,
        costoBase:rate.costoBase,
        distanciaKm:rate.distanciaKm,
        costoPorKm:rate.costoPorKm
    };
};
