import { useForm } from "react-hook-form";
import { useAuth } from '../../../../AuthContext';

interface ChangePasswordInputs {
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordInputs>();
  const { user } = useAuth();

  const onSubmit = async (data: ChangePasswordInputs) => {
    const { newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch(`http://localhost:86/api/auth/${user?.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPassword),
      });

      if (response.ok) {
        alert("Contraseña actualizada exitosamente");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Error al actualizar la contraseña: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-200 to-gray-400 flex items-center justify-center  mt-5 rounded-xl ">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Cambio de Contraseña
        </h2>
        <p className="text-center mb-4 text-gray-700">
          Correo: <span className="font-medium">{user?.email}</span>
        </p>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              Nueva Contraseña
            </label>
            <input
              id="newPassword"
              type="password"
              {...register("newPassword", {
                required: "La nueva contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
              className="w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "La confirmación de la contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La confirmación debe tener al menos 6 caracteres",
                },
              })}
              className="w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
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
