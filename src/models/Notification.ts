export interface INotification {
    id?: string | number;
    titulo:string;
    mensaje:string;
    tipoEnvio:string;
    frecuencia?:string | null;
    fechaHoraEnvio?:string | null;
    destinatarios:string;
    horaEnvio?:string | null;
    diaDelMes?:number | null;
    diaSemana?:string | null;
    ultimoDia?:boolean;
    vigencia?:boolean| null;

};