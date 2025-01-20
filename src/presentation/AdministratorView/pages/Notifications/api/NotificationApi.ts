import {INotification } from '@/models/Notification';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchNotificationApi = async () => {
    const response = await fetch(`${API_URL}/api/Notificacion`);// Colocar la URL de tu backend cuando se configure el cors
    if (!response.ok) {
        throw new Error('Failed to fetch rates');
    }
    const data = await response.json();
    
    
    return data;
};


export const createNotificationApi = async (notification: INotification): Promise<INotification> => {
    const { id, vigencia, ...newNotification } = notification;

    if (newNotification.tipoEnvio === "Extemporaneo") {
        newNotification.horaEnvio = null;
        newNotification.diaDelMes = null;
        newNotification.frecuencia = null;
        newNotification.diaSemana = null;
    }

    if (newNotification.tipoEnvio === "Recurrente") {
        newNotification.horaEnvio = newNotification.horaEnvio + ":00";
        newNotification.fechaHoraEnvio = null;
        if (newNotification.frecuencia === "Mensual") {
            newNotification.ultimoDia = newNotification.diaDelMes == 0;
        }
    }

    const response = await fetch(`${API_URL}/api/Notificacion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNotification),
    });

    if (!response.ok) {
        toast.error('Error al registrar la notificación');
        throw new Error(`Error en la solicitud: ${response.status}`);
    }

    try {
        const isJson = response.headers.get('Content-Type')?.includes('application/json');
        
        if (isJson) {
            const responseData: INotification = await response.json();
            console.log('Notificación creada exitosamente:', responseData);
            toast.success('Notificación creada exitosamente');
            return responseData;  // Retorna el objeto INotification si existe JSON
        } else {
            // Si no hay cuerpo en la respuesta, retorna un objeto vacío de tipo INotification
            console.log('Notificación creada exitosamente (sin cuerpo en la respuesta)');
            toast.success('Notificación creada exitosamente');
            return {} as INotification;  // Retorna un objeto vacío de tipo INotification
        }
    } catch (error) {
        console.error('Error al procesar la respuesta del servidor:', error);
        throw new Error('Error al procesar la respuesta del servidor');
    }
};



export const updateNotificationApi = async (notification: INotification): Promise<INotification| null> => {
    if (!notification|| !notification.id) {
        throw new Error('Rate or rate.id is missing');
    }
 
    const { vigencia, ...newNotification } = notification;
  
    if (newNotification.tipoEnvio==="Extemporaneo") {
        console.log("extemporaneeo")
        newNotification.horaEnvio= null;
        newNotification.diaDelMes=null;
        newNotification.frecuencia=null;
        newNotification.diaSemana=null;   
    } 
    if (newNotification.tipoEnvio==="Recurrente"){
        console.log("recurrente")
        console.log(newNotification)
        if (newNotification.horaEnvio?.length!==8){
           newNotification.horaEnvio= newNotification.horaEnvio + ":00"
        }
        
        newNotification.fechaHoraEnvio=null;
        if (newNotification.frecuencia==="Mensual")
            {
                if (newNotification.diaDelMes==0) {
                    newNotification.ultimoDia = true; // Asignamos true si está marcado
                } else {
                    newNotification.ultimoDia = false; // Si no está marcado, lo dejamos como false
                }

            }
    }

    const response = await fetch(`${API_URL}/api/Notificacion/${notification.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNotification),
    });

    if (!response.ok) {
        throw new Error('Failed to update notification');
    }

    if (response.status === 204) {
        // No hay contenido en la respuesta, simplemente retornamos null
        return null;
    }

    // Para cualquier otra respuesta (200 OK o similar), intentamos parsear la respuesta como JSON
    return response.json();
};

export const deleteNotificationApi = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/api/Notificacion/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete notification');
    }

    // Si la eliminación es exitosa, simplemente no necesitamos devolver nada
    return;
};