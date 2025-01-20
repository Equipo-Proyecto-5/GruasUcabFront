import { IOrder } from "@/models/Order";

interface IProps {
    order: IOrder;
}

function DetailOrder({ order }: IProps) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
            <div className="mb-4">
                <legend className="uppercase tracking-wide text-sm text-white bg-gray-700 px-2 py-1 rounded">
                    Datos de la Póliza
                </legend>
                <hr className="my-2 border-t border-gray-300" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
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
                <legend className="uppercase tracking-wide text-sm text-white bg-gray-700 px-2 py-1 rounded">
                    Datos del Vehículo Asegurado
                </legend>
                <hr className="my-2 border-t border-gray-300" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
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
                <legend className="uppercase tracking-wide text-sm text-white bg-gray-700 px-2 py-1 rounded">
                    Datos del Incidente
                </legend>
                <hr className="my-2 border-t border-gray-300" />
            </div>

            <div className="text-sm font-semibold mb-4 text-black">
                <h2 className="text-md font-bold text-gray-800 dark:text-white">{order.detallesIncidente}</h2>
            </div>

            <div className="mb-4">
                <legend className="uppercase tracking-wide text-sm text-white bg-gray-700 px-2 py-1 rounded">
                    Datos de Costos
                </legend>
                <hr className="my-2 border-t border-gray-300" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
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
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">{order.costoServiciosAdicionales}</h2>
                </div>
            </div>
        </div>
    );
}

export default DetailOrder;
