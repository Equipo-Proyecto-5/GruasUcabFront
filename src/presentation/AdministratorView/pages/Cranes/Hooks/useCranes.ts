import { useEffect, useState } from "react";
import { ICranes } from "@/models/Cranes";
import {
    createCranesApi,
    fetchCranesApi,
    updateCranesApi,
    deleteCranesApi,
} from "@/presentation/AdministratorView/pages/Cranes/api/CranesApi";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom"; // Se añade useParams
import { adaptCranesData } from "@/adapters/CranesAdapter";

export const useCranes = (cranesId?: string) => {
    const { providerId } = useParams<{ providerId: string }>(); // Obtenemos providerId desde la ruta
    const [cranes, setCranes] = useState<ICranes[]>([]);
    const [filteredCranes, setFilteredCranes] = useState<ICranes[]>([]);
    const [originalData, setOriginalData] = useState<ICranes | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState<ICranes>({
        proveedorId: providerId || "", // Se inicializa con el providerId de la ruta
        id: "",
        tipo: "",
        marca: "",
        modelo: "",
        año: "",
        placa: "",
        color: "",
        denominacionComercial: "",
    });
    const navigate = useNavigate();

    const resetForm = () => {
        setFormData({
            proveedorId: providerId || "", // Resetea con el providerId de la ruta
            id: "",
            tipo: "",
            marca: "",
            modelo: "",
            año: "",
            placa: "",
            color: "",
            denominacionComercial: "",
        });
    };

    useEffect(() => {
        loadCranes();
    }, []);

    useEffect(() => {
        if (cranesId) {
            const loadCranes = async () => {
                setLoading(true);
                try {
                    const cranes = await fetchCranesById(cranesId);
                    if (cranes) {
                        setOriginalData(cranes);
                        setFormData({
                            ...cranes,
                            proveedorId: providerId || cranes.proveedorId, // Prioriza el providerId de la ruta
                        });
                    }
                    setError(null);
                } catch (err) {
                    setError((err as Error).message || "Error al obtener la grua");
                } finally {
                    setLoading(false);
                }
            };
            loadCranes();
        }
    }, [cranesId, providerId]);

    useEffect(() => {
        if (providerId) {
            filterCranesByProvider(providerId);
        } else {
            setFilteredCranes(cranes);
        }
    }, [cranes, providerId]);

    const loadCranes = async () => {
        setLoading(true);
        try {
            const cranesData = await fetchCranesApi();
            const activeCranes = cranesData.filter(
                (crane: ICranes) => crane.estatus?.toLowerCase() === "activo"
            );
            console.log("Gruas activas filtradas:", activeCranes);
            setCranes(activeCranes.map(adaptCranesData));
        } catch {
            toast.error("Error al cargar las gruas");
        } finally {
            setLoading(false);
        }
    };

    const fetchCranesById = async (id: string): Promise<ICranes | null> => {
        try {
            const cranes = await fetchCranesApi();
            return cranes.find((crane: ICranes) => crane.id === id) || null;
        } catch {
            toast.error("Error fetching cranes by ID:");
            return null;
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();
        setLoading(true);
        setSuccessMessage(null);

        try {
            const fullFormData: ICranes = cranesId
                ? {
                    ...originalData,
                    ...formData,
                    proveedorId: providerId  // Aseguramos que proveedorId esté definido
                }
                : formData;

            if (cranesId) {
                const result = await updateCranesApi(fullFormData);
                if (result === null) {
                    setCranes((prevCranes) =>
                        prevCranes.map((crane) => crane.id === cranesId ? { ...crane, ...fullFormData } : crane)
                    );
                    toast.success("Grua actualizada exitosamente.");
                } else {
                    const adaptedCranes = adaptCranesData(result);
                    setCranes((prevCranes) =>
                        prevCranes.map((crane) =>
                            crane.id === adaptedCranes.id ? adaptedCranes : crane
                        )
                    );
                    toast.success("Grua actualizada exitosamente.");
                }
                setTimeout(() => navigate(-1), 2000);
            } else {
                const createdCranes = await createCranesApi(fullFormData);
                if (createdCranes) {
                    const adaptedCranes = adaptCranesData(createdCranes);
                    setCranes((prevCranes) => [...prevCranes, adaptedCranes]);
                    toast.success("Grua creada exitosamente.");
                    resetForm();
                }
            }
        } catch {
            toast.error("Error al procesar la solicitud");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCranes = async (id: string) => {
        setLoading(true);
        try {
            await deleteCranesApi(id);
            setCranes((prevCranes) =>
                prevCranes.filter((crane) => crane.id !== id)
            );
            toast.success("Grua eliminada exitosamente.");
        } catch {
            toast.error("Error al eliminar la Grua");
        } finally {
            setLoading(false);
        }
    };

    const filterCranesByProvider = (providerId: string) => {
        const filtered = cranes.filter((crane) => crane.proveedorId && crane.proveedorId === providerId);
        console.log("Gruas filtradas: ", filtered);
        setFilteredCranes(filtered);
    };

    return {
        cranes,
        filteredCranes,
        formData,
        error,
        successMessage,
        loading,
        handleChange,
        handleSubmit,
        handleDeleteCranes,
        filterCranesByProvider,
    };
};