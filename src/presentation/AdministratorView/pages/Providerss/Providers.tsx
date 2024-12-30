import React, { useState } from 'react';
import { FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useProviders } from './Hooks/useProvider';
import Modal from '@/components/Modal'; // Importa tu componente de Modal

function Providers() {
  const { providers, loading, error, handleDeleteProvider } = useProviders(); // Usa el hook para obtener los proveedores
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null); 

  const openModal = (id: string) => {
    setSelectedProviderId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProviderId(null);
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (selectedProviderId) {
      await handleDeleteProvider(selectedProviderId);
      closeModal();
    }
  };

  const toggleRowExpansion = (providerId: string) => {
    // Si la fila ya está expandida, la colapsamos, de lo contrario la expandimos
    if (expandedRow === providerId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(providerId);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center p-4">
        <div className="text-xl font-bold">Gestión de Proveedores</div>
        <Link
          to="/admin/formproviderss"
          className="flex items-center space-x-2 text-primary font-bold mt-10 hover:scale-90 transition-transform duration-200"
        >
          <button className="flex items-center space-x-2 text-primary font-bold mt-10 hover:scale-90 transition-transform duration-200">
            <span>Crear Proveedor</span>
            <FaPlus className="text-xl" />
          </button>
        </Link>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Razon Social</th>
            <th scope="col" className="px-6 py-3 text-center">Denominacion Comercial</th>
            <th scope="col" className="px-6 py-3 text-center">Direccion Fiscal</th>
            <th scope="col" className="px-6 py-3 text-center">Rif</th>
            <th scope="col" className="px-6 py-3 text-primary">
              <span className="sr-only text-primary">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={5}>Cargando proveedores...</td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={5}>Error: {error}</td>
            </tr>
          )}
          {!loading &&
            !error &&
            providers.map((provider) => (
              <React.Fragment key={provider.id}>
                {/* Fila principal */}
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                  onClick={() => toggleRowExpansion(String(provider.id))} // Al hacer clic expandimos o contraemos la fila
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {provider.razonSocial}
                  </th>
                  <td className="px-6 py-4 text-center">{provider.denominacionComercial}</td>
                  <td className="px-6 py-4 text-center">{provider.direccionFisica}</td>
                  <td className="px-6 py-4 text-center">
                    {provider.tipoDocumentoIdentidad + ' -' + provider.numeroDocumentoIdentidad}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-4">
                      <Link
                        to={`/admin/formproviderss/editar/${provider.id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => openModal(String(provider.id))}
                        className="text-red-500"
                      >
                        <FaTrash className="text-s" />
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Fila adicional cuando está expandida */}
                {expandedRow === provider.id && (
                 <tr className="bg-gray-100">
                 <td colSpan={5} className="text-left py-2 pl-6"> {/* Alineamos el contenido a la izquierda con `text-left` y aplicamos padding a la izquierda con `pl-6` */}
                 <Link
                      to={`/admin/cranes/${provider.id}`}
                     
                      className="text-blue-500 hover:underline"
                    >
                      Ver Flota de Grúas
                    </Link>

                 </td>
               </tr>
               
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>

      {/* Modal de confirmación de eliminación */}
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

export default Providers;
