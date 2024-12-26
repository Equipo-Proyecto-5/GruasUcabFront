import { IRepProvider} from '@/models/RepProvider';
import toast from 'react-hot-toast';
//import Providerss from '@/presentation/AdministratorView/pages/Providerss/Providerss';

export const fetchRepProviderApi = async () => {
    const response = await fetch('https://localhost:7157/api/Usuario/RepresentanteProveedor');// Colocar la URL de tu backend cuando se configure el cors
    if (!response.ok) {
        throw new Error('Failed to fetch Representative of the providers');
    }
    const data = await response.json();
    return data;
};


export const createRepProviderApi = async (repProvider: IRepProvider): Promise<IRepProvider> => {
    repProvider.tipoUsuario="RepresentanteProveedor"
    const { id, ...newRepProvider } =repProvider ;
    newRepProvider.documentoTransito=null;
    newRepProvider.gradoLicencia=null;

    console.log(newRepProvider)
    const response = await fetch('https://localhost:7157/api/Usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRepProvider),
    });

    if (!response.ok) {
        toast.error('Error al Registrar el representante de proveedor');
    }
    return response.json(); // Devuelve la respuesta sin adaptar
};


export const updateRepProviderApi = async (repProvider: IRepProvider): Promise<IRepProvider | null> => {
    if (!repProvider || !repProvider.id) {
        throw new Error('Representative of the provider or RepProvider.id is missing');
    }
    console.log("estas en la api")
    repProvider.tipoUsuario="RepresentanteProveedor"
    console.log(repProvider)

    const response = await fetch(`https://localhost:7157/api/Usuario/${repProvider.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(repProvider),
    });

    if (!response.ok) {
        throw new Error('Failed to update Representative of the provider  ');
    }

    if (response.status === 204) {
        // No hay contenido en la respuesta, simplemente retornamos null
        return null;
    }

    // Para cualquier otra respuesta (200 OK o similar), intentamos parsear la respuesta como JSON
    return response.json();
};

export const deleteRepProviderApi = async (id: string): Promise<void> => {
    const response = await fetch(`https://localhost:7157/api/Usuario/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete Representative of the provider');
    }

    // Si la eliminación es exitosa, simplemente no necesitamos devolver nada
    return;
};


