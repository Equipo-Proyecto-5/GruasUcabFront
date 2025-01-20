import { useParams } from 'react-router-dom';
import { useNotifications} from './Hooks/useNotification';  
import Modal from '@/components/Modal';
import { useState } from 'react';

function FormNotifications() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const {
    formData,
    error,
    loading,
    handleChange,
    handleSubmit,
  } = useNotifications(id);

// Función para cerrar la modal
const closeModal = () => {
  setIsModalOpen(false);
};

// Función para confirmar la edición
const confirmEdit = () => {
  closeModal(); // Cierra la modal
  handleSubmit(); // Llama a la función de envío sin pasar un evento
};

// Maneja el envío del formulario con la validación de eventos
const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // Evita el comportamiento por defecto del formulario
  if (isEditMode) {
    setIsModalOpen(true); // Muestra la modal de confirmación si es modo edición
  } else {
    handleSubmit(e); // Llama directamente a la función de envío si es creación
  }
};

//Se reemplaza el contenido por los campos de los operadores que se van a registrar
//Se quitan los {/* */} para que se pueda visualizar el contenido

    return (
    <div className="w-full max-w-3xl mx-auto md:p-4 p-0 mt-8">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {isEditMode ? 'Editar Notificacion' : 'Crear Notificacion'}
        </h1>

        <form  // Muestra la modal de confirmación antes de enviar el formulario.
        onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="titulo" className="block text-gray-700 dark:text-white mb-1">Titulo</label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  placeholder="RRHH"
                  required
                />
              </div>
              <div>
                <label htmlFor="mensaje" className="block text-gray-700 dark:text-white mb-1">Mensaje</label>
                <input
                  type="text"
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  placeholder="Felix inicio de Semana."
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                <label htmlFor="destinarios" className="block text-gray-700 dark:text-white mb-1">
                        Destinatarios
                </label>
                    <select
                    id="destinatarios"
                    name="destinatarios"
                    value={formData.destinatarios}
                    onChange={handleChange}
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                    required
                    >
                    <option value="" disabled>
                        Selecciona un tipo
                    </option>
                        <option value="Interno">Interno</option>
                        <option value="Externo">Externo</option>
                        <option value="Ambos">Ambos</option>

                    </select>        
                </div>
                <div>
                <label htmlFor="tipoEnvio" className="block text-gray-700 dark:text-white mb-1">
                        Tipo de Envio
                </label>
                    <select
                    id="tipoEnvio"
                    name="tipoEnvio"
                    value={formData.tipoEnvio}
                    onChange={handleChange}
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                    required
                    >
                    <option value="" disabled>
                        Selecciona un tipo
                    </option>
                        <option value="Recurrente">Recurrente</option>
                        <option value="Extemporaneo">Extemporaneo</option>
                    </select>        
                </div>
                <div>
                <label htmlFor="frecuencia" className="block text-gray-700 dark:text-white mb-1">
                        Frecuencia de Envio
                </label>
                    <select
                    id="frecuencia"
                    name="frecuencia"
                    value={formData.frecuencia ?? ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                    required={formData.tipoEnvio === "Recurrente"}
                    disabled={formData.tipoEnvio !== "Recurrente"} 
                    >
                    <option value="" disabled>
                        Selecciona un tipo
                    </option>
                        <option value="Diaria">Diario</option>
                        <option value="Semanal">Semanal</option>
                        <option value="Mensual">Mensual</option>

                    </select>        
                </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="fechaHoraEnvio" className="block text-gray-700 dark:text-white mb-1">Fecha y hora</label>
                <input
                  type="datetime-local"
                  id="fechaHoraEnvio"
                  name="fechaHoraEnvio"
                  value={formData.tipoEnvio === "Extemporaneo" ? formData.fechaHoraEnvio || "" : ""}
                  
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  placeholder="RRHH"
                  required={formData.tipoEnvio === "Extemporaneo"}
                  disabled={formData.tipoEnvio !== "Extemporaneo"}
                />
              </div>
              <div>
                <label htmlFor="horaEnvio" className="block text-gray-700 dark:text-white mb-1">Hora de Envio</label>
                <input
                  type="time"
                  id="horaEnvio"
                  name="horaEnvio"
                  min="00:00" 
                  max="23:59"
                  value={formData.horaEnvio ?? "00:00"}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  placeholder="RRHH"
                  required={formData.tipoEnvio === "Recurrente"}
                  disabled={formData.tipoEnvio !== "Recurrente"}
                />
              </div>
              <div>
                <label htmlFor="diaSemana" className="block text-gray-700 dark:text-white mb-1">
                        Dia de la Semana
                </label>
                    <select
                    id="diaSemana"
                    name="diaSemana"
                    value={formData.frecuencia === "Semanal"  && formData.tipoEnvio==="Recurrente"? formData.diaSemana || "" : ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                    required={formData.frecuencia === "Semanal"}
                    disabled={formData.tipoEnvio !== "Recurrente"||formData.frecuencia !== "Semanal" } 
                    >
                    <option value="" disabled>
                        Selecciona el Dia
                    </option>
                    <option value="Monday">Lunes</option>
                    <option value="Tuesday">Martes</option>
                    <option value="Wednesday">Miércoles</option>
                    <option value="Thursday">Jueves</option>
                    <option value="Friday">Viernes</option>
                    <option value="Saturday">Sábado</option>
                    <option value="Sunday">Domingo</option>
                    </select>        
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="diaDelMes" className="block text-gray-700 dark:text-white mb-1">Dia de envio</label>
                <input
                  type="number"
                  min="0" 
                  max="31"
                  id="diaDelMes"
                  name="diaDelMes"
                  value={formData.frecuencia === "Mensual"  && formData.tipoEnvio==="Recurrente"? formData.diaDelMes || "" : 0}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  disabled={formData.tipoEnvio !== "Recurrente"||formData.frecuencia !== "Mensual" } 
                  required={formData.frecuencia === "Mensual" && formData.ultimoDia==false}

                />
              </div>
              </div>
              <div>
                <label htmlFor="ultimoDia" className="block text-gray-700 dark:text-white mb-1">Envio el ultimo dia del mes</label>
                <input
                  type="checkbox"
                  id="ultimoDia"
                  name="ultimoDia"
                  checked={formData.frecuencia === "Mensual"  && formData.tipoEnvio==="Recurrente" && formData.diaDelMes==0? formData.ultimoDia : false}
                  onChange={handleChange}
                  className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500"
                  disabled={formData.tipoEnvio !== "Recurrente"||formData.frecuencia !== "Mensual" } 
                  required={formData.frecuencia === "Mensual" &&  formData.diaDelMes==0}

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
                {loading ? (isEditMode ? 'Actualizando...' : 'Registrando...') : (isEditMode ? 'Actualizar Notificaion' : 'Registrar Notificacion')}
              </button>
            </div>
          </div>
        </form>
      </div>
      <Modal
        title="Confirmar Modificacion"
        message="¿Estás seguro de que deseas Modificar esta Notificacion?"
        isOpen={isModalOpen}
        onConfirm={confirmEdit}
        onCancel={closeModal}
      />
    </div>
    );
}

export default FormNotifications;