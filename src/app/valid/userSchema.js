import { z } from "zod";

export const userSchema = z
  .object({
    ruc: z.string().trim().toUpperCase().optional(), // Inicialmente opcional
    raz_soc: z.string().trim().toUpperCase().optional(), // Inicialmente opcional
    nombre: z
      .string()
      .min(2, { message: "Debe tener mínimo 2 caracteres" })
      .trim()
      .toUpperCase(),
    apellido: z
      .string()
      .min(2, { message: "Debe tener mínimo 2 caracteres" })
      .trim()
      .toUpperCase(),
    dni: z.string().refine((dni) => !isNaN(parseInt(dni)), {
      message: "Debe ser un número",
    }),
    num_pago: z.string().refine((num) => !isNaN(parseInt(num)), {
      message: "Debe ser un número",
    }),
    tipo_part: z
      .string()
      .min(2, { message: "Debe escoger una opción" })
      .trim()
      .toUpperCase(),
    med_pago: z
      .string()
      .min(2, { message: "Debe escoger una opción" })
      .trim()
      .toUpperCase(),
    email: z.string().email({ message: "Debe ser un correo válido" }),
    tel: z
      .string()
      .refine((tel) => !isNaN(parseInt(tel)) || tel.includes("+"), {
        message: "Debe ser un número válido",
      }),
  })
  .superRefine((values, ctx) => {
    // Validación condicional basada en tipo_part
    if (values.tipo_part.toLowerCase() === "empresa") {
      if (!values.ruc) {
        ctx.addIssue({
          path: ["ruc"],
          message: "El RUC es obligatorio para empresas",
        });
      }
      if (!values.raz_soc) {
        ctx.addIssue({
          path: ["raz_soc"],
          message: "La razón social es obligatoria para empresas",
        });
      }
    }
  });
