import { useState } from 'react';
import { FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRates } from './Hooks/useRate';
import Modal from '@/components/Modal';

//Hay que arreglar al traer los datos de Operador de cabina el icono de basura no se muestra se anade un FAtrash

function Rates() {
  const { rates, loading, error, handleDeleteRate} = useRates(); // Usa el hook para obtener los proveedores
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRateId, setSelectedRateId] = useState<string | null>(null); // Estado para el proveedor seleccionado

  // Función para abrir el modal y establecer el ID del proveedor a eliminar
  const openModal = (id: string) => {
    setSelectedRateId(id);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedRateId(null);
    setIsModalOpen(false);
  };

  // Función para confirmar la eliminación y llamar a la función de eliminación /admin/formoperators
  const confirmDelete = async () => {
    if (selectedRateId) {
      await handleDeleteRate(selectedRateId);
      closeModal();
    }
  };


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center p-4">
        <div className="text-xl font-bold">Gestión de Tarifas</div>
        <Link to="/admin/formrates" className="flex items-center space-x-2 text-primary font-bold mt-10 hover:scale-90 transition-transform duration-200">
          <button className="flex items-center space-x-2 text-primary font-bold mt-10 hover:scale-90 transition-transform duration-200">
            <span>Crear Tarifa</span>
            <FaPlus className="text-xl" />
          </button>
        </Link>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">Nombre</th>
            <th scope="col" className="px-6 py-3 text-center">Cobertura Base</th>
            <th scope="col" className="px-6 py-3 text-center">Distancia Base</th>
            <th scope="col" className="px-6 py-3 text-center">Costo por Km Extra</th>
            <th scope="col" className="px-6 py-3 text-primary"><span className="sr-only text-primary">Edit</span></th>
          </tr>
        </thead>
        <tbody>
          {loading && <tr><td colSpan={5}>Cargando tarifas...</td></tr>}
          {error && <tr><td colSpan={5}>Error: {error}</td></tr>}
          {!loading && !error && rates.map(rate => (
            <tr key={rate.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 text-center">{rate.nombre}</td>
              <td className="px-6 py-4 text-center">{rate.costoBase}</td>
              <td className="px-6 py-4 text-center">{rate.distanciaKm}</td>
              <td className="px-6 py-4 text-center">{rate.costoPorKm}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end space-x-4">
                  <Link to={`/admin/formrates/editar/${rate.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </Link>
                  <button 
                    onClick={() => openModal(String(rate.id))}
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
        message="¿Estás seguro de que deseas eliminar esta tarifa?"
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={closeModal}
      />
    </div>
  );
}

export default Rates;