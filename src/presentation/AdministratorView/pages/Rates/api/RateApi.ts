import { IRate } from '@/models/Rate';
//import Providerss from '@/presentation/AdministratorView/pages/Providerss/Providerss';


const API_URL = import.meta.env.VITE_API_URL;


export const fetchRateApi = async () => {
    const response = await fetch(`${API_URL}/api/Tarifa`);// Colocar la URL de tu backend cuando se configure el cors
    if (!response.ok) {
        throw new Error('Failed to fetch rates');
    }
    const data = await response.json();
    return data;
};


export const createRateApi = async (rate: IRate): Promise<IRate> => {
    
    const { id, ...newRate } = rate;
    

    console.log(newRate)
    const response = await fetch(`${API_URL}/api/Tarifa`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRate),
    });

    if (!response.ok) {
        throw new Error('Error al registrar la tarifa');
    }

    return response.json(); // Devuelve la respuesta sin adaptar
};


export const updateRateApi = async (rate: IRate): Promise<IRate| null> => {
    if (!rate|| !rate.id) {
        throw new Error('Rate or rate.id is missing');
    }
   

    const response = await fetch(`${API_URL}/api/Tarifa/${rate.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rate),
    });

    if (!response.ok) {
        throw new Error('Fallo la actualizacion de tarifas');
    }

    if (response.status === 204) {
        // No hay contenido en la respuesta, simplemente retornamos null
        return null;
    }

    // Para cualquier otra respuesta (200 OK o similar), intentamos parsear la respuesta como JSON
    return response.json();
};

export const deleteRateApi = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/api/Tarifa/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete rate');
    }

    // Si la eliminación es exitosa, simplemente no necesitamos devolver nada
    return;
};


