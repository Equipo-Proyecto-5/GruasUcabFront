import { useEffect, useState } from "react";
import { IDriver } from "@/models/Driver";
import {
    createDriverApi,
    fetchDriverApi,
    updateDriverApi,
    deleteDriverApi,
} from "@/presentation/AdministratorView/pages/Drivers/api/DriverApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { adaptDriverData } from "../../../../../adapters/DriverAdapter";

export const useDriver = (driverId?: string) => {
    const [drivers, setDrivers] = useState<IDriver[]>([]);
    const [originalData, setOriginalData] = useState<IDriver | null>(null); // Para almacenar los datos originales
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formDataDriver, setFormDataDriver] = useState<IDriver>({
        tipoUsuario: "",
        primerNombre: "",
        primerApellido: "",
        segundoNombre: "",
        segundoApellido: "",
        fechaNacimiento: "",
        numeroTelefono: "",
        direccion: "",
        tipoDocumentoIdentidad: "",
        numeroDocumentoIdentidad: "",
        correo: "",
        contrasena: "",
        gradoLicencia: "",
        idEmpresaProveedor:  "",
        documentosTransito: [
            { tipoDocumento: "", numeroDocumento: "", fechaEmision: "", fechaVencimiento: "", urlImagen: "" },
        { tipoDocumento: "", numeroDocumento: "", fechaEmision: "", fechaVencimiento: "", urlImagen: "" },
            { tipoDocumento: "", numeroDocumento: "", fechaEmision: "", fechaVencimiento: "", urlImagen: "" }
        ],
        idGruaAsociada: "",
    });

    const navigate = useNavigate();
    const resetForm = () => {
        // Función para restablecer el formulario
        setFormDataDriver({
            tipoUsuario: "",
            primerNombre: "",
            primerApellido: "",
            segundoNombre: "",
            segundoApellido: "",
            fechaNacimiento: "",
            numeroTelefono: "",
            direccion: "",
            tipoDocumentoIdentidad: "",
            numeroDocumentoIdentidad: "",
            correo: "",
            contrasena: "",
            gradoLicencia: "",
            idEmpresaProveedor: "",
            documentosTransito: [
              { tipoDocumento: "", numeroDocumento: "", fechaEmision: "", fechaVencimiento: "", urlImagen: "" },
                { tipoDocumento: "", numeroDocumento: "", fechaEmision: "", fechaVencimiento: "", urlImagen: "" },
               { tipoDocumento: "", numeroDocumento: "", fechaEmision: "", fechaVencimiento: "", urlImagen: "" }
            ],
            idGruaAsociada: "",
        });
    };

    // Cargar la lista de proveedores al montar el hook
    useEffect(() => {
        
        loadDrivers();

    }, []);

    
    // Cargar los datos de un proveedor específico si se pasa un `providerId`
    useEffect(() => {
        if (driverId) {
            const loadDrivers = async () => {
                setLoading(true);
                try {
                    const driver = await fetchDriverById(driverId);
                    if (driver) {
                        setOriginalData(driver); // Guardar los datos originales
                        setFormDataDriver(driver);
                    }
                    setError(null);
                } catch (err) {
                    setError((err as Error).message || "Error al obtener el conductor");
                } finally {
                    setLoading(false);
                }
            };
            loadDrivers();
        }
    }, [driverId]);

    const loadDrivers = async () => {
        setLoading(true);
        try {
            const driverData = await fetchDriverApi();
            setDrivers(driverData.map(adaptDriverData));
        } catch {
            toast.error("Error al cargar los conductores");
        } finally {
            setLoading(false);
        }
    };

    // Función para obtener un proveedor por ID
    const fetchDriverById = async (id: string): Promise<IDriver | null> => {
        try {
            const drivers = await fetchDriverApi(); // Asume que fetchProvidersApi obtiene todos los proveedores
            return drivers.find((driver: IDriver) => driver.id === id) || null;
        } catch {
            toast.error("Error fetching driver by ID:");
            return null;
        }
    };


    // Función para manejar cambios en los campos del formulario
    const handleChangeDriver = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormDataDriver((prev) => ({ ...prev, [name]: value }));
    };

    // Función para manejar el envío del formulario
    const handleSubmitDriver = async (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault(); // Solo previene el comportamiento por defecto si se pasa el evento
        setLoading(true);
        setSuccessMessage(null);

        try {
            // Crear un objeto con los datos finales, usando los originales si no se han modificado
            const fullFormData: IDriver = driverId
                ? {
                    ...originalData, // Sobrecargar datos originales
                    ...formDataDriver, // Sobrescribir con los nuevos valores
                   
                }
                : formDataDriver;
               

            if (driverId) {
                // Actualizar el proveedor existente
                const result = await updateDriverApi(fullFormData);
                if (result === null) {
                    // Caso 204 No Content
                    setDrivers((prevDrivers) =>
                        prevDrivers.map((p) =>
                            p.id === driverId ? { ...p, ...formDataDriver } : p
                        )
                    );
                    toast.success("Consuctor actualizado exitosamente.");
                } else {
                    // Caso respuesta con contenido
                    const adaptedDriver = adaptDriverData(result);
                    setDrivers((prevDrivers) =>
                        prevDrivers.map((p) =>
                            p.id === adaptedDriver.id ? adaptedDriver : p
                        )
                    );
                    toast.success("Conductor actualizado exitosamente.");
                    // Redirige a la página anterior
                }
                setTimeout(() => navigate(-1), 2000); // Redirige a la página anterior
            } else {
                // Crear un nuevo proveedor
                const createdDriver = await createDriverApi(fullFormData);
                if (createdDriver) {
                    const adaptedDriver = adaptDriverData(createdDriver);
                    setDrivers((prevDrivers) => [...prevDrivers, adaptedDriver]);
                    toast.success("Conductor creado exitosamente.");
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
    const handleDeleteDriver = async (id: string) => {
        setLoading(true);
        try {
            await deleteDriverApi(id);
            setDrivers((prevDrivers) =>
                prevDrivers.filter((driver) => driver.id !== id)
            );
            toast.success("Conductor eliminado exitosamente.");
        } catch {
            toast.error("Error al eliminar el conductor");
        } finally {
            setLoading(false);
        }
    };

    const handleDocumentoChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, campo: string) => {
        const value = e.target.value;
        setFormDataDriver((prev) => {
          const updatedDocumentos = [...prev.documentosTransito]; // Hacemos una copia del array
          updatedDocumentos[index] = {
            ...updatedDocumentos[index], // Copiamos el documento en el índice
            [campo]: value, // Actualizamos solo el campo que cambió
          };
          return {
            ...prev,
            documentosTransito: updatedDocumentos, // Actualizamos el array de documentos
          };
        });
      };
      
    

    return {
        drivers,
        formDataDriver,
        setFormDataDriver,
        error,
        successMessage,
        loading,
        handleChangeDriver,
        handleSubmitDriver,
        handleDeleteDriver,
        handleDocumentoChange,
    };
};
