const fs = require('fs');
require("dotenv").config();
const { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } = require('@aws-sdk/client-sqs');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

// Configurar los clientes SQS y SES
const sqsClient = new SQSClient({ region: process.env.AWS_REGION });
const sesClient = new SESClient({ region: process.env.AWS_REGION });

// Función para generar la factura y guardarla como un archivo JSON
const generateInvoice = async (orderData) => {
  const invoiceData = {
    orderId: orderData.orderId,
    customerEmail: orderData.customerEmail,
    items: orderData.items,
    total: orderData.total,
    createdAt: new Date().toISOString(),
  };

  const filePath = `./invoice-${orderData.orderId}.json`;

  // Guardar la factura como archivo JSON
  fs.writeFileSync(filePath, JSON.stringify(invoiceData, null, 2));

  console.log('Factura generada:', filePath);
  return filePath;
};

// Función para enviar la factura por correo electrónico
const sendInvoiceEmail = async (customerEmail, filePath) => {
  const params = {
    Source: process.env.SES_SOURCE_EMAIL, // Reemplazar con tu email verificado en SES
    Destination: {
      ToAddresses: [customerEmail],
    },
    Message: {
      Subject: {
        Data: 'Tu Factura',
      },
      Body: {
        Text: {
          Data: 'Adjunto encontrarás la factura de tu pedido.',
        },
      },
    },
    Attachments: [{
      Name: filePath.split('/').pop(),
      Content: fs.readFileSync(filePath).toString('base64'),
      ContentType: 'application/json',
    }],
  };

  try {
    const data = await sesClient.send(new SendEmailCommand(params));
    console.log('Correo enviado con factura:', data.MessageId);
  } catch (error) {
    console.error('Error enviando correo:', error);
  }
};

// Función para procesar un mensaje de SQS
const processInvoice = async (messageBody) => {
  const orderData = JSON.parse(messageBody);

  // 1. Generar la factura
  const invoiceFilePath = await generateInvoice(orderData);

  // 2. Enviar la factura por correo
  await sendInvoiceEmail(orderData.email, invoiceFilePath);

  // 3. Eliminar el archivo local
  fs.unlinkSync(invoiceFilePath);
  console.log('Archivo de factura eliminado:', invoiceFilePath);
};

// Función para consultar SQS cada 5 segundos
const pollQueue = async () => {
  const params = {
    QueueUrl: process.env.SQS_QUEUE_URL, // URL de tu cola SQS
    MaxNumberOfMessages: 10, // Recibir hasta 10 mensajes por vez
    WaitTimeSeconds: 20, // Long polling para reducir el costo
  };

  try {
    const data = await sqsClient.send(new ReceiveMessageCommand(params));

    if (data.Messages) {
      for (const message of data.Messages) {
        console.log('Mensaje recibido:', message.Body);

        // Procesar el mensaje (generar factura y enviar email)
        await processInvoice(message.Body);

        // Eliminar el mensaje de la cola después de procesarlo
        const deleteParams = {
          QueueUrl: process.env.SQS_QUEUE_URL,
          ReceiptHandle: message.ReceiptHandle,
        };
        await sqsClient.send(new DeleteMessageCommand(deleteParams));
        console.log('Mensaje eliminado de la cola:', message.MessageId);
      }
    }
  } catch (error) {
    console.error('Error recibiendo mensajes de SQS:', error);
  }
};

// Ejecutar el polling cada 5 segundos
setInterval(pollQueue, 5000); // Poll cada 5 segundos
