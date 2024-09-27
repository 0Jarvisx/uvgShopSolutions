require('dotenv').config();
import Product from '../../models/Product.model';
const typeDatabase = process.env.DATABASE || 'NOSQL';

var createProductRepository;
var getAllProductsRepository;
var deleteProductRepository;
var updateProductRepository;
var getSingleProductRepository;
var createReviewRepository;

switch (typeDatabase) {
    case 'SQL':
    case 'sql':
        /* Logica para SQL */

        break;

    case 'NOSQL':
    case 'nosql':

        createProductRepository = async (name: string, description: string, brand_id: string, category_id: string, stock: number, images: [], price: number, details: Object, reviews: [], created_at: Date): Promise<any> => {
            try {

                const product = new Product({
                    name,
                    description,
                    brand_id,
                    category_id,
                    stock,
                    images,
                    price,
                    details,
                    reviews,
                    created_at,
                })
                let newProduct = await product.save().then(() => {
                    return product;
                }).catch((error) => {

                    return { ok: false, message: error };
                })
                return newProduct;

            } catch (error) {
                console.error('productRepository Creatproduct', error);
                return false;
            }
        }

        getAllProductsRepository = async (): Promise<any> => {
            return await Product.find();
        }

        updateProductRepository = async (key: object, newValue: any): Promise<any> => {
            try {

                let product = await Product.findOneAndUpdate(key, newValue).then(() => {
                    return Product
                }).catch((error) => {
                    return {
                        ok: false,
                        message: error
                    }
                });
                return product;

            } catch (error) {
                return false
            }
        }

        deleteProductRepository = async (id: string) => {
            let user = await Product.deleteOne({ '_id': id }).then(() => {
                return Product;
            }).catch((error) => {
                return {
                    ok: false,
                    message: error
                }
            });
            return user;
        }

        getSingleProductRepository = async (data: object): Promise<any> => {
            let product = await Product.find(data)
                .then((product) => {
                    return product[0];
                })
                .catch((error) => {
                    return {
                        ok: false,
                        message: error,
                    };
                });
            return product;
        };

        createReviewRepository = async (key: object, newValue: any): Promise<any> => {
            try {

                let product = await Product.findOneAndUpdate({ "_id": key }, { $push: { reviews: newValue } }).then(() => {
                    return Product
                }).catch((error) => {
                    return {
                        ok: false,
                        message: error
                    }
                });

                return product;

            } catch (error) {
                return false
            }
        }

        break;

    default:
        break;
}
module.exports = {
    createProductRepository,
    getAllProductsRepository,
    deleteProductRepository,
    updateProductRepository,
    getSingleProductRepository,
    createReviewRepository
}