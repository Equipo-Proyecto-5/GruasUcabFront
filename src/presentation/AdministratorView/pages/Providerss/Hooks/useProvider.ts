import { useEffect, useState } from "react";
import { IProvider } from "@/models/Provider";
import {
    createProviderApi,
    fetchProvidersApi,
    updateProviderApi,
    deleteProviderApi,
} from "@/presentation/AdministratorView/pages/Providerss/api/ProviderApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { adaptProviderData } from "../../../../../adapters/ProviderAdapter";

export const useProviders = (providerId?: string) => {
    const [providers, setProviders] = useState<IProvider[]>([]);
    const [originalData, setOriginalData] = useState<IProvider | null>(null); // Para almacenar los datos originales
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState<IProvider>({
        id: "",
        denominacionComercial: "",
        razonSocial: "",
        direccionFisica: "",
        tipoDocumentoIdentidad: "",
        numeroDocumentoIdentidad: "",
    });

    const navigate = useNavigate();
    const resetForm = () => {
        // Función para restablecer el formulario
        setFormData({
            id: "",
            denominacionComercial: "",
            razonSocial: "",
            direccionFisica: "",
            tipoDocumentoIdentidad: "",
            numeroDocumentoIdentidad: "",
        });
    };

    // Cargar la lista de proveedores al montar el hook
    useEffect(() => {
        
        loadProviders();

    }, []);

    
    // Cargar los datos de un proveedor específico si se pasa un `providerId`
    useEffect(() => {
        if (providerId) {
            const loadProvider = async () => {
                setLoading(true);
                try {
                    const provider = await fetchProviderById(providerId);
                    if (provider) {
                        setOriginalData(provider); // Guardar los datos originales
                        setFormData(provider);
                    }
                    setError(null);
                } catch (err) {
                    setError((err as Error).message || "Error al obtener el proveedor");
                } finally {
                    setLoading(false);
                }
            };
            loadProvider();
        }
    }, [providerId]);

    const loadProviders = async () => {
        setLoading(true);
        try {
            const providersData = await fetchProvidersApi();

            // Filtra los proveedores activos
            const activeProviders = providersData.filter(
                (provider: IProvider) => provider.estatus === "Activo"
            );
            setProviders(activeProviders.map(adaptProviderData));
        } catch {
            toast.error("Error al cargar los proveedores");
        } finally {
            setLoading(false);
        }
    };

    // Función para obtener un proveedor por ID
    const fetchProviderById = async (id: string): Promise<IProvider | null> => {
        try {
            const providers = await fetchProvidersApi(); // Asume que fetchProvidersApi obtiene todos los proveedores
            return providers.find((provider: IProvider) => provider.id === id) || null;
        } catch {
            toast.error("Error fetching provider by ID:");
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
            const fullFormData: IProvider = providerId
                ? {
                    ...originalData, // Sobrecargar datos originales
                    ...formData, // Sobrescribir con los nuevos valores
                }
                : formData;

            if (providerId) {
                // Actualizar el proveedor existente
                const result = await updateProviderApi(fullFormData);
                if (result === null) {
                    // Caso 204 No Content
                    setProviders((prevProviders) =>
                        prevProviders.map((p) =>
                            p.id === providerId ? { ...p, ...formData } : p
                        )
                    );
                    toast.success("Proveedor actualizado exitosamente.");
                } else {
                    // Caso respuesta con contenido
                    const adaptedProvider = adaptProviderData(result);
                    setProviders((prevProviders) =>
                        prevProviders.map((p) =>
                            p.id === adaptedProvider.id ? adaptedProvider : p
                        )
                    );
                    toast.success("Proveedor actualizado exitosamente.");
                    // Redirige a la página anterior
                }
                navigate("/admin/providerss"); // Redirige a la página anterior
            } else {
                // Crear un nuevo proveedor
                const createdProvider = await createProviderApi(fullFormData);
                if (createdProvider) {
                    const adaptedProvider = adaptProviderData(createdProvider);
                    setProviders((prevProviders) => [...prevProviders, adaptedProvider]);
                    toast.success("Proveedor creado exitosamente.");
                    resetForm();
                }
            }
        } catch {
            toast.error("Error al procesar la solicitud");
        } finally {
            setLoading(false);
            navigate("/admin/providerss");
        }
    };

    // Función para manejar la eliminación de un proveedor
    const handleDeleteProvider = async (id: string) => {
        setLoading(true);
        try {
            await deleteProviderApi(id);
            setProviders((prevProviders) =>
                prevProviders.filter((provider) => provider.id !== id)
            );
            toast.success("Proveedor eliminado exitosamente.");
        } catch {
            toast.error("Error al eliminar el proveedor");
        } finally {
            setLoading(false);
        }
    };

    return {
        providers,
        formData,
        error,
        successMessage,
        loading,
        handleChange,
        handleSubmit,
        handleDeleteProvider,
    };
};
