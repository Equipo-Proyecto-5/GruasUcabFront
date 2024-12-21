import { Link } from "react-router-dom";
import logo from '../../assets/LogoUCAB-removebg-preview.png';

function Navbar() {
  

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
          <button className="px-4 py-2 text-lg font-medium text-white rounded-full hover:bg-gray-700 hover:text-xl focus:outline-none transition-all">
            <Link to="/login">Login</Link>
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
