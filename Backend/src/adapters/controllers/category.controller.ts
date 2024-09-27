import { Request, Response } from 'express';
import { createcategoryUseCase, getAllCategoriesUseCase, deleteCategoryUseCase, updateCategoryUseCase, getSingleCategoryUseCase } from '../../useCases/category/CRUD.useCase';

const newCategoryController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, images, description } = req.body;

        let isError = validinputs(req.body);

        if (!isError.ok) {
            return res.status(400).json({
                ok: false,
                message: isError.message
            });
        }

        const isCreated = await createcategoryUseCase(name, images, description);
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
        });
    } catch (error) {
        console.error('NewUserController', error);
        return res.status(400).json({
            ok: false,
            message: error
        });
    }
}

const getCategoriesController = async (_: Request, res: Response): Promise<any> => {
    try {
        const allCategories = await getAllCategoriesUseCase();

        if (!allCategories) {
            console.error("Error al obtener Categories");
            return res.status(400).json({
                ok: false,
                message: 'Error al obtener Categories'
            })
        }
        return res.status(200).json({
            ok: true,
            message: 'Succesfully',
            data: allCategories,
        })

    } catch (error) {
        console.error('getUserController', error);
        return res.status(400).json({
            ok: false,
            message: error
        })
    }
}

const updateCategoryController = async (req:Request, res: Response): Promise <any> => {
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

        const user = await updateCategoryUseCase(key, newValue);

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
        console.error('UpdateController', error);
        return res.status(400).json({
            ok: false,
            message: error
        })
    }
}

const deleteCategoryController = async (req:Request, res:Response): Promise <any> => {
    const { id } = req.params;
    const isDeleted = deleteCategoryUseCase(id);

    if (!isDeleted) {
        return res.status(400).json({
            ok: false,
            message: `Cannot delete Category with id ${id} `
        })
    }
    return res.status(200).json({
        ok: true,
        message: 'Succesfully deleted Category'
    })
}

const getSingleCategoryController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { data } = req.params;

        let dataObject = JSON.parse(atob(data));

        const category = await getSingleCategoryUseCase(dataObject);

        if (!category) {
            return res.status(400).json({
                ok: false,
                message: `Cannot find category`,
            });
        }

        return res.status(201).json({
            ok: true,
            message: "Succesfully get category",
            data: category,
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
    newCategoryController,
    getCategoriesController,
    updateCategoryController,
    deleteCategoryController,
    getSingleCategoryController,
}