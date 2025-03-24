import pool from "@/config/db/db";
import { NextResponse } from "next/server";

interface Respuestas {
  [key: string]: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const codigo = searchParams.get("codigo");

  const query = `
  SELECT e.id as encuesta_id, re.nombre_usuario as usuario 
  FROM respuestas_encuesta re 
  JOIN encuestas e ON re.encuesta_codigo = e.codigo
  WHERE re.codigo = $1 AND e.estado_id = 1 AND re.estado = '1' AND re.fecha_respuesta IS NULL;
`;
  const { rows } = await pool.query(query, [codigo]);

  if (rows.length === 0) {
    return NextResponse.json(
      { error: "La encuesta no existe." },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "Encuesta encontrada", usuario: rows[0].usuario },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  try {
    const { codigo, respuestas }: { codigo: string; respuestas: Respuestas } =
      await request.json();

    if (!codigo) {
      return NextResponse.json(
        { error: 'El parámetro "codigo" de la solicitud es requerido.' },
        { status: 400 }
      );
    }

    const query = `
      SELECT re.id as encuesta_id 
      FROM respuestas_encuesta re 
      WHERE re.codigo = $1 AND re.fecha_respuesta IS NULL;
    `;

    const { rows } = await pool.query(query, [codigo]);

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "La encuesta no existe." },
        { status: 404 }
      );
    }

    const query_update = `
      UPDATE respuestas_encuesta
      SET fecha_respuesta = NOW()
      WHERE id = $1;
    `;

    await pool.query(query_update, [rows[0].encuesta_id]);

    const encuestaId = rows[0].encuesta_id;
    const entries = Object.entries(respuestas);
    if (entries.length === 0) {
      return NextResponse.json(
        { error: "No se han proporcionado respuestas." },
        { status: 400 }
      );
    }

    let paramIndex = 1;
    const valuesClause = entries
      .map(
        () => `($${paramIndex++}, $${paramIndex++}, $${paramIndex++}, NOW())`
      )
      .join(", ");

    const params: Array<number | string | Date> = [];
    for (const [preguntaId, respuesta] of entries) {
      params.push(encuestaId, Number(preguntaId), respuesta);
    }

    const query_insert = `
      INSERT INTO respuestas_pregunta (respuesta_encuesta_id, pregunta_id, respuesta, fecha_respuesta)
      VALUES ${valuesClause}
    `;
    await pool.query(query_insert, params);

    return NextResponse.json(
      { message: "Respuestas insertadas correctamente." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en POST:", error);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
