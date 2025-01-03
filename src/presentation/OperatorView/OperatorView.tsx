import LogoutButton from "../../components/LogoutButton";
import SideBarOp from "./components/SideBarOp";
import { Outlet } from "react-router-dom";


function OperatorView(){

    return(
      
      <main className="flex">
        {/* Sidebar siempre presente */}
        <SideBarOp />
        <LogoutButton />
  
        {/* El contenido cambiará según la ruta interna */}
        <div className="flex-1 p-10">
          <Outlet />
        </div>
      </main>
    );
};

export default OperatorView;