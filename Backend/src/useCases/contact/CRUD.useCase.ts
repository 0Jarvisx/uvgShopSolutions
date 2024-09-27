const { createContactRepository, getAllContactsRepository, changeStatusRepository } = require('../../adapters/repositories/contact.repository');

export const createContactUseCase = async (name: string, phone: string, email: string, subject: string, message: string): Promise<any> => {
    const contact = await createContactRepository(name, phone, email, subject, message, "65ccf95656496c346152ddfe", Date.now());
    console.log(contact);
    if (contact?.message) {
        let message = '';
        message = `${Object.values(contact.message.errors)[0]}`
        return {
            ok: false,
            message: message
        }
    }

    return {
        id: contact._id,
        status_id: contact.status_id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        subject: contact.subject,
        description: contact.description,
        created_at: contact.created_at
    };
}

export const getAllContactUseCase = async () => {
    const allContact = await getAllContactsRepository();
    if (!allContact) return false;
    return allContact;
}

export const changeStatusUseCase = async (key: any, newValue: any): Promise<any> => {
    if (key?._id) key['_id'] = replaceObjectId(key['_id']);
    if (newValue?.status_id) newValue['status_id'] = replaceObjectId(newValue['status_id'])
    const updateContact = await changeStatusRepository(key, newValue);

    if (updateContact?.message) return false;

    let updateValue = newValue
    return updateValue
}

function replaceObjectId(cs_id: string) {
    cs_id = cs_id.replace("ObjectId('", '');
    cs_id = cs_id.replace(`')`, '');
    return cs_id;
}