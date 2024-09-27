import { prop, getModelForClass } from "@typegoose/typegoose";


class Contact {

    @prop({ required: true})
    status_id: string;

    @prop({ required: true})
    name: string;

    @prop({ required: true })
    phone: string;

    @prop({ required: true })
    email: string;

    @prop({ required: true, })
    subject: string;

    @prop({ required: true })
    description: string;

    @prop({ required: true })
    created_at: Date;

}

const ContactModel = getModelForClass(Contact);
export default ContactModel;
