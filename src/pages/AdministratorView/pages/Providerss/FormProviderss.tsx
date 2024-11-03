import useCreateProvider from "./Hooks/useCreateProvider";

function FormProviderss() {
    const {
        formData,
        error,
        loading,
        handleChange,
        handleSubmit,
    } = useCreateProvider();

    return (
        <div className="w-full max-w-3xl mx-auto p-4 mt-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Crear Proveedor</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="denominacionComercial" className="block text-gray-700 dark:text-white mb-1">Denominación Comercial</label>
                                <input
                                    type="text"
                                    id="denominacionComercial"
                                    name="denominacionComercial"
                                    value={formData.denominacionComercial}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                                    placeholder="Tu pana el gruero"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="razonSocial" className="block text-gray-700 dark:text-white mb-1">Razon Social</label>
                                <input
                                    type="text"
                                    id="razonSocial"
                                    name="razonSocial"
                                    value={formData.razonSocial}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                                    placeholder="Gruas Ccs C.A"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="direccionFisica" className="block text-gray-700 dark:text-white mb-1">Dirección Fiscal</label>
                            <input
                                type="text"
                                id="direccionFisica"
                                name="direccionFisica"
                                value={formData.direccionFisica}
                                onChange={handleChange}
                                className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                                placeholder="Av. Las Acasias Maracay"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label htmlFor="tipoDocumentoIdentidad" className="block text-gray-700 dark:text-white mb-1">Tipo de Documento</label>
                                <input
                                    type="text"
                                    id="tipoDocumentoIdentidad"
                                    name="tipoDocumentoIdentidad"
                                    value={formData.tipoDocumentoIdentidad}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border py-2 px-2 dark:bg-gray-700 dark:text-white dark:border-none"
                                    placeholder="J/E/V"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="numeroDocumentoIdentidad" className="block text-gray-700 dark:text-white mb-1">RIF</label>
                                <input
                                    type="text"
                                    id="numeroDocumentoIdentidad"
                                    name="numeroDocumentoIdentidad"
                                    value={formData.numeroDocumentoIdentidad}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                                    placeholder="J-31019-7"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="estatus" className="block text-gray-700 dark:text-white mb-1">Estatus</label>
                            <input
                                type="text"
                                id="estatus"
                                name="estatus"
                                value={formData.estatus}
                                onChange={handleChange}
                                className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                                placeholder="Activo/Inactivo"
                                required
                            />
                        </div>

                        {error && (
                            <div className="mt-4 text-red-600">
                                {error}
                            </div>
                        )}

                        <div className="mt-8 flex justify-end">
                            <button
                                type="submit"
                                className="bg-teal-500 text-white px-4 py-2 md:px-8 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900"
                                disabled={loading}
                            >
                                {loading ? 'Registrando...' : 'Registrar Proveedor'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormProviderss;
