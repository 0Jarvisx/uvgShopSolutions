import { prop, getModelForClass } from '@typegoose/typegoose';

class User {

    @prop({ required: true })
    name: string

    @prop({ required: true, minlength: 6 })
    password: string

    @prop({ required: true, unique: true })
    email: string

    @prop({ required: true, minlength: 8 })
    phoneNumber: string

    @prop({ required: true })
    role: string

    @prop({ required: true })
    created_at: Date
}

const UserModel = getModelForClass(User);
export default UserModel;