import { useEffect, useState } from "react";
import { IDepartment} from "@/models/Department";
import {
    fetchDepartmentApi,
    createDepartmentApi,
    updateDepartmentApi,
    deleteDepartmentApi,
} from "@/presentation/AdministratorView/pages/Departments/api/DepartmentApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { adaptDepartmentData } from "../../../../../adapters/DepartmentAdapter";

export const useDepartments = (departmentId?: string) => {
    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const [originalData, setOriginalData] = useState<IDepartment | null>(null); // Para almacenar los datos originales
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState<IDepartment>({
        id: "",
        nombre:"",
       descripcion:""
    
    });
    const navigate = useNavigate();
    const resetForm = () => {
        // Función para restablecer el formulario
        setFormData({
            id: "",
           nombre:"",
          descripcion:""
        });
    };

    // Cargar la lista de proveedores al montar el hook
    useEffect(() => {
        
        loadDepartments();

    }, []);
// Cargar los datos de un proveedor específico si se pasa un `providerId`
useEffect(() => {
    if (departmentId) {
        const loadDepartment = async () => {
            setLoading(true);
            try {
                const rate = await fetchDepartmentById(departmentId);
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
        loadDepartment();
    }
}, [departmentId]);

const loadDepartments = async () => {
    setLoading(true);
    try {
        const departmentsData = await fetchDepartmentApi();

        // Filtra los proveedores activos
       // const activeOperators = operatorsData.filter(
        //    (operator: IDepartments) => operator.estatus === "Activo"
       // );
        setDepartments(departmentsData.map(adaptDepartmentData));
    } catch {
        toast.error("Error al cargar los departamentos");
    } finally {
        setLoading(false);
    }
};

// Función para obtener un proveedor por ID
const fetchDepartmentById = async (id: string): Promise<IDepartment | null> => {
    try {
        const departments = await fetchDepartmentApi(); // Asume que fetchProvidersApi obtiene todos los proveedores
        return departments.find((department: IDepartment) => department.id === id) || null;
    } catch {
        toast.error("Error fetching department by ID:");
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
        const fullFormData: IDepartment = departmentId
            ? {
                ...originalData, // Sobrecargar datos originales
                ...formData, // Sobrescribir con los nuevos valores
            }
            : formData;

        if (departmentId) {
            // Actualizar el proveedor existente
            const result = await updateDepartmentApi(fullFormData);
            if (result === null) {
                // Caso 204 No Content
                setDepartments((prevDepartments) =>
                    prevDepartments.map((p) =>
                        p.id === departmentId ? { ...p, ...formData } : p
                    )
                );
                toast.success("Departamento actualizado exitosamente.");
            } else {
                // Caso respuesta con contenido
                const adaptedDepartment = adaptDepartmentData(result);
                setDepartments(( prevDepartments) =>
                    prevDepartments.map((p) =>
                        p.id === adaptedDepartment.id ? adaptedDepartment : p
                    )
                );
                toast.success("Departamento actualizado exitosamente.");
                // Redirige a la página anterior
            }
            setTimeout(() => navigate(-1), 2000); // Redirige a la página anterior
        } else {
            // Crear un nuevo proveedor
            const createdDepartment = await createDepartmentApi(fullFormData);
            if (createdDepartment) {
                const adaptedDepartment = adaptDepartmentData(createdDepartment);
                setDepartments((prevDepartments) => [...prevDepartments, adaptedDepartment]);
                toast.success("Tarifa creada exitosamente.");
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
const handleDeleteDepartment = async (id: string) => {
    setLoading(true);
    try {
        await deleteDepartmentApi(id);
        setDepartments((prevDepartments) =>
            prevDepartments.filter((department) => department.id !== id)
        );
        toast.success("Departamento eliminada exitosamente.");
    } catch {
        toast.error("Error al eliminar el departamento");
    } finally {
        setLoading(false);
    }
};
return {
    departments,
    formData,
    error,
    successMessage,
    loading,
    handleChange,
    handleSubmit,
    handleDeleteDepartment,
};
};
