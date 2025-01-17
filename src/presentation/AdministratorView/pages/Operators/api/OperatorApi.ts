import { IOperator } from '@/models/Operator';
import toast from 'react-hot-toast';
//import Providerss from '@/presentation/AdministratorView/pages/Providerss/Providerss';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchOperatorApi = async () => {
    const response = await fetch(`${API_URL}/api/Usuario/Operador`);// Colocar la URL de tu backend cuando se configure el cors
    if (!response.ok) {
        throw new Error('Failed to fetch Operadores');
    }
    const data = await response.json();
    return data;
};


export const createOperatorApi = async (operator: IOperator): Promise<IOperator> => {
    operator.tipoUsuario="Operador"
    const { id, ...newOperator } = operator;
    newOperator.documentoTransito=null;
    newOperator.idEmpresaProveedor=null;
    newOperator.gradoLicencia=null;

    console.log(newOperator)
    const response = await fetch(`${API_URL}/api/Usuario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOperator),
    });

    if (!response.ok) {
        toast.error('Error al Registrar el operador');
    }
    return response.json(); // Devuelve la respuesta sin adaptar
};


export const updateOperatorApi = async (operator: IOperator): Promise<IOperator | null> => {
    if (!operator || !operator.id) {
        throw new Error('Operador or provider.id is missing');
    }
    console.log(operator)
    operator.tipoUsuario="Operador"
    console.log(operator)

    const response = await fetch(`${API_URL}/api/Usuario/${operator.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(operator),
    });

    if (!response.ok) {
        throw new Error('Failed to update operador');
    }

    if (response.status === 204) {
        // No hay contenido en la respuesta, simplemente retornamos null
        return null;
    }

    // Para cualquier otra respuesta (200 OK o similar), intentamos parsear la respuesta como JSON
    return response.json();
};

export const deleteOperatorApi = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/api/Usuario/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete Operador');
    }

    // Si la eliminación es exitosa, simplemente no necesitamos devolver nada
    return;
};


