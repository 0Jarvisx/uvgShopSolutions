require('dotenv').config();
import Order from "../../models/Order.model";

const typeDatabase = process.env.DATABASE || 'NOSQL';

var findCartActiveRepository;
var createCartRepository;
var updateCartRepository;
var deleteCartRepository;
var getAllCartsRepository;

switch (typeDatabase) {
    case 'SQL':
    case 'sql':
        /* Logica para SQL */

        break;

    case 'NOSQL':
    case 'nosql':

        findCartActiveRepository = async (id: string): Promise<any> => {

            let order = await Order.findOne({ "user_id": id, "status_id": "65cbb3a92e845d222d204f22" })
                .then((order) => {
                    return order;
                })
                .catch((error) => {
                    return {
                        ok: false,
                        message: error,
                    };
                });
            return order;
        }

        createCartRepository = async (user_id: string, status_id: string, total: number, created_at: Date): Promise<any> => {
            try {
                const order = new Order({
                    user_id,
                    status_id,
                    total,
                    created_at,
                })
                let newOrder = await order.save().then(() => {
                    return order;
                }).catch((error) => {

                    return { ok: false, message: error };
                })
                return newOrder;

            } catch (error) {
                console.error('productRepository Creatproduct', error);
                return false;
            }
        }

        updateCartRepository = async (key: object, newValue: any): Promise<any> => {
            try {

                let order = await Order.findOneAndUpdate(key, newValue).then(() => {
                    return Order
                }).catch((error) => {
                    return {
                        ok: false,
                        message: error
                    }
                });
                return order;

            } catch (error) {
                return false
            }
        }

        deleteCartRepository = async (id: string): Promise<any> => {
            let order = await Order.deleteOne({ '_id': id }).then(() => {
                return Order;
            }).catch((error) => {
                return {
                    ok: false,
                    message: error
                }
            });
            return order;
        }

        getAllCartsRepository = async (): Promise<any> => {
            return await Order.find();
        }

        break;

    default:
        break;
}

module.exports = {
    findCartActiveRepository,
    createCartRepository,
    updateCartRepository,
    deleteCartRepository,
    getAllCartsRepository
}