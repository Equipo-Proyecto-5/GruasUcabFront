import { useState } from 'react';
import { FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useOperators } from './Hooks/useOperator';
import Modal from '@/components/Modal';

//Hay que arreglar al traer los datos de Operador de cabina el icono de basura no se muestra se anade un FAtrash

function Operators() {
  const { operators, loading, error, handleDeleteOperator } = useOperators(); // Usa el hook para obtener los proveedores
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOperatorId, setSelectedOperatorId] = useState<string | null>(null); // Estado para el proveedor seleccionado

  // Función para abrir el modal y establecer el ID del proveedor a eliminar
  const openModal = (id: string) => {
    setSelectedOperatorId(id);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedOperatorId(null);
    setIsModalOpen(false);
  };

  // Función para confirmar la eliminación y llamar a la función de eliminación /admin/formoperators
  const confirmDelete = async () => {
    if (selectedOperatorId) {
      await handleDeleteOperator(selectedOperatorId);
      closeModal();
    }
  };


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center p-4">
        <div className="text-xl font-bold">Gestión de Operadores</div>
        <Link to="/admin/formoperators" className="flex items-center space-x-2 text-primary font-bold mt-10 hover:scale-90 transition-transform duration-200">
          <button className="flex items-center space-x-2 text-primary font-bold mt-10 hover:scale-90 transition-transform duration-200">
            <span>Crear Operador</span>
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
          {loading && <tr><td colSpan={5}>Cargando operadores...</td></tr>}
          {error && <tr><td colSpan={5}>Error: {error}</td></tr>}
          {!loading && !error && operators.map(operator => (
            <tr key={operator.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 text-center">{operator.primerNombre} {operator.segundoNombre} {operator.primerApellido} {operator.segundoApellido}</td>
              <td className="px-6 py-4 text-center">{operator.tipoDocumentoIdentidad + ' -' + operator.numeroDocumentoIdentidad}</td>
              <td className="px-6 py-4 text-center">{operator.fechaNacimiento}</td>
              <td className="px-6 py-4 text-center">{operator.direccion}</td>
              <td className="px-6 py-4 text-center">{operator.numeroTelefono}</td>
              <td className="px-6 py-4 text-center">{operator.correo}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end space-x-4">
                  <Link to={`/admin/formoperators/editar/${operator.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </Link>
                  <button 
                    onClick={() => openModal(String(operator.id))}
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

export default Operators;
