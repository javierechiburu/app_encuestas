import { CheckCircle, MessageCircle, AlertTriangle } from "lucide-react";
import Image from "next/image";

export const ErrorForm = () => {
  return (
    <div className="container">
      <div className="p-8 bg-red-200 border-b border-ed-200 flex flex-col-reverse md:flex-row items-center gap-4 justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <AlertTriangle className="w-12 h-12 text-red-500 animate-pulse" />
          <div>
            <h1 className="text-2xl font-medium text-gray-800">
              Encuesta no encontrada
            </h1>
            <p className="text-red-600">
              {" "}
              La URL ingresada no corresponde a una encuesta válida o ya ha
              expirado.
            </p>
          </div>
        </div>
        <Image src="/fonasa.svg" alt="" width={120} height={100} />
      </div>

      <div className="px-8 py-4 space-y-2 mb-16 md:mb-0">
        <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <span className="text-gray-700">
            Si completaste una encuesta previamente, tus respuestas han sido
            registradas correctamente.
          </span>
        </div>

        <div className="flex items-center gap-4 p-4 bg-sky-50 rounded-lg">
          <MessageCircle className="w-6 h-6 text-sky-600" />
          <span className="text-gray-700">
            Si tienes dudas o comentarios, nuestro equipo está disponible para
            ayudarte.
          </span>
        </div>
      </div>

      {/* Acción */}

      <p className="text-center text-gray-500 text-sm">
        ¿Necesitas asistencia o crees que esto es un error?
        <br />
        <button className="text-indigo-600 hover:underline mt-1">
          Contactar con soporte
        </button>
      </p>
    </div>
  );
};
