import { useParams } from 'react-router-dom';
import { useRates} from './Hooks/useRate';  
import Modal from '@/components/Modal';
import { useState } from 'react';

function FormRates() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const {
    formData,
    error,
    loading,
    handleChange,
    handleSubmit,
  } = useRates(id);

// Función para cerrar la modal
const closeModal = () => {
  setIsModalOpen(false);
};

// Función para confirmar la edición
const confirmEdit = () => {
  closeModal(); // Cierra la modal
  handleSubmit(); // Llama a la función de envío sin pasar un evento
};

// Maneja el envío del formulario con la validación de eventos
const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // Evita el comportamiento por defecto del formulario
  if (isEditMode) {
    setIsModalOpen(true); // Muestra la modal de confirmación si es modo edición
  } else {
    handleSubmit(e); // Llama directamente a la función de envío si es creación
  }
};

//Se reemplaza el contenido por los campos de los operadores que se van a registrar
//Se quitan los {/* */} para que se pueda visualizar el contenido

    return (
    <div className="w-full max-w-3xl mx-auto md:p-4 p-0 mt-8">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {isEditMode ? 'Editar Tarifa' : 'Crear Tarifa'}
        </h1>

        <form  // Muestra la modal de confirmación antes de enviar el formulario.
        onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nombre" className="block text-gray-700 dark:text-white mb-1">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  placeholder="Basica"
                  required
                />
              </div>
              <div>
                <label htmlFor="costoBase" className="block text-gray-700 dark:text-white mb-1">Cobertura Base</label>
                <input
                  type="text"
                  id="costoBase"
                  name="costoBase"
                  value={formData.costoBase}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  placeholder="1"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="distanciaKm" className="block text-gray-700 dark:text-white mb-1">Distancia Base</label>
                <input
                  type="text"
                  id="distanciaKm"
                  name="distanciaKm"
                  value={formData.distanciaKm}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  placeholder="1"
                  required
                />
              </div>
              <div>
                <label htmlFor="costoPorKm" className="block text-gray-700 dark:text-white mb-1">Costo por Km Extra</label>
                <input
                  type="text"
                  id="costoPorKm"
                  name="costoPorKm"
                  value={formData.costoPorKm}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  placeholder="1"
                  required
                />
              </div>
            </div>
           
             
            {error && (
              <div className="mt-4 text-red-600">
                {error}
              </div>
            )}

            <div className="mt-8 flex justify-end">
            <button
                type="submit"
                className="bg-teal-500 text-white px-4 py-2 md:px-8 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900"
                disabled={loading}
              >
                {loading ? (isEditMode ? 'Actualizando...' : 'Registrando...') : (isEditMode ? 'Actualizar Tarifa' : 'Registrar Tarifa')}
              </button>
            </div>
          </div>
        </form>
      </div>
      <Modal
        title="Confirmar Modificacion"
        message="¿Estás seguro de que deseas Modificar esta Tarifa?"
        isOpen={isModalOpen}
        onConfirm={confirmEdit}
        onCancel={closeModal}
      />
    </div>
    );
}

export default FormRates;
