import { prop, getModelForClass } from '@typegoose/typegoose';
import img from './Images.model';


class Review {
    @prop({ required: true })
    user_id: string

    @prop({ required: true })
    user_name: string

    @prop({ required: true })
    title_comment: string

    @prop({ required: true })
    comment: string

    @prop({ required: true })
    rating: Number

    @prop({ required: true })
    created_at: Date

}

class Product {
    @prop({ required: true })
    name: string

    @prop({ required: true })
    description: string

    @prop({ required: true })
    brand_id: string

    @prop({ required: true })
    category_id: string

    @prop({ required: true })
    stock: number

    @prop({ required: true, type: [img] })
    images?: img[]

    @prop({ required: true })
    price: number

    @prop({ required: true, type: Object, _id: false })
    details?: Record<string, any>

    @prop({ required: true, type: [Review], Object, _id: false })
    reviews?: Review[]

    @prop({ required: true })
    created_at: Date
}

const ProductModel = getModelForClass(Product);
export default ProductModel;