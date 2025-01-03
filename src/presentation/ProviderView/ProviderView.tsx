import LogoutButton from "../../components/LogoutButton";
import SideBarPro from "./components/SideBarPro";
import { Outlet } from "react-router-dom";


function OperatorView(){

    return(
      
      <main className="flex">
        {/* Sidebar siempre presente */}
        <SideBarPro />
        <LogoutButton />
  
        {/* El contenido cambiará según la ruta interna */}
        <div className="flex-1 p-10">
          <Outlet />
        </div>
      </main>
    );
};

export default OperatorView;