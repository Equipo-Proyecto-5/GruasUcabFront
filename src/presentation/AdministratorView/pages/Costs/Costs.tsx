import { useCosts } from './Hooks/useCosts';

interface CostsProps {
  orderId: string; 
}

function Costs({ orderId }: CostsProps) {
  const { costs, loading, error, updateCost  } = useCosts(orderId); 
 
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center p-4">
        <div className="text-xl font-bold">Costos Adicionales</div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-bg-white uppercase bg-slate-900 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">Nombre Costo</th>
            <th scope="col" className="px-6 py-3 text-center">Costo</th>
            <th scope="col" className="px-6 py-3 text-center">Descripción</th>
            <th scope="col" className="px-6 py-3 text-center">Status</th>
            <th scope="col" className="px-6 py-3 text-primary"><span className="sr-only text-primary">Edit</span></th>
          </tr>
        </thead>
        <tbody>
          {loading && <tr><td colSpan={5}>Cargando costos...</td></tr>}
          {error && <tr><td colSpan={5}>Error: {error}</td></tr>}
          {!loading && !error && costs.map(cost => (
            <tr key={cost.id} className="bg-white border-b-2 dark:bg-gray-200 dark:border-b-slate-700 text-gray-700">
              <td className="px-6 py-4 text-center">{cost.nombre}</td>
              <td className="px-6 py-4 text-center">{cost.monto} $</td>
              <td className="whitespace-normal break-words leading-relaxed w-[250px] text-center">{cost.descripcion}</td>
              <td className="px-6 py-4 text-center">{cost.estatus}</td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-end items-center space-x-4">
                  <button 
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    onClick={() => updateCost(cost.id, "Aprobado")}>
                    Aprobar
                  </button>
                  <button 
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    onClick={() => updateCost(cost.id,  "Rechazado" )}>
                    Desaprobar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Costs;
