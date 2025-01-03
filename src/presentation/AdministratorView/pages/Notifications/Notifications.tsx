import { useState } from 'react';
import { FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNotifications } from './Hooks/useNotification';
import Modal from '@/components/Modal';

//Hay que arreglar al traer los datos de Operador de cabina el icono de basura no se muestra se anade un FAtrash

function Notifications() {
  const { notifications, loading, error, handleDeleteNotification} = useNotifications(); // Usa el hook para obtener los proveedores
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState<string | null>(null); // Estado para el proveedor seleccionado

  // Función para abrir el modal y establecer el ID del proveedor a eliminar
  const openModal = (id: string) => {
    setSelectedNotificationId(id);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedNotificationId(null);
    setIsModalOpen(false);
  };

  // Función para confirmar la eliminación y llamar a la función de eliminación /admin/formoperators
  const confirmDelete = async () => {
    if (selectedNotificationId) {
      await handleDeleteNotification(selectedNotificationId);
      closeModal();
    }
  };


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center p-4">
        <div className="text-xl font-bold">Gestión de Notificaciones</div>
        <Link to="/admin/formnotifications" className="flex items-center space-x-2 text-primary font-bold mt-10 hover:scale-90 transition-transform duration-200">
          <button className="flex items-center space-x-2 text-primary font-bold mt-10 hover:scale-90 transition-transform duration-200">
            <span>Crear Notificacion</span>
            <FaPlus className="text-xl" />
          </button>
        </Link>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">Titulo</th>
            <th scope="col" className="px-6 py-3 text-center">Mensaje</th>
            <th scope="col" className="px-6 py-3 text-center">Tipo</th>
            <th scope="col" className="px-6 py-3 text-center">Destinatarios</th>
            <th scope="col" className="px-6 py-3 text-center">Descripcion</th>
            <th scope="col" className="px-6 py-3 text-primary"><span className="sr-only text-primary">Edit</span></th>
          </tr>
        </thead>
        <tbody>
          {loading && <tr><td colSpan={5}>Cargando notificaciones...</td></tr>}
          {error && <tr><td colSpan={5}>Error: {error}</td></tr>}
          {!loading && !error && notifications.map(notifications => (
            <tr key={notifications.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 text-center">{notifications.titulo}</td>
              <td className="px-6 py-4 text-center">{notifications.mensaje}</td>
              <td className="px-6 py-4 text-center">{notifications.tipoEnvio}</td>
              <td className="px-6 py-4 text-center">{notifications.destinatarios}</td>
              <td className="px-6 py-4 text-center">
                {notifications.tipoEnvio === "Extemporaneo" ? (
                <span>{notifications.fechaHoraEnvio}</span>
                 ) : notifications.tipoEnvio === "Recurrente" && notifications.frecuencia === "Diaria" ? (
                 <span>{notifications.frecuencia + " - " + notifications.horaEnvio}</span>
                 ) : notifications.tipoEnvio === "Recurrente" && notifications.frecuencia === "Semanal" ? (
                 <span>{notifications.frecuencia + " - " + notifications.horaEnvio}</span>
                ) : notifications.tipoEnvio === "Recurrente" && notifications.frecuencia === "Mensual" && notifications.ultimoDia ? (
                 <span>{notifications.frecuencia + " - "+notifications.horaEnvio + " - Último día del mes"}</span>
                ) : notifications.tipoEnvio === "Recurrente" && notifications.frecuencia === "Mensual" ? (
                <span>{notifications.frecuencia + " - " + notifications.horaEnvio + " - Día: " + notifications.diaDelMes}</span>
                ) : (
                <span>No disponible</span>
                )}
             </td>

              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end space-x-4">
                  <Link  to={`/admin/formnotifications/editar/${notifications.id}`}
                     className={`font-medium text-blue-600 dark:text-blue-500 ${
                    notifications.vigencia ? "hover:underline" : "opacity-50 pointer-events-none" }`}>
                    Edit
                  </Link>
                  <button 
                   onClick={() => openModal(String(notifications.id))}
                   className={`text-red-500 ${notifications.vigencia ? "" : "opacity-50 cursor-not-allowed"}`}
                   disabled={!notifications.vigencia}
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

export default Notifications;