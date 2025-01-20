import { useEffect, useState } from "react";
import { fetchOrdersApi, createOrderApi, fetchOrdersApiByIdPolizaAsegurado, updateOrderApi, assignOrderApi } from "@/presentation/AdministratorView/pages/Orders/api/OrderApi";
import toast from "react-hot-toast";
import { adaptOrderData } from "@/adapters/OrdersAdapter";
import { IOrder } from "@/models/Order";
import { ICreateOrder } from "@/models/CreateOrder";
import { IOrderStatusUpdate } from "@/models/OrderStatusUpdate";

const initialFormData: IOrder = {
    id: "",
    numeroFactura: "",
    fecha: new Date(),
    polizaFechaInicio: "",
    polizaFechaFin: "",
    detallesIncidente: "",
    direccionOrigen: "",
    direccionDestino: "",
    cantidadKmExtra: "",
    costoServiciosAdicionales: "",
    costoTotalKmExtra: "",
    costoTotal: "",
    nombreDenunciante: "",
    tipoDocumentoDenunciante: "",
    numeroDocumentoDenunciante: "",
    estatus: "",
    Administratorid: null,
    Craneid: null,
    Operatorsid: null,
    polizaAseguradoId: "",
    nombreAsegurado: "",
    documentoIdentidad: "",
    coberturaBasePoliza: 0,
    distanciaCoberturaPoliza: 0,
    tipoPoliza: "",
    tipoVehiculo: "",
    placaVehiculo: "",
    informacionVehiculo: "",
    marca: "",
    modelo: "",
    anio: "",
};

const initialCreateOrderData: ICreateOrder = {
    detallesIncidente: "",
    direccionOrigen: "", //  se llenará en el paso 3
    direccionDestino: "", //  se llenará en el paso 3
    nombreDenunciante: "",
    tipoDocumentoDenunciante: "",
    numeroDocumentoDenunciante: "",
    polizaAseguradoId:  "",
    administrador: "",
    operador: "",
    
};

export const useOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

    const [formData, setFormData] = useState<IOrder>(initialFormData);
    const [createOrderData, setCreateOrderData] = useState<ICreateOrder>(initialCreateOrderData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        setLoading(true);
        try {
            const ordersData = await fetchOrdersApi();
            if (ordersData && ordersData.length > 0) {
                setOrders(ordersData.map(adaptOrderData));
            } else {
                toast("No hay órdenes activas");
                setOrders([]);
            }
            setError(null);
        } catch {
            toast.error("Error al cargar las órdenes");
            setError("No se pudieron cargar las órdenes");
        } finally {
            setLoading(false);
        }
    };

    const fetchPolicyDataById = async (polizaAseguradoId: string) => {
        if (!polizaAseguradoId) {
            toast.error("Debe ingresar un ID de póliza válido");
            return;
        }
        setLoading(true);
        try {
            const policyData = await fetchOrdersApiByIdPolizaAsegurado(polizaAseguradoId);
            console.log("Datos recibidos de la API:", policyData);

            if (policyData) {
                // Actualiza el estado con los datos recibidos de la API para `formData`
                setFormData((prev) => ({
                    ...prev,
                    polizaAseguradoId: policyData.polizaAseguradoId || "",
                    nombreAsegurado: policyData.nombreAsegurado || "",
                    documentoIdentidad: policyData.documentoIdentidad || "",
                    coberturaBasePoliza: policyData.coberturaBasePoliza || 0,
                    distanciaCoberturaPoliza: policyData.distanciaCoberturaPoliza || 0,
                    tipoVehiculo: policyData.tipoVehiculo || "",
                    placa: policyData.placaVehiculo || "",
                    informacionVehiculo: policyData.informacionVehiculo || "",
                    tipoPoliza: policyData.tipoPoliza || "",
                }));
                // También actualiza `createOrderData` con los datos relevantes
                setCreateOrderData((prev) => ({
                    ...prev,
                    polizaAseguradoId: policyData.polizaAseguradoId || "",
                    nombreAsegurado: policyData.nombreAsegurado || "",
                    tipoPoliza: policyData.tipoPoliza || "",
                }));
                toast.success("Datos de póliza cargados exitosamente");
            } else {
                throw new Error("Póliza no encontrada");
            }
        } catch (e) {
            toast.error("Error al obtener los datos de la póliza");
            setError((e as Error).message || "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCreateOrderData((prev) => ({ ...prev, [name]: value }));
    };

    const createOrder = async (orderData: ICreateOrder) => {
        setLoading(true);
        try {
            const createdOrder = await createOrderApi(orderData);
            if (createdOrder) {
                const adaptedOrder = adaptOrderData(createdOrder);
                setOrders((prevOrders) => [...prevOrders, adaptedOrder]);
                toast.success("Orden creada exitosamente");
                setCreateOrderData(initialCreateOrderData); // Resetea el formulario de creación
            }
        } catch (e) {
            toast.error("Error al crear la orden");
            setError((e as Error).message || "Error desconocido");
        } finally {
            setLoading(false);
        }
    };




    //Modificar Estatus de Orden

     // Función para actualizar el estado de la orden
   // Definir un tipo parcial para solo los campos actualizables

   const updateOrder = async (updatedOrder: IOrderStatusUpdate) => {
    setLoading(true); // Inicia la carga
    try {
        // Llamada a la API
        await updateOrderApi(updatedOrder);

        // Actualizamos el estado local con el nuevo estatus
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === updatedOrder.id
                    ? { ...order, estatus: updatedOrder.estatus === "Cancelar" ? "cancelado" : updatedOrder.estatus }
                    : order
            )
        );

        // Mostrar mensaje de éxito
        toast.success("Orden actualizada exitosamente");
        
        // Si estás trabajando con un formulario, actualizamos los datos
        setFormData((prevData) => ({
            ...prevData,
            estatus: updatedOrder.estatus,
        }));
    } catch (e) {
        // Manejo de errores
        const errorMessage = (e as Error).message || "Error desconocido";
        toast.error(`Error al actualizar la orden: ${errorMessage}`);
        setError(errorMessage);
    } finally {
        // Finaliza la carga
        setLoading(false);
    }
};


const handleAssignOrder = async (orderId: string) => {
    try {
        // Aquí realizamos la asignación, puedes pasar un estado adecuado si es necesario.
        await assignOrderApi(orderId);
        toast.success('Orden asignada exitosamente');
    } catch (error) {
        console.error('Error al asignar la orden:', error);
        toast.error('No se pudo asignar la orden');
    }
};




    return {
        orders,
        formData,
        createOrderData,
        loading,
        error,
        setFormData,
        handleChange: handleCreateOrderChange,
        fetchOrdersApiByIdPolizaAsegurado,
        fetchPolicyDataById,
        createOrder,
        updateOrder,
        setSelectedOrder,
        selectedOrder,
        handleAssignOrder
    };
};
