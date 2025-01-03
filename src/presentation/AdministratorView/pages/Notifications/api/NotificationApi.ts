import {INotification } from '@/models/Notification';
import toast from 'react-hot-toast';
//import Providerss from '@/presentation/AdministratorView/pages/Providerss/Providerss';

export const fetchNotificationApi = async () => {
    const response = await fetch('https://localhost:7157/api/Notificacion');// Colocar la URL de tu backend cuando se configure el cors
    if (!response.ok) {
        throw new Error('Failed to fetch rates');
    }
    const data = await response.json();
    
    
    return data;
};



export const createNotificationApi = async (notification: INotification): Promise<INotification> => {
    
    const { id, vigencia, ...newNotification } = notification;
    if (newNotification.tipoEnvio="Extemporaneo") {
        newNotification.horaEnvio= null;
        newNotification.diaDelMes=null;
        newNotification.frecuencia=null;
        newNotification.diaSemana=null;   
    } else
    if (newNotification.tipoEnvio=="Recurrente"){
      newNotification.horaEnvio= newNotification.horaEnvio + ":00"
      newNotification.fechaHoraEnvio=null;
    }

    console.log(newNotification)
    console.log("En create")
    const response = await fetch('https://localhost:7157/api/Notificacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNotification),
    });

    if (!response.ok) {
        toast.error('Error al Registrar la notificaion');
    }
    return response.json(); // Devuelve la respuesta sin adaptar
};


export const updateNotificationApi = async (notification: INotification): Promise<INotification| null> => {
    if (!notification|| !notification.id) {
        throw new Error('Rate or rate.id is missing');
    }
    const { vigencia, ...newNotification } = notification;
  
    
      if (newNotification.tipoEnvio="Extemporaneo") {
          newNotification.horaEnvio= null;
          newNotification.diaDelMes=null;
          newNotification.frecuencia=null;
          newNotification.diaSemana=null;   
      } else
      if (newNotification.tipoEnvio=="Recurrente"){
        newNotification.horaEnvio= newNotification.horaEnvio + ":00"
        newNotification.fechaHoraEnvio=null;
      }
      console.log(newNotification)

    const response = await fetch(`https://localhost:7157/api/Notificacion/${notification.id}`, {
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
    const response = await fetch(`https://localhost:7157/api/Notificacion/${id}`, {
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


