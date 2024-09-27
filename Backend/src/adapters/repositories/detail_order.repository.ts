require('dotenv').config();
import Detail_Orders from "../../models/OrderDetail.model"

const typeDatabase = process.env.DATABASE || 'NOSQL';

var createDetailRepository;
var getDetailRepository;
var updateDetailRepository;
var deleteManyDetailsRepository;
var deleteOneDetailRepository;

switch (typeDatabase) {
    case 'SQL':
    case 'sql':
        /* Logica para SQL */

        break;

    case 'NOSQL':
    case 'nosql':

        createDetailRepository = async (order_id: string, product_id: string, address: string, quantity: number, subtotal: number): Promise<any> => {
            try {

                const detail = new Detail_Orders({
                    order_id,
                    product_id,
                    address,
                    quantity,
                    subtotal
                })
                let detail_order = await detail.save().then(() => {
                    return detail;
                }).catch((error) => {

                    return { ok: false, message: error };
                })
                return detail_order;

            } catch (error) {
                console.error('Detail_OrderRepository CreateDetail_Order', error);
                return false;
            }
        }

        getDetailRepository = async (order_id: string): Promise<any> => {
            return await Detail_Orders.find({ 'order_id': order_id });
        }
        updateDetailRepository = async (key: object, newValue: any): Promise<any> => {
            try {

                let detail = await Detail_Orders.findOneAndUpdate(key, newValue).then(() => {
                    return Detail_Orders
                }).catch((error) => {
                    return {
                        ok: false,
                        message: error
                    }
                });
                return detail;

            } catch (error) {
                return false
            }
        }

        deleteManyDetailsRepository = async (order_id:string): Promise<any> => {
            let detail = await Detail_Orders.deleteMany({ 'order_id': order_id }).then(() => {
                return Detail_Orders;
            }).catch((error) => {
                return {
                    ok: false,
                    message: error
                }
            });
            return detail;
        }

        deleteOneDetailRepository = async (id:string): Promise<any> => {
            let detail = await Detail_Orders.deleteOne({ '_id': id }).then(() => {
                return Detail_Orders;
            }).catch((error) => {
                return {
                    ok: false,
                    message: error
                }
            });
            return detail;
        }

        break;

    default:
        break;
}

module.exports = {
    createDetailRepository,
    getDetailRepository,
    updateDetailRepository,
    deleteManyDetailsRepository,
    deleteOneDetailRepository
}