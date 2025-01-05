import { useParams } from 'react-router-dom';
import { useDriver } from '../Drivers/Hooks/useDriver';
import Modal from '@/components/Modal';
import { useEffect, useState } from 'react';
import { useCranes } from '../Cranes/Hooks/useCranes';
import { ICranes } from '@/models/Cranes';


function FormDriver() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cranes, handleSubmit} = useCranes();
    const [selectedProvider,setSelectedProvider] = useState("");
    const [filteredCranes, setFilteredCranes] = useState<ICranes[]>([]);


  const {
    formDataDriver,
    error,
    loading,
    handleChangeDriver,
    handleSubmitDriver,
    handleDocumentoChange,
  } = useDriver(id);

  

  // Función para cerrar la modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Función para confirmar la edición
  const confirmEdit = () => {
    closeModal();
    handleSubmit();
  };

  // Maneja el envío del formulario con la validación de eventos
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Setear el valor de selectedProvider a idEmpresaProveedor
    if (selectedProvider) {
      formDataDriver.idEmpresaProveedor = selectedProvider;
      console.log("selectedProvider asignado a idEmpresaProveedor:", formDataDriver.idEmpresaProveedor);
    }
  
    console.log("Valor enviado:", selectedProvider); 
    if (isEditMode) {
      setIsModalOpen(true);
    } else {
      handleSubmitDriver(e); // Llamar a la función de envío
    }
  };
  

  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string | null) => {
    setActiveSection(activeSection === section ? null : section);
  };

     // useEffect para cargar las grúas filtradas según el proveedor seleccionado
  useEffect(() => {
    if (selectedProvider) {
      // Filtrar las grúas según el proveedor seleccionado
      const filtered = cranes.filter(
        (crane) => crane.proveedorId === selectedProvider
      );
      setFilteredCranes(filtered);
    } else {
      // Si no hay proveedor seleccionado, mostrar todas las grúas
      setFilteredCranes(cranes);
    }
  }, [selectedProvider, cranes]);



  return (
    <div className="w-full max-w-3xl mx-auto md:p-4 p-0 mt-8">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {isEditMode ? 'Editar Conductor' : 'Crear Conductor'}
        </h1>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-6">
            {/* Campos básicos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="primerNombre" className="block text-gray-700 dark:text-white mb-1">Nombre</label>
                <input
                  type="text"
                  id="primerNombre"
                  name="primerNombre"
                  value={formDataDriver.primerNombre}
                  onChange={(e) => handleChangeDriver(e)}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="primerApellido" className="block text-gray-700 dark:text-white mb-1">Apellido</label>
                <input
                  type="text"
                  id="primerApellido"
                  name="primerApellido"
                  value={formDataDriver.primerApellido || ''}
                  onChange={(e) => handleChangeDriver(e)}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                />
              </div>
              <div>
                <label htmlFor="tipoDocumentoIdentidad" className="block text-gray-700 dark:text-white mb-1">Tipo de Documento</label>
                <input
                  type="text"
                  id="tipoDocumentoIdentidad"
                  name="tipoDocumentoIdentidad"
                  value={formDataDriver.tipoDocumentoIdentidad || ''}
                  onChange={handleChangeDriver}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                />
              </div>

              <div>
                <label htmlFor="numeroDocumentoIdentidad" className="block text-gray-700 dark:text-white mb-1">Cedula</label>
                <input
                  type="text"
                  id="numeroDocumentoIdentidad"
                  name="numeroDocumentoIdentidad"
                  value={formDataDriver.numeroDocumentoIdentidad || ''}
                  onChange={handleChangeDriver}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                />
              </div>

              <div>
                <label htmlFor="fechaNacimiento" className="block text-gray-700 dark:text-white mb-1">Fecha de Nacimiento</label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={formDataDriver.fechaNacimiento}
                  onChange={handleChangeDriver}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="numeroTelefono" className="block text-gray-700 dark:text-white mb-1">Teléfono</label>
                <input
                  type="tel"
                  id="numeroTelefono"
                  name="numeroTelefono"
                  value={formDataDriver.numeroTelefono}
                  onChange={handleChangeDriver}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  required
                />
              </div>

            </div>

            {/* Otros campos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
             
              <div>
                <label htmlFor="direccion" className="block text-gray-700 dark:text-white mb-1">Direccion</label>
                <input
                  type="tel"
                  id="direccion"
                  name="direccion"
                  value={formDataDriver.direccion}
                  onChange={handleChangeDriver}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="correo" className="block text-gray-700 dark:text-white mb-1">Correo Electronico</label>
                <input
                  type="tel"
                  id="correo"
                  name="correo"
                  value={formDataDriver.correo}
                  onChange={handleChangeDriver}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="contrasena" className="block text-gray-700 dark:text-white mb-1">Contraseña</label>
                <input
                  type="tel"
                  id="contrasena"
                  name="contrasena"
                  value={formDataDriver.contrasena}
                  onChange={handleChangeDriver}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  required
                />
              </div>
            </div>
           



            {/*Inputs select para asignar proveedor y grua */}
                          <div className="mb-6">
                          {/* Selección de proveedor */}
                          <div className="mt-6">
                            <label htmlFor="idEmpresaProveedor" className="block text-gray-700 dark:text-white mb-3">
                              Asignar Conductor a una empresa Proveedora
                            </label>
                            <select
                              id="idEmpresaProveedor"
                              name="idEmpresaProveedor"
                              value={selectedProvider} // Usar el estado selectedProvider
                              onChange={(e) => setSelectedProvider(e.target.value)} // Actualizar el estado al seleccionar un proveedor
                              className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                              required
                            >
                              <option value="" disabled>
                                Seleccione la empresa a asignar
                              </option>
                              {cranes
                                .map((crane) => ({ id: crane.proveedorId, name: crane.denominacionComercial }))
                                .filter((value, index, self) => self.findIndex((v) => v.id === value.id) === index) // Filtrar proveedores únicos
                                .map((provider) => (
                                  <option key={provider.id} value={provider.id}>
                                    {provider.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        
                        
              
                          {/* Selección de grúa */}
                          <div className="mt-6">
                            <label htmlFor="idGruaAsociada" className="block text-gray-700 dark:text-white mb-3">
                              Asignar Conductor a una Grua
                            </label>
                            <select
                              id="idGruaAsociada"
                              name="idGruaAsociada"
                              value={formDataDriver.idGruaAsociada || ""}
                              onChange={handleChangeDriver}
                              className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                              required
                            >
                              <option value="" disabled>
                                Seleccione la grúa a asignar
                              </option>
                              {filteredCranes.map((crane, index) => (
                                <option key={index} value={crane.id}>
                                  {crane.placa}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
              

                <div>
                <label htmlFor="gradoLicencia" className="block text-gray-700 dark:text-white mb-1">Grado Licencia</label>
                <input
                  type="tel"
                  id="gradoLicencia"
                  name="gradoLicencia"
                  value={formDataDriver.gradoLicencia}
                  onChange={handleChangeDriver}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  required
                />
              </div>
              

            {/* Documentos de tránsito */}
            <div className="mt-6">
            <button
              type="button"
              className={`w-full bg-blue-500 text-white px-4 py-2 mb-2 rounded-lg hover:bg-blue-700 ${
                activeSection === 'rcv' ? 'bg-blue-700' : ''
              }`}
              onClick={() => toggleSection('rcv')}
            >
              {activeSection === 'rcv' ? 'Ocultar Documentos de Tránsito' : 'Registrar Documentos de Tránsito'}
            </button>

            {activeSection === 'rcv' && (
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Tipos de Documentos a Solicitar:</h2>
              <h3 className="text-md text-gray-600 dark:text-white mb-4">RCV, Certificado Medico, Licencia</h3>

              {/* Iteramos sobre los documentos de tránsito */}
              {formDataDriver.documentosTransito.map((documento, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 dark:text-white mb-1">Tipo de Documento {index + 1}</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border py-2 px-3 dark:bg-gray-600 dark:text-white dark:border-none"
                      placeholder="RCV, Certificado Medico, Licencia"
                      value={documento.tipoDocumento} // Asegúrate de que se esté asignando correctamente el valor
                      onChange={(e) => handleDocumentoChange(e, index, 'tipoDocumento')} // Llamamos la función pasando el índice y el campo
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 dark:text-white mb-1">Número de Documento {index + 1}</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border py-2 px-3 dark:bg-gray-600 dark:text-white dark:border-none"
                      placeholder="Ejemplo: 123456"
                      value={documento.numeroDocumento} // Asignamos el valor correctamente
                      onChange={(e) => handleDocumentoChange(e, index, 'numeroDocumento')} // Llamamos la función pasando el índice y el campo
                      required
                    />
                  </div>
                </div>
              ))}

              {/* Aquí agregamos el resto de campos para Fecha Emisión, Fecha Vencimiento y URL Imagen */}
              {formDataDriver.documentosTransito.map((documento, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <label className="block text-gray-600 dark:text-white mb-1">Fecha Emisión {index + 1}</label>
                    <input
                      type="date"
                      className="w-full rounded-lg border py-2 px-3 dark:bg-gray-600 dark:text-white dark:border-none"
                      value={documento.fechaEmision} // Asignamos el valor correctamente
                      onChange={(e) => handleDocumentoChange(e, index, 'fechaEmision')} // Llamamos la función pasando el índice y el campo
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 dark:text-white mb-1">Fecha Vencimiento {index + 1}</label>
                    <input
                      type="date"
                      className="w-full rounded-lg border py-2 px-3 dark:bg-gray-600 dark:text-white dark:border-none"
                      value={documento.fechaVencimiento} // Asignamos el valor correctamente
                      onChange={(e) => handleDocumentoChange(e, index, 'fechaVencimiento')} // Llamamos la función pasando el índice y el campo
                      required
                    />
                  </div>
                </div>
              ))}

              {/* URL de la imagen del documento */}
              {formDataDriver.documentosTransito.map((documento, index) => (
                <div key={index} className="mt-6">
                  <label className="block text-gray-600 dark:text-white mb-1">URL de la Imagen del Documento {index + 1}</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-600 dark:text-white dark:border-none"
                    placeholder="Ejemplo: http://imagen.com"
                    value={documento.urlImagen} // Asignamos el valor correctamente
                    onChange={(e) => handleDocumentoChange(e, index, 'urlImagen')} // Llamamos la función pasando el índice y el campo
                    required
                  />
                </div>
              ))}
            </div>
          )}

          
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
                {loading ? (isEditMode ? 'Actualizando...' : 'Registrando...') : (isEditMode ? 'Actualizar Conductor' : 'Registrar Conductor')}
              </button>
            </div>
          </div>
        </form>
      </div>

      <Modal
        title="Confirmar Modificación"
        message="¿Estás seguro de que deseas modificar este proveedor?"
        isOpen={isModalOpen}
        onConfirm={confirmEdit}
        onCancel={closeModal}
      />
    </div>
  );
}

export default FormDriver;
