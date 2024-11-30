import { FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function LogoutButton(){
    return (
        <div className="absolute top-4 right-4">
          <Link to="/" className="hidden sm:block font-bold text-primary hover:underline">
          <button className="flex items-center font-bold space-x-2 text-primary px-4 py-2 rounded hover:scale-90 transition-transform duration-200">
            {/* Ícono de cerrar sesión */}
            <FaSignOutAlt className="text-xl" />
            {/* Texto de cerrar sesión */}
            <span>Cerrar Sesión</span>
          </button>
          </Link>
        </div>
      );
    
}

export default LogoutButton;