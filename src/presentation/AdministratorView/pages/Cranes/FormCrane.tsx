import { useParams } from 'react-router-dom';
import { useCranes } from './Hooks/useCranes';
import Modal from '@/components/Modal';
import { useState } from 'react';


function FormCrane() {
  const {id} = useParams<{ id: string }>(); 
  const isEditMode = !!id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const {
    formData,
    error,
    loading,
    handleChange,
    handleSubmit,
  } = useCranes(id);

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

  return (
    <div className="w-full max-w-3xl mx-auto md:p-4 p-0 mt-8">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {isEditMode ? 'Editar Grua' : 'Crear Grua'}
        </h1>

        <form  // Muestra la modal de confirmación antes de enviar el formulario.
        onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="marca" className="block text-gray-700 dark:text-white mb-1">Marca</label>
                <input
                  type="text"
                  id="marca"
                  name="marca"
                  value={formData.marca}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  placeholder="Chevrolet"
                  required
                />
              </div>
              <div>
                <label htmlFor="modelo" className="block text-gray-700 dark:text-white mb-1">Modelo</label>
                <input
                  type="text"
                  id="modelo"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  placeholder="Grua"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mt-4">
              <label htmlFor="año" className="block text-gray-700 dark:text-white mb-1">Año</label>
              <input
                type="text"
                id="año"
                name="año"
                value={formData.año}
                onChange={handleChange}
                className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                placeholder="Av. Las Acasias Maracay"
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="placa" className="block text-gray-700 dark:text-white mb-1">
                    Placa
              </label>
              <input
                type="text"
                id="placa"
                name="placa"
                value={formData.placa}
                onChange={handleChange}
                className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                placeholder="AVS-147"
                required
              />        
            </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            

              <div>
                <label htmlFor="Tipo" className="block text-gray-700 dark:text-white mb-1">Tipo</label>
                <select
                        id="tipo"
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                        required
                      >
                          <option value="" disabled>
                            Selecciona un tipo
                          </option>
                              <option value="Pesada">Pesada</option>
                              <option value="Liviana">Liviana</option>
                              <option value="Carga">Carga</option>
                              </select>
              </div>


              <div>
              <label htmlFor="color" className="block text-gray-700 dark:text-white mb-1">
                    Color
              </label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                placeholder="Verde"
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
                {loading ? (isEditMode ? 'Actualizando...' : 'Registrando...') : (isEditMode ? 'Actualizar Grua' : 'Registrar Grua')}
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* Modal de confirmación */}
      <Modal
        title="Confirmar Modificacion"
        message="¿Estás seguro de que deseas Modificar esta Grua?"
        isOpen={isModalOpen}
        onConfirm={confirmEdit}
        onCancel={closeModal}
      />
    </div>
  );
}

export default FormCrane;