import React, { useState } from "react";
import { FaPlus, FaTrash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useOrders } from "./Hooks/useOrder"; // Asegúrate de que la ruta sea correcta
import { StatusOrder } from "./components/StatusOrder";
import Modal from '@/components/Modal'; // Asegúrate de que el modal esté bien importado
import { IOrder } from "@/models/Order";
import DetailOrder from "./DetailOrder";
import { getBasePath, getUserRole } from "../../../../routes/routesConfig";

function Orders() {
  const { orders, loading, error, updateOrder, selectedOrder, setSelectedOrder, handleAssignOrder } = useOrders(); // Usamos la función updateOrder de tu hook
  const [expandedRow, setExpandedRow] = useState<string | null>(null); // Estado para controlar la fila expandida
  const [isModalOpen, setIsModalOpen] = useState(false); // Control del estado del modal
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null); // Control del id de la orden seleccionada

  const toggleRowExpansion = (orderId: string) => {
    // Si la fila ya está expandida, la colapsamos, de lo contrario la expandimos
    if (expandedRow === orderId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(orderId);
    }
  };

  const openModal = (orderId: string) => {
    setSelectedOrderId(orderId); // Establece el id de la orden seleccionada
    setIsModalOpen(true); // Abre el modal
  };

  const openModalView = (order: IOrder) => {
    setSelectedOrder(order); // Establece el id de la orden seleccionada
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

  // const role = getUserRole();
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
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">Cobertura Póliza</th>
              <th scope="col" className="px-6 py-3 text-center">Nombre del Asegurado</th>
              <th scope="col" className="px-6 py-3 text-center">Nombre del Denunciante</th>
              <th scope="col" className="px-6 py-3 text-center">Emitida por</th>
              <th scope="col" className="px-6 py-3 text-center">Fecha de Emisión</th>
              <th scope="col" className="px-6 py-3 text-center">Estatus</th>
              <th scope="col" className="px-6 py-3 text-primary">
                <span className="sr-only text-primary">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                {/* Fila principal */}
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                  onClick={() => toggleRowExpansion(String(order.id))} // Al hacer clic expandimos o contraemos la fila
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                  >
                   {order.coberturaBasePoliza ? `${order.coberturaBasePoliza} $` : "Sin Tipo"}
                  </th>
                  <td className="px-6 py-4 text-center">{order.nombreAsegurado}</td>
                  <td className="px-6 py-4 text-center">{order.nombreDenunciante}</td>
                  <td className="px-6 py-4 text-center">{order.Administratorid || "Desconocido"}</td>
                  <td className="px-6 py-4 text-center">{new Date(order.fecha).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-center">{order.estatus}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-4">
                    <button
                        onClick= { async() =>{ 
                          await handleAssignOrder(String(order.id));
                          //Luego ver si funciona con el reload
                         // window.location.reload();
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

                      <button
                        onClick={() => openModalView(order)}
                        className="text-blue-600"
                      >
                        <FaEye className="text-s" />
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Fila adicional cuando está expandida */}
                {expandedRow === order.id && (
                  <tr className="bg-gray-100">
                    <td colSpan={7} className="text-left py-2 pl-6">
                      {/* Aquí se muestra el componente StatusOrder */}
                      <StatusOrder 
                        orderId={String(order.id)}
                        currentStatus={order.estatus || "Desconocido"}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal de confirmación de cancelación */}
      <Modal
        title="Confirmar Cancelación"
        message="¿Estás seguro de que deseas cancelar esta orden?"
        isOpen={isModalOpen}
        onConfirm={confirmCancel}
        onCancel={closeModal}
      />

      { selectedOrder && (
        <DetailOrder
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      <></>
    </div>
  );
}

export default Orders;
