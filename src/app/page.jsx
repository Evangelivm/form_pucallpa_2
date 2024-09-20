"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Steps from "./steps";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "./valid/userSchema";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTransaction } from "./context/TransactionContext";
import {
  Loader2,
  Banknote,
  Smartphone,
  Briefcase,
  User,
  GraduationCap,
} from "lucide-react";

function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { setTransactionData } = useTransaction();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [tipoParticipante, setTipoParticipante] = useState("");
  const [medioPago, setMedioPago] = useState("");
  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setImageFile(file);
  //   }
  // };
  // useEffect(() => {
  //   console.log("Progress phase:", progress);
  // }, [progress]); // Se ejecutará cada vez que cambie 'progress'
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast.error("Hay errores en el formulario");
    }
  }, [errors]);
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    //console.log("Formulario enviado con datos:", data); // Verifica los datos del formulario
    try {
      // Crear una instancia de FormData
      const formData = new FormData();
      formData.append("tipo_part", data.tipo_part);
      formData.append("nombre", data.nombre);
      formData.append("apellido", data.apellido);
      formData.append("email", data.email);
      formData.append("dni", data.dni);
      formData.append("telefono", data.tel);
      formData.append("med_pago", data.med_pago);
      formData.append("num_pago", data.num_pago);
      // Calcular el monto basado en el tipo de participante
      let monto = "";
      if (tipoParticipante === "estudiante") {
        monto = "120";
      } else if (tipoParticipante === "profesional") {
        monto = "350";
      } else if (tipoParticipante === "empresa") {
        monto = "350";
      }

      // Agregar el monto a formData
      formData.append("monto", monto);
      // Enviar datos al servidor
      const response = await axios.post("/api/sendInfo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //console.log("Datos enviados con éxito:", response.data);
      // Manejo de respuesta o notificación de éxito
      //toast.success("Registro exitoso");
      if (response.data) {
        setIsSubmitting(false);
        router.push("/success");
      } else {
        console.error("Error al enviar los datos");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Manejo de error o notificación
      toast.error("Error al enviar los datos");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="p-4">
      <Toaster richColors position="top-center" />
      <Card className="mx-auto md:p-2 md:max-w-5xl sm:max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">
            Inscripci&oacute;n al Evento Top Petrolero del 2024
          </CardTitle>
          <CardDescription>
            Ingrese su informaci&oacute;n de registro para inscribirse
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <Label htmlFor="nombre" className="text-md">
                {progress === 0 && "Paso 1: Datos Personales"}
                {progress === 1 && "Paso 2: Pago"}
              </Label>

              <Steps
                number={progress === 0 ? 50 : progress === 1 ? 100 : null}
              />

              {/* primera seccion */}
              {progress === 0 && (
                <>
                  <div className="grid gap-4 sm:gap-2 md:grid-cols-3 md:gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="tipo_part">Tipo de Participante</Label>
                      <Controller
                        name="tipo_part" // El nombre que deseas usar en el formulario
                        control={control}
                        defaultValue="" // Valor por defecto
                        render={({ field: { value, onChange } }) => (
                          <Select
                            value={value}
                            onValueChange={(newValue) => {
                              onChange(newValue);
                              setTipoParticipante(newValue); // Actualizar estado
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione un tipo de participante" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="empresa">
                                <div className="flex items-center">
                                  <Briefcase className="w-4 h-4 mr-2" />
                                  Empresa
                                </div>
                              </SelectItem>
                              <SelectItem value="profesional">
                                <div className="flex items-center">
                                  <User className="w-4 h-4 mr-2" />
                                  Profesional
                                </div>
                              </SelectItem>
                              <SelectItem value="estudiante">
                                <div className="flex items-center">
                                  <GraduationCap className="w-4 h-4 mr-2" />
                                  Estudiante
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />

                      {errors.tipo_part && (
                        <p className="text-xs text-red-600 px-2">
                          {errors.tipo_part.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="nombre">Nombres</Label>
                      <Input
                        id="nombre"
                        placeholder="Juan"
                        required
                        {...register("nombre")}
                      />
                      {errors.nombre?.message && (
                        <p className="text-xs text-red-600 px-2">
                          {errors.nombre?.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="apellido">Apellidos</Label>
                      <Input
                        id="apellido"
                        placeholder="Perez"
                        required
                        {...register("apellido")}
                      />
                      {errors.apellido?.message && (
                        <p className="text-xs text-red-600 px-2">
                          {errors.apellido?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-4 sm:gap-2 md:grid-cols-3 md:gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Correo Electr&oacute;nico</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@ejemplo.com"
                        required
                        {...register("email")}
                      />
                      {errors.email?.message && (
                        <p className="text-xs text-red-600 px-2">
                          {errors.email?.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="dni">DNI/CE</Label>
                      <Input
                        id="dni"
                        type="number"
                        placeholder="DNI o Carnet de Extranjer&iacute;a"
                        required
                        {...register("dni")}
                      />
                      {errors.dni?.message && (
                        <p className="text-xs text-red-600 px-2">
                          {errors.dni?.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tel">Celular</Label>
                      <Input
                        id="tel"
                        type="tel"
                        placeholder="Ingrese n&uacute;mero de tel&eacute;fono"
                        required
                        {...register("tel")}
                      />
                      {errors.tel?.message && (
                        <p className="text-xs text-red-600 px-2">
                          {errors.tel?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* segunda seccion */}
              {progress === 1 && (
                <>
                  <div>
                    <div className="grid gap-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Monto a Pagar</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-md text-muted-foreground">
                            <b>
                              {tipoParticipante === "estudiante" &&
                                "S/. 120.00"}
                              {tipoParticipante === "profesional" &&
                                "S/. 350.00"}
                              {tipoParticipante === "empresa" && "S/. 350.00"}
                            </b>{" "}
                            -{" "}
                            {tipoParticipante === "estudiante" &&
                              "Ciento Veinte Nuevos Soles"}
                            {tipoParticipante === "profesional" &&
                              "Trescientos Cincuenta Nuevos Soles"}
                            {tipoParticipante === "empresa" &&
                              "Trescientos Cincuenta Nuevos Soles"}
                          </p>
                          <hr className="my-4" />
                          <p className="text-sm font-semibold">
                            Instrucciones para el Pago:
                          </p>
                          <ul className="list-disc ml-6 mt-2 text-sm">
                            <li>
                              Seleccione uno de los medios de pago disponibles
                              (Yape, Plin o Transferencia).
                            </li>
                            <li>
                              Para Yape o Plin, realice el pago al número{" "}
                              <b>933928962</b>.
                            </li>
                            <li>
                              Para Transferencias Bancarias, use la cuenta BBVA{" "}
                              <b>0011-0982-0100020971</b>.
                            </li>
                            <li>
                              Ingrese el número de operación en el campo
                              correspondiente.
                            </li>
                          </ul>
                          <p className="text-xs text-muted-foreground mt-2">
                            Nota: Asegúrese de completar correctamente todos los
                            datos antes de continuar.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:gap-2 md:grid-cols-2 md:gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="posicion">Medio de Pago</Label>
                      <Controller
                        name="med_pago"
                        control={control}
                        defaultValue=""
                        render={({ field: { value, onChange } }) => (
                          <Select
                            value={value}
                            onValueChange={(newValue) => {
                              onChange(newValue);
                              setMedioPago(newValue); // Actualizar estado
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione un medio de pago" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="transferencia">
                                <div className="flex items-center">
                                  <Banknote
                                    className="w-4 h-4 mr-2"
                                    color="#13d84e"
                                  />
                                  Transferencia
                                </div>
                              </SelectItem>
                              <SelectItem value="plin">
                                <div className="flex items-center">
                                  <Smartphone
                                    className="w-4 h-4 mr-2"
                                    color="#5fb4ae"
                                  />
                                  Plin (945709570)
                                </div>
                              </SelectItem>
                              <SelectItem value="yape">
                                <div className="flex items-center">
                                  <Smartphone
                                    className="w-4 h-4 mr-2"
                                    color="#9a2bb1"
                                  />
                                  Yape (945709570)
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.med_pago && (
                        <p className="text-xs text-red-600 px-2">
                          {errors.med_pago.message}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="num_pago">Número de Operación</Label>
                      <Input
                        id="num_pago"
                        placeholder="Número de Operación"
                        required
                        {...register("num_pago")}
                      />
                      {errors.num_pago?.message && (
                        <p className="text-xs text-red-600 px-2">
                          {errors.num_pago?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-center">
                {progress > 0 && (
                  <>
                    <Button
                      className="w-full mt-4 md:w-1/4 mr-2 bg-gray-400 hover:bg-gray-300 text-gray-800"
                      type="button"
                      onClick={() => {
                        setProgress((prevProgress) => prevProgress - 1);
                      }}
                    >
                      Antes
                    </Button>
                  </>
                )}
                {progress === 1 && (
                  <>
                    <Button
                      type="submit"
                      className="w-full mt-4 md:w-1/4 mr-2 bg-green-700 hover:bg-green-600 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviando
                        </>
                      ) : (
                        <>Registrar</>
                      )}
                    </Button>
                  </>
                )}
                {progress < 1 && (
                  <>
                    <Button
                      className="w-full mt-4 md:w-1/4 bg-gray-600 hover:bg-gray-500 text-white"
                      type="button"
                      onClick={() => {
                        setProgress((prevProgress) => prevProgress + 1);
                      }}
                    >
                      Siguiente
                    </Button>
                  </>
                )}
                {/* <div>{JSON.stringify(watch(errors), null, 2)}</div> */}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default LoginForm;
