import { prop, getModelForClass } from '@typegoose/typegoose';

class Order {

    @prop({ required: true })
    user_id: string

    @prop({ required: true})
    status_id: string

    @prop({ required: false})
    card: string

    @prop({ required: false })
    nit: string

    @prop({ required: false })
    date: Date

    @prop({required: false})
    address: string

    @prop({required: true})
    total: number

    @prop({required: true})
    created_at: Date
}

const OrderModel = getModelForClass(Order);
export default OrderModel;