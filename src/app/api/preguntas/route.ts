import pool from "@/config/db/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const codigo = searchParams.get("codigo");

  if (!codigo) {
    return NextResponse.json(
      { error: 'El parámetro "codigo" de la solicitud es requerido.' },
      { status: 400 }
    );
  }

  const query = `
    SELECT e.id as encuesta_id
    FROM respuestas_encuesta re 
    JOIN encuestas e ON re.encuesta_codigo = e.codigo
    WHERE re.codigo = $1
  `;
  const { rows } = await pool.query(query, [codigo]);

  const query_preguntas = `
  SELECT 
    p.id::text as id,
    tp.nombre as type,
    p.titulo as label,
    p.descripcion as description 
  FROM encuesta_pregunta ep
  JOIN preguntas p ON ep.pregunta_id = p.id 
  JOIN tipo_pregunta tp ON tp.id = p.id_tipo_pregunta
  WHERE ep.encuesta_id = $1 
  ORDER BY ep.orden ASC
  `;

  const { rows: questions } = await pool.query(query_preguntas, [
    rows[0].encuesta_id,
  ]);

  console.log(questions);

  return NextResponse.json(
    { message: "Hello Worl2d", preguntas: questions },
    { status: 200 }
  );
}
