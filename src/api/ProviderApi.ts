import { Provider } from '@/models/Provider';

export const fetchProvidersApi = async () => {
    const response = await fetch('/Proveedores');// Colocar la URL de tu backend cuando se configure el cors
    if (!response.ok) {
        throw new Error('Failed to fetch providers');
    }
    const data = await response.json();
    return data;
};


export const createProviderApi = async (provider: Provider): Promise<Provider> => {
    const response = await fetch('/Proveedores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(provider),
    });

    if (!response.ok) {
        throw new Error('Failed to create provider');
    }
    return response.json(); // Devuelve la respuesta sin adaptar
};