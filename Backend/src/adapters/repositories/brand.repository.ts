require("dotenv").config();
import Brand from "../../models/Brand.model";
const typeDatabase = process.env.DATABASE || "NOSQL";

var getAllBrands;
var getBrandRepository;
var createBrandRepository;
var updateBrandRepository;
var deleteBrandRepository;

switch (typeDatabase) {
    case "SQL":
    case "sql":
        break;
    case "NOSQL":
    case "nosql":
        createBrandRepository = async (
            name: string,
            images: [],
            description: string
        ): Promise<any> => {
            try {
                const brand = new Brand({
                    name,
                    images,
                    description,
                });

                let newBrand = await brand
                    .save()
                    .then(() => {
                        return brand;
                    })
                    .catch((error) => {
                        return { ok: false, message: error };
                    });

                return newBrand;
            } catch (error) {
                console.error("brandRepository CreateBrand", error);
                return false;
            }
        };

        getAllBrands = async (): Promise<any> => {
            return await Brand.find();
        };

        updateBrandRepository = async (
            key: object,
            newValue: any
        ): Promise<any> => {
            try {
                let brand = await Brand.findOneAndUpdate(key, newValue)
                    .then(() => {
                        return Brand;
                    })
                    .catch((error) => {
                        return {
                            ok: false,
                            message: error,
                        };
                    });
                return brand;
            } catch (error) {
                return false;
            }
        };

        deleteBrandRepository = async (id: string) => {
            let brand = await Brand.deleteOne({ _id: id })
                .then(() => {
                    return Brand;
                })
                .catch((error) => {
                    return {
                        ok: false,
                        message: error,
                    };
                });

            return brand;
        };

        getBrandRepository = async (data: object): Promise<any> => {
            let brand = await Brand.find(data)
                .then((brand) => {
                    return brand[0];
                })
                .catch((error) => {
                    return {
                        ok: false,
                        message: error,
                    };
                });
            return brand;
        };
        break;
}

module.exports = {
    createBrandRepository,
    getAllBrands,
    updateBrandRepository,
    deleteBrandRepository,
    getBrandRepository,
};
