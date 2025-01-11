import { useParams } from 'react-router-dom';
import { useRepProviders} from './Hooks/useRepProvider';  
import Modal from '@/components/Modal';
import { useState } from 'react';

function FormRepProviders() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const {
    formData,
    error,
    loading,
    handleChange,
    handleSubmit,
  } = useRepProviders(id);

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
          {isEditMode ? 'Editar Representante de Proveedor' : 'Crear Representante de Proveedor'}
        </h1>

        <form  // Muestra la modal de confirmación antes de enviar el formulario.
        onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="PrimerNombre" className="block text-gray-700 dark:text-white mb-1">Primer Nombre</label>
                <input
                  type="text"
                  id="primerNombre"
                  name="primerNombre"
                  value={formData.primerNombre}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  placeholder="Gabriela"
                  required
                />
              </div>
              <div>
                <label htmlFor="primerApellido" className="block text-gray-700 dark:text-white mb-1">Primer Apellido</label>
                <input
                  type="text"
                  id="primerApellido"
                  name="primerApellido"
                  value={formData.primerApellido}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  placeholder="Martinez"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="PrimerNombre" className="block text-gray-700 dark:text-white mb-1">Segundo Nombre</label>
                <input
                  type="text"
                  id="segundoNombre"
                  name="segundoNombre"
                  value={formData.segundoNombre}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  placeholder="Alejandra"
                 // required
                />
              </div>
              <div>
                <label htmlFor="segundoApellido" className="block text-gray-700 dark:text-white mb-1">Segundo Apellido</label>
                <input
                  type="text"
                  id="segundoApellido"
                  name="segundoApellido"
                  value={formData.segundoApellido}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  placeholder="Salinas"
                  //required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fechaNacimiento" className="block text-gray-700 dark:text-white mb-1">Fecha de Nacimiento</label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  required
                />
              </div> 
              <div>
                <label htmlFor="numeroTelefono" className="block text-gray-700 dark:text-white mb-1">Telefono</label>
                <input
                  type="text"
                  id="numeroTelefono"
                  name="numeroTelefono"
                  value={formData.numeroTelefono}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  pattern="[0-9]{4}-[0-9]{7}"
                  placeholder="XXXX-XXXXXXX"
                  required
                />
              </div> 
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="correo" className="block text-gray-700 dark:text-white mb-1">Correo</label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  pattern="[a-zA-Z]{1,}@[a-zA-Z0-9]+\.[a-zA-Z]{2,}"
                  placeholder="Ejemplo@gmail.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="contrasena" className="block text-gray-700 dark:text-white mb-1">Contraseña</label>
                <input
                  type="text"
                  id="contrasena"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  placeholder="Entre 8-12 Caracteres"
                  pattern=".{8,12}"
                  required
                />
              </div>
            </div>
            

            <div className="mt-4">
              <label htmlFor="direccion" className="block text-gray-700 dark:text-white mb-1">Dirección</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                placeholder="Av. Las Acasias Maracay"
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="idEmpresaProveedor" className="block text-gray-700 dark:text-white mb-1">Proveedor Asociado</label>
              <input
                type="text"
                id="idEmpresaProveedor"
                name="idEmpresaProveedor"
                value={formData.idEmpresaProveedor}
                onChange={handleChange}
                className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                placeholder="Gruas de Confianza"
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
                              <option value="E">E</option>
                              <option value="V">V</option>
                              </select>        
            </div>

              <div>
                <label htmlFor="numeroDocumentoIdentidad" className="block text-gray-700 dark:text-white mb-1">Numero Documento</label>
                <input
                  type="text"
                  id="numeroDocumentoIdentidad"
                  name="numeroDocumentoIdentidad"
                  value={formData.numeroDocumentoIdentidad}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  placeholder="XXXXXXXX"
                   pattern="[0-9]{8,9}"
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
                {loading ? (isEditMode ? 'Actualizando...' : 'Registrando...') : (isEditMode ? 'Actualizar Representante' : 'Registrar Representante')}
              </button>
            </div>
          </div>
        </form>
      </div>
      <Modal
        title="Confirmar Modificacion"
        message="¿Estás seguro de que deseas Modificar este proveedor?"
        isOpen={isModalOpen}
        onConfirm={confirmEdit}
        onCancel={closeModal}
      />
    </div>
    );
}

export default FormRepProviders;
