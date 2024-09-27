const { createStatusRepository, getAllStatusesRepository, updateStatusRepository, deleteStatusRepository, getSingleStatusRepository } = require('../../adapters/repositories/status.repository')

export const createStatusUseCase = async (name: string, belong: string,): Promise<any> => {


    const status = await createStatusRepository(name,belong, Date.now());

    /* Manejo de Errores */
    if (status?.message) {
        let message = '';
        message = `${Object.values(status.message.errors)[0]}`
        return {
            ok: false,
            message: message
        }
    }

    return {
        id: status._id,
        name: status.name,
        belong: status.belong,
        created_at: status.created_at
    };

}

export const getStatusesUseCase = async () => {
    const allStatuses = await getAllStatusesRepository();

    if (!allStatuses) return false;
    return allStatuses;
}

export const updateStatusUseCase = async (key: any, newValue: any) => {
    /* Esto es en caso el id venga de la siguiente forma "ObjectId('qwefsd345365431f') */
    if (key?._id) key['_id'] = replaceObjectId(key['_id'])
    const updateStatus = await updateStatusRepository(key, newValue);

    if (updateStatus?.message) return false;

    let updateValue = newValue
    return updateValue
}

export const deleteStatusUseCase = async (id: string) => {
    id = replaceObjectId(id);
    const deleteStatus = await deleteStatusRepository(id);

    if (deleteStatus?.message) return false

    return deleteStatus
}

export const getSingleStatusUseCase = async (data: any) => {
    const isID = Object.keys(data).includes("_id");

    if (isID) {
        data["_id"] = replaceObjectId(data["_id"]);
    }

    const status = await getSingleStatusRepository(data);

    if (status?.message) return false;
    return status;
};

function replaceObjectId(cs_id: string) {
    cs_id = cs_id.replace("ObjectId('", '');
    cs_id = cs_id.replace(`')`, '');
    return cs_id;
}