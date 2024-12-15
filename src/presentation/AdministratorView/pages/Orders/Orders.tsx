import { FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function Orders() {
  return (
   
<div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-5xl mx-auto mt-10">
<div className="flex justify-between items-center p-4">
    <div className="text-xl font-bold">Gestión de Ordenes</div>
    <Link to="/admin/formordersstep" className="flex items-center space-x-2 text-primary font-bold mt-10 hover:scale-90 transition-transform duration-200">
    <button className="flex items-center space-x-2 text-primary font-bold mt-10 hover:scale-90 transition-transform duration-200">
      <span>Crear Orden</span>
      <FaPlus className="text-xl" />
    </button>
    </Link>

  </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Tipo de Poliza
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Nombre del Asegurado
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Emitida por:
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Fecha de Emisión
                </th>
                
                <th scope="col" className="px-6 py-3 text-primary">
                    <span className="sr-only text-primary">Edit</span>
                </th>
               
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Póliza para vehículos grandes
                </th>
                <td className="px-6 py-4 text-center">
                Alejandra Perez
                </td>
               
                <td className="px-6 py-4 text-center">
                    Operador. Nelson Seguera
                </td>
                <td className="px-6 py-4 text-center">
                    20/10/2021
                </td>

                <td className="px-6 py-4 text-right">
  <div className="flex items-center justify-end space-x-4">
    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
    <a href="#" className="text-red-500">
      <FaTrash className="text-s" />
    </a>
  </div>
</td>

            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Póliza de emergencia
                </th>
                <td className="px-6 py-4 text-center">
                Victor Linares
                </td>
               
                <td className="px-6 py-4 text-center">
                    Admin. Jose Camacho
                </td>

                <td className="px-6 py-4 text-center">
                    24/10/2021
                </td>

                <td className="px-6 py-4 text-right">          
  <div className="flex items-center justify-end space-x-4">
    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
    <a href="#" className="text-red-500">
      <FaTrash className="text-s" />
    </a>
  </div>
</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                Póliza estándar
                </th>
                <td className="px-6 py-4 text-center">
                Claudia Diaz
                </td>
               
                <td className="px-6 py-4 text-center">
                   Operador. Gerardo Andrade
                </td>

                <td className="px-6 py-4 text-center">
                  18/10/2021
                </td>
                
                <td className="px-6 py-4 text-right">          
  <div className="flex items-center justify-end space-x-4">
    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
    <a href="#" className="text-red-500">
      <FaTrash className="text-s" />
    </a>
  </div>
</td>
            </tr>
        </tbody>
    </table>
</div>




  );
}
export default Orders;
