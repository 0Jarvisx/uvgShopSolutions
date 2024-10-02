const { SESClient, VerifyEmailIdentityCommand } = require('@aws-sdk/client-ses');
require("dotenv").config()
const sesClient = new SESClient({ region: process.env.AWS_REGION });

const verifyEmail = async (email) => {
  const params = {
    EmailAddress: email,
  };

  try {
    const data = await sesClient.send(new VerifyEmailIdentityCommand(params));
    console.log('Correo de verificación enviado a ${email}', data);
  } catch (error) {
    console.error('Error verificando el correo:', error);
  }
};

// Llamada a la función cuando el usuario se registre
verifyEmail('lin211105@uvg.edu.gt');