import { INotification} from "@/models/Notification";


export const adaptNotificationData = (notification: INotification): INotification => {
    return {
        id: notification.id,
        titulo:notification.titulo,
        mensaje:notification.mensaje,
        tipoEnvio:notification.tipoEnvio,
        frecuencia:notification.frecuencia,
        fechaHoraEnvio:notification.fechaHoraEnvio,
        destinatarios:notification.destinatarios,
        horaEnvio:notification.horaEnvio,
        diaDelMes:notification.diaDelMes,
        diaSemana:notification.diaSemana,
        ultimoDia:notification.ultimoDia,
        vigencia:notification.vigencia,
        
    };
};
