
//import userRepository from '../../adapters/repositories/user.repository';
const { loginRepository } = require('../../adapters/repositories/user.repository');
import { comparePassword } from '../../encrypter/passwordEncrypter'

export const loginUseCase = async (email: string, password: string): Promise<any> => {
    const user = await loginRepository(email);
    if (!user) return false;
    let prueba = await comparePassword(password, user.password)
        .then((result) => {
            if (result) {
                console.log('La contraseña es correcta.');
                return true;
            } else {
                console.log('La contraseña no es correcta.');
                return false;
            }
        })
        .catch((error) => {
            console.error('Error al comparar contraseñas:', error);
            return false;
        });
    if (prueba) {
        return {
            _id: user.id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            email: user.email,
            role: user.role
        };
    } else {
        return false;
    }

}