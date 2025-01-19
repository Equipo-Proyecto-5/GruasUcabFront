import { useEffect, useState } from "react";
import { IRate} from "@/models/Rate";
import {
    fetchRateApi,
    createRateApi,
    updateRateApi,
    deleteRateApi
} from "@/presentation/AdministratorView/pages/Rates/api/RateApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { adaptRateData } from "../../../../../adapters/RatesAdapter";

export const useRates = (rateId?: string) => {
    const [rates, setRates] = useState<IRate[]>([]);
    const [originalData, setOriginalData] = useState<IRate | null>(null); // Para almacenar los datos originales
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState<IRate>({
        id: "",
        nombre:"",
        costoBase:0,
        distanciaKm:0,
        costoPorKm:0,
    
    });
    const navigate = useNavigate();
    const resetForm = () => {
        // Función para restablecer el formulario
        setFormData({
            id: "",
           nombre:"",
           costoBase:0,
           distanciaKm:0,
           costoPorKm:0,
        });
    };

    // Cargar la lista de proveedores al montar el hook
    useEffect(() => {
        
        loadRates();

    }, []);
// Cargar los datos de un proveedor específico si se pasa un `providerId`
useEffect(() => {
    if (rateId) {
        const loadRate = async () => {
            setLoading(true);
            try {
                const rate = await fetchRateById(rateId);
                if (rate) {
                    setOriginalData(rate); // Guardar los datos originales
                    setFormData(rate);
                }
                setError(null);
            } catch (err) {
                setError((err as Error).message || "Error al obtener la tarifa");
            } finally {
                setLoading(false);
            }
        };
        loadRate();
    }
}, [rateId]);

const loadRates = async () => {
    setLoading(true);
    try {
        const ratesData = await fetchRateApi();
     
        setRates(ratesData.map(adaptRateData));
    } catch {
        toast.error("Error al cargar las tarifas");
    } finally {
        setLoading(false);
    }
};

// Función para obtener un proveedor por ID
const fetchRateById = async (id: string): Promise<IRate | null> => {
    try {
        const rates = await fetchRateApi(); // Asume que fetchProvidersApi obtiene todos los proveedores
        return rates.find((rate: IRate) => rate.id === id) || null;
    } catch {
        toast.error("Error fetching rate by ID:");
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
    if (e) e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);

    try {
        // Crear un objeto con los datos finales, usando los originales si no se han modificado
        const fullFormData: IRate = rateId
            ? {
                ...originalData, // Sobrecargar datos originales
                ...formData, // Sobrescribir con los nuevos valores
            }
            : formData;

        if (rateId) {
            // Actualizar el proveedor existente
            const result = await updateRateApi(fullFormData); // La API lanza un error si falla
            if (result === null) {
                // Caso 204 No Content
                setRates((prevRates) =>
                    prevRates.map((p) =>
                        p.id === rateId ? { ...p, ...formData } : p
                    )
                );
                toast.success("Tarifa actualizada exitosamente.");
            } else {
                // Caso respuesta con contenido
                const adaptedRate = adaptRateData(result);
                setRates((prevRates) =>
                    prevRates.map((p) =>
                        p.id === adaptedRate.id ? adaptedRate : p
                    )
                );
                toast.success("Tarifa actualizada exitosamente.");
            }
            navigate("/admin/rates");
            //setTimeout(() => navigate("rates"), 2000); // Redirige a la página anterior
        } else {
            // Crear un nuevo proveedor
            const createdRate = await createRateApi(fullFormData); // La API lanza un error si falla
            const adaptedRate = adaptRateData(createdRate);
            setRates((prevRates) => [...prevRates, adaptedRate]);
            toast.success("Tarifa creada exitosamente.");
            resetForm();
        }
    } catch (error: any) {
        console.error("Error capturado:", error); // Log para depurar el error
        toast.error(error.message || "Error al procesar la solicitud");
    } finally {
        setLoading(false);
        navigate("/admin/rates");
       // setTimeout(() => navigate(-1), 2000); // Redirige a la página anterior
    }
};

// Función para manejar la eliminación de un proveedor
const handleDeleteRate = async (id: string) => {
    setLoading(true);
    try {
        await deleteRateApi(id);
        setRates((prevRates) =>
            prevRates.filter((rate) => rate.id !== id)
        );
        toast.success("Tarifa eliminada exitosamente.");
    } catch {
        toast.error("Error al eliminar la tarifa");
    } finally {
        setLoading(false);
    }
};
return {
    rates,
    formData,
    error,
    successMessage,
    loading,
    handleChange,
    handleSubmit,
    handleDeleteRate,
};
};
