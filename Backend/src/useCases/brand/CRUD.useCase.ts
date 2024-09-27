const {
    getAllBrands,
    createBrandRepository,
    updateBrandRepository,
    deleteBrandRepository,
    getBrandRepository,
} = require("../../adapters/repositories/brand.repository");

export const createUseCase = async (
    name: String,
    images: [],
    description: String
): Promise<any> => {
    const brand = await createBrandRepository(name, images, description);

    /** Handle Errors */
    if (brand?.message) {
        let message = "";
        brand?.message?.keyValue
            ? (message = "An brand already exists with this name")
            : (message = `${Object.values(brand.message.errors)[0]}`);
        message = message.replace("Path ", "The ").replaceAll("`", "");
        return {
            ok: false,
            message: message,
        };
    }

    return {
        name: brand.name,
        images: brand.images,
        description: brand.description,
    };
};

export const getBrandsUseCase = async () => {
    const allBrands = await getAllBrands();

    if (!allBrands) return false;
    return allBrands;
};

export const updateBrandUseCase = async (key: any, newValue: any) => {
    if (key?._id) key["_id"] = replaceObjectId(key["_id"]);
    const updateBrand = await updateBrandRepository(key, newValue);

    if (updateBrand?.message) return false;

    let updateValue = (updateBrand[Object.keys(newValue)[0]] = newValue);
    return updateValue;
};

export const deleteBrandUseCase = async (id: string) => {
    id = replaceObjectId(id);
    const deleteBrand = await deleteBrandRepository(id);

    if (deleteBrand?.message) return false;
    return deleteBrand;
};

export const getSingleBrand = async (data: any) => {
    const isID = Object.keys(data).includes("_id");

    if (isID) {
        data["_id"] = replaceObjectId(data["_id"]);
    }

    const brand = await getBrandRepository(data);

    if (brand?.message) return false;
    return brand;
};

function replaceObjectId(cs_id: string) {
    cs_id = cs_id.replace("ObjectId('", "");
    cs_id = cs_id.replace(`')`, "");
    return cs_id;
}
