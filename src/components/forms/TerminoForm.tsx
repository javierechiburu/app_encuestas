import { CheckCircle, Smile, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";

export const TerminoForm = () => {
  return (
    <div className="container">
      {/* Encabezado */}
      <div className="p-8 bg-primary-100 border-b border-primary-200 flex flex-col-reverse md:flex-row items-center gap-4 justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Smile className="w-12 h-12 text-emerald-500 animate-bounce" />
          <div>
            <h1 className="text-2xl font-medium text-gray-800">
              ¡Gracias por tu opinión!
            </h1>
            <p className="text-primary-700">Encuesta de satisfacción</p>
          </div>
        </div>
        <Image src="/fonasa.svg" alt="" width={120} height={100} />
      </div>

      {/* Contenido */}
      <div className="px-8 py-4 space-y-2 mb-16 md:mb-0">
        {/* Mensaje principal */}
        <div className="flex items-center gap-4 bg-red-50 p-4 rounded-lg">
          <Heart className="w-8 h-8 text-red-600 flex-shrink-0" />
          <p className="text-gray-600">
            Valoramos mucho tu tiempo y tus comentarios. Cada respuesta nos
            ayuda a mejorar tu experiencia.
          </p>
        </div>

        {/* Destacados */}
        <div className="grid gap-2">
          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <span className="text-gray-600">
              Tus respuestas han sido registradas correctamente
            </span>
          </div>

          <div className="flex items-center gap-4 p-4 bg-sky-50 rounded-lg">
            <MessageCircle className="w-6 h-6 text-sky-600" />
            <span className="text-gray-600">
              Los comentarios serán revisados por nuestro equipo
            </span>
          </div>
        </div>

        {/* Mensaje final */}

        <p className="text-center text-gray-500 text-sm mt-6">
          ¿Deseas agregar algún comentario adicional?
          <br />
          <button className="text-indigo-600 hover:underline mt-1">
            Contactar con soporte
          </button>
        </p>
      </div>
    </div>
  );
};
