import React, {  useState } from 'react';
import { FaPlus, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useCranes } from '../../AdministratorView/pages/Cranes/Hooks/useCranes';
import Modal from '@/components/Modal'; // Importa tu componente de Modal
//import { ICranes } from "@/models/Cranes";

function Cranes() {
  const { providerId } = useParams<{ providerId: string }>();
  console.log("providerId desde useParams:", providerId);
  const { filteredCranes, loading, error, handleDeleteCranes } = useCranes(); // Usa el hook para obtener las grúas
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCranesId, setSelectedCranesId] = useState<string | null>(null);
  

  const openModal = (id: string) => {
    setSelectedCranesId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCranesId(null);
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (selectedCranesId) {
      await handleDeleteCranes(selectedCranesId);
      closeModal();
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center p-4">
        <div className="text-xl font-bold">Gestión de Gruas</div>
        <Link
          to={`/admin/formcranes/${providerId}`}  
          className="flex items-center space-x-2 text-primary font-bold mt-10 hover:scale-90 transition-transform duration-200"
        >
          <button className="flex items-center space-x-2 text-primary font-bold mt-10 hover:scale-90 transition-transform duration-200">
            <span>Crear Gruas</span>
            <FaPlus className="text-xl" />
          </button>
        </Link>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Marca</th>
            <th scope="col" className="px-6 py-3 text-center">Modelo</th>
            <th scope="col" className="px-6 py-3 text-center">Año</th>
            <th scope="col" className="px-6 py-3 text-center">Placa</th>
            <th scope="col" className="px-6 py-3 text-center">Tipo</th>
            <th scope="col" className="px-6 py-3 text-center">Color</th>
            <th scope="col" className="px-6 py-3 text-primary">
              <span className="sr-only text-primary">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
        {loading && <tr><td colSpan={5}>Cargando...</td></tr>}
          {error && <tr><td colSpan={5}>Error: {error}</td></tr>}
          {filteredCranes.map((cranes) => (
              <React.Fragment key={cranes.id}>
                {/* Fila principal */}
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">

                  <th scope="row"className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{cranes.marca}</th>
                  <td className="px-6 py-4 text-center text-white">{cranes.modelo}</td>
                  <td className="px-6 py-4 text-center">{cranes.año}</td>
                  <td className="px-6 py-4 text-center">{cranes.placa}</td>
                  <td className="px-6 py-4 text-center">{cranes.tipo}</td>
                  <td className="px-6 py-4 text-center">{cranes.color}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-4">
                      <Link
                        to={`/admin/formcranes/editar/${cranes.id}/${providerId}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => openModal(String(cranes.id))}
                        className="text-red-500"
                      >
                        <FaTrash className="text-s" />
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Fila adicional cuando está expandida */}
               
              </React.Fragment>
            ))}
        </tbody>
      </table>

      {/* Modal de confirmación de eliminación */}
      <Modal
        title="Confirmar Eliminación"
        message="¿Estás seguro de que deseas eliminar esta grúa?"
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={closeModal}
      />
    </div>
  );
}

export default Cranes;