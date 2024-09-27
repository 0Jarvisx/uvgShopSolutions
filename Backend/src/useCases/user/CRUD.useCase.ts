const { createUserRepository, getAllUsers, updateUserRepository, deleteUserRepository, getSingleUserRepository } = require('../../adapters/repositories/user.repository')
import { hashPassword } from '../../encrypter/passwordEncrypter'
//import { encrypt } from '../../encrypter/dataEncrypter';

export const createUseCase = async (name: string, password: string, email: string, phoneNumber: string, role: string, address: [], cards: []): Promise<any> => {

    /* Encriptado de contrasena*/
    let passwordhash = await hashPassword(password).then((hashedPassword) => {
        return hashedPassword;
    }).catch((error) => {
        console.error('Error al hashear la contraseña:', error);
        return false;
    });

    if (!passwordhash) return {
        ok: false,
        message: "ERROR"
    }


    const user = await createUserRepository(name, passwordhash, email, phoneNumber, role, address, cards, Date.now());

    /* Manejo de Errores */
    if (user?.message) {
        let message = '';
        (user?.message?.keyValue) ? message = 'An account already exists with this email' : message = `${Object.values(user.message.errors)[0]}`
        message = message.replace('Path ', 'The ').replaceAll('`', '');
        return {
            ok: false,
            message: message
        }
    }

    return {
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email,
        role: user.role,
        address: user.address,
        cards: user.cards,
        created_at: user.created_at
    };
}

export const getUsersUseCase = async () => {
    const allUsers = await getAllUsers();

    if (!allUsers) return false;
    return allUsers;
}

export const updateUserUseCase = async (key: any, newValue: any) => {
    /* Esto es en caso el id venga de la siguiente forma "ObjectId('qwefsd345365431f') */
    if (key?._id) key['_id'] = replaceObjectId(key['_id'])
    const updateUser = await updateUserRepository(key, newValue);

    if (updateUser?.message) return false;

    let updateValue = newValue
    return updateValue
}

export const deleteUseCase = async (id: string) => {
    id = replaceObjectId(id);
    const deleteUser = await deleteUserRepository(id);

    if (deleteUser?.message) return false

    return deleteUser
}

export const getSingleUserUseCase = async (data: any) => {
    const isID = Object.keys(data).includes("_id");

    if (isID) {
        data["_id"] = replaceObjectId(data["_id"]);
    }

    const user = await getSingleUserRepository(data);

    if (user?.message) return false;
    return user;
};

function replaceObjectId(cs_id: string) {
    cs_id = cs_id.replace("ObjectId('", '');
    cs_id = cs_id.replace(`')`, '');
    return cs_id;
}
