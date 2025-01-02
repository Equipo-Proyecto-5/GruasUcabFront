import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import  MapWithTwoLocations from "./components/MapWithAutocomplete";
import { useOrders } from "./Hooks/useOrder";
import { ICreateOrder } from "@/models/CreateOrder";
import { useNavigate } from "react-router-dom";



// Definición de tipos para los inputs de cada paso
interface StepOneInputs {
  policyNumber: string;
  policyType: string;
  vehicleType: string;
  coverageAmount: string;
  coverageKm: string;
  insuredName: string;
  idCard: string;
  placa: string;
  infocard: string;
}

interface StepTwoInputs {
  tipoDocumentoDenunciante: string;
  denuncianteName: string;
  idCardenunciante: string;
  description: string;
  

}

interface StepThreeInputs {
  claimAmount: string;
  claimReason: string;
  direccionOrigen: string;
  direccionDestino: string;
}

type CompleteFormInputs = StepOneInputs & StepTwoInputs & StepThreeInputs;

const FormOrdersStep = () => {

  const navigate = useNavigate();

  const [originCoords, setOriginCoords] = useState<{ lat: number | null; lng: number | null }>({ lat: null, lng: null });
  const [destinationCoords, setDestinationCoords] = useState<{ lat: number | null; lng: number | null }>({ lat: null, lng: null });

  const [step, setStep] = useState(1);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CompleteFormInputs>();

  

  const handleChangePolicyNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const policyNumber = event.target.value;
    console.log("Número de póliza ingresado:", policyNumber); 
    // Llamamos a la API solo si el valor no está vacío
    if (policyNumber) {
      fetchPolicyDataById(policyNumber).catch((error) => {
        console.error("Error en la API:", error);
      }); // Captura cualquier error de la API
    }
  };

  
  const { formData, fetchPolicyDataById, createOrder,  setFormData, } = useOrders(); // Obtener los datos del hook

  useEffect(() => {
    if (formData) {
      const fields: { name: keyof CompleteFormInputs; value: string | number }[] = [
        { name: "policyNumber", value: formData.polizaAseguradoId },
        { name: "insuredName", value: formData.nombreAsegurado },
        { name: "idCard", value: formData.documentoIdentidad },
        { name: "coverageAmount", value: formData.coberturaBasePoliza },
        { name: "coverageKm", value: formData.distanciaCoberturaPoliza },
        { name: "vehicleType", value: formData.tipoVehiculo },
        { name: "policyType", value: formData.tipoPoliza },
        { name: "placa", value: formData.placa },
        { name: "infocard", value: formData.informacionVehiculo  },
      ];

      fields.forEach(field => setValue(field.name, String(field.value)));
      console.log(formData);
    }
  }, [formData, setValue]);


  // Funciones de envío de los formularios
  const handleStepOneSubmit = (data: StepOneInputs) => {
    console.log("Paso 1: Número de póliza:", data.policyNumber);
    fetchPolicyDataById(data.policyNumber); // Llamar la API para obtener datos de la póliza
    setStep(2); // Avanzar al paso 2
    setFormData((prevData) => ({
        ...prevData,
        polizaAseguradoId: data.policyNumber, // Solo almacenar el polizaAseguradoId
    }));
};


const handleStepTwoSubmit = (data: StepTwoInputs) => {
  console.log("Paso 2: Datos del denunciante antes de limpiar:", data);
  

  const orderData: ICreateOrder = {
    detallesIncidente: data.description,
    direccionOrigen: "",
    direccionDestino: "",
    nombreDenunciante: data.denuncianteName,
    tipoDocumentoDenunciante: data.tipoDocumentoDenunciante,
    numeroDocumentoDenunciante: data.idCardenunciante,
    polizaAseguradoId: formData.polizaAseguradoId || "",
    administrador: null,
    operador:  null,
  };

  console.log("Datos filtrados del Paso 2:", data);
  setFormData((prev) => ({ ...prev, ...orderData }));
  setStep(3);
};

const handleStepThreeSubmit = async (data: StepThreeInputs) => {
  try {
    console.log("Paso 3: Dirección de origen y destino:", data);

    // Verifica si las coordenadas están disponibles
    if (!originCoords.lat || !originCoords.lng || !destinationCoords.lat || !destinationCoords.lng) {
      alert("Por favor, selecciona una dirección de origen y destino válidas.");
      return;
    }

    console.log("Coordenadas de origen:", originCoords);
    console.log("Coordenadas de destino:", destinationCoords);


    const orderData: ICreateOrder = {
      detallesIncidente: formData.detallesIncidente,
      direccionOrigen: `${originCoords.lat},${originCoords.lng}`,
      direccionDestino: `${destinationCoords.lat},${destinationCoords.lng}` ,      
      nombreDenunciante: formData.nombreDenunciante,
      tipoDocumentoDenunciante: formData.tipoDocumentoDenunciante,
      numeroDocumentoDenunciante: formData.numeroDocumentoDenunciante,
      polizaAseguradoId: formData.polizaAseguradoId,
      administrador: formData.Administratorid || "3fa85f64-5717-4562-b3fc-2c963f66afa9",
      operador: null,
    };

    console.log("Datos que se enviarán al backend:", orderData);

    // Llama a la función para enviar los datos
    await createOrder(orderData);

    navigate("/admin/orders"); // Redirige a la lista de órdenes
   
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    alert("Ocurrió un error al completar el formulario. Por favor, inténtalo nuevamente.");
  }
};


  return (
    <div className="w-full max-w-4xl mx-auto md:p-4 p-0 mt-8">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
        
        {/* Circulitos de progreso */}
      
        <div className="flex justify-center items-center mb-6">
            {[1, 2, 3].map((num, index) => (
                <div key={num} className="flex items-center">
      
            <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${step >= num ? "bg-blue-500" : "bg-gray-300"}`}>
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
                            onChange={handleChangePolicyNumber} // Aquí asociamos la función
                            
                        />
                        {errors.policyNumber && <p className="mt-1 text-sm text-red-600">{errors.policyNumber.message}</p>}
                   </div>

                   <div>
                        <label htmlFor="policyType" className="block text-sm font-medium text-white">
                          Tipo de Poliza
                        </label>
                        <input
                          id="policyType"
                          type="text"
                          {...register("policyType")}
                          className="w-full px-3 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="coverageAmount" className="block text-sm font-medium text-white mt-2">
                           Cobertura $
                        </label>
                        <input
                            id="coverageAmount"
                            type="text"
                            {...register("coverageAmount")} 
                            className="w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                   </div>

                   <div>
                        <label htmlFor="coverageKm" className="block text-sm font-medium text-white mt-2">
                            Cobertura KM
                        </label>
                        <input
                            id="coverageKm"
                            type="text"
                            {...register("coverageKm")} 
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
                            {...register("insuredName")} 
                            className="w-full px-3 py-2 mt-2 text-sm border rounded-lg"
                            />
                      </div>      

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                        <label htmlFor="idCard" className="block text-sm font-medium text-white">
                           Cedula
                        </label>
                        <input
                            id="idCard"
                            type="text"
                            {...register("idCard")} 
                            className="w-full px-3 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />                      
                   </div>

                   <div>
                        <label htmlFor="placa" className="block text-sm font-medium text-white">
                            Placa del Vehiculo Asegurado
                        </label>
                        <input
                            id="placa"
                            type="text"
                            {...register("placa")}
                           
                            className="w-full px-3 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />   
                   </div>
                </div>

                <div className="mt-2">
                      <label className="block text-sm font-medium text-white">Informacion del Vehiculo</label>
                      <input
                        id="infocard"
                        type="text"
                        {...register("infocard")}
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
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white">Nombre Completo del Denunciante</label>
                  <input
                    id="denuncianteName"
                    type="text"
                    {...register("denuncianteName", { required: "Tipo de póliza es obligatorio" })}
                    className="w-full px-3 py-2 mt-1 text-sm border rounded-lg"
                  />
                </div>
                
                <div>
                  <label htmlFor="tipoDocumentoDenunciante" className="block text-gray-700 dark:text-white mb-0">
                        Tipo 
                  </label>
                          <select
                            id="tipoDocumentoDenunciante"
                            {...register("tipoDocumentoDenunciante")}
                            
                            className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                            required
                          >
                              <option value="" disabled>
                                Selecciona un tipo
                              </option>
                                  <option value="E">E</option>
                                  <option value="V">V</option>
                                  </select>             
                 </div>

                <div>
                  <label className="block text-sm font-medium text-white">Cedula</label>
                  <input
                    id="idCardenunciante"
                    type="text"
                    {...register("idCardenunciante", { required: "Cobertura en $ es obligatoria" })}
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
                </div>

            </>
          )}
          
          

          {step === 3 && (
            <>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-white">Direcciones</label>
                  <MapWithTwoLocations
                        onOriginChange={(address, coords) => {
                          console.log('Origin Change:', address, coords);
                          setOriginCoords(coords);
                          setFormData((prevData) => ({
                            ...prevData,
                            direccionOrigen: `${address} (Lat: ${coords.lat}, Lng: ${coords.lng})`,
                          }));
                        }}
                        onDestinationChange={(address, coords) => {
                          console.log('Destination Change:', address, coords);
                          setDestinationCoords(coords);
                          setFormData((prevData) => ({
                            ...prevData,
                            direccionDestino: `${address} (Lat: ${coords.lat}, Lng: ${coords.lng})`,
                          }));
                        }}
                      />
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
                              type={step === 3 ? "button" : "submit"}
                              onClick={step === 3 ? handleSubmit(handleStepThreeSubmit) : undefined}
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


