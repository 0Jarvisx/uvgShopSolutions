import { Request, Response } from "express";
import { createUseCase, getProductsUseCase, deleteProductUseCase, updateProductUseCase, getSingleProductUseCase, createReviewUseCase } from '../../useCases/product/CRUD.useCase';


const newProductController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, description, brand_id, category_id, stock, images, price, details, reviews } = req.body;
        let isError = validinputs(req.body);

        if (!isError.ok) {
            return res.status(400).json({
                ok: false,
                message: isError.message
            });
        }

        const isCreated = await createUseCase(name, description, brand_id, category_id, stock, images, price, details, reviews);
        if (isCreated?.message) {
            return res.status(400).json({
                ok: false,
                message: isCreated.message
            });
        }

        return res.status(201).json({
            ok: true,
            message: 'Product created Succesfully',
            data: isCreated,
        });
    } catch (error) {
        console.error('NewUserController', error);
        return res.status(400).json({
            ok: false,
            message: error
        })
    }
}

const getProductsController = async (_: Request, res: Response): Promise<any> => {
    try {
        const allProducts = await getProductsUseCase();

        if (!allProducts) {
            console.error("Error al obtener usuarios");
            return res.status(400).json({
                ok: false,
                message: 'Error al obtener usuarios'
            })
        }
        return res.status(200).json({
            ok: true,
            message: 'Succesfully',
            data: allProducts,
        })

    } catch (error) {
        console.error('getUserController', error);
        return res.status(400).json({
            ok: false,
            message: error
        })
    }
}

const updateProductController = async(req:Request, res:Response):Promise <any> =>{
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

        const user = await updateProductUseCase(key, newValue);

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

const deleteProductController = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const isDeleted = deleteProductUseCase(id);

    if (!isDeleted) {
        return res.status(400).json({
            ok: false,
            message: `Cannot delete Product with id ${id} `
        })
    }
    return res.status(200).json({
        ok: true,
        message: 'Succesfully deleted Product'
    })
}

const getSingleProductController = async (req: Request, res:Response): Promise<any> => {
    try {
        const { data } = req.params;

        let dataObject = JSON.parse(atob(data));

        const brand = await getSingleProductUseCase(dataObject);

        if (!brand) {
            return res.status(400).json({
                ok: false,
                message: `Cannot find product`,
            });
        }

        return res.status(201).json({
            ok: true,
            message: "Succesfully get product",
            data: brand,
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: error,
        });
    }

}

const createReviewController = async (req: Request, res: Response): Promise<any> => {
    try {
        const {product_id} = req.params;
        const { user_id, user_name, title_comment, comment, rating } = req.body;
        let isError = validinputs(req.body);

        if (!isError.ok) {
            return res.status(400).json({
                ok: false,
                message: isError.message
            });
        }

        const isCreated = await createReviewUseCase(product_id, user_id, user_name, title_comment, comment, rating );
        if (isCreated?.message) {
            return res.status(400).json({
                ok: false,
                message: isCreated.message
            });
        }

        return res.status(201).json({
            ok: true,
            message: 'Product created Succesfully',
            data: isCreated,
        });
    } catch (error) {
        console.error('NewUserController', error);
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
    newProductController,
    getProductsController,
    deleteProductController,
    updateProductController,
    getSingleProductController,
    createReviewController
}