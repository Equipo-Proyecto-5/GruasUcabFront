import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdministratorView from './pages/AdministratorView/AdministratorView';
import Rates from './pages/AdministratorView/Rates';  // Página de Gestión de Tarifas
import Home from "./pages/Home/Home";
import Vehicles from "./pages/AdministratorView/Vehicles";
import Orders from "./pages/AdministratorView/pages/Orders/Orders";
import FormOrders from "./pages/AdministratorView/pages/Orders/FormOrders";
import Providerss from "./pages/AdministratorView/pages/Providerss/Providerss";
import FormProviderss from "./pages/AdministratorView/pages/Providerss/FormProviderss";
import Operators from "./pages/AdministratorView/pages/Operators/Operators";
import FormOperators from "./pages/AdministratorView/pages/Operators/FormOperators";
// Otras páginas fuera del área del administrador

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal del administrador */}
        <Route path="/admin" element={<AdministratorView />}>
          {/* Subrutas que se renderizarán dentro de AdministratorView */}
          <Route path="rates" element={<Rates />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="orders" element={<Orders />} />
          <Route path="formorders" element={<FormOrders />} />
          <Route path="providerss" element={<Providerss />} />
          <Route path="formproviderss" element={<FormProviderss />} />
          <Route path="operators" element={<Operators />} />
          <Route path="formoperators" element={<FormOperators />} />
          {/* Agregar otras rutas según sea necesario */}
        </Route>

        {/* Ruta para páginas fuera del administrador */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
