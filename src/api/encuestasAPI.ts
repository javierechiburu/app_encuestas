import { axiosInstance } from "@/config/axios/axiosInstance";

interface GETEncuestasResponse {
  message: string;
  codigo: string;
  usuario: string;
}

export const encuestasAPIGetEncuesta = async ({
  codigo,
}: {
  codigo: string;
}): Promise<GETEncuestasResponse> => {
  const response = await axiosInstance.get("/api/encuestas", {
    params: { codigo },
  });

  if (response.status !== 200) {
    throw new Error("Error al obtener encuesta");
  }

  return await response.data;
};

export const encuestasAPISaveEncuesta = async ({
  codigo,
  respuestas,
}: {
  codigo: string;
  respuestas: { [key: string]: string | number };
}): Promise<GETEncuestasResponse> => {
  const response = await axiosInstance.post("/api/encuestas", {
    codigo,
    respuestas,
  });

  if (response.status !== 200) {
    throw new Error("Error al obtener encuesta");
  }

  return await response.data;
};
