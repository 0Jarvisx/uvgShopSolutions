const { createProductRepository, getAllProductsRepository, deleteProductRepository, updateProductRepository, getSingleProductRepository, createReviewRepository } = require('../../adapters/repositories/product.repository');

export const createUseCase = async (name: string, description: string, brand_id: string, category_id: string, stock: number, images: [], price: number, details: Object, reviews: []): Promise<any> => {

    const product = await createProductRepository(name, description, brand_id, category_id, stock, images, price, details, reviews, Date.now());
    if (product?.message) {
        let message = '';
        message = `${Object.values(product.message.errors)[0]}`
        return {
            ok: false,
            message: message
        }
    }

    return {
        name: product.name,
        description: product.description,
        brand_id: product.brand_id,
        category_id: product.category_id,
        stock: product.stock,
        images: product.images,
        price: product.price,
        details: product.details,
        reviews: product.reviews,
        created_at: product.created_at
    };

}

export const getProductsUseCase = async () => {
    const allProducts = await getAllProductsRepository();
    if (!allProducts) return false;
    return allProducts;
}

export const updateProductUseCase = async (key: any, newValue: any) => {
    if (key?._id) key['_id'] = replaceObjectId(key['_id'])
    const updateProduct = await updateProductRepository(key, newValue);
    if (updateProduct?.message) return false;

    let updateValue = newValue
    return updateValue
}

export const getSingleProductUseCase = async (data: any) => {
    const isID = Object.keys(data).includes("_id");

    if (isID) {
        data["_id"] = replaceObjectId(data["_id"]);
    }

    const product = await getSingleProductRepository(data);

    if (product?.message) return false;
    return product;
};

export const deleteProductUseCase = async (id: string) => {
    id = replaceObjectId(id);
    const deleteProduct = await deleteProductRepository(id);

    if (deleteProduct?.message) return false

    return deleteProduct
}

export const createReviewUseCase = async (product_id: string, user_id: string, user_name: string, title_comment: string, comment: string, rating: number): Promise<any> => {
    product_id = replaceObjectId(product_id.toString());
    user_id = replaceObjectId(user_id.toString());
    let newValue = {
        user_id,
        user_name,
        title_comment,
        comment,
        rating,
        created_at: Date.now()
    }
    const review = await createReviewRepository(product_id, newValue)
    if (review?.message) {
        let message = '';
        message = `${Object.values(review.message.errors)[0]}`
        return {
            ok: false,
            message: message
        }
    }
    console.log('87 - useCase', review);
    return newValue;
}

function replaceObjectId(cs_id: string) {
    cs_id = cs_id.replace("ObjectId('", '');
    cs_id = cs_id.replace(`')`, '');
    return cs_id;
}