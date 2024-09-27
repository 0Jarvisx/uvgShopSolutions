require('dotenv').config();
import Status from '../../models/Status.model';
const typeDatabase = process.env.DATABASE || 'NOSQL';

var createStatusRepository;
var getAllStatusesRepository;
var deleteStatusRepository;
var updateStatusRepository;
var getSingleStatusRepository;

switch (typeDatabase) {
    case 'SQL':
    case 'sql':
        /* Logica para SQL */

        break;

    case 'NOSQL':
    case 'nosql':

        createStatusRepository = async (name: string, belong: string, created_at: Date): Promise<any> => {
            try {

                const status = new Status({
                    name,
                    belong,
                    created_at,
                })
                let newProduct = await status.save().then(() => {
                    return status;
                }).catch((error) => {

                    return { ok: false, message: error };
                })
                return newProduct;

            } catch (error) {
                console.error('productRepository Creatproduct', error);
                return false;
            }
        }

        getAllStatusesRepository = async (): Promise<any> => {
            return await Status.find();
        }

        deleteStatusRepository = async (id: string): Promise<any> => {
            let status = await Status.deleteOne({ '_id': id }).then(() => {
                return Status;
            }).catch((error) => {
                return {
                    ok: false,
                    message: error
                }
            });
            return status;
        }

        updateStatusRepository = async (key: object, newValue: any): Promise<any> => {
            try {

                let status = await Status.findOneAndUpdate(key, newValue).then(() => {
                    return Status
                }).catch((error) => {
                    return {
                        ok: false,
                        message: error
                    }
                });
                return status;

            } catch (error) {
                return false
            }
        }

        getSingleStatusRepository = async (data: Object): Promise<any> => {
            let status = await Status.find(data)
            .then((status) => {
                return status[0];
            })
            .catch((error) => {
                return {
                    ok: false,
                    message: error,
                };
            });
        return status;
        }

        break;
    default:
        break;

}
module.exports = {
    createStatusRepository,
    getAllStatusesRepository,
    deleteStatusRepository,
    updateStatusRepository,
    getSingleStatusRepository
}