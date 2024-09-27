import { prop } from '@typegoose/typegoose';

class Images {
    @prop({required :true})
    urlThumbnail: string

    @prop({ required: true})
    default: boolean

    @prop({required: true})
    created_at: Date
}

export default Images;