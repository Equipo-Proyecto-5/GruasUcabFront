import { useEffect, useState } from "react";
import { INotification} from "@/models/Notification";
import {
    fetchNotificationApi,
    createNotificationApi,
    updateNotificationApi,
    deleteNotificationApi
} from "@/presentation/AdministratorView/pages/Notifications/api/NotificationApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { adaptNotificationData } from "../../../../../adapters/NotificationAdapter";

export const useNotifications = (notificationId?: string) => {
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [originalData, setOriginalData] = useState<INotification | null>(null); // Para almacenar los datos originales
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState<INotification>({
        id: "",
        titulo:"",
       mensaje:"",
       tipoEnvio:"",
       frecuencia:"",
       fechaHoraEnvio:"",
       destinatarios:"",
       horaEnvio:"",
       diaDelMes:0,
       diaSemana:"",
       ultimoDia:false,
       vigencia:true,



    
    });
    const navigate = useNavigate();
    const resetForm = () => {
        // Función para restablecer el formulario
        setFormData({
       id: "",
       titulo:"",
       mensaje:"",
       tipoEnvio:"",
       frecuencia:"",
       fechaHoraEnvio:"",
       destinatarios:"",
       horaEnvio:"",
       diaDelMes:0,
       diaSemana:"",
       ultimoDia:false,
       vigencia:true,
        });
    };

    // Cargar la lista de proveedores al montar el hook
    useEffect(() => {
        
        loadNotifications();

    }, []);
// Cargar los datos de un proveedor específico si se pasa un `providerId`
useEffect(() => {
    if (notificationId) {
        const loadNotification = async () => {
            setLoading(true);
            try {
                const rate = await fetchNotificationById(notificationId);
                if (rate) {
                    setOriginalData(rate); // Guardar los datos originales
                    setFormData(rate);
                }
                setError(null);
            } catch (err) {
                setError((err as Error).message || "Error al obtener la notificacion");
            } finally {
                setLoading(false);
            }
        };
        loadNotification();
    }
}, [notificationId]);

const loadNotifications = async () => {
    setLoading(true);
    try {
        const notificationsData = await fetchNotificationApi();

        setNotifications(notificationsData.map(adaptNotificationData));
    } catch {
        toast.error("Error al cargar las notificaciones");
    } finally {
        setLoading(false);
    }
};

// Función para obtener un proveedor por ID
const fetchNotificationById = async (id: string): Promise<INotification | null> => {
    try {
        const notifications = await fetchNotificationApi(); // Asume que fetchProvidersApi obtiene todos los proveedores
        return notifications.find((notification: INotification) => notification.id === id) || null;
    } catch {
        toast.error("Error fetching notification by ID:");
        return null;
    }
};
// Función para manejar cambios en los campos del formulario
const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
};
// Función para manejar el envío del formulario
const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault(); // Solo previene el comportamiento por defecto si se pasa el evento
    setLoading(true);
    setSuccessMessage(null);

    try {
        // Crear un objeto con los datos finales, usando los originales si no se han modificado
        const fullFormData: INotification = notificationId
            ? {
                ...originalData, // Sobrecargar datos originales
                ...formData, // Sobrescribir con los nuevos valores
            }
            : formData;

        if (notificationId) {
            // Actualizar el proveedor existente
            const result = await updateNotificationApi(fullFormData);
            if (result === null) {
                // Caso 204 No Content
                setNotifications((prevNotifications) =>
                    prevNotifications.map((p) =>
                        p.id === notificationId ? { ...p, ...formData } : p
                    )
                );
                toast.success("Notificacion actualizada exitosamente.");
            } else {
                // Caso respuesta con contenido
                const adaptedNotification = adaptNotificationData(result);
                setNotifications(( prevNotifications) =>
                    prevNotifications.map((p) =>
                        p.id === adaptedNotification.id ? adaptedNotification : p
                    )
                );
                toast.success("Notificacion actualizada exitosamente.");
                // Redirige a la página anterior
            }
            setTimeout(() => navigate(-1), 2000); // Redirige a la página anterior
        } else {
            // Crear un nuevo proveedor
            const createdNotification = await createNotificationApi(fullFormData);
            if (createdNotification) {
                const adaptedNotification = adaptNotificationData(createdNotification);
                setNotifications((prevNotifications) => [...prevNotifications, adaptedNotification]);
                toast.success("Notificacion creada exitosamente.");
                resetForm();
            }
        }
    } catch {
        toast.error("Error al procesar la solicitud");
    } finally {
        setLoading(false);
    }
};
// Función para manejar la eliminación de un proveedor
const handleDeleteNotification = async (id: string) => {
    setLoading(true);
    try {
        await deleteNotificationApi(id);
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
        toast.success("Notificacion eliminada exitosamente.");
    } catch {
        toast.error("Error al eliminar la notificacion");
    } finally {
        setLoading(false);
    }
};
return {
    notifications,
    formData,
    error,
    successMessage,
    loading,
    handleChange,
    handleSubmit,
    handleDeleteNotification,
};
};
