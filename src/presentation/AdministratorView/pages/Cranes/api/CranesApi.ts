import { ICranes } from '@/models/Cranes';
import toast from 'react-hot-toast';



const API_URL = import.meta.env.VITE_API_URL;


export const createCranesApi = async (cranes: ICranes): Promise<ICranes> => {
    const response = await fetch(`${API_URL}/Gruas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cranes),
    });

    if (!response.ok) {
        toast.error('Error Grua ya Registrada');
    }
    return response.json(); // Devuelve la respuesta sin adaptar
};


export const fetchCranesApi = async () => {
    const response = await fetch(`${API_URL}/Gruas`);// Colocar la URL de tu backend cuando se configure el cors
    if (!response.ok) {
        throw new Error('Failed to fetch cranes');
    }
    const data = await response.json();
    return data;
};



export const updateCranesApi = async (cranes: ICranes): Promise<ICranes | null> => {
    if (!cranes || !cranes.id) {
        throw new Error('Craner or craner.id is missing');
    }

    const response = await fetch(`${API_URL}/Gruas/${cranes.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cranes),
    });

    if (!response.ok) {
        throw new Error('Failed to update cranes');
    }

    if (response.status === 204) {
        // No hay contenido en la respuesta, simplemente retornamos null
        return null;
    }

    // Para cualquier otra respuesta (200 OK o similar), intentamos parsear la respuesta como JSON
    return response.json();
};


export const deleteCranesApi = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/Gruas/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete craner');
    }

    // Si la eliminación es exitosa, simplemente no necesitamos devolver nada
    return;
};




