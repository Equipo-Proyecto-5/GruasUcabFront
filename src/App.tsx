import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdministratorView from './presentation/AdministratorView/AdministratorView';
import Rates from './presentation/AdministratorView/Rates';  // Página de Gestión de Tarifas
import Home from "./presentation/Home/Home";
import Vehicles from "./presentation/AdministratorView/Vehicles";
import Orders from "./presentation/AdministratorView/pages/Orders/Orders";
import FormOrders from "./presentation/AdministratorView/pages/Orders/FormOrders";
import Providerss from "./presentation/AdministratorView/pages/Providerss/Providers";
import FormProvider from "./presentation/AdministratorView/pages/Providerss/FormProvider";
import Operators from "./presentation/AdministratorView/pages/Operators/Operators";
import FormOperators from "./presentation/AdministratorView/pages/Operators/FormOperators";
import { Toaster } from "react-hot-toast";
// Otras páginas fuera del área del administrador

function App() {
  return (
    <Router>
      <Toaster
        position="top-center" // Posición de las notificaciones
        reverseOrder={false} // Orden de las notificaciones
      />
      <Routes>
        {/* Ruta principal del administrador */}
        <Route path="/admin" element={<AdministratorView />}>
          {/* Subrutas que se renderizarán dentro de AdministratorView */}
          <Route path="rates" element={<Rates />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="orders" element={<Orders />} />
          <Route path="formorders" element={<FormOrders />} />
          <Route path="providerss" element={<Providerss />} />
          <Route path="formproviderss" element={<FormProvider />} />
          <Route path="formproviderss/editar/:id" element={<FormProvider />} />
          <Route path="operators" element={<Operators />} />
          <Route path="formoperators" element={<FormOperators />} />
          <Route path="formoperators/editar/:id" element={<FormOperators />} />
          {/* Agregar otras rutas según sea necesario */}
        </Route>

        {/* Ruta para páginas fuera del administrador */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
