//import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../AuthContext';

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginPage = () => {
  //const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const navigate = useNavigate();
  const {login}= useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await fetch("http://localhost:86/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 403) {
        navigate("/change-password", { state: { username: data.username } });
        return;
      }

      if (!response.ok) {
        throw new Error("Error al iniciar sesión. Verifica tus credenciales.");
      }
      const responseData = await response.json();
       //Obtener datos adicionales
      const additionalResponse = await fetch(`http://localhost:83/api/Usuario/${responseData.role}/${responseData.username}`, {
        method: "GET",
      });

      if (!additionalResponse.ok) {
        throw new Error("Error al obtener los detalles del usuario.");
      }
      const aditionalResponseData= await additionalResponse.json()
     //Setear el contexto
     const userAuth={
      id:aditionalResponseData.id,
      email:responseData.username,
      role:responseData.role
     }
      login(userAuth);
      // Redirige al usuario según el rol
      if (responseData.role === "Administrador") {
        navigate("/admin");
      } else if(responseData.role==="Operador"){
        navigate("/operator");
      }else if(responseData.role==="Representante"){
        navigate("/provider")
      }
      else {
        navigate("/home");
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error(errorMessage);
      alert("No se pudo iniciar sesión: " + errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-500 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              {...register("username", { required: "El usuario es obligatorio", minLength: { value: 5, message: "El usuario debe tener al menos 5 caracteres" } })}
              className="w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "La contraseña es obligatoria" })}
              className="w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-700 rounded-lg hover:bg-green-600 focus:outline-none transition-all"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
        <button onClick={() => navigate("/recover-password")} className="text-sm text-black hover:underline focus:outline-none">
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
