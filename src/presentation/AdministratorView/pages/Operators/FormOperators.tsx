//Descomentar cuando se conecte con la base de datos
//import { useParams } from 'react-router-dom';
//import { useProviders } from './Hooks/useProvider';  *Aqui se importa el hook que se va a utilizar
//import Modal from '@/components/Modal';
//import { useState } from 'react';

function FormOperators() {

    //Se utiliza cuando conectemos el formulario con la base de datos
    
    {/*const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const {
    formData,
    error,
    loading,
    handleChange,
    handleSubmit,
  } = useProviders(id);

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
};*/}

//Se reemplaza el contenido por los campos de los operadores que se van a registrar
//Se quitan los {/* */} para que se pueda visualizar el contenido

    return (
   {/* <div className="w-full max-w-3xl mx-auto md:p-4 p-0 mt-8">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {isEditMode ? 'Editar Proveedor' : 'Crear Proveedor'}
        </h1>

        <form  // Muestra la modal de confirmación antes de enviar el formulario.
        onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="denominacionComercial" className="block text-gray-700 dark:text-white mb-1">Denominación Comercial</label>
                <input
                  type="text"
                  id="denominacionComercial"
                  name="denominacionComercial"
                  value={formData.denominacionComercial}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  placeholder="Tu pana el gruero"
                  required
                />
              </div>
              <div>
                <label htmlFor="razonSocial" className="block text-gray-700 dark:text-white mb-1">Razon Social</label>
                <input
                  type="text"
                  id="razonSocial"
                  name="razonSocial"
                  value={formData.razonSocial}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  placeholder="Gruas Ccs C.A"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="direccionFisica" className="block text-gray-700 dark:text-white mb-1">Dirección Fiscal</label>
              <input
                type="text"
                id="direccionFisica"
                name="direccionFisica"
                value={formData.direccionFisica}
                onChange={handleChange}
                className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                placeholder="Av. Las Acasias Maracay"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="tipoDocumentoIdentidad" className="block text-gray-700 dark:text-white mb-1">
                    Tipo de Documento
              </label>
                      <select
                        id="tipoDocumentoIdentidad"
                        name="tipoDocumentoIdentidad"
                        value={formData.tipoDocumentoIdentidad}
                        onChange={handleChange}
                        className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                        required
                      >
                          <option value="" disabled>
                            Selecciona un tipo
                          </option>
                              <option value="J">J</option>
                              <option value="E">E</option>
                              <option value="V">V</option>
                              </select>        
            </div>

              <div>
                <label htmlFor="numeroDocumentoIdentidad" className="block text-gray-700 dark:text-white mb-1">RIF</label>
                <input
                  type="text"
                  id="numeroDocumentoIdentidad"
                  name="numeroDocumentoIdentidad"
                  value={formData.numeroDocumentoIdentidad}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  placeholder="J-31019-7"
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
                {loading ? (isEditMode ? 'Actualizando...' : 'Registrando...') : (isEditMode ? 'Actualizar Proveedor' : 'Registrar Proveedor')}
              </button>
            </div>
          </div>
        </form>
      </div>
      // Modal de confirmación
      <Modal
        title="Confirmar Modificacion"
        message="¿Estás seguro de que deseas Modificar este proveedor?"
        isOpen={isModalOpen}
        onConfirm={confirmEdit}
        onCancel={closeModal}
      />
    </div>*/}
    );
}

export default FormOperators;
