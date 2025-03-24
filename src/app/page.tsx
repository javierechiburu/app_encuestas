"use client";

import { encuestasAPIGetEncuesta } from "@/api/encuestasAPI";
import { EncuestaForm } from "@/components/forms/EncuestaForm";
import { ErrorForm } from "@/components/forms/ErrorForm";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const codigo = searchParams.get("codigo");

  const { data, isLoading, error } = useQuery({
    queryKey: ["preguntasAPIGetPreguntas", codigo],
    queryFn: async () => encuestasAPIGetEncuesta({ codigo: codigo! }),
    refetchOnWindowFocus: false,
    enabled: !!codigo,
    retry: false,
  });

  if (!codigo) return <ErrorForm />;
  if (isLoading)
    return (
      <div className="w-full flex justify-center items-center">
        <Loader2 size={56} className="text-white animate-spin" />
      </div>
    );
  if (error || !data) return <ErrorForm />;

  return <EncuestaForm codigo={codigo} />;
}
