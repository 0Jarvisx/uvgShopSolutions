
import { Request, Response } from "express";
import { cardActiveUseCase, createCartUseCase, updateTotalCartUseCase, deleteCartUseCase, getAllCartsUseCase, updateCartUseCase, payOrderUseCase, } from '../../useCases/order/CRUD.useCase';
import { createDetailUseCase, getDetailUseCase, updateDetailUseCase, deleteDetailUseCase } from '../../useCases/detail_order/CRUD.useCase';
//import { getSingleUserUseCase } from '../../useCases/user/CRUD.useCase';

const addToCartController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { user_id } = req.params;
        const { product_id, price } = req.body;
        let isError = validinputs(req.body);

        if (!isError.ok) {
            return res.status(400).json({
                ok: false,
                message: isError.message
            });
        }
        let order = await cardActiveUseCase(user_id);

        if (!order) {
            let newOrder = await createCartUseCase(user_id, "65cbb3a92e845d222d204f22");
            if (newOrder?.message) {
                return res.status(400).json({
                    ok: false,
                    message: newOrder.message
                });
            }
            order.id = newOrder.id
        }

        const createDetail = await createDetailUseCase(order.id, product_id, price);

        if (createDetail?.message) {
            return res.status(400).json({
                ok: false,
                message: createDetail.message
            });
        }

        /* Sumar en Order el total + subtotal*/
        const updateTotalOrder = updateTotalCartUseCase(order.id, order.total, createDetail.subtotal)
        if (!updateTotalOrder) return res.status(400).json({
            ok: false,
            message: 'Error'
        });

        return res.status(201).json({
            ok: true,
            message: 'Product added Succesfully',
            data: createDetail,
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: error
        })
    }
}

const getAllCartsController = async (_: Request, res: Response): Promise<any> => {
    try {
        const allCarts = await getAllCartsUseCase();

        if (!allCarts) {
            console.error("Error al obtener usuarios");
            return res.status(400).json({
                ok: false,
                message: 'Error al obtener usuarios'
            })
        }
        return res.status(200).json({
            ok: true,
            message: 'Succesfully',
            data: allCarts,
        })

    } catch (error) {
        console.error('getUserController', error);
        return res.status(400).json({
            ok: false,
            message: error
        })
    }
}

const getCartController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { user_id } = req.params;

        let order = await cardActiveUseCase(user_id);

        if (!order) return res.status(400).json({
            ok: false,
            message: 'NOT FOUND',
            data: []
        })
        let details = await getDetailUseCase(order.id);

        if (!details || details.length === 0) {
            return res.status(200).json({
                ok: true,
                message: 'Not found Details',
                data: []
            })
        } else {

            return res.status(200).json({
                ok: false,
                message: 'Succesfully',
                data: {
                    ...order,
                    details
                }
            })
        }


    } catch (error) {

    }
}

const updateCartController = async (req: any, res: any): Promise<any> => {
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

        const user = await updateCartUseCase(key, newValue);

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

    }
}

const updateDetailController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { order_id } = req.params;
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

        const detail = await updateDetailUseCase(key, newValue);

        if (!detail || detail.length === 0) {
            return res.status(200).json({
                ok: true,
                message: 'Not found Details',
                data: []
            })
        } else {

            let details = await getDetailUseCase(order_id);
            let tmp_total: number = 0;
            for (let idx = 0; idx < details.length; idx++) {
                const element = details[idx];
                tmp_total += element.subtotal;
            }

            const updateTotalOrder = updateTotalCartUseCase(order_id, tmp_total);
            if (!updateTotalOrder) return res.status(400).json({
                ok: false,
                message: 'Error'
            });

            return res.status(200).json({
                ok: false,
                message: 'Succesfully',
                data: {
                    detail
                }
            })
        }


    } catch (error) {
        console.error('UpdateController', error);
        return res.status(400).json({
            ok: false,
            message: error
        })
    }
}

const deleteCartController = async (req: Request, res: Response): Promise<any> => {
    const { order_id } = req.params;

    const isDeletedDetail = deleteDetailUseCase(order_id, 'many');

    if (!isDeletedDetail) {
        return res.status(400).json({
            ok: false,
            message: `Cannot delete Cart with id ${order_id} `
        })
    }

    const isDeleted = deleteCartUseCase(order_id);

    if (!isDeleted) {
        return res.status(400).json({
            ok: false,
            message: `Cannot delete Cart with id ${order_id} `
        })
    }

    return res.status(200).json({
        ok: true,
        message: 'Succesfully deleted Cart'
    })

}

const deleteDetailController = async (req: Request, res: Response): Promise<any> => {
    const { order_id, id } = req.params;

    const isDeletedDetail = deleteDetailUseCase(id, 'one');

    if (!isDeletedDetail) {
        return res.status(400).json({
            ok: false,
            message: `Cannot delete Detail with id ${id} `
        })
    }

    let details = await getDetailUseCase(order_id);
    let tmp_total: number = 0;
    for (let idx = 0; idx < details.length; idx++) {
        const element = details[idx];
        tmp_total += element.subtotal;
    }

    const updateTotalOrder = updateTotalCartUseCase(order_id, tmp_total);
    if (!updateTotalOrder) return res.status(400).json({
        ok: false,
        message: 'Error'
    });

    return res.status(200).json({
        ok: true,
        message: 'Succesfully deleted Detail'
    })
}

const payOrderController = async (req: Request, res: Response): Promise<any> => {
    try {
        /* Esto espera el jwt */
        const { order_id, user_id, card, nit, address, total } = req.body;
        let isError = validinputs(req.body);

        if (!isError.ok) {
            return res.status(400).json({
                ok: false,
                message: isError.message
            });
        }

        const infoCard = await payOrderUseCase(card)
        if (!infoCard) return res.status(200).json({
            ok: false,
            message: 'Card Expired'
        })
        /* UPDATE ORDER */
        const updateCart = await updateCartController({
            body: {
                key: {
                    "_id": order_id
                },
                newValue: {
                    user_id,
                    status_id: "123456",
                    card,
                    nit, address, total
                }
            }
        }, {})
        console.log(updateCart);

        return res.status(200).json({ infoCard })

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
    addToCartController,
    getCartController,
    updateDetailController,
    deleteCartController,
    deleteDetailController,
    getAllCartsController,
    updateCartController,
    payOrderController
}