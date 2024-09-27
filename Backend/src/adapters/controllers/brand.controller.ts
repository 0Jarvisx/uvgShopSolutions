import { Request, Response } from "express";
import {
    getBrandsUseCase,
    createUseCase,
    updateBrandUseCase,
    deleteBrandUseCase,
    getSingleBrand,
} from "../../useCases/brand/CRUD.useCase";

const newBrand = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, images, description } = req.body;

        let isError = validInputs(req.body);

        if (!isError.ok) {
            return res.status(400).json({
                ok: !isError.ok,
                message: isError.message,
            });
        }

        const isCreated = await createUseCase(name, images, description);

        if (isCreated?.message) {
            return res.status(400).json({
                ok: false,
                message: isCreated.message,
            });
        }

        return res.status(201).json({
            ok: true,
            message: "Brand created Succesfully",
            data: isCreated,
        });
    } catch (error) {
        console.error("NewBrandController", error);
        return res.status(400).json({
            ok: false,
            message: error,
        });
    }
};

const getBrands = async (_: Request, res: Response): Promise<any> => {
    try {
        const allBrands = await getBrandsUseCase();

        if (!allBrands) {
            console.error("Error al obtener Marcas");
            return res.status(400).json({
                ok: false,
                message: "Error al obrener marcas",
            });
        }

        return res.status(200).json({
            ok: true,
            message: "Succesfully",
            data: allBrands,
        });
    } catch (error) {
        console.error("getBrandController", error);
        return res.status(400).json({
            ok: false,
            message: error,
        });
    }
};

const updateBrand = async (req: Request, res: Response): Promise<any> => {
    try {
        const { key, newValue } = req.body;

        let isErrorKey = validInputs(key);
        if (!isErrorKey.ok) {
            return res.status(400).json({
                ok: false,
                message: isErrorKey.message,
            });
        }
        let isErrorValue = validInputs(newValue);
        if (!isErrorValue.ok) {
            return res.status(400).json({
                ok: false,
                message: isErrorValue.message,
            });
        }

        const brand = await updateBrandUseCase(key, newValue);
        console.log("🚀 ~ updateBrand ~ brand:", brand);

        if (!brand) {
            return res.status(204).json({
                ok: false,
                message: "Not Exists",
            });
        }

        return res.status(200).json({
            ok: true,
            message: "The brand has been successfully updated",
        });
    } catch (error) {
        console.error("BrandController", error);
        return res.status(400).json({
            ok: false,
            message: error,
        });
    }
};

const deleteBrand = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    const isDeleted = deleteBrandUseCase(id);

    if (!isDeleted) {
        return res.status(400).json({
            ok: false,
            message: `Cannot delete brand with id ${id}`,
        });
    }
    return res.status(200).json({
        ok: true,
        message: "Succesfully delete brand",
    });
};

const singleBrand = async (req: Request, res: Response): Promise<any> => {
    try {
        const { data } = req.params;

        let dataObject = JSON.parse(atob(data));

        const brand = await getSingleBrand(dataObject);

        if (!brand) {
            return res.status(400).json({
                ok: false,
                message: `Cannot find brand`,
            });
        }

        return res.status(201).json({
            ok: true,
            message: "Succesfully get brand",
            data: brand,
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: error,
        });
    }
};

function validInputs(cs_reqbody: any) {
    for (let idx = 0; idx < Object.keys(cs_reqbody).length; idx++) {
        const key = Object.keys(cs_reqbody)[idx];
        const value: any = Object.values(cs_reqbody)[idx];

        if (key === "name") {
            if (isNull(value)) {
                return {
                    ok: false,
                    message: "Required Brand Name",
                };
            }
        } else if (key === "images") {
            if (value.length === 0) {
                return {
                    ok: false,
                    message: "Required Brand Image",
                };
            }
        } else {
            console.log(value);
            if (isNull(value)) {
                return {
                    ok: false,
                    message: `Required ${key}`,
                };
            }
        }
    }

    return {
        ok: true,
        message: "Its ok",
    };
}

function isNull(cs_param: any) {
    return cs_param === "" || cs_param === null || cs_param === undefined;
}
module.exports = {
    newBrand,
    getBrands,
    updateBrand,
    deleteBrand,
    singleBrand,
};
