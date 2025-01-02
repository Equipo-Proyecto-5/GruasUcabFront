import { IOrder } from "@/models/Order"

interface IProps {
    order: IOrder;
    onClose: () => void;
}


function DetailOrder({ order, onClose }: IProps) {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
      <div className="mb-4">
                    <legend className="uppercase tracking-wide text-sm text-white bg-gray-700 px-2 py-1 rounded">Datos de la Póliza</legend>
                        <hr className="my-2 border-t border-gray-300" />
                </div>

        <div className="text-center grid grid-cols-1 md:grid-cols-4 gap-4">

            <div className="text-sm font-semibold mb-4 text-black">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Fecha Inicio</h3>   
                    <h2 className="text-md font-bold text-gray-800 dark:text-white">{order.polizaFechaInicio}</h2>
                </div>

            <div className="text-sm font-semibold mb-4 text-black">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Fecha Fin</h3>   
                    <h2 className="text-md font-bold text-gray-800 dark:text-white">{order.polizaFechaFin}</h2>
                </div>    
        

        

        <div className="text-sm font-semibold mb-4 text-black">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Cobertura Poliza</h3>   
                <h2 className="text-md font-bold text-gray-800 dark:text-white">{order.coberturaBasePoliza}</h2>
            </div>

        <div className="text-sm font-semibold mb-4 text-black">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Distancia a Cubrir</h3>   
                <h2 className="text-md font-bold text-gray-800 dark:text-white">{order.distanciaCoberturaPoliza}</h2>
            </div>    
            </div>

        <div className="mb-4">
                    <legend className="uppercase tracking-wide text-sm text-white bg-gray-700 px-2 py-1 rounded">Datos del Vehiculo Asegurado</legend>
                        <hr className="my-2 border-t border-gray-300" />
                </div>

                <div className="text-center grid grid-cols-1 md:grid-cols-4 gap-4">

                    <div className="text-sm font-semibold mb-4 text-black">
                            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Placa</h3>   
                            <h2 className="text-md font-bold text-gray-800 dark:text-white">{order.placaVehiculo}</h2>
                        </div>

                    <div className="text-sm font-semibold mb-4 text-black">
                            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Marca</h3>   
                            <h2 className="text-md font-bold text-gray-800 dark:text-white">{order.marca}</h2>
                        </div>    

                    <div className="text-sm font-semibold mb-4 text-black">
                            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Modelo</h3>   
                            <h2 className="text-md font-bold text-gray-800 dark:text-white">{order.modelo}</h2>
                        </div>

                    <div className="text-sm font-semibold mb-4 text-black">
                            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Año</h3>   
                            <h2 className="text-md font-bold text-gray-800 dark:text-white">{order.anio}</h2>
                        </div>

                        </div>

                         <div className="mb-4">
                    <legend className="uppercase tracking-wide text-sm text-white bg-gray-700 px-2 py-1 rounded">Datos del Incidente</legend>
                        <hr className="my-2 border-t border-gray-300" />
                </div>        
                <div className="text-sm font-semibold mb-4 text-black">  
                            <h2 className="text-md font-bold text-gray-800 dark:text-white">{order.detallesIncidente}</h2>
                        </div>

                        <div className="mb-4">
                    <legend className="uppercase tracking-wide text-sm text-white bg-gray-700 px-2 py-1 rounded">Datos de Costos</legend>
                        <hr className="my-2 border-t border-gray-300" />
                </div>

                <div className="text-center grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div className="text-sm font-semibold mb-4 text-black">
                            <h3 className="text-md font-medium text-gray-600 dark:text-gray-300">Costo Total</h3>   
                            <h2 className="text-lg font-bold text-gray-800 dark:text-white">{order.costoTotal}</h2>
                        </div>

                    <div className="text-sm font-semibold mb-4 text-black">
                            <h3 className="text-md font-medium text-gray-600 dark:text-gray-300">Costo x Km Extra</h3>   
                            <h2 className="text-lg font-bold text-gray-800 dark:text-white">{order.costoTotalKmExtra}</h2>
                        </div>    

                    <div className="text-sm font-semibold mb-4 text-black">
                            <h3 className="text-md font-medium text-gray-600 dark:text-gray-300">Costo Total Servicios Adicionales</h3>   
                            <h2 className="text-lg font-bold text-gray-800 dark:text-white">{order.costosServiciosAdicionales}</h2>
                        </div>

                        </div>                


        
      
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
    )
    }
    export default DetailOrder;