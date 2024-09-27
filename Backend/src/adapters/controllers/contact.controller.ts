import { Request, Response } from 'express';
import { createContactUseCase, getAllContactUseCase, changeStatusUseCase } from '../../useCases/contact/CRUD.useCase';

const newContactController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, phone, email, subject, description } = req.body;

        let isError = validinputs(req.body);
        if (!isError.ok) {
            return res.status(400).json({
                ok: false,
                message: isError.message
            });
        }

        const isCreated = await createContactUseCase(name, phone, email, subject, description);
        if (isCreated?.message) {
            return res.status(400).json({
                ok: false,
                message: isCreated.message
            })
        }

        return res.status(201).json({
            ok: true,
            message: 'Contact created Succesfully',
            data: isCreated,
        });

    } catch (error) {
        console.error('NewUserController', error);
        return res.status(400).json({
            ok: false,
            message: error
        });
    }
}

const getAllContactController = async (_: Request, res: Response): Promise<any> => {
    try {
        const allContacts = await getAllContactUseCase();

        if (!allContacts) {
            console.error("Error al obtener Contacts");
            return res.status(400).json({
                ok: false,
                message: 'Error al obtener Contacts'
            })
        }
        return res.status(200).json({
            ok: true,
            message: 'Succesfully',
            data: allContacts,
        })

    } catch (error) {
        console.error('getUserController', error);
        return res.status(400).json({
            ok: false,
            message: error
        })
    }
}

const changeStatusController = async (req: Request, res: Response): Promise<any> => {
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

        const user = await changeStatusUseCase(key, newValue);

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
        return res.status(400).json({
            ok: false,
            message: error
        })
    }
}

function validinputs(cs_reqbody: any) {
    for (let idx = 0; idx < Object.keys(cs_reqbody).length; idx++) {
        const key = Object.keys(cs_reqbody)[idx]
        const value: any = Object.values(cs_reqbody)[idx];

        if (Array.isArray(value) || (typeof value === 'object' && !Array.isArray(value))) {
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

module.exports = {
    newContactController,
    getAllContactController,
    changeStatusController,
}