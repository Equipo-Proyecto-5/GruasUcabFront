import { IDepartment} from '@/models/Department';
import toast from 'react-hot-toast';
//import Providerss from '@/presentation/AdministratorView/pages/Providerss/Providerss';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchDepartmentApi = async () => {
    const response = await fetch(`${API_URL}/api/Departamento`);// Colocar la URL de tu backend cuando se configure el cors
    if (!response.ok) {
        throw new Error('Failed to fetch rates');
    }
    const data = await response.json();
    return data;
};


export const createDepartmentApi = async (rate: IDepartment): Promise<IDepartment> => {
    
    const { id, ...newDepartment } = rate;
    

    console.log(newDepartment)
    const response = await fetch(`${API_URL}/api/Departamento`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDepartment),
    });

    if (!response.ok) {
        toast.error('Error al Registrar el departamento');
    }
    return response.json(); // Devuelve la respuesta sin adaptar
};


export const updateDepartmentApi = async (rate: IDepartment): Promise<IDepartment| null> => {
    if (!rate|| !rate.id) {
        throw new Error('Rate or rate.id is missing');
    }
   

    const response = await fetch(`${API_URL}/api/Departamento/${rate.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rate),
    });

    if (!response.ok) {
        throw new Error('Failed to update department');
    }

    if (response.status === 204) {
        // No hay contenido en la respuesta, simplemente retornamos null
        return null;
    }

    // Para cualquier otra respuesta (200 OK o similar), intentamos parsear la respuesta como JSON
    return response.json();
};

export const deleteDepartmentApi = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/api/Departamento/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete department');
    }

    // Si la eliminación es exitosa, simplemente no necesitamos devolver nada
    return;
};


