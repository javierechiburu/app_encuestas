"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useCallback, useMemo } from "react";
import { cn } from "@/config/clsx/clsxMerge";
import { Send } from "lucide-react";
import { FormStatus, FormValues } from "@/types/types";
import { TerminoForm } from "@/components/forms/TerminoForm";
import { BienvenidaForm } from "@/components/forms/BienvenidaForm";
import { useQuery, useMutation } from "@tanstack/react-query";
import { preguntasAPIGetPreguntas } from "@/api/preguntasAPI";
import { encuestasAPISaveEncuesta } from "@/api/encuestasAPI";
import { Question } from "@/components/Question";
import { toast } from "sonner";

export const EncuestaForm = ({ codigo }: { codigo: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["preguntasAPIGetPreguntas", codigo],
    queryFn: async () => preguntasAPIGetPreguntas({ codigo }),
    refetchOnWindowFocus: false,
  });

  const { mutate: enviarEncuesta, error: saveError } = useMutation({
    mutationFn: async (formData: FormValues) => {
      const response = await encuestasAPISaveEncuesta({
        codigo,
        respuestas: formData,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Encuesta enviada correctamente");
    },
    onError: () => {
      toast.error("Error al enviar la encuesta");
    },
  });

  const [estadoFormulario, setEstadoFormulario] =
    useState<FormStatus>("inicio");
  const [pasoActual, setPasoActual] = useState(0);

  const defaultValues = useMemo(() => {
    if (data?.preguntas) {
      return data.preguntas.reduce((acc, question) => {
        acc[question.id] = "";
        return acc;
      }, {} as FormValues);
    }
    return {};
  }, [data]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
    setValue,
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
    shouldUnregister: true,
    defaultValues,
  });

  const idPreguntaActual = data?.preguntas
    ? data.preguntas[pasoActual].id
    : null;

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    enviarEncuesta(formData);
    if (!saveError) {
      setEstadoFormulario("final");
      reset();
    }
  };

  const handleNext = useCallback(async () => {
    if (idPreguntaActual) {
      const valid = await trigger(idPreguntaActual);
      if (valid && data && pasoActual < data.preguntas.length - 1) {
        setPasoActual((prev) => prev + 1);
      }
    }
  }, [trigger, idPreguntaActual, data, pasoActual]);

  const handlePrev = useCallback(() => {
    setPasoActual((prev) => Math.max(prev - 1, 0));
  }, []);

  if (!data?.preguntas || estadoFormulario === "inicio") {
    return (
      <BienvenidaForm
        onClick={() => setEstadoFormulario("preguntas")}
        isLoading={isLoading}
        error={error}
        totalPreguntas={(data && data.preguntas && data?.preguntas.length) || 0}
      />
    );
  }

  if (estadoFormulario === "final") {
    return <TerminoForm />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between md:border-b md:border-b-gray-500 pb-4 w-full">
          <h1 className="text-2xl font-semibold text-gray-700 text-center">
            Encuesta de satisfacción
          </h1>
          <p className="text-center">
            Pregunta <b>{pasoActual + 1}</b> de <b>{data.preguntas.length}</b>
          </p>
        </div>
        <div className="relative overflow-hidden grid grid-cols-1 gap-8">
          {data.preguntas.map((question, index) => (
            <Question
              key={question.id}
              index={index}
              question={question}
              current={pasoActual}
              errors={errors}
              register={register}
              watch={watch}
              setValue={setValue}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-between md:items-end gap-4">
        <button
          type="button"
          onClick={handlePrev}
          disabled={pasoActual === 0}
          className={`px-6 py-2 rounded-lg ${
            pasoActual === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Anterior
        </button>
        {pasoActual === data.preguntas.length - 1 ? (
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className={cn(
              "flex items-center justify-center gap-2 px-6 py-2 text-white rounded-lg",
              {
                "pointer-events-none bg-gray-400": !isValid,
                "bg-primary-500 hover:bg-primary-600": isValid,
              }
            )}
            disabled={!isValid}
          >
            Enviar Encuesta
            <Send size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className={cn(
              "px-6 py-2 text-white rounded-lg",
              !watch(idPreguntaActual!)
                ? "bg-gray-400 hover:bg-gray-400 pointer-events-none"
                : "bg-primary-500 hover:bg-primary-600"
            )}
            disabled={!!errors[idPreguntaActual!]}
          >
            Siguiente
          </button>
        )}
      </div>
    </form>
  );
};
