import { useForm } from "react-hook-form";

interface RecoverPasswordInputs {
    userName: string;

}

const RecoverPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoverPasswordInputs>();

  const API_URL = import.meta.env.VITE_API_URL;

  const onSubmit = async (data: RecoverPasswordInputs) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/password-reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.userName),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el correo de recuperación.");
      }

      alert("Correo de recuperación enviado con éxito.");
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error(errorMessage);
      alert("No se pudo enviar el correo:");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-500 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Recuperar Contraseña
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico Registrado
            </label>
            <input
              id="email"
              type="email"
              {...register("userName", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                  message: "Formato de correo no válido",
                },
              })}
              className="w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.userName && <p className="mt-1 text-sm text-red-600">{errors.userName.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-700 rounded-lg hover:bg-green-600 focus:outline-none transition-all"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverPasswordPage;
