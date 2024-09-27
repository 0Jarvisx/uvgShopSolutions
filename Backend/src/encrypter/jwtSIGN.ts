import crypto from 'crypto';

/* ESTE CODIGO GENERA UNA CLAVE PARA FIRMAR TOKENS */
const generarClaveSecreta = () => {
    return crypto.randomBytes(32).toString('hex');
};

const claveSecreta = generarClaveSecreta();
console.log('Clave secreta generada:', claveSecreta)