import { useState } from "react";
import {  FaClipboardList, FaCog, FaUserCircle } from 'react-icons/fa';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'; 
import { Link} from "react-router-dom";
import logo from '../../../assets/LogoUCAB-removebg-preview.png';
import { useAuth } from '../../../AuthContext';

function SideBarOp() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOtherMenuOpen, setIsOtherMenuOpen] = useState(false);

  const { user} = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
 
  const toggleOtherMenu = () => {
    setIsOtherMenuOpen(!isOtherMenuOpen);
  };


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'w-64' : 'w-16'
        } transition-width duration-350 bg-gray-800 text-white h-screen flex flex-col fixed`}
      >
        <div className="flex items-center justify-between p-2">
          {isOpen && (
            <div className="text-lg font-bold">
              <a href="/" className="flex items-center">
                <img 
                  src={logo} 
                  alt="Logo de My App" 
                  className="h-32 w-38" 
                />
              </a>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2"
          >
            {isOpen ? (
              <FiChevronLeft className="text-2xl" />
            ) : (
              <FiChevronRight className="text-2xl" />
            )}
          </button>
        </div>

        <ul className="space-y-2 flex-1 overflow-y-auto">

          <Link to="cranes/:providerId" className="flex items-center w-full hover:bg-gray-700">
            <li className="flex items-center p-4 hover:bg-gray-700">
              <FaClipboardList className="mr-3" />
              {isOpen && <span>Gestión de Gruas</span>}
            </li>
          </Link>
          

          <li className="flex flex-col">
            <button
              onClick={toggleOtherMenu}
              className="flex items-center p-4 w-full hover:bg-gray-700"
            >
              <FaCog className="mr-3" />
              {isOpen && <span>Configuración</span>}
            </button>

            {/* Submenú visible solo si isUserMenuOpen es true */}
            {isOtherMenuOpen && (
              <ul className="pl-8 space-y-2">
                <Link to="/provider/changepassword" className="flex items-center w-full hover:bg-gray-700">
                  <li className="flex items-center p-2">
                    {isOpen && <span>Cambio de Contraseña</span>}
                  </li>
                </Link>
              </ul>
            )}
          </li>

        </ul>

        <div className="p-4 bg-gray-800">
          <div className="flex items-center space-x-4">
            <div className="flex justify-center items-center bg-white p-2 rounded-full w-10 h-10">
              <FaUserCircle className="text-gray-800 text-3xl" />
            </div>
            {isOpen && (
              <div className="text-left">
              <p className="text-gray-400 text-sm">{user?.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
        {/* Este div me posiciona el contenido princiapal a un lado mientras se abre  */}
        <div className={`${isOpen ? 'ml-64' : 'ml-16'} flex-1 p-4 transition-all`}>
        </div>
    </div>
  );
}

export default SideBarOp;
