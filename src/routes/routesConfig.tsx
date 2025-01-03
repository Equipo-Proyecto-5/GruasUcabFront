import Rates from '../presentation/AdministratorView/pages/Rates/Rates';
import FormRates from '../presentation/AdministratorView/pages/Rates/FormRates';
import Cranes from '../presentation/AdministratorView/pages/Cranes/Cranes';
import FormCrane from '../presentation/AdministratorView/pages/Cranes/FormCrane';
import Orders from '../presentation/AdministratorView/pages/Orders/Orders';
import FormOrders from '../presentation/AdministratorView/pages/Orders/FormOrders';
import FormOrdersStep from '../presentation/AdministratorView/pages/Orders/FormOrdersStep';
import Providerss from '../presentation/AdministratorView/pages/Providerss/Providers';
import FormProvider from '../presentation/AdministratorView/pages/Providerss/FormProvider';
import Operators from '../presentation/AdministratorView/pages/Operators/Operators';
import FormOperators from '../presentation/AdministratorView/pages/Operators/FormOperators';
import ProviderssRepresentative from '../presentation/AdministratorView/pages/ProviderssRepresentative/ProviderssRepresentative';
import FormProviderssRepresentative from '../presentation/AdministratorView/pages/ProviderssRepresentative/FormProviderssRepresentative';
import Departments from '../presentation/AdministratorView/pages/Departments/Departments';
import FormDepartments from '../presentation/AdministratorView/pages/Departments/FormDepartments';
import Drivers from '../presentation/AdministratorView/pages/Drivers/Drivers';
//import FormDriver from '../presentation/AdministratorView/pages/Drivers/FormDriver';
import Notifications from '../presentation/AdministratorView/pages/Notifications/Notifications';
import FormNotifications from '../presentation/AdministratorView/pages/Notifications/FormNotifications';




// routesConfig.js
export const routesConfig = {
  admin: [
    { path: "rates", element: <Rates /> },
    { path: "formrates", element: <FormRates /> },
    { path: "formrates/editar/:id", element: <FormRates />},
    { path: "cranes/:providerId", element: <Cranes /> },
    { path: "formcranes/:providerId", element: <FormCrane />},
    { path: "formcranes/editar/:id/:providerId", element: <FormCrane />},
    { path: "orders", element: <Orders /> },
    { path: "formorders", element: <FormOrders />},
    { path: "formordersstep", element: <FormOrdersStep />},
    { path: "providerss", element: <Providerss />},
    { path: "formproviderss", element: <FormProvider />},
    { path: "formproviderss/editar/:id", element: <FormProvider />},
    { path: "operators", element: <Operators />},
    { path: "formoperators", element: <FormOperators />},
    { path: "formoperators/editar/:id", element: <FormOperators />},
    { path: "providerssrepresentative", element: <ProviderssRepresentative />},
    { path: "formproviderssrepresentative/editar/:id", element: <FormProviderssRepresentative />},
    { path: "departments", element: <Departments />,},
    { path: "formdepartments/editar/:id", element: <FormDepartments />},
    { path: "formdepartments", element: <FormDepartments/>},
    { path: "drivers", element: <Drivers />},
   // { path: "formdriver", element: <FormDriver />},
   // { path: "formdriver/editar/:id", element: <FormDriver />}
    { path: "notifications", element: <Notifications /> },
    { path: "formnotifications", element: <FormNotifications /> },
    
    // Agrega todas las rutas del administrador
  ],
  operator: [
    { path: "orders", element: <Orders /> },
    { path: "formorders", element: <FormOrders />},
    { path: "formordersstep", element: <FormOrdersStep />},
    // Define rutas específicas del operador
  ],
  provider: [
    { path: "drivers", element: <Drivers />},
    { path: "cranes/:providerId", element: <Cranes /> },
    { path: "formcranes/:providerId", element: <FormCrane />},
    { path: "formcranes/editar/:id/:providerId", element: <FormCrane />},
    // Define rutas específicas del proveedor
  ],

  
};



export const getBasePath = (role: any) => {
  switch (role) {
    case "admin":
      return "/admin";
    case "operator":
      return "/operator";
    case "provider":
      return "/provider";
    default:
      return "/";
  }
};

export const getUserRole = () => {
  // Simula obtener el rol; cámbialo según tu lógica real.
  return "admin"; // "admin", "operator", "provider", etc.
};