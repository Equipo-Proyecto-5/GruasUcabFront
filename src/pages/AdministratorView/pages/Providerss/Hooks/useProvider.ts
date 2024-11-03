// src/hooks/useProviders.ts
import { useEffect, useState } from 'react';
import { fetchProviders } from '@/Services/ProviderService';
import { Provider } from '@/models/Provider';

export const useProviders = () => {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // ESTADO DE CARGA DE LOS DATOS
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProviders = async () => {
            try {
                setLoading(true);
                const data = await fetchProviders();
                setProviders(data);
            } catch (err) {
                setError((err as Error).message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        loadProviders();
    }, []);

    return { providers, loading, error };
};
