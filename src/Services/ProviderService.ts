
import { createProviderApi, fetchProvidersApi } from '../api/ProviderApi';
import { adaptProviderData } from '../adapters/ProviderAdapter';
import { Provider } from '../models/Provider';

export const fetchProviders = async (): Promise<Provider[]> => {
    const providersData = await fetchProvidersApi();
    return providersData.map(adaptProviderData);
};

export const createProvider = async (provider: Provider): Promise<Provider> => {
    const createdProviderData = await createProviderApi(provider); // Llama a la API para crear el proveedor
    return adaptProviderData(createdProviderData); // Adapta el dato del proveedor creado
};

