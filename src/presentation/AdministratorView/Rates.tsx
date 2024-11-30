import { FaPlus } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

function Rates(){
    return(

   

<div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-5xl mx-auto mt-10">
<div className="flex justify-between items-center p-4">
    <div className="text-xl font-bold">Gestión de Tarifas</div>
    <button className="flex items-center space-x-2 text-primary font-bold mt-10 hover:scale-90 transition-transform duration-200">
      <span>Crear Tarifa</span>
      <FaPlus className="text-xl" />
    </button>
  </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Tipo de Poliza
                </th>
                <th scope="col" className="px-6 py-3">
                    Descripción
                </th>
                <th scope="col" className="px-6 py-3">
                    Tarifa
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
                <td className="px-6 py-4">
                Cobertura para camiones y autobuses
                </td>
               
                <td className="px-6 py-4">
                    350$
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
                <td className="px-6 py-4">
                Cobertura de emergencia
                </td>
               
                <td className="px-6 py-4">
                    200$
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
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Póliza estándar
                </th>
                <td className="px-6 py-4">
                Cobertura básica
                </td>
               
                <td className="px-6 py-4">
                    99$
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
};

export default Rates;