import { prop, getModelForClass } from '@typegoose/typegoose';
import img from './Images.model';


class Category {
    @prop({required:true})
    name: string

    @prop({required:true, minitems: 1, maxitems: 10, type: [img]})
    images?: img[]

    @prop({required:true})
    description: string

    @prop({required: true})
    created_at: Date
}

const CategoryModel = getModelForClass(Category);
export default CategoryModel;