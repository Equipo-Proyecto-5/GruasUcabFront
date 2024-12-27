import { useParams } from 'react-router-dom';
import { useDepartments} from './Hooks/useDepartment';  
import Modal from '@/components/Modal';
import { useState } from 'react';

function FormDepartments() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const {
    formData,
    error,
    loading,
    handleChange,
    handleSubmit,
  } = useDepartments(id);

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
          {isEditMode ? 'Editar Departamento' : 'Crear Departamento'}
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
                  placeholder="RRHH"
                  required
                />
              </div>
              <div>
                <label htmlFor="descripcion" className="block text-gray-700 dark:text-white mb-1">Descripcion</label>
                <input
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  placeholder="Gestiona talento, reclutamiento, desarrollo y bienestar de los empleados en la organización."
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
                {loading ? (isEditMode ? 'Actualizando...' : 'Registrando...') : (isEditMode ? 'Actualizar Departamento' : 'Registrar Departamento')}
              </button>
            </div>
          </div>
        </form>
      </div>
      <Modal
        title="Confirmar Modificacion"
        message="¿Estás seguro de que deseas Modificar este Departamento?"
        isOpen={isModalOpen}
        onConfirm={confirmEdit}
        onCancel={closeModal}
      />
    </div>
    );
}

export default FormDepartments;
