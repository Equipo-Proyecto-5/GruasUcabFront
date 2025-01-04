import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StatusOrder } from "./components/StatusOrder";
import { useOrders } from "./Hooks/useOrder"; 
import { IOrder } from "@/models/Order";
import DetailOrder from "./DetailOrder";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

function ActionOrder() {
  const { id } = useParams<{ id: string }>();
  const { orders } = useOrders();
  const [order, setOrder] = useState<IOrder | null>(null); 
  const [isDetailVisible, setIsDetailVisible] = useState(false);

    const toggleDetails = () => {
        setIsDetailVisible(prevState => !prevState); // Cambiar el estado
    };


  // Buscar la orden según el id
  useEffect(() => {
    if (id) {
      const selectedOrder = orders.find(order => order.id === id);
      setOrder(selectedOrder || null);
    }
  }, [id, orders]);

  if (!order) {
    return <div>Cargando datos de la orden...</div>; 
  }

  return (
    <div>
      
      <h1 className="text-3xl font-bold text-gray-800 dark:text-black mb-6">
        Detalles de la Orden {order.numeroFactura}
      </h1>

      
      <StatusOrder 
         orderId={String(order.id)}
         currentStatus={order.estatus || "Desconocido"} 
      />

       
       <div className="flex  mb-6 mr-10">
                <button 
                    onClick={toggleDetails} 
                    className="flex  px-10 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-500 focus:outline-none ml-9"
                >
                    {isDetailVisible ? (
                        <FaMinus className="w-5 h-5 mr-2" /> 
                    ) : (
                        <FaPlus className="w-5 h-5 mr-2" /> 
                    )}
                    {isDetailVisible ? "Ocultar información de Orden" : "Mostrar información de Orden"}
                </button>
            </div>

            
            {isDetailVisible && <DetailOrder order={order} />}
    </div>
  );
}

export default ActionOrder;
