import { ICreateOrder } from "@/models/CreateOrder";
import { IOrderStatusUpdate } from "@/models/OrderStatusUpdate";
import { IOrder } from "@/models/Order";
import toast from 'react-hot-toast';


const API_URL = import.meta.env.VITE_API_URL;


export const fetchOrdersApi = async () => {
    const response = await fetch(`${API_URL}/api/Orden/`);// Colocar la URL de tu backend cuando se configure el cors
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }
    const data = await response.json();
   // console.log('Datos de la póliza obtenidos:', data);
    return data;
};



export const fetchOrdersApiByIdPolizaAsegurado = async (polizaAseguradoId: string): Promise<IOrder> => {
    console.log('Llamada a la función con ID:', polizaAseguradoId); // Verifica que la función se esté llamando
    const response = await fetch(`${API_URL}/information/${polizaAseguradoId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }
    const data: IOrder = await response.json();
    console.log('Datos de la póliza obtenidos:', data);
    return data;
};




export const createOrderApi = async (order: ICreateOrder): Promise<IOrder>=> {
    const response = await fetch(`${API_URL}/api/Orden`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    });

    if (!response.ok) {
        toast.error('Error Orden ya Registrado');
    }
    return response.json(); // Devuelve la respuesta sin adaptar
};


export const updateOrderApi = async (orderUpdate: IOrderStatusUpdate): Promise<void> => {
    try {
        const { id, estatus } = orderUpdate; // Extraemos el id y el estatus del objeto
        console.log("Datos enviados al backend:", estatus);

        const response = await fetch(`${API_URL}/status/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(estatus), // El cuerpo solo incluye el estatus como string
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error("Detalles del error:", errorDetails);
            throw new Error(`Error al actualizar el estatus de la orden: ${response.status}`);
        }

        console.log("Orden actualizada exitosamente.");
    } catch (error) {
        console.error("Error al actualizar la orden:", error);
        throw error;
    }
};

export const assignOrderApi = async (orderId: string): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/AsignacionGrua/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error("Detalles del error:", errorDetails);
            throw new Error(`Error al asignar la orden: ${response.status}`);
        }

        console.log("Orden asignada exitosamente.");
        toast.success('Orden asignada correctamente.');
    } catch (error) {
        console.error("Error al asignar la orden:", error);
        toast.error('Error al asignar la orden.');
        throw error;
    }
};







