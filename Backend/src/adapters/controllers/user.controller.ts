import { Request, Response } from 'express';
import { loginUseCase } from '../../useCases/user/login.useCase';
import { createUseCase, getUsersUseCase, updateUserUseCase, deleteUseCase, getSingleUserUseCase } from '../../useCases/user/CRUD.useCase';

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_KEY || '2549ccce75d879c239209090f7c4607d9afda790e21d7987a50bc4701ca8e6df';
const KEY = process.env.ECP_SECRET_KEY || 'ca0fe551ba1b5ced08dd49413340569c11830b671895f75ceaea84b2f15b9758';

const loginUserController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email } = req.params;
        const { password } = req.body
        /* encrypt password */

        const user = await loginUseCase(email, password);
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'Credenciales Invalidas'
            })
        }

        const token = jwt.sign(user, secret)
        res.cookie('jwt', token)
        return res.status(200).json({
            ok: true,
            message: 'Inicio de sesion con éxito',
            data: user,
        })
    } catch (error) {
        console.error('LoginUserController', error);
        return res.status(400).json({
            ok: false,
            message: error
        })
    }

}

const newUserController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, password, email, phoneNumber, role, address, cards } = req.body;

        let isError = validinputs(req.body);

        if (!isError.ok) {
            return res.status(400).json({
                ok: false,
                message: isError.message
            })
        }

        let cardsJWT: any = [];
        let addressJWT: any = [];
        for (let idx = 0; idx < cards.length; idx++) {
            const element = cards[idx];
            let tmp_object: any = {};
            tmp_object['alias'] = element.alias;
            delete element.alias;
            tmp_object.info = jwt.sign(element, KEY)
            cardsJWT.push(tmp_object)
        }
        for (let idx = 0; idx < address.length; idx++) {
            const element = address[idx];
            let tmp_object: any = {};
            tmp_object['alias'] = element.alias;
            delete element.alias;
            tmp_object.address = jwt.sign(element, KEY)
            addressJWT.push(tmp_object)
        }
        const isCreated = await createUseCase(name, password, email, phoneNumber, role, addressJWT, cardsJWT);
        if (isCreated?.message) {
            return res.status(400).json({
                ok: false,
                message: isCreated.message
            })
        }

        return res.status(201).json({
            ok: true,
            message: 'User created Succesfully',
            data: isCreated,
        })
    } catch (error) {
        console.error('NewUserController', error);
        return res.status(400).json({
            ok: false,
            message: error
        })
    }
}

const getUsersController = async (_: Request, res: Response): Promise<any> => {
    try {
        const allUsers = await getUsersUseCase();

        if (!allUsers) {
            console.error("Error al obtener usuarios");
            return res.status(400).json({
                ok: false,
                message: 'Error al obtener usuarios'
            })
        }
        return res.status(200).json({
            ok: true,
            message: 'Succesfully',
            data: allUsers,
        })

    } catch (error) {
        console.error('getUserController', error);
        return res.status(400).json({
            ok: false,
            message: error
        })
    }
}

const updateUserController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { key, newValue } = req.body;

        let isErrorkey = validinputs(key);
        if (!isErrorkey.ok) {
            return res.status(400).json({
                ok: false,
                message: isErrorkey.message
            })
        }
        let isErrorvalue = validinputs(newValue);
        if (!isErrorvalue.ok) {
            return res.status(400).json({
                ok: false,
                message: isErrorvalue.message
            })
        }

        const user = await updateUserUseCase(key, newValue);

        if (!user) {
            return res.status(204).json({
                ok: false,
                message: 'Not Exists'
            });
        }

        return res.status(200).json({
            ok: true,
            message: 'Succesfully',
            data: user,
        })

    } catch (error) {
        console.error('UpdateUserController', error);
        return res.status(400).json({
            ok: false,
            message: error
        })
    }

}

const deleteUserController = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    const isDeleted = deleteUseCase(id);

    if (!isDeleted) {
        return res.status(400).json({
            ok: false,
            message: `Cannot delete user with id ${id} `
        })
    }
    return res.status(200).json({
        ok: true,
        message: 'Succesfully deleted user'
    })

}

const getSingleUserController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { data } = req.params;

        let dataObject = JSON.parse(atob(data));

        const user = await getSingleUserUseCase(dataObject);

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: `Cannot find user`,
            });
        }

        return res.status(201).json({
            ok: true,
            message: "Succesfully get user",
            data: user,
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: error,
        });
    }
};
function validinputs(cs_reqbody: any) {
    for (let idx = 0; idx < Object.keys(cs_reqbody).length; idx++) {
        const key = Object.keys(cs_reqbody)[idx]
        const value: any = Object.values(cs_reqbody)[idx];

        if (key === 'email') {
            if (isNull(value)) {
                return {
                    ok: false,
                    message: 'Required email'
                }
            } else {
                if (!isEmail(value)) return {
                    ok: false,
                    message: 'This email is Incorrect'
                }
            }
        } else if (key === 'password') {
            if (value.length < 6) return {
                ok: false,
                message: 'The password is shorter than the minimum allowed length (6)'
            }
        } else if (Array.isArray(value)) {
            for (let index = 0; index < value.length; index++) {
                for (let i = 0; i < Object.keys(value[index]).length; i++) {

                    const valueKey = Object.keys(value[index])[i]

                    const valueValue: any = Object.values(value[index])[i];
                    if (isNull(valueValue)) return {
                        ok: false,
                        message: `Required ${key} - ${valueKey}`
                    }
                }

            }

        } else if (isNull(value)) return {
            ok: false,
            message: `Required ${key}`
        }


    }
    return {
        ok: true,
        message: 'Its ok'
    }
}

function isNull(cs_param: any) {
    return (cs_param === '' || cs_param === null || cs_param === undefined);
}

function isEmail(correo: string) {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
}

module.exports = {
    loginUserController,
    newUserController,
    getUsersController,
    updateUserController,
    deleteUserController,
    getSingleUserController,

}