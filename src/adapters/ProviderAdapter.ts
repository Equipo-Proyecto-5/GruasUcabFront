import { IProvider } from "@/models/Provider";


export const adaptProviderData = (provider: IProvider): IProvider => {
    return {
        id: provider.id,
        denominacionComercial: provider.denominacionComercial,
        razonSocial: provider.razonSocial,
        direccionFisica: provider.direccionFisica,
        tipoDocumentoIdentidad: provider.tipoDocumentoIdentidad,
        numeroDocumentoIdentidad: provider.numeroDocumentoIdentidad,
        estatus: provider.estatus?.toLowerCase(),
    };
};
