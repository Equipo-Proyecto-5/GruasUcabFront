import { IProvider } from '@/models/Provider';
import toast from 'react-hot-toast';
//import Providerss from '@/presentation/AdministratorView/pages/Providerss/Providerss';

export const fetchProvidersApi = async () => {
    const response = await fetch('https://localhost:7255/Proveedores');// Colocar la URL de tu backend cuando se configure el cors
    if (!response.ok) {
        throw new Error('Failed to fetch providers');
    }
    const data = await response.json();
    return data;
};


export const createProviderApi = async (provider: IProvider): Promise<IProvider> => {
    const response = await fetch('https://localhost:7255/Proveedores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(provider),
    });

    if (!response.ok) {
        toast.error('Error Proveedor ya Registrado');
    }
    return response.json(); // Devuelve la respuesta sin adaptar
};


export const updateProviderApi = async (provider: IProvider): Promise<IProvider | null> => {
    if (!provider || !provider.id) {
        throw new Error('Provider or provider.id is missing');
    }

    const response = await fetch(`https://localhost:7255/Proveedores/${provider.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(provider),
    });

    if (!response.ok) {
        throw new Error('Failed to update provider');
    }

    if (response.status === 204) {
        // No hay contenido en la respuesta, simplemente retornamos null
        return null;
    }

    // Para cualquier otra respuesta (200 OK o similar), intentamos parsear la respuesta como JSON
    return response.json();
};

export const deleteProviderApi = async (id: string): Promise<void> => {
    const response = await fetch(`https://localhost:7255/Proveedores/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete provider');
    }

    // Si la eliminación es exitosa, simplemente no necesitamos devolver nada
    return;
};


