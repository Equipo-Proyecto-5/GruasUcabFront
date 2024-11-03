import LogoutButton from "./components/LogoutButton";
import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";


function AdministratorView(){

    return(
      
      <main className="flex">
        {/* Sidebar siempre presente */}
        <SideBar />
        <LogoutButton />
  
        {/* El contenido cambiará según la ruta interna */}
        <div className="flex-1 p-10">
          <Outlet />
        </div>
      </main>
 
    );
};

export default AdministratorView;