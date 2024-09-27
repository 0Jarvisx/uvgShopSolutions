import { Router } from "express";
//import { cookieMiddleware } from "../adapters/middlewares/cookies.middleware";
const {
    newBrand,
    getBrands,
    updateBrand,
    deleteBrand,
    singleBrand,
} = require("../adapters/controllers/brand.controller");

const router = Router();
router.get("/getBrands", getBrands);

//const cookieParser = require('cookie-parser');
router.post("/Create", newBrand);
router.put("/updateBrand", updateBrand);
router.delete("/delete/:id", deleteBrand);
router.get("/getSingle/:data", singleBrand);

export default router;
