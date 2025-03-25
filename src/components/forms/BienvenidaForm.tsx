import { cn } from "@/config/clsx/clsxMerge";
import {
  ClipboardList,
  AlertTriangle,
  ArrowRight,
  Clock,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export const BienvenidaForm = ({
  onClick,
  isLoading,
  error,
  totalPreguntas,
}: {
  onClick: () => void;
  isLoading: boolean;
  error: Error | null;
  totalPreguntas: number;
}) => {
  if (error) {
    toast.error("Error al cargar la encuesta");
  }

  const calcularPromedioRespuestas = () => {
    const tiempoMinimo = Math.floor(totalPreguntas * 0.7);
    const tiempoMaximo = Math.floor(totalPreguntas * 1.3);
    return { tiempoMinimo, tiempoMaximo };
  };

  return (
    <div className="container flex flex-col min-h-screen">
      <div className="p-8 bg-primary-100 border-b border-primary-200 flex flex-col-reverse md:flex-row items-center gap-4 justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <ClipboardList className="hidden md:block w-12 h-12 text-emerald-500 animate-pulse" />
          <div>
            <h1 className="text-2xl font-medium text-gray-800 text-center md:text-left">
              Encuesta de Satisfacción
            </h1>
            <p className="text-primary-700 text-center md:text-left">
              Tu opinión es importante para nosotros
            </p>
          </div>
        </div>
        <Image src="/fonasa.svg" alt="" width={120} height={100} />
      </div>

      <div className="md:px-8 py-4 space-y-2 flex-grow">
        <div className="flex items-center gap-4 bg-red-50 p-4 rounded-lg">
          <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 hidden md:block" />
          <div>
            <p className="text-gray-600 font-medium">
              Esta encuesta solo puede ser respondida una vez
            </p>
            <p className="text-sm text-gray-500">
              Asegúrate de tener tiempo para completarla adecuadamente
            </p>
          </div>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-lg">
            <Clock className="w-6 h-6 text-amber-600 hidden md:block" />
            <span className="text-gray-600 flex items-center gap-2">
              Tiempo estimado:{" "}
              {totalPreguntas > 0 ? (
                calcularPromedioRespuestas().tiempoMinimo +
                "-" +
                calcularPromedioRespuestas().tiempoMaximo
              ) : (
                <Loader2 size={12} className="animate-spin" />
              )}{" "}
              minutos
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto text-center p-4">
        <button
          type="button"
          className={cn(
            "py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 mx-auto",
            {
              "bg-primary-400 hover:bg-primary-700 text-white ": !isLoading,
              "bg-gray-200 text-gray-400 cursor-not-allowed": isLoading,
            }
          )}
          onClick={onClick}
          disabled={isLoading}
        >
          Comenzar Encuesta
          {!isLoading ? (
            <ArrowRight className="w-5 h-5" />
          ) : (
            <Loader2 className="w-5 h-5 animate-spin" />
          )}
        </button>
      </div>
    </div>
  );
};
