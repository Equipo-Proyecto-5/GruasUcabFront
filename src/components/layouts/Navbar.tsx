import { useState } from 'react';
import logo from '../../assets/LogoUCAB-removebg-preview.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className=" dark:bg-gray-900 p-2">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center ">
      <img 
        src={logo} // Usar import
        alt="Logo de My App" 
        className="h-20 w-24" 
      />
     
    </a>


        {/* User Menu */}
        <div className="relative">
          <button onClick={toggleMenu} className="flex items-center text-sm rounded-full focus:outline-none">
            <img className="w-10 h-10 rounded-full" src="https://via.placeholder.com/150" alt="User Avatar" />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20 dark:bg-gray-700">
              <a href="/admin" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Profile</a>
              <a href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Settings</a>
              <a href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Sign out</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
