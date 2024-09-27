import { prop, getModelForClass } from "@typegoose/typegoose";
import img from "./Images.model";

class Brand {
    @prop({ required: true, unique: true })
    name: string;

    @prop({ required: true, minlength: 3, maxlength: 10, type: [img] })
    images?: img[];

    @prop({ required: true })
    description: string;
}

const BrandModel = getModelForClass(Brand);
export default BrandModel;
