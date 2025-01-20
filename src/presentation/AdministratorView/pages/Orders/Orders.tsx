import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useOrders } from "./Hooks/useOrder"; 
import Modal from '@/components/Modal'; 
import { getBasePath, getUserRole } from "../../../../routes/routesConfig";

function Orders() {
  const { orders, loading, error, updateOrder,  handleAssignOrder } = useOrders(); // Usamos la función updateOrder de tu hook
  const [isModalOpen, setIsModalOpen] = useState(false); // Control del estado del modal
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null); // Control del id de la orden seleccionada

  const openModal = (orderId: string) => {
    setSelectedOrderId(orderId); // Establece el id de la orden seleccionada
    setIsModalOpen(true); // Abre el modal
  };
  

  const closeModal = () => {
    setSelectedOrderId(null);
    setIsModalOpen(false); // Cierra el modal
  };

  const confirmCancel = async () => {
    if (selectedOrderId) {
      // Llama a la función updateOrder con el estatus "cancelar"
      await updateOrder({ id: selectedOrderId, estatus: "Cancelar" });
      closeModal(); // Cierra el modal después de cancelar
    }
  };

  const role = getUserRole();
  const basePath = getBasePath(role);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center p-4">
        <div className="text-xl font-bold">Gestión de Órdenes</div>
        <Link
          to={`${basePath}/formordersstep`}
          className="flex items-center space-x-2 text-primary font-bold mt-10 hover:scale-90 transition-transform duration-200"
        >
          <button className="flex items-center space-x-2 text-primary font-bold mt-10 hover:scale-90 transition-transform duration-200">
            <span>Crear Orden</span>
            <FaPlus className="text-xl" />
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-4">Cargando órdenes...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">
          Error al cargar las órdenes: {error}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-4">No hay órdenes activas disponibles.</div>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-bg-white uppercase bg-slate-900 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">N # Orden</th>
              <th scope="col" className="px-6 py-3 text-center">Cobertura Póliza</th>
              <th scope="col" className="px-6 py-3 text-center">Nombre del Asegurado</th>
              <th scope="col" className="px-6 py-3 text-center">Nombre del Denunciante</th>
              <th scope="col" className="px-6 py-3 text-center">Fecha de Emisión</th>
              <th scope="col" className="px-6 py-3 text-center">Estatus</th>
              <th scope="col" className="px-6 py-3 text-primary">
                <span className="sr-only text-primary">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="bg-white border-b-4 border-black dark:border-b-4 dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-bold text-black whitespace-nowrap dark:text-white text-center"
                >
                  <Link to={`${basePath}/actionorder/${order.id}`} className="text-blue-600 hover:underline">
                    {order.coberturaBasePoliza ? `${order.numeroFactura}` : "Sin Tipo"}
                  </Link>
                </th>
                <td className="px-6 py-4 text-center text-black dark:text-white">{order.coberturaBasePoliza} $</td>
                <td className="px-6 py-4 text-center text-black dark:text-white">{order.nombreAsegurado}</td>
                <td className="px-6 py-4 text-center text-black dark:text-white">{order.nombreDenunciante}</td>
                <td className="px-6 py-4 text-center text-black dark:text-white">{new Date(order.fecha).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-center text-black dark:text-white">{order.estatus}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-4">
                    <button
                      onClick={async () => {
                        await handleAssignOrder(String(order.id));
                      }}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-center"
                    >
                      Asignar
                    </button>
                    <button
                      onClick={() => openModal(String(order.id))}
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
      )}

      <Modal
        title="Confirmar Cancelación"
        message="¿Estás seguro de que deseas cancelar esta orden?"
        isOpen={isModalOpen}
        onConfirm={confirmCancel}
        onCancel={closeModal}
      />
    </div>
  );
}

export default Orders;
