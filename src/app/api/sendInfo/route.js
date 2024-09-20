import { NextResponse } from "next/server";
import { conn } from "../libs/mysql";
import { sendEmail } from "../libs/brevo";

function generarCodigoAlfanumerico(longitud) {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let resultado = "";
  const caracteresLength = caracteres.length;
  for (let i = 0; i < longitud; i++) {
    const randomIndex = Math.floor(Math.random() * caracteresLength);
    resultado += caracteres[randomIndex];
  }
  return resultado;
}

// Función para enviar un correo
async function email(name, mail, code) {
  try {
    await sendEmail({
      code: code,
      mail: mail,
      name: name,
    });
  } catch (error) {
    console.error("Error al enviar el email:", error);
  }
}

export async function POST(request) {
  try {
    // Recibe los datos enviados desde el frontend
    const formData = await request.formData();

    // Construir objeto para los datos del formulario
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    // Verificar si se proporcionaron datos
    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { message: "No se proporcionaron datos" },
        { status: 400 }
      );
    }
    //console.log(data);
    // Generar el código alfanumérico
    const codigo = generarCodigoAlfanumerico(10);
    data.codigo = codigo; // Añadir el código generado a los datos

    // Comienza a construir la consulta dinámica
    let query = `INSERT INTO inscripcion_copy1 (`;
    let values = [];
    let placeholders = [];

    // Añadir los campos obligatorios y el código generado
    for (const [key, value] of Object.entries(data)) {
      if (value) {
        query += `${key}, `;
        values.push(value);
        placeholders.push("?"); // Placeholder para el valor
      }
    }

    // // Remover la última coma y espacio
    query = query.slice(0, -2);

    // // Completar la consulta con los valores
    query += `) VALUES (${placeholders.join(", ")})`;

    // Ejecutar la consulta con mysql2
    const [result] = await conn.execute(query, values);

    // Si la inserción fue exitosa, enviar el correo
    // const name = formData.get("nombre");
    // const mail = formData.get("email");

    // await email(name, mail, codigo); // Enviar el correo después de la inserción

    // Manejo del archivo si se ha subido uno
    //if (data.imagen) {
    // Procesar el archivo aquí si es necesario
    //console.log("Archivo recibido:", data.imagen);
    //}

    return NextResponse.json({
      message: "Datos insertados exitosamente",
      //result: codigo, // Puedes devolver el resultado de la consulta si es necesario
    });
  } catch (error) {
    console.error("Error al insertar los datos:", error);
    return NextResponse.json(
      { message: "Error al insertar los datos" },
      { status: 500 }
    );
  }
}
