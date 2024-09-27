const { createDetailRepository, getDetailRepository, updateDetailRepository, deleteManyDetailsRepository, deleteOneDetailRepository } = require('../../adapters/repositories/detail_order.repository');

export const createDetailUseCase = async (order_id: string, product_id: string, subtotal: number): Promise<any> => {

    order_id = replaceObjectId(order_id.toString());
    product_id = replaceObjectId(product_id);

    const newDetail = await createDetailRepository(order_id, product_id, '', 1, subtotal);
    if (newDetail?.message) {
        let message = '';
        message = `${Object.values(newDetail.message.errors)[0]}`;
        return {
            ok: false,
            message: message
        }
    }
    return {
        order_id: newDetail.order_id,
        product_id: newDetail.product_id,
        address: newDetail.address,
        quantity: newDetail.quantity,
        subtotal: newDetail.subtotal
    };

}

export const getDetailUseCase = async (order_id: string): Promise<any> => {
    order_id = replaceObjectId(order_id.toString());

    const details = await getDetailRepository(order_id);
    let tmp_details: any = [];
    for (let idx = 0; idx < details.length; idx++) {
        const element = details[idx];
        tmp_details.push({
            id: element._id,
            order_id: element.order_id,
            product_id: element.product_id,
            address: element.address,
            quantity: element.quantity,
            subtotal: element.subtotal
        })
    }
    return tmp_details;

}

export const updateDetailUseCase = async (key: any, newValue: any): Promise<any> => {
    key._id = replaceObjectId(key._id.toString())
    if(newValue?.quantity){
        newValue.subtotal = newValue.quantity * newValue.price
    }
    const updateOrder = await updateDetailRepository(key, newValue);
    if (updateOrder?.message) return false;
    let updateValue = newValue
    return updateValue
}

export const deleteDetailUseCase = async (id: string, type:string) => {
    id = replaceObjectId(id.toString());
    let deleteDetail;
    switch (type) {
        case 'many':
            deleteDetail = await deleteManyDetailsRepository(id);
            break;

        case 'one':
            deleteDetail = await deleteOneDetailRepository(id);
            break;
        default:
            break;
    }

    if (deleteDetail?.message) return false

    return deleteDetail
}

function replaceObjectId(cs_id: string) {
    cs_id = cs_id.replace("new ObjectId('", '');
    cs_id = cs_id.replace(`')`, '');
    return cs_id;
}