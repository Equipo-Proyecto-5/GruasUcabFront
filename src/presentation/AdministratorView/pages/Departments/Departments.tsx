import { useState } from 'react';
import { FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDepartments } from './Hooks/useDepartment';
import Modal from '@/components/Modal';

//Hay que arreglar al traer los datos de Operador de cabina el icono de basura no se muestra se anade un FAtrash

function Departments() {
  const { departments, loading, error, handleDeleteDepartment} = useDepartments(); // Usa el hook para obtener los proveedores
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null); // Estado para el proveedor seleccionado

  // Función para abrir el modal y establecer el ID del proveedor a eliminar
  const openModal = (id: string) => {
    setSelectedDepartmentId(id);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedDepartmentId(null);
    setIsModalOpen(false);
  };

  // Función para confirmar la eliminación y llamar a la función de eliminación /admin/formoperators
  const confirmDelete = async () => {
    if (selectedDepartmentId) {
      await handleDeleteDepartment(selectedDepartmentId);
      closeModal();
    }
  };


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center p-4">
        <div className="text-xl font-bold">Gestión de Departamentos</div>
        <Link to="/admin/formdepartments" className="flex items-center space-x-2 text-primary font-bold mt-10 hover:scale-90 transition-transform duration-200">
          <button className="flex items-center space-x-2 text-primary font-bold mt-10 hover:scale-90 transition-transform duration-200">
            <span>Crear Departamento</span>
            <FaPlus className="text-xl" />
          </button>
        </Link>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">Nombre</th>
            <th scope="col" className="px-6 py-3 text-center">Descripcion</th>
            <th scope="col" className="px-6 py-3 text-primary"><span className="sr-only text-primary">Edit</span></th>
          </tr>
        </thead>
        <tbody>
          {loading && <tr><td colSpan={5}>Cargando departamentos...</td></tr>}
          {error && <tr><td colSpan={5}>Error: {error}</td></tr>}
          {!loading && !error && departments.map(department => (
            <tr key={department.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 text-center">{department.nombre}</td>
              <td className="px-6 py-4 text-center">{department.descripcion}</td>
              
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end space-x-4">
                  <Link to={`/admin/formdepartments/editar/${department.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </Link>
                  <button 
                    onClick={() => openModal(String(department.id))}
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

export default Departments;