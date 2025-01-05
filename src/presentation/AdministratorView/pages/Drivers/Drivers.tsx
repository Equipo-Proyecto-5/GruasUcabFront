
import React, { useState } from 'react';
import { FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDriver } from '../Drivers/Hooks/useDriver';
import Modal from '@/components/Modal'; // Importa tu componente de Modal

function Providers() {
  const { drivers, loading, error, handleDeleteDriver } = useDriver(); // Usa el hook para obtener los proveedores
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null); 

  const openModal = (id: string) => {
    setSelectedDriverId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDriverId(null);
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (selectedDriverId) {
      await handleDeleteDriver(selectedDriverId);
      closeModal();
    }
  };

  const toggleRowExpansion = (driverId: string) => {
    // Si la fila ya está expandida, la colapsamos, de lo contrario la expandimos
    if (expandedRow === driverId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(driverId);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center p-4">
        <div className="text-xl font-bold">Gestión de Conductores</div>
        <Link
          to="/admin/formdriver"
          className="flex items-center space-x-2 text-primary font-bold mt-10 hover:scale-90 transition-transform duration-200"
        >
          <button className="flex items-center space-x-2 text-primary font-bold mt-10 hover:scale-90 transition-transform duration-200">
            <span>Crear Conductor</span>
            <FaPlus className="text-xl" />
          </button>
        </Link>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Nombre</th>
            <th scope="col" className="px-6 py-3 text-center">Cedula</th>
            <th scope="col" className="px-6 py-3 text-center">Telefono</th>
            <th scope="col" className="px-6 py-3 text-center">Direccion</th>
            <th scope="col" className="px-6 py-3 text-primary">
              <span className="sr-only text-primary">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={5}>Cargando conductores...</td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={5}>Error: {error}</td>
            </tr>
          )}
          {!loading &&
            !error &&
            drivers.map((driver) => (
              <React.Fragment key={driver.id}>
                {/* Fila principal */}
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                  onClick={() => toggleRowExpansion(String(driver.id))} // Al hacer clic expandimos o contraemos la fila
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {driver.primerNombre + ' ' + driver.primerApellido}
                  </th>
                  <td className="px-6 py-4 text-center">{driver.tipoDocumentoIdentidad + ' ' + driver.numeroDocumentoIdentidad}</td>
                  <td className="px-6 py-4 text-center">{driver.numeroTelefono}</td>
                  <td className="px-6 py-4 text-center">
                    {driver.direccion}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-4">
                      <Link
                        to={`/admin/formdriver/editar/${driver.id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => openModal(String(driver.id))}
                        className="text-red-500"
                      >
                        <FaTrash className="text-s" />
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Fila adicional cuando está expandida 
                {expandedRow === provider.id && (
                 <tr className="bg-gray-100">
                 <td colSpan={5} className="text-left py-2 pl-6"> {/* Alineamos el contenido a la izquierda con `text-left` y aplicamos padding a la izquierda con `pl-6` 
                 <Link
                      to={`/admin/cranes/${provider.id}`}
                     
                      className="text-blue-500 hover:underline"
                    >
                      Ver Flota de Grúas
                    </Link>

                 </td>
               </tr>
               
                )}*/}
              </React.Fragment>
            ))}
        </tbody>
      </table>

      {/* Modal de confirmación de eliminación */}
      <Modal
        title="Confirmar Eliminación"
        message="¿Estás seguro de que deseas eliminar este conductor?"
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={closeModal}
      />
    </div>
  );
}

export default Providers;
