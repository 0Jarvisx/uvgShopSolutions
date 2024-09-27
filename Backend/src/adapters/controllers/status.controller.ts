import { Request, Response } from 'express';
import { createStatusUseCase,  getStatusesUseCase, updateStatusUseCase, deleteStatusUseCase, getSingleStatusUseCase } from '../../useCases/status/CRUD.useCase'

const newStatusController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, belong} = req.body;

        let isError = validinputs(req.body);

        if (!isError.ok) {
            return res.status(400).json({
                ok: false,
                message: isError.message
            })
        }

        const isCreated = await createStatusUseCase(name, belong);
        if (isCreated?.message) {
            return res.status(400).json({
                ok: false,
                message: isCreated.message
            })
        }

        return res.status(201).json({
            ok: true,
            message: 'Status created Succesfully',
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
const getStatusController = async (_: Request, res: Response): Promise<any> => {
    try {
        const allUsers = await getStatusesUseCase();

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

const updateStatusController = async (req: Request, res: Response): Promise<any> => {
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

        const user = await updateStatusUseCase(key, newValue);

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

const deleteStatusController = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    const isDeleted = deleteStatusUseCase(id);

    if (!isDeleted) {
        return res.status(400).json({
            ok: false,
            message: `Cannot delete status with id ${id} `
        })
    }
    return res.status(200).json({
        ok: true,
        message: 'Succesfully deleted status'
    })
}

const getSingleStatusController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { data } = req.params;

        let dataObject = JSON.parse(atob(data));

        const status = await getSingleStatusUseCase(dataObject);

        if (!status) {
            return res.status(400).json({
                ok: false,
                message: `Cannot find status`,
            });
        }

        return res.status(201).json({
            ok: true,
            message: "Succesfully get status",
            data: status,
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: error,
        });
    }
}

function validinputs(cs_reqbody: any) {
    for (let idx = 0; idx < Object.keys(cs_reqbody).length; idx++) {
        const key = Object.keys(cs_reqbody)[idx]
        const value: any = Object.values(cs_reqbody)[idx];

        if (Array.isArray(value)) {
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
    newStatusController,
    getStatusController,
    updateStatusController,
    deleteStatusController,
    getSingleStatusController,
}