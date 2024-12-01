import { useEffect, useState } from "react";
import { IOperator } from "@/models/Operator";
import {
    fetchOperatorApi,
    createOperatorApi,
    updateOperatorApi,
    deleteOperatorApi
} from "@/presentation/AdministratorView/pages/Operators/api/OperatorApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { adaptOperatorData } from "../../../../../adapters/OperatorAdapter";

export const useOperators = (operatorId?: string) => {
    const [operators, setOperators] = useState<IOperator[]>([]);
    const [originalData, setOriginalData] = useState<IOperator | null>(null); // Para almacenar los datos originales
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState<IOperator>({
    id: "",
    tipoUsuario:"Operador",
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
            tipoUsuario:"Operador",
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
        
        loadOperators();

    }, []);
// Cargar los datos de un proveedor específico si se pasa un `providerId`
useEffect(() => {
    if (operatorId) {
        const loadOperator = async () => {
            setLoading(true);
            try {
                const operator = await fetchOperatorById(operatorId);
                if (operator) {
                    setOriginalData(operator); // Guardar los datos originales
                    setFormData(operator);
                }
                setError(null);
            } catch (err) {
                setError((err as Error).message || "Error al obtener el proveedor");
            } finally {
                setLoading(false);
            }
        };
        loadOperator();
    }
}, [operatorId]);

const loadOperators = async () => {
    setLoading(true);
    try {
        const operatorsData = await fetchOperatorApi();

        // Filtra los proveedores activos
       // const activeOperators = operatorsData.filter(
        //    (operator: IOperator) => operator.estatus === "Activo"
       // );
        setOperators(operatorsData.map(adaptOperatorData));
    } catch {
        toast.error("Error al cargar los proveedores");
    } finally {
        setLoading(false);
    }
};

// Función para obtener un proveedor por ID
const fetchOperatorById = async (id: string): Promise<IOperator | null> => {
    try {
        const operators = await fetchOperatorApi(); // Asume que fetchProvidersApi obtiene todos los proveedores
        return operators.find((operator: IOperator) => operator.id === id) || null;
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
        const fullFormData: IOperator = operatorId
            ? {
                ...originalData, // Sobrecargar datos originales
                ...formData, // Sobrescribir con los nuevos valores
            }
            : formData;

        if (operatorId) {
            // Actualizar el proveedor existente
            const result = await updateOperatorApi(fullFormData);
            if (result === null) {
                // Caso 204 No Content
                setOperators((prevOperators) =>
                    prevOperators.map((p) =>
                        p.id === operatorId ? { ...p, ...formData } : p
                    )
                );
                toast.success("Operador actualizado exitosamente.");
            } else {
                // Caso respuesta con contenido
                const adaptedOperator = adaptOperatorData(result);
                setOperators(( prevOperators) =>
                    prevOperators.map((p) =>
                        p.id === adaptedOperator.id ? adaptedOperator : p
                    )
                );
                toast.success("Operador actualizado exitosamente.");
                // Redirige a la página anterior
            }
            setTimeout(() => navigate(-1), 2000); // Redirige a la página anterior
        } else {
            // Crear un nuevo proveedor
            const createdOperator = await createOperatorApi(fullFormData);
            if (createdOperator) {
                const adaptedOperator = adaptOperatorData(createdOperator);
                setOperators((prevOperators) => [...prevOperators, adaptedOperator]);
                toast.success("Operador creado exitosamente.");
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
const handleDeleteOperator = async (id: string) => {
    setLoading(true);
    try {
        await deleteOperatorApi(id);
        setOperators((prevOperators) =>
            prevOperators.filter((operator) => operator.id !== id)
        );
        toast.success("Operador eliminado exitosamente.");
    } catch {
        toast.error("Error al eliminar el operador");
    } finally {
        setLoading(false);
    }
};
return {
    operators,
    formData,
    error,
    successMessage,
    loading,
    handleChange,
    handleSubmit,
    handleDeleteOperator,
};
};
