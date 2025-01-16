import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

interface ChangePasswordInputs {
  Password: string;
}

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  

  // Obtener el username de los parámetros de estado
  const username = location.state?.username;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordInputs>();

  const onSubmit = async (data: ChangePasswordInputs) => {
    //console.log(encodeURIComponent(username));
    console.log(data.Password)
    try {
      const response = await fetch(`http://localhost:86/api/auth/${encodeURIComponent(username)}`, {
       
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.Password ),
      });

      if (!response.ok) {
        throw new Error("Error al cambiar la contraseña.");
      }

      alert("Contraseña cambiada exitosamente.");
      navigate("/");
    } catch (error) {
      console.error((error as Error).message);
      alert("No se pudo cambiar la contraseña: " + (error as Error).message);
    }
  };

  if (!username) {
    return <p>Error: No se proporcionó el nombre de usuario.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-500 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Cambiar Contraseña
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Nueva Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register("Password", { required: "La contraseña es obligatoria" })}
              className="w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.Password && <p className="mt-1 text-sm text-red-600">{errors.Password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-700 rounded-lg hover:bg-green-600 focus:outline-none transition-all"
          >
            Cambiar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
