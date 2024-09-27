import { prop, getModelForClass } from '@typegoose/typegoose';

class Status {
    @prop({required:true})
    name: string

    @prop({required:true})
    belong: string

    @prop({required: true})
    created_at: Date
}

const StatusModel = getModelForClass(Status);
export default StatusModel;