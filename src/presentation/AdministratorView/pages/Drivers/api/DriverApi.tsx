import { IDriver } from '@/models/Driver';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchDriverApi = async () => {
    const response = await fetch(`${API_URL}/api/Usuario/Conductor`,);
    if (!response.ok) {
        throw new Error('Failed to fetch driver');
    }
    const data = await response.json();
    return data;
};


export const createDriverApi = async (driver: IDriver): Promise<IDriver> => {
   
   const driverToSend = {
       ...driver,
        tipoUsuario: 'Conductor', // Tipo de usuario fijo
        segundoNombre: driver.segundoNombre || null,  
        segundoApellido: driver.segundoApellido || null,  
        //idEmpresaProveedor:null no esta llenando este campo
    };
    console.log("Crear")
    console.log(driverToSend)

    const response = await fetch(`${API_URL}/api/Usuario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(driverToSend), 
    });

    if (!response.ok) {
        console.log(response)
        toast.error('Error Conductor ya Registrado');
    }

    return response.json(); // Devuelve la respuesta sin adaptar
};



export const updateDriverApi = async (driver: IDriver): Promise<IDriver | null> => {
    console.log(driver);
   // driver.idEmpresaProveedor="e2c1af61-27a3-44ee-bd19-c5282d05eb7d";//se quita esto debe traero la peticion
    driver.tipoUsuario="Conductor"
    
    if (!driver || !driver.id) {
        throw new Error('Provider or provider.id is missing');
    }
        console.log(driver);
    const response = await fetch(`${API_URL}/api/Usuario/${driver.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(driver),
    });

    if (!response.ok) {
        throw new Error('Failed to update driver');
    }

    if (response.status === 204) {
        // No hay contenido en la respuesta, simplemente retornamos null
        return null;
    }

    // Para cualquier otra respuesta (200 OK o similar), intentamos parsear la respuesta como JSON
    return response.json();
};

export const deleteDriverApi = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/api/Usuario/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete driver');
    }

    // Si la eliminación es exitosa, simplemente no necesitamos devolver nada
    return;
};


