import { prop, getModelForClass } from '@typegoose/typegoose';

class Detail_Orders {

    @prop({ required: true })
    order_id: string

    @prop({ required: true})
    product_id: string

    @prop({required: false})
    address: string

    @prop({required: true})
    quantity: number

    @prop({required: true})
    subtotal: number
}

const Detail_OrdersModel = getModelForClass(Detail_Orders);
export default Detail_OrdersModel;