require('dotenv').config();
import Category from '../../models/Category.model';
const typeDatabase = process.env.DATABASE || 'NOSQL';

var createCategoryRepository;
var getAllCategoriesRepository;
var deleteCategoryRepository;
var updateCategoryRepository;
var getSingleCategoryRepository;

switch (typeDatabase) {
    case 'SQL':
    case 'sql':
        /* Logica para SQL */

        break;

    case 'NOSQL':
    case 'nosql':

        createCategoryRepository = async (name: string, images: [], description: string, created_at: Date): Promise<any> => {
            try {

                const category = new Category({
                    name,
                    images,
                    description,
                    created_at
                })
                let newCategory = await category.save().then(() => {
                    return category;
                }).catch((error) => {

                    return { ok: false, message: error };
                })
                return newCategory;

            } catch (error) {
                console.error('CategoryRepository CreatCategory', error);
                return false;
            }
        }

        getAllCategoriesRepository = async (): Promise<any> => {
            return await Category.find();
        }

        deleteCategoryRepository = async (id: string): Promise<any> => {
            let category = await Category.deleteOne({ '_id': id }).then(() => {
                return Category;
            }).catch((error) => {
                return {
                    ok: false,
                    message: error
                }
            })
            return category;
        }

        updateCategoryRepository = async (key: object, newValue: any): Promise<any> => {
            try {

                let category = await Category.findOneAndUpdate(key, newValue).then(() => {
                    return Category
                }).catch((error) => {
                    return {
                        ok: false,
                        message: error
                    }
                });
                return category;

            } catch (error) {
                return false
            }
        }
        getSingleCategoryRepository =async (data: object): Promise<any> => {
            let category = await Category.find(data)
                .then((category) => {
                    return category[0];
                })
                .catch((error) => {
                    return {
                        ok: false,
                        message: error,
                    };
                });
            return category;
        };

        break;

    default:
        break;
}
module.exports = {
    createCategoryRepository,
    getAllCategoriesRepository,
    deleteCategoryRepository,
    updateCategoryRepository,
    getSingleCategoryRepository,
}