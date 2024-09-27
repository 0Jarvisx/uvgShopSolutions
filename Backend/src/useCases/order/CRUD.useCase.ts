const jwt = require('jsonwebtoken');
const { findCartActiveRepository, createCartRepository, updateCartRepository, deleteCartRepository, getAllCartsRepository } = require('../../adapters/repositories/order.repository');
const KEY = process.env.ECP_SECRET_KEY || 'ca0fe551ba1b5ced08dd49413340569c11830b671895f75ceaea84b2f15b9758';

export const getAllCartsUseCase = async (): Promise<any> => {
    const allCarts = await getAllCartsRepository();
    if (!allCarts) return false;
    return allCarts;
}

export const cardActiveUseCase = async (user_id: string): Promise<any> => {

    user_id = replaceObjectId(user_id);

    const order = await findCartActiveRepository(user_id);

    return (order) ? {
        id: order._id,
        user_id: order.user_id,
        status: order.status_id,
        total: order.total
    } : false
}

export const createCartUseCase = async (user_id: string, status_id: string): Promise<any> => {
    const order = await createCartRepository(user_id, status_id, 0, Date.now());
    if (order?.message) {
        let message = '';
        message = `${Object.values(order.message.errors)[0]}`
        return {
            ok: false,
            message: message
        }
    }

    return {
        id: order._id,
        user_id: order.user_id,
        card: order.card,
        nit: order.nit,
        date: order.date,
        address: order.address,
        total: order.total,
        created_at: order.created_at
    };
}

export const updateTotalCartUseCase = async (id: string, total: number, subtotal: number = 0): Promise<any> => {

    id = replaceObjectId(id.toString())
    let newTotal = total + subtotal
    let newValue = { "total": newTotal };
    const updateOrder = await updateCartRepository({ "_id": id }, newValue);
    if (updateOrder?.message) return false;

    return updateOrder
}

export const updateCartUseCase = async (key: any, newValue: any): Promise<any> => {
    if (key?._id) key['_id'] = replaceObjectId(key['_id'].toString())
    const updateProduct = await updateCartRepository(key, newValue);
    if (updateProduct?.message) return false;

    let updateValue = newValue
    return updateValue
}

export const deleteCartUseCase = async (id: string) => {
    id = replaceObjectId(id);
    const deleteCart = await deleteCartRepository(id);

    if (deleteCart?.message) return false

    return deleteCart
}

export const payOrderUseCase = async (jwtCard: string): Promise<any> => {
    const infoCard = jwt.verify(jwtCard, KEY);

    let isError = validinputs(infoCard);

    if (!isError.ok) {
        return {
            ok: false,
            message: isError.message
        };
    }

   // const cardDate: any = new Date(`${infoCard.due_date}`);
    const cardDate: any = new Date(`2024-03-30`); //para pruebas

    const currentDate: any = new Date();

    const diff = Math.ceil((cardDate - currentDate) / (1000 * 60 * 60 * 24));

    if (diff > 0) {
        /* API PARA REALIZAR EL PAGO */
        return infoCard
    } else if (diff < 0) {
        return false;
    }
    return infoCard
}

function replaceObjectId(cs_id: string) {
    cs_id = cs_id.replace("new ObjectId('", '');
    cs_id = cs_id.replace("')", '');
    return cs_id;
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
