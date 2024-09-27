require('dotenv').config();
import Contact from '../../models/Contact.model';
const typeDatabase = process.env.DATABASE || 'NOSQL';

var createContactRepository;
var getAllContactsRepository;
var changeStatusRepository;

switch (typeDatabase) {
    case 'SQL':
    case 'sql':
        /* Logica para SQL */

        break;

    case 'NOSQL':
    case 'nosql':
        createContactRepository = async (name: string, phone: string, email: string, subject: string, description: string, status_id: string, created_at: Date) => {
            try {

                const contact = new Contact({
                    status_id,
                    name,
                    phone,
                    email,
                    subject,
                    description,
                    created_at
                })
                let newContact = await contact.save().then(() => {
                    return contact;
                }).catch((error) => {

                    return { ok: false, message: error };
                })
                return newContact;

            } catch (error) {
                console.error('CategoryRepository CreatCategory', error);
                return false;
            }
        }

        getAllContactsRepository = async (): Promise<any> => {
            return await Contact.find();
        }

        changeStatusRepository = async (key: object, newValue: any): Promise<any> => {
            try {

                let contact = await Contact.findOneAndUpdate(key, newValue).then(() => {
                    return Contact
                }).catch((error) => {
                    return {
                        ok: false,
                        message: error
                    }
                });
                return contact;

            } catch (error) {
                return false
            }
        }

        break;

    default:
        break;

}
module.exports = {
    createContactRepository,
    getAllContactsRepository,
    changeStatusRepository,
}
