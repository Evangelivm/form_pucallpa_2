import { z } from "zod";

export const userSchema = z.object({
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
  num_pago: z.string().refine((dni) => !isNaN(parseInt(dni)), {
    message: "Debe ser un número",
  }),
  tipo_part: z
    .string()
    .min(2, { message: "Debe escoger una opcion" })
    .trim()
    .toUpperCase(),
  med_pago: z
    .string()
    .min(2, { message: "Debe escoger una opcion" })
    .trim()
    .toUpperCase(),

  email: z.string().email({ message: "Colocar un correo válido" }),
  tel: z.string().refine((tel) => !isNaN(parseInt(tel)) || tel.includes("+"), {
    message: "Debe ser un número válido",
  }),
});
