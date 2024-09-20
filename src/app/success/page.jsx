"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react"; // Puedes usar cualquier ícono de éxito

function Success() {
  return (
    <>
      <main className="p-4 md:p-20">
        <Card className="mx-auto md:p-2 md:max-w-5xl sm:max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              Pre-inscripción Finalizada
            </CardTitle>
            <CardDescription className="text-md text-center">
              Su información ha sido registrada exitosamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 text-center">
              {/* Icono de éxito */}
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />

              {/* Mensaje de confirmación */}
              <p className="text-lg font-semibold">
                ¡Gracias por pre-inscribirse!
              </p>
              <p className="text-md">
                Revise su correo para obtener{" "}
                <b>la confirmaci&oacute;n de su pago y c&oacute;digo QR</b>, el
                cual necesitar&aacute; en el <b>ingreso del evento</b>.
              </p>

              {/* Resumen de información opcional */}
              <div className="bg-gray-100 p-4 rounded-lg text-left">
                <p className="text-sm">
                  <strong>Evento:</strong> Foro Nacional - Reactivación
                  Petrolera
                </p>
                <p className="text-sm">
                  <strong>Fecha:</strong> 18 de Octubre de 2024
                </p>
                <p className="text-sm">
                  <strong>Lugar:</strong> Hotel Costa del Sol, Pucallpa
                </p>
              </div>

              {/* Botones de acción */}
              <div className="mt-6">
                <Button
                  className="w-full mb-2"
                  onClick={() =>
                    (window.location.href = "https://reactivapetrol.online/")
                  }
                >
                  Volver al Inicio
                </Button>

                {/* <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => window.print()}
                >
                  Imprimir Confirmación y QR
                </Button> */}
              </div>

              {/* Enlace a más detalles */}
              <p className="mt-4 text-sm text-gray-500">
                Para más detalles, visita la{" "}
                <a
                  href="https://reactivapetrol.online/#schedule"
                  className="text-green-500 underline"
                >
                  página de eventos
                </a>
                .
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

export default Success;
