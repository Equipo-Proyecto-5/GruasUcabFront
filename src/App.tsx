import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routesConfig } from "../src/routes/routesConfig";
import Home from "./presentation/Home/Home";
import Login from "./presentation/Home/Login";
import RecoverPasswordPage from "./presentation/Home/RecoverPasswordPage";
import ChangePasswordPage from "./presentation/Home/UpdatePassword";
import AdministratorView from "./presentation/AdministratorView/AdministratorView";
import OperatorView from "./presentation/OperatorView/OperatorView";
import ProviderView from "./presentation/ProviderView/ProviderView";



function App() {
  
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover-password" element={<RecoverPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />

        {/* Rutas del administrador */}
        <Route path="/admin" element={<AdministratorView />}>
          {routesConfig.admin.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Route>

         {/* Rutas del operador */}
         <Route path="/operator" element={<OperatorView />}>
          {routesConfig.operator.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Route>

        <Route path="/provider" element={<ProviderView />}>
          {routesConfig.provider.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
