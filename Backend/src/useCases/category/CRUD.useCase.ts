const { createCategoryRepository, getAllCategoriesRepository, deleteCategoryRepository, updateCategoryRepository, getSingleCategoryRepository } = require('../../adapters/repositories/category.repository')

export const createcategoryUseCase = async (name: string, images: [], description: string): Promise<any> => {
    let arrayImages = [];
    for (let idx = 0; idx < images.length; idx++) {
        const element: any = images[idx];
        element.created_at = Date.now();
        arrayImages.push(element);
    }
    const category = await createCategoryRepository(name, arrayImages, description, Date.now());
    if (category?.message) {
        let message = '';
        message = `${Object.values(category.message.errors)[0]}`
        return {
            ok: false,
            message: message
        }
    }

    return {
        name: category.name,
        images: category.images,
        created_at: category.created_at
    };

}

export const getAllCategoriesUseCase = async () => {
    const allCategories = await getAllCategoriesRepository();
    if (!allCategories) return false;
    return allCategories;
}

export const updateCategoryUseCase = async (key: any, newValue: any) => {
    if (key?._id) key['_id'] = replaceObjectId(key['_id'])
    const updateProduct = await updateCategoryRepository(key, newValue);
    if (updateProduct?.message) return false;

    let updateValue = newValue
    return updateValue
}

export const deleteCategoryUseCase = async (id: string) => {
    id = replaceObjectId(id);
    const deleteCategory = await deleteCategoryRepository(id);

    if (deleteCategory?.message) return false

    return deleteCategory
}

export const getSingleCategoryUseCase = async (data: any) => {
    const isID = Object.keys(data).includes("_id");

    if (isID) {
        data["_id"] = replaceObjectId(data["_id"]);
    }

    const category = await getSingleCategoryRepository(data);

    if (category?.message) return false;
    return category;
};

function replaceObjectId(cs_id: string) {
    cs_id = cs_id.replace("ObjectId('", '');
    cs_id = cs_id.replace(`')`, '');
    return cs_id;
}
