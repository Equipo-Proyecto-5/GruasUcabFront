import { useState } from 'react';
import { FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRepProviders } from './Hooks/useRepProvider';
import Modal from '@/components/Modal';

//Hay que arreglar al traer los datos de Operador de cabina el icono de basura no se muestra se anade un FAtrash

function ProviderssRepresentative() {
  const { repProviders, loading, error, handleDeleteRepProvider } = useRepProviders(); // Usa el hook para obtener los proveedores
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRepProviderId, setSelectedRepProviderId] = useState<string | null>(null); // Estado para el proveedor seleccionado

  // Función para abrir el modal y establecer el ID del proveedor a eliminar
  const openModal = (id: string) => {
    setSelectedRepProviderId(id);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedRepProviderId(null);
    setIsModalOpen(false);
  };

  // Función para confirmar la eliminación y llamar a la función de eliminación /admin/formrepProviders
  const confirmDelete = async () => {
    if (selectedRepProviderId) {
      await handleDeleteRepProvider(selectedRepProviderId);
      closeModal();
    }
  };


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center p-4">
        <div className="text-xl font-bold">Gestión de Representante de Proveedor</div>
        <Link to="/admin/formproviderssrepresentative" className="flex items-center space-x-2 text-primary font-bold mt-10 hover:scale-90 transition-transform duration-200">
          <button className="flex items-center space-x-2 text-primary font-bold mt-10 hover:scale-90 transition-transform duration-200">
            <span>Crear Representante</span>
            <FaPlus className="text-xl" />
          </button>
        </Link>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Nombre Completo</th>
            <th scope="col" className="px-6 py-3 text-center">Documento de Identidad</th>
            <th scope="col" className="px-6 py-3 text-center">Fecha de Nacimiento</th>
            <th scope="col" className="px-6 py-3 text-center">Direccion</th>
            <th scope="col" className="px-6 py-3 text-center">Teléfono</th>
            <th scope="col" className="px-6 py-3 text-center">Correo</th>
            <th scope="col" className="px-6 py-3 text-primary"><span className="sr-only text-primary">Edit</span></th>
          </tr>
        </thead>
        <tbody>
          {loading && <tr><td colSpan={5}>Cargando representantes...</td></tr>}
          {error && <tr><td colSpan={5}>Error: {error}</td></tr>}
          {!loading && !error && repProviders.map(repProvider => (
            <tr key={repProvider.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 text-center">{repProvider.primerNombre} {repProvider.segundoNombre} {repProvider.primerApellido} {repProvider.segundoApellido}</td>
              <td className="px-6 py-4 text-center">{repProvider.tipoDocumentoIdentidad + ' -' + repProvider.numeroDocumentoIdentidad}</td>
              <td className="px-6 py-4 text-center">{repProvider.fechaNacimiento}</td>
              <td className="px-6 py-4 text-center">{repProvider.direccion}</td>
              <td className="px-6 py-4 text-center">{repProvider.numeroTelefono}</td>
              <td className="px-6 py-4 text-center">{repProvider.correo}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end space-x-4">
                  <Link to={`/admin/formproviderssrepresentative/editar/${repProvider.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </Link>
                  <button 
                    onClick={() => openModal(String(repProvider.id))}
                    className="text-red-500"
                  >
                    <FaTrash className="text-s" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        title="Confirmar Eliminación"
        message="¿Estás seguro de que deseas eliminar este proveedor?"
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={closeModal}
      />
    </div>
  );
}

export default ProviderssRepresentative;
