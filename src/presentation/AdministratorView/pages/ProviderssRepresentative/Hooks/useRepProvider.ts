import { useEffect, useState } from "react";
import { IRepProvider } from "@/models/RepProvider";
import {
    fetchRepProviderApi,
    createRepProviderApi,
    updateRepProviderApi,
    deleteRepProviderApi
} from "@/presentation/AdministratorView/pages/ProviderssRepresentative/api/RepProviderApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { adaptRepProviderData } from "../../../../../adapters/RepProviderAdapter";

export const useRepProviders = (repProviderId?: string) => {
    const [repProviders, setRepProviders] = useState<IRepProvider[]>([]);
    const [originalData, setOriginalData] = useState<IRepProvider | null>(null); // Para almacenar los datos originales
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState<IRepProvider>({
    id: "",
    tipoUsuario:"RepresentanteProveedor",
    primerNombre:"",
    primerApellido:"",
    segundoNombre: "",
    segundoApellido:"",
    fechaNacimiento: "",
    numeroTelefono: "",
    direccion:"",
    tipoDocumentoIdentidad:"",
    numeroDocumentoIdentidad:"",
    correo:"",
    contrasena:"",
    gradoLicencia:"",
    idEmpresaProveedor:"",
    documentoTransito:"",
    
    });
    const navigate = useNavigate();
    const resetForm = () => {
        // Función para restablecer el formulario
        setFormData({
            id: "",
            tipoUsuario:"RepresentanteProveedor",
            primerNombre:"",
            primerApellido:"",
            segundoNombre: "",
            segundoApellido:"",
            fechaNacimiento: "",
            numeroTelefono: "",
            direccion:"",
            tipoDocumentoIdentidad:"",
            numeroDocumentoIdentidad:"",
            correo:"",
            contrasena:"",
            gradoLicencia:"",
            idEmpresaProveedor:"",
            documentoTransito:"",
        });
    };

    // Cargar la lista de proveedores al montar el hook
    useEffect(() => {
        
        loadRepProviders();

    }, []);
// Cargar los datos de un proveedor específico si se pasa un `providerId`
useEffect(() => {
    if (repProviderId) {
        const loadRepProvider = async () => {
            setLoading(true);
            try {
                const repProvider = await fetchRepProviderById(repProviderId);
                if (repProvider) {
                    setOriginalData(repProvider); // Guardar los datos originales
                    setFormData(repProvider);
                }
                setError(null);
            } catch (err) {
                setError((err as Error).message || "Error al obtener el representate del proveedor");
            } finally {
                setLoading(false);
            }
        };
        loadRepProvider();
    }
}, [repProviderId]);

const loadRepProviders = async () => {
    setLoading(true);
    try {
        const  repProvidersData = await fetchRepProviderApi();

        // Filtra los proveedores activos
       // const activeOperators = operatorsData.filter(
        //    (operator: IRepProvider) => operator.estatus === "Activo"
       // );
        setRepProviders(repProvidersData.map(adaptRepProviderData));
    } catch {
        toast.error("Error al cargar los representantes de los proveedores");
    } finally {
        setLoading(false);
    }
};

// Función para obtener un proveedor por ID
const fetchRepProviderById = async (id: string): Promise<IRepProvider | null> => {
    try {
        const repProviders = await fetchRepProviderApi(); // Asume que fetchProvidersApi obtiene todos los proveedores
        return repProviders.find((repProviders: IRepProvider) => repProviders.id === id) || null;
    } catch {
        toast.error("Error fetching representation of the provider by ID:");
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
        const fullFormData: IRepProvider = repProviderId
            ? {
                ...originalData, // Sobrecargar datos originales
                ...formData, // Sobrescribir con los nuevos valores
            }
            : formData;

        if (repProviderId) {
            // Actualizar el proveedor existente
            const result = await updateRepProviderApi(fullFormData);
            if (result === null) {
                // Caso 204 No Content
                setRepProviders((prevRepProviders) =>
                    prevRepProviders.map((p) =>
                        p.id === repProviderId ? { ...p, ...formData } : p
                    )
                );
                toast.success("Representante del proveedor actualizado exitosamente.");
            } else {
                // Caso respuesta con contenido
                const adaptedRepProvider = adaptRepProviderData(result);
                setRepProviders((prevRepProviders) =>
                    prevRepProviders.map((p) =>
                        p.id === adaptedRepProvider.id ? adaptedRepProvider : p
                    )
                );
                toast.success("Representante del proveedor actualizado exitosamente.");
                // Redirige a la página anterior
            }
            setTimeout(() => navigate(-1), 2000); // Redirige a la página anterior
        } else {
            // Crear un nuevo proveedor
            const createdRepProvider = await createRepProviderApi(fullFormData);
            if (createdRepProvider) {
                const adaptedRepProvider = adaptRepProviderData(createdRepProvider);
                setRepProviders((prevRepProviders) => [...prevRepProviders, adaptedRepProvider]);
                toast.success("Representante del proveedor creado exitosamente.");
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
const handleDeleteRepProvider = async (id: string) => {
    setLoading(true);
    try {
        await deleteRepProviderApi(id);
        setRepProviders((prevRepProviders) =>
            prevRepProviders.filter((repProvider) => repProvider.id !== id)
        );
        toast.success("Representante eliminado exitosamente.");
    } catch {
        toast.error("Error al eliminar el representante");
    } finally {
        setLoading(false);
    }
};
return {
    repProviders,
    formData,
    error,
    successMessage,
    loading,
    handleChange,
    handleSubmit,
    handleDeleteRepProvider,
};
};
