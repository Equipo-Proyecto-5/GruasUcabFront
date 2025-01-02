import React from "react";
import { Stepper, Step, CardHeader, Typography } from "@material-tailwind/react";

interface StatusOrderProps {
  orderId: string;
  currentStatus: string;
}

export function StatusOrder({ currentStatus, orderId }: StatusOrderProps) {

  console.log(currentStatus);
 console.log(orderId);
  // Lista de todos los estados posibles
  const allStatuses = [
    "porasignar",
    "poraceptar",
    "aceptado",
    "localizado",
    "cancelado",
    "enproceso",
    "finalizado",
    "pagado",
  ];

  // Determinar el índice correspondiente al estado actual
  const activeStep = React.useMemo(() => {
    const stepIndex = allStatuses.indexOf(currentStatus);
    return stepIndex !== -1 ? stepIndex : 0; // Si no se encuentra, usar el primer paso
  }, [currentStatus]);

  return (
    <div className="w-full py-4 px-8 ">
       {/* Div con el texto "Estatus Orden" */}
    <div className=" text-lg font-semibold mb-4 text-black">
      Estatus Orden
    </div>

      <CardHeader
        floated={false}
        variant="gradient"
        color="gray"
        className="grid h-24 m-0 place-items-center bg-slate-800"
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <div className="w-full px-20 pt-4 pb-8 relative">
          <Stepper activeStep={activeStep} placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
            {allStatuses.map((status, index) => (
              <Step
                key={index}
                className={`h-4 w-4 z-10 bg-gray-300 text-gray-600`}
                activeClassName="!bg-blue-500 text-white ring-2 ring-blue-300"
                completedClassName="!bg-green-500 text-gray-600"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                  <Typography 
                    variant="h6" 
                    color="inherit" 
                    placeholder="" 
                    onPointerEnterCapture={() => {}} 
                    onPointerLeaveCapture={() => {}}>
                    {status}
                  </Typography>
                </div>
              </Step>
            ))}
          </Stepper>
        </div>
      </CardHeader>
    </div>
  );
}