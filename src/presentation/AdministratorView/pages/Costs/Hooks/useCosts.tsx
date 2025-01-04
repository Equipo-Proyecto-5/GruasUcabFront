import { useState, useEffect } from 'react';
import { fetchCostsApi, updateCostApi } from '../api/CostsApi';
import { ICosts } from '@/models/Costs';
import toast from 'react-hot-toast';

export const useCosts = (idOrden: string) => {
  const [costs, setCosts] = useState<ICosts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        setLoading(true);
        const data = await fetchCostsApi(idOrden);
        setCosts(data);
      } catch  {
        toast.error('Error al cargar los costos');
        
      } finally {
        setLoading(false);
      }
    };

    fetchCosts();
  }, [idOrden]);

  const updateCost = async (id: string, costData: string) => {
    try {
        setLoading(true);

       
        const updatedCost = await updateCostApi(id, costData);

        // Actualizar solo el estatus en el estado, manteniendo el resto de la información igual
        setCosts((prevCosts) =>
            prevCosts.map((cost) =>
                cost.id === id ? { ...cost, status: updatedCost.status } : cost
            )
        );

        toast.success('Costo actualizado correctamente');
    } catch (error) {
        console.error(error);
        toast.error('Error al actualizar el costo');
    } finally {
        setLoading(false); 
    }
};




  return { costs, loading, error, updateCost };
};