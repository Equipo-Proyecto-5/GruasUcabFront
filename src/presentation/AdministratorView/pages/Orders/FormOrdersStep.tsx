import { useState } from "react";
import { useForm } from "react-hook-form";
import MapWithAutocomplete from "./components/MapWithAutocomplete";


// Definición de tipos para los inputs de cada paso
interface StepOneInputs {
  policyNumber: string;
}

interface StepTwoInputs {
  policyType: string;
  coverageAmount: string;
  coverageKm: string;
  insuredName: string;
  idCard: string;
  phone: string;
  description: string;
}

interface StepThreeInputs {
  claimAmount: string;
  claimReason: string;
}

type CompleteFormInputs = StepOneInputs & StepTwoInputs & StepThreeInputs;

const FormOrdersStep = () => {
  const [step, setStep] = useState(1);

  // Hook de React Hook Form para manejar el formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompleteFormInputs>();

  // Funciones de envío de los formularios
  const handleStepOneSubmit = (data: StepOneInputs) => {
    console.log("Paso 1: Número de póliza:", data.policyNumber);
    setStep(2); // Avanzar al paso 2
  };

  const handleStepTwoSubmit = (data: StepTwoInputs) => {
    console.log("Paso 2: Datos de la póliza:", data);
    setStep(3); // Avanzar al paso 3
  };

  const handleStepThreeSubmit = (data: StepThreeInputs) => {
    console.log("Paso 3: Razón del reclamo:", data);
    alert("Formulario completado con éxito");
  };

  return (
    <div className="w-full max-w-4xl mx-auto md:p-4 p-0 mt-8">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
        {/* Circulitos de progreso */}
      
        <div className="flex justify-center items-center mb-6">
  {[1, 2, 3].map((num, index) => (
    <div key={num} className="flex items-center">
      {/* Circulito */}
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
          step >= num ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        {num}
      </div>
      
      {/* Texto del paso */}
      <div className="text-sm text-center ml-3 text-white">
        {num === 1 ? "Datos Póliza" : num === 2 ? "Paso 2: Detalles" : "Paso 3: Confirmación"}
      </div>

      {/* Espacio entre pasos */}
      {index < 2 && <div className="mx-6"></div>}
    </div>
  ))}
</div>


        {/* Formulario de múltiples pasos */}
        <form
          onSubmit={
            step === 1
              ? handleSubmit(handleStepOneSubmit)
              : step === 2
              ? handleSubmit(handleStepTwoSubmit)
              : handleSubmit(handleStepThreeSubmit)
          }
          className="space-y-4"
        >
          {step === 1 && (
            <div className="mb-6">
                <div className="mb-4">
                    <legend className="uppercase tracking-wide text-sm text-white bg-gray-700 px-2 py-1 rounded">Datos de la Póliza</legend>
                        <hr className="my-2 border-t border-gray-300" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="policyNumber" className="block text-sm font-medium text-white">
                            Número de Póliza
                        </label>
                        <input
                            id="policyNumber"
                            type="text"
                            {...register("policyNumber", { required: "El número de póliza es obligatorio" })}
                            className="w-full px-3 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.policyNumber && <p className="mt-1 text-sm text-red-600">{errors.policyNumber.message}</p>}
                   </div>

                   <div>
                        <label htmlFor="policyNumber" className="block text-sm font-medium text-white">
                            Tipo de Póliza
                        </label>
                        <input
                            id="policyNumber"
                            type="text"
                            className="w-full px-3 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                   </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="policyNumber" className="block text-sm font-medium text-white mt-2">
                           Cobertura $
                        </label>
                        <input
                            id="policyNumber"
                            type="text"
                            className="w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                   </div>

                   <div>
                        <label htmlFor="policyNumber" className="block text-sm font-medium text-white mt-2">
                            Cobertura KM
                        </label>
                        <input
                            id="policyNumber"
                            type="text"
                            className="w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                   </div>
                   
                </div>
                <div className="mb-4 mt-4">
                    <legend className="uppercase tracking-wide text-sm text-white bg-gray-700 px-2 py-1 rounded">Datos del Asegurado</legend>
                        <hr className="my-2 border-t border-gray-300" />
                </div>

                <div>
                <label className="block text-sm font-medium text-white">Nombre del Asegurado</label>
                <input
                  id="insuredName"
                  type="text"
                  className="w-full px-3 py-2 mt-2 text-sm border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                        <label htmlFor="policyNumber" className="block text-sm font-medium text-white">
                           Cedula
                        </label>
                        <input
                            id="policyNumber"
                            type="text"
                            className="w-full px-3 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                       
                   </div>

                   <div>
                        <label htmlFor="policyNumber" className="block text-sm font-medium text-white">
                            Telefono
                        </label>
                        <input
                            id="policyNumber"
                            type="text"
                           
                            className="w-full px-3 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        
                   </div>

                </div>

                <div className="mt-2">
                <label className="block text-sm font-medium text-white">Email</label>
                <input
                  id="insuredName"
                  type="text"
                //  {...register("insuredName", { required: "Nombre del asegurado es obligatorio" })}
                  className="w-full px-3 py-2 mt-2 text-sm border rounded-lg"
                />
              </div>



            </div>
          )}

          {step === 2 && (
            <>
            <div className="mb-4">
                    <legend className="uppercase tracking-wide text-sm text-white bg-gray-700 px-2 py-1 rounded">Datos de la Persona que Realiza el Reporte</legend>
                        <hr className="my-2 border-t border-gray-300" />
                </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white">Nombre Completo del Denunciante</label>
                  <input
                    id="policyType"
                    type="text"
                    {...register("policyType", { required: "Tipo de póliza es obligatorio" })}
                    className="w-full px-3 py-2 mt-1 text-sm border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white">Cedula</label>
                  <input
                    id="coverageAmount"
                    type="text"
                    {...register("coverageAmount", { required: "Cobertura en $ es obligatoria" })}
                    className="w-full px-3 py-2 mt-1 text-sm border rounded-lg"
                  />
                </div>
              </div>

              <div className="mb-4">
                    <legend className="uppercase tracking-wide text-sm text-white bg-gray-700 px-2 py-1 rounded">Datos del Incidente</legend>
                        <hr className="my-2 border-t border-gray-300" />
                </div>

                <div>
        <label className="block text-sm font-medium text-white" htmlFor="description">
          Descripción
        </label>
        <textarea
          {...register("description", { required: "La descripción es obligatoria" })}
          id="description"
          placeholder="Escribe aquí la descripción"
          className="w-full px-3 py-2 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        {/* Mostrar mensaje de error si la descripción está vacía */}
        <p className="mt-1 text-sm text-red-600">
          {/* Esta línea solo se ejecuta si hay error */}
          {errors.description && errors.description.message}
        </p>
      </div>

            </>
          )}

          {step === 3 && (
            <>
            <div className="mt-6">
      <label className="block text-sm font-medium text-white">Ubicación</label>
      <MapWithAutocomplete />
    </div>
            </>
          )}

          {/* Botones */}
          <div className="flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:outline-none"
              >
                Atrás
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              {step === 1 ? "Siguiente" : step === 2 ? "Siguiente" : "Finalizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormOrdersStep;
