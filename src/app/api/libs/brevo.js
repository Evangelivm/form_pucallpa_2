import * as brevo from "@getbrevo/brevo";
import dotenv from "dotenv";

dotenv.config();

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export async function sendEmail({ mail, name }) {
  try {
    const smtpEmail = new brevo.SendSmtpEmail();
    smtpEmail.subject = "Correo de confirmacion de Inscripcion";
    smtpEmail.to = [{ email: mail, name: name }];
    smtpEmail.htmlContent = `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pre-inscripción</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #f0f0f0;
        margin: 0;
        padding: 0 20px;
      }
      .confirmacion {
        background: white;
        border-radius: 10px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
        padding: 20px;
        max-width: 500px;
        text-align: center;
        border: 2px solid #4caf50;
      }
      .confirmacion img {
        max-width: 70%;
        height: auto;
        border-radius: 10px 10px 10px 10px;
      }
      .confirmacion h1 {
        color: #4caf50;
        font-size: 1.5em;
        margin-top: 10px;
      }
      .confirmacion h2 {
        color: #4caf50;
        font-size: 1.2em;
        margin-top: 10px;
      }
      .confirmacion p {
        color: #333;
        margin: 10px 0;
      }
      .confirmacion .detalle {
        font-size: 1em;
        color: #555;
      }
      .confirmacion .codigo {
        font-size: 1.2em;
        font-weight: bold;
        color: #ff5722;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .confirmacion .boton {
        display: inline-block;

        padding: 10px 20px;
        background-color: #4caf50;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        transition: background-color 0.3s ease;
      }
      .confirmacion .boton:hover {
        background-color: #388e3c;
      }
    </style>
  </head>
  <body>
    <div class="confirmacion">
      <img
        src="https://reactivapetrol.online/assets/img/speakers/evento2024.jpg"
        alt="Imagen del evento"
      />
      <h1>Confirmaci&oacute;n de Pre-inscripci&oacute;n</h1>

      <p class="detalle">
        <b>${name}</b>, su pre-inscripci&oacute;n ha sido procesada exitosamente.
      </p>
      <p class="detalle">
        <b>Foro Nacional:</b> Reactivaci&oacute;n Petrolera en la Region Ucayali
      </p>
      <p class="detalle"><b>Lugar:</b> Hotel Costa del Sol - Pucallpa</p>
      <p class="detalle"><b>Fecha del Evento:</b> 18 de Octubre de 2024</p>
      <p class="detalle"><b>Hora:</b> 08:00 AM - 18:00 PM</p>
          <div style="padding-top: 10px;">
            <a
              class="boton"
              href='http://reactivapetrol.online'"
            >
              Ver Detalles del Evento
          </a>
          </div>

    </div>
  </body>
</html>


    `;
    smtpEmail.sender = {
      name: "Inscripciones",
      email: "inscripciones@reactivapetrol.online",
    };
    await apiInstance.sendTransacEmail(smtpEmail);
  } catch (error) {
    console.error(error);
  }
}
