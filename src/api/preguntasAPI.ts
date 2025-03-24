import { axiosInstance } from "@/config/axios/axiosInstance";
import { Question } from "@/types/types";

interface GETPreguntasResponse {
  message: string;
  preguntas: Question[];
}

export const preguntasAPIGetPreguntas = async ({
  codigo,
}: {
  codigo: string;
}): Promise<GETPreguntasResponse> => {
  const response = await axiosInstance.get("/api/preguntas", {
    params: { codigo },
  });

  if (response.status !== 200) {
    throw new Error("Error de obtención de prestaciones");
  }

  return await response.data;
};
