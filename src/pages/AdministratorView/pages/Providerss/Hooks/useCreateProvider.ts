import { useState } from 'react';
import { createProvider } from '@/Services/ProviderService'; // Asegúrate de que la ruta sea correcta
import { Provider } from '@/models/Provider'; // Importa tu modelo

const useCreateProvider = () => {
  const [formData, setFormData] = useState<Provider>({
    id: '',
    denominacionComercial: '',
    razonSocial: '',
    direccionFisica: '',
    tipoDocumentoIdentidad: '',
    numeroDocumentoIdentidad: '',
    estatus: '',
  });
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createProvider(formData);
      // Limpia el formulario o realiza alguna otra acción en caso de éxito
      setFormData({
        id: '',
    denominacionComercial: '',
    razonSocial: '',
    direccionFisica: '',
    tipoDocumentoIdentidad: '',
    numeroDocumentoIdentidad: '',
    estatus: '',
      });
      setError(null);
    } catch (err) {
      setError((err as Error).message || 'Error al crear el proveedor');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    error,
    loading,
    handleChange,
    handleSubmit,
  };
};

export default useCreateProvider;
